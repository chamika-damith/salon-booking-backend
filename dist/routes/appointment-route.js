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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentRoute = void 0;
const express_1 = __importDefault(require("express"));
const appointment_prisma_data_store_1 = require("../database/appointment-prisma-data-store");
const AppointmentModel_1 = __importDefault(require("../models/AppointmentModel"));
const router = express_1.default.Router();
// Add a new appointment
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, customer, service, date, time, status } = req.body;
    const newAppointment = new AppointmentModel_1.default(id, customer, service, date, time, status);
    try {
        const appointment = yield (0, appointment_prisma_data_store_1.addAppointment)(newAppointment);
        res.status(201).json(appointment);
    }
    catch (err) {
        res.status(500).json({ error: 'Error adding appointment' });
    }
}));
// Get all appointments
router.get('/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointment_prisma_data_store_1.getAllAppointments)();
        console.log(appointments);
        res.status(200).json(appointments);
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching appointments' });
    }
}));
// Delete an appointment by ID
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, appointment_prisma_data_store_1.deleteAppointment)(id);
        res.status(200).json({ message: `Appointment ${id} deleted successfully` });
    }
    catch (err) {
        res.status(500).json({ error: 'Error deleting appointment' });
    }
}));
// Update an appointment by ID
router.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, customer, service, date, time, status } = req.body;
    const updatedAppointment = new AppointmentModel_1.default(id, customer, service, date, time, status);
    try {
        yield (0, appointment_prisma_data_store_1.updateAppointment)(id, updatedAppointment);
        res.status(200).json({ message: `Appointment ${id} updated successfully` });
    }
    catch (err) {
        res.status(500).json({ error: 'Error updating appointment' });
    }
}));
exports.appointmentRoute = router;
