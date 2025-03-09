import { fetchListing } from "../api/listings/display.js";
import { countDownTimer, formatDate, UpdatedDate } from "../handlers/timer.js";
import { load } from "../storage/index.js";
import { deleteListing } from "../api/listings/delete.js";
import { onlineStatus } from "../storage/onlineStatus.js";


export async function listingSpecific() {
    
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    const response = await fetchListing(id);
    const listing = response.data;

    let lastBidAmount = 0;
    if(listing.bids && listing.bids.length > 0){
        const lastBid = listing.bids[listing.bids.length - 1];
        lastBidAmount = lastBid.amount;
    }

    const profile = load("profile");
    const profileName = profile.name;
    const listingCreator = listing.seller.name;

    // listing image
    const listingMedia = listing.media.length > 0 ? listing.media[0].url : "/src/media/hero.jpg";


    // Everything goes into this
    const container = document.querySelector(".single-listing");
    container.innerHTML = "";


    // Main container
    const listingContainer = document.createElement("div");
    listingContainer.classList.add("rounded-5xl", "bg-white", "text-left", "shadow-xl", "sm:my-8", "sm:w-full", "sm:max-w-3xl", "px-12", "py-4");

    
    // timer
    const countDownElement = document.createElement("p");
    countDownElement.classList.add("text-center", "text-3xl", "text-custom-orange", "pb-2");
    countDownElement.textContent = "loading..";
    countDownTimer(listing.endsAt, countDownElement);

    listingContainer.appendChild(countDownElement);

    
    // listing container
    const contentContainer = document.createElement("div");


    // image
    const listingImage = document.createElement("img");
    listingImage.classList.add("rounded-5xl", "max-h-500");
    listingImage.src = listingMedia;
    listingImage.alt = listing.title;



    // title and description and user buttons
    const titleDescription = document.createElement("div");
    titleDescription.classList.add("flex", "flex-col", "py-5");

    // title and user buttons
    const topText = document.createElement("div");
    topText.classList.add("flex", "justify-between");
    
    // title
    const title = document.createElement("h1");
    title.classList.add("text-wrap", "text-4xl", "text-custom-green", "truncate",  "font-marcellus", "font-bold", "pb-1");
    title.textContent = listing.title;    

    // update and delete button
    const updateDelete = document.createElement("div");
    updateDelete.classList.add("flex", "gap-4", "text-xl");

    // update Icon
    const updateIcon = document.createElement("i");
    updateIcon.classList.add("fa-regular", "fa-pen-to-square", "text-custom-green");

    //  Delete Icon
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash", "text-red-600");

    // updateButton
    const updateButton = document.createElement("button");
    updateButton.classList.add("update-btn");
    updateButton.textContent = updateIcon;

    updateButton.addEventListener("click", ()=> {
        editListing(listing);
    });

    // deleteButton
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = deleteIcon;

    deleteButton.addEventListener("click", async() => {
        const response = await deleteListing(listingID);
        if (response){
            window.location.href = "/index.html";
        }
    });

    updateDelete.append(updateButton, deleteButton);

    if(profileName === listingCreator) {
        topText.appendChild(updateDelete);
    };
    
        
    // listing creator
    const listingUser = document.createElement("a");
    listingUser.href = `/profile/?name=${listingCreator}`;
    listingUser.classList.add("text-custom-orange", "text-sm", "pb-1");
    listingUser.textContent = listingCreator;

    // Description
    const listingDescription = document.createElement("h2");
    listingDescription.classList.add("text-xl", "text-custom-green");
    if(listing.description === ""){
        listing.description = "No description added.";
    }
    listingDescription.textContent = listing.description;

    // append
    topText.append(title);
    titleDescription.append(topText, listingUser, listingDescription);


    // Dates and ID
    const datesID = document.createElement("div");
    datesID.classList.add("flex", "justify-between", "py-3");

    // created
    const createdElement = document.createElement("div");
    createdElement.classList.add("text-md");

    const created = document.createElement("p");
    created.classList.add("font-marcellus", "font-bold");
    created.textContent = "Created";

    const createdDate = document.createElement("p");
    createdDate.textContent = formatDate(listing.created);

    // const updateText = document.createElement("p");
    // updateText.classList.add("font-marcellus", "font-bold");
    // updateText.textContent = "Updated";
    
    // const updatedDateElement = document.createElement("p");
    // updatedDateElement.classList.add("")
    // UpdatedDate.textContent = formatDate(listing.updated);

    createdElement.append(created, createdDate);

    // listingID
    const listingID = document.createElement("p");
    listingID.classList.add("flex", "items-end", "text-sm");
    listingID.textContent = "ID " + listing.id;

    // append
    // endAndIDContainer.append(listingID);

    datesID.append(createdElement, listingID)

   
    // bidding etc
    const biddingContainer = document.createElement("div");
    biddingContainer.classList.add("flex", "flex-col", "gap-4", "font-marcellus", "py-4");

    const currentBidContainer = document.createElement("div");
    currentBidContainer.classList.add("text-center");

    // current bid
    const currentBid = document.createElement("p");
    currentBid.classList.add("text-4xl", "text-custom-green", "font-marcellus");
    currentBid.textContent = "Current bid";

    const currentBidAmount = document.createElement("div");
    currentBidAmount.classList.add("flex", "justify-center", "gap-1", "text-4xl");

    const coinSVG = document.createElement("i");
    coinSVG.classList.add("fa-solid", "fa-coins", "text-custom-orange");

    const currentBidAmountNum = document.createElement("p");
    currentBidAmountNum.classList.add("text-custom-green");
    currentBidAmount.textContent = lastBidAmount;
    

    // append
    currentBidAmount.append(coinSVG, currentBidAmountNum);
    currentBidContainer.append(currentBid, currentBidAmount);
    biddingContainer.append(currentBidContainer);

    // bidButton    
    if(!onlineStatus()){

        const offlineMessage = document.createElement("div");
        offlineMessage.classList.add("flex", "flex-col", "text-center", "text-lg", "font-bold", "justify-center");

        const loginMessage = document.createElement("p");
        loginMessage.textContent = "You must be a member to place a bid.";

        const loginReg = document.createElement("a");
        loginReg.href = "#";
        loginReg.id = "openModal";
        loginReg.classList.add("text-custom-orange");
        loginReg.textContent = "Login or register here";

        loginReg.addEventListener("click", (e)=> {
            e.preventDefault();
            const modal = document.getElementById("loginModal");
            if(modal){
                modal.classList.remove("hidden");
                modal.classList.add("block");
            }
        })

        offlineMessage.append(loginMessage, loginReg)
        biddingContainer.append(offlineMessage);

    }else if(profileName === listingCreator) {
        
        const listingOwner = document.createElement("p");
        listingOwner.classList.add("text-center", "text-lg", "font-bold");
        listingOwner.textContent = "You can't bid on your own listing.";

        biddingContainer.append(listingOwner);
    }else {

        const bidButtonSection = document.createElement("div");
        bidButtonSection.classList.add("flex", "flex-col", "text-center");

        const formContainer = document.createElement("div");
        formContainer.classList.add("flex", "justify-center", "gap-2");

        const bidForm = document.createElement("form");
        bidForm.id = "bidForm";

        const bidInput = document.createElement("input");
        bidInput.classList.add("border-2", "border-custom-green", "rounded-xl", "p-2");
        bidInput.type = "number";
        bidInput.name = "bidAmount";
        bidInput.id = "bidAmount";
        bidInput.required = "true";
        bidInput.placeholder = "Enter bid amount";
        bidInput.title = "Amount must be bigger than the current bid.";
        bidInput.min = lastBidAmount + 1;

        bidForm.appendChild(bidInput);

        const confirmButton = document.createElement("button");
        confirmButton.classList.add("bg-custom-green", "rounded-xl", "py-2", "px-4", "text-xl", "text-white");
        confirmButton.type = "submit";
        confirmButton.id = "bidConfirm";
        confirmButton.textContent = "Bid!";

        formContainer.append(bidForm, confirmButton);

        const userCredits = document.createElement("p");
        userCredits.textContent = "Credits available: " + profile.credits + coinSVG;

        bidButtonSection.append(formContainer, userCredits);

        biddingContainer.append(bidButtonSection);

    }



    

    contentContainer.append(listingImage, titleDescription, datesID, biddingContainer);
    listingContainer.append(contentContainer);
    container.append(listingContainer);
}

// listingSpecific();