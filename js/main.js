$(document).ready(init)

function init() {
  $('#add').click(addStudents);
  $('#form_teams').click(formTeams);

  var $list;
  var totalStudents = [];

  function addStudents() {
    var $nameInput = $('#name');

    // input list into array of names
    var names = $nameInput.val().split(",");
    $nameInput.val('');

    // strip trailing spaces
    // FIXME: Double space entries
    names = names.map(function(item, index){
      if (item[0] == " ") {
        item = item.slice(1,item.length);
      }
      if (item[item.length-1] == " ") {
        item = item.slice(0,item.length-1);
      }
      return item;
    })

    for (name in names) {
      totalStudents.push(names[name]);
      var $li = $('<li>');
      $li.text(names[name]);

      if($li.text()) {
        $('#list').append($li);
      }
    }
  }

  function formTeams() {
    $list = $('#list').children();
    var $teamInput = $('#team_size');
    var teamSize = $teamInput.val();

    var teamSet = {};
    for (var i = 0; i < teamSize; i++) {
      teamSet[i] = [];
    }

    for (var i = 0; i < teamSize; i++) {
      $("#teams").append("<ul class='team'><h4>TEAM "+(i+1)+"</h4></ul>");
    }

    var assigner = 0;
    var teamCache = [...totalStudents];
    shuffle(teamCache);

    while (teamCache.length > 0) {
      var lastItem = teamCache.length-1;
      teamSet[assigner].push(teamCache[lastItem]);
      teamCache = teamCache.splice(0, lastItem);

      if (assigner < teamSize-1) {
        assigner++;
      } else {
        assigner = 0;
      }
    }

    for (var x = 0; x < teamSize; x++) {
      for (var y = 0; y < teamSet[x].length; y++) {
        $("#teams .team:nth-of-type("+(x+1)+")").append("<li>"+teamSet[x][y]+"</li>");
      }
    }

    // chooseCaptain();
  }
}

function chooseCaptain() {
  var rand = Math.floor(Math.random() * $list.length);
  var captain = $list[rand].innerHTML;
  $("#teams").append("<p class='.captain'> Team Captain: "+captain+"</p>");
  $("#teams").append(`<p class='.captain'> Team Captain: ${captain}</p>`);
}

function shuffle(array) {
  var counter = array.length;

  while (counter > 0) {
    var index = Math.floor(Math.random() * counter);

    counter--;

    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// David,Daniel,Jack,Harper,Madhu,Funke,Charles,Eric,Scott,Jean,Barb
