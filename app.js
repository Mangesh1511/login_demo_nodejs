require('./connection');
const express = require("express");
const app = express()

var Users = require('./Models/Users');
app.use(express.static('./views'));
app.set('view engine', 'ejs')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    console.log(req.url+" "+req.method);
    console.log(req.body);
    res.render('index',{alert_msg:null});
    
});


app.post('/', (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    if(email==null||pass==null||email.length==0||pass.length==0)
    {   
        res.render('forgotPass',{alert_msg:'Please fill out the credentials'});

    }
    console.log(req.url+" "+req.method);
    console.log(req.body);
 
    console.log("USer mail is: "+email+" User pass is: "+pass);
        Users.find({ email: `${email}` }, (err, data) => {
            if (!err) {
    
                if (data.length == 0) {
                    var newUser = new Users({ email: `${email}`, password: `${pass}` });
                    newUser.save();
                    res.render('home');
                    // res.render('home',{update:null,alert_msg:"Registered With Us!"});
                    // res.send('Registration done');
                }
                else 
                   {
                    res.render('index',{update:data,
                    alert_msg:
                    'You are Already With us ! Please try to login'});
                   } 
    
                
    
            }
            else
                console.log(err);
    
        })
    
    
});


app.get('/login', (req, res) => {

        // res.render('login')
    res.render('login',{alert_msg:null});
})
app.post('/login', (req, res) => {

    console.log('Im in the post method of login');
    const email = req.body.email;
    const pass = req.body.password;
    if(email==null||pass==null||email.length==0||pass.length==0)
    {   
        res.render('forgotPass',{alert_msg:'Please fill out the credentials'});

    }
    

    Users.find({ email: `${email}`, password: `${pass}` }, (err, data) => {
        if (!err) {
            if (data==null||data.length == 0) {
                res.send('Please Enter the correct credentials or register with us if not registered!');
            }
            else 
                res.render('home');
            
        }
    })

});

app.get('/forgotPass', (req, res) => {


   res.render('forgotPass',{alert_msg:null});


})
app.post('/forgotPass', (req, res) => {
    const email = req.body.email;
    const newPass = req.body.password;
    if(email==null||newPass==null||email.length==0||newPass.length==0)
    {   
        res.render('forgotPass',{alert_msg:'Please fill out the credentials'});

    }
    console.log("USer mail is: "+email+" User pass is: "+newPass);
  
    Users.findOneAndUpdate({ email: `${email}` }, { email,password: `${newPass}` }, {upsert:false}, (err, data) => {

        if (!err) {
            if(data==null||data.length==0)
            res.render('forgotPass',{alert_msg:'Invalid email!!'});
              
        else
        res.render('forgotPass',{alert_msg:'Password Successfully Updated'});    
           
             

            
        }
        else
            res.render('forgotPass',{alert_msg:null});

    })

})


app.listen(5000, () => {
    console.log("App is Listening on port 5000..!!");
})