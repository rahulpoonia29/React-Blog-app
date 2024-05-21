import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import authenticationService from "../appwrite/auth";
import { login } from "../store/authSlice";

function SignupForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const signup = async (data) => {
		console.log(data);
		setLoading(true);
		setError("");
		await authenticationService
			.createAccount({ ...data })
			.then((data) => {
				if (data) {
					console.log("SignUp successful", data);
					dispatch(login({ userData: data }));
					navigate("/");
				} else {
				}
			})
			.catch((error) => {
				setError(error.message);
				console.log("Sign Up form :: signup error", error);
			})
			.finally(() => setLoading(false));
	};

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-xl">Sign Up</CardTitle>
				<CardDescription>
					Enter your information to create an account
				</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit(signup)} noValidate>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="name">First name</Label>
							<Input
								id="name"
								placeholder="Max"
								{...register("name", {
									required: "Name is required",
									pattern: {
										value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm,
										message: "Enter a valid Name",
									},
									maxLength: {
										value: 128,
										message:
											"Name should be less than 128 characters",
									},
								})}
							/>
							<p className="text-red-500 text-sm">
								{errors.name && errors.name.message}
							</p>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								{...register("email", {
									required: "Email Address is required",
									pattern: {
										value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
										message: "Enter a valid email",
									},
								})}
							/>
							<p className="text-red-500 text-sm">
								{errors.email && errors.email.message}
							</p>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								{...register("password", {
									required: "Password is required",
									minLength: {
										value: 8,
										message:
											"Password must be at least 8 characters",
									},
									maxLength: {
										value: 256,
										message:
											"Password must not exceed 256 characters",
									},
								})}
							/>
							<p className="text-red-500 text-sm">
								{errors.password && errors.password.message}
							</p>
							<p className="text-red-500 text-sm">{error}</p>
						</div>

						<Button type="submit" className="w-full">
							{loading ? "Please Wait" : "Create an account"}
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link to={"/login"} className="underline">
							Sign in
						</Link>
					</div>
				</CardContent>
			</form>
		</Card>
	);
}

export default SignupForm;
