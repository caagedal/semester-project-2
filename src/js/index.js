import { loginFormListener } from "./handlers/login.js";
import { loginModal } from "./template/loginModal.js";
import { updateNav } from "./handlers/navbarHandle.js";
import { listingSpecific } from "./template/listingSpecific.js";

loginFormListener();
loginModal();
updateNav();
listingSpecific();