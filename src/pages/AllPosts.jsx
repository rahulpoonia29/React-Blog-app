import React, { useEffect, useState } from "react";
import postService from "../appwrite/post";
import Post from "../components/post/Post";

function AllPosts() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		postService.getPosts().then((data) => setPosts(data.documents));
		console.log("Posts:",posts);
	}, []);

	return (
		<div className="flex flex-wrap gap-4">
			{posts && posts.length > 0 ? (
				posts.map((post) => <Post title={post.title} content={post.content} />)
			) : (
				<h1>No posts found</h1>
			)}
		</div>
	);
}

export default AllPosts;
