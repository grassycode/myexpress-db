var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var unitSchema = new Schema({
    _id: Schema.Types.ObjectId,
    num_rooms: Number,
    kitchen: Number,
    washroom: Number,
    parking: Number,
    rent: Number
});

var propertySchema = new Schema({
    _id: Schema.Types.ObjectId,
    address: {
        streetNo: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        province: String,
        country: String,
        postalCode: String
    },
    units: [{ type: Schema.Types.ObjectId, ref: 'Unit' }]
});

var userSchema = new Schema({
    _id: String,
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

propertySchema.methods.findPropertyByUser = function (prop) {
    return this.model('Property').find({ city: this.address.city }, prop);
}

Story.
    findOne({ title: 'Casino Royale' }).
    populate('author').
    exec(function (err, story) {
        if (err) return handleError(err);
        console.log('The author is %s', story.author.name, story.author.age);
    });

Story.findOne({ title: 'S1' }, function (error, story) {
    if (error) {
        return handleError(error);
    }
    story.author = author;
    story.save();
    console.log(story.author.name); // prints "Ian Fleming"
});


Story.findOneAndRemove({ title: 'S_A1' }).where("author").ne(null).
    populate('author').
    exec(function (err, story1) {
        console.log(story1)
        story1.author.stories.pop(story1._id);
        story1.author.save()
    })



module.exports.Property = mongoose.model('Property', propertySchema);
module.exports.Unit = mongoose.model('Unit', unitSchema);
module.exports.User = mongoose.model('User', userSchema);


