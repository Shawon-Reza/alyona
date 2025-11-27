import React from 'react'
import AboutMySkin from '../AboutMySkin'
import RoutineCompletion from '../RoutineCompletion'
import DataSetSummary from '../DataSetSummary'
import GoalProgress from '../GoalProgress'
import SkinAnalysisPageIMG from '../../assets/SkinAnalysisPageIMG.png'
import { FaSmile, FaTshirt, FaGem } from 'react-icons/fa'; // For Font Awesome Icons
import { MdHome, MdStar } from 'react-icons/md';
import { useParams } from 'react-router-dom'
import axiosApi from '@/api/axiosApi'
import { useQuery } from '@tanstack/react-query'

const UserDashboardContent = () => {
    const efficiency = 78; // for skincare efficiency
    const proficiency = 50; // for skincare proficiency
    const { id } = useParams()

    console.log(id)

    const { isPending, error, data } = useQuery({
        queryKey: ['dashboardData', id],
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/user-dashboard/${id}`)
            return res.data
        }
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message
    console.log(data)




    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (Image + Description) */}
                <div className="col-span-1 hidden sm:block bg-white/50 shadow-lg rounded-2xl p-6 mb-10">
                    {/* Skin Type Image */}
                    <div className="flex justify-center mb-4">
                        <img src={SkinAnalysisPageIMG} alt="Skin Analysis" className="w-24 h-24 object-cover rounded-full" />
                    </div>

                    {/* Skin Type Title */}
                    <h3 className="font-semibold text-xl text-center mb-4">{data?.quiz_result?.skin_type || 'Unknown Skin Type'}</h3>

                    {/* Skin Type Description */}
                    <p className="text-md text-gray-700">
                        {
                            data?.quiz_result?.description || 'No description available.'
                        }
                    </p>
                </div>

                {/* Right Column (About My Skin, Goal Progress, etc.) */}
                <div className="col-span-2">
                    {/* About My Skin + Goal Progress */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                        {/* About My Skin */}
                        <AboutMySkin data={data?.dashboard_average} />

                        {/* Goal Progress */}
                        <GoalProgress data={data?.avg_usage} />
                    </div>

                    {/* Routine & Data Set */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
                        {/* Routine Completion */}
                        <RoutineCompletion data1={data?.weekly_goal_tracking
                        } data2={data?.weekly_product_completion} />

                        {/* Data Set */}
                        <DataSetSummary data={data?.product_usage_consistency} />
                    </div>
                </div>
            </div>

            <div className="">
                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Skincare Efficiency */}
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        {/* Efficiency Title */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-md xl:text-xl font-semibold text-gray-700">Your have {data?.level?.points || "N/A"} point</h3>
                            <div className="flex items-center space-x-2">
                                <span className="bg-blue-100 text-blue-800 text-xs py-1 px-3 rounded-full">{data?.level?.current_level || "N/A"}</span>
                                <span className="bg-yellow-100 text-yellow-800 text-xs py-1 px-3 rounded-full">{data?.streak || "N/A"} days streak</span>
                            </div>
                        </div>

                        {/* Efficiency Progress Bar */}
                        <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${data?.dashboard_average?.avg_efficiency || "N/A"}%` }}></div>
                        </div>
                        <span className="text-gray-600 text-sm">{data?.dashboard_average?.avg_efficiency || "N/A"}% Efficient</span>
                    </div>

                    {/* Right Column: Skincare Proficiency Level */}
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        {/* Proficiency Title */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-md xl:text-xl font-semibold text-gray-700">Your skincare proficiency level</h3>
                            <span className="bg-blue-100 text-blue-800 text-xs py-1 px-3 rounded-full">{data?.level?.current_level}</span>
                        </div>

                        {/* Proficiency Progress Bar */}
                        <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${data?.dashboard_average?.avg_efficiency || "N/A"}%` }}></div>
                        </div>
                        <span className="text-gray-600 text-sm">{data?.level?.current_level || 'N/A'}</span>
                    </div>
                </div>

                {/* Achievements Section (recent badges from API) */}
                <div className="">
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data?.recent_badges && data.recent_badges.length > 0 ? (
                                data.recent_badges.map((b, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-lg shadow-md flex items-start gap-3">
                                        <div className="text-2xl leading-none">{b.icon || '🏅'}</div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div className="text-gray-800 font-medium">{b.name}</div>
                                                {typeof b.number_of_days === 'number' && (
                                                    <div className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">{b.number_of_days}d</div>
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-500">{b.reason}</div>
                                            {b.earned_at && <div className="text-xs text-gray-400 mt-1">{new Date(b.earned_at).toLocaleDateString()}</div>}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500">No recent badges</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserDashboardContent