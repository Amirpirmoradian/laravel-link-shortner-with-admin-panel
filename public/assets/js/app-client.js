$(document).ready(function () {

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;

    $(document).on('click', '.next', function () {
        error = true;

        current_fs = $(this).parent().parent();
        next_fs = $(this).parent().parent().next();

        var currentStep = parseInt(current_fs.attr('step'));

        if (currentStep == 1) {
            var selectedBranch = $('.departments input[type=radio]:checked').val();
            var dateContainer = $('.day-table tbody');
            if (selectedBranch == undefined) {
                error = true;
                $('#error .message').html('انتخاب شعبه الزامی است');
                $('#error .message').show();

                setTimeout(function () {
                    $('#error .message').fadeOut();
                }, 3000);
            } else {
                $('#loader').show();
                $.ajax({
                    url: "/ajax/branches", // Url of backend (can be python, php, etc..)
                    type: "POST", // data type (can be get, post, put, delete)
                    data: {
                        'branch': selectedBranch,
                    }, // data in json format
                    dataType: 'json',
                    async: false, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
                    success: function (response, textStatus, jqXHR) {
                        if (response.emptyDay == false) {
                            error = true;
                            $('#loader').hide();
                            $('#error .message').html('متاسفانه هیچ زمان خالی برای این شعبه وجود ندارد.');
                            $('#error .message').show();

                            setTimeout(function () {
                                $('#error .message').fadeOut();
                            }, 3000);
                        } else {
                            dateContainer.html('');
                            error = false;
                            rowCounter = 0;
                            $('#month-names-mobile').html(response.monthNames);

                            $.each(response, function (i, item) {
                                var html = '';
                                var dayClass = '';
                                if (rowCounter == 7) {
                                    rowCounter = 0;
                                    dateContainer.append('<tr>');
                                }

                                if (item.isFree == false) {
                                    dayClass = dayClass + 'inactive';
                                }


                                if (item.active == false) {
                                    dayClass = dayClass + ' inactive';
                                }


                                if (item.closed == true) {
                                    dayClass = dayClass + ' closed';
                                }

                                if (dayClass == '') {
                                    dayClass = 'active';
                                }


                                if (dayClass == 'active' && item.isFree == true) {
                                    if (item.day != undefined) {
                                        html = '<td class="' + dayClass + '">' +
                                            '<input type="radio" id="date-' + item.gregorianDate + '" value="' + item.gregorianDate + '" name="date">' +
                                            '<label for="date-' + item.gregorianDate + '">' +
                                            '<span class=day-num>' +
                                            item.day +
                                            ' </span>' +
                                            '<span class=month-title>' +
                                            item.month +
                                            '</span>' +
                                            '</label>' +
                                            '</td>';
                                    }
                                } else {
                                    if (item.day != undefined) {
                                        html = '<td class="' + dayClass + '">' +
                                            '<span class=day-num>' +
                                            item.day +
                                            ' </span>' +
                                            '<span class=month-title>' +
                                            item.month +
                                            '</span>' +
                                            '</td>';
                                    }

                                }
                                // if(item.isFree == true){
                                //     html = '<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 date date-active">'+
                                //         '<input type="radio" id="date-' + item.gregorianDate + '" value="' + item.gregorianDate + '" name="date">'+
                                //         '<label for="date-' + item.gregorianDate + '">'+
                                //             '<div class="day-name">' + item.dayName + '</div>'+
                                //             '<div class="day-date">' + item.persian + '</div>'+
                                //         '</label>'+
                                //     '</div>';
                                // }else{
                                //     html = '<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 date deactive-date">'+
                                //         '<label for="">'+
                                //             '<div class="day-name">' + item.dayName + '</div>'+
                                //             '<div class="day-date">' + item.persian + '</div>'+
                                //             '<span class="full-container">'+
                                //                 '<span class="full">ظرفیت تکمیل است.</span>'+
                                //             '</span>'+
                                //         '</label>'+
                                //     '</div>';
                                // }

                                dateContainer.append(html);
                                rowCounter++;

                                if (rowCounter == 7) {
                                    dateContainer.append('</tr>');
                                }
                            });

                            dateContainer.append('<td colspan="6" class="period-dropdown-conatiner">' +
                                '<span class="period-dropdown-label">لطفا بازه زمانی مورد نظر خود را انتخاب نمایید</span>' +
                                '<span class="period-dropdown-input"><select name="periodId" id="period-dropdown"><option>ابتدا روز مورد نظر خود را انتخاب نمایید </option></select></span>' +
                                '</td>');

                            setTimeout(function () {
                                $('#loader').fadeOut();
                            }, 1000);
                        }



                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            }
        } else if (currentStep == 2) {
            var selectedDate = $('.day-table input[type=radio]:checked').val();
            var conceptName = $('#period-dropdown').find(":selected").val();
            if (selectedDate != undefined) {
                if (conceptName == '0') {
                    $('#period-dropdown').css('border', '1px solid red');
                    $('#error .message').html('انتخاب بازه زمانی الزامی است.');
                    $('#error .message').show();

                    setTimeout(function () {
                        $('#error .message').fadeOut();
                    }, 3000);
                } else {
                    error = false;

                }
            } else {
                if (selectedDate == undefined) {
                    $('#error .message').html('انتخاب روز الزامی است.');
                }
                $('#error .message').show();

                setTimeout(function () {
                    $('#error .message').fadeOut();
                }, 3000);
            }
            //TODO Show Error
        } else if (currentStep == 3) {
            var fullname = $('input#full-name').val();
            var phoneNumber = $('input#phone-number').val();
            var terms = $('input#terms:checked').val();

            if (fullname != '' && phoneNumber != '' && terms != undefined) {
                $('#loader').show();
                $.ajax({
                    url: "/ajax/form", // Url of backend (can be python, php, etc..)
                    type: "POST", // data type (can be get, post, put, delete)
                    async: false,
                    data: {
                        'form': $('#msform').serializeArray(),
                    }, // data in json format
                    async: false, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
                    dataType: 'json',
                    success: function (response, textStatus, jqXHR) {
                        $('#loader').hide();
                        if (response.success) {
                            error = false;
                            $('#success-message').html(response.message);
                        } else {
                            $('#error .message').html(response.message);
                            $('#error .message').show();
                            setTimeout(function () {
                                $('#error .message').fadeOut();
                            }, 3000);
                            error = true;
                        }

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            } else {
                if (fullname == '') {
                    $('#error .message').html('نام و نام خانوادگی الزامی است.');
                    $('input#full-name').css('border-bottom', '1px solid red')
                } else if (phoneNumber == '') {
                    $('#error .message').html('شماره موبایل الزامی است.');
                    $('input#phone-number').css('border-bottom', '1px solid red')
                } else if (phoneNumber.length != 11) {
                    $('#error .message').html('شماره موبایل باید ۱۱ عدد باشد.');
                } else {
                    $('#error .message').html('شما باید قوانین را قبول کنید.');
                }
                $('#error .message').show();

                setTimeout(function () {
                    $('#error .message').fadeOut();
                }, 3000);
            }
        }
        if (error == false) {
            $([document.documentElement, document.body]).animate({
                scrollTop: 0
            }, 500);
            //Add Class Active
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    next_fs.css({
                        'opacity': opacity
                    });
                },
                duration: 600
            });
        }

    });

    $(".previous").click(function () {

        current_fs = $(this).parent().parent();
        previous_fs = $(this).parent().parent().prev();
        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({
                    'opacity': opacity
                });
            },
            duration: 600
        });
    });

    $('.radio-group .radio').click(function () {
        $(this).parent().find('.radio').removeClass('selected');
        $(this).addClass('selected');
    });

    $(".submit").click(function () {
        return false;
    })
    $(document).on('click', 'td.active', function () {
        $(this).find('input').attr('checked', 'checked');
        $(this).find('input').trigger('change');
    });

    $(document).on('change', '.active input', function () {
        $('#loader').show();

        $(this).parent().parent().find('td').removeClass('selected');
        $(this).parent().addClass('selected');

        var selectedBranch = $('.departments input[type=radio]:checked').val();
        var selectedDate = $(this).val();
        var periodContainer = $('#period-dropdown');


        $.ajax({
            url: "/ajax/days", // Url of backend (can be python, php, etc..)
            type: "POST", // data type (can be get, post, put, delete)
            data: {
                'branch': selectedBranch,
                'date': selectedDate
            }, // data in json format
            async: false, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
            success: function (response, textStatus, jqXHR) {
                var html;
                html = '';
                html = '<option value="0" selected>بازه زمانی مورد نظر خود را انتخاب نمایید</option>';
                periodContainer.html(html);
                $.each(JSON.parse(response), function (i, item) {
                    if (item.isFree == true) {
                        html = '<option value=' + item.id + '>' + item.day_section + ' - ' + item.title + '</option>';
                    } else {
                        html = '';
                    }
                    periodContainer.append(html);
                });
                if (periodContainer.html() == '') {
                    periodContainer.html('متاسفانه  بازه زمانی خالی وجود ندارد. لطفا روز دیگری را انتخاب نمایید.')
                }

                $('#loader').hide();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });

    });

    $('#phone-number').on('keypress', function (key) {
        if ($(this).val().length == 11) return false;
        if (key.charCode < 48 || key.charCode > 57) return false;
    });

    $('#phone-number').on('keyup', function (key) {
        if ($(this).val().charAt(0) != '0' && $(this).val().charAt(0) != '') {
            $('#error .message').html('شماره موبایل باید با ۰ شروع شود.');
            $('#error .message').show();
            $(this).val('');
            setTimeout(function () {
                $('#error .message').fadeOut();
            }, 3000);
            return false;
        }
    });

    $('.department-branch-lists input').on('click', function (e) {
        $('.selected-dapartment').removeClass('selected-dapartment');
        $(this).parent().parent().addClass('selected-dapartment');
    });
    $('.department-branch-lists input:checked').parent().parent().addClass('selected-dapartment');


    $(document).on('click', '.terms-hover', function (e) {
        $('.terms-pop-up').show();
    });

    $(document).on('click', '.terms-close-button', function (e) {
        $('.terms-pop-up').hide();
    });


    $(document).on('click', '.department-header', function (e) {
        var icon = $(this).find('.dropdown-icon i').attr('class');
        if (icon == 'fa fa-chevron-circle-down') {
            $(this).parent().find('.department-branch-lists').hide();
            $(this).find('.dropdown-icon i').attr('class', 'fa fa-chevron-circle-up');
        } else {
            $(this).parent().find('.department-branch-lists').show();
            $(this).find('.dropdown-icon i').attr('class', 'fa fa-chevron-circle-down');
        }

    });



});
