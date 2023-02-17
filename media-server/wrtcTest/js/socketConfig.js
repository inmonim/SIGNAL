const socket = io('https://localhost:443', {secure: true, cors: { origin: '*' }});   //로컬용 url
//const socket = io('https://i8e207.p.ssafy.io:443', {secure: true, cors: { origin: '*' }});    //서버용 url