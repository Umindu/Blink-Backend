const {model, Schema} = require('mongoose');

const postSchema = new Schema({
    publisherid: {
        type: Schema.Types.String,
        required: [true, 'Publisher is required']
    },
    time: {
        type: Schema.Types.Date,
        required: [true, 'Time is required']
    },
    tag: {
        type: Schema.Types.String,
        required: [true, 'Tag is required']
    },
    discription: {
        type: Schema.Types.String,
        required: [true, 'Discription is required']
    },
    image: {
        type: Schema.Types.String,
        required: [true, 'Image is required']
    },
});

const PostModal = model('post', postSchema);
module.exports = PostModal;
