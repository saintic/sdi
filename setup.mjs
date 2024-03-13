// setup config

fetch('https://open.saintic.com/api/configcenter/sdi.json')
    .then(response => response.json())
    .then(res => {
        console.debug(res)
        if (
            Object.prototype.toString.call(res) === '[object Object]' &&
            res.success === true
        ) {
            let data = res.data
            let title = data.title,
                about_url = data.about_url,
                beian_text = data.beian_text
            if (title != '') {
                document.title = title
            }
            if (about_url != '') {
                document.getElementById('about_button').href = about_url
            }
            if (beian_text != '') {
                document.getElementById('beian_link').text = beian_text
            }
        }
    })
