import React, { useState, useRef, useEffect, useMemo } from 'react';
import axiosApi from '@/api/axiosApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const AIChat = () => {
  const [question, setQuestion] = useState('');
  const [files, setFiles] = useState([]);
  const [pendingQuestion, setPendingQuestion] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]);
  const scrollRef = useRef(null);
  const queryClient = useQueryClient();

  // Fetch conversation history
  const { data: history = [], isLoading, isError, error } = useQuery({
    queryKey: ['aiConversation'],
    queryFn: () => axiosApi.get('/chatbot/api/v1/ai-conversation').then(res => res.data),
    staleTime: 30 * 1000,
  });

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
      queryClient.setQueryData(['aiConversation'], (old = []) => {
        if (!old) return [data];
        return Array.isArray(old) ? [...old, data] : [old, data];
      });
      setQuestion('');
      setFiles([]);
      // clear local pending indicator
      setPendingQuestion(null);
      toast.success('Message sent');
    },
    onError(err) {
      console.error(err);
      // clear pending on error as well
      setPendingQuestion(null);
      toast.error('Failed to send message');
    }
  });

  useEffect(() => {
    // scroll to bottom when sortedHistory or pending message changes
    if (!scrollRef.current) return;

    // Use rAF + small timeout to ensure DOM has updated with the new message(s)
    let raf = 0;
    const id = requestAnimationFrame(() => {
      // small timeout helps when images or content change layout
      const t = setTimeout(() => {
        try {
          scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
        } catch (e) {
          // fallback
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
        clearTimeout(t);
      }, 50);
    });

    return () => cancelAnimationFrame(raf || id);
  }, [sortedHistory, pendingQuestion]);

  const handleFilesChange = (e) => {
    const f = e.target.files;
    setFiles(f);
  };

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

  // helper: normalize server-side image arrays in a message
  const getMessageImageUrls = (msg) => {
    const candidates = msg.images || msg.files || msg.attachments || [];
    if (!candidates) return [];
    // candidates can be array of strings (urls) or objects with url/src
    return Array.isArray(candidates)
      ? candidates.map((it) => (typeof it === 'string' ? it : it.url || it.src || ''))
                 .filter(Boolean)
      : [];
  };

  const renderImageList = (urls = []) => {
    if (!urls || urls.length === 0) return null;
    return (
      <div className="mt-2 flex flex-wrap gap-2">
        {urls.map((u, i) => (
          <img key={i} src={u} alt={`img-${i}`} className="w-28 h-20 object-cover rounded-md border" />
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
    sendMutation.mutate({ question: trimmed, files });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">AI Chat</h2>

      <div className="border rounded-md p-4 mb-4 h-96 overflow-auto bg-white" ref={scrollRef}>
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

                {/* User message - right (show first) */}
                <div className="flex justify-end mb-1">
                  <div className="max-w-[75%] text-right">
                    <div className="text-sm font-medium text-gray-600">You</div>
                    <div className="mt-1 inline-block bg-[#BB9777] text-white p-3 rounded-lg whitespace-pre-wrap">
                      {msg.question}
                    </div>
                  </div>
                </div>

                {/* AI response - left (show after user message) */}
                <div className="flex justify-start">
                  <div className="max-w-[75%]">
                    <div className="text-sm font-medium text-gray-600">AI</div>
                    <div className="mt-1 bg-gray-100 text-gray-800 p-3 rounded-lg whitespace-pre-wrap">
                      {msg.ai_response || <em className="text-gray-400">(no response)</em>}
                    </div>
                  </div>
                </div>

                {/* Message images (if any) */}
                {imgs.length > 0 && (
                  <div className="mt-2">
                    {renderImageList(imgs)}
                  </div>
                )}
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

            {/* pending file previews */}
            {previewUrls.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2 justify-end">
                {previewUrls.map((p, i) => (
                  <img key={i} src={p.url} alt={p.name} className="w-28 h-20 object-cover rounded-md border" />
                ))}
              </div>
            )}

            {/* AI typing indicator - left */}
            <div className="flex justify-start">
              <div className="max-w-[75%]">
                <div className="text-sm font-medium text-gray-600">AI</div>
                <div className="mt-1 bg-gray-100 text-gray-800 p-3 rounded-lg whitespace-pre-wrap italic text-sm">
                  {sendMutation.isLoading ? 'AI is typing...' : <em className="text-gray-400">(no response)</em>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-md shadow-sm">
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

        <div className="flex items-center gap-3">
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
    </div>
  );
};

export default AIChat;
