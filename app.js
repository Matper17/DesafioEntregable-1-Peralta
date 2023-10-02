import express from "express"
import productsRouter from "./src/routes/products.routes.js"
import cartsRouter from "./src/routes/carts.routes.js"
import { __dirname } from "./src/utils.js"

const app = express(); 
const server = 8080; 

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static( __dirname + "/public"));

//Routes
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

app.listen(8080, ()=>{
    console.log(`Escuchando al puerto ${server}`)
})