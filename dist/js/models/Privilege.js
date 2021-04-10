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
var Privilege = /** @class */ (function (_super) {
    __extends(Privilege, _super);
    function Privilege() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Privilege, "tableName", {
        get: function () {
            return 'privileges';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Privilege, "jsonSchema", {
        get: function () {
            return {
                type: 'object',
                required: [
                    'countReadList',
                    'countReadIndividual',
                    'countDeclare',
                    'countCreate',
                    'countUpdate',
                    'countDestroy',
                    'repositoryReadList',
                    'repositoryReadIndividual',
                    'repositoryActivate',
                    'repositoryCreate',
                    'repositoryUpdate',
                    'repositoryDestroy',
                    'partnerReadList',
                    'partnerReadIndividual',
                    'partnerRequest',
                    'partnerCreate',
                    'partnerUpdateBasic',
                    'partnerUpdateDetails',
                    'partnerUpdatePrivileges',
                    'partnerDelete',
                    'partnerDeletePermanent',
                ],
                properties: {
                    userId: { type: 'integer' },
                    description: { type: 'string' },
                    createdOn: { type: 'date' },
                    countReadList: { type: 'boolean' },
                    countReadIndividual: { type: 'boolean' },
                    countDeclare: { type: 'boolean' },
                    countCreate: { type: 'boolean' },
                    countUpdate: { type: 'boolean' },
                    countDestroy: { type: 'boolean' },
                    repositoryReadList: { type: 'boolean' },
                    repositoryReadIndividual: { type: 'boolean' },
                    repositoryActivate: { type: 'boolean' },
                    repositoryCreate: { type: 'boolean' },
                    repositoryUpdate: { type: 'boolean' },
                    repositoryDestroy: { type: 'boolean' },
                    partnerReadList: { type: 'boolean' },
                    partnerReadIndividual: { type: 'boolean' },
                    partnerRequest: { type: 'boolean' },
                    partnerCreate: { type: 'boolean' },
                    partnerUpdateBasic: { type: 'boolean' },
                    partnerUpdateDetails: { type: 'boolean' },
                    partnerUpdatePrivileges: { type: 'boolean' },
                    partnerDelete: { type: 'boolean' },
                    partnerDeletePermanent: { type: 'boolean' },
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Privilege, "relationMappings", {
        get: function () {
            var User = requrie('./User');
            return {
                // user: {
                // 	relation: Model.BelongsToOneRelation,
                // 	modelClass: User,
                // 	join: {
                // 		from: 'privileges.userId',
                // 		to: 'users.id'
                // 	}
                // },
                owner: {
                    relation: Model.HasOneRelation,
                    modelClass: User,
                    join: {
                        from: 'users.privilegeId',
                        to: 'privileges.id'
                    }
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    return Privilege;
}(Model));
module.exports = Privilege;
//# sourceMappingURL=Privilege.js.map