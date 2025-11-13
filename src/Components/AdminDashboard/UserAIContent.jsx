"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"
import { useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import axiosApi from '@/api/axiosApi'
import { toast } from 'react-toastify'

export default function UserAIContent() {
    // Months list: value should be 1..12 for backend compatibility
    const MONTHS = [
        { label: 'JAN', value: 1 },
        { label: 'FEB', value: 2 },
        { label: 'MAR', value: 3 },
        { label: 'APR', value: 4 },
        { label: 'MAY', value: 5 },
        { label: 'JUN', value: 6 },
        { label: 'JUL', value: 7 },
        { label: 'AUG', value: 8 },
        { label: 'SEP', value: 9 },
        { label: 'OCT', value: 10 },
        { label: 'NOV', value: 11 },
        { label: 'DEC', value: 12 },
    ]

    const [selectedFaqMonth, setSelectedFaqMonth] = useState(() => new Date().getMonth() + 1)
    const [selectedTopicMonth, setSelectedTopicMonth] = useState(() => new Date().getMonth() + 1)
    const { id } = useParams()
    const userId = id || 'me'

    // FAQs
    const { data: faqsRaw, isLoading: faqsLoading, isError: faqsError, error: faqsErr } = useQuery({
        queryKey: ['faqs', userId, selectedFaqMonth],
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/frequently-asked-questions/${userId}/${selectedFaqMonth}`)
            // backend may return { data: [...] } or directly an array
            return res.data?.data ?? res.data ?? []
        },
        keepPreviousData: true,
    })

    // normalize faqs to an array of { question, count, similar_questions }
    const faqs = Array.isArray(faqsRaw) ? faqsRaw : []
    // track expanded FAQ rows
    const [expandedFaqs, setExpandedFaqs] = useState({})
    const toggleFaqExpanded = (idx) => setExpandedFaqs(s => ({ ...s, [idx]: !s[idx] }))

    // Last topics
    const { data: lastTopicsRaw, isLoading: topicsLoading, isError: topicsError, error: topicsErr } = useQuery({
        queryKey: ['lastTopics', userId, selectedTopicMonth],
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/last-topic-asked/${userId}/${selectedTopicMonth}`)
            // backend returns { last_topics: [...] } or an array
            return res.data?.last_topics ?? res.data ?? []
        },
        keepPreviousData: true,
    })

    const lastTopics = Array.isArray(lastTopicsRaw) ? lastTopicsRaw : []

    const [downloading, setDownloading] = useState(false)

    const handleDownloadConversations = async () => {
        if (downloading) return
        setDownloading(true)
        try {
            const res = await axiosApi.get(`/admin_panel/api/v1/download-user-conversation/${userId}`, {
                responseType: 'blob',
            })

            // Try to extract filename from content-disposition header
            const disposition = res.headers && (res.headers['content-disposition'] || res.headers['Content-Disposition'])
            let filename = 'conversations.csv'
            if (disposition) {
                const match = /filename\*=UTF-8''(.+)$/.exec(disposition) || /filename="?([^";]+)"?/.exec(disposition)
                if (match && match[1]) {
                    filename = decodeURIComponent(match[1])
                }
            }

            const contentType = (res.headers && (res.headers['content-type'] || res.headers['Content-Type'])) || 'text/csv'
            const blob = new Blob([res.data], { type: contentType })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = filename
            document.body.appendChild(a)
            a.click()
            a.remove()
            window.URL.revokeObjectURL(url)
            toast.success('Download started')
        } catch (err) {
            console.error('download error', err)
            toast.error('Failed to download conversations')
        } finally {
            setDownloading(false)
        }
    }

    return (
        <div className="">
            {/* Use of AI Section */}
            <div className="">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-base-300 ">Use of AI</h2>
            </div>

            {/* Frequently Asked Questions */}
            <div className="mb-4 overflow-y-auto shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className=" text-lg font-semibold text-[#5B5B5B] px-2">Frequently asked questions</h2>
                    <div className="flex items-center gap-2">
                        <button
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={() => setSelectedFaqMonth((m) => (m === 1 ? 12 : m - 1))}
                            aria-label="previous month"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <select
                            value={selectedFaqMonth}
                            onChange={(e) => setSelectedFaqMonth(Number(e.target.value))}
                            className="text-sm border border-base-300 rounded px-2 py-1"
                        >
                            {MONTHS.map((mo) => (
                                <option key={mo.value} value={mo.value}>{mo.label}</option>
                            ))}
                        </select>
                        <button
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={() => setSelectedFaqMonth((m) => (m === 12 ? 1 : m + 1))}
                            aria-label="next month"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className=" bg-white shadow-2xl px-4  rounded-xl">
                    {faqsLoading ? (
                        <div className="py-2 text-gray-500">Loading FAQs...</div>
                    ) : faqsError ? (
                        <div className="py-2 text-red-500">Error loading FAQs: {String(faqsErr)}</div>
                    ) : Array.isArray(faqs) && faqs.length > 0 ? (
                        // show only the latest 5 FAQs
                        faqs.slice(0, 5).map((q, index) => {
                            const questionText = typeof q === 'string' ? q : q.question || q.title || ''
                            const similar = Array.isArray(q.similar_questions) ? q.similar_questions : []
                            const count = q.count ?? (q.total ?? 0)
                            const expanded = Boolean(expandedFaqs[index])
                            return (
                                <div key={index} className="py-2 text-gray-700 border-b border-base-300 ">
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium text-gray-800">{questionText}</div>
                                        <div className="ml-4 text-sm text-gray-500">{count} times</div>
                                    </div>
                                    {similar.length > 0 && (
                                        <div className="mt-2 text-sm text-gray-600">
                                            {expanded ? (
                                                <>
                                                    {similar.map((s, i) => (
                                                        <div key={i} className="py-0.5">{s}</div>
                                                    ))}
                                                </>
                                            ) : (
                                                <div>
                                                    {similar.slice(0, 5).join(', ')}{similar.length > 5 ? '...' : ''}
                                                </div>
                                            )}
                                            {similar.length > 5 && (
                                                <button
                                                    className="text-xs text-blue-600 ml-1"
                                                    onClick={() => toggleFaqExpanded(index)}
                                                >
                                                    {expanded ? 'Show less' : 'Show more'}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })
                    ) : (
                        <div className="py-2 text-gray-500">No frequently asked questions for this month.</div>
                    )}
                </div>
            </div>

            {/* Last Topics */}
            <div className="">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#5B5B5B]">Last topics</h2>
                    <div className="flex items-center gap-2">
                        <button
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={() => setSelectedTopicMonth((m) => (m === 1 ? 12 : m - 1))}
                            aria-label="previous month"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <select
                            value={selectedTopicMonth}
                            onChange={(e) => setSelectedTopicMonth(Number(e.target.value))}
                            className="text-sm border border-base-300 rounded px-2 py-1"
                        >
                            {MONTHS.map((mo) => (
                                <option key={mo.value} value={mo.value}>{mo.label}</option>
                            ))}
                        </select>
                        <button
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={() => setSelectedTopicMonth((m) => (m === 12 ? 1 : m + 1))}
                            aria-label="next month"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="space-y-2 bg-white rounded-xl p-3 shadow-xl">
                    {topicsLoading ? (
                        <div className="py-2 text-gray-500">Loading topics...</div>
                    ) : topicsError ? (
                        <div className="py-2 text-red-500">Error loading topics: {String(topicsErr)}</div>
                    ) : Array.isArray(lastTopics) && lastTopics.length > 0 ? (
                        // show only the latest 5 topics
                        lastTopics.slice(0, 5).map((topic, index) => (
                            <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                                <p className="text-gray-900 mb-2 leading-relaxed">{typeof topic === 'string' ? topic : String(topic)}</p>
                            </div>
                        ))
                    ) : (
                        <div className="py-2 text-gray-500">No topics found for this month.</div>
                    )}
                </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-end mt-5 ">
                <button
                    onClick={handleDownloadConversations}
                    className="flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                >
                    Download conversations
                    <Download className="w-4 h-4 ml-2 " />
                </button>
            </div>
        </div>
    )
}
