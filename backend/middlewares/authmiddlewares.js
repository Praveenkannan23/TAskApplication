import jwt from  "jsonwebtoken"

export const authenticate = (req, res, next) => {

    const token = req.header.authorization?.split("")[1]

    if(!token){
        return res.status(401).json({msg:"Token not found"})
    }
    try{
        const decoded = jwt.verify(token,"Praveen")
        req.user= decoded
        next()
    }catch(error){
        console.log(error)
        res.status(401).json({msg:"Invalid token"})
    }
}
export default authenticate