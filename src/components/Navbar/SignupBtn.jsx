import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Signup() {
	return (
		<Button className="px-4 py-2 mr-4" asChild>
			<Link to="/register">Sign Up</Link>
		</Button>
	);
}

export default Signup;
