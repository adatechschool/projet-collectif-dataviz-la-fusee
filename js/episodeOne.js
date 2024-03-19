const query = window.location.search;
console.log(query);

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log(id);
