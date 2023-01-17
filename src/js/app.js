import CategoryView from "./CategoryView.js";
import ProductsView from "./ProductsView.js";
const backDrop = document.querySelector(".backDrop");
const addCategorySection = document.querySelector(".addCategorySection");
const addProductSection = document.querySelector(".addProductSection");

document.addEventListener("DOMContentLoaded", () => {
  CategoryView.setApp();
  ProductsView.setApp();
  CategoryView.createCategoriesList();
  ProductsView.createProductsList(ProductsView.products);
  console.log(CategoryView);
  console.log(ProductsView);
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("addProductsBtn")) {
    addProductSection.style.display = "flex";
    backDrop.style.display = "block";
  } else if (event.target.classList.contains("closeAddProductSection")) {
    addProductSection.style.display = "none";
    backDrop.style.display = "none";
  } else if (event.target.classList.contains("addCategoryBtn")) {
    addCategorySection.style.display = "flex";
    backDrop.style.display = "block";
  } else if (event.target.classList.contains("closeCategorySectionBtn")) {
    addCategorySection.style.display = "none";
    backDrop.style.display = "none";
  }
});
