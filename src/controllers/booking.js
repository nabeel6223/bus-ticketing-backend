import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { busData } from '../utils/bus-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOOKINGS_FILE = path.join(__dirname, '../utils/bookings.json');

const readBookings = () => {
  if (!fs.existsSync(BOOKINGS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
  return data.trim() === '' ? [] : JSON.parse(data);
};

const writeBookings = (bookings) => {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
};


export const placeBooking = (req,res)=>{
    try{
    const {
        busId,
        name,
        mobile,
        email,
        passengers = [],
        seats
    } = req.body;
// Basic validation
    if (!busId || !name || !mobile) {
      return res.status(400).json({
        success: false,
        message: "busId, name, and mobile are required"
      });
    }
    console.log(req.body)

    //cross check if seats are available or not

    // Load existing bookings
    const bookings = readBookings();
 
    // Generate PNR (e.g., BKG1001, BKG1002...)
    const newBookingId = bookings.length > 0 
      ? Math.max(...bookings.map(b => b.bookingId)) + 1 
      : 1001;

    const pnr = `TKT${newBookingId}`;

    // Create booking object
    const newBooking = {
      bookingId: newBookingId,
      pnr,
      busId: Number(busId),
      name: name.trim(),
      mobile: mobile.trim(),
      email: email?.trim() || null,
      // age: Number(age) || null,
      seats: seats,
      passengerDetails: passengers || [{ name, age, seatNo: null }], // fallback
      bookingDate: new Date().toISOString(),
      status: "CONFIRMED"
    };

    // Add to bookings array
    bookings.push(newBooking);

    // Save to file
    writeBookings(bookings);
    // Success response
    return res.status(201).json({
      error: false,
      message: "Booking confirmed!",
      bookingId: newBookingId
    });


    }catch(e){
        console.log(e)
return res.status(500).json({

      error: true,
      message: "Failed to place booking. Please try aain."
    });
    }
}

export const fetchBooking = (req,res)=>{
    try{
    const {
      id
    } = req.query;
    if (!id) {
      return res.status(400).json({
        error: true,
        message: "busId is required"
      });
    }

    //cross check if seats are available or not

    // Load existing bookings
    const bookings = readBookings();
 
    let reqbooking = bookings.filter(b => b.bookingId == id);
    reqbooking = reqbooking[0]
    let filteredBuses = busData;
    filteredBuses = filteredBuses.filter(bus => bus.id == reqbooking.busId);
    reqbooking['busData'] = filteredBuses[0]
    // Success response
    return res.status(200).json({
      error: false,
      message: "Fetched!",
      data: reqbooking
    });


    }catch(e){
        console.log(e)
return res.status(500).json({

      error: true,
      message: "Failed to fetch booking. Please try aain."
    });
    }
}