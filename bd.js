const mongoose = require("mongoose")
const uri = "mongodb+srv://byNAUHD:yRnl60p2p3C5TwAA@cluster0.bbxqvwn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const basededatos = async () => {
    await mongoose.connect(uri)
}

try {
    basededatos()
    mongoose.connection.on("open", () => {
        console.log("Conexion exitosa")
    })
} catch (error) {
    mongoose.connection.on("error", () => {
        console.log(error)
    })
}

module.exports = basededatos()