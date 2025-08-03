import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/userpages/homepage/HomePage";
import CollegeCard from "./components/Cart";
import CollegeDetail from "./pages/CollegeDetailpage";
import Dashboard from "./pages/userpages/homepage/Dashboard";
import Login from "./pages/userpages/authpages/Login";
import Signup from "./pages/userpages/authpages/Signup";
import Guide from "./pages/userpages/homepage/Guide";
import AppointmentForm from "./pages/userpages/homepage/AppointForm";
import FindPrograms from "./pages/userpages/homepage/FindProgram";
import AddProgram from "./pages/adminpages/AddProgram";
import AdminAppointmentList from "./pages/adminpages/AdminAppointmentList";
import UserManagement from "./pages/adminpages/UserManagement";
import ForgotPassword from "./pages/userpages/authpages/ForgotPassword";
import ResetPassword from "./pages/userpages/authpages/ResetPassword";
import AdminLayout from "./components/adminlayout/AdminLayout";
import AdminDashboard from "./pages/adminpages/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route: Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route path="/guide" element={<Guide />} />
        <Route
          path="/college/:id"
          element={
            <ProtectedRoute>
              <CollegeDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CollegeCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/findprograms"
          element={
            <ProtectedRoute>
              <FindPrograms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addprogram"
          element={
            <ProtectedRoute>
              <AddProgram />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointment"
          element={
            <ProtectedRoute>
              <AppointmentForm />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="addprogram" element={<AddProgram />} />
          <Route path="manage-appointment" element={<AdminAppointmentList />} />
          <Route path="manage-user" element={<UserManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
