"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/api/ping', (_req, res) => {
    console.log('Got ping in api');
    res.send('Pong');
});
const PORT = 3006;
app.listen(PORT, () => {
    console.log(`Patentior backend started on port ${PORT}`);
});
