
exports.up = function(knex) {
  return knex.schema.table('privileges', t => {
		t.integer('userId')

		t.foreign('userId')
			.references('id')
			.inTable('users')
	})
};

exports.down = function(knex) {
  return knex.schema.table('privileges', t => {
		t.dropForeign('userId')
		t.dropColumn('userId')
	})
};
