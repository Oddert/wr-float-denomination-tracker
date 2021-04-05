
exports.up = function(knex) {
	return knex.schema.createTable('partners', t => {
		t.increments('id')
		t.string('preferredName')
		t.string('firstName')
		t.string('middleNames')
		t.string('lastName')
		t.boolean('pending')
		t.date('createdOn')
		t.date('updatedOn')
		t.boolean('deleted')
		t.date('deletedOn')
		t.string('tillNumber')
		// t.integer('privilege_id')
		// 	.references('id')
		// 	.inTable('privileges')
	})
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('partners')
};
