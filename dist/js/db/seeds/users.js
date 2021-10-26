"use strict";
var hashPwd = require('../../common/hashPwd').default;
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
        // Inserts seed entries
        return knex('users').insert([
            { privilegeId: 1, username: 'wr619', password: '', readableName: 'Generic Unsupervised', createdOn: 1617995021013, updatedOn: 1617995021013, },
            { privilegeId: 2, username: 'cash_partner', password: hashPwd('mypetGRas0n'), readableName: 'Generic Unsupervised', createdOn: 1617995021013, updatedOn: 1617995021013, },
            { privilegeId: 3, username: 'manager', password: hashPwd('ItIsAWidelyAknowlagedFactMostPeopleCannotBeTrustedToChooseSecurePasswords'), readableName: 'Generic Unsupervised', createdOn: 1617995021013, updatedOn: 1617995021013, }, // pwd hfT9Vu9UTv79w1z3s3vo3
        ]);
    });
};
// repository (repositories) 1=401, 2=403, 3=lotto
// authenticatorId (users) 1=lower, 2=middle, 3=upper
// supervisorId, counterId (partners) 1=robyn, 2=fake_robyn
// floatId (floats) 1=completedCount, 2=partialCount, 3=incompleteCount
//# sourceMappingURL=users.js.map