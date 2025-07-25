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
        <div className="">
            <div className="mt-3">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Next Meetings</h2>

                <div className="grid grid-cols-4 gap-3">
                    {meetings.map((meeting) => (
                        <div
                            key={meeting.id}
                            className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900 mb-1">{meeting.participantName}</h3>
                                    <p className="text-sm text-gray-600">
                                        {formatDate(meeting.date)} at {meeting.time}
                                    </p>
                                </div>

                                {meeting.hasVideo && (
                                    <div className="flex-shrink-0 ml-4">
                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Video size={16} className="text-gray-600" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {meetings.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No upcoming meetings</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NextMeetings;