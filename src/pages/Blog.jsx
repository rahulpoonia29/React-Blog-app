import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import postService from "../appwrite/post";
import fileService from "../appwrite/file";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Edit } from "lucide-react";

function PostDetail() {
	const { postID } = useParams();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [image, setImage] = useState(null);
	const [error, setError] = useState(null);

	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const data = await postService.getPost(postID);
				setPost(data);
				if (data.featuredImage) {
					const file = await fileService.getFile(data.featuredImage,50);
					setImage(file.href);
				}
			} catch (error) {
				setError("Error fetching post. Please try again later.");
				console.error("Error fetching post", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPost();
	}, [postID]);

	if (loading) {
		return (
			<div className="h-full grid justify-center items-center text-2xl font-semibold">
				<div className="loader">Loading...</div>{" "}
				{/* Add a spinner or loader animation */}
			</div>
		);
	}

	if (error) {
		return <div className="text-center mt-20 text-2xl">{error}</div>;
	}

	if (!post) {
		return <div className="text-center mt-20 text-2xl">Post not found</div>;
	}

	return (
		<div className="max-w-4xl mx-auto my-8 p-4">
			<div className="flex mb-4 gap-4 justify-between">
				<Button onClick={() => navigate(-1)} className="">
					&larr; Back to Posts
				</Button>
				{userData?.$id === post?.userID && (
					<Button
						onClick={() =>
							navigate(`/edit/${postID}`, { state: {post } })
						}
						className="flex items-center gap-2"
						post={post}
					>
						<Edit className="w-4 h-4" /> Edit Post
					</Button>
				)}
			</div>
			{image ? (
				<img
					src={image}
					alt={post.title}
					className="rounded w-full object-center object-cover mb-4"
					style={{ maxHeight: "500px" }}
				/>
			) : (
				<div
					className="rounded w-full bg-gray-200 mb-4"
					style={{ height: "500px" }}
				/>
			)}
			<div className="mb-6 text-gray-800 text-sm">
				<p>
					Created on:{" "}
					{new Date(post.$createdAt).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</p>
				<p>
					Last updated:{" "}
					{new Date(post.$updatedAt).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</p>
			</div>
			<h1 className="font-bold text-3xl mb-4">{post.title}</h1>
			<div className="prose prose-lg max-w-none">
				{parse(post.content)}
			</div>
		</div>
	);
}

export default PostDetail;
