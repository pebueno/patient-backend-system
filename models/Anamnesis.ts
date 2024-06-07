import mongoose, { Schema, Document } from 'mongoose';

interface IDailyHabits {
  sleep: string;
  waterIntake: number;
  exerciseFrequency: string;
}

interface IPathology {
  name: string;
  description: string;
  diagnosisDate: Date;
}

interface IAssessment {
  date: Date;
  notes: string;
}

export interface IAnamnesis extends Document {
  patientId: string;
  dailyHabits: IDailyHabits;
  pathologies: IPathology[];
  assessments: IAssessment[];
}

const AnamnesisSchema: Schema = new Schema({
  patientId: { type: String, required: true },
  dailyHabits: {
    sleep: { type: String, required: true },
    waterIntake: { type: Number, required: true },
    exerciseFrequency: { type: String, required: true }
  },
  pathologies: [{
    name: { type: String, required: true },
    description: { type: String, required: true },
    diagnosisDate: { type: Date, required: true }
  }],
  assessments: [{
    date: { type: Date, required: true },
    notes: { type: String, required: true }
  }]
});

export default mongoose.model<IAnamnesis>('Anamnesis', AnamnesisSchema);
