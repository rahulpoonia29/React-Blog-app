import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./LoginBtn";
import Signup from "./SignupBtn";
import UserMenu from "./UserMenu";
import { ThemeToggle } from "../ThemeToggle";

export default function Navbar() {
	const authStatus = useSelector((state) => state.auth.status);
	return (
		<header className="sticky top-0 z-10 backdrop-filter backdrop-blur-lg border-b-0 dark:bg-grey-900 dark:bg-opacity-40 border-gray-200 dark:border-b-0 flex justify-between h-16 w-full shrink-0 items-center px-4 md:px-8">
			<Button asChild variant="ghost">
				<Link className="text-lg" to="/">
					<BloggerIcon className="h-8 w-8" />
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

const BloggerIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width={24}
		height={24}
		color={"currentCplor"}
		fill={"none"}
		{...props}
	>
		<path
			d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinejoin="round"
		/>
		<path
			d="M10 10H11"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M10 15H14"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M14.9577 11.4622V10.5088C14.9577 8.63614 14.9577 7.69981 14.4825 7.04341C13.5821 5.79972 11.833 6.01409 10.4788 6.01409C9.12474 6.01409 7.37562 5.79972 6.47521 7.04341C6 7.69981 6 8.63614 6 10.5088V13.0059C6 15.3601 6 16.5373 6.72879 17.2686C7.45758 18 8.63055 18 10.9765 18H14.6862C17.285 18 18.3239 16.1725 17.913 13.5687C17.6684 12.0195 16.3315 11.4622 14.9577 11.4622Z"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinejoin="round"
		/>
	</svg>
);


