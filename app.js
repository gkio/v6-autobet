var express = require('express')
var app = require('express')()
var colors = require('colors')
var request = require('request')
var cheerio = require('cheerio')
var http = require('http').Server(app)
var notifier = require('node-notifier')
var path = require('path')

app.get('/',function(req, res){
	res.send('hello')
})
//--NOTIFICATION-------------
notifier.notify({
  'title': 'Arsenal vs Manchester [ X ] 💰',
  'message': '💶💶💶💶💶💶💶💶💶💶💶💶💶💶💶💶💶💶💶💶💶💶💶',
  icon: path.join(__dirname, 'img/beticon.png'),
  sound:'Glass'
});
//--NOTIFICATION-END------------

var getMatches = function(){
	var sait = 'https://www.betbrain.com/next-matches/football/?req=ajax&_=1457886992843'
	request({
  url: sait,
  jar:  true
}, function(error, response, html){
	if(!error){
    var $ = cheerio.load(html)
    var count =  ($('.TheMatch').length)
    for(var i = 2; i< count + 2 ; i++){
    	var live = ($('.TheMatch:nth-child('+i+') .LiveStatus').text())
    	var nameMatch = ($('.TheMatch:nth-child('+i+') .MDxEventName').text())
    	var time = ($('.TheMatch:nth-child('+i+') .DateTime').text().substring(8))
    	var websiteCount = ($('.TheMatch:nth-child('+i+') .TotalBookies').text())
    	if((websiteCount >= 28) && (live.length === 0) ){
    		console.log('match ' + nameMatch)
    		console.log('count Websites ' + websiteCount)
    	}
    }
  }
})
}
getMatches()
http.listen(3000,function(){
	console.log('listening on 3000')
})
