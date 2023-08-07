import { Router } from "express"
import { Order, OrderType } from "../../Models/Order"
import { gistUri, githubToken } from "../../constanst"

export const OrderController = Router()
const uri = "/order"

OrderController.post(uri, async (req, res, next) => {
	try {
		const order = req.body as Order
		validateOrder(order)

		await saveOrder(order)
		res.sendStatus(200)
	} catch (e) {
		next(e)
	}
})

OrderController.get(uri, async (req, res) => {
	const orders = await getOrders()
	res.send(orders)
})

/**
 * Check if and order is valid.
 * Throw an error for invalid orders.
 * @param order
 */
const validateOrder = (order: Order) => {
	OrderType.parse(order)
}

/**
 * Save Order to DateBase.
 * In a real application, this operation should be atomic.
 */
const saveOrder = async (order: Order) => {
	const orders = await getOrders()
	orders.push(order)

	const response = await fetch(gistUri, {
		method: "PATCH",
		headers: {
			"Authorization": `Bearer ${githubToken}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			files: { "orders.json": { content: JSON.stringify(orders) } },
		}),
	})
	if (!response.ok) {
		console.log(response.status, response.statusText)
		throw new Error("Unexpected error on saving Order")
	}
}

/**
 * Get Orders from DataBase
 * @returns List of all orders
 */
const getOrders = async () => {
	console.log(gistUri)

	const response = await fetch(gistUri)
	const {
		files: {
			"orders.json": { content },
		},
	} = await response.json()
	// const savedOrders = await readFile("./src/Controllers/Order/orders.json", {
	// 	encoding: "utf8",
	// })
	return JSON.parse(content) as Order[]
}
