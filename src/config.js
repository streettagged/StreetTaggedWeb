require('dotenv').config()
const dev = {
    s3: {
      REGION: "us-east-1",
      BUCKET: "streetart-test"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://api-dev.streettagged.com"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_FJaKcw4bh",
      APP_CLIENT_ID: "khbkequqcckarsm3j0ra4tu4p",
      IDENTITY_POOL_ID: "us-east-1:d80cd3d4-0a8c-4cbf-a088-97e04bf4aef3"
    }
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "streetart-app-prod"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.streettagged.com"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_zlJ4M8wON",
    APP_CLIENT_ID: "3r5e8gj7bg6p301n64dg1skhmj",
    IDENTITY_POOL_ID: "us-east-1:6141af23-c913-4a8a-89c1-ec1ec00b20c4"
  }
};
  
  const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;
  
  export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    mapbox: {
      TOKEN: process.env.MAPBOX_TOKEN
    },
    ...config
  };