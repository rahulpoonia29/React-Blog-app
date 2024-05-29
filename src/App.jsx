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
import Posts from "./pages/Posts";
import Blog from "./pages/Blog";
import Edit from "./pages/Edit";
import Profile from "./pages/Profile";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Layout />}>
				<Route path="/" element={<Navigate to={"/all"} />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="/register" element={<SignupForm />} />
				<Route path="/all" element={<Posts />} />
				<Route path="/new" element={<NewPost />} />
				<Route path="/post/:postID" element={<Blog />} />
				<Route path="/edit/:postID" element={<Edit />} />
				<Route path="/profile/:userID" element={<Profile />} />
				{/* <Route path="/dashboard" element={<Dashboard />} /> */}
				{/* <Route path="/about" element={<About />} /> */}
			</Route>
		)
	);

	return <RouterProvider router={router} />;
}

export default App;
