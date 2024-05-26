import { Editor } from "@tinymce/tinymce-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import postService from "../appwrite/post";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import fileService from "../appwrite/file";
import { useNavigate } from "react-router-dom";
import config from "../config/config";

function NewPost() {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
		control,
	} = useForm();

	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);

	const submitPost = async (formData) => {
		fileService.uploadFile(formData.image[0]).then(async (data) => {
			postService
				.createPost({
					...formData,
					userID: userData.$id,
					featuredImage: data.$id,
				})
				.then((data) => {
					if (data) {
						navigate("/");
					} else throw new Error("Error creating post");
				})
				.catch(
					async (error) =>
						await fileService
							.deleteFile(data.$id)
							.then(() => console.error("Error", error))
				);
		});
	};

	return (
		<form onSubmit={handleSubmit(submitPost)} noValidate>
			<div className="flex flex-col gap-4 mx-10 lg:mx-32 my-8">
				<div className="flex flex-col gap-1.5">
					<Label className="text-md" htmlFor="title">
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
				<div className="flex gap-4">
					<div>
						<Label className="text-md" htmlFor="featuredImage">
							Featured Image
						</Label>
						<Input
							id="featuredImage"
							type="file"
							placeholder="Upload the featured image"
							{...register("image", {
								required: "Image is required",
							})}
						/>
						<p className="text-red-500 text-sm">
							{errors.image && errors.image.message}
						</p>
					</div>

					<div>
						<Label className="text-md" htmlFor="status">
							Status
						</Label>
						<Controller
							name="status"
							control={control}
							defaultValue={"active"}
							rules={{ required: "Status is required" }}
							render={({ field: { onChange, value } }) => (
								<Select onValueChange={onChange} value={value}>
									<SelectTrigger
										className="max-w-[180px] sm:w-[180px]"
										id="status"
									>
										<SelectValue placeholder="Select post visibility" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="active">
												Active
											</SelectItem>
											<SelectItem value="inactive">
												Inactive
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							)}
						/>
						<p className="text-red-500 text-sm">
							{errors.status && errors.status.message}
						</p>
					</div>
				</div>
				<Controller
					name="content"
					control={control}
					rules={{
						required: "Post content is required",
						maxLength: {
							value: 19000,
							message: "Content is too long",
						},
					}}
					render={({ field: { onChange } }) => (
						<Editor
							apiKey={config.TINYEDITOR_API}
							onEditorChange={onChange}
							initialValue=""
							init={{
								height: 450,
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
