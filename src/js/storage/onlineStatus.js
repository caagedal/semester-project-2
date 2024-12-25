import { load } from "./index.js";

/**
 * Checks if the user is online by verifying the presence of an access token in storage.
 * 
 * This function uses the `load` function to check if an access token exists in local storage.
 * If the token exists, the user is considered online (logged in).
 * 
 * @function onlineStatus
 * @returns {boolean} Returns `true` if the access token exists, otherwise `false`.
 */
export function onlineStatus(){
    return load("accessToken") !== null;
}


/**
 * Logs the user out by clearing all data from local storage and redirecting to the homepage.
 * 
 * This function clears all stored data in local storage using `localStorage.clear()`,
 * and then redirects the user to the homepage by setting `window.location.href` to "/".
 * 
 * @function logout
 */
export function logout(){
    localStorage.clear();

    window.location.href = "/";
}