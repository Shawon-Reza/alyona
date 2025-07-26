import React from 'react';
import { Plus, ImageIcon, Paperclip, Send } from 'lucide-react';

const ChatPanel = () => {
    return (
        <div className="flex flex-col h-full w-full  rounded-2xl overflow-hidden ">
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Date */}
                <div className="text-sm text-gray-500 text-center">May 5</div>

                {/* Bot Message */}
                <div className="flex flex-col items-start gap-1 max-w-[80%]">
                    <div className="bg-white px-4 py-2 rounded-xl text-sm shadow-sm">
                        Hi, I am Elyssa. I got a recommendation for you today
                    </div>
                    <span className="text-xs text-gray-400 self-end pr-1">16:31</span>

                    {/* Product Card */}
                    <div className="flex items-center gap-3 bg-white rounded-xl px-3 py-2 shadow w-full max-w-[270px]">
                        <img
                            src="https://nypost.com/wp-content/uploads/sites/2/2022/04/best-korean-skincare.jpg?quality=75&strip=all"
                            alt="Product"
                            className="w-10 h-20 object-contain rounded-lg"
                        />
                        <div className="flex justify-between items-start w-full">
                            <p className="text-sm font-semibold text-gray-800 leading-tight">
                                Ceramide Hydrating <br /> Night Cream
                            </p>
                            <button className="bg-gray-100 p-1 rounded-full hover:bg-gray-200">
                                <Plus size={16} className="text-gray-500" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* User Message */}
                <div className="flex flex-col items-end gap-1 max-w-[80%] ml-auto">
                    <div className="bg-[#695CFF] text-white px-4 py-2 rounded-xl text-sm">
                        Thanks, please run my skin analysis
                    </div>
                    <span className="text-xs text-gray-400 self-start pl-1">16:33</span>

                    {/* Images */}
                    <div className="flex gap-2 mt-1">
                        <img
                            src="https://nypost.com/wp-content/uploads/sites/2/2022/04/best-korean-skincare.jpg?quality=75&strip=all"
                            alt="Upload 1"
                            className="w-14 h-14 rounded-lg object-cover"
                        />
                        <img
                            src="https://nypost.com/wp-content/uploads/sites/2/2022/04/best-korean-skincare.jpg?quality=75&strip=all"
                            alt="Upload 2"
                            className="w-14 h-14 rounded-lg object-cover"
                        />
                        <div className="w-14 h-14 rounded-lg border border-[#695CFF] flex items-center justify-center">
                            <ImageIcon size={20} className="text-[#695CFF]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Input */}
            <div className="w-full border-t border-gray-200 bg-white/50 backdrop-blur-[100px] px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-between w-full bg-white rounded-lg px-4 py-2 shadow-sm">
                        <input
                            type="text"
                            placeholder="Write a message"
                            className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                        />
                        <button className="p-1.5 rounded-full hover:bg-gray-100 transition">
                            <Paperclip size={18} className="text-gray-500" />
                        </button>
                    </div>
                    <button className="w-12 h-10 flex items-center justify-center bg-[#0D0A44] text-white rounded-lg hover:opacity-90 transition">
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPanel;
