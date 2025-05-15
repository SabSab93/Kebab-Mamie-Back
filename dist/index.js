"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const kebabs_1 = require("./router/kebabs");
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const apiRouter = express_1.default.Router();
apiRouter.use("/kebabs", kebabs_1.kebabRouter);
app.use("/api", apiRouter);
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
});
