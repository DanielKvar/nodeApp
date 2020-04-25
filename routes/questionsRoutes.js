var express = require('express');
var router = express.Router();
var questionsController = require('../controllers/questionsController.js');

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
router.get('/', questionsController.list);
router.get('/listmine', requiresLogin, questionsController.listMine);
router.get('/create', requiresLogin, questionsController.showCreateDialog);
router.get('/all', questionsController.allQuestions);
router.get('/myquestions', requiresLogin, questionsController.myQuestions);
router.get('/:id', questionsController.show);

/*
 * POST
 */
router.post('/', questionsController.create);

/*
 * PUT
 */
router.put('/:id', questionsController.update);

/*
 * DELETE
 */
router.delete('/:id', questionsController.remove);

module.exports = router;
