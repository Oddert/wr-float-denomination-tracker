
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('partners').del()
    .then(function () {
      // Inserts seed entries
      return knex('partners').insert([
        { id: 1, preferredName: 'Robyn V', firstName: 'Robyn', middleNames: 'Felicity Heather', lastName: 'Veitch', pending: false, createdOn: 1618007167639, updatedOn: 1618007167639, tillNumber: '1023' },
				{ id: 2, preferredName: '1024 FN', firstName: 'Fake', middleNames: '', lastName: 'Name', pending: false, createdOn: 1618007167639, updatedOn: 1618007167639, tillNumber: '1024' },
      ])
    })
}