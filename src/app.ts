if (process.env.NODE_ENV !== 'production') require('dotenv').config();

import * as fs from 'fs';
import { requireFile, projectDir, writeJson } from 'discord-bot-quickstart';
import { IRhythmBotConfig, RhythmBot } from './bot';

const logPath = projectDir('../logs.txt');
setInterval(() => {
    fs.writeFileSync(logPath, '');
}, 24 * 60 * 60 * 1000);

const config: IRhythmBotConfig = {
    discord: { token: process.env.TOKEN },
    directory: { logs: logPath },
};
const bot = new RhythmBot(config);

if (!!config && !config.discord.token) {
    bot.logger.debug('Invalid Token - Create valid token in the Discord Developer Portal');
    console.log('Invalid Token - Create valid token in the Discord Developer Portal');
    process.exit(0);
}

bot.connect()
    .then(() => {
        bot.logger.debug('Rhythm Bot Online');
        bot.listen();
    })
    .catch((err) => bot.logger.error(err));
