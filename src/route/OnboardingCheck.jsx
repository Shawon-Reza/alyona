import { Navigate } from 'react-router-dom'

const OnboardingCheck = ({ children }) => {

    const onboardingStatus = localStorage.getItem('onboardingQuiz')
     console.log(!onboardingStatus)
     
    if (!onboardingStatus) {
        return <Navigate to="/onboarding-lifestyle-quiz" replace />
    }

   
    return children
}

export default OnboardingCheck
