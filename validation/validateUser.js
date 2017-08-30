import Joi from 'joi';
const schema = Joi.object().keys({
  username: Joi.string().email(),
  name: Joi.string().min(1).max(100).required(),
  firstname: Joi.string().min(1).max(100).required(),
  password: Joi.string().min(6).max(100).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).options({
    language: {
      any: {
        allowOnly: 'Passwords and confirm password are not identical'
      }
    }
  }),
  admin: Joi.boolean(),
  addressName: Joi.string(),
  street: Joi.string(),
  house: Joi.string().min(1).max(5),
  bus: Joi.string().max(10),
  postal: Joi.string().min(1).max(10),
  city: Joi.string().min(1).max(100),
  country: Joi.string().min(1).max(100),
});
export default function validateUser(user){
  return Joi.validate(user, schema, {abortEarly: false});
}