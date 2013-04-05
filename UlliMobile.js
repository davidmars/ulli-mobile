var UlliMobile = {

    container : $("<div></div>"),

    generateContainer:function(){

        UlliMobile.container.css("position", "absolute");
        UlliMobile.container.css("border", "1px solid red");
        UlliMobile.container.css("width", "500px");
        UlliMobile.container.css("height", "500px");
        UlliMobile.container.css("right", "10px");
    },


    searchUl:function (el) {
        //
        var listul = $(el).find("ul");

        for (var i = 0; i < listul.length; i++) {

            // boucle for search an ul inside the ul
            UlliMobile.searchUl(listul[i].firstChild);

            // ul
            var original = $(listul[i]);

            // create ul without the nodes inside
            var ecran = original.clone();
            ecran.find("li ul").remove();

            // create title
            var elparent = $(original.parent().children().first());
            var title = elparent.clone();
            ecran.prepend(title);

            UlliMobile.container.append(ecran);
            ecran.css("border", "1px solid red");

        }

    },



    generateScreens:function () {

        $("body").append(UlliMobile.container);

        /*var ecran = $(".ulli-mobile").clone();

        container.append(ecran);

        var toto = $('#toto');
        toto.data("ecran", ecran);

        toto.on('click', function (e) {
            if ($(this).data("ecran").css("display") == "none") {
                $(this).data("ecran").css("display", "block");
            } else {
                $(this).data("ecran").css("display", "none")
            }
        });*/
    }
}


// function for the first li
$("body").on("click", ".ulli-mobile > li", function (e) {

    var el = $(this);

    // search li inside ul
    var inli = el.find("ul").first();

    


    // if there is li
    if (inli.length != 0) {

        // open/close ul
        if (!el.hasClass("in")) {
            el.addClass("in");
            inli.addClass("active");
        } else {
            el.removeClass("in");
            inli.removeClass("active");
        }

        //don't go to the link, a href inactive
        return false;
    }

})

$("body").on("click", "li ul li", function (e) {

    var el = $(this);

    // search li inside ul
    var inli = el.find("ul").first();


});
UlliMobile.generateContainer();
UlliMobile.generateScreens();
UlliMobile.searchUl(".ulli-mobile");



