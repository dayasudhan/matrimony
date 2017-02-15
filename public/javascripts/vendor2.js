app = angular.module("vendorModule", []);
app.service('items', function() {
    var items = 0;
    var itemsService = {};
    
    itemsService.add = function(item) {
      console.log(item);
        items = item;
    };
    itemsService.list = function() {
      console.log(items);
        return items;
    };
    
    return itemsService;
});

  app.controller("mainController", function ($scope,$rootScope, items, $http, jsonFilter)
  {
  		 $scope.total2 = 123;
       $scope.minage = 18;
       $scope.maxage = 100;
       // $scope.list = items.list;
       // $scope.add = items.add;
  	  $scope.getProfile = function (param,param_position) {
      console.log("getprofile");
      console.log(param_position);
      $scope.position = param_position;
      console.log(items.list());
      var url = "/v1/profile/info/";
      url = url + param;
      $http.get(url)
        .success(function (data, status, headers, config)
        {
          $scope.completeprofilelist = data;
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
  $scope.viewProfile = function (param) {
      console.log("previousProfile");
     $rootScope.position = param;
     console.log($rootScope.position);
      console.log(param);
      $scope.position = param;
      items.add($scope.position);
      console.log(items.list());
      console.log($scope.position);
      $scope.profile = $scope. profilelist[$scope.position];
      var url = "/profile/";
      url = url + $scope.position;
      window.open(url, "_self");
     //  var url = "/profile";
      // url = url + $scope.position;


      // $http.get(url)
      //   .success(function (data, status, headers, config)
      //   {
         
      //   })
      //   .error(function (data, status, headers, config)
      //   {
      //     $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
      //   });
  };
      $scope.communitys = [ {name: 'Bramin'}, {name: 'Lingayath'}, {name: 'Other'}];
      $scope.updateSelectCast = function() {
        
        console.log($scope.cast_select.name);

      }
      $scope.updateSelectGender = function() {
        console.log($scope.gender_select);
        var index, len;
        var selectedGender = 'Male';
        var arr = [];
        if($scope.gender_select == 'Bride')
        {
          console.log('inside the if');
          selectedGender = "Female";
        }

        for (index = 0, len = $scope.completeprofilelist.length; index < len; index++) {
          console.log($scope.completeprofilelist[index].gender);
          console.log(selectedGender);
          if($scope.completeprofilelist[index].gender == selectedGender && 
            ($scope.completeprofilelist[index].age>=$scope.minage && $scope.completeprofilelist[index].age < $scope.maxage ))
          {
            var obj = $scope.completeprofilelist[index];
            arr.push(obj);
          }
        }
        console.log(arr)
        $scope.profilelist = arr;
      }
      $scope.updateSelectAge = function() {
        console.log($scope.age_select)
        if($scope.age_select == '18-22')
        {
          $scope.minage = 18;
          $scope.maxage = 22;
          console.log($scope.minage);
          console.log($scope.maxage);
        }
        else if($scope.age_select == '22-25')
        {
          $scope.minage = 22;
          $scope.maxage = 25;
          console.log($scope.minage);
          console.log($scope.maxage);
        }
        else if($scope.age_select == '25-28')
        {
          $scope.minage = 25;
          $scope.maxage = 28;
          console.log($scope.minage);
          console.log($scope.maxage);
        }
        else if($scope.age_select == '28-30')
        {
          $scope.minage = 28;
          $scope.maxage = 30;
          console.log($scope.minage);
          console.log($scope.maxage);
        }
        else if($scope.age_select == '30-32')
        {
          $scope.minage = 30;
          $scope.maxage = 32;
          console.log($scope.minage);
          console.log($scope.maxage);
        }
        else if($scope.age_select == '33-35')
        {
          $scope.minage = 33;
          $scope.maxage = 35;
          console.log($scope.minage);
          console.log($scope.maxage);
        }
        else if($scope.age_select == '35 and above')
        {
          $scope.minage = 35;
          $scope.maxage = 100;
          console.log($scope.minage);
          console.log($scope.maxage);
        }
        else
        {
          $scope.minage = 18;
          $scope.maxage = 100;
          console.log($scope.minage);
          console.log($scope.maxage);
        }

      }


});

  
  app.controller("DetailsController", function ($scope,$rootScope, $http, jsonFilter)
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


      //   $scope.fatheroccupation = "farmer",
      //   $scope.motheroccupation = "farmer",
      //   $scope.mothertongue  = "kannada";
      //   $scope.income = 100000;
      //   $scope.gothra= "kannada" ;
      //   $scope.rashi= "kannada";
      //   $scope.height= "kannada";
      //   $scope.weight= "kannada";
      //   $scope.origin= "kannada";


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
       $window.alert("Image Empty");
     }
     else
     {
       var fd = new FormData();
       console.log( $scope.files[0]);
      
    // //Take the first selected file
    
       fd.append("file",  $scope.files[0]);


      var url = "/v1/vendor/update/";
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

      $scope.addDetails = function (param) {
      console.log("addDetails 1");
     if(!$scope.files)
     {
       $window.alert("Image Empty");
     }
     else
     {
       var fd = new FormData();
       console.log( $scope.files[0]);
      
    // //Take the first selected file
    
       fd.append("file",  $scope.files[0]);


      var url = "/v1/profile2/";
      url = url + param;
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
        age:calcage
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
  });


