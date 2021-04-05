
exports.up = function(knex) {
	return knex.schema.createTable('users', t => {
		t.increments('id')
		t.string('username')
		t.string('password')
		t.string('readableName')
		t.date('createOn')
		t.date('updatedOn')
		t.boolean('deleted')
		t.date('deletedOn')
		t.integer('privilegeId')
			.references('id')
			.inTable('privileges')
	})
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
