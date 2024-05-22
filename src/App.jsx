import Layout from "./Layout";
import {
	Navigate,
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import SignupForm from "./pages/Signup";
import { LoginForm } from "./pages/Login";
import NewPost from "./pages/NewPost";
import AllPosts from "./pages/AllPosts";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Layout />}>
				<Route path="/" element={<Navigate to={"/all"} />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="/register" element={<SignupForm />} />
				<Route path="/all" element={<AllPosts />} />
				<Route path="/new" element={<NewPost />} />
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
