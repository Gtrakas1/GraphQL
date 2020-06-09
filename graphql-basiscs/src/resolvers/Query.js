const Query = {
    comments(parent,args,{db},info){
return db.comments
    },
    posts(parent, args, {db}, info) {
        if (!args.query) {
            return db.posts
        }
        return db.posts.filter((post) => {
            const isTitle = post.title.toLowerCase().includes(args.query.toLowerCase())
            const isBody = post.body.toLowerCase().includes(args.query.toLowerCase())
            return isTitle || isBody
        })

    },

    users(parent, args, {db}, info) {
        if (!args.query) {
            return db.users
        }
        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    me() {
        return {
            id: '123abc',
            name: 'Nick',
            email: 'nick@example',
            age: 29
        }
    },

    post() {
        return {
            id: '123456',
            title: 'Game of Thrones',
            body: 'A song of Ice and Fire',
            published: true

        }

    }

}

export {Query as default}