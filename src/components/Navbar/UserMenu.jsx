import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function UserMenu() {
    const username = "Rahul"
	return (
		<div className="flex">
			<Avatar>
				<AvatarImage
					src="https://github.com/shadcn.png"
					alt="@shadcn"
				/>
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<Button variant="ghost" className="text-md">
				{username}{""}
			</Button>
		</div>
	);
}

export default UserMenu;
