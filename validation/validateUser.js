import Joi from 'joi';
const schema = Joi.object().keys({
  username: Joi.string().email(),
  name: Joi.string().min(1).max(100).required(),
  firstname: Joi.string().min(1).max(100).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  confirmPassword: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  admin: Joi.boolean(),
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