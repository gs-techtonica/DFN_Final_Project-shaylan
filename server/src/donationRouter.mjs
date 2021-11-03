import express from "express";
import fetch from "node-fetch";

import * as db from "./db.mjs";

const donationRouter = express.Router();

donationRouter.get("/", async (request, response) => {
  const donations = await db.getDonations();
  response.json(donations);
});

donationRouter.use(express.json());
donationRouter.post("/", async (request, response) => {
  const donation = await db.addDonation(request.body);
  response.status(201).json(donation);
  console.log(donation);
});

export default donationRouter;
