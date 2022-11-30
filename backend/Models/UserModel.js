import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, //createdAt
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); //database mein to encrypted password hy ... is leye jo user password dalay ga usy bcrypt k zareye compare kar rahy hein idr
};

//middleware
//User data database mein save karny sy pehly ye middleware chaly ga password ko encrypt karny k leye
userSchema.pre('save', async function (next) {
  //agr password modify nai hoa to encryption run karny ki bajaye agay barh jao... ye us case mein useful hy jab user apna email ya name update kary aur password change na kary... agr is case mein encryption run ki to user login nai kar saky ga...
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); //jo user password dal raha hy usy plain text sy hashed password mein convert kar rahy
});

const User = mongoose.model('User', userSchema);

export default User;
