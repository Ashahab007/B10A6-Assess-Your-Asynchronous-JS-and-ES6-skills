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
    const div = document.createElement("div");
    div.innerHTML = `
    <button class="btn">${element.category}
    <img class="w-8" src=${element.category_icon} alt="" srcset="">

    </button>
    `;
    categoriesContainer.append(div);
  });
}
