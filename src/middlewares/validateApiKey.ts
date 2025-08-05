import type {Request, Response, NextFunction} from "express"

const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
    const clientKey = req.headers["x-api-key"]
    const serverKey = process.env.API_KEY

    if (clientKey !== serverKey) {
        return res.status(403).json({error: "Unauthorized: Invalid API Key"})
    }

    next()
}

export default validateApiKey

// Desde el frontend
// const res = await fetch("https://tu-back.vercel.app/api/endpoint", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
//   },
//   body: JSON.stringify({ data: "..." }),
// });
