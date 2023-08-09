import Supertest, { type SuperTest, Test } from "supertest"
import { type Server } from "http"
import { App } from "."

describe("Server", () => {
	let TestServer: SuperTest<Test>
	let Server: Server

	beforeAll(() => {
		// Prevent port colision beetween tests
		const port = Math.floor(Math.random() * 1000)
		const basePort = 5000

		Server = App.listen(basePort + port)
		TestServer = Supertest(App)
	})
	afterAll(() => {
		Server.close()
	})

	it("GET / should present docs endpoint", async () => {
		const res = await TestServer.get("/")

		expect(res.status).toEqual(200)
		expect(res.type).toEqual("text/html")
		expect(res.text).toBe("The API is running. Run the API locally and see the docs at <a href='http://localhost:3000/docs'>http://localhost:3000/docs</a>")
	})
})
