app = angular.module("vendorModule", []);

  app.controller("mainController", function ($scope, $http, jsonFilter,$timeout)
  {
  		 $scope.total2 = 123;
       $scope.minage = 18;
       $scope.maxage = 100;

       $scope.gender_select = '';

       $scope.cast_select = 'all';
       $scope.mt_select = 'all';
       $scope.education_select = 'all';
       $scope.height_select = 'all';
       $scope.age_select = 'all';
      $scope.maritalstatus_select =  'Unmarried';
       
       $scope.genders = [ {name: 'Bride'}, {name: 'Bridegroom'}, {name: 'all'}];
       $scope.ages = [{name: 'all'}, {name: '18-22'}, {name: '22-25'},{name: '25-28'},
        {name: '28-30'},{name: '30-32'},{name: '33-35'},{name: '35 and above'}];

  	  $scope.getProfile = function (param,param_position,param_gender,
        param_community,param_age,param_maritalstatus,param_education,param_mothertongue
        ) {
      $scope.username = param;
      console.log("getprofile"); 
      console.log(param_position);
      console.log(param_gender);
      console.log(param_maritalstatus);
      console.log(param_education);
      console.log(param_mothertongue);
      $scope.maritalstatus_select = param_maritalstatus;
      $scope.mt_select = param_mothertongue;
      $scope.education_select = param_education;
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
      

      var url = "/v2/profile/info2/";
      url = url + param + '/' + selectedGender + '/' + param_community + '/' 
      +$scope.minage+'/'+$scope.maxage + '/' + param_maritalstatus + '/'  + param_education 
      + '/' + param_mothertongue ;
      console.log(url);
      $http.get(url)
        .success(function (data, status, headers, config)
        {
          $scope.completeprofilelist = data[0].profiles;
          // if(data[0].profiles.size() == 0)
          // {
          //   alert(No Profiels);
          // }
          $scope.communitys = data[0].community;
          var cast_all = {name:'all'};
          $scope.communitys.unshift(cast_all);
          $scope.profilelist = $scope.completeprofilelist;
          for(var i = 0 ; i < $scope.profilelist.length ; i++)
          {
            //$scope.profilelist[i].height;
            if($scope.profilelist[i].height !== undefined) {
              $scope.profilelist[i].height = convertInches($scope.profilelist[i].height);
            }
          }
          $scope.vendorname = data[0].name;
          
           $scope.vendorlogo = data[0].logo;
            console.log("vendorlogo"); 
           console.log($scope.vendorlogo);
           $scope.vendorId = data[0].id;
          
           $scope.vendorEmail = data[0].email;
           $scope.vendorPhone = data[0].phone;

          console.log($scope.profilelist);
          
        
         
            $scope.profile = $scope.profilelist[$scope.position];
        //  $scope.profile.height = convertInches($scope.profile.height);
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
    $scope.printprofile = function (param) {
    
      Pagelink = "about:blank";
      var pwa = window.open(Pagelink, "_new");
      pwa.document.open();
      pwa.document.write(VoucherSourcetoPrint());
      pwa.document.close();
    
      

    };
    function VoucherSourcetoPrint(source) {
    return "<html><head><script>function step1(){\n" +
        "setTimeout('step2()', 10);}\n" +
        "function step2(){window.print();window.close()}\n" +
        "</scri" + "pt></head><body onload='step1()'>\n" +
        "<img src='" + $scope.profile.profileLogo + "' /></body></html>";
    }
 
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
              $scope.getProfile($scope.username,$scope.position,'all','all','all','Unmarried','all','all');
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
      console.log("viewProfile");
   
      console.log(param);
      $scope.position = param;
         
      console.log($scope.position);
      console.log($scope.gender_select);
      console.log($scope.cast_select);
      console.log($scope.age_select);
    
     // $scope.profile = $scope. profilelist[$scope.position];
      var url = "/profile_list/";
      url = url + $scope.position +'/' + $scope.gender_select+'/'+$scope.cast_select;
      url = url + '/' + $scope.age_select + '/' + $scope.maritalstatus_select + '/'
      + $scope.education_select + '/' + $scope.mt_select;
      console.log(url);
       window.open(url, "_self");
    
  };
   $scope.viewProfileDetail = function (param) {
      console.log("viewProfileDetail");
   
      console.log(param);
      $scope.position = param;
         
      console.log($scope.position);
      console.log($scope.gender_select);
      console.log($scope.cast_select);
      console.log($scope.age_select);
     // $scope.profile = $scope. profilelist[$scope.position];
      var url = "/profile/";
      url = url + $scope.position +'/' + $scope.gender_select+'/'+$scope.cast_select;
      url = url + '/' + $scope.age_select + '/' + $scope.maritalstatus_select + '/'
      + $scope.education_select + '/' + $scope.mt_select;
      console.log(url);
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
     $scope.searchbyid = function(param) {
        console.log('searchbyid');
      };
      $scope.quickSearch = function(param) {
        console.log('quickSearch');
        $scope.mt_select = 'all';
        $scope.education_select = 'all';
        $scope.maritalstatus_select =  'Unmarried';
        $scope.viewProfile(0);
      };
      $scope.advancedSearch = function(param) {
        console.log('advancedSearch');
        $scope.viewProfile(0);
      };
// });

  
//   app.controller("DetailsController", function ($scope, $http, jsonFilter)
//   {

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
      $scope.horo1 = [];
      $scope.horo2 = [];
      $scope.horo3 = [];
      $scope.horo4 = [];
      $scope.horo5 = [];
      $scope.horo6 = [];
      $scope.horo7 = [];
      $scope.horo8 = [];
      $scope.horo9 = [];
      $scope.horo10 = [];
      $scope.horo11 = [];
      $scope.horo12 = [];
$scope.height_list = [{name:'4ft',value: 48},{name:'4ft 1in',value: 49},
                       {name:'4ft 2in',value: 50},{name:'4ft 3in',value: 51},
                       {name:'4ft 4in',value: 52},
                       {name:'4ft 5in',value: 53},{name:'4ft 6in',value: 54},
                       {name:'4ft 7in',value: 55},{name:'4ft 8in',value: 56},
                       {name:'4ft 9in',value: 57},{name:'4ft 10in',value: 58},
                       {name:'4ft 11in',value: 59},{name:'5ft',value: 60},
                       {name:'5ft 1in',value: 61},
                       {name:'5ft 2in',value: 62},{name:'5ft 3in',value: 63},
                       {name:'5ft 4in',value: 64},{name:'5ft 5in',value: 65},
                       {name:'5ft 6in',value: 66},{name:'5ft 7in',value: 67},
                       {name:'5ft 8in',value: 68},{name:'5ft 9in',value: 69},
                       {name:'5ft 10in',value: 70},{name:'5ft 11in',value: 71},
                       {name:'6ft',value: 72},{name:'6ft 1in',value: 73},
                       {name:'6ft 2in',value: 74},{name:'6ft 3in',value: 75},
                       {name:'6ft 4in',value: 76},{name:'6ft 5in',value: 77},
                       {name:'6ft 6in',value: 78},{name:'6ft 7in',value: 79},
                       {name:'6ft 8in',value: 80},{name:'6ft 9in',value: 81},
                       {name:'6ft 10in',value: 82},{name:'6ft 11in',value: 83},
                        {name:'7ft',value: 84}
                       ];

$scope.graha_list = [{name:'Lagna'},{name:'Ravi'},{name:'Chandra'},{name:'Kuja'},
      {name:'Budha'},{name:'Guru'},{name:'Shukra'},{name:'Shani'},
      {name:'Raahu'}, {name:'Ketu'}];

$scope.rashilist = [{name:'Mesha(Aries)'},{name:'Vrushabha(Taurus)'},
                       {name:'Mithuna(Gemini)'},{name:'Kataka(Cancer)'},
                       {name:'Simha(Leo)'},{name:'Kanya(Virgo)'},
                       {name:'Thula(Libra)'},{name:'Vrushchika(Scorpio)'},
                       {name:'Dhanur(Sagittarius)'},{name:'Makara(Capricorn)'},
                       {name:'Kumba(Aquarius)'},{name:'Meena(Pisces)'}];
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

$scope.education_list = [{name:'Aeronautical engineering'},{name:'B.Arch'},
                      {name:'B.C.A'},{name:'B.E'},{name:'B.Plan'},{name:'B.Sc IT /Computer Science'},
                      {name:'B.Tech'},{name:'B.A'},{name:'B.Com'},{name:'B.Ed'},
                      {name:'B.F.A'},{name:'B.F.T'},{name:'B.L.I.S'},{name:'B.M.M'},
                      {name:'B.Sc'},{name:'B.S.W'},{name:'B.Phil'},{name:'B.B.A'},
                      {name:'B.F.M(Financial Management)'},{name:'B.H.M(Hotel Management)'},
                      {name:'Bachelor degree(Others)'},{name:'B.D.S'},{name:'B.H.M.S'},{name:'B.S.M.S'},
                      {name:'B.Pharm'},{name:'B.P.T'},{name:'B.U.M.S'},{name:'B.V.Sc'},
                      {name:'B.Sc Nursing'},{name:'B.G.L'},{name:'B.L'},{name:'B.A.M.S'},
                      {name:'C.A'},{name:'C.F.A(chartered Financial Analyst)'},
                      {name:'C.S'},{name:'Higher secondary School'},
                      {name:'S.S.L.C/10th'},{name:'P.U.C/12th'},
                      {name:'I.T.I'},{name:'ICWA'},{name:'IAS'},{name:'IPS'},
                      {name:'IES'},{name:'IFS'},{name:'IRS'},{name:'KAS'},
                      {name:'Other Degree in Services'},{name:'M.C.A'},
                      {name:'M.Sc IT /Computer Science'},{name:'M.S(Engineering)'},
                      {name:'M.Tech'}, {name:'P.G.D.C.A'},{name:'M.A'}, {name:'M.Com'},
                      {name:'M.Ed'},{name:'M.F.A'},{name:'M.LIS'},{name:'M.Sc'},
                      {name:'M.S.W'},{name:'M.Phil'},{name:'M.B.A'},{name:'M.F.M(Financial Management)'},
                      {name:'M.H.M(Hotel Management)'},{name:'M.H.R.M(Human Resource Management)'},
                      {name:'P.G.D.M'},{name:'M.B.B.S'},{name:'M.D.S'},{name:'M.D/M.S(Medical)'},
                      {name:'M.Pharm'},{name:'M.P.T'},{name:'M.V.Sc'},{name:'Masters degree(Others)'},
                      {name:'L.L.B'},{name:'L.L.M'},{name:'M.L'},{name:'P.H.D'},
                      {name:'Diploma'},{name:'polyytechnic'},{name:'Trade Schools'},{name:'Others'}];        // $scope.fatheroccupation = "farmer",


$scope.mothertongue_list = [{name:'Kannada'}, {name:'Hindi'},
                            {name:'Tamil'},{name:'Telugu'},
                            {name:'Hindi'},{name:'Tulu'},
                            {name:'Konkani'},{name:'kodava'},
                            {name:'English'}, {name:'Urdu'},
                           {name:'Assamese'},{name:'Bengali'},
                           {name:'Bodo'},{name:'Dogri'},
                           {name:'Gujarati'},
                           {name:'Kashmiri'},{name:'Konkani'},
                           {name:'Maithili'},{name:'Malayalam'},
                           {name:'Marathi'},{name:'Meitei(Manipuri)'},
                           {name:'Nepali'},{name:'Odia'},
                           {name:'Maithili'},{name:'Malayalam'},
                           {name:'Punjabi'},{name:'Sanskrit'},
                           {name:'Santali'},{name:'Sindhi'},{name:'French'},{name:'Other'}];

$scope.state_list =[       {name:'Andhra Pradesh'}, {name:'Arunachal Pradesh'},
                          {name:'Assam'},{name:'Bihar'},
                          {name:'Chhattisgarh'},{name:'Goa'},
                          {name:'Gujarat'},{name:'Haryana'},
                          {name:'Himachal Pradesh'}, {name:'Jammu and Kashmir'},
                           {name:'Jharkhand'},{name:'Karnataka'},
                           {name:'Maharashtra'},{name:'Manipur'},
                           {name:'Meghalaya'},{name:'Mizoram'},
                           {name:'Nagaland'},{name:'Odisha'},
                           {name:'Nepali'},{name:'Odia'},
                           {name:'Punjab'},{name:'Rajasthan'},
                           {name:'Sikkim'},{name:'Tamil Nadu'},
                           {name:'Telangana'},{name:'Tripura'},
                            {name:'Uttar Pradesh'},{name:'Uttarakhand'},
                           {name:'West Bengal'}];

  

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
    function convertInches(inches) {
      let feetFromInches = Math.floor(inches / 12);//There are 12 inches in a foot
      let inchesRemainder = inches % 12;
   
      let result = feetFromInches + " ft " + inchesRemainder + " in";
      console.log(result);
      return result;
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
      function formatDate(date) {
        var monthNames = [
          "Jan", "Feb", "Mar",
          "Apr", "May", "June", "July",
          "Aug", "Sep", "Oct",
          "Nov", "Dec"
        ];
        var weekNames = [
          "Sunday", "Monday", "Tuesday",
          "Wednesday", "Thursday", "Friday", "Saturday"];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var weekIndex = date.getDay();
        return  weekNames[weekIndex] + ','  +  day + '-' + monthNames[monthIndex] + '-' + year + ' '
        + hours + ':' + minutes  ; 
      }

      $scope.addDetails = function (param) {
      console.log("addDetails 1");

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
      console.log($scope.maritalstatus);
      console.log($scope.complexion);
      console.log($scope.state);
      console.log($scope.native);
      console.log($scope.castdetails);
      console.log($scope.padha);
      console.log($scope.lagna);
      console.log($scope.gothradetails);
      console.log($scope.homegod);
      console.log($scope.religionotherdetails);
      console.log($scope.educationdetails);
      console.log($scope.occupationdetails);
      console.log($scope.joblocation);
      console.log($scope.brotherdetails);
      console.log($scope.sisterdetails);
      console.log($scope.birthplace);
  console.log('horoscope');
  var horoscope1 = [];
  horoscope1.push($scope.horo1);
  horoscope1.push($scope.horo2);
  horoscope1.push($scope.horo3);
  horoscope1.push($scope.horo4);
  horoscope1.push($scope.horo5);
  horoscope1.push($scope.horo6);
  horoscope1.push($scope.horo7);
  horoscope1.push($scope.horo8);
  horoscope1.push($scope.horo9);
  horoscope1.push($scope.horo10);
  horoscope1.push($scope.horo11);
  horoscope1.push($scope.horo12);
  console.log(horoscope1); 

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
     //  console.log( $scope.files[0]);
      
//horoscope

//
      
      var indiandob = formatDate($scope.dob); 
      console.log(indiandob);
    var ageDifMs = Date.now() - $scope.dob.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    var calcage  = Math.abs(ageDate.getUTCFullYear() - 1970);
    
    console.log('age->',calcage);
      var postData={
        vendorName:$scope.vendorname,
        vendorEmail:$scope.vendorEmail,
        vendorPhone:$scope.vendorPhone,
        vendorId:$scope.vendorId,
        name:$scope.name, 
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
        otherDetails:$scope.otherDetails,
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
        origin:$scope.native,
        dob:indiandob,
        age:calcage,
        vendorlogo:$scope.vendorlogo,
        maritalstatus:$scope.maritalstatus,
        complexion:$scope.complexion,
        state:$scope.state,
        native:$scope.native,
        castdetails:$scope.castdetails,
        padha:$scope.padha,
        lagna:$scope.lagna,
        gothradetails:$scope.gothradetails,
        homegod:$scope.homegod,
        religionotherdetails:$scope.religionotherdetails,
        educationdetails:$scope.educationdetails,
        occupationdetails:$scope.occupationdetails,
        joblocation:$scope.joblocation,
        brotherdetails:$scope.brotherdetails,
        sisterdetails:$scope.sisterdetails,
        birthplace:$scope.birthplace,
        horoscope:horoscope1
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


    $scope.getVendorDetails = function (param,param_issearch) {
      console.log("getVendorDetails");
      var url4 = "/v1/profile/info2/";
      url4 = url4 + param;
 
      $http.get(url4)
        .success(function (data, status, headers, config)
        {
           console.log("success add"); 
           console.log(data);
           $scope.mtList =  $scope.mothertongue_list;
           $scope.communityList = data[0].community;
           
           $scope.vendorlogo = data[0].logo;
            console.log("vendorlogo"); 
           console.log($scope.vendorlogo);
           $scope.vendorId = data[0].id;
           $scope.vendorname = data[0].name;
           $scope.vendorEmail = data[0].email;
           $scope.vendorPhone = data[0].phone;

           $scope.education_searchlist = $scope.education_list;
          
           $scope.heightsearchlist = $scope.heightlist;
           
           if(param_issearch)
           {
             var all_search= {name:'all'};
             $scope.communityList.unshift(all_search);
             $scope.mtList.unshift(all_search);
             $scope.education_searchlist.unshift(all_search);
             $scope.heightsearchlist.unshift(all_search);
           }
          // if(horoscope)
           //console.log($scope.mtList);
           //console.log($scope.communityList);
        })
        .error(function (data, status, headers, config)
        {          
          console.log("errod on add");
          console.log(status);
          console.log(data);
        });
    };
  });


app.controller("adminController", function ($scope, $http, jsonFilter)
  {
     
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
            alert("add Admin Details success");
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
});

/////////////////////////////////////////
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
           $scope.communityList = data[0].community;
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