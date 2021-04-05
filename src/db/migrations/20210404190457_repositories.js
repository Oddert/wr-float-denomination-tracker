
exports.up = function(knex) {
	return knex.schema.createTable('repositories', t => {
		t.increments('id')
		t.string('name')
		t.string('description')
		t.date('updatedOn')
		t.boolean('activated')
		t.date('activatedOn')
		t.integer('activatedBy')

		t.date('deactivatedOn')
			.references('id')
			.onTable('partners')

		t.integer('deactivatedBy')
			.references('id')
			.onTable('partners')

	})
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('repositories')
};
