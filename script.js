document.addEventListener("load", dateLoad());

function entry() {
    const isi = document.getElementById("input").value;
    document.getElementById("unek-unek").innerHTML = isi;
}

function dateLoad() {
    const tanggal = new Date;
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