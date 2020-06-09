const users = [{
    id: '1',
    name: 'George',
    email: 'george@example.com',
    age: 27
}, {
    id: '2',
    name: 'Sarah',
    email: 'sara@example.com',
    age: 29
}, {
    id: '3',
    name: 'Victoris',
    email: 'victoria@example.com',
    age: 28
}]

const posts = [{
    id: '10',
    title: 'The Walking Dead',
    body: 'Zombies',
    published: false,
    author: '2',
    comments: '5'

}, {
    id: '20',
    title: 'The Ozarks',
    body: 'A family is forced into buisness with the Cartel',
    published: true,
    author: '1',
    comments: '7'

}, {
    id: '30',
    title: 'Star Trek',
    body: 'The Enterprise takes a journey through the galaxy',
    published: true,
    author: '3',
    comments: '6'

}]

const comments=[{
    id: '5',
    text: 'This is comment 1',
    author: '2',
    post: '10',
},{
    id: '6',
    text: 'This is comment 2',
    author: '1',
    post: '20'
},{
    id: '7',
    text: 'This is comment 3',
    author: '3',
    post: '30'
},{
    id: '8',
    text: 'This is comment 4',
    author: '3',
    post: '30'
}]

const db = {
    users,
    posts,
    comments
}

export {db as default}