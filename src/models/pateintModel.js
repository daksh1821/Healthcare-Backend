import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    // Link to the user who created this patient record
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // An array of doctors assigned to this patient
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }]
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;