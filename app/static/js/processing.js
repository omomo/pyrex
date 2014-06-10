$( "input.regex_string, textarea.input_string, input.multiline_bool, input.dotall_bool, input.verbose_bool, input.ignorecase_bool, input.unicode_bool" ).on("input", function () {
  $('p.ajax_disp1').text('disp1 ' + $('input.regex_string').val());
  $('p.ajax_disp2').text('disp2 ' + $('textarea.input_string').val());

  var multiline_bool = $('input.multiline_bool').prop("checked");
  var dotall_bool = $('input.dotall_bool').prop("checked");
  var verbose_bool = $('input.verbose_bool').prop("checked");
  var ignorecase_bool = $('input.ignorecase_bool').prop("checked");
  var unicode_bool = $('input.unicode_bool').prop("checked");

  // $('p.ajax_disp3').text('disp3 ' + multiline_bool);
  // $('p.ajax_disp4').text('disp4 ' + dotall_bool);
  // $('p.ajax_disp5').text('disp5 ' + verbose_bool);
  // $('p.ajax_disp6').text('disp6 ' + ignorecase_bool);
  // $('p.ajax_disp7').text('disp7 ' + unicode_bool);

  var regex_string = $("input.regex_string").val();
  var input_string = $("textarea.input_string").val();

  pass_data = JSON.stringify({'regex_string': regex_string, 'input_string': input_string, 'multiline_bool': multiline_bool,
  'dotall_bool': dotall_bool, 'verbose_bool': verbose_bool, 'ignorecase_bool': ignorecase_bool, 'unicode_bool': unicode_bool});

  $.ajax({
    type: 'POST',
    url: '/compute_regex',
    data: pass_data,
    contentType: 'application/json;charset=UTF-8',
    success: function(data) {
      // console.log(data);
      highlight_array = []

      if (data['result'] == 'error') {
        $( "div.highlight" ).empty();
        $( "div.match" ).empty();
        return
      }
      highlighted_string = data['highlight']
      data = data['group_dict']

      display_string = ''

      match_c = 0
      for (var match in data) {
        match_c += 1
        display_string += '<b>Match ' + match_c + "</b><br>"
        if (data.hasOwnProperty(match)) {
          group_length = data[match].length;

          group_c = 0
          for (var i=0; i<group_length; i++) {
            display_string += 'Group ' + group_c + ": "
            group_str = data[match][i]['group']
            display_string += group_str + "<br>"
            group_c += 1
          }
      // console.log(highlight_array);
        }
      }

      $( "div.highlight" ).empty();
      $( "div.highlight" ).append(highlighted_string);

      $( "div.match" ).empty();
      $( "div.match" ).append(display_string);

    },
  });
});
