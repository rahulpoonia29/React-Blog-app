import { Client, Databases, ID, Query } from "appwrite";
import config from "../config/config";

class UserService {
	client = new Client();
	database;

	constructor() {
		this.client
			.setEndpoint(config.APPWRITE_URL)
			.setProject(config.APPWRITE_PROJECT_ID);
		this.database = new Databases(this.client);
	}

	async createUser({ userid, name, bio, profileimg }) {
		try {
			return await this.database.createDocument(
				config.APPWRITE_DATABASE_ID,
				config.APPWRITE_USER_COLLECTION_ID,
				ID.unique(),
				{
					userid,
					name,
					bio,
					profileimg,
				}
			);
		} catch (error) {
			console.log("Appwrite Error :: userService :: createUser", error);
			throw new Error(error.message);
		}
	}

	async getUser(userID) {
		try {
			return await this.database.listDocuments(
				config.APPWRITE_DATABASE_ID,
				config.APPWRITE_USER_COLLECTION_ID,
				[Query.equal("userid", userID)]
			);
		} catch (error) {
			console.log("Appwrite Error :: userService :: getUser", error);
			throw new Error(error.message);
		}
	}

	async updateUser(documentID, { name, bio, profileimg }) {
		try {
			return await this.database.updateDocument(
				config.APPWRITE_DATABASE_ID,
				config.APPWRITE_USER_COLLECTION_ID,
				documentID,
				{ name, bio, profileimg }
			);
		} catch (error) {
			console.log("Appwrite Error :: userService :: updateUser", error);
			throw new Error(error.message);
		}
	}
}

const userService = new UserService();

export default userService;
