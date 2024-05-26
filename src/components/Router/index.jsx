import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import RegisterPage from "../../pages/RegisterPage";
import LoginPage from "../../pages/Login";
import Booking from "../../pages/Booking";

/**
 * Renders the router component.
 * @returns {JSX.Element} The router component.
 */
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:name" element={<Profile />} />
        <Route path="/registration" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
