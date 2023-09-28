import express from "express"
//import { manager } from "../ProductManager.js";
import productRouter from "./routes/product.routes.js"
import productsRouter from "./routes/products.routes.js"
import ordersRouter from "./routes/orders.routes.js"
import { __dirname } from "./utils.js"


const app = express();
const server = 8080; 
app.use(express.json()); 
app.use(express.static( __dirname + "/public")); 

// Rutas del servidor
app.use("/api/products", productsRouter)
app.use("/api/product", productRouter)
app.use("/api/orders", ordersRouter)

app.listen(server, ()=>{
    console.log(`Escuchando al puerto ${server}`)
})

//app.get("/api/products", async (req, res) => {
    //try {
        //const products = await manager.getProducts(req.query); 
        //res.status(200).json({message: "Product found", products})
    //} catch (error) {
      //  res.status(500).json({message: error.message})
   // }
//});

// app.get("/api/products/:id", async (req, res) => {
//   const {id} = req.params; 
//   try {
//     const product = await manager.getProductById(+id); 
//     if (!product){
//         return res
//         .status(404)
//         .json({message: "Product not found with the id provided"})
//     }
//     res.status(200).json({message: "Product found", product})
//   } catch (error) {
//     res.status(500).json({message: error.message})
//   }
// });

// app.post("/api/products", async (req, res) =>{
//     const {name, description, price} = req.body;
//     if(!name || !description || !price){
//         return res.status(400).json({message: "Some data is missing"})
//     }
//     try {
//         const response = await manager.addProduct(req.body)
//         res.status(200).json({message: "Submit product", product: response})
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// }); 

// app.put("/api/products/:idProduct", async (req, res) =>{
//     const {idProduct} = req.params; 
//     try {
//         const response = await manager.updateProduct(+idProduct, req.body)
//         if(!response){
//             return res
//             .status(404)
//             .json({message: "Product not found"})
//         }
//         res.status(200).json({message: "Update product"})
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })