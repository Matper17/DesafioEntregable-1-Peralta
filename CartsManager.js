import {existSync, promises} from "fs"
import { manager } from "./ProductManager.js"

const path = "CartFile.json"

class CartManager {
    async getCarts(){
        try {
            if (existSync(path)){
                const cartsFile = await promises.readFile(path, "utf-8")
                const cartsData = JSON.parse(cartsFile)
                return cartsData
            } else{
                console.log ("El producto no existe")
                return []
            }
        } catch (error) {
            console.log ("error", error)
            return error
        }
    }
    async createCart(){
        try {
            const carts = await this.getCarts()
            let id; 
            if (!carts.length){
                id = 1
            }else{
                id = carts[carts.length -1].id +1
            }
            const newCart = {id, products: []}
            carts.push(newCart)
            await promises.writeFile(path, JSON.stringify(carts))
            return newCart
        } catch (error) {
            return error
        }
    }
    async getCartById(id){
        try {
            const carts = await this.getCarts()
            console.log ("carts", carts)
            const cart = carts.find((u) => u.id === id)
            console.log("cart", cart)
            return cart
        } catch (error) {
            console.log ("error")
            throw new Error(error.message)
        }
    }
    async addProductToCart(idCart, idProduct){
        //Validación del carrito
        const cart = await this.getCartById(idCart)
        if(!cart){
            throw new Error("The cart does not exist")
        }
        //Validación del producto en carrito
        const product = await manager.getProductById(idProduct)
        if (!product){
            throw new Error ("The product does not exist") 
        }
        const productIndex = cart.products.findIndex((p) => p.product === idProduct)
        if (productIndex === -1){
            const newProduct = {product: idProduct, quantity: 1}
            cart.products.push(newProduct)
        } else{
            cart.products[productIndex].quantity++
        }
        const carts = await this.getCarts()
        const cartIndex = carts.findIndex(cart => cart.id === idCart)
        carts[cartIndex] = cart
        await promises.writeFile(path, JSON.stringify(carts))
    }
}

export const cartsManager = new CartManager(); 