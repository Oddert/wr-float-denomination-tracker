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
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(User, "TableName", {
        get: function () {
            return 'users';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User, "jsonSchema", {
        get: function () {
            return {
                type: 'object',
                required: ['username', 'password', 'readableName'],
                properties: {
                    id: { type: 'integer' },
                    privilegeId: { type: ['integer', 'null'] },
                    username: { type: 'string' },
                    password: { type: 'string' },
                    readableName: { type: 'string' },
                    createOn: { type: 'date' },
                    updatedOn: { type: 'date' },
                    deleted: { type: 'boolean' },
                    deletedOn: { type: 'date' },
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User, "relationMappings", {
        get: function () {
            var Privilege = require('./Privilege');
            var Count = require('./Count');
            return {
                privileges: {
                    relation: Model.BelongsToOneRelation,
                    modelClass: Privilege,
                    join: {
                        from: 'users.privilegeId',
                        to: 'privileges.id'
                    }
                },
                counts: {
                    relation: Model.HasManyRelation,
                    modelClass: Count,
                    join: {
                        from: 'users.id',
                        to: 'counts.authenticatorId',
                    }
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return User;
}(Model));
module.exports = User;
//# sourceMappingURL=User.js.map