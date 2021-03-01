"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var coreRoutes_1 = __importDefault(require("./routes/coreRoutes"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var repositoryRoutes_1 = __importDefault(require("./routes/repositoryRoutes"));
var countRoutes_1 = __importDefault(require("./routes/countRoutes"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var app = express_1.default();
var PORT = process.env.PORT || 5000;
app.use(express_1.default.static(path_1.default.join(__dirname, '../build')));
app.use('/', coreRoutes_1.default);
app.use('/api/v1/auth', authRoutes_1.default);
app.use('/api/v1/repository', repositoryRoutes_1.default);
app.use('/api/v1/count', countRoutes_1.default);
app.use('/api/v1/user', userRoutes_1.default);
var confirmStart = function () { return console.log(new Date().toLocaleTimeString() + ": Server initialised on PORT " + PORT); };
app.listen(PORT, confirmStart);
//# sourceMappingURL=index.js.map