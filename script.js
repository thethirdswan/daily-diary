const tanggal = new Date;
const liveAlert = document.getElementById("diaryAlert");
let activeAlert;
const diaryKey = "diaryEntry";
let diaryEntry = ""
const diaryDateKey = "diaryDate";
const diaryDate = tanggal.getDate();
const languageKey = "language";
let languageSetting = navigator.language;
if (localStorage.getItem(languageKey) === null) {
    localStorage.setItem(languageKey, languageSetting);
}

function loadLanguage() {
    switch (localStorage.getItem(languageKey)) {
        case "id":
            window.location.replace("/daily-diary/lang/id.html")
            break;
        default:
            window.location.replace("/daily-diary/lang/en.html");
    }
}

const switcher = document.getElementById("switcher");

switcher.addEventListener("click", languageSwitch);

function languageSwitch() {
    if (localStorage.getItem(languageKey) == 'id') {
        localStorage.setItem(languageKey, "en-US")
    } else {
        localStorage.setItem(languageKey, 'id')
    }
}

if (localStorage.getItem(diaryKey) === null) {
    localStorage.setItem(diaryKey, diaryEntry)
}

if (localStorage.getItem(diaryDateKey) === null) {
    localStorage.setItem(diaryDateKey, diaryDate)
}

const diaryAlert = (message) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
    `<div class="alert alert-primary alert-dismissible mx-2" role="alert">`,
    `   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">`,
    `       <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>`,
    `       <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>`,
    `   </svg>`,
    `   ${message}`,
    `   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
    `</div>`
    ].join('')

    liveAlert.append(wrapper);
    activeAlert = new bootstrap.Alert(wrapper);
}

document.addEventListener("load", dateLoad());
document.addEventListener("load", retrieveEntry());
document.addEventListener("load", loadEntry());

function entry() {
    const newLinePattern = /\n/;
    const boldPattern = /__/;
    let counter = 0;
    let isi = document.getElementById("input").value;
    if (isi === "") {
        if (localStorage.getItem(languageKey) == "id") {
            alert("Kamu belum memasukkan apapun di kolom entri!")
        } else {
            alert("You haven't entered anything yet!")
        }
        return;
    }
    while (newLinePattern.test(isi)) {
        isi = isi.replace("\n", "<br>");
    }
    while (boldPattern.test(isi)) {
        counter++;
        if (counter % 2 != 0) {
            isi = isi.replace("__", "<strong>");
        } else if (counter % 2 == 0) {
            isi = isi.replace("__", "</strong>")
        }
    }
    counter = 0;
    document.getElementById("unek-unek").innerHTML = isi;
    insertEntry(isi);
    document.getElementById("hapus").style.display = "inline";
    document.getElementById("input").value = ""
}

function insertEntry(entry) {
    localStorage.setItem(diaryKey, entry);
}

function deleteEntry(option) {
    if (option == "manual") {
        if (localStorage.getItem(languageKey) == "id") {
            if (confirm("Apakah anda benar-benar ingin menghapus entri sekarang?")) {
                document.getElementById("unek-unek").innerHTML = "<em>Belum ada apa-apa disini...</em>"
                localStorage.setItem(diaryKey, "<em>Belum ada apa-apa disini...</em>");
                document.getElementById("hapus").style.display = "none";
                diaryAlert("Diary sudah dihapus!");
            }
        } else {
            if (confirm("Are you sure to delete your current entry?")) {
                document.getElementById("unek-unek").innerHTML = "<em>There's nothing here yet...</em>"
                localStorage.setItem(diaryKey, "<em>There's nothing here yet...</em>");
                document.getElementById("hapus").style.display = "none";
                diaryAlert("Diary has been deleted!");
            }
        }
    }
    if (option == "auto") {
        if (localStorage.getItem(languageKey) == "id") {
            document.getElementById("unek-unek").innerHTML = "<em>Belum ada apa-apa disini...</em>"
            localStorage.setItem(diaryKey, "<em>Belum ada apa-apa disini...</em>");
            document.getElementById("hapus").style.display = "none";
            diaryAlert("Diary sudah direset!");
        } else {
            document.getElementById("unek-unek").innerHTML = "<em>There's nothing here yet...</em>"
            localStorage.setItem(diaryKey, "<em>There's nothing here yet...</em>");
            document.getElementById("hapus").style.display = "none";
            diaryAlert("Diary have been reset!");
        }
    }
}

function retrieveEntry() {
    const entry = localStorage.getItem(diaryKey);
    if (entry !== null) {
        diaryEntry = entry;
    }
    if (localStorage.getItem(diaryKey) !== "<em>Belum ada apa-apa disini...</em>" || "<em>There's nothing here yet...</em>") {
        document.getElementById("hapus").style.display = "inline";
    }
}

function loadEntry() {
    document.getElementById("unek-unek").innerHTML = diaryEntry;
    document.getElementById("input").value = "";
}

function dateLoad() {
    const sentence = tanggal.getDate() + " " + monthObtainer(tanggal.getMonth()) + " " + tanggal.getFullYear();
    document.getElementById("tanggal").innerHTML = sentence;
    if (localStorage.getItem(languageKey == "id")) {
        if (diaryDate != localStorage.getItem(diaryDateKey) && localStorage.getItem(diaryKey) !== "<em>Belum ada apa-apa disini...</em>") {
            deleteEntry('auto')
        }
    } else {
        if (diaryDate != localStorage.getItem(diaryDateKey) && localStorage.getItem(diaryKey) !== "<em>There's nothing here yet...</em>") {
            deleteEntry('auto')
        }
    }
    localStorage.setItem(diaryDateKey, diaryDate)
}

function monthObtainer(month) {
let monthWord;
if (localStorage.getItem(languageKey) == "id") {
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
    } else {
    switch (month) {
        case 0:
            monthWord = "January";
            break;
        case 1:
            monthWord = "February";
            break;
        case 2:
            monthWord = "March";
            break;
        case 3:
            monthWord = "April";
            break;
        case 4:
            monthWord = "May";
            break;
        case 5:
            monthWord = "June";
            break;
        case 6:
            monthWord = "July";
            break;
        case 7:
            monthWord = "August";
            break;
        case 8:
            monthWord = "September";
            break;
        case 9:
            monthWord = "October";
            break;
        case 10:
            monthWord = "November";
            break;
        case 11:
            monthWord = "December";
            break;
        }
    }
    return monthWord;
}