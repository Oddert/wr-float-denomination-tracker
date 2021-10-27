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
var Repository = /** @class */ (function (_super) {
    __extends(Repository, _super);
    function Repository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Repository, "tableName", {
        get: function () {
            return 'repositories';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Repository, "jsonSchema", {
        get: function () {
            return {
                type: 'object',
                required: ['name'],
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    createdOn: { type: 'date' },
                    updatedOn: { type: 'date' },
                    activated: { type: 'boolean' },
                    activatedOn: { type: 'date' },
                    deactivatedOn: { type: 'date' },
                    activatedById: { type: ['integer', 'null'] },
                    deactivatedById: { type: ['integer', 'null'] },
                    deleted: { type: 'boolean' },
                    deletedOn: { type: 'date' },
                    deletedById: { type: ['integer', 'null'] },
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Repository, "relationMappings", {
        get: function () {
            var Count = __dirname + './Count'; //require('./Count')
            var Partner = __dirname + './Partner'; //require('./Partner')
            return {
                counts: {
                    relation: objection_1.Model.HasManyRelation,
                    modelClass: Count,
                    join: {
                        from: 'counts.repositoryId',
                        to: 'repositories.id'
                    }
                },
                activatedBy: {
                    relation: objection_1.Model.BelongsToOneRelation,
                    modelClass: Partner,
                    join: {
                        from: 'repositories.activatedById',
                        to: 'partners.id'
                    }
                },
                deactivatedBy: {
                    relation: objection_1.Model.BelongsToOneRelation,
                    modelClass: Partner,
                    join: {
                        from: 'repositories.deactivatedById',
                        to: 'partners.id'
                    }
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return Repository;
}(objection_1.Model));
exports.default = Repository;
//# sourceMappingURL=Repository.js.map