import React, { useState, useRef, useEffect, useMemo } from 'react';
import axiosApi from '@/api/axiosApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const AIChat = () => {
    const [question, setQuestion] = useState('');
    const [files, setFiles] = useState([]);
    const [pendingQuestion, setPendingQuestion] = useState(null);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [lightboxSrc, setLightboxSrc] = useState(null);
    const scrollRef = useRef(null);
    const queryClient = useQueryClient();
    // Base URL for conversation images returned by the backend
    const IMG_BASE = 'http://10.10.13.59:8005';

    // Fetch conversation history
    const { data: history = [], isLoading, isError, error } = useQuery({
        queryKey: ['aiConversation'],
        queryFn: () => axiosApi.get('/chatbot/api/v1/ai-conversation').then(res => res.data),
        staleTime: 30 * 1000,
    });

    // no longer need currentUser for placement — question/images always on right

    // sort the history by created_at ascending so newest messages are at the bottom
    const sortedHistory = useMemo(() => {
        if (!Array.isArray(history)) return [];
        return [...history].sort((a, b) => {
            const ta = a && a.created_at ? new Date(a.created_at).getTime() : 0;
            const tb = b && b.created_at ? new Date(b.created_at).getTime() : 0;
            return ta - tb;
        });
    }, [history]);

    // Mutation to send a message (with optional images)
    const sendMutation = useMutation({
        mutationFn: async ({ question, files }) => {
            // Use FormData to support file uploads; backend should accept multipart/form-data
            const form = new FormData();
            form.append('question', question);
            if (files && files.length) {
                Array.from(files).forEach((f) => form.append('images', f));
            }
            const res = await axiosApi.post('/chatbot/api/v1/ai-conversation', form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return res.data;
        },
        onSuccess(data) {
            // If the server response doesn't include images, attach local previews so the sent message
            // still displays the images on the right. We'll add a temporary `_local_preview_urls` field.
            const serverImgs = (data && data.conversation_images) || (data && data.images) || [];
            const hasServerImgs = Array.isArray(serverImgs) && serverImgs.length > 0;
            const augmented = { ...data };
            if (!hasServerImgs && previewUrls && previewUrls.length) {
                augmented._local_preview_urls = previewUrls.map(p => p.url);
            }

            queryClient.setQueryData(['aiConversation'], (old = []) => {
                if (!old) return [augmented];
                return Array.isArray(old) ? [...old, augmented] : [old, augmented];
            });

            setQuestion('');
            setFiles([]);
            // clear local previewUrls now that we've attached them to the conversation message
            setPreviewUrls([]);
            // clear local pending indicator
            setPendingQuestion(null);
            toast.success('Message sent');
        },
        onError(err) {
            console.error(err);
            // clear pending on error as well but keep previews so user can retry
            setPendingQuestion(null);
            toast.error('Failed to send message');
        }
    });

    // build local preview URLs for selected files
    useEffect(() => {
        // cleanup previous urls
        if (!files || files.length === 0) {
            // revoke and clear
            previewUrls.forEach(p => URL.revokeObjectURL(p.url));
            setPreviewUrls([]);
            return;
        }

        const newPreviews = Array.from(files).map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file),
            file,
        }));

        // revoke old
        previewUrls.forEach(p => URL.revokeObjectURL(p.url));
        setPreviewUrls(newPreviews);

        return () => {
            newPreviews.forEach(p => URL.revokeObjectURL(p.url));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files]);

    // scroll to bottom when messages load or new messages arrive
    useEffect(() => {
        if (!scrollRef.current) return;
        // ensure DOM updated (images may affect height)
        const id = requestAnimationFrame(() => {
            const t = setTimeout(() => {
                try {
                    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
                } catch (e) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
                clearTimeout(t);
            }, 80);
        });
        return () => cancelAnimationFrame(id);
    }, [sortedHistory.length]);

    // file input change handler (sets FileList into state)
    const handleFilesChange = (e) => {
        const f = e.target.files;
        setFiles(f);
    };

    // helper: normalize server-side image arrays in a message (supports new `conversation_images`)
    const getMessageImageUrls = (msg) => {
        // prefer the new field `conversation_images` if present
        const conv = msg && msg.conversation_images;
        if (Array.isArray(conv) && conv.length) {
            return conv
                .map((p) => (typeof p === 'string' ? p : p.url || p.path || ''))
                .map((p) => (p && p.startsWith('/') ? IMG_BASE + p : p))
                .filter(Boolean);
        }

        const candidates = msg.images || msg.files || msg.attachments || [];
        if (!candidates) return [];
        // candidates can be array of strings (urls) or objects with url/src
        const normalized = Array.isArray(candidates)
            ? candidates
                .map((it) => (typeof it === 'string' ? it : it.url || it.src || it.path || ''))
                .map((p) => (p && p.startsWith('/') ? IMG_BASE + p : p))
                .filter(Boolean)
            : [];

        // also support local preview URLs attached by the client on send
        if (msg && Array.isArray(msg._local_preview_urls) && msg._local_preview_urls.length) {
            return [...normalized, ...msg._local_preview_urls];
        }

        return normalized;
    };

    const renderImageList = (urls = []) => {
        if (!urls || urls.length === 0) return null;
        return (
            <div className="mt-2 flex flex-wrap gap-2">
                {urls.map((u, i) => (
                    <img
                        key={i}
                        src={u}
                        alt={`img-${i}`}
                        className="w-28 h-20 object-cover rounded-md border cursor-pointer"
                        onClick={() => setLightboxSrc(u)}
                    />
                ))}
            </div>
        );
    };

    const handleSend = async () => {
        if (!question.trim() && (!files || files.length === 0)) {
            toast.warn('Please enter a question or attach images');
            return;
        }
        const trimmed = question.trim();
        // show pending user message and typing indicator
        setPendingQuestion(trimmed);
        console.log("Question:", trimmed)
        sendMutation.mutate({ question: trimmed, files });
    };

    // lightbox: close on Escape
    useEffect(() => {
        if (!lightboxSrc) return;
        const onKey = (e) => {
            if (e.key === 'Escape') setLightboxSrc(null);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightboxSrc]);

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">AI Chat</h2>

            <div className="border border-gray-300 rounded-md p-4 mb-4 max-h-[550px] overflow-auto bg-white" ref={scrollRef}>
                {isLoading ? (
                    <div className="text-sm text-gray-500">Loading history...</div>
                ) : isError ? (
                    <div className="text-sm text-red-500">Error loading history: {String(error)}</div>
                ) : sortedHistory.length === 0 ? (
                    <div className="text-sm text-gray-500">No conversation history yet. Start a new chat.</div>
                ) : (
                    sortedHistory.map((msg, idx) => {
                        const imgs = getMessageImageUrls(msg) || [];
                        return (
                            <div key={idx} className="mb-4">
                                <div className="text-xs text-gray-400 mb-2">{new Date(msg.created_at).toLocaleString()}</div>

                                {/* Question + images always shown on the right */}
                                <div className="flex justify-end mb-1">
                                    <div className="max-w-[75%] text-right">
                                        <div className="text-sm font-medium text-gray-600">You</div>
                                        <div className="mt-1 inline-block bg-[#BB9777] text-white p-3 rounded-lg whitespace-pre-wrap">
                                            {msg.question}
                                        </div>
                                        {imgs.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-2 justify-end">
                                                {imgs.map((u, i) => (
                                                    <img
                                                        key={i}
                                                        src={u}
                                                        alt={`img-${i}`}
                                                        className="w-28 h-20 object-cover rounded-md border cursor-pointer"
                                                        onClick={() => setLightboxSrc(u)}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* AI response always shown on the left below the question/images */}
                                <div className="flex justify-start">
                                    <div className="max-w-[75%]">
                                        <div className="text-sm font-medium text-gray-600">AI</div>
                                        <div className="mt-1 bg-gray-100 text-gray-800 p-3 rounded-lg whitespace-pre-wrap">
                                            {msg.ai_response || <em className="text-gray-400">(no response)</em>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                {/* If we have a pending (just-sent) message, show it plus AI typing indicator */}
                {pendingQuestion && (
                    <div className="mb-4" key="pending">
                        <div className="text-xs text-gray-400 mb-2">{new Date().toLocaleString()}</div>

                        {/* Pending user message - right */}
                        <div className="flex justify-end mb-1">
                            <div className="max-w-[75%] text-right">
                                <div className="text-sm font-medium text-gray-600">You</div>
                                <div className="mt-1 inline-block bg-[#BB9777] text-white p-3 rounded-lg whitespace-pre-wrap">
                                    {pendingQuestion}
                                </div>
                            </div>
                        </div>

                        {/* AI typing indicator - left */}
                        <div className="flex justify-start">
                            <div className="max-w-[75%]">
                                <div className="text-sm font-medium text-gray-600">AI</div>
                                <div className="mt-1 bg-gray-100 text-gray-800 p-3 rounded-lg whitespace-pre-wrap italic text-sm">
                                    {sendMutation.isLoading ? 'AI is typing...' : <em className="text-gray-400">(no response)</em>}
                                </div>
                            </div>
                        </div>

                        {/* pending previews shown under the user's (right) bubble instead */}
                        {previewUrls.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2 justify-end">
                                {previewUrls.map((p, i) => (
                                    <img
                                        key={i}
                                        src={p.url}
                                        alt={p.name}
                                        className="w-28 h-20 object-cover rounded-md border cursor-pointer"
                                        onClick={() => setLightboxSrc(p.url)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="bg-white p-3 rounded-md shadow-sm">
                <textarea
                    className="textarea textarea-bordered w-full mb-2"
                    placeholder="Type your question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {
                        // Send on Enter (without Shift/Ctrl/Alt/Meta). Shift+Enter inserts newline.
                        if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
                            e.preventDefault();
                            if (!sendMutation.isLoading) handleSend();
                        }
                    }}
                    disabled={sendMutation.isLoading}
                    rows={3}
                />

                {/* Immediate local previews (show before sending) */}
                {previewUrls.length > 0 && !pendingQuestion && (
                    <div className="mb-2 flex flex-wrap gap-2 justify-end">
                        {previewUrls.map((p, i) => (
                            <img key={i} src={p.url} alt={p.name} className="w-28 h-20 object-cover rounded-md border" />
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-3 justify-between">
                    <input type="file" multiple onChange={handleFilesChange} disabled={sendMutation.isLoading} />
                    <button
                        className="btn bg-[#BB9777] text-white"
                        onClick={handleSend}
                        disabled={sendMutation.isLoading}
                    >
                        {sendMutation.isLoading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>
            {/* Lightbox / fullscreen preview */}
            {lightboxSrc && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                    onClick={() => setLightboxSrc(null)}
                >
                    <div className="max-w-[95%] max-h-[95%]" onClick={(e) => e.stopPropagation()}>
                        <img src={lightboxSrc} alt="preview" className="w-full h-auto max-h-[95vh] rounded" />
                        <button
                            className="mt-2 block ml-auto text-white bg-black/30 px-3 py-1 rounded"
                            onClick={() => setLightboxSrc(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIChat;
