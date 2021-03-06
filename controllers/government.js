var _ = require('underscore');
var Idaan = require('../lib/parsers/idaan');
var RegPub = require('../lib/parsers/regpub/regpub');
var RegPubItem = require('../lib/parsers/regpub/regpubitem');
var LoteriaModel = require('../lib/parsers/loteria/loteria');
var GovtController = function(app) {

  var responseHandler = function(req, res) {
    return {
      success: function(html, model) {
        res.jsonp(200, model);
      },
      error: function(error) {
        res.jsonp(400, { error: error });
      }
    };
  };
  // Main index page
  app.get("/gob", function(req, res) {
    res.send("Hi Panamen.io");
  });
  // Loteria Nacional
  // ?m(mes)&a(anio)
  app.get("/gob/loteria/numeros", function(req, res) {
    var loteriaModel = new LoteriaModel();
    loteriaModel.fetch(req.query, responseHandler(req, res));
  });

  app.get("/gob/registropublico/sociedades/:id", function(req, res) {
    if (!req.param('id')) {
      res.send('Missing id');
      return;
    }

    var regpubitemModel = new RegPubItem();
    regpubitemModel.fetch(req.param('id'), responseHandler(req, res));
  });

  // Registro Publico - SA Info
  app.get("/gob/registropublico/:query", function(req, res) {
   if (!req.param('query')) {
      res.send('Missing query');
      return;
   }
   var regpubModel = new RegPub();
   regpubModel.fetch(req.param('query'), responseHandler(req, res));
  });

  // Idaan - Billing Info
  app.get("/gob/idaan/:id", function(req, res) {
    if (!req.param('id')) {
      res.send('Missing id');
      return;
    }
    var idaanModel = new Idaan(req.param('id'));
    idaanModel.fetch(responseHandler(req, res));
  });
};
exports.init = function(app) {
	var govtController = new GovtController(app);
};
