
// Hàm chức năng chuyển trang
function fn_ScreenChange(scr_1, scr_2,scr_3)
{
    document.getElementById(scr_1).style.visibility = 'visible';   // Hiển thị trang được chọn
    document.getElementById(scr_2).style.visibility = 'hidden';    // Ẩn trang 
    document.getElementById(scr_3).style.visibility = 'hidden'; 
    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////// YÊU CẦU DỮ LIỆU TỪ SERVER- REQUEST DATA //////////////
var myVar = setInterval(myTimer, 100);
function myTimer() {
    socket.emit("Client-send-data", "Request data client");
    fn_GetCurrentDateTime();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fn_SymbolStatus(ObjectID, SymName, Tag)
{
    var imglink_0 = "images/Symbol/" + SymName + "_0.png"; // Trạng thái tag = 0
    var imglink_1 = "images/Symbol/" + SymName + "_1.png"; // Trạng thái tag = 1
    var imglink_2 = "images/Symbol/" + SymName + "_2.png"; // Trạng thái tag = 2
    var imglink_3 = "images/Symbol/" + SymName + "_3.png"; // Trạng thái tag = 3
    var imglink_4 = "images/Symbol/" + SymName + "_4.png"; // Trạng thái tag = 4

    socket.on(Tag, function(data){
        if (data == 0)
        {
            document.getElementById(ObjectID).src = imglink_0;
        } 
        //tao 1 bien co ten imglink_0 de tao duong link dan den anh cua symbol, voi trang thai 0.
        //luu y khi dat ten anh symbol phai theo nguyen tac_0 o cuoi cung
        else if (data == 1)
        {
            document.getElementById(ObjectID).src = imglink_1;
        }
        else if (data == 2)
        {
            document.getElementById(ObjectID).src = imglink_2;
        }
        else if (data == 3)
        {
            document.getElementById(ObjectID).src = imglink_3;
        }
        else if (data == 4)
        {
            document.getElementById(ObjectID).src = imglink_4;
        }
        else
        {
            document.getElementById(ObjectID).src = imglink_0;
        } 
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Hàm hiển thị màu nút nhấn
function fn_btt_Color(tag, bttID, on_Color, off_Color){
    //tao ham chuc nang doi mau nut nhan co ten fn_btt_Color voi cac gia tri dau vao la ten tag
    //Id nut nhan, mau khi tag co gia tri 1(on_Color), mau khi tag co gia tri 0 (off_Color)
    socket.on(tag,function(data){
        //socket doc du lieu tag tu server
        if(data == true){
            document.getElementById(bttID).style.backgroundColor = on_Color;
        } else{
            document.getElementById(bttID).style.backgroundColor = off_Color; 
        }
      });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Hàm hiển thị dữ liệu lên IO Field
function fn_IOFieldDataShow(tag, IOField, tofix){
    socket.on(tag,function(data){
        if(tofix == 0){
            document.getElementById(IOField).value = data;
        } else{
        document.getElementById(IOField).value = data.toFixed(tofix);
        }
    });
}

//Chuong trinh con dau mau slidebar
function fn_Button_Status(ObjectID, Oncolor, Offcolor, Tag) {
    socket.on(Tag, function (data) {
        if(data == onclick) {
         document.getElementById(ObjectID).style.backgroundColor = Oncolor;
     } else {
         document.getElementById(ObjectID).style.backgroundColor = Offcolor;
     }
    });
}
// <script>fn_Button_Status('btt_scrAuto_btt_Auto', 'red','whitesmoke','Q_Lamp_Auto' );</script>
//ham chuc nang thoi gian
function fn_GetCurrentDateTime() {
    var dt = new Date();
    var YR = dt.getFullYear();
    var MNTH = ('0' + (dt.getMonth() + 1)).slice(-2);
    var DY = ('0' + dt.getDate()).slice(-2);
    var HR = ('0' + dt.getHours()).slice(-2);
    var MNT = ('0' + dt.getMinutes()).slice(-2);
    var SCND = ('0' + dt.getSeconds()).slice(-2);
    var currentDate = DY + '/' + MNTH + '/' + YR;
    var currentTime = HR + ':' + MNT + ':' + SCND;
    document.getElementById('lbl_Date').innerHTML = currentDate;
    document.getElementById('lbl_Time').innerHTML = currentTime;
    }

// Chương trình kiểm tra trạng thái kết nối qua watchdog
var plc_connect_ok = false;
var watchdog_value_old;
var watchdog_count = 0;
function fn_CheckPlcConnect(Label_Id, tag) {
    socket.on(tag, function (data) { //socket doc du lieu tag tu server
    watchdog_count += 1;
    // 20* timer 100 ms = 2000ms = 2 giây check 1 lần
    if (watchdog_count >= 20) {
    var WatchDog = data;
    if (WatchDog != watchdog_value_old) {
    plc_connect_ok = true;
    } else {
    plc_connect_ok = false;
    }
    watchdog_value_old = WatchDog;
    watchdog_count = 0;
    // Hiển thị
    if (plc_connect_ok == true) {
    document.getElementById(Label_Id).innerHTML = 'PLC ĐÃ KẾT NỐI';
    //tac dong vao tat ca cac label_id
    document.getElementById(Label_Id).style.backgroundColor = 'lime';
    }
    else {
    document.getElementById(Label_Id).innerHTML = 'PLC MẤT KẾT NỐI';
    document.getElementById(Label_Id).style.backgroundColor = 'red';
    }
    }
    });
    }