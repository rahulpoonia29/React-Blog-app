import parse from "html-react-parser";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import fileService from "../../appwrite/file";
import { useEffect, useState } from "react";

function Post({ title, content, featuredImage, ...rest }) {
	const [image, setImage] = useState(null);

	useEffect(() => {
		fileService.getFile(featuredImage).then((data) => setImage(data.href));
	}, []);

	return (
		<Card className="mx-auto max-w-sm shadow-md">
			<CardHeader>
				<CardTitle className="text-2xl">{title}</CardTitle>
				<CardDescription>{parse(content)}</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				{image ? (
					<img src={image} alt={title} className="w-full" />
				) : (
					<p>Loading</p>
				)}
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	);
}

export default Post;
