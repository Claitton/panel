import { AuthContext } from "@/contexts/auth";
import { useContext } from "react";

export default function useAuth() {
    // Contexts
    const auth = useContext(AuthContext);

    return {
        ...auth
    }
}
