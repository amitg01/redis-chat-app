import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

const Views = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Views;
