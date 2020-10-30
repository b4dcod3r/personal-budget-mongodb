const mongoose = require ("mongoose");

const mybudget = new mongoose.Schema({
    label: {
        type: String,
        trim: true,
        required: true,
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
        match: [/^#(?:[0-9a-fA-F]{3}){1,2}$/, "Not a hex color"]
    }
}, {collection: 'mybudget'})

module.exports = mongoose.model('mybudget', mybudget)