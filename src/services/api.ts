/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL as string;

interface IResponse {
    ok: boolean;
    status: number;
    body: any;
}

interface IOptions {
    query?: Record<string, string>;
    headers?: { [key: string]: string };
    body?: { [key: string]: unknown };
}

interface IOptionsProps extends IOptions {
    url: string;
    method: string;
}

class Api {
    readonly baseUrl: string;

    constructor() {
        this.baseUrl = BASE_API_URL;
    }

    async request(options: IOptionsProps): Promise<IResponse> {
        const response = await this._request(options);
        // if (response.status === 401 && options.url !== "/auth/refreshToken") {
        //     const refreshResponse = await this.get("/auth/refreshToken");
        //     if (refreshResponse.ok) {
        //         response = await this._request(options);
        //     }
        // }
        return response;
    }

    async _request(options: IOptionsProps): Promise<IResponse> {
        let query = new URLSearchParams(options.query || {}).toString();
        if (query !== "") {
            query = "?" + query;
        }

        let response;
        try {
            response = await fetch(this.baseUrl + options.url + query, {
                method: options.method,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    ...options.headers,
                },
                // credentials: options.url === "/auth/signIn" ? "include" : "omit",
                // credentials: "include",
                body: options.body ? JSON.stringify(options.body) : null,
            });
        } catch (error) {
            response = {
                ok: false,
                status: 500,
                json: async () => {
                    return {
                        code: 500,
                        message: "The server is unresponsive",
                        description: (
                            error as { toString(): string }
                        ).toString(),
                    };
                },
            };
        }

        return {
            ok: response.ok,
            status: response.status,
            body: response.status !== 204 ? await response.json() : null,
        };
    }

    async get(url: string, query?: Record<string, string>, options?: IOptions) {
        return this.request({ method: "GET", url, query, ...options });
    }

    async post(url: string, body: Record<string, any>, options?: IOptions) {
        return this.request({ method: "POST", url, body, ...options });
    }

    async put(
        url: string,
        body: Record<string, any>,
        options?: { [key: string]: string }
    ) {
        return this.request({ method: "PUT", url, body, ...options });
    }

    async delete(url: string, options?: IOptions) {
        return this.request({ method: "DELETE", url, ...options });
    }
}
const api = new Api();
export { api };
