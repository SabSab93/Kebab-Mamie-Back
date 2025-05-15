// src/routers/kebabRouter.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const kebabRouter = Router();

// POST /kebabs
kebabRouter.post('/', async (req, res) => {
  const { name, description, price, img } = req.body.data;
  try {
    const newKebab = await prisma.kebab.create({
      data: {
        name,
        description,
        price: Number(price),
        img
      },
    });
    res.status(201).json(newKebab);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du kebab" });
  }
});

// GET /kebabs
kebabRouter.get("/", async (req, res) => {
  try {
    const kebabs = await prisma.kebab.findMany();
    res.json(kebabs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// GET /kebabs/:id
kebabRouter.get("/:id", async (req, res) => {
  const kebabId = parseInt(req.params.id, 10);
  if (isNaN(kebabId)) {
    return res.status(400).json({ message: "ID de kebab invalide" });
  }

  try {
    const kebab = await prisma.kebab.findUnique({
      where: { id: kebabId },
    });
    if (!kebab) {
      return res.status(404).json({ message: "Kebab non trouvé" });
    }
    res.json(kebab);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// PUT /kebabs/:id
kebabRouter.put("/:id", async (req, res) => {
  const kebabId = parseInt(req.params.id, 10);
  if (isNaN(kebabId)) {
    return res.status(400).json({ message: "ID de kebab invalide" });
  }

  const { name, description, price, img } = req.body.data;
  try {
    const updated = await prisma.kebab.update({
      where: { id: kebabId },
      data: {
        name,
        description,
        price: Number(price),
        img
      },
    });
    res.json(updated);
  } catch (error: any) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Kebab non trouvé" });
    }
    res.status(500).json({ message: "Erreur lors de la mise à jour" });
  }
});

// DELETE /kebabs/:id
kebabRouter.delete("/:id", async (req, res) => {
  const kebabId = parseInt(req.params.id, 10);
  if (isNaN(kebabId)) {
    return res.status(400).json({ message: "ID de kebab invalide" });
  }

  try {
    await prisma.kebab.delete({
      where: { id: kebabId },
    });
    res.json({ message: "Kebab supprimé" });
  } catch (error: any) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Kebab non trouvé" });
    }
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
});
