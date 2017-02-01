app = angular.module("vendorModule", []);

  app.controller("mainController", function ($scope, $http, jsonFilter)
  {
  		 $scope.total2 = 123;
$scope.main_url = 
  	  $scope.getProfile = function (param) {
      console.log("getprofile");
      var url = "/v1/profile/info/";
      url = url + param;
      $http.get(url)
        .success(function (data, status, headers, config)
        {
          $scope.profilelist = data;
          console.log($scope.profilelist);
          $scope.position = 0;
          $scope.profile = $scope.profilelist[0];
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
      console.log(param);
      $scope.position = param;
      console.log($scope.position);
      $scope.profile = $scope.profilelist[$scope.position];
      var url = "http://localhost:3000/p/vendor_order";
      window.open(url, "_self");
  };




   
  });

  
  app.controller("DetailsController", function ($scope, $http, jsonFilter)
  {

      $scope.name ="";
      $scope.phone = 9797998789;
      $scope.email = "dd@d.com";
      $scope.gender= "Male";
      $scope.occupation="Software Engineer";
      $scope.education="Engineering";
      $scope.cast="Brahmin";
      $scope.summary="I am software engineer";
      $scope.fathername="Rajesh";
      $scope.mothername="Kalpana";
      $scope.hotelAddress1 = "addres1",
      $scope.hotelLandmark = "landmark", 
      $scope.hotelAreaname= "vvpura", 
      $scope.hotelzip = 577230,
      $scope.latitude = 12.89, 
      $scope.longitude = 77.89

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
    //   $http.post(url4, fd, {
    //     withCredentials: true,
    //     headers: {'Content-Type': undefined , 'enctype': 'multipart/form-data' },
    //     transformRequest: angular.identity
    // }).success(function (data, status, headers, config)
    //     {
    //         console.log("addLogo success");
    //     })
    //     .error(function (data, status, headers, config)
    //     {
    //       console.log("addLogo error");
    //     });
         
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

      var postData={name:$scope.name, 
        Address1:$scope.hotelAddress1,
        Address2:"", street :"",Landmark:$scope.hotelLandmark, 
        Areaname:$scope.hotelAreaname, 
        zip:$scope.hotelzip,
        latitude:$scope.latitude, 
        longitude:$scope.longitude, 
        logo:"",
        gender:$scope.gender, 
        phone:$scope.phone,
        email:$scope.email,
        occupation:$scope.occupation,
        education:$scope.eduction,
        summary:$scope.summary,
        gender:$scope.gender,
        cast:$scope.cast,
        fathername:$scope.fathername,
        mothername:$scope.mothername
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

      $scope.getDetails = function (param) {
      console.log("getDetails");
      console.log(param);
      $scope.getCityCoverage();
      var url = "/v1/vendor/info/";

      url = url + param;
      // var postData={Name:$scope.hotelName, username: param, Address1:$scope.hotelAddress1, phone:$scope.hotelphone,
      //   Address2:"", street :"",Landmark:$scope.hotelLandmark, Areaname:$scope.hotelAreaname, 
      //   City:$scope.hotelcity, zip:$scope.hotelzip,latitude:$scope.latitude, longitude:$scope.longitude, logo:"",
      //    vegornonveg:$scope.vegornonveg, speciality: $scope.speciality , deliverrange:$scope.deliverrange,deliverareas:$scope.deliverareas};
      $http.get(url)
        .success(function (data, status, headers, config)
        {
            console.log("getDetails success");
            console.log(data[0]);
             $scope.hotelName = data[0].hotel.name;
             $scope.hotelId = data[0].hotel.id;
             $scope.hotelAddress1 =data[0].address.addressLine1;
             $scope.hotelphone =data[0].phone;
            $scope.hotelLandmark =data[0].address.LandMark;
            $scope.hotelAreaname =data[0].address.areaName;
            $scope.hotelcity =data[0].address.city;
            $scope.hotelzip =data[0].address.zip;
            $scope.latitude =data[0].address.latitude;
            $scope.longitude =data[0].address.longitude;
          //  $scope.vegornonveg =data[0].
            $scope.speciality =data[0].speciality;
            $scope.deliverRange =data[0].deliverRange;
            $scope.deliverareas =data[0].deliverAreas;
            $scope.minimumOrder =data[0].minimumOrder;
            $scope.deliverCharge = data[0].deliverCharge;
            $scope.deliveryTime = data[0].deliveryTime;

            $scope.isBulkVendor = data[0].isBulkVendor;
            $scope.bulkdeliverCharge = data[0].bulkdeliverCharge;
            $scope.bulkdeliverRange = data[0].bulkdeliverRange;
            $scope.bulkminimumOrder = data[0].bulkminimumOrder;
            $scope.bulkdeliveryTime

        })
        .error(function (data, status, headers, config)
        {
          console.log("getDetails error");
        });

    };


  });


