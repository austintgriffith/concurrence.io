#!/bin/bash

#fire up testrpc
osascript -e 'tell application "iTerm"
activate
create window with profile "Default"
tell the current window
tell the current session
write text "testrpc"
end tell
end tell
end tell'


#start deployment
osascript -e 'tell application "iTerm"
activate
create window with profile "Default"
tell the current window
tell the current session
write text "cd /Users/austingriffith/concurrence.io;./deploy.sh"
end tell
end tell
end tell'

#start deployment
osascript -e 'tell application "iTerm"
activate
create window with profile "Default"
tell the current window
tell the current session
write text "cd /Users/austingriffith/concurrence.io;cd explorer/;npm install;npm start"
end tell
end tell
end tell'

#fire up webserver
osascript -e 'tell application "iTerm"
activate
create window with profile "Default"
tell the current window
tell the current session
write text "cd /Users/austingriffith/concurrence.io;cd Web;sudo nodemon index.js"
end tell
end tell
end tell'

atom -n .
