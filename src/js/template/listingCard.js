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


    // article container
    const listingCard = document.createElement("article");
    listingCard.classList.add("w-card-width", "text-custom-green");


    // timer
    const countDownElement = document.createElement("p");
    countDownElement.textContent = "Loading..";
    countDownElement.classList.add("text-center", "font-semibold", "text-xl", "text-custom-orange");
    countDownTimer(listing.endsAt, countDownElement);
    

    
    // card container
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("shadow-xl", "h-card-height", "bg-white", "rounded-4xl");

    // container wrapper
    const innerContainer = document.createElement("div");
    innerContainer.classList.add("p-2");

    const imgContainer = document.createElement("div");
    
    const listingImg = document.createElement("img");
    listingImg.classList.add("object-cover", "h-img-height", "rounded-t-3xl", "rounded-br-6xl", "w-full", "hover:");
    listingImg.src = listingMedia;
    listingImg.alt = listing.title;
    listingImg.onerror = () => {
        listingImg.src = "/src/media/hero.jpg";
        console.warn("Fallback image applied due to loading error (e.g., 403).");
    };

    imgContainer.append(listingImg);

    const infoContainers = document.createElement("div");
    infoContainers.classList.add("p-2", "flex", "flex-col", "gap-3");

    const listTitle = document.createElement("h2");
    listTitle.classList.add("text-xl", "font-medium", "truncate");
    listTitle.textContent = listing.title;

    const bidContainers = document.createElement("div");
    bidContainers.classList.add("font-medium");
    
    const CurentBid = document.createElement("p");
    CurentBid.classList.add("text-lg");
    CurentBid.textContent = `Current bid: $${lastBidAmount}`;

    const bidAmounts = document.createElement("p");
    bidAmounts.classList.add("text-sm");
    bidAmounts.textContent = `Total bids: ${listing._count?.bids || 0}`;

    bidContainers.append(CurentBid, bidAmounts);

    const viewListing = document.createElement("button");
    viewListing.classList.add("bg-custom-orange", "p-2", "rounded-full", "text-center", "text-white", "font-semibold");
    viewListing.textContent = "View Listing";
    
    infoContainers.append(listTitle, bidContainers, viewListing);

    innerContainer.append(imgContainer, infoContainers);
    cardContainer.append(innerContainer);
    listingCard.append(countDownElement, cardContainer);
    listingLink.append(listingCard);

    container.append(listingLink);

    // // image container
    // const imageContainer = document.createElement("a");
    // imageContainer.classList.add("flex-grow");
    // imageContainer.href = `/listing/?id=${listingID}`;

    // const listingImage = document.createElement("img");
    // listingImage.classList.add("rounded-t-5xl", "w-full", "object-cover", "h-custom-215");
    // listingImage.src = listingMedia;
    // listingImage.alt = listing.title;

    // imageContainer.appendChild(listingImage);

    
    // // Bodycontainer (title, bids, button)
    // const textContainer = document.createElement("div");
    // textContainer.classList.add("rounded-b-5xl", "z-10", "listing-info", "bg-custom-green", "text-white", "px-3", "py-4", "flex", "flex-col", "gap-3");

    
    // // Title
    // const listingTitle = document.createElement("h2");
    // listingTitle.classList.add("text-xl", "truncate");
    // listingTitle.textContent = listing.title;

    
    // // Bid information
    // const bidInfo = document.createElement("div");
    // bidInfo.classList.add("bid-info", "flex", "items-center", "justify-evenly");

    // const topBid = document.createElement("p");
    // topBid.textContent = `Top bid: ${lastBidAmount}`;
    // topBid.appendChild(coinSVG); // Legger til SVG etter teksten

    // const totalBids = document.createElement("p");
    // totalBids.textContent = `Total bids: ${listing._count?.bids || 0}`;
    
    // bidInfo.append(topBid, totalBids);

    
    // // View knapp
    // const buttonDiv = document.createElement("div");
    // buttonDiv.classList.add("text-sm", "flex", "justify-center", "items-center");

    // const viewButton = document.createElement("a");
    // viewButton.href = `/listing/?id=${listingID}`;
    // viewButton.classList.add("bg-custom-orange", "py-2", "px-3", "rounded-full");
    // viewButton.textContent = "VIEW LISTING";
    // viewButton.dataset.id = listingID;
    // viewButton.setAttribute("aria-label", `View listing for ${listing.title}`); // Legger til aria-label for bedre tilgjengelighet

    // buttonDiv.appendChild(viewButton);

    
    // // append elements
    // textContainer.append(listingTitle, bidInfo, buttonDiv);
    // cardContainer.append(imageContainer, textContainer);
    // listingContainer.append(countDownContainer, cardContainer);
    // listingCard.appendChild(listingContainer);

    // // add to parent container in HTML
    // container.appendChild(listingCard);
}


