app = angular.module("vendorModule", []);

  app.controller("mainController", function ($scope, $http, jsonFilter,$timeout)
  {
  		 $scope.total2 = 123;
       $scope.minage = 18;
       $scope.maxage = 100;

       $scope.gender_select = '';

       $scope.cast_select = 'all';
       $scope.stars = [{name:'Ashwini'},{name:'Bharani'},
                       {name:'Kritika'},{name:'Rohini'},
                       {name:'Mrigashirsa'},{name:'Ardra'},
                       {name:'Punarvasu'},{name:'Pushya'},
                       {name:'Ashlesha'},{name:'Magha'},
                       {name:'Poorvaphalguni'},{name:'Uttaraphalguni'},
                       {name:'Hasta'}, {name:'Chitra'},      
                       {name:'Swati'},{name:'Vishakha'},
                       {name:'Anuradha'},{name:'Jyeshta'},
                       {name:'Moola'},{name:'Poorvashada'},
                       {name:'Uttarashadha'},{name:'Sravana'},
                       {name:'Dhanishtha'},{name:'Satabisha'},
                       {name:'Poorvabhadrapada'}, {name:'Uttarabhadrapada'},
                       {name:'Revati'}  ];
       $scope.communitys = [ {name: 'Brahmin'}, {name: 'Lingayath'}, {name: 'all'}];
       $scope.genders = [ {name: 'Bride'}, {name: 'Bridegroom'}, {name: 'all'}];
       $scope.ages = [{name: 'all'}, {name: '18-22'}, {name: '22-25'},{name: '25-28'},
        {name: '28-30'},{name: '30-32'},{name: '33-35'},{name: '35 and above'}];

  	  $scope.getProfile = function (param,param_position,param_gender,
        param_community,param_age) {
      $scope.username = param;
      console.log("getprofile"); 
      console.log(param_position);
      console.log(param_gender);
      $scope.position = param_position;
      $scope.age_select = param_age;
      console.log($scope.minage);
      console.log($scope.maxage);
    //  updateSelectAge();

      var selectedGender = 'Male';
      if(param_gender == 'Bride')
      {
          selectedGender = "Female";
      }
      else if(param_gender == 'Bridegroom')
      {
          selectedGender = "Male"; 
      }
      else
      {
        selectedGender = "all"; 
      }

        if($scope.age_select == '18-22')
        {
          $scope.minage = 18;
          $scope.maxage = 22;
        }
        else if($scope.age_select == '22-25')
        {
          $scope.minage = 22;
          $scope.maxage = 25;
        }
        else if($scope.age_select == '25-28')
        {
          $scope.minage = 25;
          $scope.maxage = 28;
        }
        else if($scope.age_select == '28-30')
        {
          $scope.minage = 28;
          $scope.maxage = 30;
        }
        else if($scope.age_select == '30-32')
        {
          $scope.minage = 30;
          $scope.maxage = 32;
        }
        else if($scope.age_select == '33-35')
        {
          $scope.minage = 33;
          $scope.maxage = 35;
        }
        else if($scope.age_select == '35 and above')
        {
          $scope.minage = 35;
          $scope.maxage = 100;
        }
        else
        {
          $scope.minage = 18;
          $scope.maxage = 100;
        }

      $timeout(function() {
        $scope.gender_select = param_gender;
        $scope.cast_select = param_community;
        $scope.age_select = param_age;
      }, 0);
      console.log($scope.minage);
      console.log($scope.maxage);
      

      var url = "/v1/profile/info2/";
      url = url + param + '/' + selectedGender + '/' + param_community + '/' 
      +$scope.minage+'/'+$scope.maxage ;
      console.log(url);
      $http.get(url)
        .success(function (data, status, headers, config)
        {
          $scope.completeprofilelist = data[0].profiles;
          $scope.communitys = data[0].community;
          var cast_all = {name:'all'};
          $scope.communitys.unshift(cast_all);
          $scope.profilelist = $scope.completeprofilelist;
          console.log($scope.profilelist);
          
          $scope.profile = $scope.profilelist[$scope.position];
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };
    $scope.nextProfile = function (param) {
      console.log("nextProfile");
     
      if($scope.profilelist.length > ($scope.position+1))
      { 
         $scope.position = $scope.position +1;
      console.log($scope.position);
        console.log('inside');
          $scope.profile = $scope.profilelist[$scope.position];
      }

    };
    $scope.previousProfile = function (param) {
      console.log("previousProfile");

      if($scope.position > 0)
      {
             $scope.position = $scope.position - 1;
     console.log($scope.position);
      $scope.profile = $scope.profilelist[$scope.position];
    }
  };
  $scope.deleteProfile = function (param) {
    var retVal = confirm("Do you want to Delete this profile?");
               if( retVal == true ){
                  
                  console.log("deleteprofile");
      console.log(param);
      var url = '/v1/profile/';
      url = url +$scope.username + '/' + param;
      $http.delete(url)
            .success(function (data, status, headers, config) {
                console.log("success delete");
                console.log(data);
              $scope.getProfile($scope.username,$scope.position,'all','all','all');
            })
            .error(function (data, status, headers, config) {
                console.log("errod on delete");
                console.log(status);
                console.log(data);
            });
                  return true;
               }
               
      
  };
  $scope.viewProfile = function (param) {
      console.log("previousProfile");
   
      console.log(param);
      $scope.position = param;
         
      console.log($scope.position);
      $scope.profile = $scope. profilelist[$scope.position];
      var url = "/profile/";
      url = url + $scope.position +'/' + $scope.gender_select+'/'+$scope.cast_select;
      url = url + '/' + $scope.age_select;
      console.log(url);
      // $scope.cast_select.name
      // $scope.gender_select
      // $scope.age_select
      window.open(url, "_self");
    
  };
     
      $scope.updateSelectAge = function(param) {
        console.log('updateSelectAge');
        if(param == 0)
        {
          $scope.position = 0;
        }
        else
        {
          $scope.position = 0;
        }
        console.log($scope.age_select)
        $scope.getProfile($scope.username,$scope.position,$scope.gender_select,$scope.cast_select,$scope.age_select);
      };
      $scope.updateSelectCast = function(param) {
        console.log('updateSelectCast');
        if(param  == 0)
        {
          $scope.position = 0;
        }
        else
        {
          $scope.position = 0;
        }
        console.log($scope.cast_select);
        $scope.getProfile($scope.username,$scope.position,$scope.gender_select,
          $scope.cast_select,$scope.age_select);
      }
      $scope.updateSelectGender = function(param) {
        console.log('updateSelectGender');
        if(param  == 0)
        {
          $scope.position = 0;
        }
        else
        {
          $scope.position = 0;
        }
         console.log($scope.gender_select);
        $scope.getProfile($scope.username,$scope.position,$scope.gender_select,$scope.cast_select,$scope.age_select);
      };
    
});

  
  app.controller("DetailsController", function ($scope, $http, jsonFilter)
  {

      // $scope.name ="";
      // $scope.phone = 9797998789;
      // $scope.email = "dd@d.com";
      // $scope.gender= "Male";
      // $scope.occupation="Software Engineer";
      // $scope.education="Engineering";
      // $scope.cast="Brahmin";
      // $scope.summary="I am software engineer";
      // $scope.fathername="Rajesh";
      // $scope.mothername="Kalpana";
      // $scope.hotelAddress1 = "addres1",
      // $scope.hotelLandmark = "landmark", 
      // $scope.city= "vvpura", 


$scope.stars = [{name:'Ashwini'},{name:'Bharani'},
                       {name:'Kritika'},{name:'Rohini'},
                       {name:'Mrigashirsa'},{name:'Ardra'},
                       {name:'Punarvasu'},{name:'Pushya'},
                       {name:'Ashlesha'},{name:'Magha'},
                       {name:'Poorvaphalguni'},{name:'Uttaraphalguni'},
                       {name:'Hasta'}, {name:'Chitra'},      
                       {name:'Swati'},{name:'Vishakha'},
                       {name:'Anuradha'},{name:'Jyeshta'},
                       {name:'Moola'},{name:'Poorvashada'},
                       {name:'Uttarashadha'},{name:'Sravana'},
                       {name:'Dhanishtha'},{name:'Satabisha'},
                       {name:'Poorvabhadrapada'}, {name:'Uttarabhadrapada'},
                       {name:'Revati'}  ];

        // $scope.fatheroccupation = "farmer",
        // $scope.motheroccupation = "farmer",
        // $scope.mothertongue  = "kannada";
        // $scope.income = 100000;
        // $scope.gothra= "kannada" ;
        // $scope.rashi= "kannada";
        // $scope.height= "kannada";
        // $scope.weight= "kannada";
        // $scope.origin= "kannada";


      // $scope.name ="";
      // $scope.phone = "";
      // $scope.email = "";
      // $scope.gender= "";
      // $scope.occupation="";
      // $scope.education="";
      // $scope.cast="";
      // $scope.summary="";
      // $scope.fathername="";
      // $scope.mothername="";
      // $scope.hotelAddress1 = "",
      // $scope.hotelLandmark = "", 
      // $scope.hotelAreaname= "", 


      $scope.addvendorLogo = function (param,files) {
      console.log("addLogo");
      $scope.files = files;
      $scope.filePresent =  true;

     var fd = new FormData();
     console.log(files[0]);
      
    //Take the first selected file
      fd.append("file", files[0]);
      
      var url4 = "/v1/profile/logo/";
      url4 = url4 + param;
       console.log(param);
         
    };



   $scope.addvendorDetails = function (param) {
      console.log("addDetails 1");
     if(!$scope.files)
     {
       alert("Image Empty");
     }
     else
     {
       var fd = new FormData();
       console.log( $scope.files[0]);
      
    // //Take the first selected file
    
       fd.append("file",  $scope.files[0]);


      var url = "/v1/admin/update/";
      url = url + param;
      console.log($scope.vendorname);
      console.log($scope.vendorphone);
      console.log($scope.vendoremail);
     
    
      var postData={
        name:$scope.vendorname, 
        phone:$scope.vendorphone,
        email:$scope.vendoremail,        
       };
       fd.append("data", JSON.stringify(postData));
console.log(url);
      $http.post(url,fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined , 'enctype': 'multipart/form-data' },
        transformRequest: angular.identity
    }).success(function (data, status, headers, config)
        {
            console.log("addDetails success");
            alert("addDetails success");
            $scope.filePresent = false;

        })
        .error(function (data, status, headers, config)
        {
          console.log("addDetails error");
           alert("addDetails error");
           $scope.filePresent = false;
        });
      }
    };


/////////////////////////////////////////

      $scope.addLogo = function (param,files) {
      console.log("addLogo");
      $scope.files = files;
      $scope.filePresent =  true;

     var fd = new FormData();
     console.log(files[0]);
      
    //Take the first selected file
      fd.append("file", files[0]);
      
      var url4 = "/v1/profile/logo/";
      url4 = url4 + param;
       console.log(param);
         
    };
 $scope.phonenumber = function (inputtxt) {
        console.log("phonenumber 1 ", inputtxt);
        //console.log($scope.selected[address.label]);
        var phoneno = /(?:\s+|)((0|(?:(\+|)91))(?:\s|-)*(?:(?:\d(?:\s|-)*\d{9})|(?:\d{2}(?:\s|-)*\d{8})|(?:\d{3}(?:\s|-)*\d{7}))|\d{10})(?:\s+|)/;
        if (phoneno.test(inputtxt)) {
            return true;
        } else {

            return false;
        }
    }
    function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }
    $scope.emailid = function (inputtxt) {
        console.log("email 1 ", inputtxt);
        //console.log($scope.selected[address.label]);
        var mailid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
        if (mailid.test(inputtxt)) {
            return true;
        } else {

            return false;
        }
    }

    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type: 'image/jpeg'});
    }

    function resizeAndUpload(file,param,postData) {
    
    var reader = new FileReader();
    reader.onloadend = function() {
 
    var tempImg = new Image();
    tempImg.src = reader.result;
    tempImg.onload = function() {
 
        var MAX_WIDTH = 960;
        var MAX_HEIGHT = 960;
        var tempW = tempImg.width;
        var tempH = tempImg.height;
        if (tempW > tempH) {
            if (tempW > MAX_WIDTH) {
               tempH *= MAX_WIDTH / tempW;
               tempW = MAX_WIDTH;
            }
        } else {
            if (tempH > MAX_HEIGHT) {
               tempW *= MAX_HEIGHT / tempH;
               tempH = MAX_HEIGHT;
            }
        }
 
        var canvas = document.createElement('canvas');
        canvas.width = tempW;
        canvas.height = tempH;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0, tempW, tempH);
        var dataURL = canvas.toDataURL("image/jpeg");

        var url = "/v1/profile2/";
        url = url + param;
        var fd = new FormData();

        var blob = dataURItoBlob(dataURL);
      //  var base64 = dataURL.split('base64,')[1];
       // var parseFile = new Parse.File(name, { base64: base64 });

        fd.append("file",  blob , "thumb.jpg");

        fd.append("data", JSON.stringify(postData));
        $http.post(url,fd, {
          withCredentials: true,
          headers: {'Content-Type': undefined , 'enctype': 'multipart/form-data' },
          transformRequest: angular.identity
        }).success(function (data, status, headers, config)
        {
            console.log("addDetails success");
            alert("addDetails success");
            $scope.filePresent = false;
        })
        .error(function (data, status, headers, config)
        {
          console.log("addDetails error");
           alert("addDetails error");
           $scope.filePresent = false;
        });
      }
 
   }
   reader.readAsDataURL(file);
}
      $scope.addDetails = function (param) {
      console.log("addDetails 1");

      if ($scope.name == "" || $scope.name == null) {
         alert("Name Empty");
      } else if ($scope.phone == "" || $scope.phone == null ) {
          alert("Phone Number Empty");
      } else if (!$scope.phonenumber($scope.phone)) {
          alert("Invalid Phone Number");
      }
      else if ($scope.occupation == "" || $scope.occupation == null) {
         alert("Occupation Empty");
      }
      else if ($scope.education == "" || $scope.education == null) {
         alert("Education Empty");
      }
      else if ($scope.dob == "" || $scope.dob == null) {
         alert("Date of Birth Empty");
      }
      else if ($scope.cast == "" || $scope.cast == null) {
         alert("Cast Empty");
      } 
      else if ($scope.mothertongue == "" || $scope.mothertongue == null) {
         alert("Mothertongue Empty");
      } 
      else if ($scope.height == "" || $scope.height == null) {
         alert("Height Empty");
      }
      else if(!$scope.files)
     {
      console.log("addDetails 1");
       alert("Profile Photo Empty..Please add photo ");
     }  
     else
     {
      console.log("addDetails 1");
       var fd = new FormData();
       console.log( $scope.files[0]);
      
    // //Take the first selected file
    
     

     
      console.log($scope.name);
      console.log($scope.phone);
      console.log($scope.email);
      console.log($scope.gender);
      console.log($scope.occupation);
      console.log($scope.education);
      console.log($scope.cast);
      console.log($scope.summary);
      console.log($scope.fathername);
      console.log($scope.mothername);
    var ageDifMs = Date.now() - $scope.dob.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    var calcage  = Math.abs(ageDate.getUTCFullYear() - 1970);

    console.log('age->',calcage);
      var postData={name:$scope.name, 
        Address1:$scope.hotelAddress1,
        Address2:"", street :"",Landmark:"", 
        city:$scope.city, 
        logo:"",
        profileLogo:"",
        gender:$scope.gender, 
        phone:$scope.phone,
        email:$scope.email,
        occupation:$scope.occupation,
        education:$scope.education,
        summary:$scope.summary,
        gender:$scope.gender,
        cast:$scope.cast,
        fathername:$scope.fathername,
        mothername:$scope.mothername,
        fatheroccupation:$scope.fatheroccupation,
        motheroccupation:$scope.motheroccupation,
        mothertongue:$scope.mothertongue,
        income:$scope.income,
        gothra:$scope.gothra,
        star:$scope.star,
        rashi:$scope.rashi,
        height:$scope.height,
        weight:$scope.weight,
        origin:$scope.origin,
        dob:$scope.dob,
        age:calcage,
        vendorlogo:$scope.vendorlogo
       };

       fd.append("file",  $scope.files[0]);

       fd.append("data", JSON.stringify(postData));
       var url = "/v1/profile2/";
       url = url + param;
       resizeAndUpload($scope.files[0],param,postData);
console.log(url);
    //   $http.post(url,fd, {
    //     withCredentials: true,
    //     headers: {'Content-Type': undefined , 'enctype': 'multipart/form-data' },
    //     transformRequest: angular.identity
    // }).success(function (data, status, headers, config)
    //     {
    //         console.log("addDetails success");
    //         alert("addDetails success");
    //         $scope.filePresent = false;
    //     })
    //     .error(function (data, status, headers, config)
    //     {
    //       console.log("addDetails error");
    //        alert("addDetails error");
    //        $scope.filePresent = false;
    //     });
      }
    };


    $scope.getVendorDetails = function (param) {
      console.log("getVendorDetails");
      var url4 = "/v1/profile/info2/";
      url4 = url4 + param;
 
      $http.get(url4)
        .success(function (data, status, headers, config)
        {
           console.log("success add"); 
           console.log(data);
           $scope.mtList =  data[0].mothertongue;
           $scope.communityList = data[0].community;
           $scope.vendorlogo = data[0].logo;
           console.log($scope.mtList);
          console.log($scope.communityList);
        })
        .error(function (data, status, headers, config)
        {          
          console.log("errod on add");
          console.log(status);
          console.log(data);
        });
    };
  });

 app.controller("VendorController", function ($scope, $http, jsonFilter)
  {
    $scope.addCommunity = function (param) {
      console.log("addCommunity");
      var url4 = "/v1/vendor/update/community/";
      url4 = url4 + param;
      var postData={community:$scope.community};

      $http.post(url4,postData)
        .success(function (data, status, headers, config)
        {
           console.log("success add");
           console.log(data);
        })
        .error(function (data, status, headers, config)
        {
          console.log("errod on add");
          console.log(status);
          console.log(data);
        });
         $scope.getVendorDetails(param);
    };

    $scope.addMotherTongue = function (param) {
      console.log("addCommunity");
      var url4 = "/v1/vendor/update/mothertongue/";
      url4 = url4 + param;
      var postData={mothertongue:$scope.mothertongue};

      $http.post(url4,postData)
        .success(function (data, status, headers, config)
        {
           console.log("success add");
           console.log(data);
        })
        .error(function (data, status, headers, config)
        {
          console.log("errod on add");
          console.log(status);
          console.log(data);
        });
         $scope.getVendorDetails(param);
    };
    $scope.getVendorDetails = function (param) {
      console.log("getVendorDetails");
      var url4 = "/v1/profile/info2/";
      url4 = url4 + param;
 
      $http.get(url4)
        .success(function (data, status, headers, config)
        {
           console.log("success add"); 
           console.log(data);
           $scope.mtList =  data[0].mothertongue;
           $scope.communityList = data[0].community;
           console.log($scope.mtList);
          console.log($scope.communityList);
        })
        .error(function (data, status, headers, config)
        {
          
          console.log("errod on add");
          console.log(status);
          console.log(data);
        });
         
    };
});