import fileService from "../../appwrite/file";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import parse from "html-react-parser";

function PostCard({ title, content, featuredImage, $id, ...rest }) {
	const [image, setImage] = useState(null);
	const navigate = useNavigate();

	const extractTextFromHTML = (htmlString) => {
		const parsed = parse(htmlString);
		let text = "";

		const traverse = (node) => {
			if (typeof node === "string") {
				text += node;
			} else if (node && node.props && node.props.children) {
				const children = Array.isArray(node.props.children)
					? node.props.children
					: [node.props.children];
				children.forEach(traverse);
			}
		};

		traverse(parsed);
		return text;
	};

	useEffect(() => {
		fileService.getFile(featuredImage, 30).then((data) => {
			setImage(data.href);
		});
	}, [featuredImage]);

	return (
		<div
			className="cursor-pointer pb-4 bg-gray-100 border rounded-lg mx-auto shadow-lg w-full hover:shadow-2xl transition-transform transform hover:-translate-y-1.5"
			onClick={() => navigate(`/post/${$id}`)}
		>
			{image ? (
				<img
					src={image}
					alt={title}
					className="rounded-t-lg w-full aspect-video object-center object-cover"
				/>
			) : (
				<Skeleton className="h-[150px] w-[250px] rounded-xl" />
			)}
			<div className="p-4">
				<p className="font-semibold text-xl">{title}</p>
			</div>
		</div>
	);
}

export default PostCard;
