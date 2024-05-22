import parse from "html-react-parser";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

function Post({ title, content }) {
	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">{title}</CardTitle>
				<CardDescription>{title}</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">{parse(content)}</CardContent>
			<CardFooter></CardFooter>
		</Card>
	);
}

export default Post;
