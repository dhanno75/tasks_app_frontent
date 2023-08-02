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
import Color from "./components/Color";
import { Suspense, lazy } from "react";
import { FallingLines } from "react-loader-spinner";

const DashboardComponent = lazy(() => import("./components/Dashboard"));
function App() {
  return (
    <>
      <Navigation />
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense
              fallback={
                <FallingLines
                  color="#4fa94d"
                  cssOverride={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                  }}
                  width="100"
                  visible={true}
                  ariaLabel="falling-lines-loading"
                />
              }
            >
              <DashboardComponent />
            </Suspense>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route
          path="/verify/:userId/:verificationToken"
          element={<VerifiedViewPage />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/color" element={<Color />} />
      </Routes>
    </>
  );
}

export default App;
