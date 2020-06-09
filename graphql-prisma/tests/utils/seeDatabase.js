import prisma from '../../src/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const user1 = {
    input: {
        name: 'Sara',
        email: 'Sara@example.com',
        password: bcrypt.hashSync('Red23456')

    },
    user: undefined,
    jwt: undefined
}
const user2 = {
    input:{
    name: 'George',
    email: 'George@example.com',
    password: bcrypt.hashSync('Mypass23')
    },
    user: undefined,
    jwt: undefined
}
const post1 ={
    input:{
        title: 'This is a published title',
        body:'...',
        published: true
       

    },
    post: undefined
}

const post2 ={
    input:{
        title: 'This is a published post from user1',
        body:'...',
        published: true
       

    },
    post: undefined
}

 const comment1 ={
     input:{
         text: "This is a reply to post 1 by user2",
     },
     comment: undefined
 }

 const comment2 ={
    input:{
        text: "This is a reply to post 1 by user1",
    },
    comment: undefined
}

const seeDatabase = async() =>{
    await prisma.mutation.deleteManyComments()
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()
    

    user1.user = await prisma.mutation.createUser({
        data:user1.input
    })
    user1.jwt=jwt.sign({userId: user1.user.id},process.env.PRISMA_TOKEN)

    user2.user= await prisma.mutation.createUser({
        data:user2.input
    })

    user2.jwt=jwt.sign({userId: user2.user.id },process.env.PRISMA_TOKEN)

   post1.post = await prisma.mutation.createPost({
        data:{
            ...post1.input,
        author:{
            connect:{
                id: user1.user.id
            }
        }
    }

    })

   post2.post = await prisma.mutation.createPost({data:{
        ...post2.input,
        author:{
            connect:{
                id: user1.user.id
            }
        }
    }

    })

    comment1.comment= await prisma.mutation.createComment({
        data:{
             ...comment1.input,
             author: {
                connect:{
                    id: user2.user.id
                }
             },
        post: {
         connect: {
             id: post1.post.id
        }
        }
    }
       
    })

    comment2.comment= await prisma.mutation.createComment({
        data:{
             ...comment2.input,
         author:{
             connect: {
                 id: user1.user.id
             }
         },
        post: {
         connect: {
             id: post1.post.id
        }
        }
    }
       
    })


}

export{ seeDatabase as default, user1,user2, post1, post2,comment1,comment2}