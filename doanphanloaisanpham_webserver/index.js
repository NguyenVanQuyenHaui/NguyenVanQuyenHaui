//////////////////////CẤU HÌNH KẾT NỐI KEPWARE////////////////////
const {TagBuilder, IotGateway} = require('kepserverex-js'); 
const tagBuilder = new TagBuilder({ namespace: 'Channel1.Device1' });
const iotGateway = new IotGateway({
    host: '127.0.0.1',
    port: 5000
});
/////////////HÀM ĐỌC/GHI DỮ LIỆU XUỐNG KEPWARE(PLC)//////////////
//Đọc dữ liệu
var tagArr = [];
function fn_tagRead(){
	iotGateway.read(TagList).then((data)=>{
		var lodash = require('lodash');
		tagArr = lodash.map(data, (item) => item.v);
		console.log(tagArr);
	});
}
// Ghi dữ liệu
function fn_Data_Write(tag,data){ 
    tagBuilder.clean();	
    const set_value = tagBuilder
        .write(tag,data)
        .get();
    iotGateway.write(set_value);
}

///////////////////////////ĐỊNH NGHĨA TAG////////////////////////
// Khai báo tag
var Act_SP_Cao 		    = 'Act_SP_Cao';
var Act_SP_TB 	        = 'Act_SP_TB';
var Act_SP_Thap 	    = 'Act_SP_Thap';
var Act_Tong_SP 		= 'Act_Tong_SP';
var btt_Auto 		    = 'btt_Auto';
var btt_Manu 		    = 'btt_Manu';
var btt_Motor_Run 		= 'btt_Motor_Run';
var btt_Motor_Stop 		= 'btt_Motor_Stop';
var btt_Reset 		    = 'btt_Reset';
var btt_Start 	        = 'btt_Start';
var btt_Stop 	        = 'btt_Stop';
var btt_XLC_OFF 		= 'btt_XLC_OFF';
var btt_XLC_ON 		    = 'btt_XLC_ON';
var btt_XLTB_OFF 		= 'btt_XLTB_OFF';
var btt_XLTB_ON 	    = 'btt_XLTB_ON';
var data_Save 	    	= 'data_Save';
var Q_BANG_TAI 		    = 'Q_BANG_TAI';
var Q_Lamp_Auto 		= 'Q_Lamp_Auto';
var Q_Lamp_Manu 		= 'Q_Lamp_Manu';
var Q_Lamp_Start 		= 'Q_Lamp_Start';
var Q_Lamp_Stop 	    = 'Q_Lamp_Stop';
var simu_CB_Cao 		= 'simu_CB_Cao';
var simu_CB_TB 		    = 'simu_CB_TB';
var simu_CB_Thap 		= 'simu_CB_Thap';
var simu_Motor_loi 		= 'simu_Motor_loi';
var Simu_VT_SP 		    = 'Simu_VT_SP';
////////////////////////////////////////////////////////////////////////
var sql_Act_SP_Cao  	= 'sql_Act_SP_Cao';
var sql_Act_SP_TB   	= 'sql_Act_SP_TB';
var sql_Act_SP_Thap 	= 'sql_Act_SP_Thap';
var sql_ACT_TongSP 		= 'sql_ACT_TongSP';
/////////////////////////////////////////////////////////////////////////
var sql_OrderID 	    = 'sql_OrderID';
var status_Motor 	    = 'status_Motor';
var WatchDog 		    = 'WatchDog';
var Xylanh_Cao 	        = 'Xylanh_Cao';
var Xylanh_TB 	    	= 'Xylanh_TB';



