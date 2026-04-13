module.exports = {
  apps: [{
    name: 'yourin-nuxt',
    script: './.output/server/index.mjs',
    cwd: '/var/www/web-portfolio',
    
    // Production environment
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOST: '0.0.0.0'
    },
    
    // Cluster mode - use all CPU cores
    instances: 'max',  // atau '4' untuk 4 core
    exec_mode: 'cluster',
    
    // Auto-restart settings
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    
    // Memory management
    max_memory_restart: '512M',  // Restart kalau memori > 512MB
    
    // Logging
    log_file: '/var/log/pm2/yourin-nuxt.log',
    out_file: '/var/log/pm2/yourin-nuxt-out.log',
    error_file: '/var/log/pm2/yourin-nuxt-error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    combine_logs: true,
    
    // Health monitoring
    kill_timeout: 5000,
    listen_timeout: 8000,
    
    // Graceful shutdown
    shutdown_with_message: true,
    
    // Restart strategy
    restart_delay: 4000,
    
    // Merge logs
    merge_logs: true
  }]
};
