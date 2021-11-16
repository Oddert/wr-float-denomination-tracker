
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('repositories').del()
    .then(function () {
      // Inserts seed entries
      return knex('repositories').insert([
        { id: 1, activatedById: 1, name: '401', description: 'First of three tills, nearest the door.', activated: true, activatedOn: 1617993604736, updatedOn: 1617993604736 },
        { id: 2, activatedById: 1, name: '402', description: 'Second of three tills, in the center, next to the lotto terminal.', activated: false, activatedOn: 1617993604736, updatedOn: 1617994214855, deactivatedOn: 1617994214855, deactivatedById: 1 },
        { id: 3, activatedById: 1, name: '403', description: 'Last of three tills, nearest the storage cabinet.', activated: true, activatedOn: 1617993604736, updatedOn: 1617993604736 },
        { id: 4, activatedById: 1, name: 'Lotto', description: 'The lotto terminal pay out drawer.', activated: true, activatedOn: 1617993604736, updatedOn: 1617993604736 },
        { id: 5, activatedById: 1, name: 'Safe', description: 'The primary cash office safe used for holding bulk cash.', activated: true, activatedOn: 1617993604736, updatedOn: 1617993604736 },
      ])
    })
}

// repository (repositories) 1=401, 2=403, 3=lotto
// authenticatorId (users) 1=lower, 2=middle, 3=upper
// supervisorId, counterId (partners) 1=robyn, 2=fake_robyn
// floatId (floats) 1=completedCount, 2=partialCount, 3=incompleteCount