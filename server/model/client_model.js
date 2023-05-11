const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    cpf: { type: String, required: true },
    rg: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    address: {
        street: { type: String },
        number: { type: String },
        complement: { type: String },
        neighborhood: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String }
    },
    socialMedia: {
        instagram: { type: String },
        other: { type: String }
    },
    anamnesisForms: [
        {
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
            },
        signature: { type: String }
        }
    ]
}, {
    versionKey: false,
    collection: "Client"
});

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;