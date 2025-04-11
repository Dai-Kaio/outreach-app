import mongoose from 'mongoose';

// Zmienne środowiskowe używane do połączenia z MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/outreach';

/**
 * Globalna zmienna do przechowywania połączenia z bazą danych
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Funkcja ustanawiająca połączenie z bazą danych MongoDB
 */
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

/**
 * Funkcja rozłączająca z bazą danych (przydatna w trybie deweloperskim)
 */
export async function disconnectFromDatabase() {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
  }
}