'use strict';
let fs=require('fs');
let formidable=require('formidable');
let uuid=require('node-uuid');

exports.upload =function( req, res ) {
    var uploadImg=function(req,folder,callback){
    if(!fs.existsSync(__dirname+"/../../public/files/"+folder)){
        fs.mkdirSync(__dirname+"/../../public/files/"+folder);
    }
    let form=new formidable.IncomingForm();
    form.uploadDir=__dirname+"/../../public/files/tmp";
    form.parse(req,function(err,fields,files){
        if(err) callback(err);
        else{
            var img=[];
            // console.log(files);
            for(var i=1;i<=6;++i){
                let file=files['file'+i];
                
                if(!file) break;
                // console.log('file'+i,i,file);
                let filename=uuid.v1()+"."+file.name.split('.').slice('-1');
                let newPath=__dirname+"/../../public/files/"+folder+"/"+filename;
                fs.renameSync(file.path,newPath);
                // img.push({filename:filename,address:"/files/"+folder+"/"+filename});
                img.push("/files/"+folder+"/"+filename);
            }
            callback(false,img);
        }
    });
}
    var now=new Date();
    var folder=now.getFullYear()+"-"+("0"+(now.getMonth()+1)).slice(-2);
    uploadImg(req,folder,function(err,img){
            if(err) res.json({code:201,msg:err});
            else res.json({code:200,img:img})
        });
};