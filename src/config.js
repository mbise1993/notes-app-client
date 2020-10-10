const dev = {
  s3: {
    REGION: 'us-east-2',
    BUCKET: 'dev-notes-infrastructure-s3-uploads4f6eb0fd-zrd5stvpz7n8',
  },
  apiGateway: {
    REGION: 'us-east-2',
    URL: 'https://f90jmyznfi.execute-api.us-east-2.amazonaws.com/dev',
  },
  cognito: {
    REGION: 'us-east-2',
    USER_POOL_ID: 'us-east-2_chhcBcvi6',
    APP_CLIENT_ID: '4q2jbfuakv4fho8l14r62ggsj5',
    IDENTITY_POOL_ID: 'us-east-2:cebefa63-f27c-4ad2-a968-cb864d3af85d',
  },
};

const prod = {
  s3: {
    REGION: 'us-east-2',
    BUCKET: 'prod-notes-infrastructure-s3-uploads4f6eb0fd-et3fefqwhnv8',
  },
  apiGateway: {
    REGION: 'us-east-2',
    URL: 'https://3o05gvcos1.execute-api.us-east-2.amazonaws.com/prod',
  },
  cognito: {
    REGION: 'us-east-2',
    USER_POOL_ID: 'us-east-2_UkzruFaCo',
    APP_CLIENT_ID: '3ntn65s3pdvqaef4i3hma7la8b',
    IDENTITY_POOL_ID: 'us-east-2:ef1bdecc-417a-43ef-9bd4-922fe859655a',
  },
};

const common = {
  MAX_ATTACHMENT_SIZE: 5000000,
};

const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
  ...common,
  ...config,
};
