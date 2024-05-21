import { Editor } from "@tinymce/tinymce-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";

function NewPost() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();
	return (
		<form onSubmit={handleSubmit((data) => console.log(data))} noValidate>
			<div className="flex flex-col gap-4 mx-10 lg:mx-32 my-8">
				<div className="flex flex-col gap-1.5">
					<Label className="text-lg" htmlFor="title">
						Title
					</Label>
					<div className="flex gap-4">
						<Input
							id="title"
							type="text"
							placeholder="Your Title"
							{...register("title", {
								required: "Post title is required",
							})}
						/>
						<Button type="submit">Create Post</Button>
					</div>
					<p className="text-red-500 text-sm">
						{errors.title && errors.title.message}
					</p>
				</div>

				<Controller
					name="content"
					control={control}
					rules={{ required: "Post content is required" }}
					render={({ field: { onChange } }) => (
						<Editor
							apiKey="9ib8tgwimr5pyqo86th0fbsojkbujylm2m4gvel7q5ycu90u"
							initialValue=""
							init={{
								height: 380,
								menubar: true,
								plugins: [
									"advlist",
									"autolink",
									"lists",
									"link",
									"image",
									"charmap",
									"preview",
									"anchor",
									"searchreplace",
									"visualblocks",
									"code",
									"fullscreen",
									"insertdatetime",
									"media",
									"table",
									"code",
									"help",
									"wordcount",
								],
								toolbar:
									"undo redo | blocks | " +
									"bold italic forecolor | alignleft aligncenter " +
									"alignright alignjustify | bullist numlist outdent indent | " +
									"removeformat | help",
								content_style:
									"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
							}}
							onEditorChange={onChange}
						></Editor>
					)}
				/>
				<p className="text-red-500 text-sm">
					{errors.content && errors.content.message}
				</p>
			</div>
		</form>
	);
}

export default NewPost;
