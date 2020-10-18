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
    {
      name: "pool-app-frontend",
      script: "serve",
      env: {
        NODE_ENV: "production",
        PM2_SERVE_PATH: "./frontend/build",
        PM2_SERVE_PORT: 3000,
        PM2_SERVE_SPA: "true",
        PM2_SERVE_HOMEPAGE: "/index.html",
      },
    },
    {
      name: "pool-app-admin",
      script: "serve",
      env: {
        NODE_ENV: "production",
        PM2_SERVE_PATH: "./admin/build",
        PM2_SERVE_PORT: 3002,
        PM2_SERVE_SPA: "true",
        PM2_SERVE_HOMEPAGE: "/index.html",
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
