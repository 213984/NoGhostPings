const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const token = "YOUR TOKEN HERE";
const logs = {
    "normalPings": {
        "console": true,
        "file": {
            "enabled": false,
            "path": false
        }
    },
    "ghostPings": {
        "messageUpdate": {
            "console": true,
            "file": {
                "enabled": false,
                "path": false
            }
        },
        "messageDelete": {
            "console": true,
            "file": {
                "enabled": true,
                "path": "./messageDeletePings.txt"
            }
        }
    }
};


client.on("message", message => {
    if (message.mentions.users.size > 0) {
        if (message.mentions.users.array().includes(client.user)) {
            if (logs["normalPings"].console)
                console.log(`[${(new Date().getMonth() + 1)}/${(new Date().getDate())} - ${new Date().getHours()}:${new Date().getMinutes()}] New ping arrived. Content: ${message.content + (message.attachments.first() ? ` | Attachment URL: ${message.attachments.first().url}\n` : "\n")}`);
            if (logs["normalPings"]["file"].enabled)
                fs.appendFileSync(logs["normalPings"]["file"].path, `[${(new Date().getMonth() + 1)}/${(new Date().getDate())} - ${new Date().getHours()}:${new Date().getMinutes()}] New ping arrived. Content: ${message.content + (message.attachments.first() ? ` | Attachment URL: ${message.attachments.first().url}\n` : "\n")}`);
        }
    }
});

client.on("messageDelete", message => {
    if (message.mentions.users.size > 0) {
        if (message.mentions.users.array().includes(client.user)) {
            if (logs["ghostPings"]["messageDelete"].console)
                console.log(`[${(new Date().getMonth() + 1)}/${(new Date().getDate())} - ${new Date().getHours()}:${new Date().getMinutes()}] New ghost ping arrived (Message was deleted). Content: ${message.content + (message.attachments.first() ? ` | Attachment URL: ${message.attachments.first().url}\n` : "\n")}`);
            if (logs["ghostPings"]["messageDelete"]["file"].enabled)
                fs.appendFileSync(logs["ghostPings"]["messageDelete"]["file"].path, `[${(new Date().getMonth() + 1)}/${(new Date().getDate())} - ${new Date().getHours()}:${new Date().getMinutes()}] New ghost ping arrived (Message was deleted). Content: ${message.content + (message.attachments.first() ? ` | Attachment URL: ${message.attachments.first().url}\n` : "\n")}`);
        }
    }
})

client.on("messageUpdate", (oldmsg, newmsg) => {
    if (oldmsg.mentions.users.size > 0) {
        if (oldmsg.mentions.users.array().includes(client.user)) {
            if (logs["ghostPings"]["messageUpdate"].console)
                console.log(`[${(new Date().getMonth() + 1)}/${(new Date().getDate())} - ${new Date().getHours()}:${new Date().getMinutes()}] New ghost ping arrived (Message was edited). Old content: ${oldmsg.content + (oldmsg.attachments.first() ? ` | Attachment URL: ${oldmsg.attachments.first().url}\n` : "\n")}`);
            if (logs["ghostPings"]["messageUpdate"]["file"].enabled)
                fs.appendFileSync(logs["ghostPings"]["messageUpdate"]["file"].path, `[${(new Date().getMonth() + 1)}/${(new Date().getDate())} - ${new Date().getHours()}:${new Date().getMinutes()}] New ghost ping arrived (Message was edited). Old content: ${oldmsg.content + (oldmsg.attachments.first() ? ` | Attachment URL: ${oldmsg.attachments.first().url}\n` : "\n")}`);
        }
    }
});

client.login(token);