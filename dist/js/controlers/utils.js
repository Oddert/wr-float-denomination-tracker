"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCount = exports.respondErr = exports.respondBadRequest = exports.respondWell = void 0;
var respondWell = function (res, status, errorMessage, responseMessage, other) {
    return res
        .status(status || 200)
        .json(__assign({ status: status || 200, errorMessage: errorMessage, responseMessage: responseMessage || 'Request processed successfully.' }, other));
};
exports.respondWell = respondWell;
var respondBadRequest = function (res, status, errorMessage, responseMessage, other) {
    return res
        .status(status || 400)
        .json(__assign({ status: status || 400, errorMessage: errorMessage || 'There was an error in your request, no content was found.', responseMessage: responseMessage }, other));
};
exports.respondBadRequest = respondBadRequest;
var respondErr = function (res, status, errorMessage, responseMessage, other) {
    return res
        .status(status || 500)
        .json(__assign({ status: status || 500, errorMessage: errorMessage || 'There was a error processing your reponse.', responseMessage: responseMessage }, other));
};
exports.respondErr = respondErr;
var validateCount = function (count) {
    // LAST CHANGE: 14-04-2021 1220
    console.log('### Begin Count ###');
    console.log(count);
    if (count === undefined)
        failMissingData('Count is not defined.');
    var sampleState = {
        repository: 0,
        counter: '',
        counterId: '',
        supervisor: '',
        supervisorId: '',
        data: {
            bagged: {
                pence_one: 0,
                pence_two: 0,
                pence_five: 0,
                pence_ten: 0,
                pence_twenty: 0,
                pence_fifty: 0,
                pound_one: 0,
                pound_two: 0,
                note_five: 0,
                total: 0,
            },
            loose: {
                pence_one: 0,
                pence_two: 0,
                pence_five: 0,
                pence_ten: 0,
                pence_twenty: 0,
                pence_fifty: 0,
                pound_one: 0,
                pound_two: 0,
                other: 0,
                total: 0,
            },
            notes: {
                note_one: 0,
                note_five: 0,
                note_ten: 0,
                note_twenty: 0,
                note_fifty: 0,
                total: 0,
            },
            total: 0,
        },
        timestamp: Date.now(),
        ready: false,
        verified: true,
    };
    var response;
    var verified = true;
    var baggedCheckPass = false;
    var looseCheckPass = false;
    var notesCheckPass = false;
    function failMissingData(message) {
        // console.log('~call to failMissingData~', {
        // 	code: 'invalid',
        // 	message,
        // 	verified,
        // })
        return {
            code: 'invalid',
            message: message,
            verified: verified,
        };
    }
    // function isVerifiedCheck () {
    // 	if (count.hasOwnProperty('counterId') && /\w+/gi.test(count.counterId)) {
    // 		const EXT = `/api/v1/user/${count.counterId}`
    // 		const OPTS = {
    // 			method: 'GET',
    // 			headers: {
    // 				'Content-Type': 'application/json'
    // 			}
    // 		}
    // 		fetch(EXT, OPTS)
    // 		.then(res => res.json())
    // 		.then(data => {
    // 			console.log({ data })
    // 			if (data.user) {
    // 				verified = true
    // 			} else {
    // 				verified = false
    // 			}
    // 		})
    // 		.catch(() => {
    // 			verified = false
    // 		})
    // 	} else {
    // 		if (count.verified && count.verified === true) verified = true
    // 		else verified = false
    // 	}
    // }
    function missingDataCheck() {
        if (count === null) {
            return failMissingData('No count provided, recieved null');
        }
        if (count === undefined) {
            return failMissingData('No count provided, recieved undefined');
        }
        if (count === '') {
            return failMissingData('No count provided, recieved an empty string');
        }
    }
    // # Invalid Check
    // check is null data
    // check level 1 properties exist
    // for data.bagged .loose .notes check all attrs exist
    // # Partial count Check
    // for each prop in bagged - check has non NaN value
    // # Complete check
    // for loose each value check non NaN value
    // for notes each value check non NaN value
    function propsCheck() {
        if (!count.hasOwnProperty('data')) {
            return failMissingData('Object count has no such property "data".');
        }
        var dataKeys = Object.keys(sampleState.data);
        dataKeys.forEach(function (key) {
            if (!count.data.hasOwnProperty(key)) {
                return failMissingData("Object count.data has no such property \"" + key + "\"");
            }
            // @ts-ignore suppressImplicitAnyIndexErrors
            var itemisedKeys = Object.keys(sampleState.data[key]);
            itemisedKeys.forEach(function (item) {
                if (!count.data[key].hasOwnProperty(item)) {
                    return failMissingData("Object count.data[" + key + "] has no such property \"" + item + "\"");
                }
            });
        });
    }
    // function checkAuthor () {
    // 	if (count && count.hasOwnProperty('counter')) {
    // 		if (typeof count.counter === 'boolean') return failMissingData('counter (author) on count is the wrong data type (number)')
    // 		if (typeof count.counter === 'number') return failMissingData('counter (author) on count is the wrong data type (number)')
    // 		if (typeof count.counter === 'object') return failMissingData('counter (author) on count is the wrong data type (number)')
    // 	} else return failMissingData('No counter (author) found on the count object.')
    // }
    function baggedCompleteCheck() {
        if (!count.data)
            return failMissingData('No such property "data" on count.');
        if (!count.data.bagged)
            return failMissingData('No such property "bagged" on "count.data".');
        var baggedKeys = Object.keys(sampleState.data.bagged);
        var error = false;
        var result = baggedKeys.reduce(function (acc, each) {
            if (error)
                return acc;
            // @ts-ignore
            if (!count.data.bagged.hasOwnProperty(each))
                error = each;
            // @ts-ignore
            if (typeof count.data.bagged[each] === 'number')
                return acc;
            // @ts-ignore
            if (count.data.bagged[each] === null)
                return false;
            error = each;
            return false;
        }, true);
        if (error)
            return failMissingData("[Bagged Coin Check]: invalid value for property \"" + error + "\". Expected null or number but recieved \"" + count.data.bagged[error] + "\"");
        baggedCheckPass = result;
    }
    function looseCompleteCheck() {
        if (!count.data)
            return failMissingData('No such property "data" on count.');
        if (!count.data.loose)
            return failMissingData('No such property "loose" on "count.data".');
        var looseKeys = Object.keys(sampleState.data.loose);
        var error = false;
        var result = looseKeys.reduce(function (acc, each) {
            if (error)
                return acc;
            // @ts-ignore
            if (!count.data.loose.hasOwnProperty(each))
                error = each;
            // @ts-ignore
            if (typeof count.data.loose[each] === 'number')
                return acc;
            // @ts-ignore
            if (count.data.loose[each] === null)
                return false;
            error = each;
            return false;
        }, true);
        if (error)
            return failMissingData("[Loose Coin Check]: invalid value for property \"" + error + "\". Expected null or number but recieved \"" + count.data.loose[error] + "\"");
        looseCheckPass = result;
    }
    function notesCompleteCheck() {
        if (!count.data)
            return failMissingData('No such property "data" on count.');
        if (!count.data.notes)
            return failMissingData('No such property "notes" on "count.data".');
        var notesKeys = Object.keys(sampleState.data.notes);
        var error = false;
        var result = notesKeys.reduce(function (acc, each) {
            if (error)
                return acc;
            // @ts-ignore
            if (!count.data.notes.hasOwnProperty(each))
                error = each;
            // @ts-ignore
            if (typeof count.data.notes[each] === 'number')
                return acc;
            // @ts-ignore
            if (count.data.notes[each] === null)
                return false;
            error = each;
            return false;
        }, true);
        if (error) {
            notesCheckPass = false;
            return failMissingData("[Notes Coin Check]: invalid value for property \"" + error + "\". Expected null or number but recieved \"" + count.data.notes[error] + "\"");
        }
        else {
            notesCheckPass = result;
        }
    }
    function assignPartialOrComplete() {
        console.log({ baggedCheckPass: baggedCheckPass, looseCheckPass: looseCheckPass, notesCheckPass: notesCheckPass });
        function partial(message) {
            return {
                code: 'partial',
                message: message,
                verified: verified,
            };
        }
        if (baggedCheckPass) {
            if (looseCheckPass && notesCheckPass) {
                return {
                    code: 'complete',
                    message: 'all values found',
                    verified: verified,
                };
            }
            else if (looseCheckPass) {
                return partial('notes have missing values');
            }
            else if (notesCheckPass) {
                return partial('loose coins have missing values');
            }
            else {
                return partial('notes and loose coins have missing values');
            }
        }
        else {
            return {
                code: 'incomplete',
                message: 'bagged coin has missing values',
                verified: verified,
            };
        }
    }
    // # Verified type checks
    // isVerifiedCheck()
    // # Invalid type checks
    // missingDataCheck()
    // propsCheck()
    // checkAuthor()
    // # Partial type checks
    // baggedCompleteCheck
    // # Complete type checks
    // looseCompleteCheck
    // noteCompleteCheck
    // assignPartialOrComplete
    // if complete return complete
    // if partial return partial
    function callChecks() {
        var tests = [
            // isVerifiedCheck, 
            missingDataCheck,
            propsCheck,
            // checkAuthor, 
            baggedCompleteCheck,
            looseCompleteCheck,
            notesCompleteCheck,
            assignPartialOrComplete
        ];
        tests.forEach(function (each) {
            var res = each();
            if (res && !response)
                response = res;
        });
    }
    callChecks();
    if (response)
        return response;
    return {
        code: 'incomplete',
        message: '[default] no count provided',
        verified: verified,
    };
};
exports.validateCount = validateCount;
//# sourceMappingURL=utils.js.map