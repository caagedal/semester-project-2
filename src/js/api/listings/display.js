import { API_BASE, API_LISTINGS, API_AUCTION} from "../constants.js";
import { authFetch } from "../authFetch.js";


const listingsURL = API_BASE + API_AUCTION + API_LISTINGS;
const bids = "_bids=true";
const seller = "_seller=true";

export async function fetchListings(page, sort, sortOrder, container) {
    const allListingsURL = `${listingsURL}?${bids}&${seller}&sort=${sort}&sortOrder=${sortOrder}&page=${page}`;
    
    try {
        const response = await authFetch(allListingsURL);

        if (!response.ok) {
            throw new Error("Failed to fetch listings");
        }

        return await response.json();
    } catch (error) {
        errorMeassage(container); // Antar at dette viser en feilmelding på UI-et
        console.error("Error fetching listings:", error);
        throw new Error("Failed to fetch listings");
    }
}


// export async function fetchListings(page, sort, sortOrder, container){
    
//     try{
//         const allListingsURL =  `${listingsURL}?${bids}&${seller}&sort=${sort}&sortOrder=${sortOrder}&page=${page}`;
//         const response = await authFetch(allListingsURL);

//         if (response.ok){
//             return await response.json();
//         }
//         if(!response.ok){
//             throw new Error("Failed to fetch listings");
//         }
//     }catch (error){
//         errorMeassage(container);
//         console.error(error);
//         throw new Error ("Failed to fetch listings", error);
//     }
// };



export async function fetchListing(id, container) {
    if (!id) {
        throw new Error("Listing ID not provided");
    }

    const listingURL = `${listingsURL}/${id}?${bids}&${seller}`;
    
    try {
        const response = await authFetch(listingURL);

        if (!response.ok) {
            throw new Error("Listing not found");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching listing:", error);
        throw new Error("Failed to fetch listing");
    }
};
