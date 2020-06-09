import {gql} from 'apollo-boost'

const createUser= gql`
mutation($data:CreateUserInput!){
   createUser(data: $data){
        user{
        id,
        name
        email
        },
        token
       
    }
}
`

const getAuthor = gql`
        query{
        users{
            id
            name
            email
        }
        
        }

    `

const login = gql`
    mutation($data:LoginUserInput!){
        login(
            data:$data){
                token
            }
        }
    
 `  

const getProfile= gql`
query{
    me{
        id
        name
        email
    }
}`

const getPublished = gql`
query{
   posts{
        id
        title
        body
        published
        author{
            name
        }
   }
} 
`

const getMyPosts=gql`
query{
    myPosts{
        id
        title
        body
        published
        }
    }
`
const createPost=gql`
    mutation($data:CreatePostInput!){
        createPost(
            data:$data
        ){
            id
            title
            body
            published
            author{
                id
                name
            }
        }
    }`

const updatePost= gql`
      mutation($id:ID!, $data:UpdatePostInput!){
          updatePost(id: $id,
           data: $data
             ){
              id
              title
              body
              published
          }
      }`

      const deletePost= gql`
      mutation($id: ID!){
          deletePost(
              id: $id
          ){
              id
          }
      }
  `

const deleteComment= gql`
mutation($id: ID!){
    deleteComment(
        id: $id
    ){
        text
    }
}
`
const subscribeToComments = gql`
subscription($postId: ID!){
    comment(postId: $postId){
        mutation
        node{
            id
            text
        }
    }
}`

const subscribeToPosts = gql`
subscription{
    post{
        mutation
        node{
            id
            title
            body
            author{
                id
                name
            }
        }
    }
}`
export{
    createUser,
    getAuthor,
    login,
    getProfile,
    getPublished,
    getMyPosts,
    createPost,
    updatePost,
    deletePost,
    deleteComment,
    subscribeToComments,
    subscribeToPosts
}

