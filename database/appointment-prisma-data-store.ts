import { PrismaClient } from '@prisma/client';
import AppointmentModel from "../models/AppointmentModel";

const prisma = new PrismaClient();

// Add a new appointment
export async function addAppointment(a: AppointmentModel) {
    try {
        const newAppointment = await prisma.appointment.create({
            data: {
                customer: {
                    connect: {
                        id: a.customer.id
                    }
                },
                service: {
                    connect: {
                        id: a.service.id
                    }
                },
                date: new Date(a.date).toISOString(),
                time: a.time,
                status: a.status,
            },
        });
        console.log('Appointment Added:', newAppointment);
        return newAppointment;
    } catch (err) {
        console.log('Error adding appointment:', err);
    }
}

// Delete an appointment by ID
export async function deleteAppointment(id: string) {
    try {
        await prisma.appointment.delete({
            where: { id: id },
        });
        console.log('Appointment deleted:', id);
    } catch (err) {
        console.log('Error deleting appointment:', err);
    }
}

// Get all appointments
export async function getAllAppointments() {
    try {
        return await prisma.appointment.findMany({
            include: {
                customer: true,
                service: true,
            },
        });
    } catch (err) {
        console.log('Error getting appointments from Prisma:', err);
    }
}

// Update an appointment by ID
export async function updateAppointment(id: string, a: AppointmentModel) {
    try {
        const updatedAppointment = await prisma.appointment.update({
            where: { id: id },
            data: {
                customer: {
                    connect: {
                        id: a.customer.id
                    }
                },
                service: {
                    connect: {
                        id: a.service.id
                    }
                },
                date:new Date(a.date).toISOString(),
                time: a.time,
                status: a.status,
            },
        });
        console.log('Appointment updated:', updatedAppointment);
    } catch (err) {
        console.log('Error updating appointment:', err);
    }
}
