
var ProfileInfoModel = require('../app/models/ProfileInfo');

var CountersModel = require('../app/models/counters');
var OtpModel = require('../app/models/otp');
var Firebase = require("firebase");
var multer = require('multer');
var path = require('path');
var Client = require('node-rest-client').Client;
var client = new Client();
var options = multer.diskStorage({ destination : 'public/images/logo/' ,
  filename: function (req, file, cb) {
    cb(null, req.params.id + path.extname(file.originalname));
  }
});
var upload = multer({ storage: options });
var securecustomerkey = 'EjR7tUPWx7WhsVs9FuVO6veFxFISIgIxhFZh6dM66rs';
var securevendorkey = 'ORql2BHQq9ku8eUX2bGHjFmurqG84x2rkDQUNq9Peelw';
var secureadminkey = 'tk0M6HKn0uzL%2FcWMnq3jkeF7Ao%2BtdWyYEJqPDl0P6Ac';
var securewebkey = 'RN4CDXkqltLF%2FWloegKujIhiaSWBrgCzQXqI9cyWpT0';
var version_value_1 = '1';
var client_key_vendor = 'tunga';
var client_key_customer = 'bhoomika';
var client_key_admin = 'gajanuru';
var client_key_web = 'pickcock';
Firebase.initializeApp({
  serviceAccount: {
  "type": "service_account",
  "project_id": "project-8598805513533999178",
  "private_key_id": "82abba7994a0894b4b38ee0c66d05cf80dd99efc",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCGKNGc8VwvoTrX\njusnjmbMAmjTjBJ/2Tu/gzktQxfoY0mIe31NUufw0mnBQYOJakU1FORvw8USn3QM\nNCu8h1UvfhvkUVI/FjAdEcuBh+PFOULqFWYlalK3560qvGlE6xHnftgLQC/LI9R4\nmO0moRLBrQ2Oq2JVUwIE58xiXgw5WyMxnZ4IS1kons5UmutUw3QtRMfvwLHrkV/z\na8oP6XPXeECp7FWrvtF53PYFLRurL1bFQsSNwHFw8su8BhEhjpXXD1SDKyEpnz4E\nr8P2wTS1116mrVkNXWyY0rV7fyBvqeh/oH0AZVOzDCueFkT3Q2eZJcGUnGp9uTCb\nExXNIws/AgMBAAECggEAST2LgYR6cT4x43AQjJ2/HOzL0YGMr+MmLR00X7NbH/Dk\nOfBAra/vE5erSGe9qY0sjxgCxck4kzwdnHP21IuFQ9Iy4+hJYEt6pMQMN4C6Jfdm\nwmhARXjQA7ok3UnSpl82fQzQYQP/k4TR/6xs+0O/+5+/4P1LR41zcr4g5Cq3va9l\n4W37dOgaYCUSprWXFQtD5kztcOYNeyuPGg7IYIL/xBo8mqaH49wAf1SureSJauKK\ndEc8hq4FuR9VAWlISV4GBZ4w6DL+N2KrOFbwBiqbt6IASoh7p6k2H+beExmKCpeG\nUDORBsuMRNsYFvQDmS8q6XwYjX4TVh/Agp7jv+DaEQKBgQDorbsL+f+/GZQQ1+ds\nSMQdhvOLXpO8Oh7eAjTTY3K/UNTKCkEoTkam51Bv4O4b/qIXKbcqRyTfqbW9e/mb\nuY0SK/+2N0XTo3X71jJDRKE+Zls1j2/slaDeiUzRxXIF+J0SIgEV5hPbEGNYdGuK\niDP0Mr82GQ998kyKcMBIqG8yZQKBgQCTmzKhmt7GmwCWnxZlvc1yB1nII2r+L1CT\nVQudMgNyWLAF3XtVXC6mntGhEdzcygvB/AOwusMI60duCgZK/+x0JNdyLKvFkmeT\nh4djfppGSjwtzzW1geBgJQnyWdoBv/q6Z68Ms3NSexTODbfC2qfBpR27oECZr4Hz\n7P45S+Fa0wKBgDfBKYj9JuNL5ccDdVjlNtk8dS94Qj5gTvUz4iSlN+HQJK0lN+fI\nmfV0iDnG1EexBHY4cMOYuKU/rWTySCWgmMU59dRb+kd0a9kkwnaMA3dIX6K99Dvk\nvt+UVuwNO/1iTYEC1O/Cag+cJbIUc5CGgqyJXHhCGQw8+0pRKkI+2iZhAoGAD5Qw\nyteyrZmMfVk7Hu/icCeQdUwvrbZGtdYjDKtLq9TqdyQCMWcyUUmv7GUbP35fsVCs\n/wknLpjOiDGsqlvKlBOTXayTUJ38KpkCVCD3nXWWVmtpSsfza5JdM2QCW27swqHQ\n2vFRuaHd90WBYKJ9VDXeJoBqcQ4SFDGuP1Pf7BsCgYEA0bVl9WMaIAe8V6AtwYjz\nLx1KRQ3mZWwXdEBitciQhnDeutMgaExkwCJHag6VGfOljNe/JtgCEzqWWh0rvFzi\nUn2WZA/kcqByHIQzVqJwhFkVjRzS5/qVrTvZw0xu2HVQD4iV6OHRMS3TeIUbGqOK\ngFYR4uhQAX6sXvXp4uU16bs=\n-----END PRIVATE KEY-----\n",
  "client_email": "khaanavali@project-8598805513533999178.iam.gserviceaccount.com",
  "client_id": "110281937967415310229",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/khaanavali%40project-8598805513533999178.iam.gserviceaccount.com"
},
  databaseURL: "https://project-8598805513533999178.firebaseio.com"
});




var rootRef = Firebase.database().ref();


