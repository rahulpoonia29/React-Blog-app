import Layout from "./Layout";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import SignupForm from "./pages/Signup";
import { LoginForm } from "./pages/Login";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Layout />}>
				{/* <Route path="/" /> */}
				<Route path="/login" element={<LoginForm />} />
				<Route path="/register" element={<SignupForm />} />
				{/* <Route path="/profile" element={<Profile />} /> */}
				{/* <Route path="/dashboard" element={<Dashboard />} /> */}
				{/* <Route path="/about" element={<About />} /> */}
				{/* <Route path="/contact" element={<Contact />} /> */}
			</Route>
		)
	);

	return <RouterProvider router={router} />;
}

export default App;
