const router = require('express').Router();
const {User, Post, Comment } = require('../..models')

router.get('/', withAuth, (req, res ) => {
    User.findAll({
        
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/:id ', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },

        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'text', 'user_id', 'created_at'],
            },
            {
                model: Post,
                attributes: ['id', 'title', 'text', 'user_id', 'created_at'],
                include: {

                model: User,
                attributes: [username]
                }
            }
        ]
    })

    .then(dbUserData => {
    if (!dbUserData){
        res.status(404).json({message: 'No post found at this id'})
    }
    res.json(dbUserData);
})
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  });
  
  
  router.post('/', (req, res) =>{
      User.create({
          username: req.body.username,
          password: req.body.password
      })
      .then(ddbUserData => {
          req.session.save(() => {
              req.session.user_id = dbUserData.id;
              req.session.username = dbUserData.username;
              req.session.loggedIn = true;

              res.json(dbUserData);

          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      })
  });

  router.post('/login', (req, res) => {
      User.findOne({
          where: {
              username: req.body.username
          }
      })
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(400).json({message: 'No post found at this id'})
              return;
          }
          const validatePassword = dbUserData.checkPassword(req.body.password);
          
          if (!validatePassword) {
              res.status(400).json({ message:'Incorrect password'});
              return;
          }
          req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({user: dbUserData, message:' You are now logged in!'});

        });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      })
  });

  router.post('/logout', (req, res) => {
      if (req.session.loggedIn) {
          req.session.destroy(() => {
              res.status(204).end();
          })
        } else {
            res.status(404).end();
      }
  });

router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData){
            res.status(404).json({message: 'No user found at this id'})
            return;
        }
        res.json(dbUserData);
    })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        })
});

router.delete('/id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData){
            res.status(404).json({message: 'No user found at this id'})
            return;
        }
        res.json(dbUserData);
    })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        })
})

module.exports = router;
