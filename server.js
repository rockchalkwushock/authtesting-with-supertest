import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

const app = express();

const users = [];

// Required to get access to `req.body`.
// NOTE: Make sure this is before expressValidator!!!
app.use(bodyParser.json());

// Connects expressValidator so it can transform the req object.
app.use(expressValidator({
    customValidators: {
        isExistingUser: (value) => !!users[value]
    }
}));

app.post('/api/register', (req, res) => {
  req.checkBody({
    name: {
      isAlpha: true,
      isLength: {
        options: [{ min: 2, max: 50 }],
        errorMessage: 'Name must be between 2 and 50 characters.'
      },
      errorMessage: 'Name must have only alphabetical characters.'
    }
  });

  const errors = req.validationErrors();

  if (errors) res.status(400).json({ errors: errors });

  const userIndex = users.push(req.body) - 1;

  res.json(users[userIndex]);
});

app.post('/api/login', (req, res) => {
  req.checkBody({
    userID: {
      isNumeric: true,
      isExistingUser: {
        errorMessage: 'That user does not exist.'
      },
      errorMessage: 'Authentication requires a number.'
    }
  });

  const errors = req.validationErrors();

  if (errors) res.status(400).json({ errors: errors });

  res.json(users[req.body.userID]);
});

// Just to test our server is working.
app.get('/api', (req, res) => {
    res.send({
        version: '1.0.0'
    });
});

export default app;
