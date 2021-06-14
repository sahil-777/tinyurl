function getShortUrl() {
    let longUrl = document.getElementById('input-output').value

    if (isURLValid(longUrl)) { //check if url is valid or not

        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/api/getShortUrl',
            data: {
                'longUrl': longUrl
            },
            success: function (responseData) {
                let shortUrl = responseData.shortUrl;
                document.getElementById('input-output').value = shortUrl
                document.getElementById('copy-btn').hidden = false
                document.getElementById('shorten-btn').hidden = true
                document.getElementById('check-btn').hidden = false
                document.getElementById('shorten-another-btn').hidden = false
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //console.log(textStatus + ": " + jqXHR.status + " " + errorThrown);
                document.getElementById('error-msg').innerText = errorThrown + '. Please, try again later'
                setTimeout(() => {
                    document.getElementById('error-msg').innerText = '';
                }, 2500)
            }
        })

    } else {
        document.getElementById('error-msg').innerText = 'Please,enter valid url'
        setTimeout(() => {
            document.getElementById('error-msg').innerText = '';
        }, 2500)
    }
}

function goToUrl() {
    let url = document.getElementById('input-output').value;
    window.open(url) //will be opened in new tab
}

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).val()).select();
    document.execCommand("copy");
    $temp.remove();
    document.getElementById('copy-btn').innerText = 'Copied'
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
