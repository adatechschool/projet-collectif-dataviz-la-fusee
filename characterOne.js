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
            .then(data => {
              
              const image = document.createElement("img");
              image.src = data.image;
              document.getElementById("card-photo").append(image);
              
              let characterName = document.querySelector(".character_name");
              characterName.textContent = data.name;
              
              let characterStatus = document.querySelector(".character_status");
              characterStatus.textContent = data.status;
              
              let characterSpecies = document.querySelector(".character_species");
              characterSpecies.textContent = data.species;
              
              let characterGender = document.querySelector(".character_gender");
              characterGender.textContent = data.gender;
              
              let characterOriginName = document.querySelector(".character_origin_name");
              characterOriginName.textContent = data.origin.name;
              
            let characterSign = document.querySelector(".character_sign");
              characterSign.textContent = data.name;
            })
