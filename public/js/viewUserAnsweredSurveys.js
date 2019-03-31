var surveyData = `{ "title": "please trekse", "pages": [  {   "name": "page1",   "elements": [    {     "type": "comment",     "name": "question1"    },    {     "type": "radiogroup",     "name": "question2",     "choices": [      "item1",      "item2",      "item3"     ]    },    {     "type": "comment",     "name": "question3"    },    {     "type": "matrix",     "name": "question4",     "columns": [      "Column 1",      "Column 2",      "Column 3"     ],     "rows": [      "Row 1",      "Row 2"     ]    },    {     "type": "dropdown",     "name": "question5",     "choices": [      "item1",      "item2",      "item3"     ]    },    {     "type": "checkbox",     "name": "question6",     "choices": [      "item1",      "item2",      "item3"     ]    },    {     "type": "text",     "name": "question7"    },    {     "type": "dropdown",     "name": "question8",     "choices": [      "item1",      "item2",      "item3"     ]    },    {     "type": "matrix",     "name": "question9",     "columns": [      "Column 1",      "Column 2",      "Column 3"     ],     "rows": [      "Row 1",      "Row 2"     ]    },    {     "type": "matrix",     "name": "question10",     "columns": [      "Column 1",      "Column 2",      "Column 3"     ],     "rows": [      "Row 1",      "Row 2"     ]    },    {     "type": "matrix",     "name": "question11",     "columns": [      "Column 1",      "Column 2",      "Column 3"     ],     "rows": [      "Row 1",      "Row 2"     ]    },    {     "type": "matrix",     "name": "question12",     "columns": [      "Column 1",      "Column 2",      "Column 3"     ],     "rows": [      "Row 1",      "Row 2"     ]    },    {     "type": "matrix",     "name": "question13",     "columns": [      "Column 1",      "Column 2",      "Column 3"     ],     "rows": [      "Row 1",      "Row 2"     ]    },    {     "type": "matrix",     "name": "question14",     "columns": [      "Column 1",      "Column 2",      "Column 3"     ],     "rows": [      "Row 1",      "Row 2"     ]    },    {     "type": "matrix",     "name": "question15",     "columns": [      "Column 1",      "Column 2",      "Column 3"     ],     "rows": [      "Row 1",      "Row 2"     ]    },    {     "type": "rating",     "name": "question16"    },    {     "type": "comment",     "name": "question17"    },    {     "type": "dropdown",     "name": "question18",     "choices": [      "item1",      "item2",      "item3"     ]    }   ]  } ]}`
var surveyAnswers = {"question1":"oxi","question2":"item1","question3":"oxi","question4":{"Row 1":"Column 1","Row 2":"Column 3"},"question5":"item2","question6":["item2"],"question7":"ofou","question8":"item2","question9":{"Row 1":"Column 1"},"question10":{"Row 1":"Column 2"},"question12":{"Row 1":"Column 2","Row 2":"Column 2"},"question13":{"Row 2":"Column 2","Row 1":"Column 2"},"question14":{"Row 1":"Column 2","Row 2":"Column 2"},"question15":{"Row 1":"Column 2","Row 2":"Column 2"},"question16":3,"question17":"nai","question18":"item2"};
var surveyJSON = JSON.parse(surveyData)
const survey = new Survey.Model(surveyJSON);
console.log(surveyJSON);

$("#surveyContainer").Survey({
    model: survey,
    mode:'display',
    data: surveyAnswers,
    onComplete(survey) {
        var resultAsString = JSON.stringify(survey.data);
        console.log(resultAsString); //send Ajax request to your web server.
    }
});