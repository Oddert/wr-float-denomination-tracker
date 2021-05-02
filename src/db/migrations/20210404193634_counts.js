// 2021-04-04 19:36:34

exports.up = function(knex) {
  return knex.schema.createTable('counts', t => {
		t.increments('id')

		t.integer('floatId')
		
		t.foreign('floatId')
			.references('id')
			.inTable('floats')

		t.integer('repositoryId')
		
		t.foreign('repositoryId')
			.references('id')
			.inTable('repositories')
			
		t.integer('deletedById')
		
		t.foreign('deletedById')
			.references('id')
			.inTable('partners')
		
		t.integer('counterId')
		
		t.foreign('counterId')
			.references('id')
			.inTable('partners')
		
		t.integer('supervisorId')
		
		t.foreign('supervisorId')
			.references('id')
			.inTable('partners')
		
		t.integer('authenticatorId')
		
		t.foreign('authenticatorId')
			.references('id')
			.inTable('users')

			// from repo to count??? 
	
		t.string('completionStatus')
		t.date('createdOn')
		t.boolean('verified').notNullable().defaultTo(false)
		t.boolean('deleted').notNullable().defaultTo(false)
		t.date('deletedOn')
		t.date('updatedOn')
		t.date('timestamp')
		t.string('comment')
	})
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('counts')
};
