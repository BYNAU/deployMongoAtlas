const express = require("express")
const router = express.Router()
const dbConn = require("../bd.js")
const Userr = require("../models/Users.js")
const Producto = require("../models/Products.js")

router.get("/",(req,res) => {
    res.render('index')
})

router.get("/login",(req,res) => {
    res.render('login')
})

router.post("/login", async (req,res) => {
    if (req.body.nombre == "arnau"){
        const nombre = req.body.nombre
        res.render("welcome",{nombre})
    } else if (req.body.nombre == "admin"){
        res.render("adminpov")
    } else {
        res.redirect("/login")
    } 
})

router.get("/register",(req,res) => {
    res.render("register")
})

router.post("/register", async (req,res) => {
    

    const nuevoUsuario =  new Userr({
        nombre: req.body.nombre,
        contra: req.body.contra,
        correo: req.body.correo
    })
    await nuevoUsuario.save()
    res.redirect("/login")
})

router.get("/productos", async (req,res) => {
    const listadoProductos = await Producto.find({})
    res.render("verproductos", {listadoProductos})
})

router.get("/productos/editar", async (req,res) => {
    const listadoProductos2 = await Producto.find({})
    
    res.render("selectproduct.ejs", {listadoProductos2})
})

router.post("/productos/editar", async (req,res) => {
    const producto = req.body.nombre
    
    res.render("modificarproducto",{producto})
})

router.post("/modificado", async (req,res) => {
    let usuario = req.body.nombre

    let doc = await Producto.findOne({ nombre:usuario });

    await Producto.updateOne(doc, {nombre:usuario, foto:req.body.foto, descripcion:req.body.descripcion });
    res.redirect("/productos")
})



router.get("/anadirproducto",(req,res) => {
    console.log("entro al get")
    res.render("anadirproducto")
})

router.post("/anadirproducto", async (req,res) => {
    const nuevoProducto =  new Producto({
        nombre: req.body.nombre,
        foto: req.body.foto,
        descripcion: req.body.descripcion
    })
    await nuevoProducto.save()
})

router.get("/verusuarios", async (req,res) => {
    const listado = await Producto.find({})
    res.render("verusuario",{listado})
})

router.get("/verproductos", async (req,res) => {
    const listado = await Userr.find({})
    res.render("verusuario",{listado})
})










module.exports = router