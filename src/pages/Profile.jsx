import React, { useEffect, useState } from "react";
import Post from "../components/post/Post";
import postService from "../appwrite/post";
import { Query } from "appwrite";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

function Profile() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const userdata = useSelector((state) => state.auth.userData);

	useEffect(() => {
		postService
			.getPosts([Query.equal("userID", userdata?.$id)])
			.then((data) => setPosts(data.documents))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

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
						<AvatarImage
							// src="https://github.com/shadcn.png"
							alt="@shadcn"
						/>
						<AvatarFallback>
							<User />
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col justify-center items-center md:items-start gap-1">
						<h1 className="text-2xl font-bold">{"Rahul Poonia"}</h1>
						<p className="text-gray-800">
							{"I love learning.😍✅✅"}
						</p>
					</div>
					{/* <button
						onClick={() => {}}
						className="m-auto bg-blue-500 text-white px-4 py-2 rounded"
					>
						Edit Profile
					</button> */}
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
