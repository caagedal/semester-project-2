import { API_BASE } from "../constants.js";
import * as storage from "../../storage/index.js";

const action = "/auth/login";
const method = "post"























// export function save(key, value) {
//     localStorage.setItem(key, JSON.stringify(value));
// }

// export function load(key) {
//     try{
//         const value = localStorage.getItem(key);
//         return JSON.parse(value);
//     }catch(error){
//         return null;
//     }
// }

// export function remove(key) {
//     localStorage.removeItem(key);
// }



// const action = "/auth/login";
// const method = "post";

// async function login(profile){
//     try {
//         const loginURL = baseURL + action;
//         const body = JSON.stringify(profile);
//         const response = await fetch(loginURL, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             method,
//             body,
//         });
//         if (responde.ok){
//             const {accesstoken, ...profile} = (await response.json()).data;
//             Storage.save("token", accesstoken);
//             Storage.save("profile", profile);

//             return profile;
//         }
//         throw new Error("Failed to login" + response.message);
//     } catch (error){
//         console.error(error);
//     }
// };

