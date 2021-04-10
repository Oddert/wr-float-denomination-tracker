"use strict";
exports.up = function (knex) {
    return knex.schema.table('privileges', function (t) {
        t.integer('userId');
        t.foreign('userId')
            .references('id')
            .inTable('users');
    });
};
exports.down = function (knex) {
    return knex.schema.table('privileges', function (t) {
        t.dropForeign('userId');
        t.dropColumn('userId');
    });
};
//# sourceMappingURL=20210408201113_connectPrivilegesToUsers.js.map