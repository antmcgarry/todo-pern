import { Router } from "express";

const router = Router();

router.post("/todo", (req, res) => {
  res.status(200).json({ message: "TODO Service" });
});

router.get("/todo", (req, res) => {
  res.status(200).json({ message: "TODO Service" });
});

router.get("/todo/:id", (req, res) => {
  res.status(200).json({ message: "TODO Service" });
});

router.put("/todo", (req, res) => {
  res.status(200).json({ message: "TODO Service" });
});

router.delete("/todo", (req, res) => {
  res.status(200).json({ message: "TODO Service" });
});

export default router;
