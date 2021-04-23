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
Object.defineProperty(exports, "__esModule", { value: true });
var Model = require('objection').Model;
var knex = require('../db/knex');
Model.knex(knex);
var Float = /** @class */ (function (_super) {
    __extends(Float, _super);
    function Float() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Float, "tableName", {
        get: function () {
            return 'floats';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Float, "jsonSchema", {
        get: function () {
            return {
                type: 'object',
                required: [
                    'bagNote5',
                    'bagPound2',
                    'bagPound1',
                    'bagPence50',
                    'bagPence20',
                    'bagPence10',
                    'bagPence5',
                    'bagPence2',
                    'bagPence1',
                    'bagTotal',
                    'noteTotal',
                    'looseTotal',
                    'floatTotal',
                ],
                properties: {
                    id: { type: 'integer' },
                    countId: { type: 'integer' },
                    note50: { type: ['integer', 'null'] },
                    note20: { type: ['integer', 'null'] },
                    note10: { type: ['integer', 'null'] },
                    note5: { type: ['integer', 'null'] },
                    note1: { type: ['integer', 'null'] },
                    noteTotal: { type: 'integer' },
                    bagNote5: { type: ['integer', 'null'] },
                    bagPound2: { type: ['integer', 'null'] },
                    bagPound1: { type: ['integer', 'null'] },
                    bagPence50: { type: ['integer', 'null'] },
                    bagPence20: { type: ['integer', 'null'] },
                    bagPence10: { type: ['integer', 'null'] },
                    bagPence5: { type: ['integer', 'null'] },
                    bagPence2: { type: ['integer', 'null'] },
                    bagPence1: { type: ['integer', 'null'] },
                    bagTotal: { type: ['integer', 'null'] },
                    loosePound2: { type: ['integer', 'null'] },
                    loosePound1: { type: ['integer', 'null'] },
                    loosePence50: { type: ['float', 'integer', 'null'] },
                    loosePence20: { type: ['float', 'integer', 'null'] },
                    loosePence10: { type: ['float', 'integer', 'null'] },
                    loosePence5: { type: ['float', 'integer', 'null'] },
                    loosePence2: { type: ['float', 'integer', 'null'] },
                    loosePence1: { type: ['float', 'integer', 'null'] },
                    looseOther: { type: ['float', 'integer', 'null'] },
                    looseTotal: { type: 'float' },
                    floatTotal: { type: 'float' },
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Float, "relationMappings", {
        get: function () {
            var Count = __dirname + './Count'; //require('./Count') 
            return {
                count: {
                    relation: Model.HasOneRelation,
                    modelClass: Count,
                    join: {
                        from: 'counts.floatId',
                        to: 'floats.id'
                    }
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    return Float;
}(Model));
exports.default = Float;
//# sourceMappingURL=Float.js.map