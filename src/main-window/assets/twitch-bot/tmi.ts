import tmi from 'tmi.js';
import { Command } from '../../../global-assets/types';

// Define configuration options for tmi.js
const opts = {
    identity: {
        username: 'TheUltimateChatBot',
        password: 'oauth:0vj8k5sfw385bfgo0regxo309a0pz7'
    },
    connection: {
        reconnect: true
    },
    channels: ['nevekk87']
};

const client = new tmi.Client(opts);

const regexpCommand = /^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/;

const commands = {
    website: {
        response: 'http://www.twitch.tv/nevekk87'
    },
    upvote: {
        response: (user?: string) => `User ${user} was just upvoted`
    }
};

client.on('message', (channel, context, message, self) => {
    if (self) {
        return;
    }

    const [, command, argument] = message.match(regexpCommand) || [];

    const { response } = commands[command as Command] || {};
    try {
        if (typeof response === 'function') {
            client.say(channel, response(argument));
        } else if (typeof response === 'string') {
            client.say(channel, response);
        }
    } catch (e) {
        console.log(e);
    }

    console.log(`${context['display-name']}: ${message}`);
});

export default client;
