import { API_BASE } from "../constants.js";
import * as storage from "../../storage/index.js";

const action = "/auth/login";
const method = "post"

/**
 * Logs in the user by sending a profile object to the API, retrieves the access token
 * and stores it locally. Reloads the window upon successful login.
 *
 * @async
 * @function login
 * @param {Object} profile - The user's profile data that includes credentials for login.
 * @throws {Error} If login fails due to network issues or invalid credentials.
 * @returns {Promise<Object>} The profile data of the logged-in user, minus the access token.
 */

export async function login(profile){
    try{
        const loginURL = API_BASE + action;
        const body = JSON.stringify(profile);

        const response = await fetch(loginURL, {
            headers: {
                "Content-Type": "application/json",
            },
            method,
            body,
        });

        if (response.ok){
            const {accessToken, ...profile} = (await response.json()).data;
            storage.save("token", accessToken);
            storage.save("profile", profile);

            window.location.reload();

            return profile;
        }

        const status = document.querySelector(".login-state");
        const error = await response.json();
        status.classList.add("color-red");
        status.textcontent = error.error[0].message;
        throw new Error("Login failed");
    }catch(error){
        console.error(error);
    }
};

