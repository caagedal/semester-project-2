import { onlineStatus } from "../storage/onlineStatus.js";
import { onlineNav, offlineNav } from "../template/navbar.js";

const nav = document.getElementById("navInput");

export function updateNav(){
    if(!onlineStatus()){
        nav.innerHTML = "";
        offlineNav(nav);        
    }else{
        nav.innerHTML = "";
        onlineNav(nav);
    }
};

updateNav();