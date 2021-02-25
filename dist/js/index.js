"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var coreRoutes_1 = __importDefault(require("./routes/coreRoutes"));
var app = express_1.default();
var PORT = process.env.PORT || 5000;
app.use(express_1.default.static(path_1.default.join(__dirname, '../build')));
app.use('/', coreRoutes_1.default);
var confirmStart = function () { return console.log(new Date().toLocaleTimeString() + ": Server initialised on PORT " + PORT); };
app.listen(PORT, confirmStart);
//# sourceMappingURL=index.js.map