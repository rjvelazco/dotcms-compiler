window.addEventListener('load', ()=>{
    const btnPlay = document.querySelector('#btn-play'),
    codeContainer = document.querySelector('#code-container'),
    message       = document.querySelector('#message'),
    sub_menu      = document.querySelector('#sub_menu');

    const codePrev = document.querySelectorAll('.codePrev');
    let option = '0';

    sub_menu.addEventListener('click', (e)=>{
        const target = e.target;

        if(target.localName === 'a'){
            option = target.getAttribute('data-value');
            toggleCode();
        }

    });

    btnPlay.addEventListener('click', ()=>{
    eventApi(option);
    });


    const request1 = ()=>{
        fetch('https://demo.dotcms.com/api/content/query/+contentType:Activity/orderby/Activity.title')
        .then(data => data.json())
        .then(data => {
            data = JSON.stringify(data);
            insertJsonIntoDocument(data);
        })
        .catch(console.log);
    };

    const request2 = ()=>{
        fetch('https://demo.dotcms.com/api/v1/page/render/index?language_id=1', {
            headers: {
                DOTAUTH: window.btoa('admin@dotcms.com:admin')
            }
        })
        .then(data => data.json())
        .then(data => {
            data = JSON.stringify(data);
            insertJsonIntoDocument(data);
        });
    };

    const request3 = ()=>{
        fetch('https://demo.dotcms.com/api/v1/authentication/api-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: 'admin@dotcms.com',
                password: 'admin',
                expirationDays: 10
            })
        })
        .then(data => data.json())
        .then(data => {
            data = JSON.stringify(data);
            insertJsonIntoDocument(data);
        });
    };

    const request4 = ()=>{
        const body = {
            "query": {
                "bool": {
                    "must": {
                        "term": {
                            "catchall": "snow"
                        }
                    }
                }
            }
        };
        fetch('https://demo.dotcms.com/api/es/search', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(data => data.json())
        .then(data =>{
            data = JSON.stringify(data);
            insertJsonIntoDocument(data);
        });
    };

    const request5 = ()=>{
        fetch('https://demo.dotcms.com/api/v1/authentication/api-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: 'admin@dotcms.com',
                password: 'admin',
                expirationDays: 10
            })
        })
        .then(data => data.json())
        .then(data => {
            data = JSON.stringify(data);
            insertJsonIntoDocument(data);
        });
    };

    const eventApi = (action) =>{
        codeContainer.innerHTML = '';
        message.style.display = 'none';

        switch (action) {
            case '0':    
                request1();
            break;
            case '1':
                request2();
            break;
            case '2':
                request3();
            break;
            case '3':
                request4();
            break;
            case '4':
                request5();
            break;
        }


    }

    const insertJsonIntoDocument = (data)=>{
        new JsonViewer({container: codeContainer, data, theme: 'light', expand: true});
    }


    const toggleCode = ()=>{
        prismJS();
        codeContainer.innerHTML = '<span class="message-code-response" id="message">Hit the play button to get a response</span>';
        // message.style.display = 'inline-block';
        codePrev.forEach(item=>{
            item.classList.add('d-none');
        });

        codePrev[option].classList.remove('d-none');
    }

    setTimeout(toggleCode, 10)

});
