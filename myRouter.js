var url=require('url');
var fs=require('fs');

module.exports={
    index:function(req,res){
        res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
        fs.readFile('./views/index.html',function (err,data){
            if(err) throw(err);
            res.write(data);
            res.end();
        });
    },
    images:function(req,res,img) {
        res.writeHead(200, {'content-type': 'image/jpeg;'});
        fs.readFile('./images/' + img, 'binary', function (err, data) {
            if (err) throw(err);
            res.write(data, 'binary');
            res.end();
        })
    }
};