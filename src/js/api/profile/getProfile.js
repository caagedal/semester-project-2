import { API_BASE, API_AUCTION, API_KEY } from "../constants.js";
import { load } from "../../storage.js";

const action = "/profiles";
const profileURL= API_BASE+API_AUCTION+action;

export async function getProfile(name){
    const response = await fetch(profileURL + "/" + name, {
        headers: {
            Authorization: `Bearer ${load("token")}`,
            "X-Noroff-API-Key": API_KEY,
        },
    });
    return await response.json();
}

