const router = require('express').Router();

// 引入解压好的axios; 
const axios = require("axios");

router.get("/" , ( req , res )=>{
      res.end("hello server");
});

router.get("/dt" ,async ( req , res )=>{
      let options = {
            url : "https://www.duitang.com/napi/blog/list/by_filter_id/",
            params : req.query
      }

      let response = await axios( options );

      res.json( response.data );
});


module.exports = router;