import { listingCardTemplate } from "../template/listingCard.js";
import { fetchListings } from "../api/listings/display.js";

let currentPage = 1;
let totalPages = 1;

/**
 * Hovedfunksjon for å rendre alle auksjonsoppføringer
 */
export async function renderListings() {
    try {
        const listingGridContainer = document.querySelector(".listing-grid");
        const errorMsg = document.querySelector(".listing-grid");

        if (!listingGridContainer || !errorMsg) {
            console.error("Listing grid container eller errorMsg mangler.");
            return;
        }

        listingGridContainer.innerHTML = "";
        await deployListings(listingGridContainer, errorMsg);
        sortListener(listingGridContainer, errorMsg);
    } catch (error) {
        console.error("Feil ved rendering av oppføringer:", error);
    }
}

/**
 * Legger til sorteringslytter for å hente oppføringer basert på valgt sortering
 */
export async function sortListener(listingGridContainer, errorMsg) {
    try {
        const sortElement = document.querySelector("#sort");

        if (!sortElement) {
            console.error("Sorteringselementet finnes ikke.");
            return;
        }

        sortElement.addEventListener("change", async () => {
            await deployListings(listingGridContainer, errorMsg);
        });
    } catch (error) {
        console.error("Feil ved håndtering av sorteringslytter:", error);
    }
}

/**
 * Henter og filtrerer oppføringer basert på sorteringsvalg og sider
 */
export async function deployListings(container, errorMsg) {
    try {
        currentPage = 1;
        container.innerHTML = "";

        const sortElement = document.querySelector("#sort");
        if (!sortElement) {
            console.error("Sort-element ikke funnet.");
            return;
        }

        const sortValue = sortElement.value;
        let sortField = "created";
        let sortOrder = "desc";

        // Sorter basert på brukerens valg
        switch (sortValue) {
            case "created":
                sortField = "created";
                sortOrder = "desc";
                break;
            case "oldest":
                sortField = "created";
                sortOrder = "asc";
                break;
            case "ending":
                sortField = "endsAt";
                sortOrder = "asc";
                break;
            case "ended":
                sortField = "endsAt";
                sortOrder = "desc";
                break;
            default:
                sortField = "created";
                sortOrder = "desc";
        }

        // Hent den første siden av oppføringer
        const response = await fetchListings(currentPage, sortField, sortOrder, errorMsg);

        if (!response || !response.data) {
            throw new Error("Ingen oppføringer funnet");
        }

        totalPages = response.meta.pageCount;

        // Henter alle sidene samtidig
        const pageRequests = [];
        for (let i = 2; i <= totalPages; i++) {
            pageRequests.push(fetchListings(i, sortField, sortOrder, errorMsg));
        }

        const allPageResponses = await Promise.all(pageRequests);
        let allListings = [...response.data, ...allPageResponses.flatMap(res => res.data)];

        // Filtrer basert på popularitet eller om de er avsluttet
        let filteredListings = allListings;

        if (sortValue === "popular") {
            filteredListings = filteredListings.sort((a, b) => b.bids.length - a.bids.length);
        }

        if (sortValue === "ended") {
            filteredListings = filteredListings
                .filter(listing => new Date(listing.endsAt) < new Date())
                .sort((a, b) => new Date(b.endsAt) - new Date(a.endsAt));
        } else {
            filteredListings = filteredListings.filter(listing => new Date(listing.endsAt) >= new Date());
        }

        // Filtrer bort "test"-oppføringer
        const activeListings = filteredListings.filter(listing => listing.title.toLowerCase() !== "test");

        const loading = document.querySelector(".loading");
        if (loading) {
            loading.innerHTML = activeListings.length === 0 ? "No listings found" : "";
        }

        // Rendre hver oppføring
        activeListings.forEach(listing => {
            listingCardTemplate(container, listing);
        });
    } catch (error) {
        console.error("Feil ved henting av oppføringer:", error);
        if (errorMsg) {
            errorMsg.innerHTML = "Det oppstod en feil ved lasting av oppføringer.";
        }
    }
}

renderListings();





// import { listingCardTemplate } from "../template/listingCard";
// import { fetchListings } from "../api/listings/display";

// let currentPage = 1;
// let totalPages = 1;

// export async function renderListings(){
//     const errorMsg = document.querySelector(".listing-grid");
//     const listingGridContainer = document.querySelector(".listing-grid");
//     listingGridContainer.innerHTML = "";

//     await deployListings(listingCardTemplate, errorMsg);

//     sortListener(listingGridContainer, errorMsg);
// }


// export async function sortListener(listingGridContainer, errorMsg){
//     const sortElement = document.querySelector("#sort");

//     sortElement.addEventListener("change", async () => {
//         await deployListings(listingGridContainer, errorMsg);
//     });
// }


// export async function deployListings(container, errorMsg){
//     currentPage = 1;
//     const listingsContainer = document.querySelector(".listing-grid");
//     listingsContainer.innerHTML= "";

//     const sort = document.querySelector("#sort");
//     let sortOrder = "desc";
//     let sortValue = sort.value;
//     let sortField = "created";

//     switch (sortValue) {
//         case "created":
//             sortField = "created";
//             sortOrder = "desc";
//             break;
//         case "oldest":
//             sortField = "created";
//             sortOrder = "asc";
//             break;
//         case "ending":
//             sortField = "endsAt";
//             sortOrder = "asc";
//             break;
//         case "ended":
//             sortField = "endsAt";
//             sortOrder = "desc";
//             break;
//         default:
//             sortField = "created";
//             sortOrder = "desc";
//     }

//     const response = await fetchListings(currentPage, sortField, sortOrder, errorMsg);

//     totalPages = response.meta.pageCount;

//     let allListings = [...response.data];
//     for (let i = 2; i <= totalPages; i++){
//         const response = await fetchListings(i, sortField, sortOrder, errorMsg);
//         allListings = allListings.concat(response.data);
//     }

//     let filteredListings = [];
//     if (sortValue === "popular"){
//         filteredListings = allListings.sort(
//             (a, b)=> b.bids.length - a.bids.length,
//         );
//     }
//     if (sortValue === "ended"){
//         filteredListings = allListings.filter(
//             (listing) => new Date(listing.endsAt) < new Date(),
//         );
//         filteredListings.sort((a, b) => new Date(b.endsAt) - new Date(a.endsAt));
//     }else {
//         filteredListings = allListings.filter(
//             (listing) => new Date(listing.endsAt) >= new Date(),
//         );
//     }

//     const activeListings = filteredListings.filter(
//         (listing) => listing.title.toLowerCase() !== "test"
//     );

//     const loading = document.querySelector(".loading");
//     loading.innerHTML = "";
//     if (activeListings.length === 0){
//         loading.textContent = "No listings found";
//     }

//     activeListings.forEach((listing) => {
//         listingCardTemplate(container, listing);
//     });
// }

// renderListings();