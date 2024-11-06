targetScope = 'subscription'

@description('Location for all resources.')
param location string

param environmentName string
param resourceGroupName string = ''

resource rg 'Microsoft.Resources/resourceGroups@2024-07-01' = {
  name: !empty(resourceGroupName) ? resourceGroupName : 'rg-${environmentName}'
  location: location
}

module swa 'br/public:avm/res/web/static-site:0.6.1' = {
  scope: rg
  name: 'client'
  params: {
    name: 'swa-shopathome-angular'
    sku: 'Free'
    tags: {
      'azd-service-name': 'webapp'
    }
    branch: 'azd-deploy'
    repositoryUrl: 'https://github.com/juliamuiruri4/shopathome'
    buildProperties: {
      apiLocation: './api'
      appLocation: './angular-app'
    }
  }
}
