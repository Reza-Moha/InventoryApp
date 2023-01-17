import Storage from "./Storage.js";
import Toaster from "./Toastify.js";
const addNewCategory = document.querySelector(".addNewCategory");
const categoryDescription = document.querySelector("#categoryDescription");
const categoryTitleInput = document.querySelector("#categoryTitleInput");
const addCategorySection = document.querySelector(".addCategorySection");
const backDrop = document.querySelector(".backDrop");
class CategoryView {
  constructor() {
    addNewCategory.addEventListener("click", (e) => this.addNewCategory(e));
    this.categories = [];
  }
  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitleInput.value;
    const description = categoryDescription.value;
    if (!title || !description) {
      return toastr.error("Please add categories carefully!");
    } else {
      Storage.saveCategory({ title, description });
      this.setApp();
      this.createCategoriesList();
      categoryTitleInput.value = "";
      categoryDescription.value = "";
      addCategorySection.style.display = "none";
      backDrop.style.display = "none";
      Toaster("Category Successfully Added");
    }
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  createCategoriesList() {
    let result = `<option class="bg-slate-500 text-slate-300" style="background-color:#111827;color: #c7d2fe" value="All">Select Category</option>`;

    this.categories.forEach((category) => {
      result += `
      <option style="background-color:#111827;color: #c7d2fe" value=${category.id}>${category.title}</option>
      `;
    });

    let categoryOptions = document.querySelector(".category");
    let CategorySectionProducts = document.querySelector(
      ".CategorySectionProducts"
    );
    categoryOptions.innerHTML = result;
    CategorySectionProducts.innerHTML = result;
  }
}

export default new CategoryView();
