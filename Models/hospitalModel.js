const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const hospitalSchema = new mongoose.Schema({
    hospitalName:{
        type: String,
        required: true
    },
    hospitalReg:{
        type: String,
        required: true
    },
    hospitalID:{
        type: String,
        required: true
    },
    hospitalEmail:{
        type: String,
        required: true,
        unique: true      
    },
    password:{
        type: String,
        required: true
    },
    address:{
        location : String,
        city : String,
        district : String
    },
    bloodRequests:[
        {
            bloodType:{
                type : String,
            },
            quantity:{
                type : Number,
            },
            location:{
                type : String,
            }
        }
    ]
})

hospitalSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital
