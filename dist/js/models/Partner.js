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
            var Repository = require('./Repository');
            var Count = require('./Count');
            return {
                repositoriesActivated: {
                    relation: Model.HasManyRelation,
                    modelClass: Repository,
                    join: {
                        from: 'partners.id',
                        to: 'repositories.activatedById',
                    }
                },
                repositoriesDeactivated: {
                    relation: Model.HasManyRelation,
                    modelClass: Repository,
                    join: {
                        from: 'partners.id',
                        to: 'repositories.deactivatedById',
                    }
                },
                countsDeleted: {
                    relation: Model.HasManyRelation,
                    modelClass: Count,
                    join: {
                        from: 'partners.id',
                        to: 'count.deletedById',
                    }
                },
                countsPerformed: {
                    relation: Model.HasManyRelation,
                    modelClass: Count,
                    join: {
                        from: 'partners.id',
                        to: 'count.deletedById',
                    }
                },
                countsChecked: {
                    relation: Model.HasManyRelation,
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
}(Model));
module.exports = Partner;
//# sourceMappingURL=Partner.js.map