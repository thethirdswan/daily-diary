const tanggal = new Date;
document.addEventListener("load", dateLoad());
const diaryKey = "diaryEntry";
let diaryEntry = "<em>Belum ada apa-apa disini...</em>";
if (localStorage.getItem(diaryKey) === null) {
    localStorage.setItem(diaryKey, diaryEntry)
}

document.addEventListener("load", retrieveEntry());
document.addEventListener("load", loadEntry());

function entry() {
    const isi = document.getElementById("input").value;
    if (isi === "") {
        alert("Kamu belum memasukkan apapun di kolom entri!")
        return;
    }
    document.getElementById("unek-unek").innerHTML = isi;
    insertEntry(isi);
}

function insertEntry(entry) {
    localStorage.setItem(diaryKey, entry);
}

function retrieveEntry() {
    const entry = localStorage.getItem(diaryKey);
    if (entry !== null) {
        diaryEntry = entry;
    }
}

function loadEntry() {
    document.getElementById("unek-unek").innerHTML = diaryEntry;
}

function dateLoad() {
    const sentence = tanggal.getDate() + " " + monthObtainer(tanggal.getMonth()) + " " + tanggal.getFullYear();
    document.getElementById("tanggal").innerHTML = sentence;
}

function monthObtainer(month) {
let monthWord;
    switch (month) {
        case 0:
            monthWord = "Januari";
            break;
        case 1:
            monthWord = "Februari";
            break;
        case 2:
            monthWord = "Maret";
            break;
        case 3:
            monthWord = "April";
            break;
        case 4:
            monthWord = "Mei";
            break;
        case 5:
            monthWord = "Juni";
            break;
        case 6:
            monthWord = "Juli";
            break;
        case 7:
            monthWord = "Agustus";
            break;
        case 8:
            monthWord = "September";
            break;
        case 9:
            monthWord = "Oktober";
            break;
        case 10:
            monthWord = "November";
            break;
        case 11:
            monthWord = "Desember";
            break;
    }
    return monthWord;
}