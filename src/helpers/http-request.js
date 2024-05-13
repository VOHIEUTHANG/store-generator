import axios from "axios";
import { REQUEST_TIME_OUT } from "global/constant.global";

class HttpRequest {
  constructor(baseURL, headers) {
    this.baseURl = baseURL;
    this.headers = headers;
  }

  getRequest() {
    const instance = axios.create({
      baseURL: this.baseURl,
      timeout: REQUEST_TIME_OUT,
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
    });

    instance.interceptors.response.use(
      async (response) => {
        const { data } = response;
        return Promise.resolve(data);
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return instance;
  }
}

const PromptFormatRequest = new HttpRequest("https://promptformatapi.red-gate.com/api", {
  authority: "promptformatapi.red-gate.com",
}).getRequest();

const ApiRequest = new HttpRequest("https://promptformatapi.red-gate.com/api").getRequest();

export { PromptFormatRequest, ApiRequest };