// Đọc dữ liệu
const TagList = tagBuilder
.read(Act_SP_Cao) 
.read(Act_SP_TB) 
.read(Act_SP_Thap) 
.read(Act_Tong_SP) 
.read(btt_Auto) 
.read(btt_Manu) 
.read(btt_Motor_Run) 
.read(btt_Motor_Stop) 
.read(btt_Reset) 
.read(btt_Start) 
.read(btt_Stop) 
.read(btt_XLC_OFF) 
.read(btt_XLC_ON) 
.read(btt_XLTB_OFF) 
.read(btt_XLTB_ON) 
.read(data_Save) 
.read(Q_BANG_TAI) 
.read(Q_Lamp_Auto) 
.read(Q_Lamp_Manu) 
.read(Q_Lamp_Start) 
.read(Q_Lamp_Stop) 
.read(simu_CB_Cao) 
.read(simu_CB_TB) 
.read(simu_CB_Thap)
.read(simu_Motor_loi) 
.read(Simu_VT_SP) 
/////////////////////////////////////////////////////////////////////////
.read(sql_Act_SP_Cao) 
.read(sql_Act_SP_TB) 
.read(sql_Act_SP_Thap) 
.read(sql_ACT_TongSP) 
/////////////////////////////////////////////////////////////////////////
.read(sql_OrderID) 
.read(status_Motor) 
.read(WatchDog) 
.read(Xylanh_Cao) 
.read(Xylanh_TB) 

.get();

///////////////////////////QUÉT DỮ LIỆU////////////////////////
// Tạo Timer quét dữ liệu
setInterval(
	() => fn_read_data_scan(),
	2000 //1000ms = 1s
);
 
