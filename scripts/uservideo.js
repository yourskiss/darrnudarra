    const audioElement = document.querySelector('audio');
    const videoElement = document.querySelector('video');
    const startBtn = document.querySelector('#start-btn');
    const stopBtn = document.querySelector('#stop-btn');
    const downloadLink = document.querySelector('#download-link');
    const downloadRecordVideoLink = document.querySelector('#downloadffmpeg');
    const pauseBtn = document.querySelector('#pause-btn');
    const resumeBtn = document.querySelector('#resume-btn');
    ValidateForMediaRecorder();

    function ValidateForMediaRecorder() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log("MediaRecorder API is supported");
            AccessUserCameraAndMicroPhone();
        } else {
            console.error("MediaRecorder API is not supported");
        }
    }


    function AccessUserCameraAndMicroPhone() {

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        }).then(function (stream) {
            videoElement.srcObject = stream;
            var mediaRecorder = new MediaRecorder(stream);
            var chunks = [];

            mediaRecorder.addEventListener("dataavailable", function (event) {
                chunks.push(event.data);
                var videoBlob = event.data;
                var reader = new FileReader();
                reader.onloadend = function () {
                    var base64Video = reader.result;
                    sendVideoToServer(base64Video);
                };
                reader.readAsDataURL(videoBlob);
            });

            mediaRecorder.addEventListener("stop", function () {
                debugger;
                var blob = new Blob(chunks, { type: "video/mp4" });
                const url = URL.createObjectURL(blob);
                downloadLink.href = url;
                //downloadLink.download = 'recorded-video.mp4';
                chunks = [];
            });


            pauseBtn.addEventListener('click', function () {
                mediaRecorder.pause();
            });

            resumeBtn.addEventListener('click', function () {
                mediaRecorder.resume();
            });

            startBtn.addEventListener('click', function () {
                mediaRecorder.start();
            });

            stopBtn.addEventListener('click', function () {
                mediaRecorder.stop();
                stopBtn.setAttribute('disabled', true);
                downloadLink.style.display = 'block';
                audioElement.pause();
                audioElement.currentTime = 0;
            });

        });

    }

    function sendVideoToServer(base64Video) {
        debugger;
        var data = JSON.stringify({ videoData: base64Video });
        PageMethods.SaveVideo(base64Video, onSucceed, onerror);
    }

    function onerror() {
    }

    function onSucceed(ds) {
        console.log(ds);
        var _val = ds.split(',');
        downloadRecordVideoLink.style.display = 'block';
        downloadRecordVideoLink.href = "lib/output/" + _val[1];
        downloadLink.href = "lib/video/" + _val[1];
        alert(_val[0]);
        console.log(_val[2]);
    }


    function StartStopRecording()
    {
        if($("#recording-btn").hasClass("start_recording"))
        {
            $("#recording-btn").removeClass("start_recording").addClass("pause_recording"); 
            $("#start-btn").trigger("click");
            $("#selectsongpart").slideUp(200);
            $("#selectsongnext").slideDown(200);
        }
        else if($("#recording-btn").hasClass("pause_recording"))
        {
            $("#recording-btn").removeClass("pause_recording").addClass("resume_recording");          
            $("#pause-btn").trigger("click");
        }  
        else if($("#recording-btn").hasClass("resume_recording"))
        {
            $("#recording-btn").removeClass("resume_recording").addClass("pause_recording");          
            $("#resume-btn").trigger("click");
        }  
        else 
        {
            // nothing
        }
    }
 

    function PlayPauseAudio()
    {
        if($("#audio-btn").hasClass("stop_audio"))
        {
            $("#audio-btn").removeClass("stop_audio").addClass("start_audio");
            audioElement.play();
            const audioduration = audioElement.duration * 100;  
            $('.recordingsroll').animate({ scrollTop: $('.recordingsroll')[0].scrollHeight }, audioduration );
        }
        else 
        {
            $("#audio-btn").removeClass("start_audio").addClass("stop_audio");
            audioElement.pause();
            $(".recordingsroll").stop();
        }
    }
    
     

    if($(".recordingsroll").length > 0)
    {
        $('.recordingsroll').slimScroll({ 
            width: "100%",
            height: "100%",
            size: "2px",
            color: "#FFFFFF",
            position: "right",
            distance: "0",
            start: "top",
            opacity: 1,
            alwaysVisible: false,
            disableFadeOut: false,
            railVisible: false,
            allowPageScroll: false,
            railColor: "#000000",
            railOpacity: 1,
            railDraggable: false,
            railClass: "recordingsrollRail",
            barClass: "recordingsrollBar",
            wrapperClass: "recordingsrollContainer",
            wheelStep: 10,
            touchScrollStep: 100,
            borderRadius: "3px",
            railBorderRadius: "3px"
        });
    }


    

    function restartrecording()
    {
        location.reload(true);
    }

    function instructionrecording()
    {
        alert('show recording instructions');
    } 


    $("#bottomsongs li").click(function()
    {
        var datasrc = $(this).attr("data-src");
        $("#bottomsongs li").removeClass('active');
        $(this).addClass("active");
        $("#audio").attr('src', datasrc);
        $(".recordingsroll").animate({ scrollTop: "0" }, 200);
        $("#audio-btn").removeClass("start_audio").addClass("stop_audio");
        PlayPauseAudio()
        
    });


    function recordingStop()
    {
        $("#stop-btn").trigger("click");
        $("#recording-btn").removeClass("resume_recording, pause_recording").addClass("start_recording"); 
        $("#selectsongpart").slideDown(200);
        $("#selectsongnext").slideUp(200);
    }
 
    
 
    

    