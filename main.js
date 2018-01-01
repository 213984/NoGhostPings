const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");

class PingHandler {
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

client.on("message", message => {
    if (message.mentions.users.size > 0) {
        if (message.mentions.users.array().includes(client.user)) {
            let handler = new PingHandler({
                "dest": "User",
                "eventType": "message"
            }, (new Date().getMonth() + 1) + "/" + (new Date().getDate()) + "-" + new Date().getHours() + ":" + new Date().getMinutes(), message, fs, config["logs"]["normalPings"]["file"].path);
            if (config["logs"]["normalPings"].console) {
                handler.consoleLogPing();
            }
            if (config["logs"]["normalPings"]["file"].enabled) {
                handler.fileLogPing();
            }
        }
    }
});

client.on("messageDelete", message => {
    if (message.mentions.users.size > 0) {
        if (message.mentions.users.array().includes(client.user)) {
            let handler = new PingHandler({
                "dest": "User",
                "eventType": "messageDelete"
            }, (new Date().getMonth() + 1) + "/" + (new Date().getDate()) + "-" + new Date().getHours() + ":" + new Date().getMinutes(), message, fs, config["logs"]["ghostPings"]["messageDelete"]["file"].path);
            if (config["logs"]["ghostPings"]["messageDelete"].console) {
                handler.consoleLogPing();
            }
            if (config["logs"]["ghostPings"]["messageDelete"]["file"].enabled) {
                handler.fileLogPing();
            }
        }
    }
})

client.on("messageUpdate", (oldmsg, newmsg) => {
    if (oldmsg.mentions.users.size > 0) {
        if (oldmsg.mentions.users.array().includes(client.user)) {
            let handler = new PingHandler({
                "dest": "User",
                "eventType": "messageUpdate"
            }, (new Date().getMonth() + 1) + "/" + (new Date().getDate()) + "-" + new Date().getHours() + ":" + new Date().getMinutes(), oldmsg, fs, config["logs"]["ghostPings"]["messageUpdate"]["file"].path);
            if (config["logs"]["ghostPings"]["messageUpdate"].console) {
                handler.consoleLogPing();
            }
            if (config["logs"]["ghostPings"]["messageUpdate"]["file"].enabled) {
                handler.fileLogPing();
            }
        }
    }
});

client.login(config.token);