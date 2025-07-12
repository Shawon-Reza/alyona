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
]);


export default router