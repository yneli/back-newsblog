import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      unique: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Comment', CommentSchema);