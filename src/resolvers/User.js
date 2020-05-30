import getUserId from '../utils/getuserid'


const User = {
    posts:{
        fragment: 'fragment userId on User { id}',
        resolve(parent,args, {prisma,request}, info){

            const userId= getUserId(request,false)
            return prisma.query.posts({
                where:{
                    published: true,
                    author:{
                        id: userId
                    }
                }
            })
        //     if(userID && userId === parent.id && parent.posts.published){
        //         return parent.author.posts
        //     }else{
        //         return null
        //     }
         }
    },
   email:{
    fragment: 'fragment userId on User { id }',
    resolve(parent,args, {request} , info){

        const userId=getUserId(request,false)
        if (userId && userId === parent.id) {
            return parent.email

        }else{
            return null
        }
    }
   }
}

export {User as default}