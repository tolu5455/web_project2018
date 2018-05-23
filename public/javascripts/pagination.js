function loadPagiHTML() {
    var pages = $("#pageCount").text();
    var current = $("#pageCurrent").text();
    var nPage = parseInt(pages);
    var nCurrent = parseInt(current);
    var info = document.createElement("ul")
    info.className = "pagination text-center";
    if (nPage > 0) {
        if (nCurrent == 1) {
            var info1 = document.createElement("li")
            info1.className = "disabled";
            var info11 = document.createElement("a")
            info11.innerHTML = "First";
            info1.appendChild(info11);
            info.appendChild(info1)
        } else {
            var info2 = document.createElement("li")
            var info22 = document.createElement("a")
            info22.href = "/catalog/laptops/1";
            info22.innerHTML = "First"
            info2.appendChild(info22);
            info.appendChild(info2)
        }
        var i = nCurrent > 5 ? nCurrent - 4 : 1
        if (i != 1) {
            var info3 = document.createElement("li")
            info3.className = "disabled";
            var info33 = document.createElement("a")
            info33.innerHTML = "...";
            info3.appendChild(info33);
            info.appendChild(info3)
        }
        for (; i <= nCurrent + 4 && i <= nPage; i++) {
            if (i == nCurrent) {
                var info4 = document.createElement("li")
                info4.className = "active";
                var info44 = document.createElement("a")
                info44.innerHTML = i;
                info4.appendChild(info44);
                info.appendChild(info4)

            } else {

                var info5 = document.createElement("li")
                var info55 = document.createElement("a")
                info55.href = "/catalog/laptops/" + i;
                info55.innerHTML = i;
                info5.appendChild(info55);
                info.appendChild(info5)
            }
            if (i == nCurrent + 4 && i < nPage) {
                var info6 = document.createElement("li")
                info6.className = "disabled";
                var info66 = document.createElement("a")
                info66.innerHTML = "...";
                info6.appendChild(info66);
                info.appendChild(info6)
            }
        }

        if (nCurrent == nPage) {
            var info7 = document.createElement("li")
            info7.className = "disabled";
            var info77 = document.createElement("a")
            info77.innerHTML = "Last";
            info7.appendChild(info77);
            info.appendChild(info7)
        } else {
            var info8 = document.createElement("li")
            var info88 = document.createElement("a")
            info88.href = "/catalog/laptops/" + nPage;
            info88.innerHTML = "Last";
            info8.appendChild(info88);
            info.appendChild(info8)

        }

    }
    pagination.appendChild(info)
    pagination.className = "text-center"
    var chuoipagi = pagination.outerHTML
    return chuoipagi;
}