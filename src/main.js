$(function() {
    // $('.add').on('touchstart', () => {
    //         console.log('ok');
    //     })

    const message = localStorage.getItem('message')
    const mesObject = JSON.parse(message)
    const hashMap = mesObject || [{
            url: 'https://bilibili.com',
            logo: 'B',
        },
        {
            url: 'https://juejin.cn',
            logo: 'J',
        }, {
            url: 'https://www.iconfont.cn',
            logo: 'I',
        }, {
            url: 'https://zh.javascript.info',
            logo: 'Z',
        }, {
            url: 'https://cssgradient.io',
            logo: 'C',
        }, {
            url: 'https://swiper.com.cn',
            logo: 'S',
        }, {
            url: 'https://developer.mozilla.org',
            logo: 'D'
        },
        {
            url: 'https://quanjing.com',
            logo: 'Q',
        }, {
            url: 'https://mail.163.com',
            logo: 'M'
        }
    ]
    const simplify = (url) => {
        return url.replace('https://', '')
            .replace('http://', '')
            .replace('www.', '')
            .replace(/\/.*/, '')
    }
    const render = () => {
        $('.navList').find('li:not(.addButton)').remove()
        hashMap.forEach((item, index) => {
            if (item.url.indexOf('http') !== 0) {
                item.url = 'https://' + item.url
            }
            const $li = $(`
            <li>
                <div class="site">
                    <div class="logo">
                        <span> 
                            ${simplify(item.url)[0].toUpperCase()}
                        </span>
                    </div>
                    <div class="url">
                        <span>${simplify(item.url)}</span>
                    </div>
                    <div class="functionList">
                    <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-remove2"></use>
                        </svg>
                    </div>
                </div>
            </li>
        `).insertBefore($('.add').parent())

            $li.on('click', () => {
                window.open(item.url, '_self')
            })
            $li.on('click', '.functionList', e => {
                e.stopPropagation()
                    // ??????????????? ??????????????????????????????
                hashMap.splice(index, 1)
                render()
            })
        })
    }
    render();
    $('.add').on('click', () => {
            let url = prompt('???????????????????????????')
            if (url.trim().length === 0) {
                return false
            }
            if (url.indexOf('http') !== 0) {
                url = 'https://' + url
            }
            console.log(url);
            hashMap.push({
                url: simplify(url),
                logo: simplify(url)[0],
            })
            render()
        })
        // ?????????????????????
    window.onbeforeunload = () => {
        const string = JSON.stringify(hashMap)
            // ??????????????????????????????
        localStorage.setItem('message', string)
    }
    $(document).on('keyup', e => {
        const { key } = e
        hashMap.forEach((items, index) => {
            if (items.logo.toLowerCase() === key) {
                window.open(items.url, '_self')
            }
        })
    })
})