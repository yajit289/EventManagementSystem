import jwt from "jsonwebtoken"

export function jwtMiddleware(req, res, next) {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" })
  }

  const token = authHeader.split(" ")[1]

  try {

    const decoded = jwt.verify(token, process.env.SECERETE_KEY)

    req.user = decoded
    console.log("Authorization Header:", req.headers.authorization)

    next()

  } catch (error) {

    return res.status(401).json({ message: "Invalid token" })

  }
}

// generate token

export const generateTokenm = (userData)=>{
    return jwt.sign(userData,process.env.SECERETE_KEY,{expiresIn:"30d"})
}


