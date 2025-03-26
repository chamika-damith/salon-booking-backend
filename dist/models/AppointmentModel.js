"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppointmentModel {
    constructor(id, customerId, serviceId, date, time, status) {
        this.id = id;
        this.customer = customerId;
        this.service = serviceId;
        this.date = date;
        this.time = time;
        this.status = status;
    }
}
exports.default = AppointmentModel;
