export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getCurrTime,
    getLabel
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function getCurrTime(time) {
    const date = new Date(time)
    const seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds().toString()
    return date.getDate() +
        "/" + (date.getMonth() + 1) +
        "/" + date.getFullYear() +
        " " + date.getHours() +
        ":" + date.getMinutes() +
        ":" + seconds;
}

function getLabel(status) {
    switch (status) {
        case 'done':
            return {
                id: 'l101',
                title: 'Done',
                color: '#00c875'
            }
        case 'working':
            return {
                id: 'l102',
                title: 'Working on it',
                color: '#fdab3d'
            }
        case 'stuck':
            return {
                id: 'l103',
                title: 'Stuck',
                color: '#e2445c'
            }
        default:
            return {
                id: 'l104',
                title: '',
                color: '#c4c4c4'
            }
    }
}