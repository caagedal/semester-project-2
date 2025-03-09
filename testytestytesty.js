import { countDownTimer } from "../handlers/timer.js";

export async function listingCardTemplate(container, listing) {

    // coin svg
    const coinSVG = document.createElement("i");
    coinSVG.classList.add("fa-solid", "fa-coins", "text-custom-orange");

    // check if image exists
    const listingMedia = listing.media.length > 0 ? listing.media[0].url : "/src/media/hero.jpg";
    const listingID = listing.id;
    
    // fetch last bid
    let lastBidAmount = 0;
    if (listing.bids && listing.bids.length > 0) {
        const lastBid = listing.bids[listing.bids.length - 1];
        lastBidAmount = lastBid.amount;
    }

    
    // Elements


    // Link element
    const listingLink = document.createElement("a");
    listingLink.href = `/listing/?id=${listingID}`;


    // article cotnainer
    const listingCard = document.createElement("article");
    listingCard.classList.add("text-center","w-custom-295", "h-custom-395", "flex", "flex-col");

    
    // container wrapper
    const listingContainer = document.createElement("div");
    listingContainer.classList.add("flex", "flex-col", "h-full");

    
    // countdown element
    const countDownContainer = document.createElement("div");
    countDownContainer.classList.add("timer", "text-custom-orange", "text-xl", "py-2");
    
    const countDownElement = document.createElement("p");
    countDownElement.textContent = "Loading..";
    countDownTimer(listing.endsAt, countDownElement);
    countDownContainer.appendChild(countDownElement);

    
    // card container
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("shadow-xl", "rounded-5xl", "flex", "flex-1", "flex-col", "listing-card");

    
    // image container
    const imageContainer = document.createElement("a");
    imageContainer.classList.add("flex-grow");
    imageContainer.href = `/listing/?id=${listingID}`;

    const listingImage = document.createElement("img");
    listingImage.classList.add("rounded-t-5xl", "w-full", "object-cover", "h-custom-215");
    listingImage.src = listingMedia;
    listingImage.alt = listing.title;

    imageContainer.appendChild(listingImage);

    
    // Bodycontainer (title, bids, button)
    const textContainer = document.createElement("div");
    textContainer.classList.add("rounded-b-5xl", "z-10", "listing-info", "bg-custom-green", "text-white", "px-3", "py-4", "flex", "flex-col", "gap-3");

    
    // Title
    const listingTitle = document.createElement("h2");
    listingTitle.classList.add("text-xl", "truncate");
    listingTitle.textContent = listing.title;

    
    // Bid information
    const bidInfo = document.createElement("div");
    bidInfo.classList.add("bid-info", "flex", "items-center", "justify-evenly");

    const topBid = document.createElement("p");
    topBid.textContent = `Top bid: ${lastBidAmount}`;
    topBid.appendChild(coinSVG); // Legger til SVG etter teksten

    const totalBids = document.createElement("p");
    totalBids.textContent = `Total bids: ${listing._count?.bids || 0}`;
    
    bidInfo.append(topBid, totalBids);

    
    // View knapp
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("text-sm", "flex", "justify-center", "items-center");

    const viewButton = document.createElement("a");
    viewButton.href = `/listing/?id=${listingID}`;
    viewButton.classList.add("bg-custom-orange", "py-2", "px-3", "rounded-full");
    viewButton.textContent = "VIEW LISTING";
    viewButton.dataset.id = listingID;
    viewButton.setAttribute("aria-label", `View listing for ${listing.title}`); // Legger til aria-label for bedre tilgjengelighet

    buttonDiv.appendChild(viewButton);

    
    // append elements
    textContainer.append(listingTitle, bidInfo, buttonDiv);
    cardContainer.append(imageContainer, textContainer);
    listingContainer.append(countDownContainer, cardContainer);
    listingCard.appendChild(listingContainer);

    // add to parent container in HTML
    container.appendChild(listingCard);
}


