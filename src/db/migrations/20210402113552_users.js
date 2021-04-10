// 2021-04-02 11:35:52

exports.up = function(knex) {
	return knex.schema.createTable('users', t => {
		t.increments('id')

		t.integer('privilegeId')
		
		t.foreign('privilegeId')
			.references('id')
			.inTable('privileges')
		
		t.string('username')
		t.string('password')
		t.string('readableName')
		t.date('createdOn')
		t.date('updatedOn')
		t.boolean('deleted')
		t.date('deletedOn')
	})
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
