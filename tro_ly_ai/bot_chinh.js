const API_KEY = "AIzaSyAU2p3yKEN7pC7pCMsW8XdB7pNKYvmcTEQ"; 

document.getElementById('send-btn').addEventListener('click', askGeminiPro);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') askGeminiPro();
});

async function askGeminiPro() {
    const inputField = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
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

    // Khóa nút
    inputField.disabled = true;
    sendBtn.disabled = true;
    sendBtn.innerText = "Đang nghĩ...";

    // In câu hỏi
    chatContent.innerHTML += `
        <div class="message user-message">
            <div class="msg-bubble">${message}</div>
        </div>`;
    inputField.value = "";
    chatContent.scrollTop = chatContent.scrollHeight;

    // In trạng thái gõ
    const typingId = "typing-" + Date.now();
    chatContent.innerHTML += `
        <div class="message bot-message" id="${typingId}">
            <div class="msg-bubble" style="color: #888;">Gia sư đang lục tìm dữ liệu lớp... </div>
        </div>`;
    chatContent.scrollTop = chatContent.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                
                // 🧠 BỘ NÃO SIÊU VIỆT CỦA BẢN FULL Ở ĐÂY:
                system_instruction: {
                    parts: [{
                        text: `Bạn là AI limited edition của lớp 11b4, chuyên biệt của lớp 11B4. Các bạn đang ở học kì 2 lớp 11, học lực khá giỏi, quyết tâm thi đỗ đại học. Lớp không học chuyên Hóa và Sinh, nên hãy dồn toàn lực giải đáp thật sâu, thật chi tiết các môn Toán, Lý, Văn, Anh. 
                        Nhiệm vụ là hỗ trợ các bạn học tập hiệu quả. Khi các bạn căng thẳng làm bài, hãy chủ động nhắc nhở thư giãn, gợi ý mở nhạc để tăng tập trung.

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
                3. Ban Giám Hiệu:
                        - Cô Tuyết (Hiệu trưởng): Cô rất nghiêm khắc nhưng vui tính, hoà đồng và đặc biệt cô rất đẹp gái, cực kì quan tâm đến tất cả học sinh trong trường THPT Chế Lan Viên.
                        - Cô Tân (Phó hiệu trưởng): cô rất hiểu học sinh và thân thiện, dáng người slimfit
                        - Thầy Ngọc Cường (Phó hiệu trưởng): thầy đẹp trai, tận tâm với công việc và có nhiều tài lẽ, đặc biệt hát hay.
                        - Thầy Thành ( Bí thư Đoàn trường): vui vẻ, hoà đồng nhưng nghiêm khắc, có tài ăn nói và rất quan tâm đến học sinh.

                        4. DANH SÁCH LỚP:

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

                        Luôn xưng 'Tớ' và gọi 'Cậu', giọng điệu tri thức nhưng vẫn gen Z và hay dùng emoji để tăng sự thân thiện. Khi trả lời, hãy cố gắng đưa ra câu trả lời chi tiết, sâu sắc, dễ hiểu, và nếu có thể thì hãy gợi ý thêm các tài liệu tham khảo hoặc cách học hiệu quả. Nếu câu hỏi liên quan đến lịch học, hãy dựa vào thời khóa biểu đã cho để nhắc nhở chuẩn bị bài. Nếu học sinh căng thẳng, hãy chủ động nhắc nhở thư giãn và gợi ý mở nhạc để tăng tập trung.`
                        
                    }]
                },
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error.message);

        const botReply = data.candidates[0].content.parts[0].text;
        
        // In câu trả lời
        document.getElementById(typingId).innerHTML = `
            <div class="msg-bubble">
                <strong>🤖 AI Limited edition 11b4:</strong><br>${botReply.replace(/\n/g, '<br>')}
            </div>`;
            
    } catch (error) {
        document.getElementById(typingId).innerHTML = `
            <div class="msg-bubble" style="color: red;">❌ Hệ thống đang bận xíu, cậu đợi 5 giây rồi gõ lại nhé!</div>`;
    } finally {
        inputField.disabled = false;
        sendBtn.disabled = false;
        sendBtn.innerText = "Gửi";
        inputField.focus();
    }
    chatContent.scrollTop = chatContent.scrollHeight;
}
