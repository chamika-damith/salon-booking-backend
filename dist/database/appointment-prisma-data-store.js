"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAppointment = addAppointment;
exports.deleteAppointment = deleteAppointment;
exports.getAllAppointments = getAllAppointments;
exports.updateAppointment = updateAppointment;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Add a new appointment
function addAppointment(a) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newAppointment = yield prisma.appointment.create({
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
        }
        catch (err) {
            console.log('Error adding appointment:', err);
        }
    });
}
// Delete an appointment by ID
function deleteAppointment(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.appointment.delete({
                where: { id: id },
            });
            console.log('Appointment deleted:', id);
        }
        catch (err) {
            console.log('Error deleting appointment:', err);
        }
    });
}
// Get all appointments
function getAllAppointments() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.appointment.findMany({
                include: {
                    customer: true,
                    service: true,
                },
            });
        }
        catch (err) {
            console.log('Error getting appointments from Prisma:', err);
        }
    });
}
// Update an appointment by ID
function updateAppointment(id, a) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedAppointment = yield prisma.appointment.update({
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
                    date: new Date(a.date).toISOString(),
                    time: a.time,
                    status: a.status,
                },
            });
            console.log('Appointment updated:', updatedAppointment);
        }
        catch (err) {
            console.log('Error updating appointment:', err);
        }
    });
}
