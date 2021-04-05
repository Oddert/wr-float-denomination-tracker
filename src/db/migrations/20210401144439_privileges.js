
exports.up = function(knex) {
  return knex.schema.createTable('privileges', t => {
		t.increments('id')
		t.string('description')
		t.date('createdOn')
		t.boolean('countReadList')
		t.boolean('countReadIndividual')
		t.boolean('countDeclare')
		t.boolean('countCreate')
		t.boolean('countUpdate')
		t.boolean('countDestroy')
		t.boolean('repositoryReadList')
		t.boolean('repositoryReadIndividual')
		t.boolean('repositoryActivate')
		t.boolean('repositoryCreate')
		t.boolean('repositoryUpdate')
		t.boolean('repositoryDestroy')
		t.boolean('partnerReadList')
		t.boolean('partnerReadIndividual')
		t.boolean('partnerRequest')
		t.boolean('partnerCreate')
		t.boolean('partnerUpdateBasic')
		t.boolean('partnerUpdateDetails')
		t.boolean('partnerUpdatePrivileges')
		t.boolean('partnerDelete')
		t.boolean('partnerDeletePermanent')
		t.integer('userId')
			.references('id')
			.inTable('users')
	})
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('privileges')
};
