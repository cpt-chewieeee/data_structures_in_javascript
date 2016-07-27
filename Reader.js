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
Reader.prototype.createDb = function(){
	var that = this;
	this.db.serialize(function(){
		that.db.run ('CREATE TABLE user (' +	
			'id			INTEGER PRIMARY KEY,' +
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
			'id 			INTEGER PRIMARY KEY,' +
			' user_id 	INTEGER,' +
			' user_location TEXT,' +
			' geo_x		TEXT,' +
			' geo_y 		TEXT,' +
			' place_type	TEXT,' +
			' name 		TEXT,' +
			' country		TEXT,' +
			' FOREIGN KEY(user_id) REFERENCES user(id))');
		that.db.run('CREATE TABLE tweets (' +
			'id 			INTEGER PRIMARY KEY,' +
			' user_id 	INTEGER,' +
			' geo_id	INTEGER,' +
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
Reader.prototype.generateUser = function(line, callback){
	var that = this;
	var stmt = that.db.run('INSERT INTO user (screen_name, name, location, profile_url, create_date, time, friends_cnt, follow_cnt, geo_enabled, verified, protected) values (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)', {
			1: line.user.screen_name,
			2: line.user.name,
			3: line.user.location,
			4: line.user.profile_background_image_url,
			5: line.user.created_at,
			6: line.user.time_zone,
			7: line.user.friends_count,
			8: line.user.followers_count,
			9: line.user.geo_enabled,
			10: line.user.verified,
			11: line.user.protected,
		}, function(err){
			if(err) throw err;
			else callback(this.lastID);
		});
};
Reader.prototype.generateGeolocation = function(user_id, line, callback){
	var that = this;
	this.db.run('INSERT INTO geolocation (user_id, user_location, geo_x, geo_y, place_type, name, country) values (?1, ?2, ?3, ?4, ?5, ?6, ?7)', {
		1: user_id,
		2: line.user.location,
		3: line.geo.coordinates[0],
		4: line.geo.coordinates[1],
		5: line.place.place_type,
		6: line.place.name,
		7: line.place.country
	}, function(err){
		if(err) throw err;
		else callback(this.lastID);
	});
};
Reader.prototype.generateTweet = function(user_id, geo_id, line, callback){
	var that = this;
	this.db.run('INSERT INTO tweets (user_id, geo_id, tweet_id, source, text, timestamp_ms, retweeted) values (?1, ?2, ?3, ?4, ?5, ?6, ?7)', {
		1: user_id, 
		2: geo_id, 
		3: line.id,
		4: line.source,
		5: line.text,
		6: line.timestamp_ms,
		7: line.retweeted
	}, function(err){
		if (err) throw err;
		else callback(this.lastID);
	});
};
Reader.prototype.readLine = function(file){
	var that = this;
	var line = this.lineReader.createInterface({
		input: this.fs.createReadStream(file),
		output: process.stdout,
		terminal: false
	});
	line.on('line', function(line){
		// that.db.prepare('')
		var line = JSON.parse(line);
		var user_id = null;
		var geo_id = null;

		that.generateUser(line, function(id){
			user_id = id;
			that.generateGeolocation(id, line, function(id){
				geo_id = id;
				that.generateTweet(user_id, geo_id, line, function(id){
					console.log('~~success~~', id);
				});
			});
		})
	});

};
module.exports = Reader;