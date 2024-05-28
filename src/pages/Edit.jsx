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
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config/config";

function Edit() {
	const location = useLocation();
	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);
	const post = location.state?.post;
	const initialValues = {
		title: post?.title,
		content: post?.content,
		status: post?.status,
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			title: post?.title,
			content: post?.content,
			status: post?.status,
		},
	});

	const getChangedValues = (formData) => {
		const changedValues = {};
		for (const key in formData) {
			if (formData[key] !== initialValues[key]) {
				changedValues[key] = formData[key];
			}
		}
		formData.featuredImage.length > 0
			? (changedValues.featuredImage = formData.featuredImage)
			: delete changedValues.featuredImage;
		return changedValues;
	};

	const submitPost = async (formData) => {
		const changedValues = getChangedValues(formData);
		if (changedValues.featuredImage) {
			await fileService.deleteFile(post.featuredImage);
			const file = await fileService.uploadFile(
				changedValues.featuredImage[0]
			);
			changedValues.featuredImage = file.$id;
		}
		console.log(changedValues);
		postService
			.updatePost(post.$id, {
				...changedValues,
			})
			.then(() => {
				navigate("/");
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
						<Button type="submit">Update Post</Button>
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
							{...register("featuredImage")}
						/>
						<p className="text-red-500 text-sm">
							{errors.image && errors.image.message}
						</p>
					</div>

					<div className="">
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
										className="grow w-[120px]"
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
					rules={{ required: "Post content is required" }}
					render={({ field: { onChange } }) => (
						<Editor
							apiKey={config.TINYEDITOR_API}
							onEditorChange={onChange}
							initialValue={post?.content}
							init={{
								height: 600,
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

export default Edit;
