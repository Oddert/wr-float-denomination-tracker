"use strict";
// 2021-04-04 19:04:57
exports.up = function (knex) {
    return knex.schema.createTable('repositories', function (t) {
        t.increments('id');
        t.integer('activatedById');
        t.foreign('activatedById')
            .references('id')
            .inTable('partners');
        t.integer('deactivatedById');
        t.foreign('deactivatedById')
            .references('id')
            .inTable('partners');
        t.date('deactivatedOn');
        t.string('name');
        t.string('description');
        t.date('updatedOn');
        t.boolean('activated');
        t.date('activatedOn');
    });
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('repositories');
};
//# sourceMappingURL=20210404190457_repositories.js.map