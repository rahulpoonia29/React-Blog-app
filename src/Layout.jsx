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
			});
	}, []);

	return (
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
