"use strict";
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('privileges').del()
        .then(function () {
        // Inserts seed entries
        return knex('privileges').insert([
            {
                id: 1,
                userId: 1,
                description: 'For wr619, basic login with no authentication, minimal write access ONLY',
                countReadList: true,
                countReadIndividual: true,
                countDeclare: true,
                countCreate: false,
                countUpdate: false,
                countDestroy: false,
                repositoryReadList: true,
                repositoryReadIndividual: true,
                repositoryActivate: false,
                repositoryCreate: false,
                repositoryUpdate: false,
                repositoryDestroy: false,
                partnerReadList: true,
                partnerReadIndividual: true,
                partnerRequest: true,
                partnerCreate: false,
                partnerUpdateBasic: false,
                partnerUpdateDetails: false,
                partnerUpdatePrivileges: false,
                partnerDelete: false,
                partnerDeletePermanent: false,
            },
            {
                id: 2,
                userId: 2,
                description: 'For cash_partner, most read-write access with exception of branch-opperation-critical details',
                countReadList: true,
                countReadIndividual: true,
                countDeclare: true,
                countCreate: true,
                countUpdate: true,
                countDestroy: true,
                repositoryReadList: true,
                repositoryReadIndividual: true,
                repositoryActivate: false,
                repositoryCreate: false,
                repositoryUpdate: false,
                repositoryDestroy: false,
                partnerReadList: true,
                partnerReadIndividual: true,
                partnerRequest: true,
                partnerCreate: true,
                partnerUpdateBasic: true,
                partnerUpdateDetails: true,
                partnerUpdatePrivileges: false,
                partnerDelete: true,
                partnerDeletePermanent: false,
            },
            {
                id: 3,
                userId: 3,
                description: 'For manager account, generailised admin account for trusted and trained partners only, full access.',
                countReadList: true,
                countReadIndividual: true,
                countDeclare: true,
                countCreate: true,
                countUpdate: true,
                countDestroy: true,
                repositoryReadList: true,
                repositoryReadIndividual: true,
                repositoryActivate: true,
                repositoryCreate: true,
                repositoryUpdate: true,
                repositoryDestroy: true,
                partnerReadList: true,
                partnerReadIndividual: true,
                partnerRequest: true,
                partnerCreate: true,
                partnerUpdateBasic: true,
                partnerUpdateDetails: true,
                partnerUpdatePrivileges: true,
                partnerDelete: true,
                partnerDeletePermanent: true,
            },
        ]);
    });
};
// repository (repositories) 1=401, 2=403, 3=lotto
// authenticatorId (users) 1=lower, 2=middle, 3=upper
// supervisorId, counterId (partners) 1=robyn, 2=fake_robyn
// floatId (floats) 1=completedCount, 2=partialCount, 3=incompleteCount
//# sourceMappingURL=privileges.js.map