module.exports = function(app, passport) {



function checkVendorApiAunthaticated(request,type)
{
  console.log("checkVendorApiAunthaticated 1");
  console.log(request.headers);
  console.log(request.headers.version);
  var version = parseInt(request.headers.version);
  console.log(version);
  var ret = false; 
  if(request.headers.securekey == secureadminkey && request.headers.client == client_key_admin)
  {
    console.log("checkVendorApiAunthaticated admin");
    ret = true;
  }
  else if(request.headers.securekey == securewebkey &&
          request.headers.version == version_value_1 && 
          request.headers.client == client_key_web)
  {
    console.log("checkVendorApiAunthaticated web pass");
    ret = true;
  }
  else if(type == 1)
  {
    console.log("checkVendorApiAunthaticated vendor");
    if(request.headers.securekey == securevendorkey &&
            request.headers.version == version_value_1 && 
            request.headers.client == client_key_vendor)
    {
      console.log("checkVendorApiAunthaticated vendor pass");
      ret = true;
    }
  }
  else if(type == 2)
  {
    console.log("checkVendorApiAunthaticated cust");
    if(request.headers.securekey == securecustomerkey &&
            request.headers.version == version_value_1 && 
            request.headers.client == client_key_customer)
    {
      console.log("checkVendorApiAunthaticated cust pass");
      ret = true;
    }
  }
  else
  {
    console.log("checkVendorApiAunthaticated not auth");
    ret = false;
  }
  return ret;
}
function getNextSequence(name,result)
{
   
    var ret = CountersModel.findOneAndUpdate(
            { _id: name },
            { $inc: { sequence: 1 }} ,
        function( err, order ) 
        {
        if( !err ) {
            console.log("no error");
            console.log(order);
            ret2 = order;
            result(order);
           // return order;
         
        } else {
            console.log( err );
           result(err);
        }
    });

}
app.get('/p/admin_order', function (req, res) {
    console.log(req.user);
    res.render('admin_order', { user : req.user });
});
app.get('/p/vendor_details', function (req, res) {
    res.render('vendor_details', { user : req.user });
});
app.get('/p/vendor_order', function (req, res) {
    res.render('vendor_order', { user : req.user });
});
app.post( '/v1/profile', function( request, response ) {

  console.log(request.body);
  // if(checkVendorApiAunthaticated(request,2) == false && request.isAuthenticated() == false)
  // {
  //   return response.send("Not aunthiticated").status(403);
  // }
  var res = getNextSequence('profile',function(data) {
    var order_id = "M1" ;
    order_id = order_id + "P";
    order_id = order_id + data.sequence;
    console.log(order_id);
    var indiantime = new Date();
    indiantime.setHours(indiantime.getHours() + 5);
    indiantime.setMinutes(indiantime.getMinutes() + 30);
    var dc;


        console.log('post order');
        var profile = new ProfileInfoModel({
            id:order_id,
            name: request.body.name,
            email: request.body.email,
            phone: request.body.phone,  
            dob: indiantime, 
            gender: request.body.gender, 
            occupation: request.body.occupation, 
            education: request.body.education, 
            summary: request.body.summary,
            date:indiantime,
            cast:request.body.cast,
address:{addressLine1:request.body.Address1,addressLine2:request.body.Address2,
        street:request.body.street, LandMark:request.body.Landmark, 
        areaName:request.body.Areaname,city:request.body.City, zip:request.body.zip, 
        latitude:request.body.latitude,longitude:request.body.longitude }
          });
       
        profile.save( function( err ) {
            if( !err ) {
                console.log( 'created' );
                 return response.send( 'created'  );
                } else {
                  console.log( 'error' );
                  console.log( err );
                  return response.send('ERROR');
                }
            });
    });

 });
app.get( '/v1/profile/all', function( req, res ) {
    console.log('/v1/profile/all');
  //   if(checkVendorApiAunthaticated(req,0) == false)
  // {
  //   return res.send("Not aunthiticated").status(403);
  // }
    return ProfileInfoModel.find(function( err, profileInfo ) {
        if( !err ) {
            return res.send( profileInfo );
        } else {
            console.log( err );
            return res.send('ERROR');
        }
    });
});
app.post( '/v1/admin/counters/:id', function( request, response ) {
    console.log("post /v1/admin/counters");
  //   if(checkVendorApiAunthaticated(request,0) == false)
  // {
  //   return response.send("Not aunthiticated").status(403);
  // }
    console.log(request.params.id);
     //var dd = {'cityName':"dvg",'subAreas':[{'name':"rajajinagar"},{'name':"vijaynagar"}]};
     var dd = {_id:request.params.id,
                sequence:0};
      var counters = new CountersModel(
         dd);
        return counters.save(function( err) {
        if( !err ) {
            console.log("no error");
            console.log(counters);
            return response.send(counters);
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});

app.post( '/v1/profile/logo/:id', upload.single('file'),function( req, res ) {
  console.log(req.params.id);
  console.log(req.files);
  console.log(req.file);
  console.log(req.file.path);
  console.log("VendorLogo post");
  console.log(req.body);
var url2 = req.protocol + '://' + req.get('host') +'\\' + req.file.path;
console.log(url2);
  ProfileInfoModel.update({ 'id':req.params.id},
      {
         $addToSet: {logo: {$each:[{url: url2}] }}
       
      },
       function( err ) {
        if( !err ) {
            console.log( 'updated logo created' );
           
            return res.send('created');;
        } else {
         console.log( 'updated logo error' );
            console.log( err );
            return res.send('ERROR');
        }
    });
});
};


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
    {
      console.log("isLoggedIn");
        return next();
    }
    else
    {
       console.log("not loggedin isLoggedIn");
    }

    res.redirect('/');
}




//module.exports = router;
