"use strict";
// 2021-04-04 19:26:44
exports.up = function (knex) {
    return knex.schema.createTable('floats', function (t) {
        t.increments('id');
        t.integer('note50');
        t.integer('note20');
        t.integer('note10');
        t.integer('note5');
        t.integer('note1');
        t.integer('noteTotal');
        t.integer('bagNote5');
        t.integer('bagPound2');
        t.integer('bagPound1');
        t.integer('bagPence50');
        t.integer('bagPence20');
        t.integer('bagPence10');
        t.integer('bagPence5');
        t.integer('bagPence2');
        t.integer('bagPence1');
        t.integer('bagTotal');
        t.integer('loosePound2');
        t.integer('loosePound1');
        t.float('loosePence50');
        t.float('loosePence20');
        t.float('loosePence10');
        t.float('loosePence5');
        t.float('loosePence2');
        t.float('loosePence1');
        t.float('looseOther');
        t.float('looseTotal');
        t.float('floatTotal');
    });
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('floats');
};
//# sourceMappingURL=20210404192644_floats.js.map