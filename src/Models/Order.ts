import { Item, ItemType } from "./Item"
import { Payment, PaymentType } from "./Payment"
import { z } from "zod"

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
