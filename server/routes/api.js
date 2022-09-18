const Router = require('express');
const userController = require('../controllers/userController')
const router = Router();

router.use((req, res, next) => {
  console.log(`server/routes/api.js: received request ${req.method} ${req.url}`);
  next();
});

router.get('/', userController.getAllHotels, (req, res) => {
  console.log(`server/routes/api.js.router.get('/'): received request ${req.method} ${req.url}`);
  res.status(200).json({ message: 'api router online' });
});

router.post('/', userController.postBreweryRecommendation, (req, res) => {
  console.log(`server/routes/api.js.router.post('/'): received request ${req.method} ${req.url}`);
  res.status(200).json({ message: 'api router online POST' });
});

router.put('/', userController.changeRecommendation, (req, res) => {
  console.log(`server/routes/api.js.router.put('/'): received request ${req.method} ${req.url}`);
  res.status(200).json({ message: 'api router online PUT' });
});

router.put('*', (req, res, next) => {
  //create and change "recommendation" field
  console.log(`server/routes/example.js.router.put('/'): received request ${req.method} ${req.url}`);
  next();
}
);

// router.use((req, res) => {
//   console.log(`server/routes/api.js: handler not found for request ${req.method} ${req.url}`);
//   res
//     .status(404)
//     .json({
//       message: `API handler for ${req.method} ${req.url} not found`,
//     });
// });

module.exports = router;
