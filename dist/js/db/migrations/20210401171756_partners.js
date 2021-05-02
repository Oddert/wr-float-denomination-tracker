"use strict";
// 2021-04-01 17:17:56
exports.up = function (knex) {
    return knex.schema.createTable('partners', function (t) {
        t.increments('id');
        t.string('preferredName');
        t.string('firstName');
        t.string('middleNames');
        t.string('lastName');
        t.boolean('pending').notNullable().defaultTo(false);
        t.date('createdOn');
        t.date('updatedOn');
        t.boolean('deleted').notNullable().defaultTo(false);
        t.date('deletedOn');
        t.string('tillNumber');
        // t.integer('privilege_id')
        // 	.references('id')
        // 	.inTable('privileges')
    });
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('partners');
};
//# sourceMappingURL=20210401171756_partners.js.map