// Danh sách người dùng
var admin = ["admin","123456"]
var user1 = ["user1","1"]
var user2 = ["user2","2"]
//tao danh sahc nguoi dung voi ID ten dang nhap va mat khau
// Chương trình con 
function login()
{
    var a = document.getElementById("inputuser").value;
    var b = document.getElementById("inputpass").value;
    //lay ten nguoi dung va mat khau khi nguoi thao tac nhap vao form dang nhap
    // Admin
    if (a == admin[0] && b == admin[1])
    {
        fn_ScreenChange('Screen_Auto','Screen_Manu','Screen_SQL');
        document.getElementById('id01').style.display='none';
    }
    //neu nguoi dung dang nhap va la admin thi goi ham hien thi trang fn_ScreenChange cho man hinh chinh hien thi
    //an 2 man hinh con lai
    // User 1
    else if (a == user1[0] && b == user1[1])
    {
        fn_ScreenChange('Screen_Auto','Screen_Manu','Screen_SQL');
        document.getElementById('id01').style.display='none';
        document.getElementById("btt_Screen_Auto").disabled = true;
        document.getElementById("btt_Screen_SQL").disabled = true;
    }
    // User 2
    else if (a == user2[0] && b == user2[1])
    {
        fn_ScreenChange('Screen_Manu','Screen_Auto','Screen_SQL');
        document.getElementById('id01').style.display='none';
        document.getElementById("btt_Screen_Manu").disabled = true;
        document.getElementById("btt_Screen_SQL").disabled = true;
    } 
    
    else
    {
        window.location.href = '';
    }
}
function logout() // Ctrinh login
{
    alert("Đăng xuất thành công");
    window.location.href = 'DO_AN_PHAN_LOAI_SAN_PHAM';
}
//ham chuc nang dang xuat khi nhan nut dang xuat thi goi ham nay 