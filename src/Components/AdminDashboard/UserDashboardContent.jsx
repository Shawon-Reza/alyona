import React from 'react'
import AboutMySkin from '../AboutMySkin'
import RoutineCompletion from '../RoutineCompletion'
import DataSetSummary from '../DataSetSummary'
import GoalProgress from '../GoalProgress'
import SkinAnalysisPageIMG from '../../assets/SkinAnalysisPageIMG.png'
import { FaSmile, FaTshirt, FaGem } from 'react-icons/fa'; // For Font Awesome Icons
import { MdHome, MdStar } from 'react-icons/md';

const UserDashboardContent = () => {
    const efficiency = 78; // for skincare efficiency
    const proficiency = 50; // for skincare proficiency

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column (Image + Description) */}
                <div className="col-span-1 hidden sm:block bg-white/50 shadow-lg rounded-2xl p-6 mb-10">
                    {/* Skin Type Image */}
                    <div className="flex justify-center mb-4">
                        <img src={SkinAnalysisPageIMG} alt="Skin Analysis" className="w-24 h-24 object-cover rounded-full" />
                    </div>

                    {/* Skin Type Title */}
                    <h3 className="font-semibold text-xl text-center mb-4">Normal Type</h3>

                    {/* Skin Type Description */}
                    <p className="text-md text-gray-700">
                        Congratulations! You are a happy owner of a normal skin type. Even if you might have some skin concerns like wrinkles or dark circles. Your skin is perfect! Your skincare routine should be focused on maintaining your skin beauty and tackling your specific concerns that is quite doable with the right ingredients. Protect the microbiome (natural skin’s barrier) as it does a great job in keeping your skin well-balanced. Right diet and lifestyle will support your skin natural beauty, correct skincare routine will prolong your youth and fortify your skin even more.
                    </p>
                </div>

                {/* Right Column (About My Skin, Goal Progress, etc.) */}
                <div className="col-span-2">
                    {/* About My Skin + Goal Progress */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                        {/* About My Skin */}
                        <AboutMySkin />

                        {/* Goal Progress */}
                        <GoalProgress />
                    </div>

                    {/* Routine & Data Set */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
                        {/* Routine Completion */}
                        <RoutineCompletion />

                        {/* Data Set */}
                        <DataSetSummary />
                    </div>
                </div>
            </div>

            <div className="">
                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Skincare Efficiency */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        {/* Efficiency Title */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-700">Your skincare is {efficiency}% efficient</h3>
                            <div className="flex items-center space-x-2">
                                <span className="bg-blue-100 text-blue-800 text-xs py-1 px-3 rounded-full">Level 3</span>
                                <span className="bg-yellow-100 text-yellow-800 text-xs py-1 px-3 rounded-full">3 days streak</span>
                            </div>
                        </div>

                        {/* Efficiency Progress Bar */}
                        <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${efficiency}%` }}></div>
                        </div>
                        <span className="text-gray-600 text-sm">{efficiency}% efficient</span>
                    </div>

                    {/* Right Column: Skincare Proficiency Level */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        {/* Proficiency Title */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-700">Your skincare proficiency level</h3>
                            <span className="bg-blue-100 text-blue-800 text-xs py-1 px-3 rounded-full">Level 3</span>
                        </div>

                        {/* Proficiency Progress Bar */}
                        <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                            <div className="bg-gray-400 h-2 rounded-full" style={{ width: `${proficiency}%` }}></div>
                        </div>
                        <span className="text-gray-600 text-sm">Level 3</span>
                    </div>
                </div>

                {/* Achievements Section */}
                <div className="">
                    {/* Achievements Section */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Level 3 Badge */}
                        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-2">
                            <FaSmile className="text-blue-500 w-6 h-6" />
                            <span className="text-gray-700 text-sm">Level 3</span>
                        </div>

                        {/* 3 Days Streak Badge */}
                        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-2">
                            <FaTshirt className="text-blue-400 w-6 h-6" />
                            <span className="text-gray-700 text-sm">3 days streak</span>
                        </div>

                        {/* My First Review Badge */}
                        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-2">
                            <MdStar className="text-teal-500 w-6 h-6" />
                            <span className="text-gray-700 text-sm">My first review</span>
                        </div>

                        {/* You’ve Tried 3 Cleansers Badge */}
                        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-2">
                            <FaGem className="text-orange-400 w-6 h-6" />
                            <span className="text-gray-700 text-sm">You’ve tried 3 cleansers</span>
                        </div>

                        {/* My First Product Badge */}
                        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-2">
                            <MdHome className="text-purple-500 w-6 h-6" />
                            <span className="text-gray-700 text-sm">My first product</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserDashboardContent