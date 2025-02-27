import express from 'express';
import {
    addCustomer,
    deleteCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer
} from '../database/customer-prisma-data-store';
import CustomerModel from "../models/CustomerModel";

const router = express.Router();

// Add a new customer
router.post('/add', async (req, res) => {
    const { id, name, email, phone, notes } = req.body;

    const newCustomer = new CustomerModel(id, name, email, phone, notes);

    try {
        const customer = await addCustomer(newCustomer);
        res.status(201).json(customer);
    } catch (err) {
        res.status(500).json({ error: 'Error adding customer' });
    }
});

// Get all customers
router.get('/get', async (req, res) => {
    try {
        const customers = await getAllCustomers();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching customers' });
    }
});

// Delete a customer by ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await deleteCustomer(id);
        res.status(200).json({ message: `Customer ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting customer' });
    }
});

// Update a customer
router.put('/update', async (req, res) => {
    const { id, name, email, phone, notes } = req.body;

    const updatedCustomer = new CustomerModel(id, name, email, phone, notes);

    try {
        await updateCustomer(id, updatedCustomer);
        res.status(200).json({ message: `Customer ${id} updated successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Error updating customer' });
    }
});

// Get a patient by ID
// @ts-ignore
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await getCustomerById(id);
        if (!patient) {
            return res.status(404).json({ error: 'customer not found' });
        }
        res.status(200).json(patient);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching customer' });
    }
});

export const customerRoute = router;
