import { countDownTimer } from "../handlers/timer.js";

export async function listingCardTemplate(container, listing) {

    // Opprett coin-ikonet (SVG) for budinformasjon
    const coinSVG = document.createElement("i");
    coinSVG.classList.add("fa-solid", "fa-coins", "text-custom-orange");

    // Sjekk om det er media, hvis ikke bruk et standardbilde
    const listingMedia = listing.media.length > 0 ? listing.media[0].url : "/src/media/hero.jpg";
    const listingID = listing.id;
    
    // Hent siste budbeløp
    let lastBidAmount = 0;
    if (listing.bids && listing.bids.length > 0) {
        const lastBid = listing.bids[listing.bids.length - 1];
        lastBidAmount = lastBid.amount;
    }

    // Opprett artikkel-element for hver oppføring
    const listingCard = document.createElement("article");
    listingCard.classList.add("text-center","w-custom-295", "h-custom-395", "flex", "flex-col");

    // Container inni artikkel-elementet
    const listingContainer = document.createElement("div");
    listingContainer.classList.add("flex", "flex-col", "h-full");

    // Nedtellings-element/container
    const countDownContainer = document.createElement("div");
    countDownContainer.classList.add("timer", "text-custom-orange", "text-xl", "py-2");
    
    const countDownElement = document.createElement("p");
    countDownElement.textContent = "Loading..";
    countDownTimer(listing.endsAt, countDownElement);
    countDownContainer.appendChild(countDownElement);

    // Kortets container
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("shadow-xl", "rounded-5xl", "flex", "flex-1", "flex-col", "listing-card");

    // Bildeelement/container
    const imageContainer = document.createElement("a");
    imageContainer.classList.add("flex-grow");
    imageContainer.href = `/listing/?id=${listingID}`;

    const listingImage = document.createElement("img");
    listingImage.classList.add("rounded-t-5xl", "w-full", "object-cover", "h-custom-215");
    listingImage.src = listingMedia;
    listingImage.alt = listing.title;

    imageContainer.appendChild(listingImage);

    // Informasjonselementer (tittel, budinfo, knapp)
    const textContainer = document.createElement("div");
    textContainer.classList.add("rounded-b-5xl", "z-10", "listing-info", "bg-custom-green", "text-white", "px-3", "py-4", "flex", "flex-col", "gap-3");

    // Tittel
    const listingTitle = document.createElement("h2");
    listingTitle.classList.add("text-xl", "truncate");
    listingTitle.textContent = listing.title;

    // Budinformasjon
    const bidInfo = document.createElement("div");
    bidInfo.classList.add("bid-info", "flex", "items-center", "justify-evenly");

    const topBid = document.createElement("p");
    topBid.textContent = `Top bid: ${lastBidAmount}`;
    topBid.appendChild(coinSVG); // Legger til SVG etter teksten

    const totalBids = document.createElement("p");
    totalBids.textContent = `Total bids: ${listing._count?.bids || 0}`; // Bruker valgfri chaining for å unngå feil
    
    bidInfo.append(topBid, totalBids);

    // Visning-knapp
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("text-sm", "flex", "justify-center", "items-center");

    const viewButton = document.createElement("a");
    viewButton.href = `/listing/?id=${listingID}`;
    viewButton.classList.add("bg-custom-orange", "py-2", "px-3", "rounded-full");
    viewButton.textContent = "VIEW LISTING";
    viewButton.dataset.id = listingID;
    viewButton.setAttribute("aria-label", `View listing for ${listing.title}`); // Legger til aria-label for bedre tilgjengelighet

    buttonDiv.appendChild(viewButton);

    // Legg til alle elementene i riktig rekkefølge
    textContainer.append(listingTitle, bidInfo, buttonDiv);
    cardContainer.append(imageContainer, textContainer);
    listingContainer.append(countDownContainer, cardContainer);
    listingCard.appendChild(listingContainer);

    // Legg kortet til containeren
    container.appendChild(listingCard);
}




// import { countDownTimer } from "../handlers/timer";


// export async function listingCardTemplate(container, listing) {
    
//     const coinSVG = document.createElement("i");
//     coinSVG.classList.add("fa-solid", "fa-coins", "text-custom-orange");
//     const listingMedia = listing.media.length > 0 ? listing.media[0].url : "/src/media/hero.jpg";

//     const listingID = listing.id;
//     let lastBidAmount = 0;
//     if (listing.bids && listing.bids.length > 0){
//         const lastBid = listing.bids[listing.bids.length - 1];
//         lastBidAmount = lastBid.amount;        
//     }

//     const listingCard = document.createElement("article");
//     listingCard.classList.add("text-center", "font-marcellus", "w-custom-295", "h-custom-395", "flex", "flex-col");

//     // listingCard.dataset.id = listingID;

//     // container inside article element
//     const listingContainer = document.createElement("div");
//     listingContainer.classList.add("flex", "flex-col", "h-full");

//     // Countdown element/container
//     const countDownContainer = document.createElement("div");
//     countDownContainer.classList.add("timer", "text-custom-orange", "text-2xl", "py-2");
    
//     const countDownElement = document.createElement("p");
//     countDownElement.textContent = "Loading..";
//     const getTime = document.querySelector(".timer p");
//     countDownTimer(listing.endsAt, getTime);

//     countDownContainer.appendChild(countDownElement);

//     // cardContainer
//     const cardContainer = document.createElement("div");
//     cardContainer.classList.add("shadow-xl", "rounded-5xl", "flex", "flex-1", "flex-col", "listing-card");

//     // image element/container
//     const imageContainer = document.createElement("a");
//     imageContainer.classList.add("flex-grow");

//     const listingImage = document.createElement("img");
//     listingImage.classList.add("rounded-t-5xl", "w-full", "h-full", "object-cover");
//     listingImage.src = listingMedia;
//     listingImage.alt = listing.title;

//     imageContainer.appendChild(listingImage);

//     // info elements
//     const textContainer = document.createElement("div");
//     textContainer.classList.add("rounded-b-5xl", "z-50", "listing-info", "bg-custom-green", "text-white", "px-3", "py-4", "flex", "flex-col", "gap-3");

//     // title
//     const listingTitle = document.createElement("h2");
//     listingTitle.classList.add("text-2xl");
//     listingTitle.textContent = listing.title;

//     // bidInfo
//     const bidInfo = document.createElement("div");
//     bidInfo.classList.add("bid-info", "flex", "items-center", "justify-evenly");

//     const topBid = document.createElement("p");
//     topBid.textContent = "Total bids:"+coinSVG+ lastBidAmount;

//     const totalBids = document.createElement("p");
//     totalBids.textContent = `Total bids: ${listing._count.bids}`;
    
//     bidInfo.append(topBid, totalBids);

//     // view button
//     const buttonDiv = document.createElement("div");
//     buttonDiv.classList.add("text-xl", "flex", "justify-center", "items-center");

//     const viewButton = document.createElement("a");
//     viewButton.href = `/listing/?id=${listingID}`;
//     viewButton.classList.add("bg-custom-orange", "py-1", "px-3", "rounded-full");
//     viewButton.textContent = "View listing";
//     viewButton.dataset.id = listingID;
    

//     buttonDiv.appendChild(viewButton);

//     // append all 

//     textContainer.append(listingTitle, bidInfo, buttonDiv);
//     cardContainer.append(imageContainer, textContainer);
//     listingContainer.appendChild(countDownContainer, cardContainer);
//     listingCard.appendChild(listingContainer);

//     container.appendChild(listingCard);
     

// }

