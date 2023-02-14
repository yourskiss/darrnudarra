/* page refresh on orientation change === START */
$(window).on('orientationchange', function (event) 
{
    location.reload(true);
});
/* page refresh on orientation change === END */


/* onLoad === start */
$(window).on('load', function() 
{
     
});
/* onLoad === end */



/* show/hide menu === start */
$("#menubar").click(function(e)
{
    e.preventDefault();
    e.stopPropagation();
    if($(this).hasClass("active"))
    {
        $("#menubar").removeClass("active");
        $("#menucontainer").slideUp(300);
        $('body').css('overflow', 'auto');
    }
    else 
    {
        $("#menubar").addClass("active");
        $("#menucontainer").slideDown(300);
        $('body').css('overflow', 'hidden');
    }
});
$('body').click(function(e) // close on click body
{    
    if($(window).width() < 768)
    {
        if (e.target != $('#menubar') || e.target != $('#menucontainer') || e.target != $('.login_after')) 
        {
            $("#menubar").removeClass("active");
            $("#menucontainer").slideUp(300);
            $('body').css('overflow', 'auto');
        }
    }
});
$("#login_after_head").click(function(e)
{
    e.preventDefault();
    e.stopPropagation();
    if($(this).hasClass("active")) {
        $(this).removeClass("active");
        $("#login_after_body").slideUp(300);
    }
    else {
        $(this).addClass("active");
        $("#login_after_body").slideDown(300);
    }
});
/* show/hide menu === end */


/* validation === start */
function formvalidation()
{
    // debugger;
    var emailReg = /( )|(^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$)/;
    $(".participate-errormsg").hide().html('');
    $(".participate-input, .participate-select").removeClass('participate-border');
    if($("#fullname").val() == '')
    {
        $("#fullname_errormsg").show().html('Please enter your name');
        $("#fullname").addClass('participate-border');
        return false;
    }
    else if($("#contactnumber").val() == '')
    {
        $("#contactnumber_errormsg").show().html('Please enter your mobile number');
        $("#contactnumber").addClass('participate-border');
        return false;
    }
    else if($("#contactnumber").val().length != 10)
    {
        $("#contactnumber_errormsg").show().html('Invalid mobile number');
        $("#contactnumber").addClass('participate-border');
        return false;
    }
    else if (($("#contactnumber").val().indexOf('9')) != 0 && ($("#contactnumber").val().indexOf('8')) != 0 && ($("#contactnumber").val().indexOf('7')) != 0 && ($("#contactnumber").val().indexOf('6')) != 0) 
    {
        $("#contactnumber_errormsg").show().html('Mobile number start with digits like 9, 8, 7, 6');
        $("#contactnumber").addClass('participate-border');
        return false;
    }
    else if($("#emailaddress").val() == '')
    {
        $("#emailaddress_errormsg").show().html('Please enter your email id');
        $("#emailaddress").addClass('participate-border');
        return false;
    }
    else if ($("#emailaddress").val() != "" && !emailReg.test($("#emailaddress").val())) 
    {
        $("#emailaddress_errormsg").show().html('Please enter valid email id');
        $("#emailaddress").addClass('participate-border');
        return false;
    }
     
    else if($("#entrytype").length == 1 && $("#entrytype").val() == null || $("#entrytype").val() == '' || $("#entrytype").val() == 0)
    {
        $("#entrytype_errormsg").show().html('Please select entery type');
        $("#entrytype").addClass('participate-border');
        return false;
    } 
    else if($("#agreeterm").prop("checked") == false)
    {
        $("#agreeterm_errormsg").show().html('Please agree tearm and condition');
        return false;
    }
    else 
    {
        otppopupscreen(1);
        $(".participate-errormsg").hide().html('');
        return true;
    }
}
/* validation === end */



/* loginvalidation === start */
function loginvalidation()
{
    // debugger;
    if($("#logincontact").val() == '')
    {
        $("#logincontact_errormsg").show().html('Please enter your mobile number');
        $("#logincontact").addClass('login-border');
        return false;
    }
    else if($("#logincontact").val().length != 10)
    {
        $("#logincontact_errormsg").show().html('Invalid mobile number');
        $("#logincontact").addClass('login-border');
        return false;
    }
    else if (($("#logincontact").val().indexOf('9')) != 0 && ($("#logincontact").val().indexOf('8')) != 0 && ($("#logincontact").val().indexOf('7')) != 0 && ($("#logincontact").val().indexOf('6')) != 0) 
    {
        $("#logincontact_errormsg").show().html('Mobile number start with digits like 9, 8, 7, 6');
        $("#logincontact").addClass('login-border');
        return false;
    }
    else if($("#loginagreeterm").prop("checked") == false)
    {
        $("#loginagreeterm_errormsg").show().html('Please agree tearm and condition');
        return false;
    }
    else 
    {
        $(".login-errormsg").hide().html('');
        return true;
    }
}
/* loginvalidation === end */
 


