import express from "express";
import SOP from "../models/sop.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).send({
        message: "Access denied",
        success: false,
      });
    }

    const sop = new SOP(req.body);
    await sop.save();

    res.status(201).send({
      message: "SOP created successfully",
      success: true,
      data: sop,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.get("/get-all", authMiddleware, async (req, res) => {
  try {
    const sops = await SOP.find({ isActive: true }).sort({ order: 1 });

    res.send({
      message: "SOPs fetched successfully",
      success: true,
      data: sops,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.get("/get-sop/:id", authMiddleware, async (req, res) => {
  try {
    const sop = await SOP.findById(req.params.id);

    if (!sop) {
      return res.status(404).send({
        message: "SOP not found",
        success: false,
      });
    }

    res.send({
      message: "SOP fetched successfully",
      success: true,
      data: sop,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.put("/update-sop/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).send({
        message: "Access denied",
        success: false,
      });
    }

    const sop = await SOP.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!sop) {
      return res.status(404).send({
        message: "SOP not found",
        success: false,
      });
    }

    res.send({
      message: "SOP updated successfully",
      success: true,
      data: sop,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.delete("/delete-sop/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).send({
        message: "Access denied",
        success: false,
      });
    }

    const sop = await SOP.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!sop) {
      return res.status(404).send({
        message: "SOP not found",
        success: false,
      });
    }

    res.send({
      message: "SOP deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

export default router;
