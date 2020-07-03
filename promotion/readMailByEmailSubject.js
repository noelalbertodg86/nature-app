var imaps = require("imap-simple");
const structures = require("../structures/structures");
const promotionService = require("../services/promotionService");
const logsManager = require("../logsManager/error");
var isBase64 = require("is-base64");
const Administrator = require("../models").Administrator;
const email = require("../messageManager/mail");

var config = {
  imap: {
    user: "promociones@nature.com.ec",
    password: "Nature2020",
    host: "mail.nature.com.ec", //this may differ if you are using some other mail services like yahoo
    port: 993,
    tls: true,
    authTimeout: 3000,
    tlsOptions: { rejectUnauthorized: false }
  }
};

async function readEmail() {
  try {
    imaps.connect(config).then(function(connection) {
      connection
        .openBox("INBOX")
        .then(function() {
          // Fetch emails from the last 24h
          var searchCriteria = ["UNSEEN", ["SUBJECT", "EMAIL"]];
          var fetchOptions = {
            bodies: ["TEXT"],
            struct: true,
            markSeen: true
          };

          // retrieve only the headers of the messages
          return connection.search(searchCriteria, fetchOptions);
        })
        .then(function(messages) {
          var attachments = [];
          console.log("-----> Promotion Email to read: ", messages.length);
          messages.forEach(function(message) {
            var finalMailBody = [];
            var bodyInLine = removeNonImportantElement(message.parts[0].body);
            var imagesList = {};
            count = 0;
            bodyInLine.forEach(line => {
              if (line === "") return;

              if (line.startsWith("<") && line.endsWith(">")) {
                finalMailBody.push(line);
              }

              if (line.startsWith("Content-Type:")) {
                content = parseContentTypeRow(line);
                if (content["Content-Type"].indexOf("image/") >= 0) {
                  //
                  //console.log(getImageId(lineWithTrim));
                  imagesList[count] = getImageId(line);
                }
              }

              if (isBase64(line)) {
                imageId = imagesList[count - 1];
                searchPattern = `src=3D"cid:${imageId}"`.replace(" ", "");
                replacePatten = `src='data:image/jpeg;base64,${line}'`;
                //console.log(imageId, searchPattern, replacePatten, mailBody.length);
                for (var i = 0; i < finalMailBody.length; i++) {
                  //console.log("--> for: ", mailBody[i]);
                  finalMailBody[i] = finalMailBody[i].replace(
                    searchPattern,
                    replacePatten
                  );
                }
              }
              count += 1;
            });
            var stringBody = removeIlegalXml(finalMailBody.join(""));
            promotionService.saveNewPromotion({
              type: structures.messageType.PROMOTION,
              canal: structures.messageCanal.EMAIL,
              body: stringBody,
              status: structures.promotionStates.ACTIVE
            });
            adviceAdministrators(stringBody);
            //console.log("----> Parts: ", parts);
          });
        })
        .catch(function(err) {
          console.log("!!! Error: ", err);
          logsManager.sendErrorToMail(err);
        });
    });
  } catch (err) {
    console.log("!!! Error: ", err);
    logsManager.sendErrorToMail(err);
  }
}

function removeNonImportantElement(stringBody1) {
  bodyPart = stringBody1.split("\r\n");
  bodyInLine = [""];
  count = 0;
  bodyPart.forEach(part => {
    if (part === "" || part.startsWith("--")) {
      count += 1;
      bodyInLine.push("");
    } else {
      if ((part.includes("<") || part.includes(">")) && part.endsWith("=")) {
        part = part.slice(0, -1);
      }
      bodyInLine[count] += part;
    }
  });

  return bodyInLine;
}

function parseContentTypeRow(row) {
  contentType = {};
  //row = row.replace(" ", "");
  row.split(";").forEach(e => {
    contentType[e.split(":")[0]] = e.split(":")[1];
  });
  return contentType;
}

function getImageId(line) {
  return line
    .replace(" ", "")
    .split("Content-ID:")[1]
    .split(">")[0]
    .replace("<", "");
}

function removeIlegalXml(xml) {
  var mailBody2 = xml
    .replace(/<=div>/g, "<div>")
    .replace(/=C2=A0/g, " ")
    .replace(/=3D/g, "=")
    .replace(/=C3=A1/g, "&aacute;")
    .replace(/=C3=A0/g, "&aacute;")
    .replace(/=C3=A8/g, "&eacute;")
    .replace(/=C3=A9/g, "&eacute;")
    .replace(/=C3=AD/g, "&iacute;")
    .replace(/=C3=AC/g, "&iacute;")
    .replace(/=C3=B2/g, "&oacute;")
    .replace(/=C3=B3/g, "&oacute;")
    .replace(/=C3=B9/g, "&uacute;")
    .replace(/=C3=BA/g, "&uacute;")
    .replace(/=C3=B1/g, "&ntilde;");
  return mailBody2;
}

async function adviceAdministrators(cleanBody) {
  var admins = await Administrator.findAll();
  var warningEmail =
    "<h1>Usted recibe este correo como administrador del sistema para que revise previamente la promocion que recibiran sus clientes</h1>" +
    "<br><br>" +
    "<h2>Si usted detecta algun error en el mensaje tiene 30 minutos para ingresar al correo promociones@nature.com.ec y eliminar el correo en cuestion</h2>" +
    "<h2>Si todo esta correcto no haga nada.</h2>" +
    "<p>-----------------------------------------------------------------------</p>" +
    "<br><br>" +
    cleanBody;

  admins.forEach(admin => {
    email.send(
      admin.email,
      "!!!! Notificacion de nueva promocion !!!!",
      warningEmail
    );
  });
}

exports.readEmail = readEmail;
