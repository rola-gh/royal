
window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

console.log(window.mobileCheck())
var PdfFlip = {
    magazineMode: true,
    oldScale: 1,
    currentPage: 1,
    currentScale: 1,
    layout: window.mobileCheck()?'single': 'double',
    maxScale: 2,
    audioSrc: "sound/page-flip.mp3",
    init: function () {

        $(window).bind('keydown', function (e) {
            console.log(e.keyCode);
            if (e.target && e.target.tagName.toLowerCase() != 'input') {
                if (e.keyCode == 37 || e.keyCode == 38) {
                    $('.directions .prev-button').click();
                }
                else if (e.keyCode == 39 || e.keyCode == 40) {
                    $('.directions .next-button').click();
                }
            }
        });


        $(document).on('click','#firstPage',function(){
            $("#magazine").turn('page', 1);
        });

        $(document).on('click','#lastPage',function(){
            $("#magazine").turn('page', PDFViewerApplication.pagesCount);
        });


        $(document).on('click','#thumbnailView a',function(){
          $('.toolbar .pageNumber').trigger('change');
        });

        $(document).on('change', '.toolbar .pageNumber', function (e) {
            $("#magazine").turn('page', $(this).val());
        });

        $(document).on('click', '.toolbar #previous , .directions .prev-button', function (e) {
            $("#magazine").turn('previous');
            return false;
        });

        $(document).on('click', '.toolbar #next, .directions .next-button', function (e) {
            $("#magazine").turn('next');
            return false;
        });

        document.addEventListener("pagesloaded", PdfFlip.launchMagazineMode, true);
    },
    launchMagazineMode: function (e) {
        document.removeEventListener("pagesloaded", PdfFlip.launchMagazineMode, true);
        PdfFlip.start();
    },
    start: function () {
        PDFViewerApplication.disableWorker = true;

        PdfFlip.magazineMode = true;
        PdfFlip.oldScale = PDFViewerApplication.pdfViewer.currentScale;
        PDFViewerApplication.pdfViewer.currentScaleValue = 'page-fit';

        $('#viewerContainer').after('<div id="magazineContainer"><div id="magazine"></div></div>');
        $('body').append('<div class="directions"><a href="#" class="prev-button"></a><a href="#" class="next-button"></a></div>')
        $("#viewerContainer").hide();
        $("#viewer").hide();
        $(".se-pre-con").hide();
        $("#magazine").show();

        PdfFlip.currentPage = PDFViewerApplication.page;


        var pages = [1];

        PdfFlip.loadTurnJsPages(pages, $('#magazine'), true, true).then(function () {

            $("#magazine").turn({
                autoCenter: true,
                display: 'single',
                width: $("#viewer .canvasWrapper canvas")[0].width,
                height: $("#viewer .canvasWrapper canvas")[0].height,
                pages: PDFViewerApplication.pdfDocument.numPages,
                page: 1,
                elevation: 100,
                duration: 600,
                acceleration: !PdfFlip.isChrome(),
                when: {
                    missing: function (event, pages) {
                        PdfFlip.loadTurnJsPages(pages, this, false, false);
                    },
                    turning: function (event, page, view) {
                        if (!$('#magazine').turn('hasPage', page)) {

                            PdfFlip.loadTurnJsPages([page], this, false, true).then(function () {
                                $('#magazine').turn('page', page);
                            });

                            event.preventDefault();
                        }
                        PdfFlip.startTurnSound();
                        PdfFlip.currentPage = page;
                        PDFViewerApplication.page = page;
                    },
                    turned: function(event, page, view){

                    }
                }
            });


            setTimeout(function () {
                $("#magazine").turn("display", PdfFlip.layout);

                var multiplier = PdfFlip.layout == 'double' ? 2 : 1;

                $("#magazine").turn("size",
                    $("#magazine canvas")[0].width * multiplier,
                    $("#magazine canvas")[0].height);

                if (PdfFlip.currentPage > 1)
                    $("#magazine").turn("page", PdfFlip.currentPage);


                $("#magazineContainer").zoom({
                    max: PdfFlip.maxScale,
                    flipbook: $('#magazine'),
                    when: {
                        tap: function (event) {

                            if ($(this).zoom('value') == 1) {
                                $('#magazine').
                                    removeClass('animated').
                                    addClass('zoom-in');
                                $(this).zoom('zoomIn', event);
                            } else {
                                $(this).zoom('zoomOut');
                            }
                        },
                        resize: function (event, scale, page, pageElement) {
                            PdfFlip.currentScale = scale;
                            PdfFlip.loadTurnJsPages($('#magazine').turn('view'), $('#magazine'), false, false);

                        },
                        zoomIn: function () {
                            $('.zoom-icon').removeClass('zoom-icon-in').addClass('zoom-icon-out');
                            $('#magazine').addClass('zoom-in');
                            PdfFlip.resizeViewport();
                        },
                        zoomOut: function () {
                            $('.zoom-icon').removeClass('zoom-icon-out').addClass('zoom-icon-in');
                            setTimeout(function () {
                                $('#magazine').addClass('animated').removeClass('zoom-in');
                                PdfFlip.resizeViewport();
                            }, 0);

                        },
                        swipeLeft: function () {
                            $('#magazine').turn('next');
                        },
                        swipeRight: function () {
                            $('#magazine').turn('previous');
                        }
                    }
                });

                $('.zoom-icon').bind('click', function () {
                    if ($(this).hasClass('zoom-icon-in'))
                        $('#magazineContainer').zoom('zoomIn');
                    else if ($(this).hasClass('zoom-icon-out'))
                        $('#magazineContainer').zoom('zoomOut');

                });

            }, 10);
        });


    },
    resizeViewport: function () {

        var width = $(window).width(),
            height = $(window).height(),
            options = $('#magazine').turn('options');

        $('#magazine').removeClass('animated');

        $('#magazineContainer').css({
            width: width,
            height: height - $('.toolbar').height()
        }).zoom('resize');


        if ($('#magazine').turn('zoom') == 2) {
            var bound = PdfFlip.calculateBound({
                width: options.width,
                height: options.height,
                boundWidth: Math.min(options.width, width),
                boundHeight: Math.min(options.height, height)
            });

            if (bound.width % 2 !== 0)
                bound.width -= 1;


            if (bound.width != $('#magazine').width() || bound.height != $('#magazine').height()) {

                $('#magazine').turn('size', bound.width, bound.height);

                if ($('#magazine').turn('page') == 1)
                    $('#magazine').turn('peel', 'br');
            }

            $('#magazine').css({top: -bound.height / 2, left: -bound.width / 2});
        }

        $('#magazine').addClass('animated');

    },
    calculateBound: function (d) {

        var bound = {width: d.width, height: d.height};

        if (bound.width > d.boundWidth || bound.height > d.boundHeight) {

            var rel = bound.width / bound.height;

            if (d.boundWidth / rel > d.boundHeight && d.boundHeight * rel <= d.boundWidth) {

                bound.width = Math.round(d.boundHeight * rel);
                bound.height = d.boundHeight;

            } else {

                bound.width = d.boundWidth;
                bound.height = Math.round(d.boundWidth / rel);

            }
        }

        return bound;
    },
    calculateTotalPages: function () {
        return $('#viewer .page').length;
    },
    startTurnSound: function () {
        var audio = new Audio(PdfFlip.audioSrc);
        audio.play();
    },

    loadTurnJsPages: function (pages, magazine, isInit, defer, scale) {
        var deferred = null;

        if (defer)
            deferred = $.Deferred();

        var pagesRendered = 0;
        for (var i = 0; i < pages.length; i++) {
            PDFViewerApplication.pdfDocument.getPage(pages[i]).then(function (page) {

                var destinationCanvas = document.createElement('canvas');

                var unscaledViewport = page.getViewport(1);
                var divider = PdfFlip.layout == 'double' ? 2 : 1;

                var scale = Math.min((($('#mainContainer').height() - 20) / unscaledViewport.height), ((($('#mainContainer').width() - 80) / divider) / unscaledViewport.width));

                var viewport = page.getViewport(scale);


                if (PdfFlip.currentScale > 1)
                    viewport = page.getViewport(PdfFlip.currentScale);

                destinationCanvas.height = viewport.height; // - ((viewport.height / 100) * 10);
                destinationCanvas.width = viewport.width; // - ((viewport.width / 100) * 10);


                var renderContext = {
                    canvasContext: destinationCanvas.getContext("2d"),
                    viewport: viewport
                };

                page.render(renderContext).promise.then(function () {
                    pagesRendered++;

                    destinationCanvas.setAttribute('data-page-number', page.pageNumber);
                    destinationCanvas.id = 'magCanvas' + page.pageNumber;


                    if (!isInit) {
                        if ($(magazine).turn('hasPage', page.pageNumber)) {

                            var oldCanvas = $('#magCanvas' + page.pageNumber)[0];
                            oldCanvas.width = destinationCanvas.width;
                            oldCanvas.height = destinationCanvas.height;

                            var oldCtx = oldCanvas.getContext("2d");


                            oldCtx.drawImage(destinationCanvas, 0, 0);


                        }
                        else {
                            $(magazine).turn('addPage', $(destinationCanvas), page.pageNumber);
                        }
                    }
                    else {
                        $("#magazine").append($(destinationCanvas));
                    }

                    if (pagesRendered == pages.length)
                        if (deferred)
                            deferred.resolve();
                });
            });
        }

        if (deferred)
            return deferred;

    },
    isChrome: function () {
        return navigator.userAgent.indexOf('Chrome') != -1;
    }
};
