"use strict";

const bodyParser = require("body-parser"),
  config = require("config"),
  crypto = require("crypto"),
  express = require("express"),
  https = require("https"),
  request = require("request"),
  cheerio = require("cheerio"),
  fs = require("fs"),
  idRegex = new RegExp("\\?id=(\\d)+"),
  eventbrite = require("search-eventbrite");

var app = express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());

app.post("/", function(req, res) {
  var action = req.body.result.action;
  var params = req.body.result.parameters;

  if (
    action === "moreinfo" ||
    action === "search_kb" ||
    action == "callScraper"
  ) {
    getKB(res, params.category);
  } else if (action === "eventbrite") {
    getEB(res, params.address);
  } else {
    send(res, "No actions were found.");
  }
});

app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
});

function send(res, msg) {
  res.setHeader("Content-Type", "application/json");
  return res.send(
    '{ "speech": "", "messages": [ {"type": 0, "platform":"facebook", "speech": "We did a quick search and were able to find this for you:"}, { "type": 4, "platform": "facebook", "payload": { "facebook": { "attachment": { "type": "template", "payload": { "template_type": "generic", "elements": [ { "title": "' +
      msg.title +
      '", "buttons": [ { "type": "web_url", "url": "' +
      msg.link +
      '", "title": "View ' +
      (msg.link.includes("file") ? "PDF" : "Website") +
      '" } ] } ] } } } } }, { "type": 0, "speech": "" } ] }'
  );
}

function getEB(res, address) {
  eventbrite.getAll(
    {
      q: '"autism ontario"',
      "location.address": address,
      sort_by: "distance"
    },
    function(err, res2, events) {
      var eventStr = "";
      res.setHeader("Content-Type", "application/json");

      if (events.length > 0) {
        events.slice(0, 3).forEach(function(event) {
          eventStr = eventStr.concat(
            '{ "type": 4, "platform": "facebook", "payload": { "facebook": { "attachment": { "type": "template", "payload": { "template_type": "generic", "elements": [ { "title": "' +
              event.name +
              '", "image_url": "' +
              event.thumbnail +
              '", "buttons": [ { "type": "web_url", "url": "' +
              event.url +
              '", "title": "View Event" } ] } ] } } } } },'
          );
        });

        eventStr =
          '{"type": 0, "platform":"facebook", "speech": "We did a quick search for events and were able to find this for you:"},' +
          eventStr.substring(0, eventStr.length - 1);
      } else {
        eventStr =
          '{"type": 0, "platform":"facebook", "speech": "Sorry, we couldn\'t find any events in your area :("}';
      }

      return res.send('{ "speech": "", "messages": [ ' + eventStr + " ] }");
    }
  );
}

function getKB(res, query) {
  var searchTerms = encodeURI(query);
  var baseUrl = "http://autismontario.novosolutions.net/";
  var result = [];
  var results = [];
  var content;

  request(
    `http://autismontario.novosolutions.net/dosearch.asp?Lang=1&SID=&words=${searchTerms}`,
    function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var a = $("#search_result tbody tr td")
          .slice(1)
          .each(function(index, element) {
            return $(element).hasClass("listText");
          })
          .find("a")
          .each(function(i, elem) {
            if (elem.attribs.href && i === 0) {
              request(baseUrl + elem.attribs.href, function(
                error,
                response,
                html
              ) {
                if (!error && response.statusCode == 200) {
                  var $$ = cheerio.load(html);
                  var title = $$(".shortTitle").text();
                  if (!title) {
                    title = $$(".longTitle").text();
                  }
                  var link =
                    baseUrl +
                    "default.asp" +
                    idRegex.exec(elem.attribs.href)[0];

                  send(res, { title: title.trim(), link: link });
                }
              });
            }
          });
      } else {
        console.log(error);
      }
    }
  );
}

module.exports = app;
