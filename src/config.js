require('dotenv').config()
const dev = {
    s3: {
      REGION: process.env.REACT_APP_DEV_S3_REGION,
      BUCKET: process.env.REACT_APP_DEV_S3_BUCKET,
        },
    apiGateway: {
      REGION: process.env.REACT_APP_DEV_API_REGION,
      URL: process.env.REACT_APP_DEV_API_URL
    },
    cognito: {
      REGION: process.env.REACT_APP_DEV_COGNITO_REGION,
      USER_POOL_ID: process.env.REACT_APP_DEV_COGNITO_USER_POOL_ID,
      APP_CLIENT_ID: process.env.REACT_APP_DEV_COGNITO_APP_CLIENT_ID,
      IDENTITY_POOL_ID: process.env.REACT_APP_DEV_COGNITO_IDENTITY_POOL_ID
    }
};

const prod = {
  s3: {
    REGION: process.env.REACT_APP_PROD_S3_REGION,
    BUCKET: process.env.REACT_APP_PROD_S3_BUCKET
  },
  apiGateway: {
    REGION: process.env.REACT_APP_PROD_API_REGION,
    URL: process.env.REACT_APP_PROD_API_URL
  },
  cognito: {
    REGION: process.env.REACT_APP_PROD_COGNITO_REGION,
    USER_POOL_ID: process.env.REACT_APP_PROD_COGNITO_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_PROD_COGNITO_APP_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_PROD_COGNITO_IDENTITY_POOL_ID
  }
};
  
  const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;
  
  export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    mapbox: {
      TOKEN: process.env.REACT_APP_MAPBOX_TOKEN
    },
    ...config
  };