
const btnCall     = document.querySelector('#run-call-btn'),
responseContainer = document.querySelector('#fetch-response-container'),
subMenu           = document.querySelector('#sub_menu'),
codePre           = document.querySelector('#code-prev'),
btnCopyCode       = document.querySelector('#btn-copy-code'),
btnCopyResponse   = document.querySelector('#btn-copy-response');


let option = '0';
let data;


// Event Listener
btnCall.addEventListener('click', () => {
    callEvents(option);
});

subMenu.addEventListener('click', (e)=>{
    const target = e.target;
    disableCopyResponse();
    if(target.localName === 'a'){
        option = target.getAttribute('data-value');
        changeFetchCall();
    }
});

// Event
const callEvents = async (action)=>{
    messageUser("Waiting for response...");
    switch(action){
        case '0':
            data = await request1();
        break;
        case '1':
            data = await request2();
        break;
        case '2':
            data = await request3();
        break;
        case '3':
            data = await request4();
        break;
        case '4':
            data = await request5();
        break;
    }
    disableCopyResponse(false);
    responseContainer.innerHTML = '';
    insertResponseJsonFormat(data);
}

// Requests
const request1 = async () => {
    try{
        const resp = await fetch('https://demo.dotcms.com/api/content/query/+contentType:Activity/orderby/Activity.title'); 
        const data = await resp.json();
        return data;
    }catch(e){
        console.log(e);
    }
};

const request2 = async () => {
    try{
        const resp = await fetch('https://demo.dotcms.com/api/v1/page/render/index?language_id=1', {
            headers: {
                DOTAUTH: window.btoa('admin@dotcms.com:admin')
            }
        });
        const data = await resp.json();
        return data;
    } catch(e){
        console.log(e)
    }
}

const request3 = async () => {

    try{
        const resp = await fetch('https://demo.dotcms.com/api/v1/authentication/api-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: 'admin@dotcms.com',
                password: 'admin',
                expirationDays: 10
            })
        });

        const data = await resp.json();
        return data;
    } catch(e){
        console.log(e);
    }
}

const request4 = async () => {
    try{
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
        const resp = await fetch('https://demo.dotcms.com/api/es/search', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await resp.json();
        return data;
    } catch(e){
        console.log(e);
    }
}

const request5 = async () => {

    try{
        const resp = await fetch('https://demo.dotcms.com/api/v1/authentication/api-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: 'admin@dotcms.com',
                password: 'admin',
                expirationDays: 10
            })
        });

        const data = await resp.json();
        return data;
    } catch(e){
        console.log(e);
    }
    
}

const insertResponseJsonFormat = (data) => {
    data = JSON.stringify(data);
    new JsonViewer({container: responseContainer, data, theme: 'light', expand: true});
}

const changeFetchCall = ()=>{
    codePre.innerHTML = '';
    codePre.innerHTML = codeResquests[option];
    prismJS();
    responseContainer.innerHTML = '<div class="container-message-user-no-action"><span class="message-user-no-action" id="message">Hit the play button to get a response</span></div>';
}


// REQUEST CODE TEXT
const codeRequest1 = `fetch('https://demo.dotcms.com/api/content/query/+contentType:Activity/orderby/Activity.title')
    .then(data => data.json())
    .then(data => console.log(data))`;

const codeRequest2 = `fetch('https://demo.dotcms.com/api/v1/page/render/index?language_id=1', 
{
    headers: {
        DOTAUTH: window.btoa('admin@dotcms.com:admin')
    }
})
    .then(data => data.json())
    .then(data => console.log(data));`;

const codeRequest3 = `fetch('https://demo.dotcms.com/api/v1/authentication/api-token', {
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
    .then(data => console.log());`;

const codeRequest4 = `const body = {
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
    .then(data =>console.log());`;

const codeRequest5 = `fetch('https://demo.dotcms.com/api/v1/authentication/api-token', {
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
    .then(data => console.log());`;

const codeResquests = [codeRequest1, codeRequest2, codeRequest3, codeRequest4, codeRequest5];

const messageUser = (message)=>{
    const message_user = document.querySelector('#message');
    message_user.innerHTML = message;
}

// Copy Code/Response Funciton
const copyCodeResponse = (data)=>{
    let clipInput = document.createElement('textarea');
        
    // document.body.innerHTML = data;
    // clipInput.setAttribute('value', `${data}`);
    clipInput.innerHTML = `${data}`;

    console.log(clipInput);
    document.body.appendChild(clipInput);
    clipInput.select();

    document.execCommand('copy');
    document.body.removeChild(clipInput);
}

btnCopyCode.addEventListener('click', ()=>{
    btnCopyCode.innerHTML = "Copied!";
    copyCodeResponse(codeResquests[option]);
    setTimeout(()=>{
        btnCopyCode.innerHTML = "Copy Call";
    }, 1500);
});

btnCopyResponse.addEventListener('click', ()=>{
    btnCopyResponse.innerHTML = "Copied!";

    data = JSON.stringify(data, null, "\t");
    console.log(data);
    copyCodeResponse(data);
    setTimeout(()=>{
        btnCopyResponse.innerHTML = "Copy Response";
    }, 1500);
});


// DISABLE BTN
const disableCopyResponse = (toDisable = true) =>{
    if(toDisable){
        btnCopyResponse.disabled = true;
        btnCopyResponse.classList.add('disabled');  
    } else{
        btnCopyResponse.disabled = false;
        btnCopyResponse.classList.remove('disabled');
    }
}


