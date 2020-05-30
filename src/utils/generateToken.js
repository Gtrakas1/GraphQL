import jwt from 'jsonwebtoken'
const generateToken = (userId)=>{
    return jwt.sign({userId},'mybestsecret',{ expiresIn: '7 days'})


}

export { generateToken as default}