class ProducManager{
    constructor(){
        this.products=[]
    }

    getProducts = () =>{
        return this.products
    }

    generatorId = () =>{
        const count = this.products.length
        if (count === 0){
            return 1
        } else {
            return (this.products[count - 1].id) +1
        }
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const id=this.generatorId()
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.error("You must enter all product data")
            return
        } 

        const existProduct = this.products.find(item => item.code === code)
        if (existProduct){
            console.error("The code already exist")
        } else{
            this.products.push({
                id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            })
        }
  }

  getProductById = (id) =>{
    const product = this.getProducts().find(item => item.id === id)
    if (!product){
        console.error("Not Found")
        return;
    } else{
        return product
    }
  }
}

const productManager = new ProducManager(); 

productManager.addProduct("product1", "description1", 1000, "url", "code1", 10)
productManager.addProduct("product2", "description2", 2000, "url", "code2", 10)
productManager.addProduct("product3", "description3", 2500, "url", "code3", 10)
productManager.addProduct("product4", "description4", 3000, "url", "code4", 10)

console.log(productManager.getProducts());
console.log("Producto por id");
console.log(productManager.getProductById(3));