"use strict";
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
        // Inserts seed entries
        return knex('users').insert([
            { privilegeId: 1, username: 'wr619', password: '', readableName: 'Generic Unsupervised', createdOn: 1617995021013, updatedOn: 1617995021013, },
            { privilegeId: 2, username: 'cash_partner', password: 'bbd9a27dbb7dde38b450cc35c5269814cf35b472acf63bb02d46b94c5980b498', readableName: 'Generic Unsupervised', createdOn: 1617995021013, updatedOn: 1617995021013, },
            { privilegeId: 3, username: 'manager', password: 'e05d78f42fdce71109fcd1f3d2812ad2ef74c32cc2561898aba6764c6c53af00', readableName: 'Generic Unsupervised', createdOn: 1617995021013, updatedOn: 1617995021013, }, // pwd hfT9Vu9UTv79w1z3s3vo3
        ]);
    });
};
// repository (repositories) 1=401, 2=403, 3=lotto
// authenticatorId (users) 1=lower, 2=middle, 3=upper
// supervisorId, counterId (partners) 1=robyn, 2=fake_robyn
// floatId (floats) 1=completedCount, 2=partialCount, 3=incompleteCount
//# sourceMappingURL=users.js.map