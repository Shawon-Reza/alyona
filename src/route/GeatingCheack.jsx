import React from 'react'
import { Navigate } from 'react-router-dom'

const GeatingCheack = ({ children }) => {

    const periodData = JSON.parse(localStorage.getItem('accessToken'))

    if (!periodData?.login_user_info.four_question_not_answered && periodData?.login_user_info.period) {
        return <Navigate to="/maindashboard" replace />
    }


    return children
}

export default GeatingCheack