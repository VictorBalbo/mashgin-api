import express from "express"
import cors from "cors"
import { MenuController } from "./Controllers/Menu/MenuController"
import { OrderController } from "./Controllers/Order/OrderController"
import { errorHandler } from "./ErrorHandler"
import { port, serverUri, environment } from "./constants"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

export const App = express()

// Middlewares
App.use(express.json())
App.use(cors())

// Routes
App.get("/", (req, res) => {
	res.send(
		`The API is running. Check <a href='${serverUri}/docs'>the swagger</a> for more information`
	)
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
App.use(
	"/docs",
	swaggerUi.serve,
	// @ts-ignore: Swagger Types incorrectly typed customJs as string not allowing an array, for this reason ignore next error
	swaggerUi.setup(specs, {
		explorer: true,
		customCssUrl:
			"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.3.1/swagger-ui.min.css",
		customJs: [
			"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.3.1/swagger-ui-bundle.js",
			"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.3.1/swagger-ui-standalone-preset.js",
		],
	})
)

// Start Server if not on test env
if (environment !== "Test") {
	App.listen(port, () => {
		console.log(`[Server]: I am running at http://localhost:${port}`)
	})
}

// Error Handlers
App.use(errorHandler)
