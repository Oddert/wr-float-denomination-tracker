"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.addUser = exports.getUsers = void 0;
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
var users = [
    {
        id: createId(),
        shortUid: '1023',
        firstName: 'Robyn',
        middleNames: 'F H',
        lastName: 'Veitch',
        access: 10,
        created: 1616684709029,
        updated: 1616684932308,
    },
    {
        id: createId(),
        shortUid: '1064',
        firstName: 'Jhony',
        middleNames: null,
        lastName: 'No Privelege',
        access: 1,
        created: 1616684709029,
        updated: 1616684932308,
    },
    {
        id: createId(),
        shortUid: '1067',
        firstName: 'Manager',
        middleNames: null,
        lastName: null,
        access: 2,
        created: 1616684709029,
        updated: 1616684932308,
    },
];
var getUsers = function (req, res) {
    res.json({
        users: users,
    });
};
exports.getUsers = getUsers;
var addUser = function (req, res) {
    res.json('addUser route not implamented yet');
};
exports.addUser = addUser;
var getUser = function (req, res) {
    var user = users.reduce(function (acc, each) {
        if (each.id === req.params.id)
            return each;
        else
            return acc;
    }, null);
    if (user) {
        res.status(200).json({
            user: user
        });
    }
    else {
        res.status(200).json({
            message: 'No such user found'
        });
    }
};
exports.getUser = getUser;
var updateUser = function (req, res) {
    res.json('updateUser route not implamented yet');
};
exports.updateUser = updateUser;
var deleteUser = function (req, res) {
    res.json('deleteUser route not implamented yet');
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userRoutes.js.map