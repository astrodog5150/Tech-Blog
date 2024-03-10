const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
    });

    const user = userData.get({ plain: true });

    const postData = {
      ...req.body,
      username: user.username,
      user_id: user.id
    }
    
    const newPost = await Post.create(postData);

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
    })

    const user = userData.get({ plain: true })

    Post.update(
      {
        ...req.body
      },
      {
        where: {
          id: req.body.id
        }
      }
    )

    document.location.replace('/dashboard')
  } catch (err) {
    res.status(400).json(err)
  }
})

router.delete('/', (req, res) => {
  try {
    Post.destroy({
      where: {
        id: req.body.id
      }
    })

    document.location.replace('/dashboard')
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router;