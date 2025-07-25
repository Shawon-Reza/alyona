import React from 'react'
import MentorUsersTable from './MentorUsersTable'
import NextMeetings from './NextMeetings'

const MentorHome = () => {
    return (
        <div>

            <div>
                <NextMeetings></NextMeetings>
            </div>

            <div>
                <MentorUsersTable></MentorUsersTable>
            </div>
        </div>
    )
}

export default MentorHome