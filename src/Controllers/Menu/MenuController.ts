import { Router } from "express"
import Menu from "./menu.json"

export const MenuController = Router()
const uri = "/menu"

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
