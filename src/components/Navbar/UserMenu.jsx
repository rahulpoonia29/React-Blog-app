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
import { ChevronRight, LoaderCircleIcon } from "lucide-react";
import Logout from "./LogoutBtn";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import fileService from "../../appwrite/file";
import userService from "../../appwrite/user";
import { useQuery } from "@tanstack/react-query";

function UserMenu() {
	const [profileImg, setProfileImg] = useState(null);
	const userData = useSelector((state) => state.auth.userData);

	const userQuery = useQuery({
		queryKey: ["user", userData.$id],
		queryFn: async () => {
			const responce = await userService.getUser(userData.$id);
			return responce.documents[0];
		},
	});

	useEffect(() => {
		userQuery.data?.profileimg &&
			fileService
				.getFile(userQuery.data.profileimg, 100, 56)
				.then((data) => {
					setProfileImg(data.href);
				});
	}, [userQuery.data?.profileimg]);

	if (userQuery.isLoading) return <LoaderCircleIcon className="animate-spin"/>;
	if (userQuery.error) {
		console.log(userQuery.error);
		return <div>Error loading user data</div>;
	}

	return (
		<div className="flex">
			<Avatar className="mr-2">
				<AvatarImage src={profileImg} alt="@profileImg" />
				<AvatarFallback>
					{userQuery.data?.name
						? userQuery.data.name.charAt(0) +
						  (userQuery.data.name.indexOf(" ") !== -1
								? userQuery.data.name.charAt(
										userQuery.data.name.indexOf(" ") + 1
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
						{userQuery.data?.name.split(" ")[0]}
						<ChevronRight className="h-4 w-4 group-hover:rotate-90 transition-all" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="mr-10 w-40 text-lg">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild className="cursor-pointer">
						<Link to={`/profile/${userQuery.data?.$id}`}>
							Profile
						</Link>
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
