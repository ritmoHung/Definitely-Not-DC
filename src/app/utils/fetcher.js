import axios from "axios";

export const axiosFetcher = async (url, { baseUrl = "", params = {}, method = "GET", data = null } = {}) => {
    const queryString = Object.keys(params).length ? `?${new URLSearchParams(params).toString()}` : "";
    const finalUrl = baseUrl + url + queryString;

    const options = {
        method,
        url: finalUrl,
        headers: {
            "Content-Type": "application/json",
        },
        data,
    };

    try {
        const response = await axios(options);
        return { ...response.data, status: response.status }
    } catch (error) {
        if (error.response) {
            throw { 
                message: error.response.data.message || "An error occurred.",
                level: error.response.data.level || "error",
                status: error.response.status,
            };
        } else if (error.request) {
            // The request was made but no response was received
            throw {
                message: "No response from server.",
                level: "error",
                status: null,
            };
        } else {
            throw {
                message: error.message,
                level: "error",
                status: null,
            };
        }
    }
}