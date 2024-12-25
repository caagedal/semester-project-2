import { login } from "../api/auth/login.js";

export async function loginFormListener(){

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e)=> {
        e.preventDefault();
        const formData = new FormData(form);

        const profile = {
            email: formData.get("email"),
            password: formData.get("password")
        };
        try{
            await login(profile);
        }catch (error){
            console.error("Error logging in:", error);
        }
    });
}

