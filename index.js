const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const {CommandHandler} = require("djs-commands")
const CH = new CommandHandler({
    folder: __dirname + "/commands/",
    prefix: [botconfig.prefix]
});

const bot = new Discord.Client()

bot.on("ready", async () => {
    console.log('${bot.user.username} is online!');
    bot.user.setActivity("Gotham", {type: 'WATCHING'});
});

bot.on("message", (message) => {
    if(message.channel.type === 'dm') return;
    if(message.author.type === 'bot') return;
    let args = null;
    let command = message.content;
    let cmd = CH.getCommand(command);
    if(message.content === "!bat"){
        const fs = require("fs");

        folder = __dirname + "/commands/";

        const files = fs.readdirSync(folder);
        files.filter(f => fs.statSync(folder + f).isDirectory())
            .forEach(nested => fs.readdirSync(folder + nested).forEach(f => files.push(nested + '/' + f)));
        const jsFiles = files.filter(f => f.endsWith('.js'));

        let commandlist = '';

        if (files.length >= 2){
            for (const f of jsFiles) {
                const file = require(folder + f);
                const cmd = new file();

                const name = cmd.name;
                commandlist += name + ', ';
            }
        }
        if (files.length == 1){
            for (const f of jsFiles) {
                const file = require(folder + f);
                const cmd = new file();

                const name = cmd.name;
                commandlist += name;
            }
        }
        message.reply("the following commands are available: " + commandlist);
    }
    if(!cmd) return;
    try{
        cmd.run(bot, message, args);
    }catch(e){
        console.log(e);
    }
});

bot.login(botconfig.token);