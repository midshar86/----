let axios = require('axios')
let fs = require('fs')

let option = {
    url: 'http://www.baidu.com',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    }
}

async function getBaiduPage() {
    let { data } = await axios(option)
    console.log(data)
    fs.writeFileSync('./file/index.html', data)
}

getBaiduPage()