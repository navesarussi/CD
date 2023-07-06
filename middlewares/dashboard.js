const UserSymbol = require('../models/mysql/user_symbol');
const SymbolValues = require('../models/mongo/symbols_values');
const mongoose = require('mongoose');

const dashboard = async (req, res,next) => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log('Connected to MongoDB');
          } else {
            console.log('Not connected to MongoDB');
          }

        // console.log("req.user: ",req.user);
        // console.log("req.user.id: ",req.user.id);
        // console.log("req.db: ",req.db? 1 : 0);
        const userSymbol = new UserSymbol(req.db);
        const userSymbols = await userSymbol.findByUserId({userId:  req.user.id});

        // console.log("userSymbols: ",userSymbols);
        // console.log("userSymbols.symbol: ",userSymbols[0].id);
        // console.log("symbol: ",userSymbols[0].symbol);
        // // const promises = userSymbols.map((userSymbol) => SymbolValues.findOne({symbol: userSymbol.symbol}).sort({createdAt: -1}).limit(1));
        // const symbolsValues = await Promise.all(promises);
        // console.log("symbolsValues: ",symbolsValues);

        const promises = [];
        userSymbols.forEach((userSymbol) => promises.push(SymbolValues.findOne({symbol: userSymbol.symbol}).sort({createdAt : -1}).limit(1)))
        const symbolValues = await Promise.all(promises);

        res.render('dashboard', {userSymbols: userSymbols, symbolValues: symbolValues});
    } catch (err) {
        next(err);
    }
}

module.exports = dashboard;