const UserSymbol = require('../models/mysql/user_symbol');
const SymbolValues = require('../models/mongo/symbols_values');
const mongoose = require('mongoose');

const addSymbol = async (req, res,next) => {
    try {
        
        const userSymbol = new UserSymbol(req.db);
        const userSymbols = await userSymbol.findByUserId({userId:  req.user.id});

        console.log('new symbol: ',req.body.symbol, 'user:', userSymbols[0].userId, "user:", req.user.id);
        
        if(req.user.id){
            userSymbol.add({userId: req.user.id,symbol: req.body.symbol});
        // await newSymbol.save();
        }
        // res.status(201).json(newSymbol);
         res.redirect('/dashboard/');
    } catch (error) {
        next(error);
    }
}

module.exports = addSymbol;