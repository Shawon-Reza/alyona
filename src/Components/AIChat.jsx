import React, { useState, useRef, useEffect, useMemo } from 'react';
import axiosApi from '@/api/axiosApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const AIChat = () => {
    const [question, setQuestion] = useState('');
    const [files, setFiles] = useState([]);
    const [pendingQuestion, setPendingQuestion] = useState(null);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [pendingLocalPreviews, setPendingLocalPreviews] = useState([]);
    const [lastOptimisticId, setLastOptimisticId] = useState(null);
    const [lightboxSrc, setLightboxSrc] = useState(null);
    const scrollRef = useRef(null);
    const fileInputRef = useRef(null);
    const queryClient = useQueryClient();
    // Base URL for conversation images returned by the backend
    const IMG_BASE = 'http://10.10.13.80:8005';

    // Fetch conversation history
    const { data: history = [], isLoading, isError, error } = useQuery({
        queryKey: ['aiConversation'],
        queryFn: () => axiosApi.get('/chatbot/api/v1/ai-conversation').then(res => res.data),
        staleTime: 30 * 1000,
    });
    console.log(history)

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

    // Mutation to send a message (text-only or images)
    // Text-only mutation
    const sendMutation = useMutation({
        mutationFn: async ({ question }) => {
            const res = await axiosApi.post('/chatbot/api/v1/ai-conversation', { question });
            return res.data;
        },
        onSuccess(data) {
            // Normalize server response into a conversation object for immediate UI append
            const normalized = normalizeConversation(data) || { id: `local-${Date.now()}`, created_at: new Date().toISOString(), ai_response: data };
            // If server didn't return images, attach the optimistic local previews (from cache) so UI shows them
            try {
                const existing = queryClient.getQueryData(['aiConversation']) || [];
                const opt = Array.isArray(existing) ? existing.find(i => i && i.id === lastOptimisticId) : null;
                const localUrls = opt && Array.isArray(opt._local_preview_urls) ? opt._local_preview_urls : [];
                if ((!normalized.conversation_images || normalized.conversation_images.length === 0) && localUrls.length) {
                    normalized._local_preview_urls = localUrls.slice();
                }
            } catch (e) { /* ignore */ }

            queryClient.setQueryData(['aiConversation'], (old = []) => {
                const list = Array.isArray(old) ? old.slice() : [];
                if (lastOptimisticId) {
                    const idx = list.findIndex(i => i && i.id === lastOptimisticId);
                    if (idx !== -1) {
                        list[idx] = normalized;
                        return list;
                    }
                }
                return [...list, normalized];
            });

            setLastOptimisticId(null);

            setQuestion('');
            setFiles([]);
            setPreviewUrls([]);
            setPendingLocalPreviews([]);
            setPendingQuestion(null);
            toast.success('Message sent');
        },
        onError(err) {
            console.error(err);
            // remove optimistic entry if present
            try {
                queryClient.setQueryData(['aiConversation'], (old = []) => {
                    const list = Array.isArray(old) ? old.filter(i => !(i && i.id === lastOptimisticId)) : [];
                    return list;
                });
            } catch (e) { }
            setLastOptimisticId(null);
            setPendingQuestion(null);
            toast.error('Failed to send message');
        }
    });

    // Images-only mutation
    const imageMutation = useMutation({
        mutationFn: async (files) => {
            const form = new FormData();
            // normalize to an Array (accepts Array or FileList)
            const fileArray = Array.isArray(files) ? files : Array.from(files || []);
            // append under both `images[]` and `images` to match different backend expectations
            fileArray.forEach((f) => {
                try { form.append('images[]', f); } catch (e) { /* ignore */ }
                try { form.append('images', f); } catch (e) { /* ignore */ }
            });
            const res = await axiosApi.post('/chatbot/api/v1/run-skin-analysis', form);
            return res.data;
        },
        onSuccess(data) {
            // Normalize server response into a conversation object for immediate UI append
            const normalized = normalizeConversation(data) || { id: `local-${Date.now()}`, created_at: new Date().toISOString(), ai_response: data };
            // If server didn't return images, attach the optimistic local previews (from cache) so UI shows them
            try {
                const existing = queryClient.getQueryData(['aiConversation']) || [];
                const opt = Array.isArray(existing) ? existing.find(i => i && i.id === lastOptimisticId) : null;
                const localUrls = opt && Array.isArray(opt._local_preview_urls) ? opt._local_preview_urls : [];
                if ((!normalized.conversation_images || normalized.conversation_images.length === 0) && localUrls.length) {
                    normalized._local_preview_urls = localUrls.slice();
                }
            } catch (e) { /* ignore */ }

            queryClient.setQueryData(['aiConversation'], (old = []) => {
                const list = Array.isArray(old) ? old.slice() : [];
                if (lastOptimisticId) {
                    const idx = list.findIndex(i => i && i.id === lastOptimisticId);
                    if (idx !== -1) {
                        list[idx] = normalized;
                        return list;
                    }
                }
                return [...list, normalized];
            });

            setLastOptimisticId(null);

            setQuestion('');
            setFiles([]);
            setPreviewUrls([]);
            setPendingLocalPreviews([]);
            setPendingQuestion(null);
            toast.success('Image(s) sent');
        },
        onError(err) {
            console.error('imageMutation error', err);
            // remove optimistic entry if present
            try {
                queryClient.setQueryData(['aiConversation'], (old = []) => {
                    const list = Array.isArray(old) ? old.filter(i => !(i && i.id === lastOptimisticId)) : [];
                    return list;
                });
            } catch (e) { }
            setLastOptimisticId(null);
            setPendingQuestion(null);
            // toast.error('Failed to send images');
            toast.error(err?.response?.data?.error || 'Failed to send images');
            console.log(err)
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

    // clean up pendingLocalPreviews object URLs when they change/clear
    useEffect(() => {
        return () => {
            pendingLocalPreviews.forEach(p => {
                try { URL.revokeObjectURL(p.url); } catch (e) { }
            });
        };
    }, [pendingLocalPreviews]);

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

    // When files are selected, listen for global Enter key so users can press Enter to send images
    useEffect(() => {
        if (!files || files.length === 0) return undefined;
        const onKey = (e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
                e.preventDefault();
                if (!sendMutation.isLoading) {
                    // send regardless of textarea state when files are present
                    handleSend();
                }
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [files, sendMutation.isLoading]);

    // helper: normalize server-side image arrays in a message (supports new `conversation_images`)
    const getMessageImageUrls = (msg) => {
        // helper to quickly detect image-like paths
        const looksLikeImage = (s) => {
            if (!s || typeof s !== 'string') return false;
            // common image extensions or media path
            return /\.(png|jpe?g|gif|webp|svg)(\?.*)?$|^\/media\//i.test(s);
        };

        // If the question field itself contains image paths (array or single string), prefer that
        const q = msg && msg.question;
        if (Array.isArray(q) && q.length) {
            const fromQ = q
                .map((it) => (typeof it === 'string' ? it : (it.url || it.path || '')))
                .map((p) => (p && p.startsWith('/') ? IMG_BASE + p : p))
                .filter(Boolean);
            if (fromQ.length) return fromQ;
        }
        if (typeof q === 'string' && looksLikeImage(q)) {
            const single = q.startsWith('/') ? IMG_BASE + q : q;
            return [single];
        }
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
                        alt={`http://10.10.13.80:8005${i}`}
                        className="w-28 h-20 object-cover rounded-md border cursor-pointer"
                        onClick={() => setLightboxSrc(u)}
                    />
                ))}
            </div>
        );
    };

    // Try to parse a string that may contain JSON (handles single-quoted Python-like strings)
    const parsePossibleJSON = (s) => {
        if (!s || typeof s !== 'string') return null;
        try {
            return JSON.parse(s);
        } catch (e) {
            // try a heuristic: replace single quotes with double quotes for Python-style repr
            try {
                const replaced = s.replace(/\'/g, '"');
                return JSON.parse(replaced);
            } catch (e2) {
                return null;
            }
        }
    };

    // Minimal, safe markdown -> HTML renderer (supports bold, italic, inline code, code blocks, links, and line breaks)
    const escapeHtml = (str) => String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const markdownToHtml = (md) => {
        if (md == null) return '';
        let s = String(md);
        // Escape HTML first
        s = escapeHtml(s);

        // Code blocks ``` ``` -> <pre><code>
        s = s.replace(/```([\s\S]*?)```/g, (_, code) => {
            return `<pre class="rounded bg-gray-900 text-white p-3 overflow-auto"><code>${code.replace(/&/g, '&amp;')}</code></pre>`;
        });

        // Inline code `code`
        s = s.replace(/`([^`]+)`/g, (_, code) => `<code class="bg-gray-100 px-1 rounded">${code}</code>`);

        // Links [text](url)
        s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
            const safeUrl = escapeHtml(url);
            return `<a href="${safeUrl}" target="_blank" rel="noreferrer" class="underline text-blue-600">${text}</a>`;
        });

        // Bold **text** or __text__
        s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        s = s.replace(/__([^_]+)__/g, '<strong>$1</strong>');

        // Italic *text* or _text_
        s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        s = s.replace(/_([^_]+)_/g, '<em>$1</em>');

        // Convert two or more newlines into paragraph breaks
        s = s.split(/\n\n+/).map(p => p.replace(/\n/g, '<br/>')).join('<p class="mb-2">') + (s.includes('\n\n') ? '</p>' : '');

        return s;
    };

    const renderAnalysisCard = (obj) => {
        if (!obj) return null;
        const analysis = obj.analysis_report || {};
        const skinType = analysis.skin_type || {};
        const conditions = analysis.conditions || {};
        const healthScore = analysis.health_score || null;
        const tips = obj.tips || [];
        const routine = obj.routine || {};
        const ingredients = obj.recommended_ingredients || [];

        return (
            <div className="border border-gray-300 rounded-md p-4 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <div className="text-sm text-gray-500">Skin analysis</div>
                        <div className="text-lg font-semibold">{skinType.classification || 'Unknown'}</div>
                        {skinType.description && <div className="text-xs text-gray-600 mt-1">{skinType.description}</div>}
                    </div>
                    {healthScore && (
                        <div className="text-center">
                            <div className="text-xs text-gray-500">Health</div>
                            <div className="text-xl font-bold">{healthScore}</div>
                        </div>
                    )}
                </div>

                {/* Conditions */}
                <div className="mb-3">
                    <div className="text-sm font-medium mb-1">Conditions</div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                        {Object.keys(conditions).map((k) => {
                            const v = conditions[k];
                            return (
                                <div key={k} className="p-2 bg-gray-50 rounded">
                                    <div className="font-semibold">{k}</div>
                                    {v.level && <div className="text-xs">Level: {v.level}</div>}
                                    {v.insight && <div className="text-xs text-gray-600">{v.insight}</div>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Tips */}
                {tips && tips.length > 0 && (
                    <div className="mb-3">
                        <div className="text-sm font-medium mb-1">Tips</div>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                            {tips.map((t, i) => <li key={i}>{t}</li>)}
                        </ul>
                    </div>
                )}

                {/* Routine */}
                {routine && (
                    <div className="mb-3">
                        <div className="text-sm font-medium mb-1">Routine</div>
                        {routine.daily_routine && (
                            <div className="mb-2">
                                <div className="text-xs font-semibold">Daily</div>
                                <ul className="list-decimala list-inside text-sm text-gray-700">
                                    {routine.daily_routine.map((r, i) => <li key={i}>{r}</li>)}
                                </ul>
                            </div>
                        )}
                        {routine.monthly_routine && (
                            <div className="mb-2">
                                <div className="text-xs font-semibold">Monthly</div>
                                <ul className="list-decimal list-inside text-sm text-gray-700">
                                    {routine.monthly_routine.map((r, i) => <li key={i}>{r}</li>)}
                                </ul>
                            </div>
                        )}
                        {routine.washday && (
                            <div>
                                <div className="text-xs font-semibold">Washday</div>
                                <div className="space-y-2 text-sm text-gray-700">
                                    {routine.washday.map((w, i) => (
                                        <div key={i} className="p-2 bg-gray-50 rounded">
                                            <div className="font-semibold">{w.step_name}</div>
                                            <div className="text-xs text-gray-600">{w.step_description}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Ingredients */}
                {ingredients && ingredients.length > 0 && (
                    <div>
                        <div className="text-sm font-medium mb-1">Recommended Ingredients</div>
                        <div className="flex flex-wrap gap-2">
                            {ingredients.map((ing, i) => (
                                <span key={i} className="text-xs bg-[#F3EDE6] px-2 py-1 rounded">{ing}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Render AI response safely: handle string, array, or object responses
    const renderAIResponse = (resp) => {
        if (resp === null || resp === undefined || resp === '') {
            return <em className="text-gray-400">Thinking......</em>;
        }

        // If it's a string, try to parse JSON-like payloads (some image responses come back as JSON strings)
        if (typeof resp === 'string') {
            const parsed = parsePossibleJSON(resp);
            if (parsed && (parsed.analysis_report || parsed.tips || parsed.recommended_ingredients)) {
                return renderAnalysisCard(parsed);
            }
            // render markdown-aware HTML
            return <div className="prose max-w-none text-sm" dangerouslySetInnerHTML={{ __html: markdownToHtml(resp) }} />;
        }

        // If it's already an object and looks like analysis result, render the card
        if (typeof resp === 'object' && resp !== null) {
            if (resp.analysis_report || resp.tips || resp.recommended_ingredients) {
                return renderAnalysisCard(resp);
            }
            if (Array.isArray(resp)) {
                return resp.map((r, i) => (
                    <div key={i}>{typeof r === 'string' ? <div dangerouslySetInnerHTML={{ __html: markdownToHtml(r) }} /> : JSON.stringify(r)}</div>
                ));
            }
            // fallback: pretty-print object
            try {
                return <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(resp, null, 2)}</pre>;
            } catch (e) {
                return String(resp);
            }
        }

        return String(resp);
    };

    // Normalize a server response into a conversation-like object we can render immediately
    const normalizeConversation = (data) => {
        if (!data || typeof data !== 'object') return null;
        const serverImgs = (data && data.conversation_images) || (data && data.images) || [];
        const imgs = Array.isArray(serverImgs) ? serverImgs.map((p) => (p && p.startsWith ? (p.startsWith('/') ? IMG_BASE + p : p) : p)) : [];

        const aiResp = data.ai_response || data.response || data.summary || data.message || null;

        const normalized = {
            id: data.id || `local-${Date.now()}`,
            created_at: data.created_at || new Date().toISOString(),
            question: data.question || data.question_text || null,
            ai_response: aiResp || (Object.keys(data).length ? data : null),
            conversation_images: imgs,
            // keep original payload (for debugging)
            _raw: data,
        };

        return normalized;
    };

    const handleSend = async () => {
        if (!question.trim() && (!files || files.length === 0)) {
            toast.warn('Please enter a question or attach images');
            return;
        }

        const trimmed = question.trim();

        // snapshot files as an Array immediately so they aren't invalidated by clearing the input
        const sendingFiles = files && files.length ? Array.from(files) : null;
        // create fresh object URLs for the pending previews (don't reuse previewUrls which we'll revoke)
        const sendingPreviews = sendingFiles && sendingFiles.length
            ? sendingFiles.map((f) => ({ name: f.name, url: URL.createObjectURL(f), file: f }))
            : [];

        // create optimistic conversation entry so message appears immediately in history
        const optId = `local-${Date.now()}`;
        const optimistic = {
            id: optId,
            created_at: new Date().toISOString(),
            question: trimmed || null,
            ai_response: null,
            conversation_images: [],
            _local_preview_urls: sendingPreviews.map(p => p.url),
            _optimistic: true,
        };
        queryClient.setQueryData(['aiConversation'], (old = []) => {
            return Array.isArray(old) ? [...old, optimistic] : [optimistic];
        });
        setLastOptimisticId(optId);

        // clear the visible input immediately
        setQuestion('');

        // clear the file input DOM so it appears empty to the user
        try {
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (e) { /* ignore */ }

        // revoke and clear current previewUrls (we created new pending preview URLs above so don't revoke them)
        previewUrls.forEach(p => {
            try { URL.revokeObjectURL(p.url); } catch (e) { }
        });
        setPreviewUrls([]);
        setFiles([]);

        // send the captured payload: prefer images-only mutation when files were selected
        if (sendingFiles) {
            imageMutation.mutate(sendingFiles);
        } else {
            sendMutation.mutate({ question: trimmed });
        }
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
        <div className="">
            <h2 className="text-xl font-semibold mb-4">AI Chat</h2>

            <div className="border border-gray-300 rounded-md p-4 mb-4 max-h-[600px] overflow-auto bg-white" ref={scrollRef}>
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
                                        {imgs.length === 0 ? (
                                            <div className="mt-1 inline-block bg-[#BB9777] text-white p-3 rounded-lg whitespace-pre-wrap">
                                                {typeof msg.question === 'string' ? msg.question : String(msg.question)}
                                            </div>
                                        ) : null}
                                        {imgs.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-2 justify-end">
                                                {
                                                    imgs.map((u, i) => (
                                                        <img
                                                            key={i}
                                                            src={u}
                                                            alt={`img-${i}`}
                                                            className="w-28 h-20 object-cover rounded-md border cursor-pointer"
                                                            onClick={() => setLightboxSrc(u)}
                                                        />

                                                    ))

                                                }

                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* AI response always shown on the left below the question/images */}
                                <div className="flex justify-start">
                                    <div className="max-w-[75%]">
                                        <div className="text-sm font-medium text-gray-600">AI</div>
                                        <div className="mt-1 bg-gray-100 text-gray-800 p-3 rounded-lg whitespace-pre-wrap">
                                            {(msg && msg._optimistic && (sendMutation.isLoading || imageMutation.isLoading))
                                                ? 'AI is typing...'
                                                : renderAIResponse(msg.ai_response)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                {/* If we have a pending (just-sent) message, show it plus AI typing indicator */}

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
                            if (!sendMutation.isLoading && !imageMutation.isLoading) handleSend();
                        }
                    }}
                    // disable textarea while images are selected or when sending
                    disabled={(sendMutation.isLoading || imageMutation.isLoading) || (files && files.length > 0)}
                    rows={3}
                />

                {/* Immediate local previews (show before sending) */}
                {previewUrls.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-2 justify-end">
                        {previewUrls.map((p, i) => (
                            <img key={i} src={p.url} alt={p.name} className="w-28 h-20 object-cover rounded-md border" />
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-3 justify-between">
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={handleFilesChange}
                        // disable file input when there's typed text or when sending
                        disabled={(sendMutation.isLoading || imageMutation.isLoading) || (question && question.trim().length > 0)}
                        className="text-sm"
                    />

                    <button
                        onClick={handleSend}
                        disabled={sendMutation.isLoading || imageMutation.isLoading}
                        className={`inline-flex items-center px-4 py-2 rounded-md text-white ${(sendMutation.isLoading || imageMutation.isLoading) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#BB9777] hover:bg-[#a7765f]'}`}
                        aria-disabled={sendMutation.isLoading || imageMutation.isLoading}
                        type="button"
                    >
                        {(sendMutation.isLoading || imageMutation.isLoading) ? 'Sending...' : 'Send'}
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
