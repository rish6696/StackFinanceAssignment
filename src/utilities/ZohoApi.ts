import {
  ZOHO_CLIENT_ID,
  ZOHO_CLIENT_SECRET,
  ZOHO_REFRESH_TOKEN,
  ZOHO_REFRESH_TOKEN_URL,
} from "../config";
import { AxiosRequestConfig} from "axios";
import qs from "qs";


export const zohoRefreshTokenConfig = (): AxiosRequestConfig => {
  const data = qs.stringify({
    refresh_token: ZOHO_REFRESH_TOKEN,
    client_id: ZOHO_CLIENT_ID,
    client_secret: ZOHO_CLIENT_SECRET,
    grant_type: "refresh_token",
  });

  const config: AxiosRequestConfig = {
    method: "post",
    url: ZOHO_REFRESH_TOKEN_URL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie:
        "b266a5bf57=57c7a14afabcac9a0b9dfc64b3542b70; iamcsr=fea6d558-40ee-4371-87d2-c1b2506e65f3; _zcsr_tmp=fea6d558-40ee-4371-87d2-c1b2506e65f3",
    },
    data: data,
  };

  return config;
};

export const zohoDefaultConfig = ({
  url,
  data,
  authToken,
}: {
  url: string;
  data: any;
  authToken: string;
}): AxiosRequestConfig => {
  const dataString = JSON.stringify(data);

  return {
    method: "post",
    url: url,
    headers: {
      Authorization: `Zoho-oauthtoken ${authToken}`,
      "Content-Type": "application/json",
    },
    data: dataString,
  };
};
