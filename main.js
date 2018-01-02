const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");
const PingHandler = require("./PingHandler.js");

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