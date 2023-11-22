const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require("./options");

const token = '6965854719:AAHm2IqLQoXgVsB_eVKr8QAn99zUbdWeTBA'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Now I'll guess a number from 0 to 9, and try to guess it!`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber
    await bot.sendMessage(chatId, `Make a try!`, gameOptions)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Welcome message'},
        {command: '/info', description: 'Get info about active user'},
        {command: '/game', description: 'Start a guess number game'},
    ])

    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id

        if (text === '/start') {
            await bot.sendSticker(chatId, `https://tlgrm.eu/_/stickers/463/343/46334338-7539-4dae-bfb6-29e0bb04dc2d/192/14.webp`)
            return bot.sendMessage(chatId, `Welcome to DenGame TG bot`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Your name is ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if (text === '/game') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, `I don't understand, pls try again...`)
    })

    bot.on('callback_query',  msg => {
        const data = msg.data
        const chatId = msg.message.chat.id

        if (data === '/again')
            return startGame(chatId)

        if (data == chats[chatId])
            return bot.sendMessage(chatId, `Congrats, u guessed number ${chats[chatId]}`, againOptions)
        else
            return bot.sendMessage(chatId, `Unfortunately, u lost - number was ${chats[chatId]}`, againOptions)
    })
}

start()