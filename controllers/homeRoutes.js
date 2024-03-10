const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//dashbaord
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    const postData = await Post.findAll({
      where: {
        username: user.username
      }
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// view a post
router.get('/viewpost/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment }]
    })

    const post = postData.get({ plain: true })

    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id
      }
    })

    const comments = commentData.map((comment) => comment.get({ plain: true }))

    let login_status
    if (req.session.user_id) {
      login_status = true
    }

    res.render('viewpost', {
      post,
      comments,
      logged_in: login_status,
      add_comment: false
    })
  } catch (err) {
    res.status(400).json(err)
  }
})

//login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

//signup
router.get('/signup', (req, res) => {
  res.render('signup');
});

//createpost
router.get('/createpost', (req, res) => {
  res.render('newpost', {
    logged_in: true
  });
});

//udpate post
router.get('/updatepost/:id', async (req, res) => {
  const postData = await Post.findByPk(req.params.id)

  const post = postData.get({ plain: true })

  res.render('updatepost', {
    post,
    logged_in: true
  })
})

module.exports = router;