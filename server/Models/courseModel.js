import {model , Schema} from 'mongoose'

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true,'Title is Required'],
        minLength: [8,'Title Must be 8 Character'],
        maxLength: [100,'Title At Most 8 Character'],
        trim: true
    },
    description: {
        type: String,
        required: true,
        minLength: [10,'Description Must be 100 Character'],
        maxLength: [1000,'Description At Most 1000 Character'],
        trim: true
    },
    catagory: {
        type: String,
        required: [true,'Catagory Must Be Required'],
        trim: true
    },
    thumbnail: {
        public_id: {
            type: String,
            required: true
        },
        secure_url:{
            type: String,
            required: true
        }
    },
    lectures: [
        {
            title: String,
            description: String,
            lecture:{
                public_id: {
                    type: String,
                    required: true
                },
                secure_url:{
                    type: String,
                    required: true
                }
            }
        }
    ],
    numbersOfLectures: {
        type: Number,
        default: 0,
    },
    createdBy: {
        type: String,
        required: true
    }
},{timestamps: true})

const Course = model('Course',courseSchema);

export default Course;