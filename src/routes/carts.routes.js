import { Router } from "express";
import { cartsManager } from "../../CartsManager.js";
const router = Router(); 

//Creación del nuevo carrito

app.post("/", (req, res) =>{
    try {
        const newCart = cartsManager.createCart()
        res.status(200).json({message: "Create Cart", cart: newCart})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get("/:id", async (req, res)=>{
    const {id} = req.params
    try {
        const cart = await cartsManager.getCartById(+id)
        if(!cart){
            res.status(404).json({message: "Cart not found"})
            return; 
        }
        res.status(200).json({message: "Producto en carrito", products: cart.products })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post("/:id/product/:idProduct", async (req, res)=>{
    const {id, idProduct} = req.params
    const {quantity} = req.body
    try {
        await cartsManager.addProductCart(+id, +idProduct, quantity)
        res.status(201).json({message: "Producto agregado al carrito"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router; 