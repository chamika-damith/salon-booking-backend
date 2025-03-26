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
exports.addCustomer = addCustomer;
exports.deleteCustomer = deleteCustomer;
exports.getAllCustomers = getAllCustomers;
exports.updateCustomer = updateCustomer;
exports.getCustomerById = getCustomerById;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Add a new customer
function addCustomer(c) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newCustomer = yield prisma.customer.create({
                data: {
                    name: c.name,
                    email: c.email,
                    phone: c.phone,
                    notes: c.notes,
                },
            });
            console.log('Customer Added:', newCustomer);
            return newCustomer;
        }
        catch (err) {
            console.log('Error adding customer:', err);
        }
    });
}
// Delete a customer by ID
function deleteCustomer(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.customer.delete({
                where: { id: id },
            });
            console.log('Customer deleted:', id);
        }
        catch (err) {
            console.log('Error deleting customer:', err);
        }
    });
}
// Get all customers
function getAllCustomers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.customer.findMany();
        }
        catch (err) {
            console.log('Error getting customers from Prisma:', err);
        }
    });
}
// Update a customer by ID
function updateCustomer(id, c) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedCustomer = yield prisma.customer.update({
                where: { id: id },
                data: {
                    name: c.name,
                    email: c.email,
                    phone: c.phone,
                    notes: c.notes,
                },
            });
            console.log('Customer updated:', updatedCustomer);
        }
        catch (err) {
            console.log('Error updating customer:', err);
        }
    });
}
// Get a customer by ID
function getCustomerById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.customer.findUnique({
                where: { id: id },
            });
        }
        catch (err) {
            console.log('Error fetching customer:', err);
        }
    });
}
