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
 *         - Item
 *         - Total
 *         - Payment
 *       properties:
 *         Item:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Item'
 *         Total:
 *           type: number
 *           description: Total value for all the items in the order
 *         Payment:
 *           description: Method of Payment
 *           $ref: '#/components/schemas/Payment'
 *       example:
 *         Items:
 *           - category_id: 1
 *             id: 1
 *             image_id: 293202f9d9f7f4
 *             name: "Bagel"
 *             price: 2.0
 *             quantity: 1
 *         Total: 2.0
 *         Payment:
 *           cardNumber: "1234567890123456"
 *           cvc: "321"
 *           expirationDate: 2023-08-07T01:08:30.677Z
 *           cardName: "Victor Balbo"
 */
export interface Order {
	Items: Item[]
	Total: number
	Payment: Payment
}

// Model that will be used to validate inputs
export const OrderType = z.object({
	Items: z.array(ItemType).nonempty(),
	Total: z.number().positive().safe(),
	Payment: PaymentType,
})
