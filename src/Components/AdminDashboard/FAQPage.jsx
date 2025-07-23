"use client"

import { useState } from "react"
import { Download, ChevronLeft, ChevronRight, Edit } from "lucide-react"
import { useNavigate } from "react-router-dom"

const faqData = [
    {
        id: 1,
        question: "What skincare ingredients work best to prevent aging and wrinkles?",
        count: "2.6k",
    },
    {
        id: 2,
        question: "How should I match hair color to someone's skin tone?",
        count: "1.5k",
    },
    {
        id: 3,
        question: "What's the difference between physical and chemical sunscreen?",
        count: "1.23k",
    },
    {
        id: 4,
        question: "What's the best way to clean makeup brushes?",
        count: "1k",
    },
    {
        id: 5,
        question: "How do I choose the right foundation shade?",
        count: "800",
    },
]

export default function FAQPage() {
    const [selectedMonth, setSelectedMonth] = useState("MAR")

    const handleEdit = (id) => {
        console.log(`Edit FAQ with ID: ${id}`)
    }

    const handleDownloadData = () => {
        console.log("Download data clicked")

    }



    const navigate = useNavigate()
    return (
        <div className="min-h-screen p-6">
            {/* Breadcrumbs */}
            <div className="text-sm breadcrumbs mb-6 flex justify-between ">
                <ul>
                    <li>
                        <a href="/admindashboard" className="text-gray-500">Dashboard</a>
                    </li>
                    <li className="text-gray-900">FAQ</li>
                </ul>

                {/* Download Button */}
                <button onClick={handleDownloadData} className="btn bg-[#090642] text-white hover:bg-purple-800 rounded-lg">
                    <Download className="w-4 h-4 mr-2" />
                    Download data
                </button>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold">Most frequently asked questions</h1>
                </div>
                <div className="flex items-center gap-4">
                    {/* Month Navigation */}
                    <div className="flex items-center gap-2">
                        <button className="btn btn-ghost btn-sm">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="select select-bordered select-sm w-20"
                        >
                            <option value="JAN">JAN</option>
                            <option value="FEB">FEB</option>
                            <option value="MAR">MAR</option>
                            <option value="APR">APR</option>
                            <option value="MAY">MAY</option>
                            <option value="JUN">JUN</option>
                        </select>
                        <button className="btn btn-ghost btn-sm">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>


                </div>
            </div>

            {/* FAQ List */}
            <div className="card bg-base-100 shadow-md border border-gray-200">
                <div className="card-body p-0">
                    <div className="divide-y divide-gray-200">
                        {faqData.map((faq, index) => (
                            <div key={faq.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900 leading-relaxed">{faq.question}</p>
                                </div>
                                <div className="flex items-center gap-4 ml-6">
                                    <span className="text-sm font-medium text-gray-900 min-w-[3rem] text-right">{faq.count}</span>
                                    <button
                                        onClick={() => handleEdit(faq.id)}
                                        className="btn btn-ghost btn-sm btn-circle text-gray-400 hover:text-gray-600"
                                    >
                                        <Edit
                                            onClick={() => {
                                                navigate('/admindashboard/faq-edit-answare')
                                            }}
                                            className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
