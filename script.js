const tanggal = new Date;
const diaryKey = "diaryEntry";
let diaryEntry = "<em>Belum ada apa-apa disini...</em>";
const diaryDateKey = "diaryDate";
const diaryDate = tanggal.getDate();
if (localStorage.getItem(diaryKey) === null) {
    localStorage.setItem(diaryKey, diaryEntry)
}
if (localStorage.getItem(diaryDateKey) === null) {
    localStorage.setItem(diaryDateKey, diaryDate)
}

document.addEventListener("load", dateLoad());
document.addEventListener("load", retrieveEntry());
document.addEventListener("load", loadEntry());

function entry() {
    const pattern = /\n/;
    let isi = document.getElementById("input").value;
    if (isi === "") {
        alert("Kamu belum memasukkan apapun di kolom entri!")
        return;
    }
    do {
        isi = isi.replace("\n", "<br>");
    } while (pattern.test(isi));
    document.getElementById("unek-unek").innerHTML = isi;
    insertEntry(isi);
    document.getElementById("hapus").style.display = "inline";
}

function insertEntry(entry) {
    localStorage.setItem(diaryKey, entry);
}

function deleteEntry() {
    document.getElementById("unek-unek").innerHTML = "<em>Belum ada apa-apa disini...</em>"
    localStorage.setItem(diaryKey, "<em>Belum ada apa-apa disini...</em>");
    document.getElementById("hapus").style.display = "none";
    alert("Diary sudah dihapus!");
}

function retrieveEntry() {
    const entry = localStorage.getItem(diaryKey);
    if (entry !== null) {
        diaryEntry = entry;
    }
    if (localStorage.getItem(diaryKey) !== "<em>Belum ada apa-apa disini...</em>") {
        document.getElementById("hapus").style.display = "inline";
    }
}

function loadEntry() {
    document.getElementById("unek-unek").innerHTML = diaryEntry;
}

function dateLoad() {
    const sentence = tanggal.getDate() + " " + monthObtainer(tanggal.getMonth()) + " " + tanggal.getFullYear();
    document.getElementById("tanggal").innerHTML = sentence;
    if (diaryDate > localStorage.getItem(diaryDateKey) || diaryDate < localStorage.getItem(diaryDateKey) && localStorage.getItem(diaryKey) !== "<em>Belum ada apa-apa disini...</em>") {
        deleteEntry()
    }
    localStorage.setItem(diaryDateKey, diaryDate)
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