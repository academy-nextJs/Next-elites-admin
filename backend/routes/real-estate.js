const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const realEstates = await prisma.realEstate.findMany();
    const serializedRealEstates = realEstates.map((realEstate) => ({
      ...realEstate,
      phoneNumber: realEstate.phoneNumber.toString(),
      supportNumber: realEstate.supportNumber.toString(),
      registrationNumber: realEstate.registrationNumber.toString(),
      nationalCode: realEstate.nationalCode.toString(),
    }));
    res.json(serializedRealEstates);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch real estates", details: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const realEstate = await prisma.realEstate.findUnique({ where: { id } });
    if (realEstate) {
      const serializedRealEstate = {
        ...realEstate,
        phoneNumber: realEstate.phoneNumber.toString(),
        supportNumber: realEstate.supportNumber.toString(),
        registrationNumber: realEstate.registrationNumber.toString(),
        nationalCode: realEstate.nationalCode.toString(),
      };
      res.json(serializedRealEstate);
    } else {
      res.status(404).json({ error: "Real estate not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch real estate", details: error.message });
  }
});

module.exports = router;
