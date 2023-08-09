import { z } from "zod"

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - card_number
 *         - cvc
 *         - expiration_date
 *         - card_name
 *       properties:
 *         card_number:
 *           type: number
 *           description: Credit card number
 *         cvc:
 *           type: number
 *           description: Credit card verification code
 *         expiration_date:
 *           type: string
 *           description: Credit card expiration date
 *         card_name:
 *           type: string
 *           description: Name in the Credit card
 *       example:
 *         card_number: 1234567890123456,
 *         cvc: 321,
 *         expiration_date: 2023-08-07T01:08:30.677Z,
 *         card_name: Victor Balbo
 */
export interface Payment {
	card_number: string
	cvc: string
	expiration_date: string
	card_name: string
}

// Model that will be used to validate inputs
export const PaymentType = z.object({
	card_number: z.string().length(16),
	cvc: z.string().length(3),
	expiration_date: z.string().datetime(),
	card_name: z.string().min(5),
})
