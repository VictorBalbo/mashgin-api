import express from "express"
import cors from "cors"
import { MenuController } from "./Controllers/Menu/MenuController"
import { OrderController } from "./Controllers/Order/OrderController"
import { errorHandler } from "./ErrorHandler"
import { port } from "./constanst"

export const App = express()

// Middlewares
App.use(express.json())
App.use(cors())

// Routes
App.get("/", (req, res) => {
	res.send("The API is running")
})

App.use(MenuController)
App.use(OrderController)

// Start Server
App.listen(port, () => {
	console.log(`[Server]: I am running at https://localhost:${port}`)
})

// Error Handlers
App.use(errorHandler)
