


export async function loginModal() {
    
    const container = document.getElementById("loginModal");
    container.innerHTML = "";

    // Background
    const modalBackground = document.createElement("div");
    modalBackground.classList.add("fixed", "inset-0", "bg-gray-500", "bg-opacity-75");

    // Modal containers
    const loginModalContainer = document.createElement("div");
    loginModalContainer.classList.add("fixed", "inset-0", "z-10", "w-screen", "overflow-y-auto");

    const loginModalContainerMid = document.createElement("div");
    loginModalContainerMid.classList.add("flex", "min-h-full", "items-end", "justify-center", "p-4", "text-center", "sm:items-center", "sm:p-0");

    const loginModalContainerInner = document.createElement("div");
    loginModalContainerInner.classList.add("relative", "transform", "overflow-hidden", "rounded-5xl", "bg-white", "shadow-xl", "sm:my-8", "sm:w-full", "sm:max-w-lg");

    // Modal content container
    const modalContentContainer = document.createElement("div");
    modalContentContainer.classList.add("flex", "min-h-full", "flex-col", "justify-center", "px-6", "py-12", "lg:px-8");

    // Call login form template
    loginFormTemplate(modalContentContainer);

    // Append content to modal
    loginModalContainerInner.append(modalContentContainer);
    loginModalContainerMid.append(loginModalContainerInner);
    loginModalContainer.append(loginModalContainerMid);

    // Append modal background and container to the main container
    container.append(modalBackground, loginModalContainer);
}

export async function loginFormTemplate(container) {
    // Title container
    const titleElement = document.createElement("div");
    titleElement.classList.add("sm:mx-auto", "sm:w-full", "sm:max-w-sm");

    // BidPoint "logo"
    const title = document.createElement("h1");
    title.classList.add("text-center", "text-custom-green", "text-4xl", "font-marcellus");
    title.textContent = "BidPoint";

    // Description
    const description = document.createElement("h2");
    description.classList.add("mt-10", "text-center", "text-xl", "font-bold", "leading-9", "tracking-tight", "text-custom-green");
    description.textContent = "Sign in to your account.";

    titleElement.append(title, description);

    // Form div
    const loginFormElement = document.createElement("div");
    loginFormElement.classList.add("mt-10", "sm:mx-auto", "sm-w-full", "sm:max-w-sm");

    const loginForm = document.createElement("form");
    loginForm.classList.add("space-y-6");
    loginForm.id = "loginForm";

    // Email
    const mailContainer = document.createElement("div");

    const loginLabel = document.createElement("label");
    loginLabel.htmlFor = "loginMail"; // Bruk htmlFor i stedet for for
    loginLabel.classList.add("block", "text-sm", "font-medium", "leading-6", "text-custom-green");
    loginLabel.textContent = "Email address";

    const emailContainer = document.createElement("div");
    emailContainer.classList.add("mt-2");

    const mailInputField = document.createElement("input");
    mailInputField.classList.add("block", "w-full", "rounded-md", "border-0", "py-1.5", "text-gray-900", "shadow-sm", "ring-1", "ring-inset", "ring-gray-300", "placeholder:text-gray-400", "focus:ring-2", "focus:ring-inset", "focus:ring-custom-green", "sm:text-sm", "sm:leading-6");
    mailInputField.type = "email";
    mailInputField.name = "email";
    mailInputField.id = "loginMail";
    mailInputField.autocomplete = "email";
    mailInputField.required = true; // Bruk kun "required"
    mailInputField.pattern = "^[\\w\\-.]+@stud.noroff.no$";
    mailInputField.title = "Only emails ending with stud.noroff.no can log in.";

    emailContainer.append(mailInputField);
    mailContainer.append(loginLabel, emailContainer);

    // Password
    const passwordContainer = document.createElement("div");

    const passwordLabelContainer = document.createElement("div");
    passwordLabelContainer.classList.add("flex", "items-center", "justify-between");

    const passwordLabel = document.createElement("label");
    passwordLabel.htmlFor = "loginPassword";
    passwordLabel.classList.add("block", "text-sm", "font-medium", "leading-6", "text-custom-green");
    passwordLabel.textContent = "Password";

    const passwordInputContainer = document.createElement("div");
    passwordInputContainer.classList.add("mt-2");

    const passwordInput = document.createElement("input");
    passwordInput.classList.add("block", "w-full", "rounded-md", "border-0", "py-1.5", "text-gray-900", "shadow-sm", "ring-1", "ring-inset", "ring-gray-300", "placeholder:text-gray-400", "focus:ring-2", "focus:ring-inset", "focus:ring-custom-green", "sm:text-sm", "sm:leading-6");
    passwordInput.type = "password";
    passwordInput.name = "password";
    passwordInput.id = "loginPassword";
    passwordInput.autocomplete = "current-password";
    passwordInput.required = true; // Bruk kun "required"
    passwordInput.minLength = "8";
    passwordInput.title = "Password must be 8 characters or longer.";

    passwordLabelContainer.append(passwordLabel);
    passwordInputContainer.append(passwordInput);
    passwordContainer.append(passwordLabelContainer, passwordInputContainer);

    // Submit button
    const submitContainer = document.createElement("div");

    const submitBtn = document.createElement("button");
    submitBtn.classList.add("flex", "w-full", "justify-center", "rounded-md", "bg-custom-green", "px-3", "py-1.5", "text-sm", "font-semibold", "text-white", "shadow-sm", "hover:bg-custom-light-green", "focus-visible:outline", "focus-visible:outline-2", "focus-visible:outline-offset-2", "focus-visible:outline-custom-light-green");
    submitBtn.id = "loginSubmit";
    submitBtn.type = "submit";
    submitBtn.textContent = "Log in"; // Legger til tekst på knappen

    submitContainer.append(submitBtn);

    // Append all elements to form
    loginForm.append(mailContainer, passwordContainer, submitContainer);
    loginFormElement.append(loginForm);

    // Append title and form to container
    container.append(titleElement, loginFormElement);
}


