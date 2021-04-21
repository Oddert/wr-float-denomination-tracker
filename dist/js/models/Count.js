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
var Model = require('objection').Model;
var knex = require('../db/knex');
Model.knex(knex);
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
                required: ['floatId', 'repositoryId', 'verified', 'completionStatus'],
                properties: {
                    id: { type: 'integer' },
                    floatId: { type: 'integer' },
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
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Count, "relationMappings", {
        get: function () {
            var Float = __dirname + '/Float.js'; //require('./Float')
            var Repository = __dirname + '/Repository.js'; //require('./Repository')
            var Partner = __dirname + '/Partner.js'; //require('./Partner')
            var User = __dirname + '/User.js'; //require('./User')
            return {
                float: {
                    relation: Model.BelongsToOneRelation,
                    modelClass: Float,
                    join: {
                        from: 'counts.floatId',
                        to: 'floats.id'
                    }
                },
                repository: {
                    relation: Model.BelongsToOneRelation,
                    modelClass: Repository,
                    join: {
                        from: 'counts.repositoryId',
                        to: 'repositories.id'
                    }
                },
                deletedBy: {
                    relation: Model.BelongsToOneRelation,
                    modelClass: Partner,
                    join: {
                        from: 'counts.deletedById',
                        to: 'partners.id'
                    }
                },
                counter: {
                    relation: Model.BelongsToOneRelation,
                    modelClass: Partner,
                    join: {
                        from: 'counts.counterId',
                        to: 'partners.id'
                    }
                },
                supervisor: {
                    relation: Model.BelongsToOneRelation,
                    modelClass: Partner,
                    join: {
                        from: 'counts.supervisorId',
                        to: 'partners.id'
                    }
                },
                authenticator: {
                    relation: Model.BelongsToOneRelation,
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
}(Model));
module.exports = Count;
//# sourceMappingURL=Count.js.map