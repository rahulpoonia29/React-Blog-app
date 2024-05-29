import React, { useEffect, useState } from "react";
import Post from "../components/post/PostCard";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader, User } from "lucide-react";
import userService from "../appwrite/user";
import { useParams } from "react-router-dom";
import fileService from "../appwrite/file";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function Profile() {
	const { userID } = useParams();
	const [profileImg, setProfileImg] = useState(null);
	const userData = useSelector((state) => state.auth.userData);
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
		},
	});

	const saveProfile = async (formData) => {
		if (formData.profileimg[0]) {
			userQuery.data?.profileimg &&
				fileService.deleteFile(userQuery.data.profileimg);

			const file = await fileService.uploadFile(formData.profileimg[0]);
			formData.profileimg = file.$id;
		} else {
			formData.profileimg = userQuery.data?.profileimg || null;
		}

		return await userService.updateUser(userQuery.data.$id, {
			...formData,
		});
	};

	const updateUser = useMutation({
		mutationFn: saveProfile,
		onSuccess: () => {
			console.log("Profile updated");
			queryClient.invalidateQueries(["user", userID]);
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const userQuery = useQuery({
		queryKey: ["user", userID],
		queryFn: async () => {
			const response = await userService.getUser(userID);
			setValue("name", response.documents[0].name);
			setValue("bio", response.documents[0].bio);
			return response.documents[0];
		},
	});

	const userPostsQuery = useQuery({
		queryKey: ["userPosts", userID],
		queryFn: () =>
			postService
				.getPosts([Query.equal("userID", userID)])
				.then((data) => data.documents),
		enabled: !!userQuery.data,
	});

	useEffect(() => {
		userQuery.data?.profileimg &&
			fileService
				.getFile(userQuery.data.profileimg, 100, 56)
				.then((data) => {
					setProfileImg(data.href);
				});
	}, [userQuery.data]);

	if (userQuery.isPending) {
		return (
			<div className="h-full grid justify-center items-center text-2xl font-semibold">
				<Loader className="size-14 animate-spin" />
			</div>
		);
	}

	if (userQuery.error)
		return (
			<div className="text-center mt-20 text-2xl">
				{userQuery.error.message}
			</div>
		);

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
					<h1 className="text-2xl font-bold">
						{userQuery.data?.name}
					</h1>
					<p className="text-gray-800">{userQuery.data?.bio}</p>
				</div>
				{userID === userData?.$id && (
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
							<form onSubmit={handleSubmit(updateUser.mutate)}>
								<div className="grid gap-4">
									<div className="grid gap-2">
										<Label htmlFor="name">Name</Label>
										<Input
											id="name"
											className="col-span-3"
											placeholder="Enter your name"
											{...register("name", {
												required: "Name is required",
											})}
										/>
										<p className="text-red-500 text-sm">
											{errors.name && errors.name.message}
										</p>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="bio">Bio</Label>
										<Input
											id="bio"
											className="col-span-3"
											placeholder="Enter your bio"
											{...register("bio", {
												required: "Bio is required",
												maxLength: {
													value: 25,
													message:
														"Bio must be less than 30 characters",
												},
											})}
										/>
										<p className="text-red-500 text-sm">
											{errors.bio && errors.bio.message}
										</p>
									</div>
									<div className="grid gap-2">
										<Label
											className="text-md"
											htmlFor="profileimg"
										>
											Profile Picture
										</Label>
										<Input
											id="profileimg"
											type="file"
											placeholder="Upload the featured image"
											{...register("profileimg")}
										/>
										<p className="text-red-500 text-sm">
											{errors.image &&
												errors.image.message}
										</p>
									</div>
								</div>
								<DialogFooter className="mt-2">
									<Button type="submit">
										{updateUser.isPending
											? "Saving"
											: "Save changes"}
									</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				)}
			</div>
			<div className="m-8">
				<h1 className="text-2xl font-semibold mb-6">Your Posts</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
					{userPostsQuery.data ? (
						userPostsQuery.data.length > 0 ? (
							userPostsQuery.data.map((post, key) => (
								<Post key={key} {...post} />
							))
						) : (
							<h1 className="text-center w-full col-span-full text-2xl">
								No posts found
							</h1>
						)
					) : (
						[...Array(3)].map((_, key) => (
							<div
								key={key}
								className="w-full h-full flex flex-col space-y-3"
							>
								<Skeleton className="w-full aspect-video rounded-xl" />
								<div className="space-y-2">
									<Skeleton className="h-8 w-[250px]" />
									<Skeleton className="h-4 w-[200px]" />
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default Profile;
