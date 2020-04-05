const User = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const crypto = require('crypto');
const nodeMailer = require('nodeMailer')
const fs = require('fs');
const path = require('path')
require('dotenv').config({
  path: process.env.DOTENV || '.env'
})

const Users = {
  active: (req, res, next) => {
    // find the corresponding user
    User.findOne({
      activeToken: req.params.activeToken,

      // check if the expire time > the current time       activeExpires: {$gt: Date.now()}
    }, (err, user) => {
      if (err) return next(err);

      // invalid activation code
      if (!user) {
        return res.status(401).json({
          auth: false,
          message: 'Le lien est incorrect ou expiré'
        });

      }
      if (user.activated) {
        res.status(403).json({
          auth: false,
          message: 'Le lien a déjá été utilisé'
        })
      } else {
        user.activated = true;
        user.save((err, user) => {
          if (err) return next(err);
          // activation success
          res.status(200).json({
            auth: false,
            message: 'Vous avez activé votre compte'
          })
        });
      }
    });

  },

  register: (req, res, next) => {
    const {
      body: {
        user
      }
    } = req;
    if (!user.email) {
      return res.status(422).json({
        errors: {
          email: 'is required',
        },
      });
    }

    if (!user.password) {
      return res.status(422).json({
        errors: {
          password: 'is required',
        },
      });
    }
    User.findOne({
      email: user.email
    }, (err, userFound) => {
      if (err) {
        return next(err);
      } else if (userFound) {
        return res.status(409).json({
          errors: {
            message: 'Ressource is already present',
          },
        });
      } else {
        const finalUser = new User(user);

        bcrypt.hash(finalUser.password, 10, function (err, hash) {
          if (err)
            return next(err);

          // Store hash in database
          finalUser.password = hash
          crypto.randomBytes(20, function (err, buf) {
            if (err)
              return next(err);
            // Ensure the activation code is unique.
            finalUser.activeToken = finalUser._id + buf.toString('hex');
            // Set expiration time is 24 hours.
            finalUser.activeExpires = Date.now() + 24 * 3600 * 1000;

            const link = 'http://localhost:8080/api/active/' +
              finalUser.activeToken;


            let transporter = nodeMailer.createTransport({
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                // should be replaced with real sender's account
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
              }
            });
            let mailOptions = {
              // should be replaced with real recipient's account
              to: user.email,
              subject: "Hello ✔", // Subject line,

              html: 'Please click <a href="' + link + '"> here </a> to activate your account. '
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log('Message %s sent: %s', info.messageId, info.response);
              finalUser.save((err, user) => {
                if (err)
                  return res.status(500).json({
                    auth: false,
                    message: "There was a problem adding the information to the database."
                  })



                res.status(200).json({
                  auth: false,
                  user: user,
                  message: 'User created, needs to login'
                });
              });
            });
          })
        })

      }
    })
  },

  login: (req, res, next) => {
    const {
      body: {
        user
      }
    } = req;
    console.log('test')
    if (!user.email) {
      return res.status(422).json({
        errors: {
          email: 'is required',
        },
      });
    }

    if (!user.password) {
      return res.status(422).json({
        errors: {
          password: 'is required',
        },
      });
    }
    User.findOne({
      email: user.email
    }, (err, userBase) => {
      if (err)
        return res.status(500).json({
          auth: false,
          message: 'Error on the server.'
        })

      if (!userBase)
        return res.status(404).json({
          auth: false,
          message: 'No user found.'
        })

      let passwordIsValid = bcrypt.compareSync(user.password, userBase.password);

      if (!passwordIsValid)
        return res.status(401).json({
          auth: false,
          message: 'Le nom utilisateur ou le mot de passe est inccorect'
        })
      if (!userBase.activated) {
        return res.status(401).json({
          auth: false,
          message: 'User is not activeted'
        })

      } else {
        const privateKey = fs.readFileSync(path.resolve(__dirname, '../../.jwtRS256.key'), 'utf8');
        // // To make the JWT more efficient we need 3 things
        // // let i = '; // Issuer (Software organization who issues the token)
        // let s = ''; // Subject (intended user of the token)
        // let a = ''; // Audience (Domain within which this token will live and function)

        // Token signing options

        jwt.sign({
          id: userBase.id,
        }, privateKey, {
          issuer: process.env.ISSUER,
          subject: process.env.SUBJECT,
          audience: process.env.AUDIENCE,
          expiresIn: process.env.EXPIRES_IN,
          algorithm: process.env.ALGORITHM,
        }, (err, token) => {
          if (err) return next(err)
          res.status(200).json({
            auth: true,
            token: token,
            exp: 86400 * 1000
          });
        });
        // let token = jwt.sign({
        //     id: userBase.id,
        //   }, privateKey, signOptions

        // );

        // return the information including token as JSON

      }
    });
  },

  current: (req, res) => {
    User.findById(req.userId, {
      password: 0
    }, function (err, user) {
      if (err) return res.status(500).json({
        auth: false,
        message: 'There was a problem finding the user.',
      })
      if (!user) return res.status(404).json({
        auth: false,
        message: 'User not found',
      })

      res.status(200).json({
        auth: true,
        user: user

      })
    });
  },
  logout: (res, req) => {
    User.findById(req.userId, {
      password: 0
    }, function (err, user) {
      if (err) return res.status(500).json({
        auth: false,
        message: 'There was a problem finding the user.',
      })
      if (!user) return res.status(404).json({
        auth: false,
        message: 'User not found',
      })

      res.status(200).json({
        auth: true,
        user: user

      })
    });
  }

}


module.exports = Users