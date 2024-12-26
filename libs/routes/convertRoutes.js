import { Router } from 'express';
import { convertController } from '../controllers/convertController.js';

const convertRouter = Router();

convertRouter.post('/csv', convertController.convertToCSVAPI);
convertRouter.post('/pdf', convertController.convertToPDFAPI);


export { convertRouter };