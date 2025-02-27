import CustomerModel from "./CustomerModel";
import ServiceModel from "./ServiceModel";

export default class AppointmentModel {
    id: string;
    customer: CustomerModel;
    service: ServiceModel;
    date: string;
    time: string;
    status: "scheduled" | "completed" | "cancelled";

    constructor(
        id: string,
        customerId: CustomerModel,
        serviceId: ServiceModel,
        date: string,
        time: string,
        status: "scheduled" | "completed" | "cancelled"
    ) {
        this.id = id;
        this.customer = customerId;
        this.service = serviceId;
        this.date = date;
        this.time = time;
        this.status = status;
    }
}