// Quét dữ liệu
function fn_read_data_scan(){
	fn_tagRead();	
    fn_sql_insert(); // Ghi dữ liệu vào SQL
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// /////////////////////////THIẾT LẬP KẾT NỐI WEB/////////////////////////
var express = require("express"); //goi thu vien express
var app = express(); //goi thu vien express
app.use(express.static("public")); //goi thu vien express
app.set("view engine", "ejs"); 
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

// Home calling

app.get("/", function(req, res){
    res.render("home")
}); 

// ///////////LẬP BẢNG TAG ĐỂ GỬI QUA CLIENT (TRÌNH DUYỆT)///////////
function fn_tag(){ //tao ham chuc nang du lieu tag
    io.sockets.emit("Act_SP_Cao", tagArr[0]);  
    io.sockets.emit("Act_SP_TB", tagArr[1]);
    io.sockets.emit("Act_SP_Thap", tagArr[2]);
    io.sockets.emit("Act_Tong_SP", tagArr[3]);
    io.sockets.emit("btt_Auto", tagArr[4]);
    io.sockets.emit("btt_Manu", tagArr[5]);
    io.sockets.emit("btt_Motor_Run", tagArr[6]);
    io.sockets.emit("btt_Motor_Stop", tagArr[7]);
    io.sockets.emit("btt_Reset", tagArr[8]);
    io.sockets.emit("btt_Start", tagArr[9]);
    io.sockets.emit("btt_Stop", tagArr[10]);
    io.sockets.emit("btt_XLC_OFF", tagArr[11]);
    io.sockets.emit("btt_XLC_ON", tagArr[12]);
    io.sockets.emit("btt_XLTB_OFF", tagArr[13]);
    io.sockets.emit("btt_XLTB_ON", tagArr[14]);
    io.sockets.emit("data_Save", tagArr[15]);
    io.sockets.emit("Q_BANG_TAI", tagArr[16]);
    io.sockets.emit("Q_Lamp_Auto", tagArr[17]);
    io.sockets.emit("Q_Lamp_Manu", tagArr[18]);
    io.sockets.emit("Q_Lamp_Start", tagArr[19]);
    io.sockets.emit("Q_Lamp_Stop", tagArr[20]);
    io.sockets.emit("simu_CB_Cao", tagArr[21]);
    io.sockets.emit("simu_CB_TB", tagArr[22]);
    io.sockets.emit("simu_CB_Thap", tagArr[23]);
    io.sockets.emit("simu_Motor_loi", tagArr[24]);
    io.sockets.emit("Simu_VT_SP", tagArr[25]);
    /////////////////////////////////////////////////////////////////////////
    io.sockets.emit("sql_Act_SP_Cao", tagArr[26]);
    io.sockets.emit("sql_Act_SP_TB", tagArr[27]);
    io.sockets.emit("sql_Act_SP_Thap", tagArr[28]);
    io.sockets.emit("sql_ACT_TongSP", tagArr[29]);
    /////////////////////////////////////////////////////////////////////////
    io.sockets.emit("sql_OrderID", tagArr[30]);
    io.sockets.emit("status_Motor", tagArr[31]);
    io.sockets.emit("WatchDog", tagArr[32]);
    io.sockets.emit("Xylanh_Cao", tagArr[33]);
    io.sockets.emit("Xylanh_TB", tagArr[34]);
 
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ///////////GỬI DỮ LIỆU BẢNG TAG ĐẾN CLIENT (TRÌNH DUYỆT)///////////
io.on("connection", function(socket){ 
     socket.on("Client-send-data", function(data){
    fn_tag();
});});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ++++++++++++++++++++++++++GHI DỮ LIỆU XUỐNG PLC+++++++++++++++++++++++++++
io.on("connection", function(socket){
    // Chọn chế độ tự động
    socket.on("scrAuto_btt_Auto", function(data){
		fn_Data_Write(btt_Auto,data);
	});
     // Chọn chế độ bang tay
     socket.on("scrManu_btt_Manu", function(data){
		fn_Data_Write(btt_Manu,data);
	});
    // Nút nhấn CHẾ độ RESET
    socket.on("scrAuto_btt_Reset", function(data){
		fn_Data_Write(btt_Reset,data);
	});
    // Nút nhấn chế độ STOP CHE DO AUTO
    socket.on("scrAuto_btt_Stop", function(data){
		fn_Data_Write(btt_Stop,data);
	});
     // Nút nhấn chế độ STOP CHE DO MANU
     socket.on("scrManu_btt_Stop", function(data){
		fn_Data_Write(btt_Stop,data);
	});
     // Nút nhấn chế độ START CHE DO AUTO
     socket.on("scrAuto_btt_Start", function(data){
		fn_Data_Write(btt_Start,data);
	});
     // Nút nhấn chế độ START CHE DO MANU
     socket.on("scrManu_btt_Start", function(data){
		fn_Data_Write(btt_Start,data);
	});

     // Nút nhấn chế độ XUẤT DỮ LIỆU
     socket.on("scrAuto_data_Save", function(data){
		fn_Data_Write(data_Save,data);
	});
    // Nút nhấn  chế độ MO PHONG TRANG THAI TRUNG BINH
    socket.on("scrAuto_simu_CB_TB", function(data){
        fn_Data_Write(simu_CB_TB,data);
    });
     //Nút nhấn  chế độ MO PHONG TRANG THAI CAO
     socket.on("scrAuto_simu_CB_Cao", function(data){
        fn_Data_Write(simu_CB_Cao,data);
    });
     // Nút nhấn chế độ MO PHONG TRANG THAI THAP
     socket.on("scrAuto_simu_CB_Thap", function(data){
        fn_Data_Write(simu_CB_Thap,data);
    });
    // Nút nhấn chế độ  XLC ON
    socket.on("scrManu_btt_XLC_ON", function(data){
        fn_Data_Write(btt_XLC_ON,data);
    });
     // Nút nhấn chế độ  XLC OFF
     socket.on("scrManu_btt_XLC_OFF", function(data){
        fn_Data_Write(btt_XLC_OFF,data);
    });
     // Nút nhấn chế độ XLTB ON 
     socket.on("scrManu_btt_XLTB_ON", function(data){
        fn_Data_Write(btt_XLTB_ON,data);
    });
    // Nút nhấn chế độ XLTB OFF
    socket.on("scrManu_btt_XLTB_OFF", function(data){
        fn_Data_Write(btt_XLTB_OFF,data);
    });
     // Nút nhấn chế độ MOTOR START
     socket.on("scrManu_btt_Motor_Run", function(data){
        fn_Data_Write(btt_Motor_Run,data);
    });
     // Nút nhấn chế độ MOTOR STOP
     socket.on("scrManu_btt_Motor_Stop", function(data){
        fn_Data_Write(btt_Motor_Stop,data);
    });
    // Nút nhấn chế độ MOTOR loi
     socket.on("scrManu_simu_Motor_loi", function(data){
        fn_Data_Write(simu_Motor_loi,data);
    });
});
// Khai báo SQL
var mysql = require('mysql');
var sqlcon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "sql_plc",
  dateStrings:true
});

