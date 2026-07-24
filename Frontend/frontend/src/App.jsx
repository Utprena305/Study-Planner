import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./service/ProtectedRoute";
import Tasks from "./pages/Tasks";
import Schedule from "./pages/Schedule";
import StudyTimer from "./pages/StudyTimer";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
            path="/tasks"
            element={
                <ProtectedRoute>
                    <Tasks />
                </ProtectedRoute>
            }
        />
        <Route path="/dashboard" element={
                  <ProtectedRoute>
                      <Dashboard />
                  </ProtectedRoute>
              }
          />
          <Route
              path="/schedule"
              element={
                  <ProtectedRoute>
                      <Schedule />
                  </ProtectedRoute>
              }
          />
          <Route
              path="/study-timer"
              element={
                  <ProtectedRoute>
                      <StudyTimer />
                  </ProtectedRoute>
              }
          />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
      </Routes>
    </BrowserRouter>
  );
}

export default App;