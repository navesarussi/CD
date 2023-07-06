const welcome = async (req, res) => {
    console.log("Welcome");
    res.render('welcome');
}

module.exports = welcome;