
function separateNum(value, input) {
    /* seprate number input 3 number */
    var nStr = value + '';
    nStr = nStr.replace(/\,/g, "");
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    if (input !== undefined) {

        input.value = x1 + x2;
    } else {
        return x1 + x2;
    }
}


$(document).ready(function () {

    $('#meetings-table').DataTable({
        "paging":   false,
        "filter":   false,
        "info":   false,
        "aaSorting": []
    });

    $('.delete-btn').click(function(){
        return confirm("آیا از حذف این مورد اطمینان دارید؟");
    });

    $('.meeting-delete-btn').click(function(){
        return confirm("با این کار تمامی جلسات مربوط به این شعبه حذف می‌شوند. ایا از اینکار مطمئن هستد؟");
    });



    // $('.select2').select2();

    $('.date-picker').persianDatepicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        persianNumbers: !0,
        rtl: true,
        initialValue: false,
        initialValueType : 'persian',
        timePicker: {
            enabled: true,
            meridiem: {
                enabled: true
            }
        }
    });

    $('.price-mask').each(function(i, obj) {
        $(this).val(separateNum($(this).val()));
    });
    
    $('.price-mask').on('keyup' , function(){
        $(this).val(separateNum($(this).val()));
    });  
});