import { Prisma } from 'prisma-binding' 
import {fragmentReplacements} from './resolvers/index'

const prisma= new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    fragmentReplacements
})

export{ prisma as default}

// prisma.query, prisma.mutation, prisma.subscription, prisma.exists


// const creatPostForUser = async (authorId, data) => {
//     const UserExists = await prisma.exists.User({id: authorId})

//     if(!UserExists){
//         throw new Error('User not found')
//     }

//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect:{
//                     id: authorId 
//                 }
//             }
//         }
//     }, '{ id author{ id name email post { id title published} } }')
    
// return post.author
// }
// // creatPostForUser('ckalt7gm2006a0858msthn3bf', {
// //     title: 'Great books to Read',
// //     body: 'Game of Thrones',
// //     published: true
// // }).then((user)=>{
// //     console.log(JSON.stringify(user,undefined,2)
// //     )
// // }).catch((error)=>{
// //     console.log(error.message)
// // })

// const updatePostForUser = async(postId, data) => {
//     const postExists= await prisma.exists.Post({id: postId})

//     if(!postExists){
//         throw new Error('Post not found');
        
//     }


//     const post = await prisma.mutation.updatePost({
//         where:{
//             id: postId
//         },
//         data
//     }, '{id title author { id name email post {id title published}}  }')
        
    
   
// return post.author

// }

// // updatePostForUser("ckan1okb5007w0858lfpf5pmj", {title: 'Graphql 101',published: false}).then((user)=>{
// //     console.log(JSON.stringify(user,undefined,2))
// // }).catch((error)=>{
// //         console.log(error.message)
// //         })



