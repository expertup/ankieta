const LTT = require('list-to-tree');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const path = require('path');
const webpack = require('webpack');

var SRC = path.resolve(__dirname, 'files');

module.exports = (env, argv) => ({
	//entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../',
							hmr: argv.mode === 'development',
						},
					},
					'css-loader',
				],
			},       
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			},
			{
							test: /\.(jpe?g|png|gif|mp3)$/i,
				use: [
					{
						loader: "file-loader"
					}
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(),
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		}),
		new MiniCssExtractPlugin({
			filename: (argv.mode === 'development')?'[name].css':'[id].css',
			ignoreOrder: false,
		}),
		/*new CopyPlugin([
			{ from: './src/images', to: './images' }
		]),*/
		new CssoWebpackPlugin(),
	],
	output: {
		filename: (argv.mode === 'development')?'[name].js':'[id].js',
		path: path.resolve(__dirname, 'build'),
		publicPath: "/",
	},
	optimization: {
		minimize: argv.mode !== 'development',
		splitChunks: {
			chunks: 'all',
		},
	},
	watch: true,
	cache: false,
	devServer: {
	  publicPath: "/",
		contentBase: path.join(__dirname, "build"),
  	https: true,
	  port: 65241,
		writeToDisk: true,
	  sockPort: 443,
	  sockHost: 'ankieta.siekiera.ovh',
	  //inline: true,
		//progress: true,
	  historyApiFallback: true,
	  hot: true,
  	host: '0.0.0.0',
  	disableHostCheck: true,
  	overlay: true,
	  before(app){
////////////////////////////////////////////////////////////////////////////

const PoolManager = require('mysql-connection-pool-manager');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

var shasum = crypto.createHash('sha1');

let transport = nodemailer.createTransport({
    host: 'xxx',
    port: 465,
    auth: {
       user: 'xxx',
       pass: 'xxx'
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const connection = PoolManager({
	idleCheckInterval: 1000,
	maxConnextionTimeout: 30000,
	idlePoolTimeout: 3000,
	errorLimit: 5,
	preInitDelay: 50,
	sessionTimeout: 60000,
	mySQLSettings: {
		connectionLimit : 5,
		host: "localhost",
		user: "xxx",
		password: "xxx",
		database: "xxx",
		waitForConnections: true,
		multipleStatements: true
	}
});

const isEmpty = function(o) {
    for(var key in o) {
        if(o.hasOwnProperty(key))
            return false;
    }
    return true;
}

app.get('/c/:id', function(req, res){
	res.render('mail.ejs', { token: req.params.id, type: 'confirm' })
});
app.get('/r/:id', function(req, res){
	res.render('mail.ejs', { token: req.params.id, type: 'remove' })
});
app.post('/', function(req, res){
	if(req.body.z != undefined){
		connection.query("SELECT `id`, `value` as 'name' FROM `zawody` ORDER BY `value`", function (result, err) {
			if (!err) {
				res.send(JSON.stringify(result));
			}
			else{
				res.sendStatus(404);
			}
		});
	}
	if(req.body.m != undefined){
		var mail = req.body.m;
		if(mail.length <=1000 && /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(String(mail).toLowerCase())){
			var sql = mysql.format("INSERT INTO `emails` (`mail`, `token_confirm`, `token_remove`, `active`, `time` ) VALUES (?, SHA1(RAND()), SHA1(RAND()), '0', NOW()); SELECT `token_confirm`, `token_remove` FROM `emails` WHERE `mail` = ?", [mail, mail]);
			connection.query(sql, function (result,err) {
				if (!err) {
					var tk_con = result[1][0]['token_confirm'];
					var tk_rmv = result[1][0]['token_remove'];
					const message = {
						from: 'xxx', // Sender address
						to: mail,         // List of recipients
						subject: 'Potwierdzenie adresu e-mail', // Subject line
						html: 'Witam!<br /> \
						<br />\
						Dziękuję za udział w ankiecie oraz za wpisanie się do listy mailingowej.<br />\
						<br />\
						Aby potwierdzić swój adres mailowy <a href="https://ankieta.siekiera.ovh/c/'+tk_con+'">kliknij tu</a>.<br />\
						<br />\
						W momencie uruchomienia oprogramowania skonktaktuję się z Tobą, nawiązując do tej wiadomości mailowej oraz do udziału w ankiecie, na temat katalogowania danych.<br />\
						<br />\
						Pozdrawiam,<br />\
						Piotr Siekierzyński<br />\
						<br />\
						<br />\
						<small>Aby usunąć swój adres mailowy z listy <a href="https://ankieta.siekiera.ovh/r/'+tk_rmv+'">kliknij tu</a></small>\
						' // Plain text body
					};
					transport.sendMail(message, function(err, info) {
						if (err) {
							res.send(JSON.stringify({status: 'error'}));
						} else {
							res.send(JSON.stringify({status: 'ok'}));
						}
					});
				}
				else{
					if(err.code == 'ER_DUP_ENTRY'){
						res.send(JSON.stringify({status: 'busy'}));
					}else{
						res.send(JSON.stringify({status: 'error'}));
					}
				}
			});
		}else{
			res.send(JSON.stringify({status: 'error'}));
		}
	}
	if(req.body.a != undefined){
		var indexs = ["abonament", "allow_access", "allow_store", "calatogue_any_data", "calatogue_electronic_data", "calatogue_future_data", "calatogue_future_electronic", "count_working", "data_store", "languages", "profession", "price", "segments_use", "software_descr_changes", "software_names", "vote_creator", "vote_help", "vote_pc_use", "vote_software", "vote_tutorial", "year_work"];
		
		var check = Object.keys(req.body.a).map((i)=>{return (indexs.indexOf(i)!==-1)?true:false});

		if(isEmpty(req.body.a)){
			req.body.a = {'abonament': null}
			check = true;
		}
		if(check){
			var sql = mysql.format("INSERT INTO `answers` SET ?", [req.body.a]);
			connection.query(sql, function (result,err) {
				if (!err) {
					res.send(JSON.stringify({status: 'ok'}));
				}
				else{
					res.send(JSON.stringify({status: 'error'}));
				}
			});
		}else{
			res.send(JSON.stringify({status: 'error'}));
		}
	}
});
////////////////////////////////////////////////////////////////////////////
	  }
  	}
});