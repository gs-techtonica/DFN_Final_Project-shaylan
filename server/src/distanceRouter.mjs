import express from "express";

import fetch from 'node-fetch';

const distanceRouter = express.Router();


distanceRouter.get("/", async (request, response) => {
    let distance;
    let duration;  
    const origins = request.query.origins;
    const destinations = request.query.destinations;
    const travelMode = request.query.travelMode;

    //fetch all destinations and generates their address, puts it into one large string address+state+zipcode .join with %7C
    fetch("https://maps.googleapis.com/maps/api/distancematrix/json?origins=47.6062%2C-122.3321&destinations=45.5152%2C-122.6784&mode='DRIVING'&key=AIzaSyBntKhFZyZmcgzjdCsQ-oCSQlc-6msIe6w")
        .then((res) => res.json())
        .then((res) => {
            distance = res.rows[0].elements[0].distance.text; 
            duration = res.rows[0].elements[0].duration.text; 
            response.json({distance, duration})
        })
        // console.log("hello", res)
        
});

distanceRouter.use(express.json());

export default distanceRouter;