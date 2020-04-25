var questionsModel = require('../models/questionsModel.js');

/**
 * questionsController.js
 *
 * @description :: Server-side logic for managing questionss.
 */
module.exports = {

    /**
     * questionsController.list()
     */
    list: function (req, res) {
        questionsModel.find(function (err, questionss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting questions.',
                    error: err
                });
            }
            return res.json(questionss);
        });
    },

    listMine: function (req, res) {
        questionsModel.find(function (err, questionss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting questions.',
                    error: err
                });
            }
            var questions = [];
            var i = 0;
            for (var question of questionss){
                if(question.user_id.toString() == req.session.userId){
                    questions[i] = question;
                    i++;
                }
            }
            return res.json(questions);
        });
    },

    /**
     * questionsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        questionsModel.findOne({_id: id}, function (err, questions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting questions.',
                    error: err
                });
            }
            if (!questions) {
                return res.status(404).json({
                    message: 'No such questions'
                });
            }
            return res.json(questions);
        });
    },

    allQuestions: function (req, res) {
        res.render('questions/all');
    },

    showCreateDialog: function (req, res) {
        res.render('questions/createQuestion');
    },

    myQuestions: function (req, res) {
        res.render('questions/myQuestions');
    },

    /**
     * questionsController.create()
     */
    create: function (req, res) {
        var questions = new questionsModel({
			title : req.body.title,
			description : req.body.description,
			date : new Date(),
			user_id : req.session.userId,
            tags: req.body.tags,
            answered : 0

        });

        questions.save(function (err, questions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating questions',
                    error: err
                });
            }
            return res.redirect('questions/all')
        });
    },

    /**
     * questionsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        questionsModel.findOne({_id: id}, function (err, questions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting questions',
                    error: err
                });
            }
            if (!questions) {
                return res.status(404).json({
                    message: 'No such questions'
                });
            }

            questions.title = req.body.title ? req.body.title : questions.title;
			questions.description = req.body.description ? req.body.description : questions.description;
			questions.date = req.body.date ? req.body.date : questions.date;
			questions.user_id = req.body.user_id ? req.body.user_id : questions.user_id;
			questions.answered = 1;
			
            questions.save(function (err, questions) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating questions.',
                        error: err
                    });
                }

                return res.json(questions);
            });
        });
    },

    /**
     * questionsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        questionsModel.findByIdAndRemove(id, function (err, questions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the questions.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
