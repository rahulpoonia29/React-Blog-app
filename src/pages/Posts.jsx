import React, { useEffect, useState } from "react";
import postService from "../appwrite/post";
import Post from "../components/post/Post";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

function Posts() {
	const postsQuery = useQuery({
		queryKey: ["postsQuery"],
		queryFn: () => postService.getPosts().then((data) => data.documents),
	});

	if (postsQuery.isPending) {
		return (
			<div className="m-8">
				<Skeleton className="h-8 w-[40%] md:w-60 font-semibold mb-6" />
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
					{[...Array(9)].map((_, key) => (
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
					))}
				</div>
			</div>
		);
	}

	if (postsQuery.error) return "An error has occurred: " + error.message;

	return (
		<div className="m-8">
			<h1 className="text-2xl font-semibold mb-6">Recent Blog Posts</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
				{(postsQuery.data && postsQuery.data.length) > 0 ? (
					postsQuery.data.map((post, key) => (
						<Post key={key} {...post} />
					))
				) : (
					<h1 className="text-center w-full col-span-full text-2xl">
						No posts found
					</h1>
				)}
			</div>
		</div>
	);
}

export default Posts;
