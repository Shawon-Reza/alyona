import axiosApi from '@/api/axiosApi';
import Navbar from '@/Components/Navbar'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom';

const MissedQuiz = () => {

    const { isLoading, error, data } = useQuery({
        queryKey: ['missedQuiz'],
        queryFn: async () => {
            const res = await axiosApi.get('/extra_quiz/api/v1/extra-quiz-list')
            return res.data
        },
    });

    if (isLoading) return (
        <div className="px-4 lg:px-10 pt-6">
            <Navbar />
            <div className="p-6">Loading quizzes...</div>
        </div>
    )

    if (error) return (
        <div className="px-4 lg:px-10 pt-6">
            <Navbar />
            <div className="p-6 text-red-600">Failed to load quizzes: {String(error)}</div>
        </div>
    )

    const quizzes = Array.isArray(data) ? data : [];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <div className="px-4 lg:px-10 pt-6">
                <Navbar />
            </div>

            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-4">Available Quizzes</h1>

                {quizzes.length === 0 ? (
                    <div className="p-6 bg-white rounded shadow">
                        <p className="text-gray-600">No quizzes available right now.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {quizzes.map((quiz) => {
                            const answered = Number(quiz.answered_questions_count || 0);
                            const total = Number(quiz.total_questions_count || 0);
                            const percent = total ? Math.round((answered / total) * 100) : 0;
                            return (
                                <div key={quiz.quiz_id} className="bg-white rounded-lg shadow-sm p-5 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h2 className="text-lg font-semibold">{quiz.title}</h2>
                                                {quiz.description && <p className="text-sm text-gray-600 mt-1">{quiz.description}</p>}
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-gray-500">{answered} / {total}</div>
                                                <div className="text-sm font-medium text-gray-700">{percent}%</div>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-2 bg-[#BB9777]" style={{ width: `${percent}%` }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between gap-3">
                                        <Link to={`/extraquiz/${quiz.quiz_id}`} className="btn btn-primary">Take Quiz</Link>
                                        <div className="text-sm text-gray-500">Day to appear: {quiz.unlocked_at ?? '—'}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MissedQuiz