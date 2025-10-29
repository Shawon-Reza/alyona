import React, { useState, useRef, useEffect } from 'react';
import axiosApi from '@/api/axiosApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const AIChat = () => {
  const [question, setQuestion] = useState('');
  const [files, setFiles] = useState([]);
  const scrollRef = useRef(null);
  const queryClient = useQueryClient();

  // Fetch conversation history
  const { data: history = [], isLoading, isError, error } = useQuery({
    queryKey: ['aiConversation'],
    queryFn: () => axiosApi.get('/chatbot/api/v1/ai-conversation').then(res => res.data),
    staleTime: 30 * 1000,
  });

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
      toast.success('Message sent');
    },
    onError(err) {
      console.error(err);
      toast.error('Failed to send message');
    }
  });

  useEffect(() => {
    // scroll to bottom when history changes
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const handleFilesChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSend = async () => {
    if (!question.trim() && (!files || files.length === 0)) {
      toast.warn('Please enter a question or attach images');
      return;
    }
    sendMutation.mutate({ question: question.trim(), files });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">AI Chat</h2>

      <div className="border rounded-md p-4 mb-4 h-96 overflow-auto bg-white" ref={scrollRef}>
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading history...</div>
        ) : isError ? (
          <div className="text-sm text-red-500">Error loading history: {String(error)}</div>
        ) : history.length === 0 ? (
          <div className="text-sm text-gray-500">No conversation history yet. Start a new chat.</div>
        ) : (
          history.map((msg, idx) => (
            <div key={idx} className="mb-4">
              <div className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleString()}</div>
              <div className="mt-1">
                <div className="text-sm font-medium">You</div>
                <div className="pl-2 text-gray-800 whitespace-pre-wrap">{msg.question}</div>
              </div>
              <div className="mt-2">
                <div className="text-sm font-medium">AI</div>
                <div className="pl-2 text-gray-700 whitespace-pre-wrap">{msg.ai_response || <em className="text-gray-400">(no response)</em>}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-white p-4 rounded-md shadow-sm">
        <textarea
          className="textarea textarea-bordered w-full mb-2"
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
        />

        <div className="flex items-center gap-3">
          <input type="file" multiple onChange={handleFilesChange} />
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
