const User = require('./User');
const Friend = require('./Friend');
const Note = require('./Note');


User.hasMany(Friend);
Friend.belongsTo(User);

User.hasMany(Note);
Note.belongsTo(User);





module.exports = {
    User,
    Friend,
    Note
}