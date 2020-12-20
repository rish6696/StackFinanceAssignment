import redis,{RedisError} from "redis";
import {  REDIS_URL } from "../config";
import util from "util";
import logger from "./logger";
import { generateError } from "./errorConstants";

export const redisClient = redis.createClient(REDIS_URL);


export const getRedisData = util.promisify(redisClient.get.bind(redisClient));



export const removeKey = (key: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    redisClient.del(key.toString(), (err:any, result:any) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};


redisClient.on("error", (error:RedisError ) => {
    logger.error(`Error While Connecting to Redis Client ${generateError(error)}`)
});