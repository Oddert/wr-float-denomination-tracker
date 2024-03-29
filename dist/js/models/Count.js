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
var Count = /** @class */ (function (_super) {
    __extends(Count, _super);
    function Count() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Count, "tableName", {
        get: function () {
            return 'counts';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Count, "jsonSchema", {
        get: function () {
            return {
                type: 'object',
                required: ['floatId', 'repositoryId', 'verified', 'completionStatus', 'timestamp'],
                properties: {
                    id: { type: 'integer' },
                    floatId: { type: 'integer' },
                    comment: { type: ['string', 'null'] },
                    repositoryId: { type: ['integer', 'null'] },
                    deletedById: { type: ['integer', 'null'] },
                    counterId: { type: ['integer', 'null'] },
                    supervisorId: { type: ['integer', 'null'] },
                    authenticatorId: { type: ['integer', 'null'] },
                    completionStatus: { type: 'string' },
                    createdOn: { type: 'date' },
                    verified: { type: 'boolean' },
                    deleted: { type: 'boolean' },
                    deletedOn: { type: 'date' },
                    updatedOn: { type: 'date' },
                    timestamp: { type: 'date' },
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Count, "relationMappings", {
        // static modifiers = {
        // 	readableTimestamp (query) {
        // 	}
        // }
        get: function () {
            var Float = __dirname + '/Float.js'; // require('./Float')
            var Repository = __dirname + '/Repository.js'; // require('./Repository')
            var Partner = __dirname + '/Partner.js'; // require('./Partner')
            var User = __dirname + '/User.js'; // require('./User')
            return {
                float: {
                    relation: objection_1.Model.BelongsToOneRelation,
                    modelClass: Float,
                    join: {
                        from: 'counts.floatId',
                        to: 'floats.id'
                    }
                },
                repository: {
                    relation: objection_1.Model.BelongsToOneRelation,
                    modelClass: Repository,
                    join: {
                        from: 'counts.repositoryId',
                        to: 'repositories.id'
                    }
                },
                deletedBy: {
                    relation: objection_1.Model.BelongsToOneRelation,
                    modelClass: Partner,
                    join: {
                        from: 'counts.deletedById',
                        to: 'partners.id'
                    }
                },
                counter: {
                    relation: objection_1.Model.BelongsToOneRelation,
                    modelClass: Partner,
                    join: {
                        from: 'counts.counterId',
                        to: 'partners.id'
                    }
                },
                supervisor: {
                    relation: objection_1.Model.BelongsToOneRelation,
                    modelClass: Partner,
                    join: {
                        from: 'counts.supervisorId',
                        to: 'partners.id'
                    }
                },
                authenticator: {
                    relation: objection_1.Model.BelongsToOneRelation,
                    modelClass: User,
                    join: {
                        from: 'counts.authenticatorId',
                        to: 'users.id'
                    }
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return Count;
}(objection_1.Model));
exports.default = Count;
//# sourceMappingURL=Count.js.map