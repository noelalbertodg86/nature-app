var imaps = require("imap-simple");
const structures = require("../structures/structures");
const promotionService = require("../services/promotionService");
const logsManager = require("../logsManager/error");
var isBase64 = require("is-base64");

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
          console.log("-----> Promotion Email to process: ", messages.length);
          messages.forEach(function(message) {
            //var parts = imaps.getParts(message.attributes.struct);
            stringBody = message.parts[0].body;
            //console.log("----> All mail: ", message);
            //console.log("----> Body: ", stringBody);
            result = [];
            //REGEXP_VALID_MIME_HEADER = /^([a-zA-Z0-9!#$%&'+,\-\^_`|~]+)[ \t]*:[ \t]*(.+)$/;
            //.join("");
            bodyInLine = removeNonImportantElement(stringBody);
            imagesList = {};
            count = 0;
            bodyInLine.forEach(line => {
              if (line === "") return;

              if (line.startsWith("<") && line.endsWith(">")) {
                result.push(line);
              }

              if (line.startsWith("Content-Type:")) {
                content = parseContentTypeRow(line);
                if (content["Content-Type"].indexOf("image/png") >= 0) {
                  //
                  //console.log(getImageId(lineWithTrim));
                  imagesList[count] = getImageId(line);
                }
              }

              if (isBase64(line)) {
                imageId = imagesList[count - 1];
                searchPattern = `src=3D"cid:${imageId}"`.replace(" ", "");
                replacePatten = `src='data:image/png;base64,${line}'`;
                //console.log(imageId, searchPattern, replacePatten, result.length);
                for (var i = 0; i < result.length; i++) {
                  //console.log("--> for: ", result[i]);
                  result[i] = result[i].replace(searchPattern, replacePatten);
                }
              }
              count += 1;
            });
            //console.log("----> Body IN LINE: ", bodyInLine);
            //console.log("----> Result: ", removeIlegalXml(result.join("")));
            promotionService.saveNewPromotion({
              type: structures.messageType.PROMOTION,
              canal: structures.messageCanal.EMAIL,
              body: removeIlegalXml(result.join("")),
              status: structures.promotionStates.ACTIVE
            });
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

function removeNonImportantElement(stringBody) {
  bodyPart = stringBody.split("\r\n");
  bodyInLine = [""];
  count = 0;
  bodyPart.forEach(part => {
    if (part === "" || part.startsWith("--")) {
      count += 1;
      bodyInLine.push("");
    } else {
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
  result = xml
    .replace("<=div>", "<div>")
    .replace("=C2=A0", " ")
    .replace(/=3D/g, "=");
  return result;
}

exports.readEmail = readEmail;
