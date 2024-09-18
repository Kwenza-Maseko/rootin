import mongoose, { Schema, Document } from 'mongoose';

interface IRoutine extends Document {
  userId: mongoose.Schema.Types.ObjectId;  
  routines: {
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    status: 'pending' | 'completed' | 'missed';
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const RoutineSchema: Schema = new Schema<IRoutine>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Assumes a 'User' model exists
    required: true
  },
  routines: [
    {
      name: { type: String, required: true },
      description: { type: String, required: false },
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
      status: { 
        type: String, 
        enum: ['pending', 'completed', 'missed'], 
        default: 'pending' 
      }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Routine = mongoose.model<IRoutine>('Routine', RoutineSchema);

export default Routine;