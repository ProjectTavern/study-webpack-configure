import $ from 'jquery';

const $btn = $('#btn');

$btn.on('click', preSet);
/**
 * Ajax TestServer : http://igem.org/AJAX_Tester
 * */
function ajaxCalling() {
  $.ajax({
    "url": "http://igem.org/aj/team_list.cgi",
    "type": "GET",
    "dataType": "json",
    "timeout": 10000,
    "data": {},
    "async": false
  }).done(function(data, textStatus, jqxhr) {
    console.log(data);
  }).fail(function(jqxhr, textStatus, errorThrown) {
    console.log(jqxhr);
  });
}

let globalVariableCounter = 0;

function preSet() {
  console.log(++globalVariableCounter);
  ajaxCalling();
  console.log(--globalVariableCounter);
}