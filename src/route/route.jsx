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
import AdminDashboardLogin from "../Pages/AdminDashboard/AdminDashboardLogin";
import AdminResetPasswordPage from "../Pages/AdminDashboard/AdminResetPasswordPage";
import AdminDashboard from "../Layout/AdminDashboard";
import AdminDashboardComponent from "../Components/AdminDashboard/AdminDashboardComponent";
import DashboardGeneralContent from "../Components/AdminDashboard/DashboardGeneralContent";
import DashboardUserContent from "../Components/AdminDashboard/DashboardUserContent";
import NewProductRequestPage from "../Pages/AdminDashboard/NewProductRequestPage";
import FAQPage from "../Components/AdminDashboard/FAQPage";
import EditAnswerPage from "../Components/AdminDashboard/EditAnswerPage";
import UserManagementTable from "../Components/AdminDashboard/UserManagementTable";
import UserProfilePage from "../Pages/AdminDashboard/UserProfilePage";
import UserProfileLayout from "../Layout/UserProfileLayout";
import UserAIContent from "../Components/AdminDashboard/UserAIContent";
import UserProductContent from "../Components/AdminDashboard/UserProductsContent";
import UserDashboardContent from "../Components/AdminDashboard/UserDashboardContent";
import ProductManagementTable from "../Components/AdminDashboard/ProductManagementTable";
import EditProductPage from "../Components/AdminDashboard/EditProductPage";
import AdminProductDetailPage from "../Components/AdminDashboard/AdminProductDetailPage";
import MentorManagementTable from "../Components/AdminDashboard/MentorManagementTable";
import CreateUserMentor from "../Components/AdminDashboard/CreateUserMentor";
import MentorDashboardLayout from "../Layout/MentorDashboardLayout";
import NotificationComposer from "../Components/AdminDashboard/NotificationComposer";
import ReportsTable from "../Components/AdminDashboard/ReportsTable";
import ReportsDashboard from "../Components/AdminDashboard/ReportsDashboard";
import CreateReport from "../Components/AdminDashboard/CreateReport";

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
    },

    // Admin Dashboard......................................................
    {
        path: '/admindashboardlogin',
        element: <AdminDashboardLogin></AdminDashboardLogin>
    },
    {
        path: '/admindashboard-reset-password',
        element: <AdminResetPasswordPage></AdminResetPasswordPage>
    },
    {
        path: '/admindashboard',
        element: <AdminDashboard />,
        children: [
            {
                path: "",
                element: <AdminDashboardComponent />, // This will render when "/admindashboard" is accessed
                children: [
                    {
                        index: true,  // This makes the "general" tab show up by default when accessing /admindashboard
                        element: <DashboardGeneralContent /> // Default content for the General page
                    },
                    {
                        path: 'general',
                        element: <DashboardGeneralContent /> // Content for the General page
                    },
                    {
                        path: 'users',
                        element: <DashboardUserContent></DashboardUserContent> // Content for the Users page
                    },


                ]
            },

            {
                path: 'newproduct-requestpage',
                element: <NewProductRequestPage></NewProductRequestPage> // Content for the Users page
            },
            {
                path: 'faq',
                element: <FAQPage></FAQPage> // Content for the Users page
            },
            {
                path: 'faq-edit-answare',
                element: <EditAnswerPage></EditAnswerPage> // Content for the Users page
            },
            {
                path: "user-management-table",
                element: <UserManagementTable></UserManagementTable>,
            },
            {
                path: 'user-profile-layout',
                element: <UserProfileLayout></UserProfileLayout>,
                children: [
                    {
                        path: '',
                        element: <UserManagementTable></UserManagementTable>
                    },
                    {
                        path: 'user/profile',
                        element: <UserProfilePage></UserProfilePage>
                    },
                    {
                        path: 'user/products',
                        element: <UserProductContent></UserProductContent>
                    },
                    {
                        path: 'user/ai',
                        element: <UserAIContent></UserAIContent>
                    },
                    {
                        path: 'user/dashboard',
                        element: <UserDashboardContent></UserDashboardContent>
                    },
                ]
            },
            {
                path: "products",
                element: <ProductManagementTable></ProductManagementTable>,
            },
            {
                path: "products/edit-product",
                element: <EditProductPage></EditProductPage>,
            },
            {
                path: "products/details",
                element: <AdminProductDetailPage></AdminProductDetailPage>,
            },
            {
                path: "create-mentor",
                element: <MentorManagementTable></MentorManagementTable>,
            },
            {
                path: "create-mentor/create-user-mentor",
                element: <CreateUserMentor></CreateUserMentor>,
            },
        ]
    },
    {
        path: "/mentordashboard",
        element: <MentorDashboardLayout></MentorDashboardLayout>,
        children: [
            {
                path: 'notification-composer',
                element: <NotificationComposer></NotificationComposer>
            },
            {
                path: 'reports',
                element: <ReportsTable></ReportsTable>
            },
            {
                path: 'user-reports',
                element: <ReportsDashboard></ReportsDashboard>
            },
            {
                path: 'create-reports',
                element: <CreateReport></CreateReport>
            },

        ]
    }






]);


export default router