import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import SimpleRegisterPage from "../Pages/SimpleRegisterPage";
import UploadProfilePage from "../Pages/UploadProfilePage";
import StartQuizPage from "../Pages/StartQuizPage";
import LocationSelector from "../Pages/LocationSelector";
import LifestyleQuiz from "../Pages/LifestyleQuiz";
import PeriodDatePicker from "../Pages/PeriodDatePicker";
import QuizGreetings from "../Pages/QuizGreetings";
import SkinAnalysis from "../Pages/SkinAnalysis";
import SubscriptionPlans from "../Pages/SubscriptionPlans";
import CheckoutPage from "../Pages/CheckoutPage";
import Dashboard from "../Layout/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage></LoginPage>,
    },
    {
        path: "/registration_page",
        element: <RegisterPage></RegisterPage>,
    },
    {
        path: "/SimpleRegisterPage",
        element: <SimpleRegisterPage></SimpleRegisterPage>,
    },
    {
        path: "/UploadProfilePage",
        element: <UploadProfilePage></UploadProfilePage>,
    },
    {
        path: "/StartQuizPage",
        element: <StartQuizPage></StartQuizPage>
    },
    {
        path: "/LocationSelector",
        element: <LocationSelector></LocationSelector>
    },
    {
        path: "/LifestyleQuiz",
        element: <LifestyleQuiz></LifestyleQuiz>
    },
    {
        path: "/PeriodDatePicker",
        element: <PeriodDatePicker></PeriodDatePicker>
    },
    {
        path: "/QuizGreetings",
        element: <QuizGreetings></QuizGreetings>
    },
    {
        path: "/SkinAnalysis",
        element: <SkinAnalysis></SkinAnalysis>
    },
    {
        path: "/SubscriptionPlans",
        element: <SubscriptionPlans></SubscriptionPlans>
    },
    {
        path: "/SubscriptionPlans/CheckoutPage",
        element: <CheckoutPage></CheckoutPage>
    },
    // Dashboard or Home route
    {
        path: "Dashboard",
        element: <Dashboard></Dashboard>
    },
]);


export default router