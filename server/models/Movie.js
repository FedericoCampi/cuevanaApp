import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
        trim: true
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    poster:{
        type: String,
        trim: true
    },
    year:{
        type: Number,
        trim: true
    },
    sypnosis:{
        type: String,
        trim: true
    },
    rating:{
        type: Number,
        trim: true
    },
    duration:{
        type: String,
        trim: true
    },
    director:{
        type: Array,
        trim: true
    },
    genres:{
        type: Array,
        trim: true
    },
    cast:{
        type: Array,
        trim: true
    }
})

export default mongoose.model('Movie', movieSchema)