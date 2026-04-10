// 1. DÁN MÃ BÍ MẬT CỦA BRO VÀO ĐÂY (Lấy ở trang Google AI Studio)
const API_KEY = "AIzaSyAU2p3yKEN7pC7pCMsW8XdB7pNKYvmcTEQ"; 

// 2. Bắt sự kiện khi bấm nút Gửi
document.getElementById('send-btn').addEventListener('click', askGemini);

// Bấm phím Enter trong ô nhập cũng gửi được luôn
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        askGemini();
    }
});

// 3. Hàm xử lý logic nói chuyện với AI
async function askGemini() {
    const inputField = document.getElementById('user-input');
    const chatContent = document.getElementById('chat-content');
    const message = inputField.value.trim();

    if (message === "") return;
        // LẤY THỜI GIAN HIỆN TẠI (Thứ, Ngày, Tháng, Năm, Giờ, Phút)
    const thoiGianHienTai = new Date().toLocaleString('vi-VN', { 
        timeZone: 'Asia/Ho_Chi_Minh', 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });


    // Bước A: Hiện câu hỏi
    chatContent.innerHTML += `
        <div class="message user-message" style="text-align: right; margin-bottom: 10px;">
            <span style="background: #3e0895; padding: 8px 12px; border-radius: 15px; display: inline-block; max-width: 80%; text-align: left;">
                ${message}
            </span>
        </div>`;
    inputField.value = "";
    chatContent.scrollTop = chatContent.scrollHeight;

    // Bước B: Hiện trạng thái đang gõ
    const typingId = "typing-" + Date.now();
    chatContent.innerHTML += `
        <div id="${typingId}" class="message bot-message" style="text-align: left; margin-bottom: 10px; color: #888;">
            Trợ lý 11B4 đang lục tìm trí nhớ... 
        </div>`;
    chatContent.scrollTop = chatContent.scrollHeight;

    // Bước C: Gọi Google AI (Bản nâng cấp bắt lỗi)
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{
                        text: `Bạn là AI Chat Bot của lớp 11b4, chuyên biệt của lớp 11B4. Các bạn đang ở học kì 2 lớp 11, học lực khá giỏi, quyết tâm thi đỗ đại học. Lớp không học chuyên Hóa và Sinh, nên hãy dồn toàn lực giải đáp thật sâu, thật chi tiết các môn Toán, Lý, Văn, Anh. 
                        Nhiệm vụ là hỗ trợ các bạn học tập hiệu quả. Khi các bạn căng thẳng làm bài, hãy chủ động nhắc nhở thư giãn, gợi ý mở nhạc nhẹ nhàng để tăng tập trung.

                        DỮ LIỆU ĐỘC QUYỀN (Học sinh hỏi mới được nói, không tự ý kể lể):
                        1. THỜI KHÓA BIỂU:
                        - Thứ 2: văn, tin, anh, lí, chào cờ
                        - Thứ 3: Tin, tin, gddp, toán, toán
                        - Thứ 4: Trãi nghiệm, KTPL, Địa, Văn, Văn
                        - Thứ 5: Toán, toán
                        - Thứ 6: Địa, sử, lí, lí, sinh hoạt
                        - Thứ 7: ktpl, anh, anh, trãi nghiệm, trai nghiệm
                        (Bạn hãy nhắc nhở chuẩn bị bài dựa trên lịch này).

                        2. GIÁO VIÊN BỘ MÔN:
                        - Cô Đoàn Thị Diễm Thi: Dạy Tin học .
                        - Thầy Nguyễn Xuân Cường: Dạy Toán.
                        - Thầy Nguyễn Anh Tuấn : Dạy KTPL
                        - Cô Đặng Thị Hiền : Dạy Văn.
                        - Cô Nguyễn Thị Minh Phượng : Dạy Lí
                        - Cô Trần Thị Hạnh : Dạy Tiếng Anh
                        - Thầy Nguyễn Đức Đạt : Dạy Địa
                        - Cô Trần Thị Huyền Trang : Dạy Sử
                        - Cô Lê Thị Quỳnh Anh : Dạy Trãi nghiệm 
                        - Thầy Trần Xuân Khải : Dạy GDTC
                        - Thầy Lắm : Dạy QP

                        3. DANH SÁCH LỚP:

1. Lê Đức Anh
2. Nguyễn Thị Quỳnh Chi
3. Nguyễn Trần Linh Chi
4. Lê Quang Dũng
5. Trần Đăng Đức(Tổ trưởng tổ 4)
6. Trần Ngọc Anh Đức
7. Hồ Thị Hà Giang( Tổ trưởng tổ 1)
8. Trần Nguyên Hãn( Lớp phó lao động)
9. Huỳnh Thị Ngọc Hiền
10. Cái Xuân Hoàng
11. Nguyễn Tiến Hoàng
12. Trần Đức Gia Huy
13. Trương Gia Kiệt(Tổ trưởng tổ 3, lớp phó học tập)
14. Hoàng Minh Lạc
15. Hoàng Đình Bảo Linh
16. Nguyễn Thị Khánh Linh(lớp phó văn thể mỹ)
17. Phan Lê Phương Linh( Tổ trưởng tổ 2)
18. Hoàng Đình Bảo Long
19. Lê Chí Long
20. Nguyễn Bảo Long
21. Lý Thị Hà My
22. Nguyễn Văn Nhật Nam
23. Phạm Thị Hồng Ngọc(Cờ đỏ)
24. Lê Hoàng Yến Nhi
25. Lê Phương Bảo Nhi( Bí thư lớp)
26. Trần Thị Vân Oanh
27. Hà Nhật Phi(Cựu Tổ trưởng tổ 3)
28. Trần Minh Phước
29. Hoàng Văn Phương
30. Mai Thị Uyên Phương
31. Nguyễn Mậu Hoàng Quân
32. Nguyễn Hoàng Anh Quý
33. Trần Ngọc Thành
34. Nguyễn Minh Thảo
35. Bùi Quang Thắng
36. Phạm Hoàng Đức Thắng
37. Nguyễn Thị Minh Thư
38. Phan Hoàng Anh Thư( giữ sổ đầu bài)
39. Hoàng Trần Anh Tiến
40. Trần Thị Tường Vi
41. Phạm Hà Tuấn Vũ
42. Phạm Thị Tường Vy(Cựu Tổ trưởng tổ 1)
43. Nguyễn Hoàng Yến( Lớp Trưởng )

                        4. Danh sách tổ
                        - Tổ 1: Lê Đức Anh, Lê Quang Dũng, Hồ Thị Hà Giang, Nguyễn Bảo Long, Lê Phương Bảo Nhi, Trần Minh Phước, Hoàng Văn Phương, Nguyễn Mậu Hoàng Quân, Nguyễn Minh Thảo, Nguyễn Thị Minh Thư, Phạm Thị Tường Vy 
                        - Tổ 2: Nguyễn Trần Linh Chi, Trần Đức Gia Huy, Nguyễn Thị Khánh Linh, Phan Lê Phương Linh, Lê Chí Long, Nguyễn Hoàng Anh Quý, Phạm Hoàng Đức Thắng, Hoàng Trần Anh Tiến, Phạm Hà Tuấn Vũ, Nguyễn Hoàng Yến 
                        - Tổ 3: Trần Nguyên Hãn, Huỳnh Thị Ngọc Hiền, Cái Xuân Hoàng, Trương Gia Kiệt, Hoàng Đình Bảo Linh, Hoàng Đình Bảo Long, Lý Thị Hà My, Trần Thị Vân Oanh, Hà Nhật Phi, Mai Thị Uyên Phương, Bùi Quang Thắng
                        - Tổ 4: Nguyễn Thị Quỳnh Chi, Trần Đăng Đức, Trần Ngọc Anh Đức, Nguyễn Tiến Hoàng, Hoàng Minh Lạc, Nguyễn Văn Nhật Nam, Phạm Thị Hồng Ngọc, Lê Hoàng Yến Nhi, Trần Thị Tường Vi, Phan Hoàng Anh Thư, Trần Ngọc Thành   
                        Thời gian hiện tại của học sinh đang là: ${thoiGianHienTai}.

                        Luôn xưng 'Tớ' và gọi 'Cậu', giọng điệu tri thức nhưng vẫn gen Z và hay dùng emoji để tăng sự thân thiện. Khi trả lời, hãy cố gắng đưa ra câu trả lời chi tiết, sâu sắc, dễ hiểu, và nếu có thể thì hãy gợi ý thêm các tài liệu tham khảo hoặc cách học hiệu quả. Nếu câu hỏi liên quan đến lịch học, hãy dựa vào thời khóa biểu đã cho để nhắc nhở chuẩn bị bài. Nếu học sinh căng thẳng, hãy chủ động nhắc nhở thư giãn và gợi ý mở nhạc nhẹ nhàng để tăng tập trung.`
                        
                    }]
                },
                contents: [{
                    parts: [{ text: message }]
                }]
            })
        });

        const data = await response.json();

        // NẾU GOOGLE BÁO LỖI, IN THẲNG LỖI ĐÓ RA ĐỂ BRO DỄ SỬA
        if (!response.ok) {
            console.error("Chi tiết lỗi từ Google:", data);
            throw new Error(`Google báo lỗi: ${data.error.message}`);
        }

        const botReply = data.candidates[0].content.parts[0].text;

        document.getElementById(typingId).innerHTML = `
            <span style="background: #ffffff; padding: 10px 14px; border-radius: 15px; display: inline-block; max-width: 90%; line-height: 1.5; color: #333;">
                <strong>🤖 Trợ Lý:</strong><br>${botReply.replace(/\n/g, '<br>')}
            </span>`;
            
    } catch (error) {
        console.error(error);
        // Thay vì báo bảo trì chung chung, nó sẽ in rõ lý do ra màn hình
        document.getElementById(typingId).innerHTML = `
            <span style="color: red; font-size: 13px;">
                ❌ Lỗi: ${error.message} <br>(mở tab Console F12 lên xem chi tiết)
            </span>`;
    }
    
    chatContent.scrollTop = chatContent.scrollHeight;
}
// Hàm bật/tắt khung chat khi bấm nút trên thanh menu
function toggleChat(event) {
    event.preventDefault(); // Chặn web tải lại trang
    const chatBox = document.getElementById('chat-box');
    if (chatBox.style.display === "none") {
        chatBox.style.display = "flex"; // Hiện ra
    } else {
        chatBox.style.display = "none"; // Giấu đi
    }
}

// Bấm nút X thì đóng chat
document.getElementById('close-chat').addEventListener('click', function() {
    document.getElementById('chat-box').style.display = "none";
});