import { API_BASE, API_LISTING, API_AUCTION } from "../constants";
import { authFetch } from "../authFetch";

/**
 * Places a bid on a specific auction listing.
 *
 * @async
 * @function placeBid
 * @param {string} id - The ID of the auction listing where the bid will be placed.
 * @param {number} amount - The bid amount to place on the auction.
 * @throws {Error} If the ID or bid amount is missing, or if placing the bid fails.
 * @returns {Promise<Object|null>} The response data from the server if successful, or null if unsuccessful.
 */
export async function placeBid(id, amount) {
    // Validate that ID and amount are provided
    if (!id || !amount) {
        throw new Error("ID and amount are required.");
    }

    const URL = `${API_BASE}${API_AUCTION}${API_LISTING}/${id}/bids`;
    const body = { amount: amount };

    try {
        // Ensure 'authFetch' is called correctly
        const response = await authFetch(URL, "POST", body, "bid");

        if (!response) {
            // If no response, display an error message (make sure errorMessage function exists)
            console.error("You must be logged in to place a bid.");
            return null;  // Return null when the response is not successful
        }

        return response;  // Return the successful response
    } catch (error) {
        // Log the error and re-throw it
        console.error("Error placing bid:", error);
        throw error;
    }
}

