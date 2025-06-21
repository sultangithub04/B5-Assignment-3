import mongoose, { Schema } from "mongoose";


interface IBook {
    title: string;
    author: string;
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
    isbn: string;
    description?: string;
    copies: number;
    available?: boolean;
    checkAvailability(): void;

}


const bookSchima: Schema<IBook> = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']

    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true

    },
    description: {
        type: String,
        default: '',

    },
    copies: {
        type: Number,
        min: [0, 'Copies must be a positive number'],
        required: true,

    },
    available: {
        type: Boolean,
        required: true,

    },

    
},
    {
        timestamps: true,
        versionKey: false
    },
   
)

bookSchima.methods.checkAvailability = function () {
  this.available = this.copies > 0;
};

bookSchima.pre<IBook>('save', function (next) {
  this.checkAvailability();
  next();
});

bookSchima.post('findOne', function (doc) {
  console.log(`Book "${doc?.title}" was fetched from DB`);
});

export const Book = mongoose.model<IBook>("Book", bookSchima)