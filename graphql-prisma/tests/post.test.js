import '@babel/polyfill'
import 'cross-fetch/polyfill'
import  {gql} from 'apollo-boost'
import seeDatabase, {user1,post1,post2, user2} from './utils/seeDatabase'
import getClient from './utils/getClient'
import prisma from '../src/prisma'
import { getPublished,getMyPosts,createPost,updatePost, deletePost,subscribeToPosts } from './utils/operations'

const client=getClient()

beforeEach(seeDatabase)

test('Should expose published posts',async()=>{

   
  const response = await client.query({query: getPublished})
      expect(response.data.posts.length).toBe(2)
      expect(response.data.posts[0].published).toBe(true)
  })

  test('Should fetch user1 posts',async () =>{
      const client=getClient(user1.jwt)

     
const { data } = await client.query({query: getMyPosts})

expect(data.myPosts.length).toBe(2)
  })

  
  test('Should be able to update post',async()=>{
      const client = getClient(user1.jwt)
      const variables={ id: post1.post.id,
      data:{
          title: "This is an updated published post from user1"
      }}
      

      const { data } = await client.mutate({mutation: updatePost,variables})
      const exists = await prisma.exists.Post({id: post1.post.id, published:true})
      
      expect(data.updatePost.published).toBe(false)
      expect(exists).toBe(true)
      
  })

  test('Should create a Post',async () =>{
    const client=getClient(user1.jwt)

    const variables={    data:{
        title: "Test created post",
        body: "...",
        published: true
    }
}

    
    const { data } = await client.mutate({mutation: createPost,variables})
    const exists = await prisma.exists.Post({id: user1.id})

    expect(exists).toBe(true)
  })

  test('Should delete a post',async()=>{
    const client=getClient(user1.jwt)
    const variables = {
        id: post2.post.id
    }

    

await client.mutate({mutation: deletePost, variables})
const exists= await prisma.exists.Post({id: post2.post.id})

expect(exists).toBe(false)

  })

  test('Should subcribe to posts for a user', async(done)=>{
    
   client.subscribe({query:subscribeToPosts}).subscribe({
       next(response){
           expect(response.data.post.mutation).toBe('DELETED')
           done()

       }
   }) 
    
      await prisma.mutation.deletePost({where:{id:post1.post.id}})
  })



  