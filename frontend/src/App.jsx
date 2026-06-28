import { Routes, Route, Navigate } from "react-router-dom";

import Splash from "./pages/Splash/Splash";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import CreateBasket from "./pages/CreateBasket/CreateBasket";
import BasketDetails from "./pages/BasketDetails/BasketDetails";
import MyBaskets from "./pages/MyBaskets/MyBaskets";
import MyRequests from "./pages/MyRequests/MyRequests";
import Profile from "./pages/Profile/Profile";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Splash />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Home />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-basket"
        element={
          <ProtectedRoute>
            <MainLayout>
              <CreateBasket />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/basket/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <BasketDetails />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-baskets"
        element={
          <ProtectedRoute>
            <MainLayout>
              <MyBaskets />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-requests"
        element={
          <ProtectedRoute>
            <MainLayout>
              <MyRequests />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;