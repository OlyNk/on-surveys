import User from '../models/user.model'
import Survey from '../models/survey.model'
import mongoose from 'mongoose'
import moment from 'moment'

const ObjectId = mongoose.Types.ObjectId;

export function homePage(req, res, next) {
    const title = 'Admin'
    res.render('admin', { title, user: req.user })
}

export async function patientList(req, res, next) {
    const title = 'Patient List'
    const patients = await User.find({ isAdmin: { $ne: true } })
    res.render('patientList', { title, user: req.user, patients })
}


export async function surveyList(req, res, next) {
    const title = 'Survey List'
    const surveys = await Survey.find().sort({ createdAt: -1 })
    res.render('surveyList', { title, user: req.user, surveys, moment })
}

export async function patientProfile(req, res, next) {
    try {
        const title = 'Patient Profile'
        const userId = req.params.id
        const patient = await User.findById(ObjectId(userId))
        if (!patient) throw Error(`Patient with id ${userId} not found`)
        res.render('patientProfile', { title, user: req.user, patient , surveys: patient.answeredSurveys, moment})
    }
    catch (err) {
        next(err)
    }
}

export function createSurveyPage(req, res, next) {
    const title = 'Create Survey'
    res.render('createSurvey', { title, user: req.user })
}

export async function createSurvey(req, res, next) {
    try {
        const { surveyTitle: title, surveyText: surveyData } = req.body;
        // const surveyData = req.body.surveyText
        // const title = req.body.surveyTitle
        const survey = new Survey({ surveyData, title })
        await survey.save();
        res.status(201).json({ success: true, surveyData, title })
    }
    catch (error) {
        next(error)
    }
}

export async function surveyVisibility(req, res, next) {
    try {
        const surveyId = req.params.id
        const survey = await Survey.findById(ObjectId(surveyId))
        if (!survey) throw Error(`Survey with id ${surveyId} not found`)
        survey.visible = !survey.visible;
        await survey.save();
        res.json({ success: true, survey })
    }
    catch (err) {
        next(err)
    }
}

export async function editSurveyPage(req, res, next) {
    try {
        const title = 'Edit Survey'
        const surveyId = req.params.id
        const survey = await Survey.findById(ObjectId(surveyId))
        if (!survey) throw Error(`Survey with id ${surveyId} not found`)
        const surveyData = survey.surveyData
        res.render('editSurvey', { title, user: req.user, surveyData, surveyId })
    }
    catch (err) {
        next(err)
    }
}


export async function editSurvey(req, res, next) {
    try {
        const { surveyTitle, surveyText: surveyData, surveyId } = req.body;
        const survey = await Survey.findById(ObjectId(surveyId))
        if (!survey) throw Error(`Survey with id ${surveyId} not found`)
        survey.title = surveyTitle
        survey.surveyData = surveyData
        await survey.save();
        res.json({ success: true, survey })
    }
    catch (err) {
        next(err)
    }
}

export async function deleteSurvey(req, res, next) {
    try {
        const surveyId = req.params.id
        const survey = await Survey.findById(ObjectId(surveyId))
        if (!survey) throw Error(`Survey with id ${surveyId} not found`)
        await Survey.deleteOne({_id:surveyId})
        res.json({ success: true })
    }
    catch (err) {
        next(err)
    }
}

export async function viewAnsweredSurvey(req, res, next) {
    try {
        const title = ' View Answers'
        const userId = req.params.userId
        const patient = await User.findById(ObjectId(userId))
        if(!patient) throw Error(`Patient with id ${userId} not found`)
        const answeredSurveys = patient.answeredSurveys
        const surveyId = req.params.surveyId
        const survey = answeredSurveys.find(survey => surveyId == survey.surveyId.toString())
        const surveyData = survey.surveyData
        const surveyAnswers = survey.surveyAnswers
        res.render('viewAnsweredSurvey', { title, user: req.user , patient, surveyData, surveyAnswers})        

    }
    catch (err) {
        next(err)
    }
}