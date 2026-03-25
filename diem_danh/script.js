function diemDanh(isAbsent) {
    var name = document.getElementById("studentName").value;
    
    if (name.trim() === "") {
        alert("Vui lòng nhập tên của bạn!");
        return;
    }

    if (isAbsent) {
        addToList(name);
        alert("Đã ghi nhận: " + name + " vắng mặt hôm nay.");
    } else {
        alert("Đã ghi nhận: " + name + " có mặt.");
    }
    
    document.getElementById("studentName").value = "";
}

function addToList(name) {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    var date = today.getDate() + "/" + (today.getMonth() + 1);

    var li = document.createElement("li");
    li.innerHTML = `<strong>${name}</strong> <span class="time-stamp">${time} - ${date}</span>`;

    document.getElementById("list-day").appendChild(li.cloneNode(true));
    document.getElementById("list-week").appendChild(li.cloneNode(true));
    document.getElementById("list-month").appendChild(li);
}