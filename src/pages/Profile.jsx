import React, { useEffect, useState } from "react";
import Post from "../components/post/Post";
import postService from "../appwrite/post";
import { Query } from "appwrite";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import userService from "../appwrite/user";
import { useParams } from "react-router-dom";
import fileService from "../appwrite/file";
import { useForm } from "react-hook-form";

function Profile() {
	const { userID } = useParams();
	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState(null);
	const [profileImg, setProfileImg] = useState(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const userdata = useSelector((state) => state.auth.userData);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const saveProfile = async (formData) => {
		setSaving(true);
		await userService
			.updateUser(user.$id, { ...formData })
			.then((data) => {
				console.log("Profile updated", data);
			})
			.catch((error) => console.error(error))
			.finally(() => setSaving(false));
	};

	useEffect(() => {
		(async () => {
			await postService
				.getPosts([Query.equal("userID", userID)])
				.then((data) => setPosts(data.documents))
				.catch((error) => console.error(error))
				.finally(() => setLoading(false));
			await userService
				.getUser(userID)
				.then((data) => setUser(data.documents[0]))
				.catch((error) => console.error(error));
		})();
	}, [userID, saving]);

	useEffect(() => {
		user?.profileimg &&
			fileService.getFile(user.profileimg, 100, 56).then((data) => {
				setProfileImg(data.href);
			});
	}, [user]);

	if (loading) {
		return (
			<div className="h-full grid justify-center items-center text-2xl font-semibold">
				Loading Profile...
			</div>
		);
	} else {
		return (
			<div className="flex flex-col justify-center w-full">
				<div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
					<Avatar className="size-14">
						<AvatarImage src={profileImg} alt="@profileImg" />
						<AvatarFallback>
							<User />
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col justify-center items-center md:items-start gap-1">
						<h1 className="text-2xl font-bold">{user?.name}</h1>
						<p className="text-gray-800">{user?.bio}</p>
					</div>
					{userID === userdata.$id && (
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline" className="md:ml-4">
									Edit Profile
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Edit profile</DialogTitle>
									<DialogDescription>
										Make changes to your profile here. Click
										save when you're done.
									</DialogDescription>
								</DialogHeader>
								<form onSubmit={handleSubmit(saveProfile)}>
									<div className="grid gap-4">
										<div className="grid gap-2">
											<Label htmlFor="name">Name</Label>
											<Input
												id="name"
												className="col-span-3"
												{...register("name", {
													required:
														"Name is required",
												})}
											/>
											<p className="text-red-500 text-sm">
												{errors.name &&
													errors.name.message}
											</p>
										</div>
										<div className="grid gap-2">
											<Label htmlFor="bio">Name</Label>
											<Input
												id="bio"
												className="col-span-3"
												{...register("bio", {
													required: "Bio is required",
													maxLength: {
														value: 25,
														message:
															"Bio must be less than 25 characters",
													},
												})}
											/>
											<p className="text-red-500 text-sm">
												{errors.bio &&
													errors.bio.message}
											</p>
										</div>
									</div>{" "}
									<DialogFooter>
										<Button type="submit">
											{saving ? "Saving" : "Save changes"}
										</Button>
									</DialogFooter>{" "}
								</form>
							</DialogContent>
						</Dialog>
					)}
				</div>
				<div className="m-8">
					<h1 className="text-2xl font-semibold mb-6">Your Posts</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
						{posts && posts.length > 0 ? (
							posts.map((post, key) => (
								<Post key={key} {...post} />
							))
						) : (
							<h1 className="text-center w-full col-span-full text-2xl">
								No posts found
							</h1>
						)}
					</div>
				</div>{" "}
			</div>
		);
	}
}

export default Profile;
