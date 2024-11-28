const User = require('../models/users.models');
const { response_status } = require('../utils/response_status');

class UsersController {
  register(req, res) {
    const data = {
      name: req.body.name,
      email: req.body.email,
      //password: hashPassword(req.body.password),
      password: req.body.password
    };

    User.create(data)
      .then((response) => {
        res.status(response_status.CREATED).send(response);
      })
      .catch((e) => {
        res.status(response_status.BAD_REQUEST).send('Failed to create user' + e);
      });
  }

  login(req, res) {
    const data = {
      email: req.body.email,
      //password: hashPassword(req.body.password)
      password: req.body.password
    };

    User.findOne(data)
      .then((response) => {
        if (response == null) {
          throw new Error(`${response.errors.message}`);
        }
        const user_data = {
          name: response.name,
          email: response.email,
        };
        const token = "123";
        res.status(response_status.SUCCESS).send({ token });

        //const send_token = create(user_data);
        //res.status(response_status.SUCCESS).send({ token: send_token });
      })
      .catch((e) => {
        res.status(response_status.BAD_REQUEST).send(`Invalid credentials - ${e}`);
      });
  }
}

module.exports = UsersController;
