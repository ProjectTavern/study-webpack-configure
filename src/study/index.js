import $ from "jquery";

const dataset = {
  spring: "스프링",
  java: "자바",
  javascript: "자바스크립트",
  lambda: "람다",
  tcpip: "TCP/IP",
  database: "데이터베이스"
};

const sessionKey = "currentPage";
const $tabs = $('.tabs li');

$tabs.on('click', function(event) {
  const $elem = $(event.currentTarget);
  $elem.addClass('on').siblings().removeClass('on');
  /* $('.tabs li').removeClass('on'); */
  /* .siblings() => a 태그의 href 등으로 페이지 이동할 때는 사용하지 말 것 */
  const elementIndex = $elem.index();
  const $viewItems = $('.view_item');
  $viewItems.addClass('hide');
  $viewItems.eq(elementIndex).removeClass('hide');
  (document.getElementsByTagName('h1')[0]).innerHTML = `스터디 페이지${elementIndex + 1}`;
  sessionStorage.setItem(sessionKey, elementIndex);
});

const $selectBoxes = $('.list_curri input[type="checkbox"]');
const $selectedTodo = $('.selected_todo ul');
$selectBoxes.on('click', function(event) {
  const $elem = $(event.currentTarget);
  let currentData = sessionStorage.getItem('selectedStudy');
  const currentElem = $elem.val();
  const itemName = dataset[currentElem];

  if ($elem.prop('checked')) {
    const template = `<li>${itemName}</li>`;
    $selectedTodo.append(template);

    currentData = [currentElem, currentData].filter(elem => elem).join();
    sessionStorage.setItem('selectedStudy', currentData);
  } else {
    const $todoList = $selectedTodo.find('li');
    $todoList.each(function(index, elem){
      const $removeItem = $(elem);
      if ($removeItem.text() === itemName) {
        $removeItem.remove();
      }
    });
    let selectedData = currentData.split(',');
    selectedData = selectedData.filter(function(elem) {
      return elem !== currentElem;
    });
    sessionStorage.setItem('selectedStudy', selectedData.join());
  }
});

let getDataDone = false;
$('#call_ajax').on('click', function(event) {
  if (getDataDone) return;
  $.ajax({
    url: "http://igem.org/aj/team_list.cgi",
    type: "GET",
    dataType: "json",
    timeout: 10000,
    async: false,
    data: {}
  }).done(function(data, textStatus, jqxhr) {
    const $list = $('.region');
    data.forEach(function(elem) {
      const template = `<li>${elem.country} / ${elem.region}</li>`;
      $list.append(template);
    });
    getDataDone = true;
  }).fail(function(jqxhr, textStatus, errorThrown) {
    console.log(textStatus);
    console.log(jqxhr);
  });

});

const getIndex = sessionStorage.getItem(sessionKey);
if (getIndex !== undefined) {
  $tabs.eq(getIndex).trigger('click');
}
let selectedStudies = sessionStorage.getItem('selectedStudy');
if (selectedStudies !== undefined) { // 아무것도 없을 때 말고 처리한다
  selectedStudies = selectedStudies.split(',');
  $selectBoxes.each((index, elem) => {
    const selectElem = $(elem);
    const elemVal = $(elem).val();
    selectedStudies.forEach((elem, index) => {
      if (elem === elemVal) {
        const itemName = dataset[elem];
        const template = `<li>${itemName}</li>`;
        selectElem.attr('checked', true);
        $selectedTodo.append(template);
      }
    })
  });
}
