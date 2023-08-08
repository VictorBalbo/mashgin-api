import { z } from "zod"

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - cardNumber
 *         - cvc
 *         - expirationDate
 *         - cardName
 *       properties:
 *         cardNumber:
 *           type: number
 *           description: Credit card number
 *         cvc:
 *           type: number
 *           description: Credit card verification code
 *         expirationDate:
 *           type: string
 *           description: Credit card expiration date
 *         cardName:
 *           type: string
 *           description: Name in the Credit card
 *       example:
 *         cardNumber: 1234567890123456,
 *         cvc: 321,
 *         expirationDate: 2023-08-07T01:08:30.677Z,
 *         cardName: Victor Balbo
 */
export interface Payment {
	cardNumber: string
	cvc: string
	expirationDate: string
	cardName: string
}

// Model that will be used to validate inputs
export const PaymentType = z.object({
	cardNumber: z.string().length(16),
	cvc: z.string().length(3),
	expirationDate: z.string().datetime(),
	cardName: z.string().min(5),
})
