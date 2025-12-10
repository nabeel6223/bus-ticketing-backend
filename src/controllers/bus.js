import { busData } from "../utils/bus-data.js";

export const getBuses = (req, res) => {
    try{
    const {
        from,
        to,
        date,
        operators,
        page,
        pageSize
    } = req.query;
    let filteredBuses = busData;
    if (from) {
        filteredBuses = filteredBuses.filter(bus => bus.fromCity.toLowerCase() === from.toLowerCase());
    }
    if (to) {
        filteredBuses = filteredBuses.filter(bus => bus.toCity.toLowerCase() === to.toLowerCase());
    }
    if (date) {
        filteredBuses = filteredBuses.filter(bus => bus.date === date);
    }
    if (operators) {
        const operatorList = operators.split(',').map(op => op.trim().toLowerCase());
        filteredBuses = filteredBuses.filter(bus => operatorList.includes(bus.operator.toLowerCase()));
    }
    
    return res.status(200).send({
            data: filteredBuses,
            error: false,
          });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: 'Falied to fetch buses',
            error: true,
          });
    }

}


export const getBusDetails = (req, res) => {
    try{
    const {
        id
    } = req.query;

    const bus = busData.filter(bus => bus.id == id);
    bus[0]['bookedSeats'] = [4, 9, 1, 10];
    return res.status(200).send({
            data: bus,
            error: false,
          });
    } catch (error) {
        return res.status(500).send({
            message: 'Falied to fetch bus details',
            error: true,
          });
    }

}