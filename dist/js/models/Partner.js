"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var objection_1 = require("objection");
var knex_1 = __importDefault(require("../db/knex"));
objection_1.Model.knex(knex_1.default);
var Partner = /** @class */ (function (_super) {
    __extends(Partner, _super);
    function Partner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Partner, "tableName", {
        get: function () {
            return 'partners';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Partner, "jsonSchema", {
        get: function () {
            return {
                type: 'object',
                required: ['firstName', 'tillNumber'],
                properties: {
                    id: { type: 'integer' },
                    preferredName: { type: 'string' },
                    firstName: { type: 'string' },
                    middleNames: { type: 'string' },
                    lastName: { type: 'string' },
                    pending: { type: 'boolean' },
                    createdOn: { type: 'date' },
                    updatedOn: { type: 'date' },
                    deleted: { type: 'boolean' },
                    deletedOn: { type: 'date' },
                    tillNumber: { type: 'string' },
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Partner, "relationMappings", {
        get: function () {
            var Repository = __dirname + './Repository'; // require('./Repository')
            var Count = __dirname + './Count'; // require('./Count')
            return {
                repositoriesActivated: {
                    relation: objection_1.Model.HasManyRelation,
                    modelClass: Repository,
                    join: {
                        from: 'partners.id',
                        to: 'repositories.activatedById',
                    }
                },
                repositoriesDeactivated: {
                    relation: objection_1.Model.HasManyRelation,
                    modelClass: Repository,
                    join: {
                        from: 'partners.id',
                        to: 'repositories.deactivatedById',
                    }
                },
                countsDeleted: {
                    relation: objection_1.Model.HasManyRelation,
                    modelClass: Count,
                    join: {
                        from: 'partners.id',
                        to: 'count.deletedById',
                    }
                },
                countsPerformed: {
                    relation: objection_1.Model.HasManyRelation,
                    modelClass: Count,
                    join: {
                        from: 'partners.id',
                        to: 'count.deletedById',
                    }
                },
                countsChecked: {
                    relation: objection_1.Model.HasManyRelation,
                    modelClass: Count,
                    join: {
                        from: 'partners.id',
                        to: 'count.deletedById',
                    }
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return Partner;
}(objection_1.Model));
exports.default = Partner;
//# sourceMappingURL=Partner.js.map