const loadCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  showCategories(data.categories);
  //   console.log(data.categories);
};

loadCategories();

function showCategories(categories) {
  console.log(categories);

  const categoriesContainer = document.getElementById("catergories-container");

  categories.forEach((element) => {
    console.log(element);
    console.log(element.category);
    const div = document.createElement("div");
    div.innerHTML = `
    <button onclick="loadPets('${element.category}')" class="btn">${element.category}
    <img class="w-8" src=${element.category_icon} alt="" srcset="">

    </button>
    `;
    categoriesContainer.append(div);
  });
}

const loadPets = async (category) => {
  document.getElementById("status").style.display = "none";
  document.getElementById("spinner").style.display = "block";
  document.getElementById("pets-container").classList.add("hidden");

  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const data = await response.json();
  // console.log(data.data[0].category);
  console.log(data.data);
  if (data.data) {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("pets-container").classList.remove("hidden");
    displayPet(data.data);
  }
};

loadPets("Cat");

const displayPet = (pets) => {
  if (pets.length < 1) {
    console.log(pets.length);

    document.getElementById("status").style.display = "block";
    document.getElementById("pets-container").classList.add("hidden");
  }
  const petsContainer = document.getElementById("pets-container");
  petsContainer.innerHTML = "";
  pets.forEach((pet) => {
    console.log(pet);
    const div = document.createElement("div");
    div.innerHTML = `
   
    <div class="card bg-base-100 w-full shadow-sm px-6">
    <figure>
      <img class="w-full" src="${pet.image}" />
    </figure>
    <div>
      <h2 class="card-title">${pet["pet_name"]}</h2>
      <p>Breed: ${pet.breed}</p>
      <p>Birth: ${pet.date_of_birth}</p>
      <p>Gender: ${pet.gender}</p>
      <p>Price: ${pet.price}</p>
      <div class="card-actions justify-end">
      <button class="btn selected btn-active btn-secondary">Select</button>
      </div>
    </div>
  </div>`;
    petsContainer.append(div);
  });
  const selectedButton = document.getElementsByClassName("selected");
  for (const element of selectedButton) {
    element.addEventListener("click", (event) => {
      valueConvertedById("cart-count");
      const title =
        event.target.parentNode.parentNode.querySelector("h2").innerText;
      console.log(title);
      const cartItems = document.getElementById("cart-items");
      let div = document.createElement("div");
      div.classList.add("flex");
      div.classList.add("gap-4");
      div.classList.add("items-center");
      div.innerHTML = `
      <span>${title}</span>
      <button class="btn btn-primary">Delete</button>
      `;
      cartItems.append(div);
    });
  }
};

function valueConvertedById(id) {
  let cartCount = document.getElementById(id).innerText;
  let previousVal = parseInt(cartCount);
  previousVal = previousVal + 1;
  document.getElementById(id).innerText = previousVal;
  document.getElementById("item-count").innerText = `${previousVal} items`;
  // console.log(document.getElementById(id).innerText);

  return previousVal;
}

// Trying to add cart number with items

/* const itemCount = document.getElementById("item-count");
itemCount.innerText = valueConvertedById();
console.log(itemCount.innerText); */

/* valueConvertedById("cart-count");
valueConvertedById("cart-count");
valueConvertedById("cart-count"); */
