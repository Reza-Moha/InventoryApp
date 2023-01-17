import Toaster from "./Toastify.js";
import Storage from "./Storage.js";
const addNewProductBtn = document.querySelector(".addNewProductBtn");
const productImageInput = document.querySelector(".productImage");
const productTitleInput = document.querySelector("#productTitleInput");
const productQuantity = document.querySelector("#productQuantity");
const productPrice = document.querySelector("#productPrice");
const backDrop = document.querySelector(".backDrop");
const addProductSection = document.querySelector(".addProductSection");
const productsContainer = document.querySelector(".productsContainer");
const SearchInput = document.querySelector("#SearchInput");
const categoryLabel = document.querySelector("#categoryLabel");
const sortPrice = document.querySelector("#sortPrice");

class ProductsView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    SearchInput.addEventListener("input", (e) => this.SearchProducts(e));
    categoryLabel.addEventListener("change", (e) => this.categoryLabelSort(e));
    sortPrice.addEventListener("change", (e) => this.sortPrice(e));
    this.products = [];
  }
  addNewProduct(e) {
    e.preventDefault();
    const title = productTitleInput.value;
    const quantity = productQuantity.value;
    const price = productPrice.value;
    let image = productImageInput.files[0];
    console.log(image);
    const category = document.querySelector("#category").value;
    if (!title || !quantity || !category || !price || !image) return;
    // return toastr.error("Please add Product carefully!");

    Storage.saveProduct({ title, category, quantity, price, image });
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    addProductSection.style.display = "none";
    backDrop.style.display = "none";
    productTitleInput.value = "";
    productQuantity.value = "";
    productPrice.value = "";
    // Toaster("Product Successfully Added");
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  createProductsList(products) {
    let result = "";
    products.forEach((product) => {
      const selectedCategory = Storage.getAllCategories().find(
        (category) => category.id === +product.category
      );
      result += `
         <tr
                    class="w-full h-10 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 dark:text-gray-50"
            >
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <img class="w-12 h-7 rounded border border-indigo-400 object-fill" src="" alt=${product.title}>
                </div>
              </td>
              <th
                      scope="row"
                      class="px-6 py-4 font-medium  whitespace-nowrap dark:text-gray-50 text-xs"
              >
                ${product.title}
              </th>
              <td class="px-1 py-1 text-xs text-center">${selectedCategory.title}</td>
              <td class="px-1 py-1 text-xs text-center">${product.quantity}</td>
              <td class="px-1 py-1 text-[10px] font-iranSans text-center">${product.price} تومان</td>
              <td style="direction: rtl" class="px-1 py-1 text-[10px] font-iranSans text-center">${product.created}</td>
              <td
                      class="px-6 py-4 text-xs "
              >
                <svg
                
                data-product-id=${product.id}
                        class="deleteProduct h-4 w-4 text-red-500 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                >
                  <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </td>
            </tr>
      `;
    });
    productsContainer.innerHTML = result;
    const deleteProduct = [...document.querySelectorAll(".deleteProduct")];
    deleteProduct.forEach((btn) => {
      btn.addEventListener("focus", (e) => this.deleteProduct(e));
    });
  }

  SearchProducts(e) {
    const inputValue = e.target.value.trim();
    const filteredProducts = this.products.filter((p) => {
      return p.title.toLowerCase().includes(inputValue.toLowerCase());
    });
    this.createProductsList(filteredProducts);
  }
  categoryLabelSort(e) {
    const label = e.target.value;
    if (label === "All") {
      this.createProductsList(this.products);
    } else {
      const filteredCategory = this.products.filter(
        (p) => +p.category === +label
      );
      this.createProductsList(filteredCategory);
    }
  }
  deleteProduct(e) {
    const label = categoryLabel.value;
    const productId = e.target.dataset.productId;
    if (label === "All") {
      Storage.deleteProducts(productId);
      this.products = Storage.getAllProducts();
      this.createProductsList(this.products);
    } else {
      Storage.deleteProducts(productId);
      this.products = Storage.getAllProducts();
      const filteredCategory = this.products.filter(
        (p) => parseInt(p.category) === parseInt(label)
      );
      this.createProductsList(filteredCategory);
    }
  }
  sortPrice(e) {
    const sortedValue = e.target.value;
    const AllProducts = this.products;
    if (sortedValue === "highestPrice") {
      AllProducts.sort((a, b) => {
        return parseInt(a.price) > parseInt(b.price) ? -1 : 1;
      });
      this.createProductsList(AllProducts);
    } else if (sortedValue === "lowestPrice") {
      AllProducts.sort((a, b) => {
        return parseInt(a.price) > parseInt(b.price) ? 1 : -1;
      });
      this.createProductsList(AllProducts);
    } else if (sortedValue === "OverAMillion") {
      let limited = 1000000;
      const filteredProducts = AllProducts.filter(
        (p) => parseInt(p.price) > limited
      );
      this.createProductsList(filteredProducts);
    } else if (sortedValue === "DownAMillion") {
      let limited = 1000000;
      const filteredProducts = AllProducts.filter(
        (p) => parseInt(p.price) < limited
      );
      this.createProductsList(filteredProducts);
    } else {
      this.createProductsList(this.products);
    }
  }
}

export default new ProductsView();
