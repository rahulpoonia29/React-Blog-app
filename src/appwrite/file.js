import { Client, ID, Storage } from "appwrite";
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
			return await this.storage.createFile(
				config.APPWRITE_BUCKET_ID,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log("Appwrite Error :: fileService :: uploadFile", error);
			return null;
		}
	}

	async getFile(fileID, quality, size, ...rest) {
		try {
			return await this.storage.getFilePreview(
				config.APPWRITE_BUCKET_ID,
				fileID,
				size,
				size,
				undefined, // gravity (optional)
				quality, // quality (optional) - set your desired quality value here
				undefined, // borderWidth (optional)
				undefined, // borderColor (optional)
				undefined, // borderRadius (optional)
				undefined, // opacity (optional)
				undefined, // rotation (optional)
				undefined // background (optional)
			);
		} catch (error) {
			console.log("Appwrite Error :: fileService :: getFile", error);
			return null;
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
			return null;
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
			return null;
		}
	}
}

const fileService = new FileService();

export default fileService;
