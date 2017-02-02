var http=require('http');
var url=require('url');
var router=require('./myRouter');
var fs=require('fs');

http.createServer(function(req,res){
    if(req.url!=='/favicon.ico'){
        var pathname=url.parse(req.url).pathname;
        pathname=pathname.replace(/\//,'');
        try{
            if(pathname==''){
                router['index'](req,res);
            }else{
                console.log('讀取到:'+pathname);
                var img=/images/;
                var css=/.*\.css/;
                var js=/.*\.js/;
                if(pathname.match(img)){
                    var img=pathname.slice(7);
                    router['images'](req,res,img);
                }else if(pathname.match((css))){
                    fs.readFile('./'+pathname,function(err,buffer){
                        if(err) throw(err);
                        res.writeHead(200,{'content-type':'text/css;charset=utf-8'});
                        res.write(buffer.toString());
                        res.end();
                    })
                }else if(pathname.match(js)){
                    fs.readFile('./'+pathname,function(err,buffer){
                        if(err) throw(err);
                        res.writeHead(200,{'content-type':'application/x-javascript'});
                        res.write(buffer.toString());
                        res.end();
                    })
                }
            }
        }catch(err){
            console.log('錯誤產生:'+err);
            res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
            res.write(err.toString());
            res.end();
        }
    }
}).listen(80);
console.log('Server running...');