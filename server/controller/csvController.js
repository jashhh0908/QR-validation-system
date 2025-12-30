import Participant from "../model/participant.model.js";
import fs from "fs";
import csv from "csv-parser";
import { generateandUploadQRCode } from "../utils/qrGenerator.js";
import mail from "../utils/mailer.js";
import { registrationEmailTemplate } from "../utils/emailTemplate.js";

const generateUniqueToken = async () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token;

  while (true) {
    token = Array.from({ length: 5 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");

    const exists = await Participant.findOne({ token });
    if (!exists) break; 
  }

  return token;
};

const importData = async (req, res) => {
    const filePath = req.file.path;
    try {
        if(!req.file)
            return res.status(400).json({error: "Please upload a CSV File"});
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", async () => {
                const importTasks = results.map(async (row) => {
                    try {
                        const name = (row.name || row.Name).trim();
                        const email = (row.email || row.Email).trim();
                        const phone = (row.phone || row.Phone).trim();
                        const branch = (row.branch || row.Branch).trim();
                        const year = (row.year || row.Year).trim();

                        const importData = async (req, res) => {
    const filePath = req.file.path;
    try {
        if(!req.file)
            return res.status(400).json({error: "Please upload a CSV File"});
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", async () => {
                const importTasks = results.map(async (row) => {
                    try {
                        const name = (row.name || row.Name).trim();
                        const email = (row.email || row.Email).trim();
                        const phone = (row.phone || row.Phone).trim();
                        const branch = (row.branch || row.Branch).trim();
                        const year = (row.year || row.Year).trim();

                        if(!email) 
                            return { status: 'failed', reason: 'No email found' };

                        const existing = await Participant.findOne({ email });
                        if(existing) {
                            console.log(`Skipping ${email} - Already exists.`);
                            return { status: 'skipped', email };
                        }
                        const token = await generateUniqueToken();
                        const qrData = { name, email, phone, branch, year, token};

                        const qrURL = await generateandUploadQRCode(qrData, `${name}_${token}`);
                        await Participant.create({
                            ...qrData,
                            qrUrl: qrURL,
                        });

                        const html = registrationEmailTemplate(name, qrURL, token);
                        mail(email, "Registration Successful", html);

                        return { status: 'success', email };
                    } catch (err) {
                        return { status: 'error', email: row.email, message: err.message };
                    }
                });
                const finalUpload = await Promise.allSettled(importTasks);
                if(fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                }
                const added = finalUpload.filter(r => r.value?.status === 'success').length;
                const skipped = finalUpload.filter(r => r.value?.status === 'skipped').length;
                console.log(`Import finished. Added: ${added}, Skipped: ${skipped}`)
                res.status(200).json({ message: `Import finished. Added: ${added}, Skipped: ${skipped}` });
            });
    } catch (error) {
        if(fs.existsSync(filePath)) 
            fs.unlinkSync(filePath)
        console.error("Error importing CSV:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
                        const existing = await Participant.findOne({ email });
                        if(existing) {
                            console.log(`Skipping ${email} - Already exists.`);
                            return { status: 'skipped', email };
                        }
                        const token = await generateUniqueToken();
                        const qrData = { name, email, phone, branch, year, token};

                        const qrURL = await generateandUploadQRCode(qrData, `${name}_${token}`);
                        await Participant.create({
                            ...qrData,
                            qrUrl: qrURL,
                        });

                        const html = registrationEmailTemplate(name, qrURL, token);
                        mail(email, "Registration Successful", html);

                        return { status: 'success', email };
                    } catch (err) {
                        return { status: 'error', email: row.email, message: err.message };
                    }
                });
                const finalUpload = await Promise.allSettled(importTasks);
                if(fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                }
                const added = finalUpload.filter(r => r.value?.status === 'success').length;
                const skipped = finalUpload.filter(r => r.value?.status === 'skipped').length;
                console.log(`Import finished. Added: ${added}, Skipped: ${skipped}`)
                res.status(200).json({ message: `Import finished. Added: ${added}, Skipped: ${skipped}` });
            });
    } catch (error) {
        if(fs.existsSync(filePath)) 
            fs.unlinkSync(filePath)
        console.error("Error importing CSV:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const confirmCheckIn = async (req, res) => {
    try {
        const { token } = req.params;
        const participant = await Participant.findOne({token});
        if(!participant) {
            return res.status(404).json({error: "No participant found"})
        }
        if(participant.isCheckedIn) { 
            return res.status(400).json({
                error: "Participant is already checked-in",
                participant
            });
        }
        participant.isCheckedIn = true;
        participant.checkedInAt = Date.now();
        
        await participant.save();

        res.status(200).json({
            message: "Participant check-in successful",
            participant
        })
    } catch (error) {
        console.error("Error checking in:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const confirmCheckOut = async (req, res) => {
    try {
        const { token } = req.params;
        const participant = await Participant.findOne({token});
        if(!participant) {
            return res.status(404).json({error: "No participant found"})
        }
        if(!participant.isCheckedIn) { 
            return res.status(400).json({
                error: "Participant is already checked-out",
                participant
            });
        }
        participant.isCheckedIn = false;
        
        await participant.save();

        res.status(200).json({
            message: "Participant check-out successful",
            participant
        })
    } catch (error) {
        console.error("Error checking out:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
//developer testing purpose only
const deleteAllParticipants = async (req, res) => {
    try {
        await Participant.deleteMany({});
        res.status(200).json({ message: "All participants deleted successfully" });
    } catch (error) {
        console.error("Error deleting participants:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const getParticipants = async (req, res) => {
    try {
        const people = await Participant.find({});
        if(people.length === 0) {
            return res.status(404).json({error: "No participant found"});
        }
        res.status(200).json({
            message: "Successful",
            participants: people
        })
    } catch (error) {
        console.error("Error fetching participants:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteOneParticipant = async (req, res) => {
    try {
        const { id } = req.params;
        await Participant.findByIdAndDelete(id);
        res.status(200).json({ message: "Participant deleted successfully" });
    } catch (error) {
        console.error("Error deleting participant:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }   
};
export { importData, deleteAllParticipants, deleteOneParticipant, getParticipants, confirmCheckIn, confirmCheckOut};
