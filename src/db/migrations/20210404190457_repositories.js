// 2021-04-04 19:04:57

exports.up = function(knex) {
	return knex.schema.createTable('repositories', t => {
		t.increments('id')

		t.integer('activatedById')
		
		t.foreign('activatedById')
			.references('id')
			.inTable('partners')

		t.integer('deactivatedById')
		
		t.foreign('deactivatedById')
			.references('id')
			.inTable('partners')
		
		t.integer('deletedById')
			.references('id')
			.inTable('users')

		t.date('createdOn')
		t.date('deactivatedOn')
		t.string('name')
		t.string('description')
		t.date('updatedOn')
		t.boolean('activated').notNullable().defaultTo(false)
		t.date('activatedOn')
		t.boolean('deleted').notNullable().defaultTo(false)
		t.date('deletedOn')
	})
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('repositories')
};
