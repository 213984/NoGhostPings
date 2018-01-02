module.exports = class {
    constructor(type, date, message, fs, path) {
        this.pingType = type;
        this.date = date;
        this.fs = fs;
        this.path = path;
        this.message = message;
    }
    set type(value) {
        this.pingType = value;
    }
    get type() {
        return this.pingType;
    }
    consoleLogPing() {
        if (this.pingType.dest === "User" && this.pingType.eventType === "message") {
            console.log(`[${this.date}] New ping arrived. Content: ${this.message.content + (this.message.attachments.first() ? ` | Attachment URL: ${this.message.attachments.first().url}\n` : "\n")}`);
        } else if (this.pingType.dest === "User" && this.pingType.eventType === "messageDelete") {
            console.log(`[${this.date}] GHOSTPING! Content: ${this.message.content + (this.message.attachments.first() ? ` | Attachment URL: ${this.message.attachments.first().url}\n` : "\n")}`);
        } else if (this.pingType.dest === "User" && this.pingType.eventType === "messageUpdate") {
            console.log(`[${this.date}] Ghostping. Content: ${this.message.content + (this.message.attachments.first() ? ` | Attachment URL: ${this.message.attachments.first().url}\n` : "\n")}`);
        }
    }
    fileLogPing() {
        if (this.pingType.dest === "User" && this.pingType.eventType === "message") {
            this.fs.appendFileSync(this.path, `[${this.date}] New ping arrived. Content: ${this.message.content + (this.message.attachments.first() ? ` | Attachment URL: ${this.message.attachments.first().url}\n` : "\n")}`);
        } else if (this.pingType.dest === "User" && this.pingType.eventType === "messageDelete") {
            this.fs.appendFileSync(this.path, `[${this.date}] GHOSTPING! Content: ${this.message.content + (this.message.attachments.first() ? ` | Attachment URL: ${this.message.attachments.first().url}\n` : "\n")}`);
        } else if (this.pingType.dest === "User" && this.pingType.eventType === "messageUpdate") {
            this.fs.appendFileSync(this.path, `[${this.date}] Ghostping. Content: ${this.message.content + (this.message.attachments.first() ? ` | Attachment URL: ${this.message.attachments.first().url}\n` : "\n")}`);
        }
    }
}