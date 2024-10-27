const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email: { type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
});

const adminSchema = new Schema({
    email: { type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
});

const employeeSchema = new Schema({
    email: { type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
});

const serviceSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId   // worker id 
});

const purchaseSchema = new Schema({
    userId: ObjectId,
    serviceId: ObjectId
});

const userModel = mongoose.model('user', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const employeeModel = mongoose.model('employee', employeeSchema);
const serviceModel = mongoose.model('service', serviceSchema);
const purchaseModel = mongoose.model('purchase', purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    employeeModel,
    serviceModel,
    purchaseModel
}