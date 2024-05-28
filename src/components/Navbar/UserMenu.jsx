import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Logout from "./LogoutBtn";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import fileService from "../../appwrite/file";
import userService from "../../appwrite/user";

function UserMenu() {
	const [user, setUser] = useState(null);
	const [profileImg, setProfileImg] = useState(null);
	const userData = useSelector((state) => state.auth.userData);

	useEffect(() => {
		userService
			.getUser(userData.$id)
			.then((data) => setUser(data.documents[0]))
			.catch((error) => console.error(error));
	}, [userData]);

	useEffect(() => {
		user?.profileimg &&
			fileService.getFile(user.profileimg, 100, 56).then((data) => {
				setProfileImg(data.href);
			});
	}, [user]);

	return (
		<div className="flex">
			<Avatar className="mr-2">
				<AvatarImage src={profileImg} alt="@shadcn" />
				<AvatarFallback>
					{userData
						? userData.name.charAt(0) +
						  (userData.name.indexOf(" ") !== -1
								? userData.name.charAt(
										userData.name.indexOf(" ") + 1
								  )
								: "")
						: ""}
				</AvatarFallback>
			</Avatar>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="group text-md flex gap-0.5 transition-all "
					>
						{userData?.name.split(" ")[0]}
						<ChevronRight className="h-4 w-4 group-hover:rotate-90 transition-all" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="mr-10 w-40 text-lg">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild className="cursor-pointer">
						<Link to={`/profile/${userData.$id}`}>Profile</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild className="cursor-pointer">
						<Link to={"/new"}>Create New Post</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer">
						Settings
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Logout />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export default UserMenu;
