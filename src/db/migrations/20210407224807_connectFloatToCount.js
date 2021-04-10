// 2021-04-07 22:48:07

exports.up = function(knex) {
  return knex.schema.table('floats', t => {
		t.integer('countId')

		t.foreign('countId')
			.references('id')
			.inTable('counts')
	})
};

exports.down = function(knex) {
  return knex.schema.table('floats', t => {
		t.dropForeign('countId')
		t.dropColumn('countId')
	})
};
