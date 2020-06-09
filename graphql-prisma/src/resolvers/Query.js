import getUserId from '../utils/getuserid'

const Query = {
    comments(parent, args, { prisma }, info) {
        return prisma.query.comments({
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }, info)

    },

    myPosts(parent,args, { prisma,request}, info){
        const userId= getUserId(request)

        
        const opArgs ={
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
        
            where: {
                author: {
                    id: userId
                }
            }
        }
        if(args.query){
        opArgs.where.OR ={
            OR:[{
                title_contains: args.query
            },{
                body_conatains: args.query
            }
        ]
        }
    }

    return prisma.query.posts(opArgs,info)

    
    },
    posts(parent, args, { prisma }, info) {

        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
            where: {
                published: true
            }
        }

        if (args.query) {
            opArgs.where.OR = {

                OR: [{
                    title_contains: args.query
                }, {
                    body_conatains: args.query
                }]

            }
        }
        return prisma.query.posts(opArgs, info)

    },

    users(parent, args, { prisma }, info) {

        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }
        if (args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }]
            }

        }
        return prisma.query.users(opArgs, info)

    },
    me(parent, args, { prisma, request }) {
        const userId = getUserId(request)

        return prisma.query.user({
            where: {
                id: userId
            }
        })

    },

    async post(parent, args, { prisma, request }, info) {
        const userId = getUserId(request, false)

        const posts = await prisma.query.posts({
            where: {
                id: args.id,
                OR: [{
                    published: true
                }, {
                    author: {
                        id: userId
                    }
                }]
            }
        }, info)
        if (posts.length === 0) {
            throw new Error('Post not Found')
        }

        return posts[0]
    }

}

export { Query as default }