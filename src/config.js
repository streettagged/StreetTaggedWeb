export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    DUMMY_DATA : [],
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
      USER_POOL_ID: "us-east-1_OvHRINlq8",
      APP_CLIENT_ID: "7poun2fmqke6jtsq6er8eo4ab7",
      IDENTITY_POOL_ID: "us-east-1:d80cd3d4-0a8c-4cbf-a088-97e04bf4aef3"
    },
    social: {
      FB: "336096600619048"
    },
    s3public: {
        bucketName: 'streetart-test',
        dirName: 'photos',
        region: 'us-east-1',
        accessKeyId: 'AKIA5QKAX6BGIVXHRBPL',
        secretAccessKey: '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',
    }
  };
