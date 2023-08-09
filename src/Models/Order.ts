import { Item, ItemType } from "./Item"
import { Payment, PaymentType } from "./Payment"
import { z } from "zod"

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - items
 *         - Total
 *         - Payment
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Item'
 *         total:
 *           type: number
 *           description: Total value for all the items in the order
 *         payment:
 *           description: Method of Payment
 *           $ref: '#/components/schemas/Payment'
 *       example:
 *         items:
 *           - category_id: 1
 *             id: 1
 *             image_id: 293202f9d9f7f4
 *             name: "Bagel"
 *             price: 2.0
 *             quantity: 1
 *         total: 2.0
 *         payment:
 *           cardNumber: "1234567890123456"
 *           cvc: "321"
 *           expirationDate: 2023-08-07T01:08:30.677Z
 *           cardName: "Victor Balbo"
 */
export interface Order {
	items: Item[]
	total: number
	payment: Payment
}

// Model that will be used to validate inputs
export const OrderType = z.object({
	items: z.array(ItemType).nonempty(),
	total: z.number().positive().safe(),
	payment: PaymentType,
})
