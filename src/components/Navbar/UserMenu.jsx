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
import { ChevronRight, LogOut } from "lucide-react";
import Logout from "./LogoutBtn";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserMenu() {
	const userData = useSelector((state) => state.auth.userData);

	return (
		<div className="flex gap-2 ">
			<Avatar>
				<AvatarImage
					// src="https://github.com/shadcn.png"
					alt="@shadcn"
				/>
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
						{userData ? userData.name : ""}
						<ChevronRight className="h-4 w-4 group-hover:rotate-90 transition-all" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="mr-10 w-40 text-lg">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild className="cursor-pointer">
						<Link to={"/profile"}>Profile</Link>
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
