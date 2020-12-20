import { Request, Response, NextFunction } from "express";
import { getRedisData, redisClient } from "../utilities/redisClient";
import axios, { AxiosError } from "axios";
import { zohoDefaultConfig, zohoRefreshTokenConfig } from "../utilities/ZohoApi";
import { CONSTANT_KEYS } from "../constants";
import {  ZOHO_CREATE_USER_URL, ZOHO_INSERT_NOTE_URL } from "../config";
import logger from "../utilities/logger";
import { APIError } from "../utilities/APIError";
import {
  ERROR_STATUS_CODE,
  generateError,
} from "../utilities/errorConstants";

const updateAuthToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const authResponse = await axios(zohoRefreshTokenConfig());
      const authToken = authResponse.data.access_token as string;
      redisClient.set(CONSTANT_KEYS.AUTH_TOKEN_REDIS_KEY, authToken);
      console.log("in update auth sucess");
      resolve({ status: true });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const insertRecordController = async (req: Request, res: Response, next: NextFunction) => {
  const { data } = req.body;

  logger.info(`Insert record api initiated with data ${JSON.stringify(data)}`);

  let authToken = await getRedisData(CONSTANT_KEYS.AUTH_TOKEN_REDIS_KEY);

  try {
    if (!authToken) {
      await updateAuthToken();
    }

    authToken = (await getRedisData(CONSTANT_KEYS.AUTH_TOKEN_REDIS_KEY)) as string;

    let requestBody: any = {};
    requestBody["data"] = data;

    let response;

    try {
      response = await axios(
        zohoDefaultConfig({
          authToken,
          data: requestBody,
          url: ZOHO_INSERT_NOTE_URL,
        })
      );
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status == 401) {
        await updateAuthToken();
        authToken = (await getRedisData(CONSTANT_KEYS.AUTH_TOKEN_REDIS_KEY)) as string;
        response = await axios(
          zohoDefaultConfig({
            authToken,
            data: requestBody,
            url: ZOHO_INSERT_NOTE_URL,
          })
        );
      } else {
        logger.error(`Error while inserting record  ${generateError(err.response?.data)}`);
        return next(
          new APIError(ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR_CODE, err.response?.data.message)
        );
      }
    }

    if (response) {
      res.send({ status: true, data: response.data.data });
      logger.info(`Successfully inserting record ${JSON.stringify(response.data)}`);
    }
  } catch (error) {
    const err = error as AxiosError;
    logger.error(`Error while inserting record ${generateError(error)}`);
    return next(
      new APIError(ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR_CODE, err.response?.data.message)
    );
  }
};

export const createNotesController = async (req: Request, res: Response, next: NextFunction) => {
  const { data } = req.body;
  const { record_id } = req.params;

  logger.info(`create Notes api initiated with data ${JSON.stringify(data)}`);

  let authToken = await getRedisData(CONSTANT_KEYS.AUTH_TOKEN_REDIS_KEY);

  try {
    if (!authToken) {
      await updateAuthToken();
    }

    authToken = (await getRedisData(CONSTANT_KEYS.AUTH_TOKEN_REDIS_KEY)) as string;

    let requestBody: any = {};
    requestBody["data"] = data;

    let response;

    try {
      response = await axios(
        zohoDefaultConfig({
          authToken,
          data: requestBody,
          url: `${ZOHO_INSERT_NOTE_URL}/${record_id}/Notes`,
        })
      );
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status == 401) {
        await updateAuthToken();
        authToken = (await getRedisData(CONSTANT_KEYS.AUTH_TOKEN_REDIS_KEY)) as string;
        response = await axios(
          zohoDefaultConfig({
            authToken,
            data: requestBody,
            url: `${ZOHO_INSERT_NOTE_URL}/${record_id}/Notes`,
          })
        );
      } else {
        logger.error(`Error while creating notes ${generateError(err.response?.data)}`);
        return next(
          new APIError(ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR_CODE, err.response?.data.message)
        );
      }
    }

    if (response) {
      res.send({ status: true, data: response.data.data });
      logger.info(`Create note success with data ${JSON.stringify(response.data)}`);
    }
  } catch (error) {
    const err = error as AxiosError;
    logger.error(`Error while creating notes ${generateError(error)}`);
    return next(
      new APIError(ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR_CODE, err.response?.data.message)
    );
  }
};

export const createUsersController = async (req: Request, res: Response, next: NextFunction) => {
  const { users } = req.body;

  logger.info(`create Users api initiated with data ${JSON.stringify(users)}`);

  let authToken = await getRedisData(CONSTANT_KEYS.AUTH_TOKEN_REDIS_KEY);

  try {
    if (!authToken) {
      await updateAuthToken();
    }

    authToken = (await getRedisData(CONSTANT_KEYS.AUTH_TOKEN_REDIS_KEY)) as string;

    let requestBody: any = {};
    requestBody["users"] = users;

    let response;

    try {
      response = await axios(
        zohoDefaultConfig({
          authToken,
          data: requestBody,
          url: ZOHO_CREATE_USER_URL,
        })
      );
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status == 401) {
        await updateAuthToken();
        authToken = (await getRedisData(CONSTANT_KEYS.AUTH_TOKEN_REDIS_KEY)) as string;
        response = await axios(
          zohoDefaultConfig({
            authToken,
            data: requestBody,
            url: ZOHO_CREATE_USER_URL,
          })
        );
      } else {
        logger.error(`Error while create users  ${generateError(err.response?.data)}`);
        return next(
          new APIError(ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR_CODE, err.response?.data.message)
        );
      }
    }

    if (response) {
      res.send({ status: true, data: response.data.users });
      logger.info(`Create users success with data ${JSON.stringify(response.data)}`);
    }
  } catch (error) {
    const err = error as AxiosError;
    logger.error(`Error while create users ${generateError(error)}`);
    return next(
      new APIError(ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR_CODE, err.response?.data.message)
    );
  }
};
