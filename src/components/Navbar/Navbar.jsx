import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./LoginBtn";
import Signup from "./SignupBtn";
import UserMenu from "./UserMenu";

export default function Navbar() {
	const authStatus = useSelector((state) => state.auth.status);
	return (
		<header className="sticky top-0 z-10 bg-gray-400 backdrop-filter backdrop-blur-md bg-opacity-40 flex justify-between h-16  w-full shrink-0 items-center px-4 md:px-6 border border-b-2">
			<Button asChild variant="ghost">
				<Link className="text-lg" href="#">
					<MountainIcon className="h-8 w-8" />
					&nbsp;&nbsp;BLOGIFY
				</Link>
			</Button>
			{authStatus ? (
				<UserMenu />
			) : (
				<div>
					<Signup />
					<Login />
				</div>
			)}
		</header>
	);
}

function MountainIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m8 3 4 8 5-5 5 15H2L8 3z" />
		</svg>
	);
}
