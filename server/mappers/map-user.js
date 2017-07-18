module.exports = function (user){
  return {
    id: user.id,
    username: user.username,
    password: user.password,
    name: user.name,
    email: user.email,
    firstname: user.firstname,
    addressName: user.addressName,
    street: user.street,
    house: user.house,
    bus: user.bus,
    postal: user.postal,
    city: user.city,
    country: user.country,
    registered: true
  };
};