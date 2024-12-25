import { API_LISTINGS_URL } from "../constants.js";
import { authFetch } from "../authFetch.js";


export async function update(id, data) {
    if (!id) {
        throw new Error("No ID found"); // Sjekker om ID er oppgitt
    }

    const updateURL = API_LISTINGS_URL + "/" + id; // Konstruerer URL-en

    try {
        const response = await authFetch(updateURL, {
            method: "PUT", // Bruker PUT-metoden for å oppdatere data
            body: JSON.stringify(data), // Konverterer dataene til JSON
        });

        if (!response.ok) {
            throw new Error("Unable to update listing"); // Kaster feil hvis API-responsen ikke er OK
        }
    } catch (error) {
        console.error(error); // Logger feilen til konsollen
        throw new Error("Failed to update listing."); // Kaster en generell feilmelding videre
    }
}

// export async function update(id, data){
//     try{
//         if(!id) {
//             throw new Error("No ID found");
//         }
//         const updateURL = API_LISTINGS_URL + "/" + id;
//         const response = await authFetch(updateURL, {
//             method: "PUT",
//             body: JSON.stringify(data),
//         });
//         if (!response.ok){
//             throw new Error("Unable to update listing", error);
//         }
//     }catch (error){
//         console.error(error);
//         throw new Error("Failed to update listing.")
//     }
// }