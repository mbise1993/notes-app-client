export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: 'us-east-2',
    BUCKET: 'notes-uploads-mbise1993',
  },
  apiGateway: {
    REGION: 'us-east-2',
    URL: 'https://3o05gvcos1.execute-api.us-east-2.amazonaws.com/prod',
  },
  cognito: {
    REGION: 'us-east-2',
    USER_POOL_ID: 'us-east-2_1FGv64lr6',
    APP_CLIENT_ID: '33ich3aq49q22ra0j4jhegseuv',
    IDENTITY_POOL_ID: 'us-east-2:5860317b-5815-4214-b53b-8a13712eac5b',
  },
};
