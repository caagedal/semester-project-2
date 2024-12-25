import { load } from "../storage/index.js";

// logged in

export async function onlineNav(container){

    const profile = load("profile");
    const profileName = profile.name;


    const logoutBtn = document.createElement("button");
    logoutBtn.classList.add("text-lg");
    logoutBtn.id = "logoutButton";
    logoutBtn.textContent = `Logout <i class="text-red-500 fa-solid fa-right-from-bracket"></i>`;

    const profileInfo = document.createElement("a");
    profileInfo.href = "/profile";
    profileInfo.classList.add("flex", "items-center", "justify-between", "gap-1");

    const profileImage = document.createElement("img");
    profileImage.classList.add("nav-img", "rounded-full");
    profileImage.src = profile.avatar.url || "/src/media/hero.jpg";
    profileImage.alt = profileName;

    const creditsInfo = document.createElement("div");
    
    const userName = document.createElement("p");
    userName.classList.add("font-marcellus", "text-lg");
    userName.textContent = profileName;

    const creditsAvailable = document.createElement("p");
    creditsAvailable.innerHTML = `${profile.credits} <i class="fa-solid fa-coins text-custom-orange"></i>`;

    creditsInfo.append(userName, creditsAvailable);
    profileInfo.append(profileImage, creditsInfo);

    container.append(logoutBtn, profileInfo);

}


// logged out

export async function offlineNav(container){

    const loginBtn = document.createElement("button");
    loginBtn.classList.add("border-2", "border-white", "hover:border-custom-orange", "text-white", "py-2", "px-4", "rounded-full");
    loginBtn.id = "loginButton";
    loginBtn.textContent = "Login";
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const modal = document.getElementById("loginModal");
        if(modal){
            modal.classList.remove("hidden");
            modal.classList.add("block");
        }
    });

    const regBtn = document.createElement("button");
    regBtn.classList.add("border-2", "border-custom-orange", "bg-custom-orange", "hover:border-white", "text-white", "py-2", "px-4", "rounded-full");
    regBtn.id = "registerBtn";
    regBtn.textContent = "Register";

    container.append(loginBtn, regBtn);

}