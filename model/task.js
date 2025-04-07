import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: [100, "Title cannot exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    },
    statusType: {
        type: String,
        enum: {
            values: ['ToDo', 'In Progress', 'Done'],
            message: '{VALUE} is not a valid status'
        },
        required: [true, "Status is required"],
        default: 'ToDo'
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
        min: [Date.now, "Due date cannot be in the past"]
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:false
    }
}, {
    timestamps: true
});

// Add index for better query performance
taskSchema.index({ createdBy: 1, statusType: 1 });
taskSchema.index({ dueDate: 1 });

const Task = mongoose.model('Task', taskSchema);

export default Task;