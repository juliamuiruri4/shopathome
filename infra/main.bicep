targetScope = 'subscription'

@description('Location for all resources.')
param location string = 'westeurope'

resource rg 'Microsoft.Resources/resourceGroups@2024-07-01' = {
  name: 'rg-shopathome'
  location: location
}

module swa 'br/public:avm/res/web/static-site:0.6.1' = {
  scope: rg
  name: 'client'
  params: {
    name: 'swa-shopathome-react'
    sku: 'Free'
    tags: null
    // branch: 'azd-deploy'
    // repositoryUrl: 'https://github.com/juliamuiruri4/shopathome'
    // buildProperties: {
    //   appLocation: './react-app'
    //   apiLocation: './api'
    // }
  }
}
