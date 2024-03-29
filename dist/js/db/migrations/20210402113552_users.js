"use strict";
// 2021-04-02 11:35:52
exports.up = function (knex) {
    return knex.schema.createTable('users', function (t) {
        t.increments('id');
        t.integer('privilegeId');
        t.foreign('privilegeId')
            .references('id')
            .inTable('privileges');
        t.string('username').unique().notNullable();
        t.string('password').notNullable();
        t.string('readableName');
        t.date('createdOn');
        t.date('updatedOn');
        t.boolean('deleted').notNullable().defaultTo(false);
        t.date('deletedOn');
    });
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
//# sourceMappingURL=20210402113552_users.js.map