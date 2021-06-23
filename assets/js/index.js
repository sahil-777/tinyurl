async function initiate() {
    //let shortKey=location.href.split('/').pop().split('?').pop()
    let shortKey = location.href.split('?')[1]
    if (shortKey) {
        let longURL = await getLongURL(location.href)
        window.location = longURL
    }
}

async function getShortUrl() {
    let longUrl = document.getElementById('input-output').value

    if (isURLValid(longUrl)) { //check if url is valid or not
        let response;
        try {
            response = await axios({
                method: 'post',
                url: 'https://99dk65tgz5.execute-api.us-east-1.amazonaws.com/api/getshorturl',
                data: {
                    longURL: longUrl
                }
            });
        } catch (error) {
            document.getElementById('error-msg').innerText = errorThrown + '. Please, try again later'
            setTimeout(() => {
                document.getElementById('error-msg').innerText = '';
            }, 2500)
            return
        }
        response = response.data
        if (response.statusCode == 201) {
            let shortKey = response.shortKey;
            let shortURL = "https://sahil-777.github.io/tinyurl/" + '?' + shortKey // Add '/', if u r running locally
            //window.location.href can produce bug

            document.getElementById('input-output').value = shortURL
            document.getElementById('input-output').readOnly = true
            document.getElementById('shorten-it__btn').style.display = 'none'
            document.getElementById('copy-btn').style.display = 'flex'
            document.getElementById('shorten-another-btn').style.display = 'flex'
            document.getElementById('check-btn').style.display = 'flex'
        } else {
            let errorMsg = response.msg
            document.getElementById('error-msg').innerText = errorMsg + '. Please, try again later'
            setTimeout(() => {
                document.getElementById('error-msg').innerText = '';
            }, 2500)
        }
    } else {
        document.getElementById('error-msg').innerText = 'Please,enter valid url'
        setTimeout(() => {
            document.getElementById('error-msg').innerText = '';
        }, 2500)
    }
}

async function getLongURL(shortURL) {
    //let url = document.getElementById('input-output').value;
    //window.open(longURL) //will be opened in new tab
    let mainAddress = 'https://sahil-777.github.io/tinyurl/' //Bug => shortURL.split('?')[0]
    let shortKey = shortURL.split('?')[1]
    //console.log(shortKey)
    let longURL = ''
    try {
        let response = await axios.get('https://99dk65tgz5.execute-api.us-east-1.amazonaws.com/api/getlongurl/' + shortKey)
        if (response.data.statusCode == 200)
            longURL = response.data.longUrl;
        else {
            longURL = mainAddress + 'error-page.html'
        }
    } catch (error) {
        longURL = mainAddress + 'error-page.html'
    }
    return longURL;
}

async function goToUrl(shortURL) {
    let longURL = await getLongURL(shortURL)
    //window.location = longURL //window.open can redirect to about:blank
    window.open(longURL)
}

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).val()).select();
    document.execCommand("copy");
    $temp.remove();
    document.getElementById('copy-btn').innerText = 'Copied'
    setTimeout(() => {
        document.getElementById('copy-btn').innerText = 'Copy';
    }, 1500)
}

function isURLValid(url) {
    return true; //just for Testing
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
}
