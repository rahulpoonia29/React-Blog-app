import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Login() {
	return (
		<Button className="px-4 py-2" asChild>
			<Link to="/login">Login</Link>
		</Button>
	);
}

export default Login;
