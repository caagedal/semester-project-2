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






// /**
//  * Registers a new user by sending the user's profile data to the API.
//  * If successful, it displays a success message and returns the response data.
//  * If registration fails, it displays an error message and throws an error.
//  *
//  * @async
//  * @function register
//  * @param {Object} profile - The user's registration data.
//  * @param {string} profile.username - The username chosen by the user.
//  * @param {string} profile.email - The email address of the user.
//  * @param {string} profile.password - The password chosen by the user.
//  * @throws {Error} If registration fails, either due to invalid input or network issues.
//  * @returns {Promise<Object>} The response data from the API if registration is successful.
//  */

// export async function register(profile) {
//     try {
//         const body = JSON.stringify(profile);
//         const response = await fetch(registerURL, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             method,
//             body,
//         });

//         const result = await response.json();
//         const responseMessage = document.querySelector(".response-msg");

//         if (!response.ok) {
//             const errorMessage = result.errors ? result.errors[0].message : "Unknown error occurred";
//             responseMessage.classList.add("color-red");
//             responseMessage.textContent = errorMessage;
//             throw new Error("Register failed: " + errorMessage);
//         }

//         responseMessage.classList.add("color-green");
//         responseMessage.textContent = "Register successful. Please log in!";

//         return result;
//     } catch (error) {
//         const responseMessage = document.querySelector(".response-msg");
//         responseMessage.classList.add("color-red");
//         responseMessage.textContent = "Something went wrong. Please try again.";
//         console.error(error);
//     }
// }

