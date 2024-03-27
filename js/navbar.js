const nav = document.querySelector("#nav");
const btnNavbarDropdown = document.querySelector(".drop-btn")

btnNavbarDropdown.addEventListener("click", (e) => {
   e.preventDefault();
   nav.classList.toggle("show");
})