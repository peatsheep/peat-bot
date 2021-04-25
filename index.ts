// import TwitchJs, { BaseMessage } from 'twitch-js';
// import fetchUtil from 'twitch-js/lib/utils/fetch'
// import dotenv from 'dotenv';

// dotenv.config();

// const clientId = process.env.TWITCH_CLIENT_ID;
// const clientSecret = process.env.TWITCH_CLIENT_SECRET;

// const onAuthenticationFailure = () =>
//   fetchUtil('https://id.twitch.tv/oauth2/token', {
//     method: 'post',
//     search: {
//       grant_type: 'client_credentials',
//       client_id: clientId,
//       client_secret: clientSecret,
//     },
//   }).then((response) => response.json()).then((json) => json.accessToken as string );

// const authenticate = async (): Promise<string> => {
//     const response = await fetchUtil('https://id.twitch.tv/oauth2/token', {
//         method: 'post',
//         search: {
//             grant_type: 'client_credentials',
//             client_id: clientId,
//             client_secret: clientSecret,
//         },
//     });
//     // @ts-ignore
//     const json = response as { accessToken: string; };
//     return json.accessToken;
// };

// authenticate().then(async (token): Promise<void> => {
//     const username = 'peat-bot';

//     const { chat } = new TwitchJs({ token, username, onAuthenticationFailure });
    
//     await chat.connect();
//     await chat.join('peatsheep');
//     chat.on('*', (message): void => {
//         const baseMessage = message as BaseMessage;
//         console.log(baseMessage.message);
//     });
// });

import tmi from 'tmi.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: 'peat-bot',
        password: process.env.TWITCH_BOT_TOKEN,
    },
    channels: ['peatsheep']
});
client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${tags.username}, heya!`);
	}
});
client.on('
