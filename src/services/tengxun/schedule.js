import movieTencentCrawl from '../../crawl/movie/tengxun.js'
import tvTencentCrawl from '../../crawl/tv/tengxun.js'
var schedule = require("node-schedule")
// 电影
var movieRule = new schedule.RecurrenceRule()

movieRule.dayOfWeek = [0, new schedule.Range(1, 6)];

movieRule.hour = 13;

movieRule.minute = 48;

var TvListRule = new schedule.RecurrenceRule()

TvListRule.dayOfWeek = [0, new schedule.Range(1, 6)];

TvListRule.hour = 15;

TvListRule.minute = 29;

var TvRule = new schedule.RecurrenceRule()

TvRule.dayOfWeek = [0, new schedule.Range(1, 6)];

TvRule.hour = 15;

TvRule.minute = 31;

var j = schedule.scheduleJob(movieRule, function(){
  movieTencentCrawl.getMovie()
});
var k = schedule.scheduleJob(TvListRule, function(){
  tvTencentCrawl.getTvList()
});
var l = schedule.scheduleJob(TvRule, function(){
  tvTencentCrawl.getTV()
});