module.exports = {
  apps: [
    {
      name: "pool-app-api",
      script: "./backend/server.js",
      autorestart: true,
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],

  deploy: {
    production: {
      user: "SSH_USERNAME",
      host: "SSH_HOSTMACHINE",
      ref: "origin/master",
      repo: "GIT_REPOSITORY",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
