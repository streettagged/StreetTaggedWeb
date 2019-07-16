export default {

  const dev = {
    mapbox: {
      TOKEN: "dummy"
    },
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
    },
    social: {
      FB: "336096600619048"
    }
  };

  const prod = {
    mapbox: {
      TOKEN: "dummy"
    },
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
  
  const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;
  
  export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
  };