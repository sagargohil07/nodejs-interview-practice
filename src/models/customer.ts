import mongoose, { Document, Schema } from "mongoose";

interface ICustomer extends Document {
  customerId: string;
  firstName: string;
  lastName: string;
  company: string;
  city: string;
  country: string;
  phone1: string;
  phone2: string;
  email: string;
  subscriptionDate: Date;
  website: string;
}

const CustomerSchema: Schema = new Schema<ICustomer>({
  customerId: { type: String, index: true },
  firstName: String,
  lastName: String,
  company: String,
  city: String,
  country: String,
  phone1: String,
  phone2: String,
  email: String,
  subscriptionDate: Date,
  website: String,
});

const customerModel = mongoose.model<ICustomer>("Customer", CustomerSchema);

export default customerModel;
