import express from 'express';
import {
    addService,
    deleteService,
    getAllServices,
    getServiceById,
    updateService
} from '../database/service-prisma-data-store';
import ServiceModel from "../models/ServiceModel";

const router = express.Router();

// Add a new service
router.post('/add', async (req, res) => {
    const { id, name, price, duration, description } = req.body;

    const newService = new ServiceModel(id, name, price, duration, description);

    try {
        const service = await addService(newService);
        res.status(201).json(service);
        console.log(service);
    } catch (err) {
        res.status(500).json({ error: 'Error adding service' });
    }
});

// Get all services
router.get('/get', async (req, res) => {
    try {
        const services = await getAllServices();
        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching services' });
    }
});

// Delete a service by ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await deleteService(id);
        res.status(200).json({ message: `Service ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting service' });
    }
});

// Update a service
router.put('/update', async (req, res) => {
    const { id, name, price, duration, description } = req.body;

    const updatedService = new ServiceModel(id, name, price, duration, description);

    try {
        await updateService(id, updatedService);
        res.status(200).json({ message: `Service ${id} updated successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Error updating service' });
    }
});

// Get a service by ID
// @ts-ignore
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await getServiceById(id);
        if (!patient) {
            return res.status(404).json({ error: 'service not found' });
        }
        res.status(200).json(patient);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching service' });
    }
});

export const serviceRoute = router;
