import React, { useEffect, useState } from "react";
import postService from "../appwrite/post";
import Post from "../components/post/Post";

function AllPosts() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		postService
			.getPosts()
			.then((data) => setPosts(data.documents))
			.finally(() => setLoading(false));
		console.log("Posts:", posts);
	}, []);

	if (loading) {
		return (
			<div className="h-full grid justify-center items-center text-2xl font-semibold">
				Loading posts
			</div>
		);
	} else {
		return (
			<div className="flex flex-wrap gap-4">
				{posts && posts.length > 0 ? (
					posts.map((post, key) => <Post key={key} {...post} />)
				) : (
					<h1>No posts found</h1>
				)}
			</div>
		);
	}
}

export default AllPosts;
