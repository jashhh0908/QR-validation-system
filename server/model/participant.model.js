import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        default: null,
    },
    year: {
        type: String,
        default: null,
    },
    token: {
        type: String,
        unique: true,
        required: true,
    },
    qrUrl: {
        type: String,
        required: true,
    },
    registrationTime: {
        type: Date,
        default: Date.now,
    },
    isCheckedIn: {
        type: Boolean,
        required: true,
        default: false,
    },
    checkedInAt: {
        type: Date,
    }
});

const Participant = mongoose.model("Participant", participantSchema);

export default Participant;
