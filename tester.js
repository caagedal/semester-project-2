
// STEG 1
export const modal = document.querySelector(`[data-modal="modalObject"]`);



// STEG 2
import { closeModal } from './closeModal.js';
import { modal } from '../../data/constants.js';

/**
 * Opens the modal and displays the specified target element inside it.
 *
 * This function shows the modal, positions it based on the current scroll position, and appends the target content.
 * It also sets up event listeners to close the modal when clicking or touching outside the target content.
 * If no target is provided, the modal is closed immediately.
 *
 * @param {HTMLElement|null} target The target element to display inside the modal. If null, the modal will be closed.
 * @returns {void} No return value; modifies the DOM to show the modal and handle interactions.
 * @example
 * ```js
 * // Open the modal with a specific content element
 * const contentElement = document.querySelector('.content-preview');
 * openModal(contentElement);
 * ```
 */
export function openModal(target) {
  if (!target) {
    closeModal(modal);
    return;
  }

  const scrollPosition = window.scrollY || document.documentElement.scrollTop;

  modal.classList.remove('hidden');
  modal.classList.add('flex');

  modal.style.top = `${scrollPosition}px`;
  document.body.classList.add('overflow-hidden');

  modal.append(target);

  let touchStartY = 0;

  modal.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
  });

  modal.addEventListener('touchend', (event) => {
    const touchEndY = event.changedTouches[0].clientY;

    // Determine if the touch was a scroll gesture on the Y-axis
    const deltaY = Math.abs(touchEndY - touchStartY);

    // Only close if the touch was not a vertical scroll gesture (minimal vertical movement)
    if (deltaY < 10 && event.target === modal) {
      closeModal(modal);
    }
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
}


// STEG 3

import { linkListener } from '../../listeners/linkListener.js';
import { setupUploadAvatarListener } from '../../listeners/setupUploadAvatarListener.js';
import { modalRouter } from '../../router/modalRouter.js';
import { gatherUserData } from '../login Form/gatherUserData.js';
import { openGallery } from './openGallery.js';
import { openModal } from './openModal.js';

/**
 * Displays a specified modal based on the given state and modal type.
 *
 * This function handles the display of various modals based on the provided `modalValue`. Depending on the `state`,
 * it either opens the modal using `openModal` or `openGallery` for gallery-type modals. It also sets up event listeners
 * and data gathering for specific modals, such as login, register, and profile modals.
 *
 * @async
 * @param {boolean} state - Determines whether to open the modal (`true`) or not (`false`).
 * @param {string} modalValue - The type of modal to display (e.g., 'login', 'register', 'listing', 'gallery', 'profile', 'newListing').
 * @param {string} [listingId] - Optional listing ID used when fetching specific listing details for the listing modal.
 * @param {Object} [media={}] - Optional media object, used for the gallery modal to display images.
 *
 * @example
 * // Open the gallery modal with media
 * await runModal(true, 'gallery', null, { images: [...] });
 *
 * @example
 * // Open the listing modal with a specific listing ID
 * await runModal(true, 'listing', '12345-listing-id');
 *
 * @example
 * // Open the login modal
 * await runModal(true, 'login');
 */
export async function runModal(state = 'false', modalValue, listingId, media = {}) {
  const currentModal = await modalRouter(modalValue, listingId, media);

  if (state === true && modalValue === 'gallery') {
    openGallery(currentModal);
    return;
  }

  if (state === true) {
    openModal(currentModal);

    if (modalValue === 'register' || modalValue === 'login') {
      linkListener(modalValue);

      gatherUserData();
    }
    if (modalValue === 'profile') {
      setupUploadAvatarListener();
    }
  }
}


// STEG 4

import { modal } from '../data/constants';
import { auctioneerWelcomeImg, closingIcon } from '../data/images';
import { createAnchor } from '../elements/createAnchor';
import { createBtn } from '../elements/createBtn';
import { createDiv } from '../elements/createDiv';
import { createForm } from '../elements/createForm';
import { createHeading } from '../elements/createHeading';
import { createImg } from '../elements/createImg';
import { createInput } from '../elements/createInput';
import { createLabel } from '../elements/createLabel';
import { createSpan } from '../elements/createSpan';
import { createTextNode } from '../elements/createTextNode';
import { closeModal } from '../ui/modal/closeModal';

/**
 * Creates and returns a login modal element with form fields for email and password.
 *
 * This function constructs a login modal with a form for user authentication, including fields for email and password,
 * validation messages, and a call-to-action button. It also provides a link for users to navigate to the registration page.
 *
 * @returns {HTMLElement} The constructed login modal element.
 * @example
 * ```js
 * // Create a login modal and append it to the document body
 * const modal = loginModal();
 * document.body.append(modal);
 * ```
 */
export function loginModal() {
  const element = createDiv(
    'flex',
    'flex-col',
    'px-2.5',
    'md:px-3',
    'pt-2.5',
    'pb-9',
    'md:pb-6',
    'bg-neutralBg',
    'rounded-xl',
    'shadow-customShadow',
    'min-w-40',
    'max-w-96',
    'my-auto',
    'flex-grow',
    'flex-shrink',
    'xmd:landscape:max-w-[804px]',
    'md:landscape:max-w-[1112px]',
    'md:max-w-[672px]',
  );
  element.setAttribute('id', 'profileModal');

  const closeBtn = createBtn('', 'backdrop-invert', 'rounded-full', 'shadow-customShadow', 'hover:animate-pulse');
  const closeImg = createImg(closingIcon, 'close', 'size-5', 'rounded-full');
  closeBtn.append(closeImg);
  const btnWrap = createDiv('size-9', 'flex', 'justify-center', 'items-center', 'cursor-pointer');
  btnWrap.addEventListener('click', () => {
    closeModal(modal);
  });
  btnWrap.append(closeBtn);
  const btnContainer = createDiv('flex', 'justify-end');
  btnContainer.append(btnWrap);

  const topContainer = createDiv('flex', 'flex-col', 'landscape:w-1/2', 'px-5.5', 'landscape:ps-2.5', 'landscape:pe-5', 'landscape:my-auto');

  const imageWrap = createDiv('max-w-full', 'mx-auto');
  const image = createImg(auctioneerWelcomeImg, 'auctioneer greeting');
  imageWrap.append(image);

  const heading = createHeading(2, `"Your Next Great Deal Awaits!"`, 'font-serif', 'text-center', 'mt-0.5', 'md:mt-1', 'font-semibold', 'uppercase', 'md:text-xl');

  topContainer.append(imageWrap, heading);

  const bottomContainer = createDiv('flex', 'flex-col', 'landscape:w-1/2', 'landscape:justify-center', 'px-5.5', 'landscape:pe-2.5', 'landscape:ps-5');

  const formElement = createForm('api', 'login', 'flex', 'flex-col', 'gap-5', 'mt-9', 'mb-16', 'md:gap-7');

  const emailGroup = createDiv('flex', 'flex-col', 'gap-1.5');
  const labelEmail = createLabel('email', 'Email:', 'md:text-xl');
  const emailInput = createInput('text', 'your-email@stud.noroff.no', 'email', 'h-8', 'md:h-10', 'pl-2', 'rounded-xl', 'shadow-customShadow');
  const emailValidate = createDiv('text-sm', 'min-h-3.5', 'text-error');
  emailValidate.setAttribute('data-validate', 'email');
  emailGroup.append(labelEmail, emailInput, emailValidate);

  const passwordGroup = createDiv('flex', 'flex-col', 'gap-1.5');
  const labelPassword = createLabel('password', 'Password:', 'md:text-xl');
  const passwordInput = createInput('password', '*****', 'password', 'h-8', 'md:h-10', 'pl-2', 'rounded-xl', 'shadow-customShadow');
  const passwordValidate = createDiv('text-sm', 'min-h-3.5');
  passwordValidate.setAttribute('data-counter', 'password');
  passwordGroup.append(labelPassword, passwordInput, passwordValidate);

  const ctaGroup = createDiv('flex', 'flex-col', 'mx-auto', 'gap-5');
  const wrap = createDiv('mx-auto');
  const cta = createInput('submit', '', 'loginBtn', 'uppercase', 'cursor-pointer', 'bg-primary', 'hover:bg-hoverPrimary', 'rounded-xl', 'py-3', 'px-4', 'md:px-6', 'font-serif', 'text-neutralBg', 'shadow-customShadow', 'font-medium', 'md:text-lg');
  cta.value = 'login';
  wrap.append(cta);

  const regCta = createAnchor('#', '', '', 'text-center', 'py-2');
  const regText1 = createTextNode('Not yet a member? ');
  const regText2 = createSpan('Register', 'text-secondary', 'hover:text-hoverSecondary', 'font-semibold', 'text-xl');
  const regText3 = createTextNode(' now!');
  regCta.append(regText1, regText2, regText3);

  ctaGroup.append(regCta);

  formElement.append(emailGroup, passwordGroup, wrap);
  bottomContainer.append(formElement, ctaGroup);

  const containers = createDiv('flex', 'flex-col', 'landscape:flex-row');
  containers.append(topContainer, bottomContainer);

  element.append(btnContainer, containers);
  return element;
}


// STEG 5

import { loginModal } from '../template/loginModal';
import { registerModal } from '../template/registerModal';
import { listingModal } from '../template/listingModal';
import { galleryModal } from '../template/galleryModal';
import { profileModal } from '../template/profileModal';
import { newListingModal } from '../template/newListingModal';

/**
 * Routes to the appropriate modal based on the provided modal value.
 *
 * This function determines which modal component to render based on the `modalValue` provided. It handles different
 * modal types such as login, register, listing, gallery, profile, and new listing. For the listing modal, it also
 * accepts a `listingId` to fetch specific listing details, and for the gallery modal, it accepts `media` data to display.
 *
 * @async
 * @param {string} modalValue - The type of modal to display (e.g., 'login', 'register', 'listing', 'gallery', 'profile', 'newListing').
 * @param {string} [listingId] - Optional listing ID, used when fetching specific listing details for the listing modal.
 * @param {Object} [media={}] - Optional media object, used for the gallery modal to display images.
 * @returns {Promise<HTMLElement|null>} The modal element to be displayed, or `null` if an error occurs.
 *
 * @example
 * // Fetch and display the login modal
 * const loginElement = await modalRouter('login');
 *
 * @example
 * // Fetch and display a specific listing modal
 * const listingElement = await modalRouter('listing', '12345-listing-id');
 *
 * @example
 * // Fetch and display a gallery modal with media
 * const galleryElement = await modalRouter('gallery', null, { images: [...] });
 */
export async function modalRouter(modalValue, listingId, media = {}) {
  try {
    switch (modalValue) {
      case 'login':
        return loginModal();
      case 'register':
        return registerModal();
      case 'listing':
        return listingModal(listingId);
      case 'gallery':
        return galleryModal(media);
      case 'profile':
        return profileModal();
      case 'newListing':
        return newListingModal();
      default:
        throw new Error(`No modal matched for the value: ${modalValue}`);
    }
  } catch (error) {
    console.error('Error in modalRouter: ', error);
    return null;
  }
}