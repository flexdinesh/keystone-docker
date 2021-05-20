require('dotenv').config();

export const PORT = parseInt(process.env.PORT as string) || 8080;

let dbURL = process.env.DATABASE_URL || 'postgres://db_user:db_password@localhost:5432/db_schema';

if (process.env.NODE_ENV === 'production' && !dbURL) {
    throw new Error(
        'The DATABASE_URL environment variable not found'
    );
}

// Postgres URI
export const DATABASE_URL = dbURL;
console.log(`DATABASE_URL: ${DATABASE_URL}`);

// Default to 30 days
export const SESSION_MAX_AGE = parseInt(process.env.SESSION_MAX_AGE as string) || 60 * 60 * 24 * 30;

let sessionSecret = process.env.SESSION_SECRET;

if (process.env.NODE_ENV === 'production' && !sessionSecret) {
    throw new Error(
        'The SESSION_SECRET environment variable must be set in production'
    );
}

// Default to a secure random string on each app start
// This will cause all sessions to be revoked unless the env var is suppled
export const SESSION_SECRET =
    sessionSecret ||
    require('crypto')
        .randomBytes(32)
        .toString('base64')
        .replace(/[^a-zA-Z0-9]+/g, '');
