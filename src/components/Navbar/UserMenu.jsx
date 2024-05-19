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

function UserMenu() {
	const username = "Rahul";
	return (
		<div className="flex gap-2 ">
			<Avatar>
				<AvatarImage
					src="https://github.com/shadcn.png"
					alt="@shadcn"
				/>
				<AvatarFallback>RP</AvatarFallback>
			</Avatar>

			<DropdownMenu>
				<DropdownMenuTrigger aschild>
					<Button
						variant="ghost"
						className="group text-md flex gap-0.5 transition-all "
					>
						{username}
						<ChevronRight className="h-4 w-4 group-hover:rotate-90 transition-all" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="mr-10 w-40 text-lg">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Profile</DropdownMenuItem>
					<DropdownMenuItem>Create New Post</DropdownMenuItem>
					<DropdownMenuItem>Settings</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem aschild>
						<Logout />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export default UserMenu;
