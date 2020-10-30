const express = require('express');
const app = express();
const port = 3000;
const budget = require('./budget.json')
const mongoose = require ("mongoose");
const bodyParser = require('body-parser');
const budgetModel = require ("./models/budgetSchema")
const budget_url = 'mongodb://localhost:27017/budget_data'

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
app.use('/', express.static('public'));

app.get('/budget', (req, res) => {
    mongoose.connect(budget_url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=> {
            budgetModel.find({})
                        .then((data)=>{
                            res.json(data);
                            mongoose.connection.close()
                        })
                        .catch((connectionError)=>{
                            res.send(connectionError)
                        })
        })
        .catch((connectionError) => {
            res.send(connectionError)
            console.log(connectionError)
        });
});

app.post('/user_data',(req,res)=>{
    let data = { label: req.body.label, budget: req.body.budget, color: req.body.color}
    mongoose.connect(budget_url,{useNewUrlParser: true, useUnifiedTopology: true})
            .then(()=>{
                budgetModel.insertMany(data,(err,data)=>{
                    if(err){
                        console.log(err);      
                        res.send(err);
                        mongoose.connection.close();
                    }else{
                        res.send(data);    
                        mongoose.disconnect();
                    }                    
                })                              
    })
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:3000')
});