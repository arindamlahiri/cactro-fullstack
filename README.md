# Quick Polling App

A real-time polling application built with Next.js and PostgreSQL.

[https://cactro-fullstack.vercel.app/](https://cactro-fullstack.vercel.app/)

## Features

- Create polls with multiple options
- Vote on polls
- Real-time updates (refreshes every 5 seconds)
- Responsive design
- Progress bars for visualizing results

## API Endpoints

- `POST /api/polls` - Create a new poll
- `GET /api/polls/:id` - Get a specific poll
- `POST /api/polls/:id/vote` - Vote on a specific poll

## Database Schema

The database schema consists of two main tables:

### Poll table

- `id`: UUID, primary key, auto-generated
- `question`: VARCHAR(256), required
- `createdAt`: Timestamp, defaults to current timestamp
- `updatedAt`: Timestamp, auto-updates

### Option table

- `id`: Serial integer, primary key
- `pollId`: UUID, foreign key reference to Poll table
- `text`: VARCHAR(256), required
- `votes`: Integer, defaults to 0
- `createdAt`: Timestamp, defaults to current timestamp
- `updatedAt`: Timestamp, auto-updates

### Relationships

- One Poll has many Options
- Each Option belongs to one Poll

The schema includes index on the `pollId` column for optimized lookups of options by poll.

## TODO

[x] Add shadcn UI components
[x] Deploy initial version to Vercel
[x] Create a database schema
[x] Document schema in README
[x] Logic to create polls
[x] Logic to vote on polls
[x] Logic to view poll results
