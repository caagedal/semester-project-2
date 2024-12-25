

export async function errorMeassage(container){
    const errorContainer = document.querySelector(".error");
    errorContainer.innerHTML = "";
    errorContainer.classlist.add("");
    errorContainer.textContent = "Ooops, an error occured!";
}

