var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jams', { useNewUrlParser: true });
var Schema = mongoose.Schema;

var personSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Person' },
    title: String,
    fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

var Story = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);

var author = new Person({
    _id: new mongoose.Types.ObjectId(),
    name: 'Test me1',
    age: 11
});

author.save(function (err) {
    if (err) return handleError(err);

    var story1 = new Story({
        title: 'Casino Royale1',
        author: author._id    // assign the _id from the person
    });

    story1.save(function (err) {
        if (err) return handleError(err);
        // thats it!
    });
});


// Story.
//     findOne({ title: 'Casino Royale' }).
//     populate('author').
//     exec(function (err, story) {
//         if (err) return handleError(err);
//         console.log('The author is %s', story.author.name);
//         // prints "The author is Ian Fleming"
//     });
