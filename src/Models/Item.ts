import { z } from "zod"

export interface Item {
	category_id: number
	id: number
	image_id: string
	name: string
	price: number
}

// Model that will be used to validate inputs
export const ItemType = z.object({
	category_id: z.number(),
	id: z.number(),
	image_id: z.string(),
	name: z.string(),
	price: z.number(),
})
