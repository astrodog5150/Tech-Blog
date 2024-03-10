import sequelize from '../config/connection.js'
import User from '../models/user.js';
import Post from '../models/post.js';
import Comment from '../models/comment.js'



import userData from './userData.json';
import postData from './blogPosts.json';
import commentData from './commentData.json';

const seedDatabase = async () => {
    await sequelize.sync({ force: true })
    
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    })
    console.log(users)

    for (const post of postData) {
        console.log(post)
        await Post.create({
            ...post,
            userId: users[Math.floor(Math.random() * users.length)].id
        })
    }
    const posts = await Post.findAll()
    for (const comment of commentData) {
        await Comment.create({
            ...comment,
            postId: posts[Math.floor(Math.random() * posts.length)].id,
            userId: users[Math.floor(Math.random() * users.length)].id
        })
    }
    process.exit(0)
}
seedDatabase()