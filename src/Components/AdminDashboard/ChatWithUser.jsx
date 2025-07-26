import React, { useState } from 'react'
import ChatPanel from '../ChatPanel'
import RecomendationsForUser from '../RecomendationsForUser'
import { Paperclip, ShoppingBag, X, Sparkles } from 'lucide-react'
import MentorChatPalenHeader from './MentorChatPalenHeader'

const ChatWithUser = () => {
    const [showMobileRecommendations, setShowMobileRecommendations] = useState(false)

    return (
        <div>
            {/* Chat Panel Header */}
            <div className='bg-white rounded-2xl my-4'>
                <MentorChatPalenHeader></MentorChatPalenHeader>
            </div>
            
            <div className='flex justify-between gap-5'>
                {/* Leftside Content - Hidden on mobile, visible on desktop */}
                <div className='hidden md:block w-[30%] xl:w-[20%] h-scr'>
                    <RecomendationsForUser></RecomendationsForUser>
                    <div className='mt-5 flex flex-col gap-5'>
                        <div className='bg-[#EDDBCB] p-4 rounded-xl font-bold flex items-center gap-3 cursor-pointer '>
                            <span className='p-2 bg-white rounded-full'>
                                <ShoppingBag />
                            </span>
                            Recommended products
                        </div>
                        <div className='bg-[#EDDBCB] p-4 rounded-xl font-bold flex items-center gap-3 cursor-pointer' >
                            <span className='p-2 bg-white rounded-full'>
                                <Paperclip />
                            </span>
                            Attach a document
                        </div>
                    </div>
                </div>

                {/* Rightside Content */}
                <div className={`w-full md:w-[70%] xl:w-[80%] bg-white rounded-xl h-[calc(100vh-0px)] transition-opacity duration-300 ${showMobileRecommendations ? 'md:opacity-100 opacity-50' : 'opacity-100'}`}>
                    {/* Mobile AI Recommendations Button - Only visible on mobile */}
                    <div className='md:hidden p-4 border-b border-gray-100'>
                        <button 
                            onClick={() => setShowMobileRecommendations(true)}
                            className='w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-purple-600 hover:to-blue-600 transition-all duration-200 cursor-pointer'
                        >
                            <Sparkles size={20} />
                            AI Recommendations
                        </button>
                    </div>
                    
                    <ChatPanel></ChatPanel>
                </div>
            </div>

            {/* Mobile Recommendations Popup - Only visible on mobile */}
            {showMobileRecommendations && (
                <div className='md:hidden fixed inset-0 z-50 flex'>
                    {/* Backdrop - Transparent to show background content */}
                    <div 
                        className='absolute inset-0 bg-transparent'
                        onClick={() => setShowMobileRecommendations(false)}
                    ></div>
                    
                    {/* Popup Content */}
                    <div className='relative bg-white w-80 h-full overflow-y-auto shadow-2xl animate-slide-in-left border-r border-gray-200'>
                        {/* Popup Header */}
                        <div className='sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10 shadow-sm'>
                            <h2 className='text-lg font-semibold text-gray-800 flex items-center gap-2'>
                                <Sparkles size={20} className='text-purple-500' />
                                AI Recommendations
                            </h2>
                            <button 
                                onClick={() => setShowMobileRecommendations(false)}
                                className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                            >
                                <X size={20} className='text-gray-600' />
                            </button>
                        </div>
                        
                        {/* Popup Body */}
                        <div className='p-4'>
                            <RecomendationsForUser></RecomendationsForUser>
                            <div className='mt-5 flex flex-col gap-5'>
                                <div 
                                    className='bg-[#EDDBCB] p-4 rounded-xl font-bold flex items-center gap-3 cursor-pointer hover:bg-[#e5d1bb] transition-colors'
                                    onClick={() => {
                                        // Handle recommended products action
                                        setShowMobileRecommendations(false)
                                    }}
                                >
                                    <span className='p-2 bg-white rounded-full'>
                                        <ShoppingBag />
                                    </span>
                                    Recommended products
                                </div>
                                <div 
                                    className='bg-[#EDDBCB] p-4 rounded-xl font-bold flex items-center gap-3 cursor-pointer hover:bg-[#e5d1bb] transition-colors'
                                    onClick={() => {
                                        // Handle attach document action
                                        setShowMobileRecommendations(false)
                                    }}
                                >
                                    <span className='p-2 bg-white rounded-full'>
                                        <Paperclip />
                                    </span>
                                    Attach a document
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add custom CSS for slide animation */}
            <style jsx>{`
                @keyframes slide-in-left {
                    from {
                        transform: translateX(-100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }
                .animate-slide-in-left {
                    animation: slide-in-left 0.3s ease-out;
                }
            `}</style>
        </div>
    )
}

export default ChatWithUser