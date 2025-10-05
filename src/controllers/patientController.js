import mongoose from 'mongoose';
import Patient from '../models/patientModel.js';

export const addPatient = async(req,res)=>{
    const {name,date_of_birth,address} = req.body;
    try {
        const patient = await Patient.create({name, date_of_birth,address,user : req.userId});
        res.status(201).json(patient);
    } catch (error) {
        res.status(400).json({message:"Invalid Request"});
    }
}
export const getPateint = async(req,res)=>{
    try {
        const patients = await Patient.find({user : req.userId});
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
}
export const getPatientById = async(req,res)=>{
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid patient ID' });
        const patient = await Patient.findOne({ _id: req.params.id, user: req.userId }).populate('doctors', 'name specialty');
        if (!patient) return res.status(404).json({ error: 'Patient not found' });
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
}
