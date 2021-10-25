import express from "express";

import * as db from "./db.mjs";

const router = express.Router();

// router.get("/", async (request, response) => {
//   const tasks = await db.getTasks(request.user.sub);
//   response.json(tasks);
// });

router.use(express.json());
router.post("/", async (request, response) => {
  const donation = await db.addDonation(request.body
);
  response.status(201).json(donation);
  console.log(request.body)
});

export default router;
