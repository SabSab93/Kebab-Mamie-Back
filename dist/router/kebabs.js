"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kebabRouter = void 0;
// src/routers/kebabRouter.ts
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.kebabRouter = (0, express_1.Router)();
// POST /kebabs
exports.kebabRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, img } = req.body.data;
    try {
        const newKebab = yield prisma.kebab.create({
            data: {
                name,
                description,
                price: Number(price),
                img
            },
        });
        res.status(201).json(newKebab);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création du kebab" });
    }
}));
// GET /kebabs
exports.kebabRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const kebabs = yield prisma.kebab.findMany();
        res.json(kebabs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}));
// GET /kebabs/:id
exports.kebabRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const kebabId = parseInt(req.params.id, 10);
    if (isNaN(kebabId)) {
        return res.status(400).json({ message: "ID de kebab invalide" });
    }
    try {
        const kebab = yield prisma.kebab.findUnique({
            where: { id: kebabId },
        });
        if (!kebab) {
            return res.status(404).json({ message: "Kebab non trouvé" });
        }
        res.json(kebab);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}));
// PUT /kebabs/:id
exports.kebabRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const kebabId = parseInt(req.params.id, 10);
    if (isNaN(kebabId)) {
        return res.status(400).json({ message: "ID de kebab invalide" });
    }
    const { name, description, price, img } = req.body.data;
    try {
        const updated = yield prisma.kebab.update({
            where: { id: kebabId },
            data: {
                name,
                description,
                price: Number(price),
                img
            },
        });
        res.json(updated);
    }
    catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Kebab non trouvé" });
        }
        res.status(500).json({ message: "Erreur lors de la mise à jour" });
    }
}));
// DELETE /kebabs/:id
exports.kebabRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const kebabId = parseInt(req.params.id, 10);
    if (isNaN(kebabId)) {
        return res.status(400).json({ message: "ID de kebab invalide" });
    }
    try {
        yield prisma.kebab.delete({
            where: { id: kebabId },
        });
        res.json({ message: "Kebab supprimé" });
    }
    catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Kebab non trouvé" });
        }
        res.status(500).json({ message: "Erreur lors de la suppression" });
    }
}));
