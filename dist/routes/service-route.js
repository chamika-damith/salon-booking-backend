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
exports.serviceRoute = void 0;
const express_1 = __importDefault(require("express"));
const service_prisma_data_store_1 = require("../database/service-prisma-data-store");
const ServiceModel_1 = __importDefault(require("../models/ServiceModel"));
const router = express_1.default.Router();
// Add a new service
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, price, duration, description } = req.body;
    const newService = new ServiceModel_1.default(id, name, price, duration, description);
    try {
        const service = yield (0, service_prisma_data_store_1.addService)(newService);
        res.status(201).json(service);
        console.log(service);
    }
    catch (err) {
        res.status(500).json({ error: 'Error adding service' });
    }
}));
// Get all services
router.get('/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield (0, service_prisma_data_store_1.getAllServices)();
        res.status(200).json(services);
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching services' });
    }
}));
// Delete a service by ID
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, service_prisma_data_store_1.deleteService)(id);
        res.status(200).json({ message: `Service ${id} deleted successfully` });
    }
    catch (err) {
        res.status(500).json({ error: 'Error deleting service' });
    }
}));
// Update a service
router.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, price, duration, description } = req.body;
    const updatedService = new ServiceModel_1.default(id, name, price, duration, description);
    try {
        yield (0, service_prisma_data_store_1.updateService)(id, updatedService);
        res.status(200).json({ message: `Service ${id} updated successfully` });
    }
    catch (err) {
        res.status(500).json({ error: 'Error updating service' });
    }
}));
// Get a service by ID
// @ts-ignore
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const patient = yield (0, service_prisma_data_store_1.getServiceById)(id);
        if (!patient) {
            return res.status(404).json({ error: 'service not found' });
        }
        res.status(200).json(patient);
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching service' });
    }
}));
exports.serviceRoute = router;
