import { config } from "dotenv"

config()

export const gistUri = process.env.GIST_URI ?? "https://api.github.com/gists/e53ae3bf902479c6d5a88ca7741a955d"
export const githubToken = process.env.GITHUB_TOKEN ?? "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"
export const port = process.env.PORT ?? 3000
export const serverUri = process.env.SERVER_URI ?? "http://localhost:3000"
export const environment = process.env.ENV ?? "Development"
