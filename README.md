I fixed my mongoDb situation; as visable in the app Pwudget; however this one I probably should have just started from scratch instead of refactoring as at this point I have made it to this error :
"
TypeError: Cannot read properties of null (reading '1')
    at firstchar (C:\Users\nicho\OneDrive\Desktop\projectsVBC\weekly-challenges\nosqlweek\node_modules\body-parser\lib\types\json.js:176:37)
    at parse (C:\Users\nicho\OneDrive\Desktop\projectsVBC\weekly-challenges\nosqlweek\node_modules\body-parser\lib\types\json.js:79:19)
    at C:\Users\nicho\OneDrive\Desktop\projectsVBC\weekly-challenges\nosqlweek\node_modules\body-parser\lib\read.js:121:18
    at invokeCallback (C:\Users\nicho\OneDrive\Desktop\projectsVBC\weekly-challenges\nosqlweek\node_modules\raw-body\index.js:224:16)
    at done (C:\Users\nicho\OneDrive\Desktop\projectsVBC\weekly-challenges\nosqlweek\node_modules\raw-body\index.js:213:7)
    at IncomingMessage.onEnd (C:\Users\nicho\OneDrive\Desktop\projectsVBC\weekly-challenges\nosqlweek\node_modules\raw-body\index.js:273:7)
    at IncomingMessage.emit (node:events:402:35)
    at endReadableNT (node:internal/streams/readable:1343:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)
"
and continue to get repeated " Process exited with status 143" in my Heroku logs.
Which is more than I could say when I started ...:

https://think-social.herokuapp.com/

