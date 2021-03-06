const fs = require("fs");
const debug = require('debug')('app:upload')
const path = require("path");

const {Image} = require("../../sequelize");
const { dirname } = require("path");


const uploadFiles = async (req, res) => {
  try {
    debug(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + image.name,
        image.data
      );
      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    debug(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};