import express from "express"
import productRouter from "./src/routes/products.routes.js"
import cartRouter from "./src/routes/carts.routes.js"
import { __dirname } from "./src/utils.js"

const app = express(); 
const server = 8080; 

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static( __dirname + "/public"));

//Routes
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)

app.listen(8080, ()=>{
    console.log(`Escuchando al puerto ${server}`)
})