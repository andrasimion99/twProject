function openNav(x) {
    var sideNav = document.getElementById("mySidenav");
    var main = document.getElementById("main");
    if ((sideNav.style.width == 0 && main.style.marginLeft == 0) || (sideNav.style.width == "0px" && main.style.marginLeft == "0px")) {

        if (x.matches) {
            document.getElementById("mySidenav").style.width = "45%";
            document.getElementById("main").style.marginLeft = "45%";
            document.getElementsByClassName("main-nav")[0].style.zIndex = "1"
        } else {
            document.getElementById("mySidenav").style.width = "20%";
            document.getElementById("main").style.marginLeft = "20%";
            document.getElementsByClassName("main-nav")[0].style.zIndex = "1"
        }
    } else {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    }

}