// Ghi dữ liệu vào SQL 
var sqlins_done = false; // Biến báo đã ghi xong dữ liệu
function fn_sql_insert(){
    var data_Save = tagArr[15];  // Trigger đọc về từ PLC
    var sqltable_Name = "plc_data";
    // Lấy thời gian hiện tại
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //Vùng Việt Nam (GMT7+)
    var temp_datenow = new Date();
    var timeNow = (new Date(temp_datenow - tzoffset)).toISOString().slice(0, -1).replace("T"," ");
    var timeNow_toSQL = "'" + timeNow + "',";
 
    // Dữ liệu đọc lên từ các tag
    var sql_Act_SP_Cao =     "'" + tagArr[26] + "',";
    var sql_Act_SP_TB =  "'" + tagArr[27] + "',";
    var sql_Act_SP_Thap =     "'" + tagArr[28] + "',";
    var sql_ACT_TongSP =     "'" + tagArr[29] + "'";
    // Ghi dữ liệu vào SQL

    if (data_Save == true & data_Save != sqlins_done)
    {
        var sqlins1 = "INSERT INTO " 
                    + sqltable_Name 
                    + " (Datetime , Actual_SP_Cao, Actual_SP_TB,Actual_SP_Thap,Actual_Tong_SP) VALUES (";
        var sqlins2 = timeNow_toSQL 
                    + sql_Act_SP_Cao 
                    + sql_Act_SP_TB
                    + sql_Act_SP_Thap
                    + sql_ACT_TongSP
                    ;
        var sqlins = sqlins1 + sqlins2 + ");";
        // Thực hiện ghi dữ liệu vào SQL
        sqlcon.query(sqlins, function (err, result) {
            if (err) {
                console.log(err);
             } else {
                console.log("SQL - Ghi dữ liệu thành công");
              } 
            });
    }
    sqlins_done = data_Save;
}

// Đọc dữ liệu từ SQL
io.on("connection", function(socket){
    socket.on("msg_SQL_Show", function(data)
    {
        var sqltable_Name = "plc_data";
        var query = "SELECT * FROM " + sqltable_Name + ";" 
        sqlcon.query(query, function(err, results, fields) {
            if (err) {
                console.log(err);
            } else {
                const objectifyRawPacket = row => ({...row});
                const convertedResponse = results.map(objectifyRawPacket);
                socket.emit('SQL_Show', convertedResponse);
            } 
        });
    });
    });
// Mảng xuất dữ liệu Excel
var SQL_Excel = [];  // Dữ liệu Excel
// Tìm kiếm dữ liệu SQL theo khoảng thời gian
io.on("connection", function(socket){
    socket.on("msg_SQL_ByTime", function(data)
    {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset time Việt Nam (GMT7+)
        // Lấy thời gian tìm kiếm từ date time piker
        var timeS = new Date(data[0]); // Thời gian bắt đầu
        var timeE = new Date(data[1]); // Thời gian kết thúc
        // Quy đổi thời gian ra định dạng cua MySQL
        var timeS1 = "'" + (new Date(timeS - tzoffset)).toISOString().slice(0, -1).replace("T"," ") + "'";
        var timeE1 = "'" + (new Date(timeE - tzoffset)).toISOString().slice(0, -1).replace("T"," ") + "'";
        var timeR = timeS1 + "AND" + timeE1; // Khoảng thời gian tìm kiếm (Time Range)
 
        var sqltable_Name = "plc_data"; // Tên bảng
        var dt_col_Name = "Datetime";  // Tên cột thời gian
 
        var Query1 = "SELECT * FROM " + sqltable_Name + " WHERE "+ dt_col_Name + " BETWEEN ";
        var Query = Query1 + timeR + ";";
        
        sqlcon.query(Query, function(err, results, fields) {
            if (err) {
                console.log(err);
            } else {
                const objectifyRawPacket = row => ({...row});
                const convertedResponse = results.map(objectifyRawPacket);
                SQL_Excel = convertedResponse; // Xuất báo cáo Excel
                socket.emit('SQL_ByTime', convertedResponse);
            } 
        });
    });
});

