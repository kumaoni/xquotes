import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { sleep, check } from 'k6';

const BASE_URL_DEVQA = 'https://y2inbtnarh.execute-api.us-east-2.amazonaws.com/v1/';
const BASE_URL_DEV = 'https://pimcfhpwi5.execute-api.us-east-2.amazonaws.com/v1/';
const BASE_URL_PROD = 'https://frdgaijdhk.execute-api.us-east-1.amazonaws.com/v1/';

let DevUserToken = 'AXKdAawS8LXcWIuvRV_i';
let DevAuth = 'eyJraWQiOiJKZ25iMFZUZ2Z2Y3JWNnhaWmw2R1JxRUZTaGNiZ1RrWWRcL2Z6RE1UcXNuOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4OTY2NTZmNy01YzQ2LTRjYjMtODQwNC0wNjcxMWY0Yjg5MDAiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl96cERCV2R6S0YiLCJjbGllbnRfaWQiOiI0dnJpM2sybW9oY2tndmVxZDZpbjhvdDBrcSIsIm9yaWdpbl9qdGkiOiI5N2RjYTY4YS1hOTE0LTQ2OTAtYWFjOC04YjY1NTAyZjZlYzUiLCJldmVudF9pZCI6ImExNTFmZjE4LTkzOTAtNDEzYy1hNmRjLWY4YmIwNzc5MWMwMyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NzQ1NTYzNjQsImV4cCI6MTY3NDU1NjY2NCwiaWF0IjoxNjc0NTU2MzY0LCJqdGkiOiJjYWJlNWYyYy03MjE1LTQzMzgtOGJmMi04MzY5ZGVjODQxMjMiLCJ1c2VybmFtZSI6Ijg5NjY1NmY3LTVjNDYtNGNiMy04NDA0LTA2NzExZjRiODkwMCJ9.izaO0fTiPdlrktGtJ6mILlkDA_0KwSeo5h4pe5Qepi7y9g28TWXWpDmkX5ZSXHl5QaMlIsY46GqbO2Tk7ihmjREdVcHDYelIOmLujLD7-bNVxzvM4n6m6dvuFBrhbPApsr1wKwOMnYRkZCk605KzXgwP7jUbMgNA-pCNcvK5wWVM-i2ZjR2Jo6EXJo1e5uVHp2z2r2meY6eXEcetaS-5utE10-aFe00ckhdQ_LYtH1pzeN3N-EilUglVPr9LKrMK-vq0Dt4H488p49wmh5uACNdCipqcKiI1FR-HtOXgw6HxPwup_1sfg2aqBG7FbejzARAPm_L1vzDogLhhNmTknA';

let ProdUserToken = 'U0167411402401069602';
let ProdAuth = 'eyJraWQiOiJJRTZcLzZwVFpXUXc1NndBNW1OeXlFTlpQNGErb3JQWXRxazhSeGNZRWJ6Zz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI2OWE0MGM1ZS03ZGRmLTRmM2ItYjM2ZC02MDEyZWZkYzg5MTQiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9CUnNJQU1meHAiLCJjbGllbnRfaWQiOiIyOXZvdmMyajAycGlhaG5nY2lyOWdwcmQzcyIsIm9yaWdpbl9qdGkiOiJlN2RiY2EyMi05OGVhLTQ0NzQtODQ3OS1iYTNiZDkxMjMzNDkiLCJldmVudF9pZCI6ImFhMTFhZjcwLTc4OTEtNDE4Mi05NDEyLWVlOTNlMjllMzg3ZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NzQ0NDkzMDQsImV4cCI6MTY3NDY0MTgxMywiaWF0IjoxNjc0NTU1NDEzLCJqdGkiOiJjOTYwNzlmZS1jMDZhLTQ0YzEtOWZkYi1hOGVmNDdiNGEyNmUiLCJ1c2VybmFtZSI6IjY5YTQwYzVlLTdkZGYtNGYzYi1iMzZkLTYwMTJlZmRjODkxNCJ9.Vbw5aGqzMgj6cZO4M5iSGJ-DJt6_z49F-FkcFprE4GPVUKwhy9xvBoAPF4d72GWW1WFst84Q0DS-3mFlu-ekRul4gbVb6MlQu7-zrNA1eiOJfKbVV9B1zt4i77HWQ9sSNv8C8LgCEExoQjYZqsYIOGgtmcgAedJJeRxLFYB1VQHY1oAIOcwJv8CDM633L18JQtFlCp9gM-eamxg7HmXLfrqJxk6HD3EQoG_KEbKbHQJXT5-VymuWzlwL8IEogzjt3IL9WWA1YabpZlLDu5nKGlBFN65QsuzK8kMtLhrzTz0l2I7ajC6NKZHMYT-rnozLwMBNfiWfMjtLJC4TXK-q_A';

let userToken = ProdUserToken;
let authToken = ProdAuth;

const params = {
    headers: {
        'x-app': 'LemonHatUser',
        'x-user-token': userToken,
        'x-automation': '456abc',
        'authorization': authToken,
    }
};

