import express, { Request, Response } from 'express';
import AnthropometricAnalysis from '../../models/AnthropometricAnalysis';
import auth from '../../middleware/auth';

const router = express.Router();

// Register Anthropometric Analysis
router.post('/register', auth, async (req: Request, res: Response) => {
  const { patientId, general, circumferences } = req.body;

  try {
    const analysis = new AnthropometricAnalysis({
      patientId,
      general,
      circumferences
    });

    await analysis.save();
    res.json(analysis);
  } catch (err: unknown) {
    const error = err as Error;
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;
