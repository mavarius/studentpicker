$(document).ready(init)

function init() {
  $('#add').click(addStudents);
  $('#form_teams').click(formTeams);
  $('#prefect').click(choosePrefect);

  // declare global variables
  var $list;
  var totalStudents = [];

  // handler for Add Students button
  function addStudents() {
    var $nameInput = $('#name');

    // input list into array of names
    var names = $nameInput.val().split(",");
    $nameInput.val('');

    // strip trailing spaces
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

  // handler for Form Teams button
  function formTeams() {
    $("#teams").children().remove();
    var $teamInput = $('#team_size');
    var teamSize = $teamInput.val();

    if (teamSize > 0 && teamSize <= totalStudents.length) {
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
    } else if (teamSize <= 0) {
      $("#teams").append("<p>You must input more than 0 teams.</p>");
    } else {
      $("#teams").append(`<p>Number of teams must be less than ${totalStudents.length}.</p>`);
    }
  }

  // handler for Choose Prefect Button
  function choosePrefect() {
    $list = $('#list').children();
    var rand = Math.floor(Math.random() * $list.length);
    var prefect = $list[rand].innerHTML;
    $(".prefect_pick").text(`Prefect: ${prefect}`);
  }

  // array shuffler
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
}

// Test Set: David,Daniel,Jack,Harper,Madhu,Funke,Charles,Eric,Scott,Jean,Barb
