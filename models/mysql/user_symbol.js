class UserSymbol {
    constructor (db) {
        this.db = db;
    };

    async add ({userId, symbol}) {
        console.log('add', userId, symbol);
        return this.db.execute(`
            insert into users_symbols (user_id, symbol)
            values (?, ?)
        `,[
            userId,
            symbol,
        ]);
    };

    async remove ({userId, symbol}) {
        console.log('remove', userId, symbol);
        return this.db.execute(`
            delete from users_symbols where user_id =? and symbol =?
        `,[
            userId,
            symbol,
        ]);
    };
    
    async findByUserId ({userId}) {
        return this.db.execute(`
            select * from users_symbols where user_id = ?
        `,[
            userId,
        ]);    
    };
    
}


module.exports = UserSymbol;