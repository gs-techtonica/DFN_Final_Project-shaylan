import express from "express";

import fetch from 'node-fetch';
import * as db from "./db.mjs";

const distanceRouter = express.Router();

// let destinations = 


let destinations = await db.getDestinations() 
let address_params = destinations.map((dest) => dest.address + " " + dest.city + "%2C"+ dest.state).join("%7C");
console.log(address_params)


distanceRouter.get("/", async (request, response) => {
    let distance;
    let duration;  
    const origin = request.query.origin;
    let results = []; 
    // const destinations = request.query.destinations;
    // const travelMode = request.query.travelMode;

    //fetch all destinations and generates their address, puts it into one large string address+state+zipcode .join with %7C
    fetch("https://maps.googleapis.com/maps/api/distancematrix/json?origins="+origin+"&destinations="+address_params+"&mode='DRIVING'&key="+process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
        .then((res) => res.json())
        .then((res) => {
        res.rows[0].elements.map((nav, i) => { // i should tell which destination it relates to
                let { id, name, address, city, phone_number } = destinations[i];
                results.push({
                  id,
                  name,
                  address,
                  city,
                  phone_number,
                  distance: nav.distance.text,
                  duration: nav.duration.text
                });
              });
              results.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
              response.json(results);
            })
            // distance = res.rows[0].elements[0].distance.text; 
            // duration = res.rows[0].elements[0].duration.text; 
            // response.json({distance, duration})
        })
        // console.log("hello", res)

distanceRouter.use(express.json());

export default distanceRouter;