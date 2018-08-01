let numbers = Array.from(Array(10).keys()); 
let number = ''; 
let score = '';

function checkUnique(array) {
  return array.length === new Set(array).size;
}

function randomNumber(min = 0,max = 10) {
  if (numbers.length == 6) {
    return number
  } else {
    let num = Math.floor( Math.random() * (max - min) + min);
    if (numbers.includes(num)) {
      let index = numbers.indexOf(num);
      numbers.splice(index,1);
      number = number + `${num}`
    }
    return randomNumber();
  }
}

function points(input) {
  let picas = 0;
  let fijas = 0;
  const goalNumber = number.split('');

  input.forEach((item,index) => {
    let exist = goalNumber.indexOf(item)
    if (exist >= 0) {
      if (exist == index) {
        fijas += 1;
      } else {
        picas += 1;
      }
    }
  })
  return `${fijas},${picas}`
}

function createElements(items,n) {
  const row = document.createElement('tr');
  $(row).appendTo('tbody');
  $(row).append(`<td>${n}</td><td>${items[1]}</td><td>${items[0]}</td>`);
}

function game() {
  randomNumber();
  $('#new-number').keyup(function(event) {
    let $fvalue = $(this).val()
    let $value = $fvalue.split('');
    let uniqueNum = checkUnique($value);

    if (event.which == 13) {
      $('#new-number').val('');
      if ($value.length > 4 || !uniqueNum || $value.length == 0) {
        $('span').addClass('error');
      } else {
        $('span').removeClass('error');
        score = points($value).split(',');
        createElements(score,$fvalue);
        if (score[0] == '4') {
          $('section,header').hide();
          $('body').css('background','#8c8c8c')
          $('.result').show();
          $('#new-number').val('');
        }
      }
    }
  })
};

//Start
game();

$('#again').click(function(event) {
  $('body').css('background','#f5f5f2')
  $('section, header').show();
  $('.result').hide();
  number = '';
  score = '';
  numbers = Array.from(Array(10).keys());
  $('tbody').html('');
  game();
})