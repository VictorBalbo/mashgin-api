import Supertest, { type SuperTest, Test } from "supertest"
import { App } from "../../index"
import { type Server } from "http"

describe("Menu Endpoints", () => {
	let TestServer: SuperTest<Test>
	let Server: Server

	beforeAll(() => {
		const port = Math.floor(Math.random() * 1000)
		const basePort = 5000
		
		Server = App.listen(basePort + port)
		TestServer = Supertest(App)
	})
	afterAll(() => {
		Server.close()
	})

	it("GET /menu should show all categories and items", async () => {
		const res = await TestServer.get("/menu")

		expect(res.status).toEqual(200)
		expect(res.type).toEqual("application/json")
		expect(res.body).toHaveProperty("items")
		expect(res.body).toHaveProperty("categories")
	})
})
