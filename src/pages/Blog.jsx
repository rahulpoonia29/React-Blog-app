import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import postService from "../appwrite/post";
import fileService from "../appwrite/file";
import parse from "html-react-parser";

function PostDetail() {
	const { postID } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [image, setImage] = useState(null);

	useEffect(() => {
		postService
			.getPost(postID)
			.then((data) => {
				console.log("Data ", data);
				setPost(data);
				if (data.featuredImage) {
					fileService
						.getFile(data.featuredImage)
						.then((file) => setImage(file.href));
				}
			})
			.finally(() => setLoading(false));
	}, [postID]);

	if (loading) {
		return (
			<div className="h-full grid justify-center items-center text-2xl font-semibold">
				Loading...
			</div>
		);
	}

	if (!post) {
		return <div className="text-center mt-20 text-2xl">Post not found</div>;
	}

	return (
		<div className="max-w-4xl mx-auto my-8 p-4">
			<button
				onClick={() => navigate(-1)}
				className="text-blue-600 hover:underline mb-4"
			>
				&larr; Back to Posts
			</button>
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
