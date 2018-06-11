$(function(){
  $('#select_trangthai').click(function(e) {
      e.preventDefault();
      var x = document.getElementById("select_trangthai")
      var x2 = document.getElementById("trangthai")
      var trangthai = x.options[x.selectedIndex].text;
      x2.value = trangthai
  });
});