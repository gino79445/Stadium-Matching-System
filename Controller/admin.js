const model = require('../Model/admin'); // Assuming you have a corresponding model
const hashPassword = require('../utils/authorization').hashPassword;
const { uploadBlob } = require('../utils/azureBlobService');
const fs = require('fs').promises;

async function signin(req, res) {

    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).send('Missing email or password');
    }

    try {
        // Authenticate the admin
        
        const adminUser = await model.authenticateAdmin(email, hashPassword(password));

        if (adminUser) {
            req.session.userId = adminUser.user_id; 
            return res.status(200).json({ user_id: adminUser.user_id, admin: adminUser.admin });
        } else {
            res.status(401).json({ error: 'Authentication failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function stadiumavailable(req, res) {
    const userId = req.session.userId;
    const { name, category, max_capacity, address, rule, price } = req.body;
    const bathroom = req.body.bathroom || 1;
    const available = req.body.available || 1;
    const air_condition = req.body.air_condition || 1;
    const vending = req.body.vending || 1;
    const water = req.body.water || 1;
    let localImageUrl = null;
    let azureImageUrl = null;

    if (req.file) {
        localImageUrl = `https://${process.env.PUBLIC_IP}/static/${req.file.filename}`; // Local image URL

        try {
            // Read the file from disk
            const fileBuffer = await fs.readFile(req.file.path);

            // Upload to Azure Blob Storage
            const blobName = req.file.originalname; // Or any unique name
            azureImageUrl = await uploadBlob(fileBuffer, blobName);

            // Optionally, delete the local file after uploading to Azure
            await fs.unlink(req.file.path);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error uploading file to Azure Blob Storage' });
        }
    }

    try {
        const stadiumId = await model.createStadium(userId, name, category, max_capacity, address, rule, price, available, bathroom, air_condition, vending, water, azureImageUrl);
        res.status(201).json({ stadium_id: stadiumId, local_image_url: localImageUrl, azure_image_url: azureImageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
async function listStadiums(req, res) {
    const userId = req.session.userId; // Acquire user_id from the session
    try {
        const stadiums = await model.listStadiumsByAdmin(userId);
        res.json({ stadium: stadiums });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
async function fetchFeedback(req, res) {
    const adminId = req.session.userId; // Assuming admin ID is stored in the session
    const feedbackId = req.params.feedback_id; // Could be a specific ID or 'all'

    try {
        const feedback = await model.getFeedback(adminId, feedbackId);
        if (feedback.length > 0) {
            res.json({ feedback });
        } else {
            res.status(404).json({ error: 'No feedback found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
async function setFeedbackRead(req, res) {
    const adminId = req.session.userId; // Assuming admin ID is stored in the session
    const feedbackId = req.params.feedback_id;

    try {
        await model.setFeedbackRead(adminId, feedbackId);
        res.status(200).json({ feedback_id: feedbackId });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { signin, stadiumavailable, listStadiums, fetchFeedback, setFeedbackRead};
