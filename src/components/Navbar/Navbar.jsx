import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./LoginBtn";
import Signup from "./SignupBtn";
import UserMenu from "./UserMenu";
import { ThemeToggle } from "../ThemeToggle";
import { Mountain } from "lucide-react";

export default function Navbar() {
	const authStatus = useSelector((state) => state.auth.status);
	return (
		<header className="sticky top-0 z-10 backdrop-filter backdrop-blur-lg border-b-0 dark:bg-grey-900 dark:bg-opacity-40 border-gray-200 dark:border-b-0 flex justify-between h-16 w-full shrink-0 items-center px-4 md:px-8">
			<Button asChild variant="ghost">
				<Link className="text-lg" to="/">
					<Mountain className="h-8 w-8" />
					&nbsp;&nbsp;BLOGIFY
				</Link>
			</Button>
			<div className="flex gap-3">
				{authStatus ? (
					<UserMenu />
				) : (
					<div className="flex gap-2">
						<Signup />
						<Login />
					</div>
				)}
				<ThemeToggle />
			</div>
		</header>
	);
}
