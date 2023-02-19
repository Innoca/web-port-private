

const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes") // new

mongoose
.set('strictQuery', false)
.connect("mongodb://localhost:27017/testing1", { useNewUrlParser: true })
	.then(() => {
		const app = express()
        app.use(express.json())
		app.use("/api", routes)

		app.listen(2011, () => {
            console.log('Server has started!')
        })
	})


