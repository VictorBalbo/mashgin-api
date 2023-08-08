import { Router } from "express"
import Menu from "./menu.json"

export const MenuController = Router()
const uri = "/menu"

/**
 * @swagger
 * tags:
 *   name: Menu
 * /menu:
 *   get:
 *     tags: [Menu]
 *     summary: Get menu items
 *     responses:
 *       200:
 *         description: Got all menu items
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 */
MenuController.get(uri, async (req, res) => {
	const menu = await getMenu()
	res.json(menu)
})

/**
 * Get the menu from DataBase
 * @returns Menu
 */
const getMenu = async () => {
	return Promise.resolve(Menu)
}
