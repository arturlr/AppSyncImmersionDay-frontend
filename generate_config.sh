#!/bin/bash

API_ID=$(aws appsync list-graphql-apis --output text --query 'graphqlApis[?name == `BooksAPI`].apiId | []')
API_URL=$(aws appsync list-graphql-apis --output text --query 'graphqlApis[?name == `BooksAPI`].uris.GRAPHQL | []')

if [ -z "$API_ID" ]; then
    echo "Something went wrong while trying to generate the config."
    echo "Double check your GraphQL is named: BooksAPI"
    exit
fi

API_KEY=$(aws appsync list-api-keys --api-id $API_ID --output text --query 'apiKeys[].id | []')
USER_POOL_ID=$(aws cognito-idp list-user-pools --output text --max-results 5 --query 'UserPools[?Name == `WorkshopUserPool`].Id | []')

if [ -z "$USER_POOL_ID" ]; then
    echo "Something went wrong while trying to generate the config."
    echo "Double check your User Pool is named: WorkshopUserPool"
    exit
fi

USER_POOL_CLIENT=$(aws cognito-idp list-user-pool-clients --user-pool-id $USER_POOL_ID --output text --query 'UserPoolClients[?ClientName == `WorkshopAppClient`].ClientId | []')

if [ -z "$API_ID" ] || [ -z "$API_URL" ] || [ -z "$API_KEY" ] || [ -z "$USER_POOL_ID" ] || [ -z "$USER_POOL_CLIENT" ]; then
    echo "Something went wrong while trying to generate the config."
    echo "Double check your GraphQL is named: BooksAPI"
    echo "Double check your User Pool is named: WorkshopUserPool"
    echo "Double check your User Pool App Client is named: WorkshopAppClient"
else
    cd ~/environment/AnyCompanyReads-frontend
    cat << EOF > src/aws-exports.js
const awsmobile = {
  aws_appsync_graphqlEndpoint: '$API_URL',
  aws_appsync_apiKey: '$API_KEY',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_region: '$AWS_REGION',
  aws_cognito_region: '$AWS_REGION',
  aws_user_pools_id: '$USER_POOL_ID',
  aws_user_pools_web_client_id: '$USER_POOL_CLIENT',
}

export default awsmobile
EOF
fi