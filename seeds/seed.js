const sequelize = require('../config/connection.js');
const User = require('../models/user.js');
const Post = require('../models/post.js');
const Comment = require('../models/comment.js');

const userData = require('./userData.json');
const postData = require('./blogPosts.json');
const commentData = require('./commentData.json');

// Seed the database
const seedDatabase = async () => {
    // Sync the models
    await sequelize.sync({ force: true });

    // Create users
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    console.log(users);

    // Create posts
    for (const post of postData) {
        console.log(post);
        const randomUser = users[Math.floor(Math.random() * users.length)];

        await Post.create({
            ...post,
            userId: randomUser.id,
            username: randomUser.username,
        });
    }

    // Get all posts
    const posts = await Post.findAll();

    // Create comments
    for (const comment of commentData) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomPost = posts[Math.floor(Math.random() * posts.length)];

        await Comment.create({
            ...comment,
            userId: randomUser.id,
            username: randomUser.username,
            postId: randomPost.id,
        });
    }

    // Exit the process
    process.exit(0);
};

// Execute the seedDatabase function
seedDatabase();