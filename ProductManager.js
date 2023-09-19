const fs = require("fs");
const path = "ProductFiles.json"

class ProductManager {
//Programación asíncrona
  async getProduct () {
    try {
      if(fs.existsSync(path)){
        const productFile = await fs.promises.readFile(path, "utf-8")
        return JSON.parse(productFile)
      } else{
        return[]
      }
    } catch (error) {
      return error
    }
  }

  async createProduct (product){
    try {
      const products = await this.getProduct()
      let id 
      if(!product.length){
        id = 1
      }else{
        id = this.products[this.products.length-1].id + 1
      }
      products.push({id,...product})
      await fs.promises.writeFile(path, JSON.stringify(products))
    } catch (error) {
      return error
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProduct()
      this.product = products.parse(u => u.id === id);
      if(!product){
        return "This product does not exist"
      } else{
        return product
      }
    } catch (error) {
      return error
    }
  }

  async deleteProduct(id){
    try {
      const products = await this.getProduct()
      const newArrayProducts = products.filter(u => u.id !== id)
      await fs.promises.writeFile (path, JSON.stringify (newArrayProducts))
    } catch (error) {
      return error
    }
  }
}

//Pruebas
const product1 = {
  name: "Name1", 
  title: "product1",
  description: "description1",
  price: 1500,
  thumbnail: "url",
  code: "abc123",
  stock: 230
}

const product2 = {
  name: "Name2", 
  title: "product2",
  description: "description2",
  price: 1000,
  thumbnail: "url",
  code: "abc223",
  stock: 200
} 

async function test(){
  const product = ProductManager()
  await product.deleteProduct(1)
}

test()