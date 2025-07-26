import React from 'react';
import { Video } from 'lucide-react';

const NextMeetings = () => {
    const meetings = [
        {
            id: 1,
            participantName: "Emma Thompson",
            date: "05-10-2025",
            time: "11:15",
            hasVideo: true,
        },
        {
            id: 2,
            participantName: "Sophia Brown",
            date: "06-05-2025",
            time: "09:30",
            hasVideo: true,
        },
    ];

    const formatDate = (dateStr) => {
        const [day, month, year] = dateStr.split("-");
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div className="px-4 md:px-0">
            <div className="mt-3">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">
                    Next Meetings
                </h2>
                
                {/* Responsive Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                    {meetings.map((meeting) => (
                        <div
                            key={meeting.id}
                            className="bg-white rounded-lg border border-gray-100 p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer active:scale-95 md:active:scale-100"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-gray-900 mb-1 text-sm md:text-base truncate">
                                        {meeting.participantName}
                                    </h3>
                                    <div className="space-y-1">
                                        <p className="text-xs md:text-sm text-gray-600">
                                            {formatDate(meeting.date)}
                                        </p>
                                        <p className="text-xs md:text-sm text-gray-600 font-medium">
                                            {meeting.time}
                                        </p>
                                    </div>
                                </div>
                                
                                {meeting.hasVideo && (
                                    <div className="flex-shrink-0 ml-2 md:ml-4">
                                        <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Video size={12} className="md:w-4 md:h-4 text-gray-600" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Mobile: Additional info row */}
                            <div className="md:hidden mt-2 pt-2 border-t border-gray-100">
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>Upcoming</span>
                                    {meeting.hasVideo && (
                                        <span className="flex items-center gap-1">
                                            <Video size={10} />
                                            Video call
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {meetings.length === 0 && (
                    <div className="text-center py-8 md:py-12">
                        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full mb-3 md:mb-4">
                            <Video size={20} className="text-gray-400 md:w-6 md:h-6" />
                        </div>
                        <p className="text-gray-500 text-sm md:text-base">No upcoming meetings</p>
                        <p className="text-gray-400 text-xs md:text-sm mt-1">
                            Your scheduled meetings will appear here
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NextMeetings;