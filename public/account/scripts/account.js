/* TODO ONE PER FILE */

(function (window) {
  var app = {};

  // All the css selectors
  app.regions = {};

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

  window.app = app;
})(window);

/* Signup page */
(function (app) {
  var regions = app.extend({}, app.regions, {
    signupButton: 'submit',
    signupForm: 'signupForm',
    email: 'email',
    password: 'password',
    confirm: 'confirmPassword'
  });
  var elements = {};

  var signupPage = {};

  /* Properties */
  Object.defineProperties(signupPage, {
    signupForm: {
      get: function signupForm () {
        if (!elements.signupForm) {
          elements.signupForm = document.getElementById(regions.signupForm);
        }
        return elements.signupForm;
      }
    },

    signupButton: {
      get: function signupButton () {
        if (!elements.signupButton) {
          elements.signupButton = document.getElementById(regions.signupButton)
        }
        return elements.signupButton;
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


  /* Events */
  function addEventListeners () {
    /**
     * Listen on input events to know when the form is valid
     */
    signupPage.signupForm.addEventListener('input', function (event) {
      var email    = signupPage.email.value,
          password = signupPage.password.value,
          confirm  = signupPage.confirm.value;

      var isValid = true;
      isValid = isValid && app.isEmail(email);
      isValid = isValid && app.minLength(password, 4)
      isValid = isValid && app.passwordMatch(password, confirm);

      app.toggleClass(signupPage.signupButton, 'disabled', isValid);
    })
  }

  signupPage.init = function init () {
    addEventListeners();
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
