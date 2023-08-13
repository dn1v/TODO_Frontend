export class Task {
    taskId: string;
    authorId: string;
    content: string;
    done: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(obj?: any) {
        this.taskId = obj && obj.taskId || null
        this.authorId = obj && obj.authorId || null
        this.content = obj && obj.content || null
        this.done = obj && obj.done || false
        this.createdAt = obj && obj.createdAt || new Date()
        this.updatedAt = obj && obj.updatedAt || new Date()
    }
}