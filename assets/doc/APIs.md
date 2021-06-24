# tinyurl
URL shortener which converts long url into short one

GET Request to get LongURL from [shortkey] <br>
 https://99dk65tgz5.execute-api.us-east-1.amazonaws.com/api/getlongurl/{shortkey} <br>
 
POST Request to create shortURL from longURL <br>
 https://99dk65tgz5.execute-api.us-east-1.amazonaws.com/api/getshorturl <br>
 POST Request JSON format:
```
{
    "longURL":"LONGURL_INPUT"
} 
```

Note: URL validation from server side is yet to be done, i.e. any invalid longURL string can be converted into shortone as of now 
