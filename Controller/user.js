const model = require('../Model/user');
//const generateJWT = require('../utils/authorization').generateJWT;
const hashPassword = require('../utils/authorization').hashPassword;
require('dotenv').config('../.env');
async function signup(req, res) {
    if (!req.body.email || !req.body.password || !req.body.name || !req.body.age
        || !req.body.gender || !req.body.self_intro ) {
          return res.status(400).send('Missing value');
      }
    // Move E-mail check first due to frontend validation progress
    const user = await model.getUser('email', req.body.email);

    if (user) {
        return res.status(400).send('Email already exists');
    }
    
    if (!req.body.email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
        return res.status(400).send('Invalid email format');
    }

    


    const { email, name, password, age, gender, badminton, basketball, volleyball, baseball, tennis, tabletennis, swimming, gym, self_intro} = req.body;
    const user_id = await model.createUser(email, name, hashPassword(password) ,age, gender, badminton, basketball, volleyball, baseball, tennis, tabletennis, swimming, gym,  self_intro )

    if (!user_id) {
        return res.status(500).send('Internal server error');
    }
    req.session.userId = user_id;
    return res.status(200).send({ user_id: user_id });
}

function signin(req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send('Missing value');
    }

    if (!req.body.email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
        return res.status(400).send('Invalid email format');
    }

    model.getUser('email', req.body.email).then((user) => {
        if (!user) {
            return res.status(400).send('Email does not exist');
        }

        if (user.password !== hashPassword(req.body.password)) {
            return res.status(400).send('Password does not match');
        }
        req.session.userId = user.user_id;
        const result = {
            user_id: user.user_id,
            name: user.Name,

        }
      console.log(result);
        return res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        return res.status(500).send('Internal server error');
    });
}

function updateProfile(req, res) {
    const userId = req.session.userId;
    const { name, email, self_intro, badminton, basketball, volleyball, tabletennis, baseball, tennis, swimming, gym } = req.body;

    model.updateUser(userId, name, email, self_intro, badminton, basketball, volleyball, tabletennis, baseball, tennis, swimming, gym)
        .then(() => {
            return res.status(200).json({ user_id: userId });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).send('Internal server error');
        });
}


// function updateProfile(req, res) {
//     const userId = req.session.userId;
//     const updates = req.body;

//     model.updateUser(userId, updates).then(() => {
//         return res.status(200).send({ user_id: userId });
//     }).catch((err) => {
//         console.log(err);
//         return res.status(500).send('Internal server error');
//     });
// }

async function updatePassword(req, res) {
    if (!req.body.old_password||!req.body.new_password) {
        return res.status(400).send('Missing value');
    }
    const userId = req.session.userId;
    try {
        const user = await model.findUserById(userId);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        if (user.password !== hashPassword(req.body.old_password)) {
            return res.status(400).send('Password does not match');
        }

        await model.updatePassword(userId, hashPassword(req.body.new_password));
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}

function updateProfilePicture(req, res) {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const userId = req.session.userId;
    const imageUrl = `https://${process.env.PUBLIC_IP}/static/${req.file.filename}`; // Assuming multer saves files with a filename

    model.updateProfilePicture(userId, imageUrl)
        .then(() => {
            return res.status(200).send({ imageUrl: imageUrl });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).send('Internal server error');
        });
}

async function getUserProfile(req, res) {
    const userId = req.query.userId || req.session.userId;

    try {
        const user = await model.getUser('user_id',userId);
        if (!user) {
            return res.status(404).json({ error: 'User not exist' });
        }

        const level = await model.getUserLevel(userId);
        const qrCodeData = await model.generateQRCode(user.user_id.toString());

        res.json({ 
            user_id: user.user_id, 
            name: user.Name, 
            gender: user.Gender,
            email: user.Email, 
            picture: user.picture, 
            badminton: level.Badminton, 
            basketball: level.Basketball,
            volleyball: level.Volleyball,
            baseball: level.Baseball,
            tabletennis: level.Tabletennis, 
            swimming: level.Swimming,
            tennis: level.Tennis,
            gym: level.Gym,
            qrcode: qrCodeData 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function logout(req, res) {
    req.session.destroy();
    res.json({ message: 'Logout successfully' });
}


module.exports = {
    signup,
    signin,
    updateProfile,
    updateProfilePicture,
    getUserProfile,
    updatePassword,
    logout
}
