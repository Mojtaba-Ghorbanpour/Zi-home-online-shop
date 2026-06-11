import { generateHttpClient } from "./client";
import { urls } from "./urls";

export async function loginCheck(body: ILoginBody) {
  const response = await generateHttpClient().post(urls.auth.login, body);
  return response;
}

export async function signupAccount(body: ISignupBody) {
  const response = await generateHttpClient().post(urls.auth.signup, body);
  return response;
}

export async function logoutAccount() {
  const response = await generateHttpClient().get(urls.auth.logout);
  return response;
}

export async function accessToken(body: string) {
  const response = await generateHttpClient().post(urls.auth.token, body);
  return response;
}
