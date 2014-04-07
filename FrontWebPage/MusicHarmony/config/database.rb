if settings.environment == :development
  set :database, "sqlite3:///db/development.sqlite3"
else
  ActiveRecord::Base.establish_connection(
    :adapter  => "mysql2",
    :host     => "172.16.100.76",
    :port     => 3306,
    :username => "mh",
    :password => "thak2014",
    :database => "mh"
  )
end
