import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams, useNavigate, Link } from "react-router-dom";
import postService from "../appwrite/post";
import fileService from "../appwrite/file";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { ArrowLeft, Edit, Loader, User } from "lucide-react";
import userService from "../appwrite/user";
import { useQuery } from "@tanstack/react-query";

function Post() {
	const { postID } = useParams();
	const [image, setImage] = useState(null);
	const [profileImg, setProfileImg] = useState(null);

	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);

	const postQuery = useQuery({
		queryKey: ["post", postID],
		queryFn: () => postService.getPost(postID),
	});

	const userQuery = useQuery({
		queryKey: ["user", postQuery.data?.userID],
		queryFn: async () =>
			userService
				.getUser(postQuery.data.userID)
				.then((data) => data.documents[0]),
		enabled: !!postQuery.data?.userID,
	});

	useEffect(() => {
		postQuery.data?.featuredImage &&
			fileService
				.getFile(postQuery.data.featuredImage, 50)
				.then((file) => setImage(file.href));
	}, [postQuery.data]);

	useEffect(() => {
		userQuery.data?.profileimg &&
			fileService
				.getFile(userQuery.data.profileimg, 100, 56)
				.then((data) => {
					setProfileImg(data.href);
				});
	}, [userQuery.data]);

	if (postQuery.isPending)
		return (
			<div className="h-full grid justify-center items-center text-2xl font-semibold">
				<Loader className="size-14 animate-spin" />
			</div>
		);

	if (postQuery.error)
		return (
			<div className="text-center mt-20 text-2xl">
				{postQuery.error.message}
			</div>
		);

	if (!postQuery.data)
		return <div className="text-center mt-20 text-2xl">Post not found</div>;

	return (
		<div className="w-screen max-w-4xl mx-auto my-8 p-4">
			<div className="flex mb-4 gap-4 justify-between">
				<Button
					onClick={() => navigate(-1)}
					className="flex items-center gap-1.5"
				>
					<ArrowLeft width={16} size={16} /> Back to Posts
				</Button>
				{userData?.$id === postQuery.data?.userID && (
					<Button
						onClick={() =>
							navigate(`/edit/${postID}`, {
								state: { postData: postQuery.data },
							})
						}
						className="flex items-center gap-2"
					>
						<Edit className="w-4 h-4" /> Edit Post
					</Button>
				)}
			</div>
			<h1 className="font-bold text-3xl mb-4">
				{postQuery.data && postQuery.data.title}
			</h1>
			<div className="flex justify-between items-center mt-6 mx-4 ml-2">
				<div className="flex items-center mb-4 gap-2">
					<Avatar className="size-10 border-2 border-black">
						<AvatarImage src={profileImg} alt="@profileImg" />
						<AvatarFallback>
							<User />
						</AvatarFallback>
					</Avatar>
					<Link
						to={`/profile/${userQuery.data?.userid}`}
						className="text-lg font-medium"
					>
						{userQuery.data ? userQuery.data.name : "User"}
					</Link>
				</div>
				<div className="mb-6 text-gray-800 dark:text-gray-300 text-sm">
					<p>
						Created on:{" "}
						{new Date(
							postQuery.data && postQuery.data.$createdAt
						).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
					<p>
						Last updated:{" "}
						{new Date(
							postQuery.data && postQuery.data.$updatedAt
						).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
				</div>
			</div>
			{image ? (
				<img
					src={image}
					alt={postQuery.data.title}
					className="rounded w-full object-center object-cover mb-4"
					style={{ maxHeight: "500px" }}
				/>
			) : (
				<div
					className="rounded w-full bg-gray-200 mb-4"
					style={{ height: "500px" }}
				/>
			)}

			<div className="prose prose-lg max-w-none">
				{postQuery.data && parse(postQuery.data.content)}
			</div>
		</div>
	);
}

export default Post;
