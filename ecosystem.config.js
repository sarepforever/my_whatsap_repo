module.exports = {
    apps : [{
      name   : "appWhatsapp",
      script : "app.js",
      watch:false,
      exec_mode:"cluster",
      instaces:1,
      cron_restart:"59 22 * * *",
      env_production: {
         NODE_ENV: "production"
      },
      env_development: {
         NODE_ENV: "development"
      }
    }]
  }