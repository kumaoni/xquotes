import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { sleep, check } from 'k6';

const BASE_URL_DEVQA = 'https://y2inbtnarh.execute-api.us-east-2.amazonaws.com/v1/';
const BASE_URL_DEV = 'https://pimcfhpwi5.execute-api.us-east-2.amazonaws.com/v1/';

const params = {
    headers: {
        'x-app': 'LemonHatUser',
        'x-user-token': 'AXKdAawS8LXcWIuvRV_i',
        'x-automation': 'yes',
        'authorization': 'eyJraWQiOiJKZ25iMFZUZ2Z2Y3JWNnhaWmw2R1JxRUZTaGNiZ1RrWWRcL2Z6RE1UcXNuOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4OTY2NTZmNy01YzQ2LTRjYjMtODQwNC0wNjcxMWY0Yjg5MDAiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl96cERCV2R6S0YiLCJjbGllbnRfaWQiOiI0dnJpM2sybW9oY2tndmVxZDZpbjhvdDBrcSIsIm9yaWdpbl9qdGkiOiJlMGMzMTE5MS1lMTk3LTRhMjMtOWVmMS01ODE5OWEzMTM0MDciLCJldmVudF9pZCI6ImZjNjhkY2VmLTk2OGYtNGI3Ny05YjA3LWY2NzlkZmQ4ODgzNSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NzM1OTEwMDYsImV4cCI6MTY3MzY3NzQwNiwiaWF0IjoxNjczNTkxMDA2LCJqdGkiOiI5MDhmNTc2Ny00ODEwLTRkMzMtYWQ0NS05ZWU5MDdmMGE0NTUiLCJ1c2VybmFtZSI6Ijg5NjY1NmY3LTVjNDYtNGNiMy04NDA0LTA2NzExZjRiODkwMCJ9.hsFH67pfyOZ0hibP9PRSRahynsWLXiVNuvjz0BE6-6T6vPaodHFYt5JXfkTLUPmU3eCLCz1DkVNCxe29ANYFc3H9-zOjpDHnPvzYRZgEVjtRY-MC2PTQHwGKo1DDkgmhgBQ0DHzvOotpChfM36BsHLb9igha2eViotnmdNWB1fODecB5_VWS_nHPP6OCHVKzROMnQ77NLNG56rfQWX6O75hkQClzHTznx4bn-vbW3w9Rb7kZw6ywh8HNSsXiNGXxG3zWiubey2WnisYQ8wSvYeUnAIOIk9rPSxURFnaQ0_KyJj1r5QFPmvtcrfmsyriwBLddeNNIhCgIeF6MmucwsQ',
    }
};

// export const options = {
//     discardResponseBodies: true,
//     scenarios: {
//         test: {
//             executor: 'constant-arrival-rate',

//             // Our test should last 30 seconds in total
//             duration: '1000s',

//             // It should start 30 iterations per `timeUnit`. Note that iterations starting points
//             // will be evenly spread across the `timeUnit` period.
//             rate: 10,

//             // It should start `rate` iterations per second
//             timeUnit: '1s',

//             // It should preallocate 2 VUs before starting the test
//             preAllocatedVUs: 2,

//             // It is allowed to spin up to 50 maximum VUs to sustain the defined
//             // constant arrival rate.
//             maxVUs: 50,
//         },
//     },
// };

export default function () {

    const caturl = new URL(`${BASE_URL_DEV}category`);

    caturl.searchParams.append('z', '500091');

    let res = http.get(caturl.toString(), params);
    console.log("res", res);

    const offurl = new URL(`${BASE_URL_DEV}offer`);

    offurl.searchParams.append('z', '500091');

    res = http.get(offurl.toString(), params);
    console.log("res", res);

    const checkRes = check(res, {
        'status is 200': (r) => r.status === 200,
        // 'response body': (r) => r.body.indexOf('Feel free to browse') !== -1,
    });
}
