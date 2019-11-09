const form = document.querySelector("form");

form.addEventListener("submit", e => {
    e.preventDefault();
    console.log("joining room", e.target[0].value);
})