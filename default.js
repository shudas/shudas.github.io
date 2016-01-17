// Fix console log issues in IE
if (!window.console) {var console = {};}
if (!console.log) {console.log = function() {};}

// The option that is currently selected. About me by default.
var currOption = "aboutMeClass";
var currContent = 0;
var optionsMap = {};
var fadeTime = 750;

$(document).ready(function(){

	initOptionsMap();
    myImgHover();
    contentFade();

    $('.sideBar ul li').click(function() {
        contentOpFade($(this).index(), "fade");
    });
    
});

function initOptionsMap(){
    optionsMap["aboutMeClass"] = "aboutMeContent";
	optionsMap["education"] = "educationContent";
    optionsMap["experience"] = "experienceContent";
	optionsMap["projects"] = "projectsContent";
	optionsMap["contactMe"] = "contactMeContent";
}

function contentFade(){
    $("#options ul li, .aboutMeClass").click(function() {
        if (currOption == this.id || currOption == $(this).attr('class')){
            // Fade to overView
            if (currOption != $(this).attr('class') && currContent != 0){
                // This will be set to 0 in contentOpFade. 0 is the index of overView
                contentOpFade(-1, "fade");
            }
            return;
        }
        // Reset to overview before continuing
        contentOpFade(-1, "fade");
        // Check ids before classes
        var showId = this.id;
        if (optionsMap[showId] == undefined){
            showId = $(this).attr('class');
        }
        var hideItem = "#" + optionsMap[currOption];

        var showItem = "#" + optionsMap[showId];
        currOption = showId;
        slide(hideItem, showItem);
    });
}

// fadeShow: "fade" will fade between the contents, "show" will hide and show the other
function contentOpFade(opClicked, fadeShow){
    // Do not do anything if the current selection is already open
    if (opClicked + 1 == currContent){
        return;
    }

    var content = "#" + optionsMap[currOption] + " .sideBarContent>ul>li";
    var itemToHide = $(content).eq(currContent);
    var sideBar = "#" + optionsMap[currOption] + " .sideBar>ul>li";

    // If prev option was view all, hide everything
    if (currContent == $(sideBar).length){
        console.log("got clear");
        $(content).each(function(){
            // do not show overview
            if ($(this).index() != 0){
                // overView is the first elem so we add one to index
                $(this).hide();
            }
        });
    }

    // overView is the first elem so we add one to index
    currContent = opClicked + 1;
    var itemToShow = $(content).eq(currContent);

    // View all options
    if (currContent == $(sideBar).length){
        // console.log("got all");
        $(content).each(function(){
            // do not show overview
            if ($(this).index() != 0){
                $(this).fadeIn(fadeTime);
            }
            else{
                $(this).hide();
            }
        });
        return;
    }

    if (fadeShow == "fade"){
        fadeToggle(itemToHide, itemToShow);
    }
    else if (fadeShow == "show"){
        $(itemToHide).hide();
        $(itemToShow).show();
    }
    else if (fadeShow == "slide"){
        slide(itemToHide, itemToShow);
    }
}

// DOES NOT FADE OUT DUE TO POSSIBLE ERRORS. keeping the mustFade in case we fix problem later
function fadeToggle(toFadeOut, toFadeIn, mustFade){
    if (typeof mustFade === 'undefined') { mustFade = false; }
    $(toFadeOut).hide();
    $(toFadeIn).fadeIn(fadeTime);
    // $(toFadeOut).fadeOut(250, function(){
    //     $(toFadeIn).fadeIn(750, function(){
    //         if (mustFade){
    //             $(toFadeOut).hide();
    //         }
    //     });
    // });
}

// DOES NOT FADE OUT DUE TO POSSIBLE ERRORS. keeping the mustFade in case we fix problem later
function fadeToggle(toFadeOut, toFadeIn){
    $(toFadeOut).hide();
    $(toFadeIn).fadeIn(fadeTime);
}

function slide(toFadeOut, toFadeIn){
    $(toFadeOut).hide();
    $(toFadeIn).slideDown(fadeTime);
}

function myImgHover(){
    $("#meNorm, #title h1").mousedown(function(){
        $("#title h1").css("color", "#BFBE8C");
        $("#meNorm").css("opacity", 0.75);
        $("#shadowImg").css("opacity", 0.35);
    });

    $("#meNorm, #title h1").mouseup(function(){
        // $("#meNorm").css("opacity", 0.85);
        // $("#title h1").css("color", "#e2e1b3");
        // $("#shadowImg").css("opacity", 0.5);
        $("#meNorm").css("opacity", 0.99);
        $("#title h1").css("color", "#ffffff");
        $("#shadowImg").css("opacity", 0.65);
    });

    // $("#meNorm, #title h1").hover(function(){
    //     $("#title h1").animate({color: "#ffffff"}, 200);
    //     $("#meNorm").fadeTo(200, 0.99);
    //     $("#shadowImg").fadeTo(200, 0.65);
    // }, function(){
    //     $("#meNorm").css("opacity", 0.85);
    //     $("#title h1").css("color", "#D4D29B");
    //     $("#shadowImg").css("opacity", 0.5);
    // });
    $("#title").mouseenter(function(){
        $("#title>h1").animate({color: "#ffffff"}, 500);
        $("#meNorm").fadeTo(500, 0.99);
        $("#shadowImg").fadeTo(500, 0.65);
    }).mouseleave(function(){
        $("#title h1").stop();
        $("#meNorm").stop();
        $("#shadowImg").stop();
        $("#meNorm").css("opacity", 0.85);
        $("#title h1").css("color", "#D4D29B");
        $("#shadowImg").css("opacity", 0.5);
    });
}
