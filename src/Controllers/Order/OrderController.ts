import { Router } from "express"
import { Order, OrderType } from "../../Models/Order"
import { gistUri, githubToken } from "../../constanst"

export const OrderController = Router()
const uri = "/order"

/**
 * @swagger
 * tags:
 *   name: Order
 * /order:
 *   post:
 *     summary: Save an order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order Saved Sucessfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: OK
 *       400:
 *         description: Request body was not correctly formated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 *             example:
 *               error: Invalid request object,
 *               message: Items.quantity Required,
 *       500:
 *         description: Unexpected error processing the order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 *             example:
 *               error: Internal Server Error,
 *               message: The server has encontered an unexpected error,
 */
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

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all orders placed
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Got all orders placed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
OrderController.get(uri, async (req, res, next) => {
	try {
		const orders = await getOrders()
		res.send(orders)
	} catch (e) {
		next(e)
	}
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
			Authorization: `Bearer ${githubToken}`,
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
	const response = await fetch(gistUri)
	if (!response.ok) {
		throw new Error("Unexpected error on getting Orders")
	}
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
