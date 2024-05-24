import React, { useEffect, useMemo, useState } from "react";
import postService from "../appwrite/post";
import Post from "../components/post/Post";

function AllPosts() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useMemo(() => {
		postService
			.getPosts()
			.then((data) => setPosts(data.documents))
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return (
			<div className="h-full grid justify-center items-center text-2xl font-semibold">
				Loading Posts
			</div>
		);
	} else {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-8">
				{posts && posts.length > 0 ? (
					posts.map((post, key) => <Post key={key} {...post} />)
				) : (
					<h1 className="text-center w-full col-span-full text-2xl">
						No posts found
					</h1>
				)}
			</div>
		);
	}
}

export default AllPosts;
