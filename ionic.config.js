module.exports = {
  proxies: null,

  paths: {
    html : {
      src: ['public/app/**/*.html'],
      dest: "public/dist"
    },
    sass: {
      src: ['public/app/app.+(ios|md).scss'],
      dest: 'public/dist',
      include: ['node_modules/ionic-framework']
    },
    fonts: {
      src: ['node_modules/ionic-framework/fonts/**/*.ttf'],
      dest: "public/fonts"
    },
    watch: {
      sass: ['public/app/**/*.scss'],
      html: ['public/app/**/*.html'],
      livereload: [
        'public/dist/**/*.html',
        'public/dist/**/*.js',
        'public/dist/**/*.css'
      ]
    }
  },

  autoPrefixerOptions: {
    browsers: [
      'last 2 versions',
      'iOS >= 7',
      'Android >= 4',
      'Explorer >= 10',
      'ExplorerMobile >= 11'
    ],
    cascade: false
  },

  // hooks execute before or after all project-related Ionic commands
  // (so not for start, docs, but serve, run, etc.) and take in the arguments
  // passed to the command as a parameter
  //
  // The format is 'before' or 'after' + commandName (uppercased)
  // ex: beforeServe, afterRun, beforePrepare, etc.
  hooks: {
    beforeServe: function(argv) {
      //console.log('beforeServe');
    }
  }
};
