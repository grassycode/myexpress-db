var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var unitSchema = new Schema({
    num_rooms: Number,
    kitchen: Number,
    washroom: Number,
    parking: Number,
    rent: Number
});

var propertySchema = new Schema({
    address: {
        streetNo: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        province: String,
        country: String,
        postalCode: String
    },
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    units: [{ type: Schema.Types.ObjectId, ref: 'Unit' }]
});

var userSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    middleName: String,
    secondName: String,
    gender: String,
    status: String,
    dob: Date,
    properties: [{ type: Schema.Types.ObjectId, ref: 'Property' }]
});

// Story.findOneAndRemove({ title: 'S_A1' }).where("author").ne(null).
//     populate('author').
//     exec(function (err, story1) {
//         console.log(story1)
//         story1.author.stories.pop(story1._id);
//         story1.author.save()
//     })


module.exports.Property = mongoose.model('Property', propertySchema);
module.exports.Unit = mongoose.model('Unit', unitSchema);
module.exports.User = mongoose.model('User', userSchema);


