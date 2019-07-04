module.exports = class level{
    constructor(){
        this.name = "level",
        this.alias = ['lvl'],
        this.usage = 'level'
    }

    run(bot, message, args){
        message.reply(this.name + " the database has not been linked!")
    }
}