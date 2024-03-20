// const query = window.location.search;
// console.log(query);

// const params = new URLSearchParams(window.location.search);
// const id = params.get("id");
// console.log(id);

// fetch(`https://rickandmortyapi.com/api/character/${id}`)
//     .then (reponse => reponse.json())
//     .then (reponse2 => {console.log(reponse2)
//     })

const query = window.location.search;
console.log(query);

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log(id);

fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then(response => response.json()) // Transforme la réponse en JSON
            .then(data => console.log(data))
        