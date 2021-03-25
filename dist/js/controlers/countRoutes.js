"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCount = exports.updateCount = exports.getCount = exports.addCount = exports.getCounts = void 0;
var completeCount = { "bagged": { "pence_one": 500, "pence_two": 300, "pence_five": 2000, "pence_ten": 1000, "pence_twenty": 7000, "pence_fifty": 3000, "pound_one": 18000, "pound_two": 10000, "note_five": 1000, "total": 42800 }, "loose": { "pence_one": 164, "pence_two": 200, "pence_five": 1425, "pence_ten": 1370, "pence_twenty": 600, "pence_fifty": 2450, "pound_one": 6100, "pound_two": 400, "other": 0, "total": 12709 }, "notes": { "note_one": 0, "note_five": 7500, "note_ten": 24000, "note_twenty": 12000, "note_fifty": 5000, "total": 48500 }, "total": 0 };
var partialCount = { "bagged": { "pence_one": 800, "pence_two": 300, "pence_five": 3500, "pence_ten": 4500, "pence_twenty": 1000, "pence_fifty": 1000, "pound_one": 12000, "pound_two": 4000, "note_five": 0, "total": 27100 }, "loose": { "pence_one": 0, "pence_two": 0, "pence_five": 0, "pence_ten": 0, "pence_twenty": 0, "pence_fifty": 0, "pound_one": 0, "pound_two": 0, "other": 0, "total": 0 }, "notes": { "note_one": 0, "note_five": 0, "note_ten": 0, "note_twenty": 0, "note_fifty": 5000, "total": 5000 }, "total": 0 };
var incompleteCount = { "bagged": { "pence_one": 0, "pence_two": 300, "pence_five": 3500, "pence_ten": 0, "pence_twenty": 0, "pence_fifty": 1000, "pound_one": 12000, "pound_two": 4000, "note_five": 0, "total": 20800 }, "loose": { "pence_one": 0, "pence_two": 0, "pence_five": 0, "pence_ten": 0, "pence_twenty": 0, "pence_fifty": 0, "pound_one": 0, "pound_two": 0, "other": 0, "total": 0 }, "notes": { "note_one": 0, "note_five": 0, "note_ten": 0, "note_twenty": 0, "note_fifty": 5000, "total": 5000 }, "total": 0 };
var unverifiedCount = { "bagged": { "pence_one": 400, "pence_two": 200, "pence_five": 4000, "pence_ten": 1000, "pence_twenty": 2000, "pence_fifty": 9000, "pound_one": 8000, "pound_two": 12000, "note_five": 0, "total": 36600 }, "loose": { "pence_one": 0, "pence_two": 0, "pence_five": 0, "pence_ten": 0, "pence_twenty": 0, "pence_fifty": 0, "pound_one": 0, "pound_two": 0, "other": 0, "total": 0 }, "notes": { "note_one": 0, "note_five": 0, "note_ten": 0, "note_twenty": 0, "note_fifty": 5000, "total": 5000 }, "total": 0 };
var counts = [
    { repository: '403', status: 'complete', timestamp: 1616094172738, _id: 'fen3fuh43f8hf2h2fh87h', data: completeCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
    { repository: '401', status: 'complete', timestamp: 1616094172738, _id: 'xm3rgm439x8ug9348cg98', data: completeCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
    { repository: '403', status: 'incomplete', timestamp: 1616094172738 - 14863542, _id: 'oiweiowenfbnowg093893', data: partialCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
    { repository: '401', status: 'unverified', timestamp: 1616094172738 - 248635424, _id: 'aldpqwomcpm2f2309j0jv', data: incompleteCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
    { repository: 'lotto', status: 'incomplete', timestamp: 1616094172738 - 348635424, _id: 'p0kd209xxf3349c3094gj', data: completeCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
    { repository: '403', status: 'partial', timestamp: 1616094172738 - 442635424, _id: '02j3f092j3fj8r9232222', data: partialCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
    { repository: '401', status: 'partial', timestamp: 1616094172738 - 442635424, _id: '09jf92ehfn9hfpe38hhf3', data: partialCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
    { repository: '403', status: 'complete', timestamp: 1616094172738 - 493685464, _id: 'f32ojf093jtx0k4ugx384', data: completeCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
    { repository: '403', status: 'complete', timestamp: 1616094172738 - 492685464, _id: '3ncty3oky4toy3ohc8234', data: completeCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
    { repository: 'lotto', status: 'complete', timestamp: 1616094172738 - 552635424, _id: '3rx394w5xh34xt43g34gq', data: completeCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
    { repository: 'lotto', status: 'unverified', timestamp: 1616094172738 - 862635424, _id: 'eg9crw1g8rw6tb24r9t84', data: unverifiedCount, counter: "", supervisor: "", verified: true },
    { repository: '403', status: 'complete', timestamp: 1616094172738 - 89234245, _id: 'fj9839g34tmc0h4thcg03', data: incompleteCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
];
var createId = function () {
    var one = function () {
        var lower = function () { return String.fromCharCode(Math.floor((Math.random() * 26) + 97)); };
        var upper = function () { return String.fromCharCode(Math.floor((Math.random() * 26) + 65)); };
        var num = function () { return String.fromCharCode(Math.floor((Math.random() * 10) + 48)); };
        var options = [lower, upper, num];
        return options[Math.floor(Math.random() * 3)]();
    };
    var str = '';
    for (var i = 0; i < 21; i++) {
        str += one();
    }
    return str;
};
// Redux : true
// Action : countsDataWriteAll
// Logic : /Counts
var getCounts = function (req, res) {
    res.json({ counts: counts });
};
exports.getCounts = getCounts;
// Redux : false
// Action : countsDataWriteSingle
// Logic : false
var addCount = function (req, res) {
    var _id = createId();
    var _a = req.body, repository = _a.repository, status = _a.status, date = _a.date, data = _a.data;
    var count = { repository: repository, status: status, date: date, data: data, _id: _id };
    counts.push(count);
};
exports.addCount = addCount;
// Redux : n/a
// Action : n/a
// Logic : /Count/index
var getCount = function (req, res) {
    var id = req.params.id;
    function queryCount() {
        var count = counts.filter(function (each) { return each._id === id; })[0];
        return count;
    }
    res.json({
        count: queryCount()
    });
    // res.json('getCount route not implamented yet')
};
exports.getCount = getCount;
// Redux : false
// Action : countsDataUpdateSingle
// Logic : false
var updateCount = function (req, res) {
    console.log("[updateCount]: Pretend that i'm updating: " + req.body._id);
    res.json({ counts: counts });
};
exports.updateCount = updateCount;
// Redux : false
// Action : false
// Logic : false
var deleteCount = function (req, res) {
    console.log("[updateCount]: Pretend that i'm deleting: " + req.body._id);
    res.json({ counts: counts });
};
exports.deleteCount = deleteCount;
//# sourceMappingURL=countRoutes.js.map