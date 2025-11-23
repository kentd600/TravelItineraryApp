import { createClient } from "redis";
import { createHash } from 'node:crypto';

const client = createClient({
  username: process.env.REDIS_USER!,
  password: process.env.REDIS_PW!,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT!)
  }
});
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();

export const wanderCache = {
  async setSelectedLocation(userId: string, itineraryId: string, locationId: string) {
    const hash = createHash('sha256');
    hash.update(`${userId}${itineraryId}`);
    console.log(hash.digest('hex'));
  }
}