
const modal = document.querySelector(`[data-modal="modalObject"]`);



export function openModal(){
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.classList.add("overflow-hidden");
}


export function closeModal(){
    modal.classList.remove("flex");
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
}
