function getShortUrl() {
    let longUrl = document.getElementById('input-output').value
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
        }
    })
}
//    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

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
