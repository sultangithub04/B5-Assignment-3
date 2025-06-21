import mongoose, { Schema, Types } from "mongoose";



interface IBorrow {
    book: Types.ObjectId;
    quantity: number;
    dueDate:Date;
}



const borrowSchema: Schema<IBorrow> = new Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, 'Book reference is required'],
    },
    quantity: {
        type: Number,
        reuired: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1']
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required'],
        validate: {
            validator:  (value: Date)=>value > new Date(),
            message: 'Due date must be in the future'
        },
    }
},
{
    timestamps: true,
    versionKey: false
})

borrowSchema.pre("save",async function(next){
    const book= await mongoose.model('Book').findById(this.book)
    if(!book) return next(new Error('Book not Found'))
    if(book.copies<this.quantity){
        return next (new Error('Not enough copy available'))
    }
    book.copies -= this.quantity
    if(book.copies===0) book.available=false
    await book.save()
    next()
})

export const Borrow = mongoose.model<IBorrow>('Borrow', borrowSchema)