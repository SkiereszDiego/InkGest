const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    client: { type: String, required: true },
    session_date: { type: Date, required: true },
    tattoo: { type: String },
    value: { type: String },
    tattooArtist: { type: String },
    duration: { type: String },
    totalCost: { type: String },
    supplyUsed: { type: String }
}, {
    versionKey: false,
    collection: "Session"
});

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session;
