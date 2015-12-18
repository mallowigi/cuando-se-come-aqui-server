/**
 * Created by eliorb on 10/12/2015.
 */
/**
 * IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT
 *
 * You should never commit this file to a public repository on GitHub!
 * All public code on GitHub can be searched, that means anyone can see your
 * uploaded secrets.js file.
 *
 * I did it for your convenience using "throw away" API keys and passwords so
 * that all features could work out of the box.
 *
 * Use config vars (environment variables) below for production API keys
 * and passwords. Each PaaS (e.g. Heroku, Nodejitsu, OpenShift, Azure) has a way
 * for you to set it up from the dashboard.
 *
 * Another added benefit of this approach is that you can use two different
 * sets of keys for local development and production mode without making any
 * changes to the code.
 * IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT  IMPORTANT
 */
exports = module.exports = function () {
  return {

    db: process.env.MONGODB || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test',

    sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

    mailgun: {
      user: process.env.MAILGUN_USER || 'postmaster@sandbox697fcddc09814c6b83718b9fd5d4e5dc.mailgun.org',
      password: process.env.MAILGUN_PASSWORD || '29eldds1uri6',
      key: process.env.MAILGUN_key || ''

    },

    facebook: {
      clientID: process.env.FACEBOOK_ID || '754220301289665',
      clientSecret: process.env.FACEBOOK_SECRET || '41860e58c256a3d7ad8267d3c1939a4a',
      callbackURL: '/auth/facebook/callback',
      passReqToCallback: true
    },

    instagram: {
      clientID: process.env.INSTAGRAM_ID || '9f5c39ab236a48e0aec354acb77eee9b',
      clientSecret: process.env.INSTAGRAM_SECRET || '5920619aafe842128673e793a1c40028',
      callbackURL: '/auth/instagram/callback',
      passReqToCallback: true
    },

    github: {
      clientID: process.env.GITHUB_ID || 'cb448b1d4f0c743a1e36',
      clientSecret: process.env.GITHUB_SECRET || '815aa4606f476444691c5f1c16b9c70da6714dc6',
      callbackURL: '/auth/github/callback',
      passReqToCallback: true
    },

    twitter: {
      consumerKey: process.env.TWITTER_KEY || '6NNBDyJ2TavL407A3lWxPFKBI',
      consumerSecret: process.env.TWITTER_SECRET || 'ZHaYyK3DQCqv49Z9ofsYdqiUgeoICyh6uoBgFfu7OeYC7wTQKa',
      callbackURL: '/auth/twitter/callback',
      passReqToCallback: true
    },

    google: {
      clientID: process.env.GOOGLE_ID || '828110519058.apps.googleusercontent.com',
      clientSecret: process.env.GOOGLE_SECRET || 'JdZsIaWhUFIchmC1a_IZzOHb',
      callbackURL: '/auth/google/callback',
      passReqToCallback: true
    }

  };
};
