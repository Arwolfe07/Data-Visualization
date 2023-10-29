const mongoose = require('mongoose');
const Data = require('../models/data');
const dashData = require('./data');



mongoose.connect('mongodb+srv://Aditya:Hp37e9608@stack-overflow.lnybhyh.mongodb.net/dashboard?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true });


dashData.forEach(data => {
    const newData = new Data(data);
    newData.save()
        .then(() => console.log('Saved'))
        .catch(err => { console.log(err) });
});





