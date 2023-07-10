const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const { error } = require("console");
// const { request } = require("http");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const email_1=req.body.email;
    const fn=req.body.fname;
    const ln=req.body.lname;
    // console.log(email_1 ,fn ,ln);

    const data={  //data is object
        members : [  //here members is an array which have objects and strings here 
            {
                email_address :email_1,    //email and status are strings
                status :"subscribed",
                merge_fields:{             //merege_fields is an object
                    FNAME:fn,
                    LNAME:ln,
                }
            }
        ]
    };
    const json_data=JSON.stringify(data);
    // console.log(json_data);

    const url='https://us21.api.mailchimp.com/3.0/lists/4563af0eb7'  //we have list id because mailchimp has multiple lists and want our users to subcribe one list

   const options = {    //options is js object as we have to post the data we use https.request which has an options in arguments and we set the method to POST
        method :"POST",
        //providing autentication
        auth :"siddu:68ff06c9bc21292ae6e38630e07fa41c-us21",
    }
    const abc=https.request(url,options,function(response){//try console.log response you will get information if you dont add any opytion by default the options is set to get
        // const error_1=response.errors[error];
        if(response.statusCode===200){
            res.sendFile(__dirname +"/failure.html");
        }
        else{
            res.sendFile(__dirname+"/sucess.html")
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })//up till now we did not send the json_data which we have ou email  too send we consider https.request in const variable
    abc.write(json_data);
    abc.end();
})

app.listen(process.env.PORT ||3000,function(){
    console.log("server is running");
})
//API KEY
//68ff06c9bc21292ae6e38630e07fa41c-us21
//id 
// 4563af0eb7
//url
// 'https://<dc>.api.mailchimp.com/3.0/'
// https://<dc>.api.mailchimp.com/3.0/