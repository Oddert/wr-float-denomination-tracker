"use strict";
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('counts').del()
        .then(function () {
        // Inserts seed entries
        return knex('counts').insert([
            { floatId: 1, repositoryId: 2, completionStatus: 'complete', createdOn: 1616094172738, updatedOn: 1616094172738, verified: true, authenticatorId: 3, counterId: 1, supervisorId: 2, },
            { floatId: 2, repositoryId: 1, completionStatus: 'complete', createdOn: 1616094172738, updatedOn: 1616094172738, verified: true, authenticatorId: 3, counterId: 1, supervisorId: 2, },
            { floatId: 3, repositoryId: 2, completionStatus: 'incomplete', createdOn: 1616094172738 - 14863542, updatedOn: 1616094172738 - 14863542, verified: true, authenticatorId: 3, counterId: 1, supervisorId: 2, },
            { floatId: 4, repositoryId: 1, completionStatus: 'unverified', createdOn: 1616094172738 - 248635424, updatedOn: 1616094172738 - 248635424, verified: true, authenticatorId: 3, counterId: 1, supervisorId: 2, },
            { floatId: 5, repositoryId: 3, completionStatus: 'incomplete', createdOn: 1616094172738 - 348635424, updatedOn: 1616094172738 - 348635424, verified: true, authenticatorId: 3, counterId: 1, supervisorId: 2, },
            { floatId: 6, repositoryId: 2, completionStatus: 'partial', createdOn: 1616094172738 - 442635424, updatedOn: 1616094172738 - 442635424, verified: true, authenticatorId: 3, counterId: 1, supervisorId: 2, },
            { floatId: 7, repositoryId: 1, completionStatus: 'partial', createdOn: 1616094172738 - 442635424, updatedOn: 1616094172738 - 442635424, verified: true, authenticatorId: 3, counterId: 1, supervisorId: 2, },
            { floatId: 8, repositoryId: 2, completionStatus: 'complete', createdOn: 1616094172738 - 493685464, updatedOn: 1616094172738 - 493685464, verified: true, authenticatorId: 3, counterId: 1, supervisorId: 2, },
            { floatId: 9, repositoryId: 2, completionStatus: 'complete', createdOn: 1616094172738 - 492685464, updatedOn: 1616094172738 - 492685464, verified: true, authenticatorId: 3, counterId: 1, supervisorId: 2, },
            { floatId: 10, repositoryId: 3, completionStatus: 'complete', createdOn: 1616094172738 - 552635424, updatedOn: 1616094172738 - 552635424, verified: true, authenticatorId: 3, counterId: 1, supervisorId: 2, },
            { floatId: 11, repositoryId: 3, completionStatus: 'unverified', createdOn: 1616094172738 - 862635424, updatedOn: 1616094172738 - 862635424, verified: false, authenticatorId: 3, counterId: 1, supervisorId: 2, },
            { floatId: 12, repositoryId: 2, completionStatus: 'complete', createdOn: 1616094172738 - 89234245, updatedOn: 1616094172738 - 89234245, verified: true, authenticatorId: 3, counterId: 1, supervisorId: 2, }, // incompleteCount
        ]);
    });
};
// repository 1=401, 2=403, 3=lotto
// authenticatorId 1=lower, 2=middle, 3=upper
// supervisorId 1=robyn, 2=fake_robyn
// floatId 1=completedCount, 2=partialCount, 3=incompleteCount
//# sourceMappingURL=counts.js.map