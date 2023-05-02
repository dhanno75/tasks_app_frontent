import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import Navigation from "./components/Navigation";
import About from "./components/About";
import VerifiedViewPage from "./components/VerifiedViewPage";

function App() {
  return (
    <>
      <Navigation />
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route
          path="/verify/:userId/:verificationToken"
          element={<VerifiedViewPage />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
