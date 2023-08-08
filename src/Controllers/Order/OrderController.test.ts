import Supertest, { type SuperTest, Test } from "supertest"
import { App } from "../../index"
import { type Server } from "http"
import { gistUri, githubToken } from "../../constanst"

describe("Order Endpoints", () => {
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

	const getGistEmptyResponse = {
		files: {
			"orders.json": {
				content: "[]",
			},
		},
	}
	const getGistResponse = {
		files: {
			"orders.json": {
				content:
					// eslint-disable-next-line quotes
					'[{"Items":[{"category_id":1,"id":2,"image_id":"808916fd5ddf96","name":"Croissant","price":1,"category_name":"Bakery","quantity":1}],"Total":1,"Payment":{"cardNumber":"1234567890123456","expirationDate":"2023-02-01T03:00:00.000Z","cvc":"123","cardName":"Victor Balbo"}}]',
			},
		},
	}

	const correctOrder = {
		Items: [
			{
				category_id: 1,
				id: 2,
				image_id: "808916fd5ddf96",
				name: "Croissant",
				price: 1,
				category_name: "Bakery",
				quantity: 1,
			},
		],
		Total: 1,
		Payment: {
			cardNumber: "1234567890123456",
			expirationDate: "2023-02-01T03:00:00.000Z",
			cvc: "123",
			cardName: "Victor Balbo",
		},
	}

	const wrongOrder = {
		Items: [
			{
				category_id: 1,
				id: 2,
				image_id: "808916fd5ddf96",
				name: "Croissant",
				price: 1,
				category_name: "Bakery",
			},
		],
		Total: 1,
		Payment: {
			cardNumber: "1234567890123456",
			expirationDate: "2023-02-01T03:00:00.000Z",
			cvc: "123",
			cardName: "Victor Balbo",
		},
	}

	it("GET /order should return empty", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve(getGistEmptyResponse),
				ok: true,
			})
		) as jest.Mock

		const res = await TestServer.get("/order")

		expect(res.status).toEqual(200)
		expect(res.type).toEqual("application/json")
		expect(res.body).toHaveLength(0)
	})

	it("GET /order should return orders", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve(getGistResponse),
				ok: true,
			})
		) as jest.Mock

		const res = await TestServer.get("/order")

		expect(res.status).toEqual(200)
		expect(res.type).toEqual("application/json")
		expect(res.body).toHaveLength(1)
		expect(res.body[0]).toHaveProperty("Items")
		expect(res.body[0]).toHaveProperty("Total")
		expect(res.body[0]).toHaveProperty("Payment")
	})

	it("GET /order should return error on fail to Gist request", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve(getGistResponse),
				ok: false,
			})
		) as jest.Mock

		const res = await TestServer.get("/order")

		expect(res.status).toEqual(500)
		expect(res.type).toEqual("application/json")
		expect(res.body).toHaveProperty("error")
		expect(res.body).toHaveProperty("message")
		expect(Server.listening).toBe(true)
	})

	it("POST /order save valid order should succed", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve(getGistEmptyResponse),
				ok: true,
			})
		) as jest.Mock

		const res = await TestServer.post("/order").send(correctOrder)

		expect(res.status).toEqual(200)
		expect(res.type).toEqual("text/plain")
		expect(res.body).toEqual({})
	})

	it("POST /order save invalid order should fail", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve(getGistEmptyResponse),
				ok: true,
			})
		) as jest.Mock

		const res = await TestServer.post("/order").send(wrongOrder)

		expect(res.status).toEqual(400)
		expect(res.type).toEqual("application/json")
		expect(res.body).toHaveProperty("error")
		expect(res.body).toHaveProperty("message")
	})

	it("POST /order save order send request to Gist", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve(getGistEmptyResponse),
				ok: true,
			})
		) as jest.Mock
		const expectedFetchConfig = {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${githubToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				files: { "orders.json": { content: JSON.stringify([correctOrder]) } },
			}),
		}

		const res = await TestServer.post("/order").send(correctOrder)

		expect(res.status).toEqual(200)
		expect(global.fetch).toHaveBeenCalledTimes(2)
		expect(global.fetch).lastCalledWith(gistUri, expectedFetchConfig)
	})

	it("POST /order save order should return error on request to Gist fail", async () => {
		global.fetch = jest
			.fn()
			// Mock first fetch call - Get orders from GIST
			.mockImplementationOnce(() =>
				Promise.resolve({
					json: () => Promise.resolve(getGistEmptyResponse),
					ok: true,
				})
			)
			// Mock second fetch call - Save orders on GIST
			.mockImplementationOnce(() =>
				Promise.resolve({
					json: () => Promise.resolve(getGistEmptyResponse),
					ok: false,
				})
			) as jest.Mock

		const res = await TestServer.post("/order").send(correctOrder)

		expect(res.status).toEqual(500)
		expect(global.fetch).toHaveBeenCalledTimes(2)
		expect(Server.listening).toBe(true)
	})
})
