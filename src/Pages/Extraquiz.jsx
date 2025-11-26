import Navbar from '@/Components/Navbar'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosApi from '@/api/axiosApi';

const Extraquiz = () => {
    const { id } = useParams();
    const [answers, setAnswers] = useState({}); // question_id -> array of selected choice_ids

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['extraquiz', id],
        queryFn: async () => {
            const res = await axiosApi.get(`/extra_quiz/api/v1/quiz/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    // Prefill answers if API provided selected_choice per question
    useEffect(() => {
        if (!data || !Array.isArray(data.questions)) return;
        const initial = {};
        data.questions.forEach((q) => {
            if (q.selected_choice) {
                // selected_choice may be a string (single)
                initial[q.question_id] = Array.isArray(q.selected_choice) ? q.selected_choice : [q.selected_choice];
            } else {
                initial[q.question_id] = [];
            }
        });
        setAnswers(initial);
    }, [data]);

    const handleToggleChoice = (question, choiceId) => {
        setAnswers((prev) => {
            const prevForQ = prev[question.question_id] || [];
            if (question.multiple_allowed) {
                // toggle
                const exists = prevForQ.includes(choiceId);
                const next = exists ? prevForQ.filter((c) => c !== choiceId) : [...prevForQ, choiceId];
                return { ...prev, [question.question_id]: next };
            } else {
                // single select -> replace
                return { ...prev, [question.question_id]: [choiceId] };
            }
        });
    };

    const handleSubmit = () => {
        // Flatten selected choice ids into a single array
        const selectedIds = Object.values(answers).flat().filter(Boolean);
        console.log('Selected choice ids:', selectedIds);
        // Later you can POST this array to the API
    };

    if (isLoading) return (
        <div className="px-4 lg:px-10 pt-6">
            <Navbar />
            <div className="p-6">Loading quiz...</div>
        </div>
    );

    if (isError) return (
        <div className="px-4 lg:px-10 pt-6">
            <Navbar />
            <div className="p-6 text-red-600">Failed to load quiz: {String(error)}</div>
        </div>
    );

    if (!data) return (
        <div className="px-4 lg:px-10 pt-6">
            <Navbar />
            <div className="p-6">Quiz not found.</div>
        </div>
    );

    const totalQuestions = Array.isArray(data.questions) ? data.questions.length : 0;
    const answeredCount = Object.values(answers).filter(a => Array.isArray(a) && a.length > 0).length;
    const progressPercent = totalQuestions ? Math.round((answeredCount / totalQuestions) * 100) : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <div className="px-4 lg:px-10 pt-6">
                <Navbar />
            </div>

            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-5 sm:p-6">
                        <h1 className="text-lg sm:text-2xl font-semibold mb-1">{data.title}</h1>
                        {data.description && <p className="text-sm sm:text-base text-gray-600 mb-4">{data.description}</p>}

                        {/* Progress */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-600">Progress</span>
                                <span className="text-sm font-medium text-gray-700">{progressPercent}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-2 bg-[#BB9777]" style={{ width: `${progressPercent}%` }} />
                            </div>
                        </div>

                        <div className="space-y-5">
                            {Array.isArray(data.questions) && data.questions.map((q, idx) => (
                                <div key={q.question_id} className="p-4 sm:p-5 border rounded-lg">
                                    <div className="flex items-start justify-between">
                                        <div className="font-medium text-sm sm:text-base">{idx + 1}. {q.text}</div>
                                        <div className="text-xs text-gray-500">{(answers[q.question_id] || []).length} selected</div>
                                    </div>

                                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {Array.isArray(q.choices) && q.choices.map((ch) => {
                                            const selected = (answers[q.question_id] || []).includes(ch.choice_id);
                                            const pillBase = 'w-full text-left px-3 py-2 rounded-lg border transition-colors';
                                            const pillSelected = 'bg-[#BB9777] border-[#BB9777] text-white';
                                            const pillUnselected = 'bg-white border-gray-200 text-gray-700 hover:shadow-sm';

                                            return (
                                                <label
                                                    key={ch.choice_id}
                                                    className={`${pillBase} ${selected ? pillSelected : pillUnselected} cursor-pointer flex items-center gap-3`}
                                                >
                                                    <input
                                                        type={q.multiple_allowed ? 'checkbox' : 'radio'}
                                                        name={q.question_id}
                                                        checked={selected}
                                                        onChange={() => handleToggleChoice(q, ch.choice_id)}
                                                        className="sr-only"
                                                    />
                                                    <span className="text-sm">{ch.label}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action bar: sticky on mobile */}
                    <div className="border-t bg-white p-4 sm:p-5">
                        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
                            <div className="text-sm text-gray-600">{answeredCount} / {totalQuestions} answered</div>
                            <div className="flex items-center gap-3">
                                <button onClick={handleSubmit} className="btn btn-primary px-4 py-2">Submit Answers</button>
                                <button onClick={() => { const selected = Object.values(answers).flat().filter(Boolean); alert(`Selected: ${selected.join(', ')}`); }} className="btn btn-ghost px-4 py-2">Show Selected</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile sticky footer for actions */}
            <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white border-t p-3">
                <div className="max-w-4xl mx-auto flex gap-3">
                    <button onClick={handleSubmit} className="flex-1 btn btn-primary">Submit</button>
                    <button onClick={() => { const selected = Object.values(answers).flat().filter(Boolean); alert(`Selected: ${selected.join(', ')}`); }} className="flex-1 btn btn-ghost">Show</button>
                </div>
            </div>
        </div>
    )
}

export default Extraquiz


