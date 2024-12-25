import { API_LISTINGS_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";



export async function deleteListing(id) {
    if (!id) {
        throw new Error("No ID provided");
    }

    const deleteURL = `${API_LISTINGS_URL}/${id}`;

    try {
        const response = await authFetch(deleteURL, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Failed to delete listing with ID ${id}`);
        }

        return response; // Returnerer responsen hvis slettingen er vellykket
    } catch (error) {
        console.error(`Error deleting listing with ID ${id}:`, error);
        throw new Error("Failed to delete listing");
    }
}


// export async function deleteListing(id){
//     if (!id){
//         throw new Error ("No id found");
//     }

//     const deleteURL = API_LISTINGS_URL + "/" + id;
//     const response = await authFetch(deleteURL, {
//         method: "DELETE",
//     });

//     return response;
// };
