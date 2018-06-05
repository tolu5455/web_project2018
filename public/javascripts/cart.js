
function loadTadsble(){
    var rows = ""
    var ten = $("#ten").text()
    var hinh = $("#hinh").text()
    var gia = $("#gia").text()
    var soluong = $("#soluong").text()
    var url = $("#url").text()
    var tong = parseFloat(gia) * parseInt(soluong) * 1000000

    rows = "<tr><td class='product-remove'><a title='Remove this item' class='remove' href='#'>×</a></td><td><img width='100' src='" + hinh + "'></td><td>" + ten + "</td><td>" + gia + "</td><td>" + soluong + "</td><td>" + tong + "</td></tr>";
    $(rows).appendTo("#list tbody");

  var Dia_chi_Xu_ly= url + "/catalog/tablerow"
  var xhttp = new XMLHttpRequest()
  xhttp.open("POST", Dia_chi_Xu_ly, false)
  //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  xhttp.send(rows)
     
}