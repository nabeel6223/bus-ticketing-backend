import express from 'express';
import { getBusDetails, getBuses } from './controllers/bus.js';
import { CheckAPIKey } from './middlewares/check-api-key.js';
import { fetchBooking, placeBooking } from './controllers/booking.js';
const router = express.Router();

router.get('/buses', [CheckAPIKey], getBuses )
router.get('/bus', [CheckAPIKey], getBusDetails )

router.post('/booking', [CheckAPIKey],placeBooking)
router.get('/booking', [CheckAPIKey],fetchBooking)



export default router; 
