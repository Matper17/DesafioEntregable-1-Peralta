import { Router } from "express";
import { cartsManager } from "../../CartsManager.js";
const router = Router(); 

//Creación del nuevo carrito

router.post("/", (req, res) =>{
    try {
        const newCart = cartsManager.createCart() //Intento poner el await que me sugeriste y me tira un error de expresión como si tuviera que usar algo dentro del paréntesis
        res.status(201).json({message: "Create Cart", cart: newCart})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get("/:cid", async (req, res)=>{
    const {cid} = req.params
    try {
        const cart = await cartsManager.getCartById(+cid)
        if(!cart){
            res.status(404).json({message: "Cart not found"})
            return; 
        }
        res.status(200).json({message: "Producto en carrito", products: cart.products })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post("/:cid/product/:pid", async (req, res)=>{
    const {pid, cid} = req.params
    const {quantity} = req.body
    try {
        await cartsManager.addProductToCart(+cid, +pid, quantity)
        res.status(201).json({message: "Producto agregado al carrito"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//:cid y :pid, en el navegador se debe poner localhost:8080/api/products o cart/n° de id (cid o pid)

export default router; 