var express = require('express');
var router = express.Router();
var answersController = require('../controllers/answersController.js');


function requiresLogin(req, res, next) {
    console.log("auth!");
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error('Za to akcijo morate biti prijavljeni.');
        err.status = 401;
        return next(err);
    }
}
/*
 * GET
 */
router.get('/', answersController.list);
router.get('/create/:id',requiresLogin ,answersController.showCreateDialog);
router.get('/getanswers/:id', answersController.listOnQuestion);

/*
 * GET
 */
router.get('/:id', answersController.show);

/*
 * POST
 */
router.post('/', answersController.create);

/*
 * PUT
 */
router.put('/:id', requiresLogin, answersController.update);

/*
 * DELETE
 */
router.delete('/:id', answersController.remove);

module.exports = router;
