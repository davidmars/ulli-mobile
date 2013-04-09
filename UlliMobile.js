var UlliMobile = {

    container:$("<div class='page'></div>"),

    generateContainer:function () {
        UlliMobile.container.css("position", "absolute");
    },

    generateScreens:function () {
        $(".ulli-mobile").append(UlliMobile.container);
    },


    ///
    DisplayUl:function (el, li, way) {

        var firstli = $(el).find(li);


        for (var i = 0; i < firstli.length; i++) {

            // head li
            var headli = $(firstli[i]).children().first();
            // first ul in head li
            var firstul = $(UlliMobile.setFirstUl(headli));
            headli.data('firstul', firstul);


            // create icons for each headli (just one time only)
            if (firstul.length != 0) {
                if (headli.find('.more').length == 0) {
                    var more = $("<div class='more'>+</div>");
                    headli.append(more);
                    var less = $("<div class='less'>-</div>");
                    headli.append(less);
                    var arrow = $("<div class='arrow'>></div>");
                    headli.append(arrow);

                    // hide icons according to the way to open the first ul
                    if (way == "accordion") {
                        arrow.addClass("erase");
                        more.addClass("erase");
                    }
                    if (way == "page") {
                        more.addClass("erase");
                        less.addClass("erase");
                    }
                }
                headli.css("cursor","pointer");
            }


            headli.on("click", function (e) {

                var el = $(this);
                var firstul = el.data('firstul');

                // if there is ul
                if (firstul.length != 0) {

                    if (way == "accordion") {
                        // open/close ul
                        if (!el.hasClass("in")) {
                            el.addClass("in");
                            firstul.addClass("active");

                            // hide/show icons
                            el.find('.more').removeClass("erase");
                            el.find('.less').addClass("erase");

                        } else {
                            el.removeClass("in");
                            firstul.removeClass("active");

                            // hide/show icons
                            el.find('.more').addClass("erase");
                            el.find('.less').removeClass("erase");

                        }
                    } else if (way == "page") {

                        UlliMobile.ClonePage(el, firstul);

                    }

                    //don't go to the link, a href inactive
                    return false;
                }
            })
        }
    },

    ///
    setFirstUl:function (el) {
        // search ul inside il
        var firstul = el.parent().find("ul").first();
        return firstul;
    },


    ClonePage:function (el, ul) {
        // create ul without the nodes inside
        var ecran = ul.clone();
        //ecran.find("li ul").remove();

        // create title
        var elparent = $(el.parent().children().first());
        var title = elparent.clone();
        title.find('.arrow').addClass("erase");
        ecran.prepend(title);

        // if there isn't a on title then cursor:inherit
        if(title.find('a').length == 0){
            title.css("cursor","inherit");
        }

        // find ul parent
        var parentul = $(el.closest("ul"));

        // hide parentful
        parentul.addClass("erase");

        UlliMobile.CheckMultiple(parentul);

        // create back
        var back = $("<div class='back'> Back</div>");
        back.data("parentul", parentul);
        back.data("ecran", ecran);
        back.on('click', function (e) {

            var parentul = $(this).data("parentul");
            parentul.removeClass("erase");

            var ecran = $(this).data("ecran");
            ecran.addClass("erase");

            UlliMobile.CheckMultiple(parentul);
        })
        ecran.prepend(back);

        UlliMobile.container.append(ecran);

        // change the setup for display the next ul
        if ($("body").find(".ulli-accordion-page").length == 1) {
            UlliMobile.DisplayUl(ecran, "li", "page");
        } else if ($("body").find(".ulli-page-accordion").length == 1) {
            UlliMobile.DisplayUl(ecran, "li", "accordion");
        } else {
            UlliMobile.DisplayUl(ecran, "li", "page");
        }
    },

    CheckMultiple:function (parentul) {
        // if we are on ulli-mobile multiple, we have to hide the first ul
        if (parentul.hasClass("active") == true) {
            var firstul = $(".ulli-mobile > ul");
            if (!firstul.hasClass("erase")) {
                firstul.addClass("erase");
            } else {
                firstul.removeClass("erase");
            }
        }
    }



}


UlliMobile.generateContainer();
UlliMobile.generateScreens();
//


if ($("body").find(".ulli-accordion").length == 1) {
    UlliMobile.DisplayUl(".ulli-mobile", "li", "accordion");

} else if ($("body").find(".ulli-page").length == 1) {
    UlliMobile.DisplayUl(".ulli-mobile", "li", "page");

} else if ($("body").find(".ulli-accordion-page").length == 1) {
    UlliMobile.DisplayUl(".ulli-mobile", "> ul > li", "accordion");
    UlliMobile.DisplayUl(".ulli-mobile", "li ul li", "page");
} else if ($("body").find(".ulli-page-accordion").length == 1) {
    UlliMobile.DisplayUl(".ulli-mobile", "> ul > li", "page");
    UlliMobile.DisplayUl(".ulli-mobile", "li ul li", "accordion");
} else {
    UlliMobile.DisplayUl(".ulli-mobile", "li", "accordion");
}






