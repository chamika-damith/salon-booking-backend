"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceModel {
    constructor(id, name, price, duration, description, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.duration = duration;
        this.description = description;
        this.image = image;
    }
}
exports.default = ServiceModel;