const Excel = require('exceljs');
const { CONNREFUSED } = require('dns');
function fn_excelExport(){
    // =====================CÁC THUỘC TÍNH CHUNG=====================
        // Lấy ngày tháng hiện tại
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let day = date_ob.getDay();
        var dayName = '';
        if(day == 0){dayName = 'Chủ nhật,'}
        else if(day == 1){dayName = 'Thứ hai,'}
        else if(day == 2){dayName = 'Thứ ba,'}
        else if(day == 3){dayName = 'Thứ tư,'}
        else if(day == 4){dayName = 'Thứ năm,'}
        else if(day == 5){dayName = 'Thứ sáu,'}
        else if(day == 6){dayName = 'Thứ bảy,'}
        else{};
    // Tạo và khai báo Excel
    let workbook = new Excel.Workbook()
    let worksheet =  workbook.addWorksheet('Báo cáo sản xuất', {
      pageSetup:{paperSize: 9, orientation:'landscape'},
      properties:{tabColor:{argb:'FFC0000'}},
    });
    // Page setup (cài đặt trang)
    worksheet.properties.defaultRowHeight = 20;
    worksheet.pageSetup.margins = {
      left: 0.3, right: 0.25,
      top: 0.75, bottom: 0.75,
      header: 0.3, footer: 0.3
    };
    // =====================THẾT KẾ HEADER=====================
    // Logo công ty
    const imageId1 = workbook.addImage({
        filename: 'public/images/Logo.png',
        extension: 'png',
      });
    worksheet.addImage(imageId1, 'A1:A3');
    // Thông tin công ty
    worksheet.getCell('B1').value = 'TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP HÀ NỘI';
    worksheet.getCell('B1').style = { font:{bold: true,size: 14},alignment: {vertical: 'middle'}} ;
    worksheet.getCell('B2').value = 'Địa chỉ: Số 298 đường Cầu Diễn, quận Bắc Từ Liêm, thành phố Hà Nội';
    worksheet.getCell('B3').value = 'Hotline: 024.37650051 hoặc 024.37655121';
    // Tên báo cáo
    worksheet.getCell('A5').value = 'BÁO CÁO SẢN XUẤT';
    worksheet.mergeCells('A5:F5');
    worksheet.getCell('A5').style = { font:{name: 'Times New Roman', bold: true,size: 16},alignment: {horizontal:'center',vertical: 'middle'}} ;
    // Ngày in biểu
    worksheet.getCell('F6').value = "Ngày in biểu: " + dayName + date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
    worksheet.getCell('F6').style = { font:{bold: false, italic: true},alignment: {horizontal:'right',vertical: 'bottom',wrapText: false}} ;
     
    // Tên nhãn các cột
    var rowpos = 7;
    var collumName = ["STT","Thời gian", "SẢN PHẨM CAO", "SẢN PHẨM TRUNG BÌNH", "SẢN PHẨM THẤP", "TỔNG SẢN PHẨM"]
    worksheet.spliceRows(rowpos, 1, collumName);
     
    // =====================XUẤT DỮ LIỆU EXCEL SQL=====================
    // Dump all the data into Excel
    var rowIndex = 0;
    SQL_Excel.forEach((e, index) => {
    // row 1 is the header.
    rowIndex =  index + rowpos;
    // worksheet1 collum
    worksheet.columns = [
          {key: 'STT'},
          {key: 'Datetime'},
          {key: 'Actual_SP_Cao'},
          {key: 'Actual_SP_TB'},
          {key: 'Actual_SP_Thap'},
          {key: 'Actual_Tong_SP'},
        ]
    worksheet.addRow({
          STT: {
            formula: index + 1
          },
          ...e
        })
    })
   // Lấy tổng số hàng
   const totalNumberOfRows = worksheet.rowCount; 
   // Tính tổng
   worksheet.addRow([
       'Tổng cộng:',
       '',
    {formula: `=sum(C${rowpos + 1}:C${totalNumberOfRows})`},
    {formula: `=sum(D${rowpos + 1}:D${totalNumberOfRows})`},
    {formula: `=sum(E${rowpos + 1}:E${totalNumberOfRows})`},
    {formula: `=sum(F${rowpos + 1}:F${totalNumberOfRows})`},
   ])
   // Style cho hàng total (Tổng cộng)
   worksheet.getCell(`A${totalNumberOfRows+1}`).style = { font:{bold: true,size: 12},alignment: {horizontal:'center',}} ;
   // Tô màu cho hàng total (Tổng cộng)
   const total_row = ['A','B', 'C', 'D', 'E','F']
   total_row.forEach((v) => {
       worksheet.getCell(`${v}${totalNumberOfRows+1}`).fill = {type: 'pattern',pattern:'solid',fgColor:{ argb:'f2ff00' }}
    })


    // =====================STYLE CHO CÁC CỘT/HÀNG=====================
    // Style các cột nhãn
    const HeaderStyle = ['A','B', 'C', 'D', 'E','F']
    HeaderStyle.forEach((v) => {
        worksheet.getCell(`${v}${rowpos}`).style = { font:{bold: true},alignment: {horizontal:'center',vertical: 'middle',wrapText: true}} ;
        worksheet.getCell(`${v}${rowpos}`).border = {
          top: {style:'thin'},
          left: {style:'thin'},
          bottom: {style:'thin'},
          right: {style:'thin'}
        }
    })
    // Cài đặt độ rộng cột
    worksheet.columns.forEach((column, index) => {
        column.width = 15;
    })
    // Set width header
    worksheet.getColumn(1).width = 12;
    worksheet.getColumn(2).width = 20;
  
    //////////////////////////////////
    worksheet.getRow(7).height=30;
    // ++++++++++++Style cho các hàng dữ liệu++++++++++++
    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      var datastartrow = rowpos;
      var rowindex = rowNumber + datastartrow;
      const rowlength = datastartrow + SQL_Excel.length
      if(rowindex >= rowlength+1){rowindex = rowlength+1}
      const insideColumns = ['A','B', 'C', 'D', 'E','F']
    // Tạo border
      insideColumns.forEach((v) => {
          // Border
        worksheet.getCell(`${v}${rowindex}`).border = {
          top: {style: 'thin'},
          bottom: {style: 'thin'},
          left: {style: 'thin'},
          right: {style: 'thin'}
        },
        // Alignment
        worksheet.getCell(`${v}${rowindex}`).alignment = {horizontal:'center',vertical: 'middle',wrapText: true}
      })
    })  
     // =====================THẾT KẾ FOOTER=====================
     worksheet.getCell(`F${totalNumberOfRows+2}`).value = 'Ngày …………tháng ……………năm 20………';
     worksheet.getCell(`F${totalNumberOfRows+2}`).style = { font:{bold: true, italic: false},alignment: {horizontal:'right',vertical: 'middle',wrapText: false}} ;     
     worksheet.getCell(`F${totalNumberOfRows+3}`).value = 'Người in biểu';
     worksheet.getCell(`F${totalNumberOfRows+4}`).value = '(Ký, ghi rõ họ tên)';
     worksheet.getCell(`F${totalNumberOfRows+3}`).style = { font:{bold: true, italic: false},alignment: {horizontal:'center',vertical: 'bottom',wrapText: false}} ;
     worksheet.getCell(`F${totalNumberOfRows+4}`).style = { font:{bold: false, italic: true},alignment: {horizontal:'center',vertical: 'top',wrapText: false}} ;
   
    // =====================THỰC HIỆN XUẤT DỮ LIỆU EXCEL=====================
    // Export Link
    var currentTime = year + "_" + month + "_" + date + "_" + hours + "h" + minutes + "m" + seconds + "s";
    var saveasDirect = "Report/Report_" + currentTime + ".xlsx";
    SaveAslink = saveasDirect; // Send to client
    var booknameLink = "public/" + saveasDirect;
     
    var Bookname = "Report_" + currentTime + ".xlsx";
    // Write book name
    workbook.xlsx.writeFile(booknameLink)
     
    // Return
    return [SaveAslink, Bookname]
} // Đóng fn_excelExport

// =====================TRUYỀN NHẬN DỮ LIỆU VỚI TRÌNH DUYỆT=====================
// Truyền nhận dữ liệu với trình duyệt
io.on("connection", function(socket){
    socket.on("msg_Excel_Report", function(data)
    {
        const [SaveAslink1, Bookname] = fn_excelExport();
        var data = [SaveAslink1, Bookname];
        socket.emit('send_Excel_Report', data);
    });
});