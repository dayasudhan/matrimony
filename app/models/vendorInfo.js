var mongoose = require('mongoose');
//Schema
var VendorInfoSchema = new mongoose.Schema({
    id:String,
	username:String,
    email: String,
    logo:String,
    name:String,
    uniqueid:String,
    isOpen:Number,
    phone:Number,
    address:{addressLine1:String,
        addressLine2:String,
        street:String, 
        LandMark:String, 
        areaName:String,
        city:String, 
        zip:String, 
        latitude:Number,
        longitude:Number },
        profiles:[{  id:String,
                phone:Number,
                name:String,
                email: String,
                dob:Date,
                gender:String,
                community:String,
                occupation:String,
                education:String,
                logo:String,
                origin:String,
                summary:String,
                interests:String,
                father:{name:String,occupation:String,phone:String},
                mother:{name:String,occupation:String,phone:String},
                address:{label:String, 
                    addressLine1:String,
                    addressLine2:String,
                    street:String, 
                    LandMark:String, 
                    areaName:String,
                    city:String, 
                    zip:String, 
                    latitude:Number,
                    longitude:Number }
                }]
    });

//Model
var VendorInfoModel = mongoose.model( 'VendorInfoSchema', VendorInfoSchema );

module.exports = VendorInfoModel;