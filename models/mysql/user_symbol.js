class UserSymbol {
  constructor(db) {
    this.db = db;
  }

  async add({ userId, symbol }) {
    console.log("add", userId, symbol);

    // Check if the symbol is empty or null
    if (!symbol) {
      console.log("Symbol is empty or null. Skipping insertion.");
      return; // Exit the function if the symbol is empty or null
    }
    // Check if the symbol already exists (case-insensitive)
    const [existingSymbol] = await this.db.execute(
      `SELECT * FROM users_symbols WHERE LOWER(symbol) = LOWER(?) AND user_id = ? LIMIT 1`,
      [symbol, userId]
    );

    if (existingSymbol) {
      console.log("Symbol already exists:", symbol);
      return; // Exit the function if the symbol already exists
    }

    // Insert the record into the database
    const [result] = await this.db.execute(
      `INSERT INTO users_symbols (user_id, symbol) VALUES (?, UPPER(?))`,
      [userId, symbol]
    );

    console.log("User symbol inserted successfully.");
    return result;
  }

  async remove({ userId, symbol }) {
    console.log("remove", userId, symbol);
    return this.db.execute(
      `
            delete from users_symbols where user_id =? and symbol =?
        `,
      [userId, symbol]
    );
  }

  async findByUserId({ userId }) {
    return this.db.execute(
      `
            select * from users_symbols where user_id = ?
        `,
      [userId]
    );
  }
}

module.exports = UserSymbol;
