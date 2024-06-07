import mongoose, { Document, Schema } from 'mongoose';

interface Address {
  cep: string;
  address: string;
  number: string;
  complement: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
}

interface AppSettings {
  language: string;
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export interface Patient extends Document {
  email: string;
  name: string;
  dateOfBirth: Date;
  gender: string;
  phone: string;
  maritalStatus: string;
  profession: string;
  cpf: string;
  address: Address;
  appSettings: AppSettings;
}

const AddressSchema = new Schema<Address>({
  cep: { type: String, required: true },
  address: { type: String, required: true },
  number: { type: String, required: true },
  complement: { type: String },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  neighborhood: { type: String, required: true },
});

const AppSettingsSchema = new Schema<AppSettings>({
  language: { type: String, required: true },
  notificationPreferences: {
    email: { type: Boolean, required: true },
    sms: { type: Boolean, required: true },
    push: { type: Boolean, required: true },
  },
});

const PatientSchema = new Schema<Patient>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  profession: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  address: { type: AddressSchema, required: true },
  appSettings: { type: AppSettingsSchema, required: true },
});

const Patient = mongoose.model<Patient>('Patient', PatientSchema);

export default Patient;
