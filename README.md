# Telegram Auto-Forward Bot

A lightweight Node.js bot that automatically forwards messages from specified private chats or groups directly to your **Saved Messages** using Telegram's official **MTProto API** (via `telegram` library).

> **No fallback mode:**  
> If forwarding is restricted in a chat, the bot will skip the message without copying or re-sending it.

---

## Features

### Automatic Forwarding
Forward every message from selected chats/groups into your Saved Messages.

### Multi-Source Listening
You can monitor:
- **Private chats** - Direct messages from specific users
- **Groups/Channels** - Public or private groups and channels
- **Filter by username or ID** - Whitelist specific users or groups

### Flexible Filtering
- **MODE**: Choose between `private`, `group`, or `all`
- **FORWARD_TYPE**: Forward `all` messages or only `media` messages
- **Whitelist**: Use `ALLOWED_GROUPS` and `ALLOWED_USERS` to specify which sources to monitor

### Minimal & Safe
- Uses official [telegram](https://gram.js.org/) library (MTProto)
- Session-based authentication (no repeated login)
- No database
- No file storage
- Perfect for simple personal automation

---

## Installation

```bash
git clone https://github.com/yourusername/telegram-auto-forward-bot
cd telegram-auto-forward-bot
npm install
```

### Dependencies

```bash
npm install telegram input dotenv
```

---

## Getting API Credentials

Before using this bot, you need to obtain your **API ID** and **API Hash** from Telegram:

### Step-by-Step Guide:

1. **Visit Telegram's API Development Tools**  
   Go to: [https://my.telegram.org](https://my.telegram.org)

2. **Login with Your Phone Number**  
   Enter your phone number and verify with the code sent to your Telegram app.

3. **Navigate to API Development Tools**  
   Click on **"API development tools"** link.

4. **Create a New Application**  
   Fill in the form:
   - **App title**: Your bot name (e.g., "Auto Forward Bot")
   - **Short name**: A short identifier (e.g., "autoforward")
   - **Platform**: Choose any (e.g., "Desktop")
   - **Description**: Optional

5. **Get Your Credentials**  
   After creating the app, you'll receive:
   - **api_id** - A numeric ID (e.g., `12345678`)
   - **api_hash** - A string hash (e.g., `abcdef1234567890abcdef1234567890`)

6. **Keep Them Secret**  
   ⚠️ Never share these credentials publicly or commit them to Git!

---

## Configuration

Create a `.env` file in the project root:

```env
# Required: Telegram API credentials
API_ID=12345678
API_HASH=abcdef1234567890abcdef1234567890

# Optional: Filtering options
MODE=all
FORWARD_TYPE=all
ALLOWED_GROUPS=
ALLOWED_USERS=
```

### Configuration Options

| Variable | Values | Description |
|----------|--------|-------------|
| `API_ID` | *numeric* | Your Telegram API ID (from my.telegram.org) |
| `API_HASH` | *string* | Your Telegram API Hash (from my.telegram.org) |
| `MODE` | `all`, `private`, `group` | Which chat types to monitor |
| `FORWARD_TYPE` | `all`, `media` | Forward all messages or only media |
| `ALLOWED_GROUPS` | comma-separated | Whitelist specific groups (username or ID) |
| `ALLOWED_USERS` | comma-separated | Whitelist specific users (username or ID) |

### Examples

**Example 1: Forward all messages from private chats only**
```env
API_ID=12345678
API_HASH=your_hash_here
MODE=private
FORWARD_TYPE=all
```

**Example 2: Forward only media from specific groups**
```env
API_ID=12345678
API_HASH=your_hash_here
MODE=group
FORWARD_TYPE=media
ALLOWED_GROUPS=mychannel,anotherchannel,-1001234567890
```

**Example 3: Forward all messages from specific users**
```env
API_ID=12345678
API_HASH=your_hash_here
MODE=private
FORWARD_TYPE=all
ALLOWED_USERS=john_doe,jane_smith,987654321
```

**Example 4: Monitor everything (no filters)**
```env
API_ID=12345678
API_HASH=your_hash_here
MODE=all
FORWARD_TYPE=all
```

---

## Start the Bot

### First Time (Login Required)

```bash
npm start
```

You'll be prompted to enter:
1. **Phone number** (with country code, e.g., +1234567890)
2. **Verification code** (sent to your Telegram app)
3. **2FA Password** (if you have two-factor authentication enabled)

After successful login, a `session.txt` file is created to store your session.

### Subsequent Runs

The bot will use the saved session and start immediately without asking for credentials.

---

## How It Works

1. **Authentication**: The bot logs in using your phone number and creates a persistent session.
2. **Event Listening**: Listens for all incoming messages from monitored chats.
3. **Filtering**: Applies filters based on `MODE`, `FORWARD_TYPE`, and whitelists.
4. **Forwarding**: Attempts to forward messages to your Saved Messages.
5. **Error Handling**: Silently skips messages that cannot be forwarded (restricted).

### Message Flow

```
Incoming Message → Filter by MODE → Filter by Whitelist → Filter by FORWARD_TYPE → Forward to Saved Messages
```

---

## Project Structure

```
.
├── index.js         # main bot script
├── package.json     # dependencies
├── .env             # configuration (create this)
├── session.txt      # saved session (auto-generated)
├── .gitignore       # ignore sensitive files
└── README.md        # this file
```

---

## Important Notes

### Session Management
- `session.txt` stores your login session - **keep it secure!**
- Add `session.txt` to `.gitignore` to avoid exposing it
- If you lose this file, you'll need to login again

### Permissions
- The bot runs under your personal Telegram account
- You must be a member of groups/channels you want to monitor
- For channels, you need to have access to read messages
- Private users must have sent you at least one message

### Limitations
- If a message has forwarding disabled, it will be skipped (no fallback)
- The bot needs to stay running to forward messages in real-time
- Rate limits apply based on Telegram's API restrictions

### Security
- Never share your `API_ID`, `API_HASH`, or `session.txt`
- Use this bot responsibly and respect others' privacy
- This bot is for personal use only

---

## .gitignore Recommendation

Create a `.gitignore` file:

```gitignore
# Environment variables
.env

# Session file
session.txt

# Node modules
node_modules/

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db
```

---

## Troubleshooting

### "Invalid API_ID or API_HASH"
- Double-check your credentials from my.telegram.org
- Ensure `API_ID` is a number (no quotes in .env)
- Ensure `API_HASH` has no extra spaces

### "Phone number invalid"
- Include country code (e.g., +1234567890)
- Remove any spaces or special characters

### "Session expired"
- Delete `session.txt` and login again
- Check if you logged out from other devices

### Messages not forwarding
- Verify the chat is in your whitelist (if using `ALLOWED_GROUPS` or `ALLOWED_USERS`)
- Check if `MODE` matches the chat type
- Ensure you have access to read messages from that chat
- Some messages may have forwarding disabled (bot will skip them)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## Disclaimer

This bot is for educational and personal use only. Make sure to:
- Comply with Telegram's Terms of Service
- Respect others' privacy and copyright
- Not use this for spam or unauthorized data collection
- Use at your own risk

## Support

If you have any questions or need help, feel free to open an issue.


## License

MIT License

## Resources

- [Foundry Documentation](https://book.getfoundry.sh/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/)
- [Contact](https://t.me/thevooidx)

## Contact Me

- 💬 Telegram: [@thevooidx](https://t.me/thevooidx)
- 💎 ETH/BNB: `0xc72b9402553f008c05c4e36042b91d9249e53a4b`