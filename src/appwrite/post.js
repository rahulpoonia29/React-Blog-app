import { Client, Databases, ID, Query } from "appwrite";
import config from "../config/config";

class PostService {
	client = new Client();
	database;

	constructor() {
		this.client
			.setEndpoint(config.APPWRITE_URL)
			.setProject(config.APPWRITE_PROJECT_ID);
		this.database = new Databases(this.client);
	}

	async createPost({ title, content, featuredImage, status, userID }) {
		try {
			return await this.database.createDocument(
				config.APPWRITE_DATABASE_ID,
				config.APPWRITE_ARTICLE_COLLECTION_ID,
				ID.unique(),
				{
					title,
					content,
					featuredImage,
					status,
					userID,
				}
			);
		} catch (error) {
			console.log("Appwrite Error :: postService :: createPost", error);
			throw new Error(error.message);
		}
	}

	async updatePost(postID, { title, content, featuredImage, status }) {
		try {
			return await this.database.updateDocument(
				config.APPWRITE_DATABASE_ID,
				config.APPWRITE_ARTICLE_COLLECTION_ID,
				postID,
				{
					title,
					content,
					featuredImage,
					status,
				}
			);
		} catch (error) {
			console.log("Appwrite Error :: postService :: updatePost", error);
			throw new Error(error.message);
		}
	}

	async getPost(postID) {
		try {
			return await this.database.getDocument(
				config.APPWRITE_DATABASE_ID,
				config.APPWRITE_ARTICLE_COLLECTION_ID,
				postID
			);
		} catch (error) {
			console.log("Appwrite Error :: postService :: getPost", error);
			throw new Error(error.message);
		}
	}

	async getPosts(queries = [Query.equal("status", "active")]) {
		try {
			return await this.database.listDocuments(
				config.APPWRITE_DATABASE_ID,
				config.APPWRITE_ARTICLE_COLLECTION_ID,
				queries
			);
		} catch (error) {
			console.log("Appwrite Error :: postService :: getPosts", error);
			throw new Error(error.message);
		}
	}

	async deletePost(postID) {
		try {
			return await this.database.deleteDocument(
				config.APPWRITE_DATABASE_ID,
				config.APPWRITE_ARTICLE_COLLECTION_ID,
				postID
			);
		} catch (error) {
			console.log("Appwrite Error :: postService :: deletePost", error);
			throw new Error(error.message);
		}
	}
}

const postService = new PostService();

export default postService;
