import React from 'react'
import ChatPanel from '../ChatPanel'
import RecomendationsForUser from '../RecomendationsForUser'
import { Paperclip, ShoppingBag } from 'lucide-react'
import MentorChatPalenHeader from './MentorChatPalenHeader'



const ChatWithUser = () => {
    return (
        <div>
            {/* Chat Panel Header */}
            <div className='bg-white rounded-2xl my-4'>
                <MentorChatPalenHeader></MentorChatPalenHeader>
            </div>


            <div className='flex justify-between gap-5'>

                <div className='w-[30%] xl:w-[20%] h-scr'>
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

                <div className='w-[70%] xl:w-[80%] bg-white rounded-xl h-[calc(100vh-0px)] '>
                    <ChatPanel></ChatPanel>
                </div>
            </div>

        </div>
    )
}

export default ChatWithUser