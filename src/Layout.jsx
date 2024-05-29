import { useEffect, useState } from "react";
import { login, logout } from "./store/authSlice";
import { useDispatch } from "react-redux";
import authenticationService from "./appwrite/auth";
import { Navbar, Footer } from "./components";
import { Outlet } from "react-router-dom";
import { Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

function Layout() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		authenticationService
			.getCurrentUser()
			.then((userData) =>
				userData
					? dispatch(login({ userData: userData }))
					: dispatch(logout())
			)
			.catch((error) => {
				console.error(error);
				dispatch(logout());
			})
			.finally(() => setLoading(false));
	}, []);

	return loading ? (
		<div className="h-screen grid justify-center items-center text-2xl font-semibold">
			<Loader className="size-14 animate-spin" />
		</div>
	) : (
		<div className="w-full min-h-screen flex flex-col">
			<Navbar />
			<div className="flex-grow flex flex-col justify-center">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}

export default Layout;
