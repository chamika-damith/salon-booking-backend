import { PrismaClient } from '@prisma/client';
import ServiceModel from "../models/ServiceModel";

const prisma = new PrismaClient();

// Add a new service
export async function addService(s: ServiceModel) {
    try {
        const newService = await prisma.service.create({
            data: {
                name: s.name,
                price: s.price,
                duration: s.duration,
                description: s.description,
            },
        });
        console.log('Service Added:', newService);
        return newService;
    } catch (err) {
        console.log('Error adding service:', err);
    }
}

// Delete a service by ID
export async function deleteService(id: string) {
    console.log(id)
    try {
        await prisma.service.delete({
            where: { id: id },
        });
        console.log('Service deleted:', id);
    } catch (err) {
        console.log('Error deleting service:', err);
    }
}

// Get all services
export async function getAllServices() {
    try {
        return await prisma.service.findMany();
    } catch (err) {
        console.log('Error getting services from Prisma:', err);
    }
}

// Update a service by ID
export async function updateService(id: string, s: ServiceModel) {
    try {
        const updatedService = await prisma.service.update({
            where: { id: id },
            data: {
                name: s.name,
                price: s.price,
                duration: s.duration,
                description: s.description,
            },
        });
        console.log('Service updated:', updatedService);
    } catch (err) {
        console.log('Error updating service:', err);
    }
}

// Get a customer by ID
export async function getServiceById(id: string) {
    try {
        return await prisma.service.findUnique({
            where: { id: id },
        });
    } catch (err) {
        console.log('Error fetching customer:', err);
    }
}