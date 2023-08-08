import { z } from "zod"

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - category_id
 *         - id
 *         - image_id
 *         - name
 *         - price
 *         - quantity
 *       properties:
 *         category_id:
 *           type: number
 *           description: Id that represents the Category
 *         id:
 *           type: number
 *           description: Unique Id that represents the Item
 *         image_id:
 *           type: string
 *           description: Id of the item's image
 *         name:
 *           type: string
 *           description: Name of the item
 *         price:
 *           type: number
 *           description: Price of the item
 *         quantity:
 *           type: number
 *           description: Quantity of the item in the order
 *       example:
 *         category_id: 1,
 *         id: 1,
 *         image_id: 293202f9d9f7f4,
 *         name: Bagel,
 *         price: 2.0
 *         quantity: 1
 */
export interface Item {
	category_id: number
	id: number
	image_id: string
	name: string
	price: number,
	quantity: number
}

// Model that will be used to validate inputs
export const ItemType = z.object({
	category_id: z.number(),
	id: z.number(),
	image_id: z.string(),
	name: z.string(),
	price: z.number(),
	quantity: z.number().int(), 
})
