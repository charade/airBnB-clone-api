const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../model/modelUtils');

/// ///////// signup///////
exports.signUp = async (req, res) => {
  const {
    email, password, first_name, last_name, role,
  } = req.body;

  try {
    const regEmail = /^([a-z A-Z 0-9](\.)?)+@\w+\.(\w){2,4}$/;
    const regRole = /^(hote|touriste)$/;

    if (regEmail.test(email) && regRole.test(role)) {
      const hash = await bcrypt.hash(password, 10);
      const user = {
        first_name,
        last_name,
        email,
        role,
        password: hash,
      };
      const userAlreadyexistsArr = await utils.getUser(email, role);

      if (userAlreadyexistsArr[0].length === 0) {
        await utils.createAccount(user);
        res.status(200).json({ message: 'user registered' });
        return;
      }
      res.status(400).json({ message: 'email already exists' });
    } else {
      if (regEmail.test(email)) {
        res.status(400).json({ err: 'mauvais format Email' });
        return;
      }

      res.status(400).json({ err: 'les rôle disponible sont touriste ou hote' });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

/// ///// login  ////////
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const { role } = req.params;
  try {
    const resp = await utils.login(email, role);

    if (resp[0].length !== 0) {
      const checkPassword = await bcrypt.compare(password, resp[0].password);
      if (checkPassword) {
        next();
      } else {
        res.status(403).json({ message: 'invalid password' });
      }
      return;
    }
    res.status(404).json({ message: "user doesn't exist" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.authentication = async (req, res) => {
  const { email } = req.body;
  const { role } = req.params;

  try {
    const userResponse = await utils.getUser(email, role);

    const user = {
      email,
      role,
      first_name: userResponse[0][0].first_name,
      id: userResponse[0][0].id,
    };
    const token = await jwt.sign(user, process.env.SECRET);
    // console.log(res.cookies.authentication)
    res.status(200).json({ message: `bienvenu ${user.first_name} en tant que ${user.role}`, token });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
