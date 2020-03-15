function openNav(x) {
    if (x.matches) {
        document.getElementById("mySidenav").style.width = "45%";
        document.getElementById("main").style.marginLeft = "45%";
    } else {
        document.getElementById("mySidenav").style.width = "20%";
        document.getElementById("main").style.marginLeft = "20%";
    }
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
