export class User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;

	constructor(obj?: any) {
		this.id = obj && obj.id || null
		this.firstName = obj && obj.firstName || null
		this.lastName = obj && obj.lastName || null
		this.email = obj && obj.email || null
		this.password = obj && obj.password || null
		this.createdAt = obj && obj.createdAt || null
		this.updatedAt = obj && obj.updatedAt || null
	}
}

