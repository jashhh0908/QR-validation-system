//to verify the token exists 

import Participant from '../model/participant.model.js';

export const verifyToken = async (req, res) => {
    try {
        const { token } = req.params;

        if(!token){
            return res.status(404).json({ error: "Token not provided"})
        }

        const participant = await Participant.findOne({token});
        if(!participant) return res.status(404).json({error: "Invalid Token"});

        res.status(200).json({
            message: "Token is valid",
            participant
        })
    } catch (error) {
        console.log("Error verifying token:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
