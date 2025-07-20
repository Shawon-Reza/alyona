import {
    createBrowserRouter,
    Navigate,
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
import SubscriptionPlanComponent from "../Components/SubscriptionPlanComponent";
import MainDashboard from "../Pages/MainDashboard";
import Badges from "../Components/BadgeSection";
import MonthlySkinReport from "../Components/MonthlySkinReport ";
import ReportDetails from "../Components/ReportDetails";
import Subscribe from "../Components/Subscribe";
import AboutSkin from "../Components/AboutSkin";
import PromoCodeCard from "../Components/PromoCodeCard";
import ProductLibrary from "../Pages/ProductLibrary";
import ProductDetailPage from "../Pages/ProductDetailPage";
import ProductDescription from "../Components/ProductDescription";
import ProductDetails from "../Components/ProductDetails";
import SimilarProductsList from "../Components/SimilarProductsList";
import ChatPage from "../Pages/ChatPage";
import FaceScan from "../Components/FaceScan";
import ChatPanel from "../Components/ChatPanel";
import TrackerLayout from "../Layout/TrackerLayout";
import DailyRoutineTracker from "../Components/TrackerTabComponent/DailyRoutineTracker";
import PageNotFound from "../Components/PageNotFound"

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
    {
        path: "/maindashboard",
        element: <MainDashboard></MainDashboard>
    },
    // Dashboard or Home route
    {
        path: "Dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "", // default child route (dashboard/)
                element: <SubscriptionPlanComponent></SubscriptionPlanComponent>
            },
            {
                path: "monthly-report", // default child route (dashboard/)
                element: <MonthlySkinReport></MonthlySkinReport>
            },
            {
                path: "monthly-report/report-details", // default child route (dashboard/)
                element: <ReportDetails></ReportDetails>
            },
            {
                path: "badges", // default child route (dashboard/)
                element: <Badges></Badges>
            },
            {
                path: "Payment/promocode", // default child route (dashboard/)
                element: <PromoCodeCard></PromoCodeCard>
            },
            {
                path: "Payment/subscribe", // default child route (dashboard/)
                element: <Subscribe></Subscribe>
            },
            {
                path: "about-my-skin", // default child route (dashboard/)
                element: <AboutSkin></AboutSkin>
            },

        ]
    },
    {
        path: "/library",
        element: <ProductLibrary></ProductLibrary>
    },
    {
        path: "/library/product-detail",
        element: <ProductDetailPage></ProductDetailPage>,
        children: [
            {
                path: "",
                element: <ProductDescription></ProductDescription>
            },
            {
                path: "product-details",
                element: <ProductDetails></ProductDetails>
            },
            {
                path: "similar-products",
                element: <SimilarProductsList></SimilarProductsList>
            },
        ]
    },
    {
        path: "/chat",
        element: <ChatPage></ChatPage>,
        children: [
            {
                path: "",
                element: <ChatPanel></ChatPanel>,
            },
            {
                path: "face-scan",
                element: <FaceScan />, // <-- renders inside <Outlet />
            },
        ]
    },
    // Tracker .........
    {
        path: "/tracker",
        element: <TrackerLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="daily-skincare/day" replace />,
            },
            {
                path: "daily-skincare",
                children: [
                    { index: true, element: <Navigate to="day" replace /> },
                    { path: ":mode", element: <DailyRoutineTracker /> },
                ]
            }
            ,
            {
                path: "addon-skincare",
                children: [
                    { index: true, element: <Navigate to="day" replace /> },
                    { path: "day", element: <div>Add on Skincare - Day</div> },
                    { path: "night", element: <div>Add on Skincare - Night</div> },
                ],
            },
            {
                path: "body-care",
                children: [
                    { index: true, element: <Navigate to="day" replace /> },
                    { path: "day", element: <div>Body Care - Day</div> },
                    { path: "night", element: <div>Body Care - Night</div> },
                ],
            },
            {
                path: "hair-care",
                children: [
                    { index: true, element: <Navigate to="day" replace /> },
                    { path: "day", element: <div>Hair Care - Day</div> },
                    { path: "night", element: <div>Hair Care - Night</div> },
                ],
            },
            {
                path: "perfume",
                children: [
                    { index: true, element: <Navigate to="day" replace /> },
                    { path: "day", element: <div>Perfume - Day</div> },
                    { path: "night", element: <div>Perfume - Night</div> },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <PageNotFound></PageNotFound>
    }



]);


export default router