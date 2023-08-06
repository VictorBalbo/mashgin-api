import { Router } from "express"
import { Order, OrderType } from "../../Models/Order"
import { writeFile, readFile } from "fs/promises"

export const OrderController = Router()
const uri = "/order"

OrderController.post(uri, async (req, res, next) => {
	try {
		const order = req.body as Order
		console.log(order)
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

	await writeFile("./src/Controllers/Order/orders.json", JSON.stringify(orders))
}

/**
 * Get Orders from DataBase
 * @returns List of all orders
 */
const getOrders = async () => {
	const savedOrders = await readFile("./src/Controllers/Order/orders.json", {
		encoding: "utf8",
	})
	return JSON.parse(savedOrders) as Order[]
}
