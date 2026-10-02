# DevTinder

A Tinder-style networking platform for developers. Instead of dating, DevTinder helps tech people discover and connect with other developers who share their interests, and chat with them in real time once they match.

## Features

- **Developer profiles:** create a profile with your skills and interests
- **Secure authentication** using JWT
- **Swipe-based matching:** browse developers and swipe to connect
- **Smart suggestions:** a matching algorithm scores developers across 5+ interest parameters to show more relevant profiles
- **Real-time chat:** matched users can message each other instantly using Socket.io

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Real-time | Socket.io |
| Auth | JWT |

## Architecture

```
Client (React)
      │
      ├── REST API (Node.js / Express) ──► MongoDB
      │        └── JWT authentication
      │
      └── Socket.io connection ──► real-time chat
```

## How It Works

- **Sign up and profile:** a user signs up, logs in with JWT and builds a developer profile.
- **Feed:** the backend scores other developers against the user's interests across multiple parameters and shows the most relevant profiles first.
- **Swipe:** the user swipes to show interest. When two developers connect, they become a match.
- **Chat:** matched users chat through a Socket.io connection, so messages are delivered live without refreshing the page.

## Project Structure

```
DevTinder/
├── backend/     # Node.js + Express API
├── frontend/    # React app
└── README.md
```

