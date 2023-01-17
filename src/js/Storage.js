const products = [
  {
    id: 1,
    title: "test",
    category: "",
    created: "2023-01-10T18:43:45.791Z",
  },
  {
    id: 2,
    title: "test2",
    category: "",
    created: "2023-01-10T18:44:42.598Z",
  },
];
const categories = [
  {
    id: 1,
    title: "test",
    description: "",
    created: "2023-01-10T18:43:45.791Z",
  },
  {
    id: 2,
    title: "test2",
    description: "",
    created: "2023-01-10T18:44:42.598Z",
  },
];
// fetch("http://localhost:5000/Products")
//   .then((res) => res.json())
//   .then((data) => Storage.allProducts(data));
const options = {
  dateStyle: "full",
  timeStyle: "short",
};
export default class Storage {
  // static allProducts(products) {
  //   console.log(products);
  // }
  static getAllCategories(products) {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
    return savedCategories.sort((a, b) => {
      return new Date(a.created) > new Date(b.created) ? -1 : 1;
    });
  }
  static getAllProducts() {
    const products = fetch("http://localhost:5000/Products");
    const savedProducts = JSON.parse(localStorage.getItem("Products")) || [];
    return savedProducts.sort((a, b) => {
      return new Date(a.created) > new Date(b.created) ? 1 : -1;
    });
  }
  static saveCategory(categoryToSave) {
    const saveCategories = Storage.getAllCategories();
    const existedCategory = saveCategories.find(
      (item) => item.id === +categoryToSave.id
    );
    if (existedCategory) {
      existedCategory.title = categoryToSave.title;
      existedCategory.description = categoryToSave.description;
    } else {
      categoryToSave.id = new Date().getTime();
      categoryToSave.created = new Date().toISOString();
      saveCategories.push(categoryToSave);
    }
    localStorage.setItem("category", JSON.stringify(saveCategories));
  }
  static saveProduct(productToSave) {
    console.log(productToSave.image);
    const saveProducts = Storage.getAllProducts();
    const existedProduct = saveProducts.find(
      (item) => item.id === +productToSave.id
    );
    if (existedProduct) {
      existedProduct.title = productToSave.title;
      existedProduct.category = productToSave.category;
      existedProduct.quantity = productToSave.quantity;
      existedProduct.price = productToSave.price;
    } else {
      productToSave.id = new Date().getTime();
      productToSave.created = new Date().toLocaleString("fa-IR", options);
      saveProducts.image = productToSave.image;
      saveProducts.push(productToSave);
    }
    console.log(productToSave);
    console.log(saveProducts);
    localStorage.setItem("Products", JSON.stringify(saveProducts));
  }

  static deleteProducts(id) {
    const products = this.getAllProducts();
    const filteredProducts = products.filter((p) => p.id !== +id);
    localStorage.setItem("Products", JSON.stringify(filteredProducts));
  }
}
