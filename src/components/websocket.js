import {Client} from 'colyseus.js';

const endpoint = (window.location.hostname.indexOf("herokuapp") === -1)
  ? "ws://localhost:3030" // - Local
  : `${window.location.protocol.replace("http", "ws")}//${window.location.hostname}`;
let client;
let room;

export const initClient = () => {
  client = new Client(endpoint);
  return client;
}

export const joinRoom = () => {
  room = client.join('game');
}

export const getClient = () => client;
export const getRoom = () => room;