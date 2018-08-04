import $ from 'jquery';

/**
 * AJAX sync로 사용할 경우와 async를 사용할 경우에
 * Deferred 객체를 가지고 어떻게 반응이 되는지 화면에서 테스트 해보는 실험
 *
 * async : false를 사용할 경우 화면 전체의 코드를 일시적으로 프리징(실제 동기적으로 코드를 움직이는데다가 js는 쓰레드가 1개 뿐이니 자동 프리징)
 * async : true를 사용하는 경우 코드를 프리징 하지 않는다. 비동기적으로 동작하기 때문에 지연객체를 활용하여 받아와야 한다.
 *
 * async : false는 전체 화면을 프리징 시키고 화면을 이동시켜야할 정도로 중요한 사안에서 활용하는 것이 좋을 것 같다.
 * */

/**
 * 화면 상에서 계속 동작 중인 특정한 함수 설정
 * */
let intervalCounter = 0;
setInterval(function(){console.log(++intervalCounter)}, 100);

/**
 * 비동기적 동작을 위한 AJAX 모듈
 * 지연 객체를 내부에 삽입하고 리졸브
 * Ajax TestServer : http://igem.org/AJAX_Tester
 * */
function ajaxCalling() {
  $.ajax({
    "url": "http://igem.org/aj/team_list.cgi",
    "type": "GET",
    "dataType": "json",
    "timeout": 10000,
    "data": {},
    // "async": false
  }).done(function(data, textStatus, jqxhr) {
    console.log(data);
    $endPoint.resolve(data);
  }).fail(function(jqxhr, textStatus, errorThrown) {
    console.log(jqxhr);
    $endPoint.reject(jqxhr);
  });
  return $endPoint;
}

/**
 *  globalVariableCounter : 확인을 위한 글로벌 변수 카운터
 *  $endPoint             : 지연객체
 * */
let globalVariableCounter = 0;
let $endPoint = $.Deferred();
function preSet() {
  console.log(++globalVariableCounter);
  ajaxCalling().done(function(data) {
    console.log("Deferred Done.", data);
    console.log(--globalVariableCounter);
  }).fail(function(data) {
    console.log("Deferred Failed.", data);
    console.log(--globalVariableCounter);
  }).always(function(data) {
    $endPoint = $.Deferred();
  });
}

const $btn = $('#btn');
$btn.on('click', preSet);
