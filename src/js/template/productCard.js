import { countDownTimer } from "../handlers/timer.js";

export async function listingCardTemplate(container, listing){
    
    const coinSVG = document.createElement("i");
    coinSVG.classList.add("fa-solid", "fa-coins", "text-custom-orange"); 

    const listingMedia = listing.media.length > 0 ? listing.media[0].url : "/src/media/hero.jpg";
    const listingID = listing.id;

     // Hent siste budbeløp
     let lastBidAmount = 0;
     if (listing.bids && listing.bids.length > 0) {
         const lastBid = listing.bids[listing.bids.length - 1];
         lastBidAmount = lastBid.amount;
     }

     const articleLink = document.createElement("a");
     articleLink.href = `/listing.html?id=${listingID}`;
     
     const listingtCard = document.createElement("article");
     listingtCard.classList.add("w-card-width", "text-custom-green");
    
    const timer = document.createElement("p");
    timer.classList.add("text-center", "font-semibold", "text-2xl", "text-custom-orange");
    timer.textContent = "Loading..";
    countDownTimer(listing.endsAt, timer);
    listingtCard.appendChild(timer);

    const listingBodyWrapper = document.createElement("div");
    listingBodyWrapper.classList.add("h-card-height", "bg-white", "rounded-4xl");

    const listingBody = document.createElement("div");
    listingBody.classList.add("p-2");

    const listingImgContainer = document.createElement("div");

    const listingImg = document.createElement("img");
    listingImg.classList.add("objec-cover", "h-img-height", "rounded-t-3xl", "rounded-br-6xl");
    listingImg.src = listingMedia;
    listingImg.alt = listing.title;

    listingImgContainer.appendChild(listingImg);

    const listingInfo = document.createElement("div");
    listingInfo.classList.add("p-2", "flex", "flex-col", "gap-3");

    const listingTitle = document.createElement("h2");
    listingTitle.classList.add("font-medium", "text-2xl");
    listingTitle.textContent = listing.title;

    const listingBids = document.createElement("div");
    
    const currentBid = document.createElement("p");
    currentBid.classList.add("font-medium", "text-lg");
    currentBid.textContent = `Current bid: ${coinSVG} ${lastBidAmount}`;

    const totalBids = document.createElement("p");
    totalBids.classList.add("font-medium", "text-sm");
    totalBids.textContent = `Total bids: ${listing._count?.bids || 0}`;

    listingBids.appendChild(currentBid, totalBids);

    const viewButton = document.createElement("button");
    viewButton.classList.add("bg-custom-orange", "text-white", "rounded-full", "p-2", "text-center", "font-semibold");
    viewButton.textContent = "View Listing";

    listingInfo.append(listingTitle, listingBids, viewButton);

    listingBody.append(listingImgContainer, listingInfo);

    listingBodyWrapper.appendChild(listingBody);

    articleLink.append(timer, listingBodyWrapper);
    
    listingtCard.appendChild(articleLink);

    container.appendChild(listingtCard);
}






import { countDownTimer } from "../handlers/timer.js";

export async function listingCardTemplate(container, listing) {
    // Sett opp SVG-ikonet for mynter
    const coinSVG = document.createElement("i");
    coinSVG.classList.add("fa-solid", "fa-coins", "text-custom-orange");

    // Angi bilde eller fallback
    const listingMedia = listing.media.length > 0 ? listing.media[0].url : "/src/media/hero.jpg";
    const listingID = listing.id;

    // Hent siste budbeløp
    let lastBidAmount = 0;
    if (listing.bids && listing.bids.length > 0) {
        const lastBid = listing.bids[listing.bids.length - 1];
        lastBidAmount = lastBid.amount;
    }

    // Opprett hovedartikkelen
    const listingCard = document.createElement("article");
    listingCard.classList.add("w-card-width", "text-custom-green");

    // Opprett timer
    const timer = document.createElement("p");
    timer.classList.add("text-center", "font-semibold", "text-xl", "text-custom-orange");
    timer.textContent = "Loading.."; // Standardtekst
    countDownTimer(listing.endsAt, timer);
    listingCard.appendChild(timer);

    // Opprett wrapper for kortet
    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("h-card-height", "bg-white", "rounded-4xl");

    // Opprett kortets innhold
    const cardContent = document.createElement("div");
    cardContent.classList.add("p-2");

    // Opprett bildecontainer
    const imageContainer = document.createElement("div");

    // Opprett bildet
    const image = document.createElement("img");
    image.classList.add("object-cover", "h-img-height", "rounded-t-3xl", "rounded-br-6xl", "w-full");
    image.src = listingMedia;
    image.alt = listing.title;

    // Legg bildet i containeren
    imageContainer.appendChild(image);

    // Opprett info-delen
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("p-2", "flex", "flex-col", "gap-3");

    // Legg til tittel
    const title = document.createElement("h2");
    title.classList.add("text-2xl", "font-medium");
    title.textContent = listing.title;

    // Legg til nåværende bud
    const currentBid = document.createElement("p");
    currentBid.classList.add("text-lg", "font-medium");
    currentBid.textContent = `Current bid: $${lastBidAmount}`;

    // Legg til beskrivelse
    const description = document.createElement("p");
    description.textContent = "A short description on maximum two lines with truncate at the end...";

    // Legg elementene til info-containeren
    infoContainer.append(title, currentBid, description);

    // Legg elementene til kortinnholdet
    cardContent.append(imageContainer, infoContainer);

    // Legg kortinnholdet i wrapperen
    cardWrapper.appendChild(cardContent);

    // Legg wrapperen i artikkelen
    listingCard.appendChild(cardWrapper);

    // Legg artikkelen til containeren
    container.appendChild(listingCard);
}
