export const getContainer = () => {
  return document.querySelector<HTMLElement>('header.ti-site-header') ?? document.getElementById('popup-container') ?? document.body
}
