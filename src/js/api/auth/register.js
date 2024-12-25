import { API_BASE, API_REGISTER } from "../constants";

/**
 * Registers a new user by sending the user's credentials (username, email, password) to the API.
 * If the registration fails, an error is thrown with the server's response message.
 *
 * @async
 * @function register
 * @param {string} username - The username chosen by the user for registration.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password chosen by the user.
 * @throws {Error} If the registration fails, the function throws an error with the relevant message.
 * @returns {Promise<Object>} The response data from the API if registration is successful.
 */

export async function register(username, email, password) {
    const response = await fetch(API_BASE + API_REGISTER, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
    }

    return response.json();
};




