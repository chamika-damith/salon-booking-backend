import { PrismaClient } from '@prisma/client';
import CustomerModel from "../models/CustomerModel";

const prisma = new PrismaClient();

// Add a new customer
export async function addCustomer(c: CustomerModel) {
    try {
        const newCustomer = await prisma.customer.create({
            data: {
                name: c.name,
                email: c.email,
                phone: c.phone,
                notes: c.notes,
            },
        });
        console.log('Customer Added:', newCustomer);
        return newCustomer;
    } catch (err) {
        console.log('Error adding customer:', err);
    }
}

// Delete a customer by ID
export async function deleteCustomer(id: string) {
    try {
        await prisma.customer.delete({
            where: { id: id },
        });
        console.log('Customer deleted:', id);
    } catch (err) {
        console.log('Error deleting customer:', err);
    }
}

// Get all customers
export async function getAllCustomers() {
    try {
        return await prisma.customer.findMany();
    } catch (err) {
        console.log('Error getting customers from Prisma:', err);
    }
}

// Update a customer by ID
export async function updateCustomer(id: string, c: CustomerModel) {
    try {
        const updatedCustomer = await prisma.customer.update({
            where: { id: id },
            data: {
                name: c.name,
                email: c.email,
                phone: c.phone,
                notes: c.notes,
            },
        });
        console.log('Customer updated:', updatedCustomer);
    } catch (err) {
        console.log('Error updating customer:', err);
    }
}

// Get a customer by ID
export async function getCustomerById(id: string) {
    try {
        return await prisma.customer.findUnique({
            where: { id: id },
        });
    } catch (err) {
        console.log('Error fetching customer:', err);
    }
}