import { config } from "dotenv"

config()
export const gistUri = process.env.GIST_URI ?? "https://api.github.com/gists/e53ae3bf902479c6d5a88ca7741a955d"
// Get this token from the email
export const githubToken = process.env.GITHUB_TOKEN ?? ""
export const port = process.env.PORT ?? 3000
export const serverUri = process.env.SERVER_URI ?? "http://localhost:3000"
export const environment = process.env.ENV ?? "Development"
