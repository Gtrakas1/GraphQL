import '@babel/polyfill'
import seeDatabase, {user1,user2,post1,comment1,comment2} from './utils/seeDatabase'
import 'cross-fetch/polyfill'
import getClient from './utils/getClient'
import prisma from '../src/prisma'
import { deleteComment,subscribeToComments } from './utils/operations'
import { extractFragmentReplacements } from 'prisma-binding'

const client=getClient()

beforeEach(seeDatabase)

test('Should delete a comment',async()=>{
    const client= getClient(user1.jwt)

    const variables={
        id: comment2.comment.id,
       
    }


    await client.mutate({ mutation: deleteComment,variables})
    const exists= await prisma.exists.Comment({id: comment2.comment.id})

    expect(exists).toBe(false)
})

test('Should not delete comment. Needs authentication',async () =>{
    const client= getClient(user1.jwt)

    const variables={
        id: comment1.comment.id
    }

    await expect(
        client.mutate({mutation: deleteComment,variables})
    ).rejects.toThrow()
   
})

test('Should subscribe to comments for a post', async(done)=>{
const variables={
    postId: post1.post.id
}

 client.subscribe({query: subscribeToComments,variables}).subscribe({
     next(response){
        expect(response.data.comment.mutation).toBe('DELETED')        
         done()
     }
 })

 await prisma.mutation.deleteComment({where: {id: comment1.comment.id}})
})
