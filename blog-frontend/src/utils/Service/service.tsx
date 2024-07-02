import AlertMessage from "common/Alert";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_URL } from "utils/apiUri";
import { getCookie } from "utils/common";
let apiCallCounter: number = 0;

const incApiCallCounter = (): void => {
    apiCallCounter++;
};

const decApiCallCounter = (): void => {
    apiCallCounter = apiCallCounter > 0 ? apiCallCounter - 1 : 0;
};

const Methods = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
};
interface Message {
    id: number;
    text: string;
}

interface MakeAPICallParams {
    methodName: string;
    apiUrl: string;
    body?: any;
    params?: any;
    query?: any;
    options?: AxiosRequestConfig;
    showAlert?: boolean;
}



axios.interceptors.request.use(
    // TODO - replace any with proper type
    (config: any) => {
        const accessToken: string | null = getCookie("token");
        // console.log("acc : ",accessToken)
        if (accessToken) {
            config.headers = {
                authorization: "Bearer " + accessToken,
                
            };
        } else {
            config.headers = {
            };
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

axios.interceptors.response.use(
    // TODO - replace any with proper type
    (response: any) => {
        if (response.data.code === 401) {
            localStorage.clear();
        } else {
            return response;
        }
    },
    async function (error) {
        const originalRequest = error.config;
        let refreshToken: string | null =
            localStorage.getItem("refreshToken");
        if (
            refreshToken &&
            error?.response?.status === 401 &&
            !originalRequest._retry
        ) {
            if (originalRequest.url?.includes("/refreshToken")) {
                return Promise.reject(error);
            }
            originalRequest._retry = true;
            try {
                const url: string = `${API_URL.base}${refreshToken}`;
                const response = await axios.post(url, {
                    refreshToken: refreshToken,
                });
                if (response.status === 200 && response.data.authToken) {
                    localStorage.setItem(
                        "authorization",
                        response.data.responseData.access_token
                    );
                    localStorage.setItem(
                        "refreshToken",
                        response.data.authToken.refreshToken
                    );
                    console.log("Access token refreshed!");
                    const res = await axios(originalRequest);
                    return res;
                } else {
                    console.log("Refresh Token Error", error);
                    return Promise.reject(response);
                }
            } catch (e) {
                return Promise.reject(e);
            }
        } else {
            return Promise.reject(error);
        }
    }
);

const makeHttpRequest = async (
    method: "get" | "post" | "put" | "delete",
    url: string,
    body: any = null,
    options: AxiosRequestConfig = {},
    showAlert: boolean = false,
): Promise<AxiosResponse> => {
    try {
        console.log('OPTSSSSSSSSSSS', options)
        const response = await axios({ method, url, data: body, ...options });
        if (showAlert) {
            console.log("show aleter", showAlert)
            // Assuming success alerts are not needed for GET requests
            AlertMessage("success", response.data.message);
        }
        return response;
    } catch (error: any) {
        if (showAlert) {
            AlertMessage("error", error.message);
        }
        throw error.response;
    }
};
const makeAPICall = async ({
    methodName,
    apiUrl,
    body,
    params,
    query,
    options,
    showAlert = false,
}: MakeAPICallParams): Promise<AxiosResponse | undefined> => {
    apiUrl = API_URL.base + apiUrl;

    if (params) {
        apiUrl = `${apiUrl}/${params}`;
    }
    if (query) {
        const queryString = new URLSearchParams(query).toString();
        if (queryString) {
            apiUrl = `${apiUrl}?${queryString}`;
        }
    }

    switch (methodName) {
        case Methods.GET:
            return makeHttpRequest("get", apiUrl, null, options,showAlert);
        case Methods.POST:
            console.log('OPT INSIE SERVICE', options)
            return makeHttpRequest("post", apiUrl, body, options,showAlert);
        case Methods.PUT:
            console.log('OPT INSIE SERVICE', options)
            return makeHttpRequest("put", apiUrl, body, options,showAlert);
        case Methods.DELETE:
            // For DELETE, axios expects the body to be in the config object
            return makeHttpRequest("delete", apiUrl, body, {
                ...options,
                data: body,
                
            }, showAlert);
        default:
            return Promise.reject(new Error("Invalid methodName"));
    }
};

export const service = {
    Methods,
    API_URL,
    apiCallCounter,
    increApiCallCounter: incApiCallCounter,
    decreApiCallCounter: decApiCallCounter,
    makeAPICall,
};
