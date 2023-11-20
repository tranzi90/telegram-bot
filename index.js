const TelegramApi = require('node-telegram-bot-api')

const token = ''

const bot = new TelegramApi(token, {polling: true})

bot.on('message', async msg => {
    const text = msg.text
    const chatId = msg.chat.id

    if (text === '/start') {
        await bot.sendSticker(chatId, `https://tlgrm.eu/_/stickers/463/343/46334338-7539-4dae-bfb6-29e0bb04dc2d/192/14.webp`)
        await bot.sendMessage(chatId, `Welcome to DenGame TG bot`)
    }
    if (text === '/info') {
        await bot.sendMessage(chatId, `Your name is ${msg.from.first_name} ${msg.from.last_name}`)
    }
})