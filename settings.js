const ent_h_input = document.getElementById("ent-h");
const ent_m_input = document.getElementById("ent-m");
const ent_sub_btn = document.getElementById("ent-sub");
const ent_display = document.getElementById("ent-display");

const sh_h_input = document.getElementById("sh-h");
const sh_m_input = document.getElementById("sh-m");
const sh_sub_btn = document.getElementById("sh-sub");
const sh_display = document.getElementById("sh-display");

const ed_h_input = document.getElementById("ed-h");
const ed_m_input = document.getElementById("ed-m");
const ed_sub_btn = document.getElementById("ed-sub");
const ed_display = document.getElementById("ed-display");

const ne_h_input = document.getElementById("ne-h");
const ne_m_input = document.getElementById("ne-m");
const ne_sub_btn = document.getElementById("ne-sub");
const ne_display = document.getElementById("ne-display");

let ent_h = 5;
let ent_m = 0;
let sh_h = 5;
let sh_m = 0;
let ed_h = 5;
let ed_m = 0;
let ne_h = 5;
let ne_m = 0;

function updateEntDisplay() {
    ent_display.innerText = `You have set ${ent_h} hours and ${ent_m} minutes for entertainment.`;
}

function updateShDisplay() {
    sh_display.innerText = `You have set ${sh_h} hours and ${sh_m} minutes for shopping.`;
}

function updateEdDisplay() {
    ed_display.innerText = `You have set ${ed_h} hours and ${ed_m} minutes for education.`;
}

function updateNeDisplay() {
    ne_display.innerText = `You have set ${ne_h} hours and ${ne_m} minutes for news.`;
}

ent_sub_btn.addEventListener("click", function () {
    ent_h = (ent_h_input.value);
    ent_m = (ent_m_input.value);
    if (ent_h < 0)
        ent_h = 0;
    if (ent_m < 0)
        ent_m = 0;
    console.log();
    updateEntDisplay();
});

sh_sub_btn.addEventListener("click", function () {
    sh_h = (sh_h_input.value);
    sh_m = (sh_m_input.value);
    if (sh_h < 0)
        sh_h = 0;
    if (sh_m < 0)
        sh_m = 0;
    updateShDisplay();
});

ed_sub_btn.addEventListener("click", function () {
    ed_h = (ed_h_input.value);
    ed_m = (ed_m_input.value);
    if (ed_h < 0)
        ed_h = 0;
    if (ed_m < 0)
        ed_m = 0;
    updateEdDisplay();
});

ne_sub_btn.addEventListener("click", function () {
    ne_h = (ne_h_input.value);
    ne_m = (ne_m_input.value);
    if (ne_h < 0)
        ne_h = 0;
    if (ent_m < 0)
        ent_m = 0;
    updateNeDisplay();
});

updateEntDisplay();
updateShDisplay();
updateEdDisplay();
updateNeDisplay();
