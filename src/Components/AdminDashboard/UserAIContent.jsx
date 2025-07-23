"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"

const aiData = {
    frequentlyAskedQuestions: [
        "What skincare ingredients work best to prevent aging and wrinkles?",
        "How should I match hair color to someone's skin tone?",
        "What's the difference between physical and chemical sunscreen?",
        "What's the best way to clean makeup brushes?",
        "How do I choose the right foundation shade?",
    ],
    lastTopics: [
        {
            title:
                "Discover the top skincare ingredients that can help you maintain youthful skin and reduce the appearance of wrinkles.",
            content: "Ingredients like retinol, hyaluronic acid, and peptides are essential in your anti-aging arsenal.",
        },
        {
            title: "When selecting a hair color, consider the undertones of the skin.",
            content:
                "Warm skin tones pair beautifully with golden blondes and rich browns, while cool tones shine with ash blondes and deep blacks.",
        },
        {
            title:
                "Physical sunscreens create a barrier on the skin to reflect UV rays, while chemical sunscreens absorb UV radiation and convert it into heat.",
            content: "Understanding the differences can help you choose the best protection for your skin.",
        },
        {
            title: "To keep your makeup brushes in top condition, clean them regularly with a gentle soap or brush cleaner.",
            content: "Rinse thoroughly and lay them flat to dry to maintain their shape and longevity.",
        },
        {
            title: "Choosing the right foundation shade involves matching it to your skin's undertone.",
            content:
                "Test shades on your jawline in natural light to find the perfect match that blends seamlessly with your complexion.",
        },
    ],
}

export default function UserAIContent() {
    const [selectedMonth, setSelectedMonth] = useState("JUN")

    const handleDownloadConversations = () => {
        console.log("Download conversations clicked")
    }

    return (
        <div className="">
            {/* Use of AI Section */}
            <div className="">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b-2 border-base-300 ">Use of AI</h2>
            </div>

            {/* Frequently Asked Questions */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#5B5B5B]">Frequently asked questions</h2>
                    <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="text-sm border border-base-300 rounded px-2 py-1"
                        >
                            <option value="JUN">JUN</option>
                            <option value="MAY">MAY</option>
                            <option value="APR">APR</option>
                        </select>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="space-y-2 bg-white shadow-xl px-4 rounded-xl">
                    {aiData.frequentlyAskedQuestions.map((question, index) => (
                        <div key={index} className="py-2 text-gray-700 border-b border-base-300 ">
                            {question}
                        </div>
                    ))}
                </div>
            </div>

            {/* Last Topics */}
            <div className="">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#5B5B5B]">Last topics</h2>
                    <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="text-sm border border-base-300  rounded px- py-1"
                        >
                            <option value="JUN">JUN</option>
                            <option value="MAY">MAY</option>
                            <option value="APR">APR</option>
                        </select>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="space-y-2 bg-white rounded-xl p-3 shadow-xl">
                    {aiData.lastTopics.map((topic, index) => (
                        <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                            <p className="text-gray-900 mb-2 leading-relaxed">{topic.title}</p>
                            <p className="text-gray-600 text-sm leading-relaxed">{topic.content}</p>
                        </div>
                    ))}
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
