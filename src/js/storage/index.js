
/**
 * Function that saves the key and values to local storage
 * @param {string} key 
 * @param {object} value 
 */

export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * A function to load the key from local storage
 * @param {string} key 
 * @returns {object} Value
 */

export function load(key) {
    try{
        const value = localStorage.getItem(key);
        return JSON.parse(value);
    }catch(error){
        return null;
    }
}

/**
 * A function to remove the key from local storage
 * @param {string} key 
 */

export function remove(key) {
    localStorage.removeItem(key);
}