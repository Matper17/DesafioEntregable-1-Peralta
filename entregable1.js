const fs = require("fs");

class ProducManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.loadProducts(); // Añadí esto para cargar los productos al inicializar la clase.
  }

  async loadProducts() {
    try {
      const productList = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(productList);
    } catch (error) {
      this.products = [];
    }
  }

  generatorId() {
    const count = this.products.length;
    if (count === 0) {
      return 1;
    } else {
      return this.products[count - 1].id + 1;
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const id = this.generatorId();

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Debes ingresar todos los datos del producto.");
      return;
    }

    const existProduct = this.products.find(item => item.code === code);

    if (existProduct) {
      console.error("El código ya existe.");
      return;
    } else {
      const newProduct = { id, title, description, price, thumbnail, code, stock };
      this.products.push(newProduct);

      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
    }
  }

  async upDateProduct(id, title, description, price, thumbnail, code, stock) {
    const allProducts = await this.getProducts();

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Debes ingresar todos los datos para la actualización.");
      return;
    }

    const repetCode = allProducts.find(element => element.code === code);

    if (repetCode) {
      console.error("El código que intentas ingresar ya existe.");
      return;
    } else {
      const newProductList = allProducts.map(element => {
        if (element.id === id) {
          const upDateProduct = {
            ...element,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
          };
          return upDateProduct;
        } else {
          return element;
        }
      });

      await fs.promises.writeFile(this.path, JSON.stringify(newProductList, null, 2));
    }
  }

  async deleteProduct(id) {
    const allProducts = await this.getProducts();
    const productNotFound = allProducts.filter(element => element.id !== id);
    await fs.promises.writeFile(this.path, JSON.stringify(productNotFound, null, 2));
  }

  async getProductById(id) {
    const allProducts = await this.getProducts();
    const found = allProducts.find(element => element.id === id);
    return found;
  }

  async getProducts() {
    const productList = await fs.promises.readFile(this.path, "utf-8");
    const productListparse = JSON.parse(productList);
    return productListparse;
  }
}

async function generator() {
  const productManager = new ProducManager("./products.json");

  //await productManager.addProduct("product1", "description1", 1000, "url", "code1", 10);
  //await productManager.addProduct("product2", "description2", 2000, "url", "code2", 10);
  //await productManager.addProduct("product3", "description3", 2500, "url", "code3", 10);
  //await productManager.addProduct("product4", "description4", 3000, "url", "code4", 10);

  const solo = await productManager.getProductById(2);
  console.log(solo);
}

generator();
 