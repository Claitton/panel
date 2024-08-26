import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/protected/home";
import RegisterPage from "./pages/register";
import AuthProvider from "./contexts/auth";

export function PublicRoutes() {
    return <BrowserRouter basename="/">
        <AuthProvider>
            <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="private/home" element={<HomePage />} />
            </Routes>
        </AuthProvider>
    </BrowserRouter>
}

export function PrivateRoutes() {
    return <BrowserRouter basename="/private">
        <Routes>
            
        </Routes>
    </BrowserRouter>
}