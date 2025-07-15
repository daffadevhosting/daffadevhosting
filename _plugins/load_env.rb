require 'dotenv'
Dotenv.load

Jekyll::Hooks.register :site, :after_init do |site|
  site.config['FIREBASE_API_KEY'] = ENV['FIREBASE_API_KEY']
  site.config['FIREBASE_AUTH_DOMAIN'] = ENV['FIREBASE_AUTH_DOMAIN']
  site.config['FIREBASE_PROJECT_ID'] = ENV['FIREBASE_PROJECT_ID']
  site.config['FIREBASE_APP_ID'] = ENV['FIREBASE_APP_ID']
  site.config['MIDTRANS_URL'] = ENV['MIDTRANS_URL']
end