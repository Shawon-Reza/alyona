
import TextEditor from './TextEditor'
import React, { useState } from 'react';

const CreateReport = () => {

    const [title, setTitle] = useState('');

    const handleSave = () => {
        console.log('Saved title:', title);
    };


    return (
        <div>
            <div>
                <div className=" mt-10">
                    {/* Title Section */}
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Write a title for the document</h2>

                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        {/* Input Field */}
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Name your document"
                            className="bg-white w-full lg:w-[75%] py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#BB9777] focus:border-transparent rounded-lg shadow-xl"
                        />

                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            className="w-full lg:w-[20%] py-2 bg-[#BB9777] text-white font-semibold rounded-lg hover:bg-[#b18863] focus:ring-2 focus:ring-[#BB9777] focus:ring-opacity-50"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>


            <div>
                <h1 className='text-[#181818] text-xl py-4 '>Write your report here</h1>
                <div>
                    <TextEditor></TextEditor>
                </div>
            </div>
        </div>
    )
}

export default CreateReport