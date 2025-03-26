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
exports.customerRoute = void 0;
const express_1 = __importDefault(require("express"));
const customer_prisma_data_store_1 = require("../database/customer-prisma-data-store");
const CustomerModel_1 = __importDefault(require("../models/CustomerModel"));
const router = express_1.default.Router();
// Add a new customer
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, email, phone, notes } = req.body;
    const newCustomer = new CustomerModel_1.default(id, name, email, phone, notes);
    try {
        const customer = yield (0, customer_prisma_data_store_1.addCustomer)(newCustomer);
        res.status(201).json(customer);
    }
    catch (err) {
        res.status(500).json({ error: 'Error adding customer' });
    }
}));
// Get all customers
router.get('/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield (0, customer_prisma_data_store_1.getAllCustomers)();
        res.status(200).json(customers);
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching customers' });
    }
}));
// Delete a customer by ID
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, customer_prisma_data_store_1.deleteCustomer)(id);
        res.status(200).json({ message: `Customer ${id} deleted successfully` });
    }
    catch (err) {
        res.status(500).json({ error: 'Error deleting customer' });
    }
}));
// Update a customer
router.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, email, phone, notes } = req.body;
    const updatedCustomer = new CustomerModel_1.default(id, name, email, phone, notes);
    try {
        yield (0, customer_prisma_data_store_1.updateCustomer)(id, updatedCustomer);
        res.status(200).json({ message: `Customer ${id} updated successfully` });
    }
    catch (err) {
        res.status(500).json({ error: 'Error updating customer' });
    }
}));
// Get a patient by ID
// @ts-ignore
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const patient = yield (0, customer_prisma_data_store_1.getCustomerById)(id);
        if (!patient) {
            return res.status(404).json({ error: 'customer not found' });
        }
        res.status(200).json(patient);
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching customer' });
    }
}));
exports.customerRoute = router;
