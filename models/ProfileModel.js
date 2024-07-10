import mongoose from 'mongoose'
const { Schema } = mongoose

const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    company: String,
    githubusername: String,
    website: String,
    location: String,
    status: {
      type: [String],
      required: true
    },
    skills: {
      type: [String],
      required: true
    },
    bio: String,
    experience: [
      {
        title: {
          type: String,
          required: true
        },
        company: {
          type: String,
          required: true
        },
        location: String,
        from: {
          type: Date,
          required: true
        },
        to: Date,
        current: {
          type: Boolean,
          default: false
        },
        description: String
      }
    ],
    education: [
      {
        school: {
          type: String,
          required: true
        },
        degree: {
          type: String,
          required: true
        },
        fieldofstudy: {
          type: String,
          required: true
        },
        from: {
          type: String,
          required: true
        },
        to: Date,
        current: {
          type: Boolean,
          default: false
        },
        description: String
      }
    ],
    social: {
      youtube: String,
      twitter: String,
      facebook: String,
      linkedin: String,
      instagram: String
    }
  },
  { timestamps: true }
)

const ProfileModel = mongoose.model('Profile', ProfileSchema)

export default ProfileModel
