import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { target: 10, duration: '30s' },
    { target: 100, duration: '30s' },
    { target: 1000, duration: '30s' },
    // { target: 10000, duration: '30s' }
  ],
};

export default function () {
  http.get('http://localhost:3003/places/Wisconsin');
};