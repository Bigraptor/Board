const express = require("express");
const router = express.Router();
const Account = require("../../db/account/account.js");

router.post("/join", (req, res) => {
    
    let idRegex = /^[a-zA-Z0-9]+$/;

    if(!idRegex.test(req.body.id)){
        return res.status(400).json({
            error : "ID is shit",
            code : 1
        })
    }

    Account.findOne( { id : req.body.id }, (err, exists) => {
        if(err) throw err;
        if(exists){
            return res.status(401).json({
                error : "ID have",
                code : 2
            })
        }
        else{
            Account.findOne( { nickname : req.body.nickname }, (err, exists) => {
                if(err) throw err;
                if(exists){
                    return res.status(401).json({
                        error : "nickname have",
                        code : 3
                    })
                }
                else{
                    let account = new Account({
                        id : req.body.id,
                        pw : req.body.pw,
                        nickname : req.body.nickname
                    });

                    account.save( ( err ) => {
                        if(err) throw err;
                        return res.json({success : true})
                    } );
                }
            } )
        }
    } );
    
});

router.post("/login", (req, res) => {
    Account.findOne( { id : req.body.id}, (err, exists) => {
        if(err) throw err;
        if(exists){
            if(exists.pw !== req.body.pw){
                return res.status(401).json({
                    error : "PASSWORD is Wrong.",
                    code :2
                })
            }
            else {
                let session = req.session;
                session.loginInfo = {
                    nickname : exists.nickname
                };

                return res.json({
                    success : true,
                    nickname : exists.nickname
                });
            };
        }
        else {
            return res.status(401).json({
                error : "ID is not exist",
                code : 1
            })
        };
    } );
});

router.get("/getinfo", ( req, res ) => {
    if(typeof req.session.loginInfo === "undefined"){
        return res.status(401).json({
            code: 1
        })
    }else{
        res.json({
            nickname : req.session.loginInfo
        })
    }
});

router.post("/logout", (req, res) => {
    let session = req.session;

    session.destroy( ( error ) => {
        if(error) throw error;
    });

    res.json({
        success : true
    });

});

module.exports = router;