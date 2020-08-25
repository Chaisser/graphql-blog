import { uploadGoogleStorageFile, downloadGoogleStorageFile } from "./../../utils/googleStorageFunctions";

const photo = {
  async uploadPhoto(parent, args, { prisma }, info) {
    const photo = await args.photo;
    const uploadFile = await uploadGoogleStorageFile(photo);

    if (uploadFile.status === "success") {
      await downloadGoogleStorageFile(uploadFile.fileName);
      return {
        photo: uploadFile.fileName,
      };
    } else {
      throw new Error("Fotoğraf yüklenemedi");
    }
  },
};

export default photo;
