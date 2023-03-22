window.entSubBtn = document.querySelector('#ent-sub');
window.shSubBtn = document.querySelector('#bc-sub');
window.edSubBtn = document.querySelector('#ed-sub');
window.neSubBtn = document.querySelector('#ne-sub');

entSubBtn.addEventListener('click', () => {
    window.enth = document.querySelector('#ent-h').value;
    window.entm = document.querySelector('#ent-m').value;
});

shSubBtn.addEventListener('click', () => {
    window.shh = document.querySelector('#sh-h').value;
    window.shm = document.querySelector('#sh-m').value;
});

edSubBtn.addEventListener('click', () => {
    window.edh = document.querySelector('#ed-h').value;
    window.edm = document.querySelector('#ed-m').value;
});

neSubBtn.addEventListener('click', () => {
    window.neh = document.querySelector('#ne-h').value;
    window.nem = document.querySelector('#ne-m').value;
});
