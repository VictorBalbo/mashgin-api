import { z } from "zod"

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
