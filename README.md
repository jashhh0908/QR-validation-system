
# QR Validation System

A full-stack web application built using the MERN (MongoDB, Express, React, Node.js) stack that makes event attendance simple and digital. It replaces paper checklists with a fast, camera-based scanning system to track guests as they enter and leave an event.


## Features

- Bulk CSV Import: Instant database population from guest spreadsheets.

- QR Generation: Automatic creation of unique security tokens and QR codes.

- Live Scanning: Camera validation for real-time entry/exit.

- Dual-Mode Toggle: Easy switching between Entry and Exit tracking.

- Auto-Emailer: Direct delivery of digital passes to participant inboxes.

- Admin Security: Protected backend routes via custom API-key middleware.


## Run Locally

Clone the project

```bash
  git clone https://github.com/jashhh0908/QR-validation-system.git
```

Go to the project directory

```bash
  cd QR-validation-system
```

Install dependencies

```bash
  cd client && npm install && cd ../server && npm install
```

Start the server (from root directory)

```bash
  cd server && npm run dev
```

Start the client (from root directory)
```bash
  cd client && npm run dev
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in /server

`PORT` - specify server port

`NODE_ENV` - `development` or `production`

`MONGO_URI` - MongoDB connection string

`URL` - Your local URL 

`DOMAIN` - Domain used in production 

`CLOUDINARY_CLOUD_NAME` - Cloudinary Credentials

`CLOUDINARY_API_KEY` - Cloudinary Credentials

`CLOUDINARY_API_SECRET` - Cloudinary Credentials

`EMAIL_USER` - Gmail handle

`EMAIL_PASS` - Gmail app password

`ADMIN_SECRET` - Pre-defined secret key used in the `x-admin-key` header for protected routes




## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB

**Storage:** Cloudinary (for QR Codes)

**Email:** Nodemailer (SMTP integration)

**Scanning:** html5-qrcode (Hardware camera integration)

**Security:** Custom API-Key Middleware