export const options = {
    batchPerHost: 10,
    discardResponseBodies: true,
    // scenarios: {
    //     test: {
    //         executor: 'constant-arrival-rate',

    //         // Our test should last 30 seconds in total
    //         duration: '5s',

    //         // It should start 30 iterations per `timeUnit`. Note that iterations starting points
    //         // will be evenly spread across the `timeUnit` period.
    //         rate: 5,

    //         // It should start `rate` iterations per second
    //         timeUnit: '1s',

    //         // It should preallocate 2 VUs before starting the test
    //         preAllocatedVUs: 2,

    //         // It is allowed to spin up to 50 maximum VUs to sustain the defined
    //         // constant arrival rate.
    //         maxVUs: 50,
    //     },
    // },
};

let BASE_URL = BASE_URL_PROD;

const caturl = new URL(`${BASE_URL}category`);

caturl.searchParams.append('z', '500091');

const offurl = new URL(`${BASE_URL}offer`);

offurl.searchParams.append('z', '500091');

const prourl = new URL(`${BASE_URL}catalogue/products`);

prourl.searchParams.append('q', '3');

const carturl = new URL(`${BASE_URL}cart`);

carturl.searchParams.append('z', '500091');

const lareurl = new URL(`${BASE_URL}notifications/lastread`);

const stourl = new URL(`${BASE_URL}store`);

stourl.searchParams.append('q', '2');
stourl.searchParams.append('z', '500091');

const filturl = new URL(`${BASE_URL}filter/storesfilter`);

const userurl = new URL(`${BASE_URL}user`);

const sto2url = new URL(`${BASE_URL}store`);

sto2url.searchParams.append('z', '500091');

const filt2url = new URL(`${BASE_URL}filter/storetypefilter`);

filt2url.searchParams.append('z', '500091');


const req1 = {
    method: 'GET',
    url: caturl.toString(),
    params: params
};
const req2 = {
    method: 'GET',
    url: offurl.toString(),
    params: params
};
const req3 = {
    method: 'GET',
    url: prourl.toString(),
    params: params
};
const req4 = {
    method: 'GET',
    url: carturl.toString(),
    params: params
};
const req5 = {
    method: 'GET',
    url: lareurl.toString(),
    params: params
};
const req6 = {
    method: 'GET',
    url: stourl.toString(),
    params: params
};
const req7 = {
    method: 'GET',
    url: filturl.toString(),
    params: params
};
const req8 = {
    method: 'GET',
    url: userurl.toString(),
    params: params
};
const req9 = {
    method: 'GET',
    url: sto2url.toString(),
    params: params
};
const req10 = {
    method: 'GET',
    url: filt2url.toString(),
    params: params
};

let reqArray = [req1, req2, req3, req4, req5, req6, req7, req8, req9, req10];

// const req1 = {
//     method: 'GET',
//     url: `${BASE_URL_DEV}category?z=500091`,
//     params: params
// };
// const req2 = {
//     method: 'GET',
//     url: `${BASE_URL_DEV}offer?z=500091`,
//     params: params
// };

// const req1 = {
//     method: 'GET',
//     url: `https://pimcfhpwi5.execute-api.us-east-2.amazonaws.com/v1/category?z=500091`,
//     params: params
// };
// const req2 = {
//     method: 'GET',
//     url: `https://pimcfhpwi5.execute-api.us-east-2.amazonaws.com/v1/offer?z=500091`,
//     params: params
// };

export default function () {

    // const responses = http.batch([req1, req2, req3]);
    const responses = http.batch(reqArray);

    // console.log("responses 0", responses[0]);
    // console.log("##################################");
    // console.log("responses 1", responses[1]);
    // console.log("responses 3", responses[3]);

    check(responses[0], {
        'category status is 200': (r) => r.status === 200,
        // 'response body': (r) => r.body.indexOf('Feel free to browse') !== -1,
    });

    check(responses[1], {
        'offer status is 200': (r) => r.status === 200,
        // 'response body': (r) => r.body.indexOf('Feel free to browse') !== -1,
    });

    check(responses[2], {
        'products status is 200': (r) => r.status === 200,
        // 'response body': (r) => r.body.indexOf('Feel free to browse') !== -1,
    });

    check(responses[3], {
        'cart status is 200': (r) => r.status === 200,
        // 'response body': (r) => r.body.indexOf('Feel free to browse') !== -1,
    });

    check(responses[4], {
        'lastread status is 200': (r) => r.status === 200,
        // 'response body': (r) => r.body.indexOf('Feel free to browse') !== -1,
    });

    check(responses[5], {
        'store status is 200': (r) => r.status === 200,
        // 'response body': (r) => r.body.indexOf('Feel free to browse') !== -1,
    });

    check(responses[6], {
        'storesfilter status is 200': (r) => r.status === 200,
        // 'response body': (r) => r.body.indexOf('Feel free to browse') !== -1,
    });

    check(responses[7], {
        'user status is 200': (r) => r.status === 200,
        // 'response body': (r) => r.body.indexOf('Feel free to browse') !== -1,
    });

    check(responses[8], {
        'store2 status is 200': (r) => r.status === 200,
        // 'response body': (r) => r.body.indexOf('Feel free to browse') !== -1,
    });

    check(responses[9], {
        'storetypefilter status is 200': (r) => r.status === 200,
        // 'response body': (r) => r.body.indexOf('Feel free to browse') !== -1,
    });

}
