/**
 * Created by eliorb on 10/12/2015.
 */
class HomeController {
  index(req, res) {
    res.render('home', {title: 'Home'});
  }
}

export default HomeController;
