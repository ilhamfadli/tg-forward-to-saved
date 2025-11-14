require('dotenv').config();
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { NewMessage } = require('telegram/events');
const input = require('input');
const fs = require('fs');

const apiId = parseInt(process.env.API_ID, 10);
const apiHash = process.env.API_HASH;

const MODE = process.env.MODE || 'private';             
const FORWARD_TYPE = process.env.FORWARD_TYPE || 'all'; 

function parseList(envValue) {
  if (!envValue || envValue.trim() === '') return [];
  return envValue
    .split(',')
    .map(s => s.trim().replace('@',''))
    .filter(s => s.length > 0);
}

const ALLOWED_GROUPS = parseList(process.env.ALLOWED_GROUPS);
const ALLOWED_USERS = parseList(process.env.ALLOWED_USERS);

const sessionFile = 'session.txt';
const savedSession = fs.existsSync(sessionFile)
  ? fs.readFileSync(sessionFile, 'utf8')
  : '';

const stringSession = new StringSession(savedSession);

(async () => {
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: () => input.text('Phone: '),
    password: () => input.text('Password (if any): '),
    phoneCode: () => input.text('Code: '),
    onError: (err) => console.error(err),
  });

  fs.writeFileSync(sessionFile, client.session.save());
  const me = await client.getMe();

  async function tryForward(message, chat, sender) {
    try {
      await client.forwardMessages(me.id, {
        messages: [message.id],
        fromPeer: chat,
      });
      console.log(`Forwarded from: ${sender?.username || sender?.firstName}`);
    } catch {
      console.warn('Forward restricted → skipped.');
    }
  }

  client.addEventHandler(
    async (event) => {
      const message = event.message;
      if (!message) return;

      const sender = await message.getSender();
      const chat = await message.getChat();

      const myId = me.id.toString();
      const senderId = sender?.id?.toString();
      const chatId = chat?.id?.toString();

      if (chatId === myId) return;
      if (senderId === myId) return;
      if (sender?.self || message.out) return;

      const isPrivate = chat.className === 'User';
      const isGroup = chat.megagroup || chat.broadcast;

      if (MODE === 'private' && !isPrivate) return;
      if (MODE === 'group' && !isGroup) return;

      const username = (chat.username || sender?.username || '').toString().replace('@','');

      if (isGroup && ALLOWED_GROUPS.length > 0) {
        const allow = ALLOWED_GROUPS.includes(chatId) || ALLOWED_GROUPS.includes(username);
        if (!allow) return;
      }

      if (isPrivate && ALLOWED_USERS.length > 0) {
        const allow = ALLOWED_USERS.includes(senderId) || ALLOWED_USERS.includes(username);
        if (!allow) return;
      }

      if (FORWARD_TYPE === 'media' && !message.media) return;

      await tryForward(message, chat, sender);
    },
    new NewMessage({ incoming: true })
  );

  console.log(`Bot running. MODE=${MODE}, FORWARD_TYPE=${FORWARD_TYPE}`);
  console.log('Allowed Groups:', ALLOWED_GROUPS);
  console.log('Allowed Users:', ALLOWED_USERS);
})();
