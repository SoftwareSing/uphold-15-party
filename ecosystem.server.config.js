module.exports = {
  apps: [{
    name: 'server-15-party',
    script: 'src/server/main.js',
    instances: 'max',
    autorestart: true,
    watch: false,
    kill_timeout: 20000,
    max_memory_restart: '384M',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3015
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3015
    }
  }]
}
