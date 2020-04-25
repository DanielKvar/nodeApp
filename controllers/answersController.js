var answersModel = require('../models/answersModel.js');

/**
 * answersController.js
 *
 * @description :: Server-side logic for managing answerss.
 */
module.exports = {

    /**
     * answersController.list()
     */
    list: function (req, res) {
        answersModel.find({}).sort({choosen: -1, date: -1}).exec(function (err, answerss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting answers.',
                    error: err
                });
            }
            return res.json(answerss);
        });
    },

    listOnQuestion: function (req, res) {
        var id = req.params.id;
        answersModel.find({}).sort({choosen: -1, date: -1}).exec(function (err, answerss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting answers.',
                    error: err
                });
            }
            var answers = [];
            var i = 0;
            for (var answer of answerss){
                if(answer.question_id.toString() == id){
                    answers[i] = answer;
                    i++;
                }
            }
            return res.json(answers);
        });
    },

    /**
     * answersController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        answersModel.findOne({_id: id}, function (err, answers) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting answers.',
                    error: err
                });
            }
            if (!answers) {
                return res.status(404).json({
                    message: 'No such answers'
                });
            }
            return res.json(answers);
        });
    },

    showCreateDialog: function (req, res) {
        res.render('answers/createAnswer');
    },

    /**
     * answersController.create()
     */
    create: function (req, res) {
        var answers = new answersModel({
			description : req.body.description,
			user_id : req.session.userId,
			choosen : 0,
			question_id : req.body.question_id,
			date : Date()
        });

        answers.save(function (err, answers) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating answers',
                    error: err
                });
            }
            return res.redirect('questions/all');
        });
    },

    /**
     * answersController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        answersModel.findOne({_id: id}, function (err, answers) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting answers',
                    error: err
                });
            }
            if (!answers) {
                return res.status(404).json({
                    message: 'No such answers'
                });
            }

            answers.description = req.body.description ? req.body.description : answers.description;
			answers.user_id = req.body.user_id ? req.body.user_id : answers.user_id;
			answers.choosen = true;
			answers.question_id = req.body.question_id ? req.body.question_id : answers.question_id;
			answers.date = req.body.date ? req.body.date : answers.date;
			
            answers.save(function (err, answers) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating answers.',
                        error: err
                    });
                }

                return res.json(answers);
            });
        });
    },

    /**
     * answersController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        answersModel.findByIdAndRemove(id, function (err, answers) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the answers.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
