// ========================================
// DUDUKUE AI - SCRIPT UTAMA
// ========================================

const chatArea = document.getElementById("chatArea");
const questionInput = document.getElementById("question");

// ========================================
// MEMBUAT PESAN
// ========================================

function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = "message " + type;

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = type === "ai" ? "🤖" : "👤";

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    message.appendChild(avatar);
    message.appendChild(bubble);
    chatArea.appendChild(message);

    chatArea.scrollTop = chatArea.scrollHeight;
}

// ========================================
// EFEK MENGETIK AI
// ========================================

function addTypingMessage(text) {
    const message = document.createElement("div");
    message.className = "message ai";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "🤖";

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    message.appendChild(avatar);
    message.appendChild(bubble);
    chatArea.appendChild(message);

    let index = 0;

    const typing = setInterval(function () {
        bubble.textContent = text.substring(0, index);
        index++;

        chatArea.scrollTop = chatArea.scrollHeight;

        if (index > text.length) {
            clearInterval(typing);
        }
    }, 15);
}
// ========================================
// MENCARI JAWABAN DARI DATABASE
// ========================================

function getAnswer(question) {
    const q = question.toLowerCase().trim();

    // SAPAAN
    if (
        q === "halo" ||
        q === "hai" ||
        q === "hi" ||
        q.includes("selamat pagi") ||
        q.includes("selamat siang") ||
        q.includes("selamat sore") ||
        q.includes("selamat malam")
    ) {
        return "Halo 👋 Saya Dudukue AI. Ada yang ingin kamu tanyakan tentang SMK Insan Nur Muhammad?";
    }

    // NAMA SEKOLAH
    if (
        q.includes("nama sekolah") ||
        q === "sekolah" ||
        q.includes("sekolah ini namanya")
    ) {
        return "Nama sekolah adalah " + sekolah.nama + ".";
    }

    // KEPALA SEKOLAH
    if (
        q.includes("kepala sekolah") ||
        q.includes("kepsek")
    ) {
        return "Kepala sekolah adalah " + sekolah.kepalaSekolah + ".";
    }

    // NPSN
    if (q.includes("npsn")) {
        return "NPSN sekolah adalah " + sekolah.npsn + ".";
    }

    // ALAMAT
    if (
        q.includes("alamat sekolah") ||
        q.includes("sekolah dimana") ||
        q.includes("lokasi sekolah") ||
        q.includes("letak sekolah")
    ) {
        return "Alamat sekolah adalah " + sekolah.alamat + ".";
    }

    // STATUS DAN AKREDITASI
    if (
        q.includes("akreditasi") ||
        q.includes("status sekolah")
    ) {
        return "SMK Insan Nur Muhammad merupakan sekolah " +
            sekolah.status.toLowerCase() +
            " dengan akreditasi " +
            sekolah.akreditasi +
            ".";
    }

    // YAYASAN
    if (
        q.includes("yayasan") ||
        q.includes("naungan sekolah")
    ) {
        return "Sekolah berada di bawah naungan " +
            sekolah.yayasan +
            ".";
    }

    // SEJARAH SEKOLAH
    if (
        q.includes("sejarah sekolah") ||
        q.includes("sekolah berdiri") ||
        q.includes("didirikan") ||
        q.includes("tahun berdiri")
    ) {
        return sekolah.sejarah;
    }

    // PASKIBRA
    if (
        q.includes("paskibra") ||
        q.includes("pasukan paskibra")
    ) {
        return sekolah.paskibra;
    }

    // PRAMUKA
    if (
        q.includes("pramuka") ||
        q.includes("ambalan")
    ) {
        return sekolah.pramuka;
    }

    // KETUA OSIS
    if (
        q.includes("ketua osis") ||
        q.includes("ketua osis sekarang")
    ) {
        const daftarKetua = sekolah.osis.ketua;

        return "Data ketua OSIS:\n\n" +
            daftarKetua.map(function (item) {
                return "👨‍🎓 " + item.nama +
                    " (" + item.periode + ")";
            }).join("\n");
    }

    // SEJARAH OSIS
    if (
        q.includes("sejarah osis") ||
        q.includes("tentang osis")
    ) {
        return sekolah.osis.sejarah;
    }

    // EKSTRAKURIKULER
    if (
        q.includes("ekstrakurikuler") ||
        q.includes("ekskul") ||
        q.includes("kegiatan ekstrakurikuler")
    ) {
        return "Ekstrakurikuler yang tersedia:\n\n" +
            sekolah.ekstrakurikuler.map(function (item) {
                return "🏫 " + item;
            }).join("\n");
    }

    // JAWABAN JIKA TIDAK DITEMUKAN
    return "Maaf, saya belum memiliki informasi tentang pertanyaan tersebut. Silakan tanyakan informasi mengenai SMK Insan Nur Muhammad.";
}
// ========================================
// MENGIRIM PESAN
// ========================================

function sendMessage() {
    const question = questionInput.value.trim();

    if (question === "") {
        return;
    }

    // Tampilkan pesan pengguna
    addMessage(question, "user");

    // Kosongkan kotak input
    questionInput.value = "";

    // Cari jawaban
    const answer = getAnswer(question);

    // Beri sedikit jeda agar terasa seperti AI sedang berpikir
    setTimeout(function () {
        addTypingMessage(answer);
    }, 400);
}

// ========================================
// ENTER UNTUK MENGIRIM PESAN
// ========================================

questionInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

// ========================================
// FOKUS KE KOLOM PERTANYAAN
// ========================================

questionInput.focus();