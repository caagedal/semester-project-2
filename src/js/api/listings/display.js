import { API_BASE, API_LISTINGS, API_SEARCH } from "../constants";
import { authFetch } from "../authFetch";


const listingsURL = API_BASE + API_LISTINGS;
const bids = "_bids=true";
const seller = "_seller=true";

export async function fetchListings(page, sort, sortOrder, container){
    
    try{
        const allListingsURL =  `${listingsURL}?${bids}&${seller}&sort=${sort}&sortOrder=${sortOrder}&page=${page}`;
        const response = await authFetch(allListingsURL);

        if (response.ok){
            return await response.json();
        }
        if(!response.ok){
            throw new Error("Failed to fetch listings");
        }
    }catch (error){
        errorMeassage(container);
        console.error(error);
        throw new Error ("Failed to fetch listings", error);
    }
};

