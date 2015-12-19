/* TODO ONE PER FILE */

(function (window) {
  var app = {};

  // All the css selectors
  app.regions = {
    submit: 'submit',
    email: 'email',
    password: 'password',
    confirm: 'confirmPassword'
  };

  /**
   * Naive implementation of extend
   * @returns {*}
   */
  app.extend = function extend () {
    var args = Array.prototype.slice.call(arguments, 1);
    var dest = arguments[0];

    args.forEach(function (source) {
      Object.keys(source).forEach(function (prop) {
        dest[prop] = source[prop];
      })
    });

    return dest;
  };

  app.addClass = function addClass (el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  };

  app.removeClass = function removeClass (el, className) {
    if (el.classList) {
      el.classList.remove(className);
    }
    else {
      el.className =
        el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  };

  app.toggleClass = function toggleClass (el, className, predicate) {
    if (predicate) {
      app.removeClass(el, className);
    } else {
      app.addClass(el, className)
    }
  };

  /**
   * Naive implementation of isEmail
   * @param field
   * @returns {boolean}
   */
  app.isEmail = function isEmail (field) {
    return /[a-zA-Z0-9_.-]+@[\w]+\.[\w]+/.test(field);
  };

  /**
   * Naive implementation of minLength
   * @param field
   * @param min
   * @returns {boolean}
   */
  app.minLength = function minLenght (field, min) {
    return field.length >= min;
  };

  /**
   * Naive implementation of password match
   * @param pw
   * @param confirm
   * @returns {boolean}
   */
  app.passwordMatch = function passwordMatch (pw, confirm) {
    return pw === confirm;
  };

  /**
   * Dismiss an element
   * @param el
   */
  app.dismiss = function dismiss (el) {
    if (typeof el === 'string') {
      var els = Array.prototype.slice.call(document.getElementsByClassName(el), 0);
      els.forEach(function (el) {
        el.style.display = 'none';
      })
    } else {
      el.style.display = 'none';
    }
  };

  window.app = app;
})(window);

/* Form Helpers */
(function (app) {
  var formHelpers = {};

  var regions = app.regions;
  var elements = {};

  /* Properties */
  Object.defineProperties(formHelpers, {
    form: {
      get: function form () {
        if (!elements.form) {
          elements.form = document.getElementById(regions.form);
        }
        return elements.form;
      }
    },

    submit: {
      get: function submit () {
        if (!elements.submit) {
          elements.submit = document.getElementById(regions.submit)
        }
        return elements.submit;
      }
    },

    email: {
      get: function email () {
        if (!elements.email) {
          elements.email = document.getElementById(regions.email)
        }
        return elements.email;
      }
    },

    password: {
      get: function password () {
        if (!elements.password) {
          elements.password = document.getElementById(regions.password)
        }
        return elements.password;
      }
    },

    confirm: {
      get: function confirm () {
        if (!elements.confirm) {
          elements.confirm = document.getElementById(regions.confirm)
        }
        return elements.confirm;
      }
    }
  });

  formHelpers.extendRegions = function (newRegions) {
    regions = app.extend({}, app.regions, newRegions);
  };

  /* Events */
  formHelpers.addEventListeners = function addEventListeners () {

  };

  app.formHelpers = formHelpers;
})(window.app);

/* Login page */
(function (app) {
  var regions = {
    form: 'loginForm'
  };

  var loginPage = {};

  /**
   * Listen on input events to know when the form is valid
   */
  loginPage.addEventListeners = function addEventListeners () {

    app.formHelpers.form.addEventListener('input', function (event) {
      var email    = app.formHelpers.email.value,
          password = app.formHelpers.password.value;

      var isValid = true;
      isValid = isValid && app.isEmail(email);
      isValid = isValid && app.minLength(password, 4);

      app.toggleClass(app.formHelpers.submit, 'disabled', isValid);
    });
  };

  loginPage.init = function init () {
    app.formHelpers.extendRegions(regions);
    loginPage.addEventListeners();
  };

  app.loginPage = loginPage;
})(window.app || {});

/* Signup page */
(function (app) {
  var regions = {
    form: 'signupForm'
  };

  var signupPage = {};

  /**
   * Listen on input events to know when the form is valid
   */
  signupPage.addEventListeners = function addEventListeners () {

    app.formHelpers.form.addEventListener('input', function (event) {
      var email    = app.formHelpers.email.value,
          password = app.formHelpers.password.value,
          confirm  = app.formHelpers.confirm.value;

      var isValid = true;
      isValid = isValid && app.isEmail(email);
      isValid = isValid && app.minLength(password, 4);
      isValid = isValid && app.passwordMatch(password, confirm);

      app.toggleClass(app.formHelpers.submit, 'disabled', isValid);
    });
  };

  signupPage.init = function init () {
    app.formHelpers.extendRegions(regions);
    signupPage.addEventListeners();
  };

  app.signupPage = signupPage;
})(window.app || {});

/**
 * On ready polyfill
 * @param fn
 */
function ready (fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
