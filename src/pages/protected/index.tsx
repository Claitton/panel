import AuthProvider from "@/contexts/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./home";

export default function ProtectedRoutes({ children }: React.PropsWithChildren) {
    return <BrowserRouter basename="protected">
        <Routes>
            <Route path="home" element={<HomePage />} />
        </Routes>
    </BrowserRouter>
}