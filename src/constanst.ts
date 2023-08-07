import {config} from "dotenv"

config()

export const gistUri = process.env.GIST_URI ?? ""
export const githubToken = process.env.GITHUB_TOKEN ?? ""
export const port = process.env.PORT ?? 3000
