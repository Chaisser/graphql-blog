const path = require("path");
const fs = require("fs");
const stream = require("stream");
const { Storage } = require("@google-cloud/storage");
const getSlug = require("speakingurl");
const projectId = process.env.STORAGE_PROJECT_ID;
const googleStorageOptions = path.join(__dirname, "../..");
const fileLocalPath = path.join(__dirname, "../../public/img/");
const bucketName = `${projectId}.appspot.com`;
const storage = new Storage({
  keyFilename: `${googleStorageOptions}/googleStorageOptions.json`,
  projectId,
});

const makePublicFiles = async (fileName) => {
  const changeFilePermission = await storage.bucket(bucketName).file(fileName).makePublic();
  if (changeFilePermission[0].entity === "allUsers") {
    return true;
  }
  return false;
};

const listGoogleStorageFiles = async () => {
  const items = [];

  try {
    const [files] = await storage.bucket(bucketName).getFiles();

    files.forEach((file) => {
      items.push({
        name: file.name,
        size: file.metadata.size,
        contentType: file.metadata.contentType,
      });
    });

    return {
      status: "success",
      totalFiles: items.length,
      items,
    };
  } catch (err) {
    return {
      status: "error",
      message: err,
    };
  }
};

const downloadGoogleStorageFile = async (remoteFileName) => {
  const options = {
    destination: `${fileLocalPath}${remoteFileName}`,
    validation: false,
  };

  try {
    await storage.bucket(bucketName).file(remoteFileName).download(options);
    return {
      status: "success",
      fileName: remoteFileName,
    };
  } catch (err) {
    throw new Error(err);
  }
};

const uploadGoogleStorageFile = async (file) => {
  const fileType = file.mimetype;
  const bucket = storage.bucket(bucketName);
  const fileName = `${new Date().getTime()}-${getSlug(file.filename)}`;
  const blob = bucket.file(fileName);
  const dataStream = new stream.PassThrough();

  const upload = await new Promise((resolve, reject) => {
    dataStream;
    file
      .createReadStream()
      .pipe(
        blob.createWriteStream({
          resumable: false,
          validation: false,
          contentType: fileType,
          metadata: { "Cache-Control": "public, max-age=31536000" },
        })
      )
      .on("error", (error) => {
        console.log(error, "Yükleme yapılırken bir hata oluştu");
        reject({
          status: "error",
          message: error,
        });
      })
      .on("finish", () => {
        resolve({
          status: "success",
          fileName,
          fileType,
          fileSize: file.size,
          order: 99,
        });
      });
  });

  return upload;
};

module.exports = {
  listGoogleStorageFiles,
  downloadGoogleStorageFile,
  uploadGoogleStorageFile,
  makePublicFiles,
};
