import express from "express"
import cors from "cors"
import { MenuController } from "./Controllers/Menu/MenuController"
import { OrderController } from "./Controllers/Order/OrderController"
import { errorHandler } from "./ErrorHandler"
import { port, serverUri } from "./constanst"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

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

const options = {
	definition: {
		openapi: "3.1.0",
		info: {
			title: "Mashgin API",
			version: "1.0.0",
			description: "This is checkout application made with Express",
			license: {
				name: "MIT",
				url: "https://spdx.org/licenses/MIT.html",
			},
			contact: {
				name: "Victor Balbo",
				email: "victor@victorbalbo.com",
			},
		},
		servers: [
			{
				url: serverUri,
			},
		],
	},
	apis: ["./src/Controllers/**/*.ts", "./src/Models/**/*.ts"],
}
const specs = swaggerJsdoc(options)
App.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))

// Start Server
App.listen(port, () => {
	console.log(`[Server]: I am running at https://localhost:${port}`)
})

// Error Handlers
App.use(errorHandler)
