import { Account, Client, ID } from "appwrite";
import config from "../config/config";

class AuthenticationService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(config.APPWRITE_URL)
			.setProject(config.APPWRITE_PROJECT_ID);
		this.account = new Account(this.client);
	}

	async createAccount(email, password) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				String(email),
				String(password)
			);
			if (userAccount) {
				// Login the user
				this.Login(email, password);
			} else {
				return userAccount;
			}
		} catch (error) {
			throw error;
		}
	}

	async Login(email, password) {
		try {
			return await this.account.createEmailPasswordSession(email, password);
		} catch (error) {
			throw error;
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			console.log("Appwrite Error :: authService :: getCurrentUser", error);
		}
	}

	async logout() {
		try {
			this.account.deleteSession("current");
		} catch (error) {
			console.log("Appwrite Error :: logout :: ", error);
		}
	}
}

const authenticationService = new AuthenticationService()

export default authenticationService;
