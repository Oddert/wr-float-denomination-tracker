"use strict";
// 2021-04-01 14:44:39
exports.up = function (knex) {
    return knex.schema.createTable('privileges', function (t) {
        t.increments('id');
        t.string('description');
        t.date('createdOn');
        t.boolean('countReadList');
        t.boolean('countReadIndividual');
        t.boolean('countDeclare');
        t.boolean('countCreate');
        t.boolean('countUpdate');
        t.boolean('countDestroy');
        t.boolean('repositoryReadList');
        t.boolean('repositoryReadIndividual');
        t.boolean('repositoryActivate');
        t.boolean('repositoryCreate');
        t.boolean('repositoryUpdate');
        t.boolean('repositoryDestroy');
        t.boolean('partnerReadList');
        t.boolean('partnerReadIndividual');
        t.boolean('partnerRequest');
        t.boolean('partnerCreate');
        t.boolean('partnerUpdateBasic');
        t.boolean('partnerUpdateDetails');
        t.boolean('partnerUpdatePrivileges');
        t.boolean('partnerDelete');
        t.boolean('partnerDeletePermanent');
    });
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('privileges');
};
//# sourceMappingURL=20210401144439_privileges.js.map