const User = require('./User');
const Friend = require('./Friend');
const Note = require('./Note');


Friend.belongsTo(User);
User.hasMany(Friend);

Note.belongsTo(User);
User.hasMany(Note);





module.exports = {
    User,
    Friend,
    Note
}