const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'zifete',
  
    "scripts": {
      "cy:open": "cypress open",
      "test": "cypress run"
    },    
  },
)


