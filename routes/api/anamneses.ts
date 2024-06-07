import express, { Request, Response } from 'express';
import Anamnesis from '../../models/Anamnesis';
import auth from '../../middleware/auth';

const router = express.Router();

// Register Anamnesis
router.post('/register', auth, async (req: Request, res: Response) => {
  const { patientId, dailyHabits, pathologies, assessments } = req.body;

  try {
    const anamnesis = new Anamnesis({
      patientId,
      dailyHabits,
      pathologies,
      assessments
    });

    await anamnesis.save();
    res.json(anamnesis);
  } catch (err: unknown) {
    const error = err as Error;
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;
