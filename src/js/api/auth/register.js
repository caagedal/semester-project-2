






// import { baseURL } from "../data/constants.js";

// const action = "/auth/register";
// const method = "POST";
// const registerURL = baseURL + action;

// export async function register(profile) {
//     try{
//         const body = JSON.stringify(profile);
//         const response = await fetch(registerURL, {
//             headers: {
//                 "Content-Type": "Application/json",
//             },
//             method,
//             body,
//         });

//         const result = await response.json();
//         console.log(result);
//         if (!response.ok) {
//             throw new Error("Failed to register" + resul.message);
//         }
//         return result;
//     } catch(error) {
//         console.error(error);
//     }
// };

// function formListenerReg(){

//     const form = document.querySelector(".loginform");

//     form.addEventListener("submit", async (event) => {
//         event.preventDefault();
//         const formData = new FormData(form);

//         const profile = {
//             name: formData.get("username"),
//             email: formData.get("email"),
//             password: formData.get("password"),
//         };

//         try{
//             await register(profile);
//             console.log("User registered");
//         }catch(error){
//             console.error("Error registering", error);
//         }
//     });
// };

// formListenerReg();



