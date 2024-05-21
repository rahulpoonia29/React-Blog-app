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

	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				String(email),
				String(password),
				String(name)
			);
			if (userAccount) {
				// Login the user
				this.Login({ email, password });
				return this.getCurrentUser();
			} else {
				return null;
			}
		} catch (error) {
			throw error;
		}
	}

	async Login({ email, password }) {
		console.log(email, password);
		try {
			await this.account.createEmailPasswordSession(email, password);
			return this.getCurrentUser();
		} catch (error) {
			throw error;
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			console.log(
				"Appwrite Error :: authService :: getCurrentUser",
				error
			);
		}
	}

	async logout() {
		try {
			this.account.deleteSession("current");
		} catch (error) {
			console.log("Appwrite Error :: authService :: logout :: ", error);
		}
	}
}

const authenticationService = new AuthenticationService();

export default authenticationService;
