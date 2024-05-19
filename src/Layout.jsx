import { useEffect, useState } from "react";
import { login, logout } from "./store/authSlice";
import { useDispatch } from "react-redux";
import authenticationService from "./appwrite/auth";
import { Navbar, Footer, Container } from "./components";
import { Outlet } from "react-router-dom";

function Layout() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		authenticationService
			.getCurrentUser()
			.then((userData) =>
				userData ? dispatch(login(userData)) : dispatch(logout())
			)
			.catch((error) => {
				console.error(error);
				dispatch(logout());
			})
			.finally(setLoading(false));
	});

	return loading ? (
		<div>Loading data</div>
	) : (
		<Container className="w-full">
			<Navbar />
			<Outlet />
			<Footer />
		</Container>
	);
}

export default Layout;
