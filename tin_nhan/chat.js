// 1. CẤU HÌNH FIREBASE CỦA 11B4
const firebaseConfig = {
    apiKey: "AIzaSyBbKimBMfmQCcjop8iYtEc9pZxZXJ99eFA",
    authDomain: "kiniemlopb4.firebaseapp.com",
    databaseURL: "https://kiniemlopb4-default-rtdb.firebaseio.com",
    projectId: "kiniemlopb4",
    storageBucket: "kiniemlopb4.firebasestorage.app",
    messagingSenderId: "21167831387",
    appId: "1:21167831387:web:2a7954e039340875ef827e"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 2. CHÌA KHÓA KHO ẢNH IMGBB (Tui đã dán sẵn cho bro luôn rồi)
const IMGBB_API_KEY = "12dd2b29eeaac94be9c5daf16eeda6b0";

// 3. HỎI TÊN
let tenNguoiDung = prompt("Nhập tên của bạn để vào phòng chat 11B4:");
if (!tenNguoiDung || tenNguoiDung.trim() === "") {
    tenNguoiDung = "Thành viên bí ẩn";
}

// 4. HÀM GỬI TIN NHẮN (Đã nâng cấp để gửi được cả ảnh)
function sendMessage() {
    const input = document.getElementById('msgInput');
    const fileInput = document.getElementById('imageInput'); // Lấy ảnh từ nút chọn file
    
    const text = input.value.trim();
    // Kiểm tra xem HTML có nút chọn file chưa để tránh bị lỗi
    const file = fileInput ? fileInput.files[0] : null;

    if (text === "" && !file) return; 

    // NẾU CÓ CHỌN ẢNH THÌ GỬI ẢNH LÊN IMGBB TRƯỚC
    if (file) {
        const sendBtn = document.querySelector('.send-btn');
        sendBtn.innerText = "Đang tải...";
        sendBtn.disabled = true;

        const formData = new FormData();
        formData.append("image", file);

        fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                const imageUrl = result.data.url;
                db.ref("phong_chat_b4").push({
                    nguoi_gui: tenNguoiDung,
                    noi_dung: imageUrl, 
                    loai: "image",
                    thoi_gian: Date.now()
                });
            } else {
                alert("Tải ảnh thất bại, thử lại xem!");
            }
        })
        .catch(error => {
            console.error("Lỗi:", error);
            alert("Có lỗi xảy ra khi gửi ảnh!");
        })
        .finally(() => {
            sendBtn.innerText = "Gửi";
            sendBtn.disabled = false;
            if(fileInput) fileInput.value = ""; 
        });
    }

    // NẾU CÓ NHẬP CHỮ THÌ GỬI CHỮ
    if (text !== "") {
        db.ref("phong_chat_b4").push({
            nguoi_gui: tenNguoiDung,
            noi_dung: text,
            loai: "text",
            thoi_gian: Date.now()
        });
        input.value = ""; 
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// 5. HIỂN THỊ TIN NHẮN LÊN MÀN HÌNH
db.ref("phong_chat_b4").on("child_added", (snapshot) => {
    const data = snapshot.val();
    const chatBox = document.getElementById('chatBox');
    const div = document.createElement('div');
    
    if (data.nguoi_gui === tenNguoiDung) {
        div.className = "message my-msg";
        if (data.loai === "image") {
            div.innerHTML = `<img src="${data.noi_dung}" style="max-width: 200px; border-radius: 10px;">`;
        } else {
            div.innerHTML = `${data.noi_dung}`;
        }
    } else {
        div.className = "message other-msg";
        if (data.loai === "image") {
            div.innerHTML = `<div class="sender-name">${data.nguoi_gui}</div><img src="${data.noi_dung}" style="max-width: 200px; border-radius: 10px;">`;
        } else {
            div.innerHTML = `<div class="sender-name">${data.nguoi_gui}</div>${data.noi_dung}`;
        }
    }

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
});
// Hàm kiểm tra xem đã chọn ảnh chưa để đổi icon
function checkFile() {
    const fileInput = document.getElementById('imageInput');
    const uploadIcon = document.getElementById('uploadIcon');
    
    // Nếu có file được chọn thì đổi thành dấu ✅, không thì giữ nguyên 🖼️
    if (fileInput.files.length > 0) {
        uploadIcon.innerHTML = "✅";
    } else {
        uploadIcon.innerHTML = "🖼️";
    }
}