import { Request, Response } from 'express';
import { Log } from '../utils/logger';

export const calculateAverage = async (req: Request, res: Response) => {
  const { numbers } = req.body;

  if (!Array.isArray(numbers)) {
    await Log("backend", "error", "handler", "Invalid input: numbers should be an array");
    return res.status(400).json({ error: "Input must be an array of numbers." });
  }

  if (numbers.length === 0) {
    await Log("backend", "warn", "handler", "Empty array provided");
    return res.status(400).json({ error: "Array cannot be empty." });
  }

  const invalid = numbers.some(num => typeof num !== 'number');
  if (invalid) {
    await Log("backend", "error", "handler", "Array contains non-number values");
    return res.status(400).json({ error: "All elements must be numbers." });
  }

  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  const average = sum / numbers.length;

  await Log("backend", "info", "service", `Average calculated: ${average}`);

  return res.status(200).json({ average });
};
