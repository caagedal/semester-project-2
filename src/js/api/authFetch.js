import { load } from "../storage/index.js";
import { API_KEY } from "./constants.js";

/**
 * A function that loads the auth token and API-key from your local storage and returns it
 * @returns 
 */

export function headers(){
    const token = load("token");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
    };
}

/**
 * Function that uses the auth token/API-key to fetch data from the API. 
 * @param {string} url - API url
 * @param {object} options - data
 * @returns 
 */

export async function authFetch(url, options = {}){
    return await fetch(url, {
        ...options,
        headers: {
            ...headers(),
            ...options.headers,
        },
    });
}