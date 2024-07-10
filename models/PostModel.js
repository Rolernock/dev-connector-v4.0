import mongoose from 'mongoose'
const { Schema } = mongoose

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    text: {
      type: String,
      required: true
    },
    name: String,
    avatar: String,
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      }
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
        text: {
          type: String,
          required: true
        },
        name: String,
        avatar: String,
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
)

const PostModel = mongoose.model('Post', PostSchema)

export default PostModel
