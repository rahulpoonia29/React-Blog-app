import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authenticationService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitlogin = async (formData) => {
		setLoading(true);
		setError("");
		await authenticationService
			.Login({ ...formData })
			.then((data) => {
				if (data) {
					console.log("Login successful", data);
					dispatch(login({ userData: data }));
					navigate("/");
				}
			})
			.catch((error) => {
				setError(error.message);
				console.log("Login form :: login error", error);
			})
			.finally(() => setLoading(false));
	};

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account.
				</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit(submitlogin)} noValidate>
				<CardContent className="grid gap-4">
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
									value: 20,
									message:
										"Password must not exceed 20 characters",
								},
							})}
						/>
						<p className="text-red-500 text-sm">
							{errors.password && errors.password.message}
						</p>
						<p className="text-red-500 text-sm">{error}</p>
					</div>
				</CardContent>
				<CardFooter>
					<Button type="submit" className="w-full">
						{loading ? "Please Wait" : "Sign in"}
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
