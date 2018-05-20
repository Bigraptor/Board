const express = require("express");
const router = express.Router();
const Board = require("../../db/board/board.js");

router.post("/write", (req, res) => {
    const board = new Board({
        title : req.body.title,
        article : req.body.article,
        writer : req.session.loginInfo.nickname
    });

    board.save( (err) => {
        
        if(err) throw err;
        
        return res.json({
            success : true
        });
    } );

});

router.get("/load", ( req, res ) => {
    Board.find( (err, load) => {
        if(err) throw err;

        res.json(load);
    } ).sort( { "no" : -1 } )
})

router.post("/getwrite", ( req, res ) => {
    Board.findOne( {no : req.body.no}, ( err, exists ) => {
        if(err) throw err;

        res.json({
            success : true,
            data : exists
        });

    } );

});

router.put("/modify/:no", (req, res) => {
    Board.findOne({no : req.params.no}, (err, board) => {
        if(err) throw err;
       
        board.title = req.body.title;
        board.article = req.body.article;

        board.save( ( err, board ) => {
            if(err) throw err;

            res.json({
                success : true
            })
        })
    })
})

router.delete("/delete/:no", ( req, res ) => {
    Board.remove( { no : req.params.no }, ( err ) => {
        if(err) throw err;

        res.json({
            success: true
        });
    } );
})

////////////// 코멘트 //////////////

router.post("/comment/:no", ( req, res ) => {
    Board.findOne( { no : req.params.no }, ( err, board ) => {
        let session = req.session;

        board.comment.push({
            writer : session.loginInfo.nickname, 
            contents : req.body.contents
        });

        board.save( ( err ) => {
            if(err) throw err;

            res.json({
                success : true,
                board
            })
        })
    } )
});

router.post("/getcomments/:no", ( req, res ) => {
    Board.findOne( { no : req.params.no }, ( err, board ) => {
        const boardcontents = board.comment;
        
        res.json({
            boardcontents
        });
    });
});

module.exports = router;