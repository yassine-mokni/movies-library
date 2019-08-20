const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    name: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    rating: {
        type: 'number',
    }
});

module.exports = Movie = mongoose.model('movie', MovieSchema);