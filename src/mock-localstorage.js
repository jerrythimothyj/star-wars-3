import localStorage from 'mock-local-storage';

global.window = {};

window.localStorage = global.localStorage;

