var UlliMobile = {

    container:$("<div class='page'></div>"),

    generateContainer:function () {
        $(".ulli-mobile").append(UlliMobile.container);

        // background
        /* var bg = $("<div class='bg'></div>");
         $(".ulli-mobile").append(bg)*/
        ;
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
                if (headli.find('.plus').length == 0) {
                    var plus = $("<div class='plus'>+</div>");
                    headli.append(plus);
                    var minus = $("<div class='minus'>-</div>");
                    headli.append(minus);
                    var arrow = $("<div class='arrow'>></div>");
                    headli.append(arrow);

                    // hide icons according to the way to open the first ul
                    if (way == "accordion") {
                        arrow.addClass("erase");
                        minus.addClass("erase");
                    }
                    if (way == "page") {
                        plus.addClass("erase");
                        minus.addClass("erase");
                    }
                }
                headli.css("cursor", "pointer");
            }


            headli.on("click", function (e) {

                var el = $(this);
                var firstul = el.data('firstul');

                // if there is ul
                if (firstul.length != 0) {
                    if (way == "accordion") {

                        //get array ul opened until now
                        var headliactive = $(el.parent().parent().find(".in"));

                        // open/close ul
                        el.toggleClass("in")
                        firstul.toggleClass("active");

                        // css height ul
                        var allli = $(firstul.find("> li"));
                        firstul.css('height', allli.length * 40 + "px");

                        // hide/show icons
                        el.find('.plus').toggleClass('erase');
                        el.find('.minus').toggleClass("erase");

                        // close other ul
                        for (var i = 0; i < headliactive.length; i++) {
                            if (headliactive[i] != el) {
                                //remove class, close ul
                                $(headliactive[i]).removeClass("in");
                                $($(headliactive[i]).parent().find('ul')).removeClass("active");
                                $($(headliactive[i]).parent().find('ul')).css('height', 0);
                                // hide icons
                                $(headliactive[i]).find('.plus').removeClass('erase');
                                $(headliactive[i]).find('.minus').addClass("erase")
                            }
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
        ///ecran.find("li ul").remove(;
        ecran.toggleClass("menu-show");

        // title : create
        var elparent = $(el.parent().children().first());
        var title = elparent.clone();
        $(title).removeClass("btn-li")
        ecran.prepend(title);

        // title : css / class
        title.find('.arrow').addClass("erase");
        title.addClass("title");
        // if there isn't a on title then cursor:inherit
        if (title.find('a').length == 0) {
            title.css("cursor", "inherit");
        }

        // parentful : hide
        var parentul = $(el.closest("ul"))
        parentul.toggleClass("menu-left");
        parentul.removeClass("menu-show");


        //
        UlliMobile.CheckMultiple(parentul);

        //

        // back : create
        var back = $("<span class='back'><span class='back_arrow'>&nbsp;</span><span class='back_text'>Back</span><span class='back_rounded'>&nbsp;</span></span>");
        back.data("parentul", parentul);
        back.data("ecran", ecran);
        back.on('click', function (e) {

            var parentul = $(this).data("parentul");
            parentul.removeClass("menu-left");
            parentul.addClass("menu-show");

            var ecran = $(this).data("ecran");
            ecran.removeClass("menu-show");
            ecran.addClass("menu-right");
            ecran.remove();

            UlliMobile.CheckMultiple(parentul);
        })
        ecran.prepend(back);

        $(UlliMobile.container).prepend(ecran);

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


            if (!firstul.hasClass("menu-erase")) {
                // togg    leirstuladddClass("menu-erase")
            } else {
                firstul.removeClass("menu-erase");
            }
        }
    },

    DesignUlli:function () {

        //add a class on headli
        var everyli = $(".ulli-mobile").find("li");
        for (var i = 0; i < everyli.length; i++) {
            var el = $(everyli[i]).children().first();
            $(el).addClass("btn-li");
        }

    },
    init:function () {
        if (UlliMobile.yetInit) {
            return;
        }
        UlliMobile.yetInit = true;
        UlliMobile.generateContainer();
        UlliMobile.DesignUlli();

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
    }
}

//

UlliMobile.init();

$("body").on('click', ".mobile-menu-btn", function () {

    $("body").find(".ulli-mobile").toggleClass("erase");
    $("body").find(".icon-piaget-mobile-menu").toggleClass("active");
})

