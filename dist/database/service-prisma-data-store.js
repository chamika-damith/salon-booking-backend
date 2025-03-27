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
exports.addService = addService;
exports.deleteService = deleteService;
exports.getAllServices = getAllServices;
exports.updateService = updateService;
exports.getServiceById = getServiceById;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Add a new service
function addService(s) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newService = yield prisma.service.create({
                data: {
                    name: s.name,
                    price: s.price,
                    duration: s.duration,
                    description: s.description,
                    image: s.image,
                },
            });
            console.log('Service Added:', newService);
            return newService;
        }
        catch (err) {
            console.log('Error adding service:', err);
        }
    });
}
// Delete a service by ID
function deleteService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(id);
        try {
            yield prisma.service.delete({
                where: { id: id },
            });
            console.log('Service deleted:', id);
        }
        catch (err) {
            console.log('Error deleting service:', err);
        }
    });
}
// Get all services
function getAllServices() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.service.findMany();
        }
        catch (err) {
            console.log('Error getting services from Prisma:', err);
        }
    });
}
// Update a service by ID
function updateService(id, s) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedService = yield prisma.service.update({
                where: { id: id },
                data: {
                    name: s.name,
                    price: s.price,
                    duration: s.duration,
                    description: s.description,
                    image: s.image,
                },
            });
            console.log('Service updated:', updatedService);
        }
        catch (err) {
            console.log('Error updating service:', err);
        }
    });
}
// Get a customer by ID
function getServiceById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma.service.findUnique({
                where: { id: id },
            });
        }
        catch (err) {
            console.log('Error fetching customer:', err);
        }
    });
}
