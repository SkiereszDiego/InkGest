const Session = require("../model/session_model");

exports.list = async (req, res) => {
    try {
        const sessions = await Session.find();
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ Error: err });
    }
};

exports.findById = async (req, res) => {
    const id = req.params.id;

    try {
        const foundSession = await Session.findById(id);
        if (foundSession) {
            return res.json(foundSession);
        } else {
            return res.status(404).json({ Error: "Session not found" });
        }
    } catch (err) {
        res.status(500).json({ Error: err });
    }
};

exports.createSession = async (req, res) => {
    // Receive the session data
    const sessionRequest = req.body;

    // Validate the data
    if (
        !sessionRequest ||
        !sessionRequest.tattoo ||
        !sessionRequest.value ||
        !sessionRequest.tattooArtist ||
        !sessionRequest.duration ||
        !sessionRequest.totalCost
    ) {
        const formattedSessionRequest = {
            ...sessionRequest,
            session_date: new Date(sessionRequest.session_date),
        };
        console.log('Formatted Session Request:', formattedSessionRequest);

        const newSession = new Session(formattedSessionRequest);

        try {
            const savedSession = await newSession.save();
            return res.status(201).json({
                ...savedSession._doc,
                session_date: formattedSessionRequest.session_date.toISOString().split('T')[0],
            });
        } catch (err) {
            res.status(500).json({ Error: err });
        }
    } else {
        return res.status(400).json({
            Error: "Todos os campos obrigatórios devem ser fornecidos."
        });
    }
};




exports.updateSessionById = async (req, res) => {
    const id = req.params.id;
    const sessionToUpdate = req.body;

    if (
        !sessionToUpdate ||
        !sessionToUpdate.tattoo ||
        !sessionToUpdate.value ||
        !sessionToUpdate.tattooArtist ||
        !sessionToUpdate.duration ||
        !sessionToUpdate.totalCost
    ) {
        return res.status(400).json({
            Error: "Client date are required"
        });
    }

    try {
        const updatedSession = await Session.findByIdAndUpdate(id, sessionToUpdate, { new: true });
        if (updatedSession) {
            return res.json(updatedSession);
        } else {
            return res.status(404).json({ Error: "Session not found" });
        }
    } catch (err) {
        res.status(500).json({ Error: err });
    }
};

exports.deleteSessionById = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedSession = await Session.findByIdAndDelete(id);
        if (deletedSession) {
            return res.json(deletedSession);
        } else {
            return res.status(404).json({ Error: "Session not found" });
        }
    } catch (err) {
        res.status(500).json({ Error: err });
    }
};
