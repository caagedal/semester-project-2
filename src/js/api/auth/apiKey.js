import { load } from "../../storage/index.js";
import { API_KEY_URL } from "../constants.js";

/**
 * Function to create API key with name value
 * @returns an API key 
 * @throws error in console if failing to get the key
 */

export async function getAPIKey(){
    const response = await fetch(API_KEY_URL, {
        heders: {
            "Content-type": "application/json",
            Authorization: `Bearer ${load("token")}`,
        },
        method: "POST",
        body: JSON.stringify({
            name: "test key",
        }),
    });
    if (response.ok){
        return await response.json();
    }
    console.error(await response.json());
    throw new Error("Failed to fetch API Key");
}

