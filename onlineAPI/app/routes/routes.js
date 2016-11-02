var Index = require( '../controllers/index' ),
    Category = require( '../controllers/category' ),
    List = require( '../controllers/list' ),
    Api = require( '../controllers/api' );
	Upload = require( '../controllers/upload' );

module.exports = function( app ) {

    //首页
    app.get( '/', Index.index );

    //列表页
    app.get( '/list/:id', List.list );

    //新增页
    app.get( '/api/add', Api.add );

    //编辑页
    app.get( '/api/update/:id', Api.update );

    //同步接口
    app.post( '/api/save', Api.save );

    //异步接口
    app.post( '/category/add', Category.add );
    app.get( '/api/delete/:id', Api.delete );

    app.get( '/category/delete/:id', Category.delete );
    app.post( '/category/update/:id', Category.update );
	
	app.post( '/utils/upload/img', Upload.upload );

    app.get( '/call/:id', Api.call );
};