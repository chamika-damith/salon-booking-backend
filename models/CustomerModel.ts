export default class CustomerModel {
    id: string;
    name: string;
    email: string;
    phone: string;
    notes: string;


    constructor(id: string, name: string, email: string, phone: string, notes: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.notes = notes;
    }
};