import express from 'express';
import { addAppointment, deleteAppointment, getAllAppointments, updateAppointment } from '../database/appointment-prisma-data-store';
import AppointmentModel from "../models/AppointmentModel";

const router = express.Router();

// Add a new appointment
router.post('/add', async (req, res) => {
    const { id, customer, service, date, time, status } = req.body;

    const newAppointment = new AppointmentModel(id, customer, service, date, time, status);

    try {
        const appointment = await addAppointment(newAppointment);
        res.status(201).json(appointment);
    } catch (err) {
        res.status(500).json({ error: 'Error adding appointment' });
    }
});

// Get all appointments
router.get('/get', async (req, res) => {
    try {
        const appointments = await getAllAppointments();
        console.log(appointments);
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching appointments' });
    }
});

// Delete an appointment by ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await deleteAppointment(id);
        res.status(200).json({ message: `Appointment ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting appointment' });
    }
});

// Update an appointment by ID
router.put('/update', async (req, res) => {
    const { id, customer, service, date, time, status } = req.body;

    const updatedAppointment = new AppointmentModel(id, customer, service, date, time, status);

    try {
        await updateAppointment(id, updatedAppointment);
        res.status(200).json({ message: `Appointment ${id} updated successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Error updating appointment' });
    }
});

export const appointmentRoute = router;
