import Joi from 'joi';
const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  name: Joi.string().alphanum().min(1).max(100).required(),
  firstname: Joi.string().alphanum().min(1).max(100).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  email: Joi.string().email(),
  admin: Joi.boolean()
});
export default function validateUser(user){
  return Joi.validate(user, schema);
}