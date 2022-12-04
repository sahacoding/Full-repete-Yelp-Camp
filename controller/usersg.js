const User = require ('../models/user');

module.exports.registerformGet = (req, res) => {
    res.render('userss/register')
}

module.exports.registerformPost = async (req, res) =>{
    try{
        const {email, username, password } = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err =>{
            if(err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp');
        res.redirect('/campground');
      })
        
    }catch (e){
         req.flash('error', e.message);
         res.redirect('/register')

    }
  
}

module.exports.loginformGet = (req, res) =>{
    res.render('userss/login')
   // res.send('Hlwwww')
}

module.exports.loginformPost = (req, res) =>{
    req.flash('success', 'Welcome back');
    const redirectUrl = req.session.returnTo || '/campground'; 
    //console.log(redirectUrl )
    delete req.session.returnTo;
    res.redirect(redirectUrl);
    // console.log('nnnnn', req.session.returnTo)
    // const redirectUrl = req.session.returnTo ;
    // console.log( redirectUrl)
    // if(redirectUrl){
    //     res.redirect(redirectUrl);
    // }else{
    //     res.redirect('/campground');
    // }

}

module.exports.logoutForm =  (req, res) =>{
    req.logout((err) =>{
        //console.log(err)
        req.flash('success', 'GoodBye');
        res.redirect('/campground')
    })
}