/**
 * Created by eliorb on 10/12/2015.
 */
exports.index = function (req, res) {
  if (!req.user) {
    return res.redirect('/login');
  }
  res.render('home', {title: 'Home'});
};

