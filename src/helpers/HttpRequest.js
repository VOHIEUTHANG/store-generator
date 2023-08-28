import axios from "axios";

const HttpRequest = () => {
    const instance = axios.create({
        baseURL: "https://promptformatapi.red-gate.com/api",
        timeout: 8 * 1000,
        headers: {
            authority: "promptformatapi.red-gate.com",
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
};

export default HttpRequest();
