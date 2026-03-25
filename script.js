document.addEventListener('DOMContentLoaded', () => {
    // Selector cho section B4
    const introSection = document.querySelector('.b4-2024-2027');
    if (introSection) {
        window.scrollTo({
            top: introSection.offsetTop - 60,
            behavior: 'smooth'
        });
    }

    // 1. Hiệu ứng cuộn trang (Scroll Animation)
    // Sử dụng Intersection Observer để biết khi nào ảnh xuất hiện trên màn hình
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Khi 10% phần tử xuất hiện thì kích hoạt
    };

    try {
        const observer = new IntersectionObserver((entries, observerRef) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observerRef.unobserve(entry.target); // Chỉ chạy 1 lần
                }
            });
        }, observerOptions);

        const photos = document.querySelectorAll('.fade-in');
        photos.forEach(photo => {
            observer.observe(photo);
        });
    } catch (e) {
        console.warn('IntersectionObserver not supported or failed:', e);
    }
    
  // --- 4. CHATBOT LOGIC ---
    const chatBtn = document.getElementById('chat-toggle-btn');
    const chatBox = document.getElementById('chat-box');
    const closeChat = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatContent = document.getElementById('chat-content');

    // Mở/Đóng chat
    if(chatBtn) {
        chatBtn.addEventListener('click', () => {
            chatBox.style.display = (chatBox.style.display === 'flex') ? 'none' : 'flex';
        });
    }
    
    if(closeChat) {
        closeChat.addEventListener('click', () => {
            chatBox.style.display = 'none';
        });
    }

    // Hàm thêm tin nhắn vào khung
    function addMessage(text, isUser) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        msgDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        msgDiv.textContent = text;
        chatContent.appendChild(msgDiv);
        chatContent.scrollTop = chatContent.scrollHeight; // Tự cuộn xuống dưới
    }

    // Hàm xử lý trả lời (TRÍ TUỆ CỦA BOT Ở ĐÂY)
    function handleChat() {
        const text = userInput.value.trim();
        if (text === "") return;

        // 1. Hiện tin nhắn người dùng
        addMessage(text, true);
        userInput.value = '';

        // 2. Bot suy nghĩ và trả lời (Delay 0.5s cho giống thật)
        setTimeout(() => {
            let reply = "";
            let lowerText = text.toLowerCase();

            // --- TỪ ĐIỂN CỦA BOT (Bạn tự thêm vào đây nhé) ---
            if (lowerText.includes("xin chào") || lowerText.includes("hello") || lowerText.includes("hi")) {
                reply = "Hello cậu! Nay đi học có gì vui không?";
            } 
            else if (lowerText.includes("anh") || lowerText.includes("tiếng anh")) {
                reply = "Cố lên! bạn có thể 11đ anh. Nhớ học từ vựng mỗi ngày nhé!";
            }
            else if (lowerText.includes("buồn") || lowerText.includes("chán")) {
                reply = "Đừng buồn, bật nhạc ở góc phải lên nghe cho chill đi cậu!";
            }
            else if (lowerText.includes("lớp trưởng")) {
                reply = "À, cái bạn hay đòi tiền quỹ lớp đó hả? ^^";
            }
            else if (lowerText.includes("crush")) {
                reply = "Suỵt! Bí mật này tớ sẽ giữ kín cho cậu.";
            }
            else {
                reply = "Xin lỗi, tớ chưa hiểu ý cậu. Cậu có thể hỏi về học tập, hay tâm trạng của cậu nhé!";
            }
            
            addMessage(reply, false);
        }, 500);
    }

    // Sự kiện click nút gửi
    if(sendBtn) {
        sendBtn.addEventListener('click', handleChat);
    }

    // Sự kiện nhấn Enter để gửi
    if(userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChat();
        });
    }
   
    const searchInput = document.getElementById("searchInput");
    const table = document.getElementById("classTable");

    // Kiểm tra xem các thành phần có tồn tại không trước khi chạy
    if (searchInput && table) {
        const tr = table.getElementsByTagName("tr");

        // Lắng nghe sự kiện khi người dùng gõ phím
        searchInput.addEventListener("input", function() {
            let filter = this.value.toUpperCase(); // Lấy giá trị ô tìm kiếm
            
            // Duyệt qua tất cả các hàng (trừ hàng tiêu đề index 0)
            for (let i = 1; i < tr.length; i++) {
                // Lấy cột Họ Tên (index 0)
                let tdName = tr[i].getElementsByTagName("td")[0];
                
                if (tdName) {
                    let txtValue = tdName.textContent || tdName.innerText;
                    
                    // Kiểm tra xem tên có chứa từ khóa không
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = ""; // Hiện dòng
                    } else {
                        tr[i].style.display = "none"; // Ẩn dòng
                    }
                }
            }
            console.log("Đang tìm kiếm: " + filter); // Bạn có thể nhấn F12 để xem dòng này chạy
        });
    } else {
        console.error("Lỗi: Không tìm thấy ô Search hoặc Bảng trong HTML!");
    }
    
});
function scrollSlider(direction) {
    const slider = document.getElementById('memorySlider');
    const scrollAmount = 340; // Khoảng cách trượt (320px ảnh + 20px khoảng cách)
    
    if (direction === 1) {
        slider.scrollLeft += scrollAmount;
    } else {
        slider.scrollLeft -= scrollAmount;
    }
}