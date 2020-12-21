const admin = require('firebase-admin');

const bucket = admin.storage().bucket();
const { STORAGE_DOWNLOAD_TOKEN } = process.env;

exports.paginator = async (page, model, options) => {
  const collections = await model.countDocuments(options);
  let pages = collections / 10;
  pages = pages % 1 === 0 ? pages : +pages + 1;
  return {
    page: page || 1,
    collections,
    pages,
    skip: page > 1 ? (page * 10) - 10 : 0,
  };
};

exports.formatDate = (date) => {
  const d = new Date(date);
  let month = `${(+d.getMonth() + 1)}`;
  let day = `${+d.getDate()}`;
  const year = `${+d.getFullYear()}`;
  if (month.length < 2) {
    month = `0${+month}`;
  }
  if (day.length < 2) {
    day = `0${+day}`;
  }
  return [year, month, day].join('-');
};

exports.bucketUpload = async (image, path) => {
  await bucket.upload(image.tempFilePath, {
    destination: path,
    metadata: {
      contentType: image.mimetype,
      metadata: {
        firebaseStorageDownloadTokens: STORAGE_DOWNLOAD_TOKEN,
      },
    },
  });
};
