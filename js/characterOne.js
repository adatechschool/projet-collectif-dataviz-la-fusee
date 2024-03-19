const query = window.location.search;
console.log(query);

const params = new URLSearchParams(query);
const id = params.get("id");
console.log(id);

