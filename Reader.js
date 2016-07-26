'use strict';

/* [latitude, longitude] */
/* [geo_x, geo_y] */
var Reader = function(){
	var that = this;
	this.fs = require('fs');
	this.lineReader = require('readline');
	var sqlite3 = require('sqlite3').verbose();
	this.db = new sqlite3.Database('./data.db.lite', [sqlite3.OPEN_READWRITE], function(error){
		if(error) throw err;
	});
	return this;
};
Reader.prototype.creatDb = function(){
	var that = this;
	this.db.serialize(function(){
		that.db.run ('CREATE TABLE user (' +	
			'id			INTEGER AUTO_INCREMENT PRIMARY KEY,' +
			' screen_name	TEXT,' +
			' name 		TEXT,' +
			' location	TEXT,' +
			' profile_url TEXT,' +
			' create_date TEXT,' +
			' time		TEXT,' +
			' friends_cnt	INTEGER,' +
			' follow_cnt 	INTEGER,' +
			' geo_enabled BOOLEAN,' +
			' verified	BOOLEAN,' +
			' protected	BOOLEAN)');
		that.db.run('CREATE TABLE geolocation (' +
			'id 			INTEGER AUTO_INCREMENT PRIMARY KEY,' +
			' user_id 	INTEGER,' +
			' user_location TEXT,' +
			' geo_x		TEXT,' +
			' geo_y 		TEXT,' +
			' place_type	TEXT,' +
			' name 		TEXT,' +
			' country		TEXT,' +
			' FOREIGN KEY(user_id) REFERENCES user(id))');
		that.db.run('CREATE TABLE tweets (' +
			'id 			INTEGER AUTO_INCREMENT PRIMARY KEY,' +
			' user_id 	INTEGER,' +
			' tweet_id	INTEGER,' +
			' source		TEXT,' +
			' text 		TEXT,' +
			' timestamp_ms	TEXT,' +
			' retweeted	BOOLEAN,' +
			' FOREIGN KEY(user_id) REFERENCES user(id))');
	});
};
Reader.prototype.readFile = function(file, cb){
	this.fs.readFile(file, 'utf-8', function(err, data){
		cb(data);
	});
};
Reader.prototype.readLine = function(file){
	var line = this.lineReader.createInterface({
		input: this.fs.createReadStream(file),
		output: process.stdout,
		terminal: false
	});
	line.on('line', function(line){
		console.log(line);
	});

};
module.exports = Reader;