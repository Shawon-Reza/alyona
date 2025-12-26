import React from 'react'
import { Navigate } from 'react-router-dom'

const PeriodCheck = ({ children }) => {

    const periodData = JSON.parse(localStorage.getItem('accessToken'))

    if (!periodData?.login_user_info.is_not_pregnant) {
        return <Navigate to="/StartQuizPage" replace />
    }

    return children
}

export default PeriodCheck