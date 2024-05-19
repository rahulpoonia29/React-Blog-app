import { useDispatch } from "react-redux";
import authenticationService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { LogOut } from "lucide-react";

function Logout() {
	const dispatch = useDispatch();
	const logoutHandler = () => {
		authenticationService
			.logout()
			.then(() => {
				dispatch(logout());
				console.log("User successfully logged out");
			})
			.catch((error) => {
				console.error("Logout failed:", error);
			});
	};
	return (
		<div className="flex items-center gap-2 w-full" onClick={logoutHandler}>
			<LogOut className="h-4 w-4" />
			Logout
		</div>
	);
}

export default Logout;
