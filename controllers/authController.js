const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const utils = require('../utils/keys')
const User = require('../models').User
const signIn = async (req, res) => {
    try {
        const {username, password} = req.body;

        let candidate = await User.findOne({where: {username}});

        if (!candidate) return res.send({
            success: false,
        });

        const areSame = await bcrypt.compare(password, candidate.password);
        if (!areSame) return res.send({
            success: false,
        });

        const token = jwt.sign(
            {id: candidate.id, role: candidate.role},
            utils.keys.JWT_SECRET
        );

        candidate.set({token})
        await candidate.save()

        return res.send({success: true, token})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

module.exports = {
    signIn
}