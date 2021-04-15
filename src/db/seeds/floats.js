
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('floats').del()
    .then(function () {
      // Inserts seed entries
      return knex('floats').insert([
				{
					id: 1,
					countId: 1,
					bagPence1: 500,
					bagPence2: 300,
					bagPence5: 2000,
					bagPence10: 1000,
					bagPence20: 7000,
					bagPence50: 3000,
					bagPound1: 18000,
					bagPound2: 10000,
					bagNote5: 1000,
					bagTotal: 42800, 
					loosePence1: 164,
					loosePence2: 200,
					loosePence5: 1425,
					loosePence10: 1370,
					loosePence20: 600,
					loosePence50: 2450,
					loosePound1: 6100,
					loosePound2: 400,
					looseOther: 0,
					looseTotal: 12709, 
					note1: 0,
					note5: 7500,
					note10: 24000,
					note20: 12000,
					note50: 5000,
					noteTotal: 48500,
					floatTotal: 0
				}, // completeCount
				{
					id: 2,
					countId: 2,
					bagPence1: 500,
					bagPence2: 300,
					bagPence5: 2000,
					bagPence10: 1000,
					bagPence20: 7000,
					bagPence50: 3000,
					bagPound1: 18000,
					bagPound2: 10000,
					bagNote5: 1000,
					bagTotal: 42800, 
					loosePence1: 164,
					loosePence2: 200,
					loosePence5: 1425,
					loosePence10: 1370,
					loosePence20: 600,
					loosePence50: 2450,
					loosePound1: 6100,
					loosePound2: 400,
					looseOther: 0,
					looseTotal: 12709, 
					note1: 0,
					note5: 7500,
					note10: 24000,
					note20: 12000,
					note50: 5000,
					noteTotal: 48500,
					floatTotal: 0
				}, // completeCount
				{
					id: 3,
					countId: 3,
					bagPence1: 800,
					bagPence2: 300,
					bagPence5: 3500,
					bagPence10: 4500,
					bagPence20: 1000,
					bagPence50: 1000,
					bagPound1: 12000,
					bagPound2: 4000,
					bagNote5: 0,
					bagTotal: 27100, 
					loosePence1: 0,
					loosePence2: 0,
					loosePence5: 0,
					loosePence10: 0,
					loosePence20: 0,
					loosePence50: 0,
					loosePound1: 0,
					loosePound2: 0,
					looseOther: 0,
					looseTotal: 0, 
					note1: 0,
					note5: 0,
					note10: 0,
					note20: 0,
					note50: 5000,
					noteTotal: 5000,
					floatTotal: 0,
				}, // partialCount
				{
					id: 4,
					countId: 4,
					bagPence1: 0,
					bagPence2: 300,
					bagPence5: 3500,
					bagPence10: 0,
					bagPence20: 0,
					bagPence50: 1000,
					bagPound1: 12000,
					bagPound2: 4000,
					bagNote5: 0,
					bagTotal: 20800,
					loosePence1: 0,
					loosePence2: 0,
					loosePence5: 0,
					loosePence10: 0,
					loosePence20: 0,
					loosePence50: 0,
					loosePound1: 0,
					loosePound2: 0,
					looseOther: 0,
					looseTotal: 0,
					note1: 0,
					note5: 0,
					note10: 0,
					note20: 0,
					note50: 5000,
					noteTotal: 5000,
					floatTotal: 0
				},// incompleteCount
				{
					id: 5,
					countId: 5,
					bagPence1: 500,
					bagPence2: 300,
					bagPence5: 2000,
					bagPence10: 1000,
					bagPence20: 7000,
					bagPence50: 3000,
					bagPound1: 18000,
					bagPound2: 10000,
					bagNote5: 1000,
					bagTotal: 42800, 
					loosePence1: 164,
					loosePence2: 200,
					loosePence5: 1425,
					loosePence10: 1370,
					loosePence20: 600,
					loosePence50: 2450,
					loosePound1: 6100,
					loosePound2: 400,
					looseOther: 0,
					looseTotal: 12709, 
					note1: 0,
					note5: 7500,
					note10: 24000,
					note20: 12000,
					note50: 5000,
					noteTotal: 48500,
					floatTotal: 0
				}, // completeCount
				{
					id: 6,
					countId: 6,
					bagPence1: 800,
					bagPence2: 300,
					bagPence5: 3500,
					bagPence10: 4500,
					bagPence20: 1000,
					bagPence50: 1000,
					bagPound1: 12000,
					bagPound2: 4000,
					bagNote5: 0,
					bagTotal: 27100, 
					loosePence1: 0,
					loosePence2: 0,
					loosePence5: 0,
					loosePence10: 0,
					loosePence20: 0,
					loosePence50: 0,
					loosePound1: 0,
					loosePound2: 0,
					looseOther: 0,
					looseTotal: 0, 
					note1: 0,
					note5: 0,
					note10: 0,
					note20: 0,
					note50: 5000,
					noteTotal: 5000,
					floatTotal: 0,
				}, // partialCount
				{
					id: 7,
					countId: 7,
					bagPence1: 800,
					bagPence2: 300,
					bagPence5: 3500,
					bagPence10: 4500,
					bagPence20: 1000,
					bagPence50: 1000,
					bagPound1: 12000,
					bagPound2: 4000,
					bagNote5: 0,
					bagTotal: 27100, 
					loosePence1: 0,
					loosePence2: 0,
					loosePence5: 0,
					loosePence10: 0,
					loosePence20: 0,
					loosePence50: 0,
					loosePound1: 0,
					loosePound2: 0,
					looseOther: 0,
					looseTotal: 0, 
					note1: 0,
					note5: 0,
					note10: 0,
					note20: 0,
					note50: 5000,
					noteTotal: 5000,
					floatTotal: 0,
				}, // partialCount

				{
					id: 8,
					countId: 8,
					bagPence1: 500,
					bagPence2: 300,
					bagPence5: 2000,
					bagPence10: 1000,
					bagPence20: 7000,
					bagPence50: 3000,
					bagPound1: 18000,
					bagPound2: 10000,
					bagNote5: 1000,
					bagTotal: 42800, 
					loosePence1: 164,
					loosePence2: 200,
					loosePence5: 1425,
					loosePence10: 1370,
					loosePence20: 600,
					loosePence50: 2450,
					loosePound1: 6100,
					loosePound2: 400,
					looseOther: 0,
					looseTotal: 12709, 
					note1: 0,
					note5: 7500,
					note10: 24000,
					note20: 12000,
					note50: 5000,
					noteTotal: 48500,
					floatTotal: 0
				}, // completeCount
				{
					id: 9,
					countId: 9,
					bagPence1: 500,
					bagPence2: 300,
					bagPence5: 2000,
					bagPence10: 1000,
					bagPence20: 7000,
					bagPence50: 3000,
					bagPound1: 18000,
					bagPound2: 10000,
					bagNote5: 1000,
					bagTotal: 42800, 
					loosePence1: 164,
					loosePence2: 200,
					loosePence5: 1425,
					loosePence10: 1370,
					loosePence20: 600,
					loosePence50: 2450,
					loosePound1: 6100,
					loosePound2: 400,
					looseOther: 0,
					looseTotal: 12709, 
					note1: 0,
					note5: 7500,
					note10: 24000,
					note20: 12000,
					note50: 5000,
					noteTotal: 48500,
					floatTotal: 0
				}, // completeCount
				{
					id: 10,
					countId: 10,
					bagPence1: 500,
					bagPence2: 300,
					bagPence5: 2000,
					bagPence10: 1000,
					bagPence20: 7000,
					bagPence50: 3000,
					bagPound1: 18000,
					bagPound2: 10000,
					bagNote5: 1000,
					bagTotal: 42800, 
					loosePence1: 164,
					loosePence2: 200,
					loosePence5: 1425,
					loosePence10: 1370,
					loosePence20: 600,
					loosePence50: 2450,
					loosePound1: 6100,
					loosePound2: 400,
					looseOther: 0,
					looseTotal: 12709, 
					note1: 0,
					note5: 7500,
					note10: 24000,
					note20: 12000,
					note50: 5000,
					noteTotal: 48500,
					floatTotal: 0
				}, // completeCount
				{
					id: 11,
					countId: 11,
					bagPence1: 500,
					bagPence2: 300,
					bagPence5: 2000,
					bagPence10: 1000,
					bagPence20: 7000,
					bagPence50: 3000,
					bagPound1: 18000,
					bagPound2: 10000,
					bagNote5: 1000,
					bagTotal: 42800, 
					loosePence1: 164,
					loosePence2: 200,
					loosePence5: 1425,
					loosePence10: 1370,
					loosePence20: 600,
					loosePence50: 2450,
					loosePound1: 6100,
					loosePound2: 400,
					looseOther: 0,
					looseTotal: 12709, 
					note1: 0,
					note5: 7500,
					note10: 24000,
					note20: 12000,
					note50: 5000,
					noteTotal: 48500,
					floatTotal: 0
				}, // completeCount
				{
					id: 12,
					countId: 12,
					bagPence1: 0,
					bagPence2: 300,
					bagPence5: 3500,
					bagPence10: 0,
					bagPence20: 0,
					bagPence50: 1000,
					bagPound1: 12000,
					bagPound2: 4000,
					bagNote5: 0,
					bagTotal: 20800,
					loosePence1: 0,
					loosePence2: 0,
					loosePence5: 0,
					loosePence10: 0,
					loosePence20: 0,
					loosePence50: 0,
					loosePound1: 0,
					loosePound2: 0,
					looseOther: 0,
					looseTotal: 0,
					note1: 0,
					note5: 0,
					note10: 0,
					note20: 0,
					note50: 5000,
					noteTotal: 5000,
					floatTotal: 0
				},// incompleteCount
			]);
    });
};