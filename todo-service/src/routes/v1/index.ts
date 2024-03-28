import { Router } from "express";

const router = Router();

router.post("/todo", (req, res) => {
  res.status(200).json({ message: "TODO Service" });
});

export default router;
