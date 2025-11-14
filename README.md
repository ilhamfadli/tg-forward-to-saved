# 📬 Telegram Auto-Forward Bot

A lightweight Node.js bot that automatically forwards any message type (text, media, files, stickers, etc.) from specified private chats, groups, or channels directly to your **Saved Messages**.

> ⚠️ **No fallback mode:**  
> If forwarding is restricted in a chat, the bot will skip the message without copying or re-sending it.

---

## ✨ Features

### 🔁 Automatic Forwarding
Forward every message from selected chats into your Saved Messages.

### 📡 Multi-Source Listening
You can monitor multiple:
- Private chats
- Groups
- Channels
- Supergroups

All source chat IDs are configured through the `.env` file.

### 🪶 Minimal & Safe
- Uses [Telegraf](https://telegraf.js.org/)
- No database
- No file storage
- Perfect for simple personal automation

---

## 📦 Installation
```bash
git clone https://github.com/yourusername/telegram-auto-forward-bot
cd telegram-auto-forward-bot
npm install
```

---

## ⚙️ Configuration

Create or edit your `.env` file:
```env
BOT_TOKEN=123456:xxxxxx
LISTEN_IDS=12345678,-100200300400,-1009988776655
```

### `LISTEN_IDS`
A comma-separated list of chat IDs you want the bot to monitor.

**Supports:**
- User IDs (private chat)
- Group IDs
- Channel IDs
- Supergroup IDs

**Example:**
```env
LISTEN_IDS=12345678,-1001234567890,-1009876543210
```

---

## ▶️ Start the Bot
```bash
npm start
```

---

## 📜 How It Works

1. The bot listens for all incoming message updates.
2. When a message comes from any chat listed in `LISTEN_IDS`:
   - It attempts to forward the message to your **Saved Messages**.
3. If the message is restricted and cannot be forwarded:
   - The bot quietly skips it.
   - **No fallback.**
   - **No copying.**
   - **No downloading.**
   - **Forward-only behavior.**

---

## 📂 Project Structure
```
.
├── index.js        # main bot script
├── package.json
├── .env            # environment variables
└── README.md
```

---

## 📝 Notes

- The bot must be added to groups/chats you want to monitor.
- For channels, the bot needs to be an **administrator** to receive messages.
- For private users, they must **start the bot** first.
- Your **Saved Messages** chat ID is automatically detected (your own user ID).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 📄 License

This project is [MIT](LICENSE) licensed.

---

## 💬 Support

If you have any questions or need help, feel free to open an issue.

---