import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Grid } from "@mui/material";

import Home from "./Pages/GeneralPages/Home";
import Login from "./Pages/GeneralPages/Login";
import Signup from "./Pages/GeneralPages/Signup";
import ForgotPassword from "./Pages/GeneralPages/ForgotPassword";
import SuccessEmailSent from "./Pages/GeneralPages/SuccessEmailSent";
import ResetPassword from "./Pages/GeneralPages/ResetPassword";
import SuccessPasswordChanged from "./Pages/GeneralPages/SuccessPasswordChanged";
import Profile from "./Pages/GeneralPages/Profile";
import MatForm from "./Pages/MatPages/MatForm";
import Mat from "./Pages/GeneralPages/MAT";

import AdminNav from "./Components/AdminNav";
import AdminHome from "./Pages/AdminPages/AdminHome";
import AdminMATDash from "./Pages/AdminPages/AdminMat";
import Booking from "./Pages/AdminPages/Booking";
import CreateBooking from "./Pages/AdminPages/createBooking";

import UpdateBooking from "./Pages/AdminPages/UpdateBooking";
import DeletedMat from "./Pages/AdminPages/DeletedMat";

import User from "./Pages/AdminPages/User";

import Navbar from "./Components/Navbar";
import Header from "./Components/Header";

import "typeface-inter";
import "@fontsource/inter";

import { useState } from "react";
import { useAuthContext } from "./Hooks/useAuthContext";
import { useLogout } from "./Hooks/useLogout";

function App() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const [resetToken, setResetToken] = useState("");
  const [inMat, setInMat] = useState(false);

  const isLoggedIn = !!user;
  const isAdmin = user && user.isAdmin;

  const ProtectedRoute = ({ path, element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  const AuthRoute = ({ path, element }) => {
    return isLoggedIn ? <Navigate to="/" /> : element;
  };

  return (
    <Grid container className="App">
      <BrowserRouter>
        {isLoggedIn && <Header />}
        {isLoggedIn && !isAdmin && !inMat && <Navbar onLogout={logout} />}
        {isLoggedIn && isAdmin && <AdminNav />}

        {isLoggedIn && isAdmin ? (
          <>
            <Routes>
              <Route exact path="/" element={<AdminHome />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/createbooking" element={<CreateBooking />} />

              <Route
                path="/updatebooking/:bookingId"
                element={<UpdateBooking />}
              />

              <Route path="/user" element={<User />} />

              <Route path="/mat" element={<AdminMATDash />} />
              <Route path="/deletedmat" element={<DeletedMat />} />

              {/* ... Other routes for admin ... */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        ) : (
          // For regular users or when the user is not an admin
          <>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  isLoggedIn ? (
                    <Home setInMat={setInMat} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  isLoggedIn ? (
                    <Profile setInMat={setInMat} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/mat"
                element={
                  isLoggedIn ? (
                    <Mat setInMat={setInMat} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/form/:bookingId"
                element={
                  isLoggedIn ? (
                    <MatForm setInMat={setInMat} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              <Route
                exact
                path="/login"
                element={isLoggedIn ? <Navigate to="/" /> : <Login />}
              />
              <Route
                exact
                path="/signup"
                element={isLoggedIn ? <Navigate to="/" /> : <Signup />}
              />
              <Route
                path="/forgotpassword"
                element={isLoggedIn ? <Navigate to="/" /> : <ForgotPassword />}
              />
              <Route
                path="/successemailsent"
                element={
                  isLoggedIn ? <Navigate to="/" /> : <SuccessEmailSent />
                }
              />
              <Route
                path="/resetpassword/:token"
                element={isLoggedIn ? <Navigate to="/" /> : <ResetPassword />}
              />
              <Route
                path="/successpasswordchanged"
                element={
                  isLoggedIn ? <Navigate to="/" /> : <SuccessPasswordChanged />
                }
              />

              {/* ... Other routes for user ... */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </Grid>
  );
}

export default App;