const fs = require("fs");
const path = require("path");
const storageKey = path.join(__dirname, "../../googleStorageOptions.json");
const googleStorageKeyGenerator = () => {
  try {
    if (!fs.existsSync(storageKey)) {
      const key = {
        type: "service_account",
        project_id: process.env.STORAGE_PROJECT_ID,
        private_key_id: process.env.STORAGE_PRIVATE_KEY_ID,
        private_key: process.env.STORAGE_PRIVATE_KEY,
        client_email: process.env.STORAGE_CLIENT_EMAIL,
        client_id: process.env.STORAGE_CLIENT_ID,
        auth_uri: process.env.STORAGE_AUTH_URI,
        token_uri: process.env.STORAGE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.STORAGE_AUTH_PROVIDER,
        client_x509_cert_url: process.env.STORAGE_CERT_URL,
      };
      let data = JSON.stringify(key);
      fs.writeFileSync("googleStorageOptions.json", data);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  googleStorageKeyGenerator,
};
