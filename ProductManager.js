const fs = require("fs");
const path = "ProductFiles.json"

class ProductManager {
  constructor (path){
    this.path = path; 
    this.product = []; 
  }
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

  generateId = async() =>{
    const counter = this.product.length
    if (counter == 0){
      return 1
    } else{
      return (this.product[counter-1].id)+1
    }
  }

  async createProduct (product){
    try {
      const product = await this.getProduct()
      let id 
      if(!product.length){
        id = 1
      }else{
        id = this.product[this.product.length-1].id + 1
      }
      product.push({id,...product})
      await fs.promises.writeFile(path, JSON.stringify(product))
    } catch (error) {
      return error
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProduct()
      const product = products.find(u => u.id === id);
      if(!product){
        return "El producto ingresado es inexistente"
      } else{
        return product
      }
    } catch (error) {
      return error
    }
  }

  addProduct = async (title,description,price,thumbnail,code,stock) =>{
    if (!title || !description || !price || !thumbnail || !code || !stock){
      console.error ("Debes ingresar los datos del producto")
      return
    } else{
    const repeatCode = this.product.find (element => element.code === code)
    if (repeatCode){
      console.error("El código ingresado ya existe")
      return
    } else {
      const id = await this.generateId()
      const newProduct = {
        title,description,price,thumbnail,code,stock
      }
      this.product.push(newProduct)
      await fs.promises.writeFile(this.path, JSON.stringify(this.product, null, 2))
    }
  }
}

  updateProduct = async(id,title,description,price,thumbnail,code,stock) =>{
  if (!title || !description || !price || !thumbnail || !code || !stock){
    console.error ("Debes ingresar los datos del producto")
    return 
} else{
  const productList = await this.getProduct()
  const newProductList = productList.map(element=>{
    if(element.id === id){
      const updateProduct={
        ...element, 
        title,description,price,thumbnail,code,stock
      }
      return updateProduct
    } else {
      return element
    }
  })
  await fs.promises.writeFile (this.path, JSON.stringify(newProductList, null, 2))
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