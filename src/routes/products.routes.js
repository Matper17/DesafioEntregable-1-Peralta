import { Router } from "express";
import { manager } from "../../ProductManager.js";

const router = Router(); 

router.get("/api/products", async (req, res) =>{
    try {
        const products = await manager.getProducts(req.query); 
        res.status(200).json({message: "Product found", products})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get("/api/products/:id", async (req, res) =>{
    const {id} = req.params
    try {
        const product = await manager.getProductById(+id)
        console.log("product", product)
        if (!product){
            return res
            .status(404)
            .json({message: "Product not found try with other name"})
        }
        res.status(200).json({message:"Product found", product})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post("/api/products", async (req, res) =>{
    const {title, description, price, thumbnail, code, stock} = req.body
    if(!title || !description || !price || !thumbnail || !code || !stock){
        return res.status(400).json({message: "Some data is wrong"})
    }
    try {
        const response = await manager.addProduct(req.body)
        res.status(200).json({message: "Successfully loaded product", user: response})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.delete("/api/products/:idProduct", async (req, res) =>{
    const {idProduct} = req.params
    try {
        const response = await manager.deleteProduct(+idProduct)
        if(!response){
            return res
            .status(404)
            .json({message: "Product not found"})
        }
        res.status(200).json({message:"Delete product"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.put("/api/products/:idProduct", async(req, res) =>{
    const {idProduct} = req.params
    try {
        const response = await manager.updateProduct(+idProduct, req.body)
        if(!response){
            return res
            .status(404)
            .json({message: "Product not found"})
        }
        res.status(200).json({message:"Update product"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}) 

export default router; 