/* otp valid === end */
function otpvalidation()
{
    if($("#textotp").val().length == 4)
    {
        // $("#otp_error_msg").hide().html("");
        alert("otp submitted");
        otppopupscreen(0);
    }
    else 
    {
        // nothing
    }
}
/* otp valid === end */

/* otp === start */
function otppopupscreen(val)
{
    if(val == 0) // hide
     {
        $("#otppopup").fadeOut(500);
        $("body").css("overflow","auto");
     }
     else if(val == 1) // show
     {
        $("#otppopup").fadeIn(500);
        $("body").css("overflow","hidden");
        timecounter(30); // time start for test
     }
     else 
     {
        // nothing
     }
}
/* otp === end */



/* otp timer === start */
var timer;
function timecounter(sec)
{
        $("#resend_button").hide(); // hide resend  
        $("#resend_counter").show();   // show counter  
        $("#resend_timer").html(sec); // set counter
        if (timer || typeof timer != '' || typeof timer != false || typeof timer != 'undefined') {
            clearInterval(timer);
        }
        timer = setInterval(function () {
            $('#resend_timer').html(sec--);
            if (sec == -1) {
                clearInterval(timer); // clear interval 
                $("#resend_button").show(); // show resend
                $("#resend_counter").hide(); // hide counter
                $("#resend_timer").html(0); // reset counter
            }
        }, 1000);
}
/* otp timer === end */


/* show/hide get in touch === start */
function showhidegetintouch(val)
{
     if(val == 'show')
     {
        $("#getintouchpopup").fadeIn(500);
        $("body").css("overflow","hidden");
     }
     else if(val == 'hide')
     {
        $("#getintouchpopup").fadeOut(500);
        $("body").css("overflow","auto");
     }
     else 
     {
        // nothing
     }
}
/* show/hide get in touch === end */





/* show/hide msg === start */
function showhidemsg(val)
{
     if(val == 'somethingwentwrong')  // something wrong  confirmation msg
     {
        $("#").fadeIn(500);
        $("body").css("overflow","hidden");
     }
     else if(val == 'deleteentry') // delete entry confirmation msg
     {
        $("#").fadeIn(500);
        $("body").css("overflow","hidden");
     }
     else if(val == 'wantrestart') // want to restart confirmation msg
     {
        $("#").fadeIn(500);
        $("body").css("overflow","hidden");
     }
     else if(val == 'hide') // hide all confirmation msg
     {
        $(".msgcontainer").fadeOut(500);
        $("body").css("overflow","auto");
     }
     else 
     {
        // nothing
     }
}
/* show/hide msg === end */






/* participate === term agree to enabled button === start */
function agreeterms()
{
    if($("#agreeterm").prop('checked'))
    {
        $(".participate-submit").removeClass("disabaled");
    }
    else 
    {
        $(".participate-submit").addClass("disabaled");
    }
}
/* participate === term agree to enabled button === end */
 
/* login === term agree to enabled button === start */
function loginagreeterms()
{
    if($("#loginagreeterm").prop('checked'))
    {
        $(".login-submit").removeClass("disabaled");
    }
    else 
    {
        $(".login-submit").addClass("disabaled");
    }
}
/* login === term agree to enabled button === end */
 






// only number validation === start
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
// only number validation === end

// only Letter validation === start
function isLetter(e) 
{
    var regex = new RegExp("^[a-zA-Z ]+$");
    var strigChar = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(strigChar)) {
        return true;
    }
    return false
}
// only Letter validation === end

// social slider   === start 
$(function($) 
{
    if($(".socialslider").length > 0)
    {
        $('.socialslider').slick({
            slidesToShow:4,
            slidesToScroll: 4,
            dots: true,
            arrows: true,
            autoplay: false,
            autoplaySpeed: 3000,
            infinite: true,
            adaptiveHeight: false,
            centerMode: false,
            centerPadding: '10px',
            initialSlide:0,
            responsive:
            [
                {
                    breakpoint: 1023,
                    settings: { centerPadding: '5px', slidesToShow:3, slidesToScroll: 3, arrows: false }
                },
                {
                    breakpoint: 599,
                    settings: { centerPadding: '5px', slidesToShow:2, slidesToScroll: 2, arrows: false }
                }
            ]
        });
    }
});
// social slider   === end  

