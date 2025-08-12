import app from "../src/app.js"
import type {VercelRequest, VercelResponse} from "@vercel/node"

export default (req: VercelRequest, res: VercelResponse) => {
    app(req, res) // Express maneja la request como middleware
}
