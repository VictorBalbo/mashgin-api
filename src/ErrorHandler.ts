import { NextFunction, Request, Response } from "express"
import { ZodError, ZodIssueBase } from "zod"

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err.name === ZodError.name) {
		const zodErrors = JSON.parse(err.message) as ZodIssueBase[]
		const zodError = zodErrors[0]

		const errorPath = zodError.path
			.filter((p) => typeof p === "string")
			.join(".")

		res.status(400).send({
			error: "Invalid request object",
			message: `${errorPath} ${zodError.message}`,
		})
	} else {
		console.error(err)
		res.status(500).send({
			error: "Internal Server Error",
			message: "The server has encontered an unexpected error",
		})
	}
	next()
}
