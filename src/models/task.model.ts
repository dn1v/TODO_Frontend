export class Task {
	_id: string;
	content: string;
	done: boolean;
	createdAt: Date;
	updatedAt: Date;

	constructor(obj?: any) {
		this._id = obj && obj._id || null
		this.content = obj && obj.content || null
		this.done = obj && obj.done || null
		this.createdAt = obj && obj.createdAt || new Date()
		this.updatedAt= obj && obj.updatedAt || new Date()
	}
}