import { Router } from 'express';
import { convertController } from '../controllers/convertController.js';

const convertRouter = Router();

convertRouter.post('/csv', convertController.convertToCSV);
convertRouter.post('/pdf', convertController.convertToPDF);


export { convertRouter };