const router = require('express').Router()
const { User, Comment } = require('../../models')
const withAuth = require('../../utils/auth')

router.post('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }
        });

        const user = userData.get({ plain: true });

        const commentData = {
            post_id: req.body.id,
            comment: req.body.comment,
            username: user.username,
            user_id: req.session.user_id
        }

        const newComment = await Comment.create(commentData)

        res.status(200).json(newComment)
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router