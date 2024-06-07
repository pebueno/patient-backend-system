import express, { Request, Response } from 'express';
import Patient from '../../models/Patient';
import auth from '../../middleware/auth';

const router = express.Router();

// Register a new patient
router.post('/register', auth, async (req: Request, res: Response) => {
  const { email, name, dateOfBirth, gender, phone, maritalStatus, profession, cpf, address, appSettings } = req.body;

  try {
    let patient = await Patient.findOne({ cpf });

    if (patient) {
      return res.status(400).json({ msg: 'Patient already exists' });
    }

    patient = new Patient({
      email,
      name,
      dateOfBirth,
      gender,
      phone,
      maritalStatus,
      profession,
      cpf,
      address,
      appSettings,
    });

    await patient.save();
    res.json(patient);
  } catch (err: unknown) {
    const error = err as Error;
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Fetch patients by name, CPF, or email
router.get('/:identifier?', auth, async (req: Request, res: Response) => {
  const identifier = req.params.identifier;

  try {
    let query = {};
    if (identifier) {
      query = {
        $or: [
          { name: new RegExp(identifier, 'i') },
          { cpf: new RegExp(identifier, 'i') },
          { email: new RegExp(identifier, 'i') },
        ],
      };
    }

    const patients = await Patient.find(query);

    if (!patients.length) {
      return res.status(404).json({ msg: 'No patients found' });
    }

    res.json(patients);
  } catch (err: unknown) {
    const error = err as Error;
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;
