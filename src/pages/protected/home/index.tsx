import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/auth";


export default function HomePage() {

    // Hooks
    const { logout } = useAuth();

    return <div className="bg-red-400 h-48 w-48">
        hello world

        <Button onClick={logout}>Logout</Button>
    </div>
}