import { User } from "./user.model";

export class AuthResponse {
	user: User;
	token: string;

	constructor(obj?: any) {
		this.user = obj && obj.user && new User(obj.user) || new User();
		this.token = obj && obj.token || ''
	}
}