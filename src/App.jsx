import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./theme/GlobalStyle";
import theme from "./theme/Theme";
import BaseLayout from "./layout/BaseLayout";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import PersonalInfo from "./pages/PersonalInfo/PersonalInfo";
import QuestionPage4 from "./pages/Questions/Question4/Question4";
import Otp from "./pages/Otp/Otp";
import HeaderWithLogo from "./components/HeaderWithLogo/HeaderWithLogo";
import QuestionPage1 from "./pages/Questions/Question1/Question1";
import QuestionPage2 from "./pages/Questions/Question2/Question2";
import QuestionPage3 from "./pages/Questions/Question3/Question3";
import LearningModules from "./modules/admin/pages/Learning modules/Learningmodules";
import Userdetails from "./modules/admin/pages/User details/Userdetails";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import BacktoSignIn from "./pages/BacktoSignIn/BacktoSignIn";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ResetSuccessful from "./pages/passwordresetsuccessful/ResetSuccessful";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import OtpEmail from "./pages/OtpEmail/OtpEmail";
import UploadModule from "./modules/admin/pages/UploadModule/UploadModule";
import AddNewModule from "./modules/admin/pages/AddNewModule/AddNewModule";
import SkillAssessment from "./modules/admin/pages/Skill Assesment/SkillAssesment";
import Flashcards from "./modules/admin/pages/Flashcards/Flashcards";
import Challenges from "./modules/admin/pages/Challenges/Challenges";
import Analytics from "./modules/admin/pages/ViewAnalytics/Analytics";
import Faq from "./modules/admin/pages/FAQ/Faq";
import Notification from "./modules/admin/pages/Notification/Notification";
import SupportQuery from "./modules/admin/pages/SupportQuery/SupportQuery";
import SupportQueryUserDetails from "./modules/admin/components/SupportQueryComponents/SupportQueryUserDetails/SupportQueryUserDetails";
import CompaniesPlan from "./pages/Questions/CompaniesPlan/CompaniesPlan";
import Question6 from "./pages/Questions/Question6/Question6";
import Question7 from "./pages/Questions/Question7/Question7";
import FinalQuestion from "./pages/Questions/FinalQuestion/FinalQuestion";
import AccountCreated from "./pages/AcountCreated/AccountCreated";
import ValidationPage from "./pages/validationPage/ValidationPage";
import Settings from "./modules/admin/pages/Settings/Settings";
import Users from "./modules/admin/pages/Users/Users";
import AdminDashboard from "./modules/admin/pages/AdminDashboard/AdminDashboard";
import UserProfile from "./modules/admin/pages/UserProfile/UserProfile";
import UserDashboard from "./modules/user/pages/UserDashboard/UserDashboard";
import QuicklyRevise from "./modules/user/pages/Quickly/QuicklyRevise/QuicklyRevise";
import UserChallenges from "./modules/user/pages/UserChallenges/UserChallenges";
import UserHome from "./modules/user/pages/UserHome/UserHome";
import ProfileUser from "./modules/user/pages/UserProfile/ProfileUser";
import QuicklyByModule from "./modules/user/pages/Quickly/QuickByModule/QuicklyByModule";
import UserLearning from "./modules/user/pages/Learning/UserLearning/UserLearning";
import UserLearningModule from "./modules/user/pages/Learning/UserLeraningModule/UserLearningModule";
import UserModuleTopic from "./modules/user/pages/Learning/UserModuleTopic/UserModuleTopic";
import QuestionBank from "./modules/user/pages/QuestionBank/QuestionBank";
import QuestionCollapsible from "./modules/user/components/QuestionBank/QuestionCollapsible";
import UserSampleInterview from "./modules/user/pages/Learning/userSampleInterview/UserSampleInterview";
import UserFAQ from "./modules/user/pages/UserFAQ/UserFAQ";
import RaiseQuery from "./modules/user/components/UserFaqComponent/RaiseQuery";
import MainWindow from "./modules/user/components/CodeEditorWindow/MainWindow";
import Editupload from "./modules/admin/components/Learningmodulescomponents/Editupload/Editupload";
import EditAddModule from "./modules/admin/components/Learningmodulescomponents/EditAddModule/EditAddModule";
import ProfileInfo from "./modules/admin/components/ProfileComponents/ProfileInfo";
import UserSubscription from "./modules/user/pages/UserSubscription/UserSubscription";
import InterviewPage from "./modules/user/pages/InterviewPage/InterviewPage";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import ProtectedRoute from "./utils/ProtectedRoute";
import ModuleFileUpload from "./modules/admin/pages/ModuleFileUpload/ModuleFileUpload";
import NewChallenge from "./modules/user/components/UserChallenegesinfo/NewChallenges";
import ManageMFA from "./modules/admin/pages/ManageMFA/ManageMFA";
import AddTOTP from "./modules/admin/pages/AddTOTP/AddTOTP";
import VerifyTOTP from "./pages/VerifyTOTP/VerifyTOTP";
import PublicRoutes from "./utils/PublicRoutes";
import TryItYourself from "./modules/user/components/TryItYourselfComponent/TryItYourself";
import JDoodleEditor from "./modules/user/components/JDoodleEditor/JDoodleEditor";
import MockInterviewChat from "./modules/user/components/MockInterviewChat/MockInterviewChat";
import MockInterviewVoice from "./modules/user/components/MockInterviewVoice/MockInterviewVoice";
import NotFound from "./components/NotFound/NotFound";
import TinymceEditor from "./modules/admin/components/TinymceEditor/TinymceEditor";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import QuicklyDetailed from "./modules/user/pages/Quickly/QuicklyDetailed/QuicklyDetailed";
import QuicklyReviseTopicDetails from "./modules/user/pages/Quickly/QuicklyReviseTopicDetails/QuicklyReviseTopicDetails";
import Blog from "./modules/admin/pages/Blog/Blog";
import AdminBlogDisplay from "./modules/admin/pages/AdminBlogDisplay/AdminBlogDisplay";
import UserBlog from "./modules/user/pages/UserBlog/UserBlog";
import UserBlogDisplay from "./modules/user/pages/UserBlogDisplay/UserBlogDisplay";
import OAuthCallbackPage from "./pages/OAuthCallback/OAuthCallback";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import LandingPage from "./pages/LandingPage/LandingPage";
import LandingCourse from "./components/LandingPageComponents/LandingCourse/LandingCourse";
import LandingProduct from "./components/LandingPageComponents/LandingProduct/LandingProduct";
import AboutPage from "./pages/AboutPage/AboutPage";
import Pricing from "./pages/Pricing/Pricing";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/landing-about" element={<AboutPage />} />
          <Route path="/landing-course" element={<LandingCourse />} />
          <Route path="/landing-product" element={<LandingProduct />} />
          <Route path="/landing-pricing" element={<Pricing />} />
          <Route path="/" element={<PublicRoutes Component={SignUp} />} />
          <Route path="/loginPhone" element={<Login />} />
          <Route path="/login" element={<PublicRoutes Component={SignUp} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/personalinfo" element={<PersonalInfo />} />
          <Route path="/question1" element={<QuestionPage1 />} />
          <Route path="/question2" element={<QuestionPage2 />} />
          <Route path="/question3" element={<QuestionPage3 />} />
          <Route path="/question4" element={<QuestionPage4 />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/question5" element={<CompaniesPlan />} />
          <Route path="/question6" element={<Question6 />} />
          <Route path="/question7" element={<Question7 />} />
          {/* <Route path="/question8" element={<FinalQuestion />} /> */}
          <Route path="/profileComplete" element={<AccountCreated />} />
          <Route path="/otpEmail" element={<OtpEmail />} />
          <Route path="/validation" element={<ValidationPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/oauth-callback" element={<OAuthCallbackPage />} />
          <Route path="/testing" element={<QuicklyDetailed />}>
            <Route
              path="/testing/:id"
              element={<QuicklyReviseTopicDetails />}
            />
          </Route>
          <Route path="/learning" element={<LearningModules />} />
          <Route path="/verifytotp" element={<VerifyTOTP />} />
          <Route path="/chatmode" element={<MockInterviewChat />} />
          <Route path="/voicemode" element={<MockInterviewVoice />} />
          <Route path="/tryityourself" element={<TryItYourself />} />
          <Route
            path="/Diagnosing-and-Investigating-Metrics"
            element={<Userdetails />}
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/backtosignIn" element={<BacktoSignIn />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/resetsuccessful" element={<ResetSuccessful />} />
          <Route path="/admin" element={
            <>
              <SignedIn>
                <ProtectedRoute roles={["admin"]} />
              </SignedIn>
              <SignedOut>
                <Navigate to="/login" replace />
              </SignedOut>
            </>
          }>
            <Route element={<BaseLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="learning" element={<LearningModules />} />
              <Route path="Diagnosing-and-Investigating-Metrics" element={<Userdetails />} />
              <Route path="skill-assessment" element={<SkillAssessment />} />
              <Route path="uploadmodule" element={<UploadModule />} />
              <Route path="addnewmodule" element={<AddNewModule />} />
              <Route path="editmodel/:id" element={<Editupload />} />
              <Route path="editmodel/:id/:topic" element={<EditAddModule />} />
              <Route path="editaddmodule/:id" element={<EditAddModule />} />
              <Route path="flashcards" element={<Flashcards />} />
              <Route path="challenges" element={<Challenges />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="faq" element={<Faq />} />
              <Route path="notifications" element={<Notification />} />
              <Route path="supportquery" element={<SupportQuery />} />
              <Route path="supportquery/:id" element={<SupportQueryUserDetails />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
              <Route path="userProfile" element={<UserProfile />} />
              <Route path="profile" element={<ProfileInfo />} />
              <Route path="modulefileupload" element={<ModuleFileUpload />} />
              <Route path="manage-mfa" element={<ManageMFA />} />
              <Route path="manage-mfa/add" element={<AddTOTP />} />
              <Route path="real-world-scenario" element={<Blog />} />
              <Route path="real-world-scenario/:id" element={<AdminBlogDisplay />} />
            </Route>
          </Route>
          <Route path="/user" element={
            <>
              <SignedIn>
                <ProtectedRoute roles={["user"]} />
              </SignedIn>
              <SignedOut>
                <Navigate to="/login" replace />
              </SignedOut>
            </>
          }>
            <Route element={<BaseLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path="revise" element={<QuicklyRevise />} />
              <Route path="revise/:id" element={<QuicklyDetailed />}>
                <Route index element={<Navigate to="0" />} />
                <Route path=":topic" element={<QuicklyReviseTopicDetails />} />
              </Route>
              <Route path="challenges" element={<UserChallenges />} />
              <Route path="home" element={<UserHome />} />
              <Route path="userProfile" element={<ProfileUser />} />
              <Route path="learning" element={<UserLearning />} />
              <Route path="learning/:id" element={<UserLearningModule />} />
              <Route path="learning/:id/topic" element={<UserModuleTopic />} />
              <Route path="learning/:id/topic/sampleInterview" element={<UserSampleInterview />} />
              <Route path="learning/:module_name/topic/tryityourself" element={<TryItYourself />} />
              <Route path="questionbank" element={<QuestionBank />} />
              <Route path="questionbank/:id" element={<QuestionCollapsible />} />
              <Route path="userfaq" element={<UserFAQ />} />
              <Route path="subscription" element={<UserSubscription />} />
              <Route path="interview" element={<InterviewPage />} />
              <Route path="challengeInfo" element={<NewChallenge />} />
              <Route path="blogs" element={<UserBlog />} />
              <Route path="real-world-scenario/:id" element={<UserBlogDisplay />} />
            </Route>
            {/* <Route path="userfaq" element={<UserFAQ />} /> */}
            {/* <Route path="subscription" element={<UserSubscription />} /> */}
            {/* <Route path="interview" element={<InterviewPage />} /> */}
            {/* <Route path="challengeInfo" element={<NewChallenge />} /> */}
            {/* <Route path="blogs" element={<UserBlog />} /> */}
            {/* <Route path="blogs/:id" element={<UserBlogDisplay />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
