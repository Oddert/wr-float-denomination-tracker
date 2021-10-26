"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var express_flash_1 = __importDefault(require("express-flash"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var dotenv = __importStar(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var knex_1 = __importDefault(require("knex"));
var objection_1 = require("objection");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
// import * as knex from 'knex'
var auth_1 = __importDefault(require("./config/auth"));
var knexfile_1 = __importDefault(require("./knexfile"));
var coreRoutes_1 = __importDefault(require("./routes/coreRoutes"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var countRoutes_1 = __importDefault(require("./routes/countRoutes"));
var floatRoutes_1 = __importDefault(require("./routes/floatRoutes"));
var partnerRoutes_1 = __importDefault(require("./routes/partnerRoutes"));
var repositoryRoutes_1 = __importDefault(require("./routes/repositoryRoutes"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// import 'dotenv/config'
var env = dotenv.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 5000;
var knexConfig = (0, knex_1.default)(knexfile_1.default.development);
objection_1.Model.knex(knexConfig);
app.use(express_1.default.static(path_1.default.join(__dirname, '../build')));
app.use((0, express_1.json)());
app.use((0, cookie_parser_1.default)());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use((0, cors_1.default)());
if (process.env.MODE === "development") {
    app.use((0, morgan_1.default)('dev'));
}
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(auth_1.default.initialize());
app.use(auth_1.default.session());
app.use((0, express_flash_1.default)());
console.log("ENV file has been loaded: " + (process.env.ENV_CONFIRM_LOADED || false));
app.get('/test', function (req, res) {
    var input = req.query.t;
    res.json({
        raw: input,
        type: typeof input
    });
});
app.get('/test/badly', function (req, res) {
    var input = req.query.t;
    res.status(500).json({
        raw: input,
        type: typeof input,
        responseMessage: "Something went wrong: raw=" + input + ", type=" + typeof input
    });
});
app.use('/', coreRoutes_1.default);
app.use('/api/v1/auth', authRoutes_1.default);
app.use('/api/v1/count', countRoutes_1.default);
app.use('/api/v1/float', floatRoutes_1.default);
app.use('/api/v1/partner', partnerRoutes_1.default);
app.use('/api/v1/repository', repositoryRoutes_1.default);
app.use('/api/v1/user', userRoutes_1.default);
var confirmMessage = new Date().toLocaleTimeString() + ": Server initialised on PORT " + PORT + "...";
var confirmStart = function () { return console.log(confirmMessage); };
var server = app.listen(PORT, confirmStart);
exports.default = server;
//# sourceMappingURL=index.js.map