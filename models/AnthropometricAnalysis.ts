import mongoose, { Schema, Document } from 'mongoose';

interface IGeneral {
  height: number;
  weight: number;
  bmi: number;
}

interface ICircumference {
  waist: number;
  hip: number;
  arm: number;
}

export interface IAnthropometricAnalysis extends Document {
  patientId: string;
  general: IGeneral;
  circumferences: ICircumference;
}

const AnthropometricAnalysisSchema: Schema = new Schema({
  patientId: { type: String, required: true },
  general: {
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bmi: { type: Number, required: true }
  },
  circumferences: {
    waist: { type: Number, required: true },
    hip: { type: Number, required: true },
    arm: { type: Number, required: true }
  }
});

export default mongoose.model<IAnthropometricAnalysis>('AnthropometricAnalysis', AnthropometricAnalysisSchema);
