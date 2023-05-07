const mongoose = require('mongoose');

const AnamneseSchema = new mongoose.Schema({
    clientId: { type: mongoose.Types.ObjectId, ref: 'Client' }, // Armazena o ObjectId do cliente relacionado à ficha de anamnese
    date: { type: Date, default: Date.now },
    form: {
        responsible: {
            name: { type: String },
            rg: { type: String },
            cpf: { type: String },
            relationship: { type: String }
        },
        tattoo: {
            bodyPart: { type: String, required: true },
            medicines: { type: String, required: true },
            hepatitis: { type: Boolean, default: false },
            hiv: { type: Boolean, default: false },
            hemophilia: { type: Boolean, default: false },
            cardiopathy: { type: Boolean, default: false },
            diabetes: { type: Boolean, default: false },
            lowPressure: { type: Boolean, default: false },
            highPressure: { type: Boolean, default: false },
            vitiligo: { type: Boolean, default: false },
            anemia: { type: Boolean, default: false },
            healingProblems: { type: Boolean, default: false },
            other: { type: String },
        },
        signature: { type: String }
    },
}, {
    versionKey: false,
    collection: "Anamnese"
});

const Anamnese = mongoose.model("Anamnese", AnamneseSchema);

module.exports = Anamnese;
