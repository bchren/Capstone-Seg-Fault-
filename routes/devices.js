var db      = require("mysql");
var router  = require("express").Router();

var con = db.createConnection({
    host     : 'db-segfault-cap.cae0l6rwojdw.us-east-1.rds.amazonaws.com',
    port     : '3306',
    user     : 'Segfaultcapstone',
    password : 'S3gfault2019',
    database : 'db-segfault-cap'
});

//------------------------------------------------------------------------------

router.get("/devices", function(req, res){
    con.query("SELECT * FROM Devices", function (err, result, fields) {
        if (err) throw err;
        res.render("devices", {devices: result});
    });
});

//------------------------------------------------------------------------------

router.post("/devices", function(req, res){
    var sql = "INSERT INTO Devices (dev_Name, dev_SN, dev_Description, dev_Active) VALUES ?";
    var devices = [[
        req.body.dev_Name,
        req.body.dev_SN,
        req.body.dev_Description,
        'true'
    ]];
    con.query(sql, [devices], function(err, result){
        if(err) throw err;
    });
    res.redirect("devices");
});

//------------------------------------------------------------------------------

router.post("/devices_edit", function(req, res){
    if(req.body.e_dev_Active === undefined){
        req.body.e_dev_Active = '1';
    } else {
        req.body.e_dev_Active = '0';
    }
    var sql = "UPDATE Devices SET dev_Name = ?, dev_SN = ?, dev_Description = ?, dev_Active = ? WHERE dev_ID = ?";
    var devices = [
        req.body.e_dev_Name,
        req.body.e_dev_SN,
        req.body.e_dev_Description,
        req.body.e_dev_Active,
        req.body.e_dev_ID
    ];
    con.query(sql, devices, function (err, result) {
        if (err) throw err;
    });
    res.redirect("devices");
});

//------------------------------------------------------------------------------

router.post("/devices_remove", function(req, res){
    var devices = [[
        req.body.dev_ID
    ]];
    var sql = "DELETE FROM Devices WHERE dev_ID = ?";
    con.query(sql, [devices], function (err, result) {
        if (err) throw err;
    });
    res.redirect("devices");
});

//------------------------------------------------------------------------------

module.exports = router;