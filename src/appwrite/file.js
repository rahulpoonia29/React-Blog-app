import { Client, ID } from "appwrite";
import config from "../config/config";

class FileService {
	client = new Client();
	storage;

	constructor() {
		this.client
			.setEndpoint(config.APPWRITE_URL)
			.setProject(config.APPWRITE_PROJECT_ID);
		this.storage = new Storage(this.client);
	}

	async uploadFile(file) {
		try {
			return this.storage.createFile(
				config.APPWRITE_BUCKET_ID,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log("Appwrite Error :: fileService :: uploadFile", error);
			return false;
		}
	}

	async updateFile(fileID) {
		try {
			return await this.storage.updateFile(
				config.APPWRITE_BUCKET_ID,
				fileID
			);
		} catch (error) {
			console.log("Appwrite Error :: fileService :: updateFile", error);
			return false;
		}
	}

	async deleteFile(fileID) {
		try {
			return await this.storage.deleteFile(
				config.APPWRITE_BUCKET_ID,
				fileID
			);
		} catch (error) {
			console.log("Appwrite Error :: fileService :: deleteFile", error);
			return false;
		}
	}
}
