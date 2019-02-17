import express from 'express'
import bodyParser from 'body-parser'
import * as adminController from '../controllers/adminController'

const adminRouter = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false})

adminRouter.get('/', adminController.homePage);
adminRouter.get('/addSurvey',adminController.addSurvey);

export default adminRouter