// const passport = require('passport');
// const config = require('config');
// const GitHubStrategy = require('passport-github2').Strategy;
// const mysql = require('mysql2');
// const util = require('util');

// const { db } = require('./connectMysql');
// const User = require('../models/mysql/user');

// // Define the GitHub authentication strategy
// passport.use(new GitHubStrategy({
//     clientID: config.get('github.client.id'),
//     clientSecret: config.get('github.client.secret'),
//     callbackURL: `http://${config.get('app.host')}:${config.get('app.port')}/auth/github/callback`
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         console.log('GitHub authentication in progress...');

//         const user = new User(db);

//         // Find user by GitHub ID
//         let authenticatedUser = await user.findByGithubId({
//             githubId: profile.id.toString(),
//         });

//         if (authenticatedUser.length === 0) {
//             console.log('User not found. Adding new user...');

//             // Add new user to the database
//             const insert = await user.add({
//                 githubId: profile.id.toString(),
//             });

//             // Retrieve the newly added user
//             authenticatedUser = await user.findByPk({
//                 id: insert.insertId,
//             });
//         }

//         console.log('GitHub authentication successful');
//         console.log(util.inspect(authenticatedUser[0], false, null));
//         return done(null, authenticatedUser[0]);
//     } catch (err) {
//         console.error('GitHub authentication error:', err);
//         return done(err);
//     }
// }));

// // Serialize the user object into a session
// passport.serializeUser((user, done) => {
//     console.log('Serializing user:', user);
//     done(null, user);
// });

// // Deserialize the user object from the session
// passport.deserializeUser((user, done) => {
//     console.log('Deserializing user:', user);
//     done(null, user);
// });

// module.exports = passport;
const passport = require('passport');
const config = require('config');
const GitHubStrategy = require('passport-github2').Strategy;
const mysql = require('mysql2');
const util = require('util');

const { db } = require('./connectMysql'); 
const User = require('../models/mysql/user');

passport.use(new GitHubStrategy({
        clientID: config.get('github.client.id'),
        clientSecret: config.get('github.client.secret'),
        callbackURL: `http://${config.get('app.host')}:${config.get('app.port')}/auth/github/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const user = new User(db);
            let authenticatedUser = await user.findByGithubId({
                githubId: profile.id.toString(),
            })
            
            if (authenticatedUser.length === 0) {
                const insert = await user.add({
                    githubId: profile.id.toString(),
                })

                authenticatedUser = await user.findByPk({
                    id: insert.insertId,
                })
            }
            //console.log(util.inspect(authenticatedUser[0], false, null));
            return done(null, authenticatedUser[0]);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
  