// Generated by CoffeeScript 1.12.7
(function() {
  var arrayMarker, buttonHTMLfr, buttonHTMLol, buttonHTMLonlyFr, buttonHTMLonlyOl, map, number, searchTag, size, upFirstStr;

  arrayMarker = [];

  number = 0;

  buttonHTMLfr = '<div class="text-center"><div class="btn-group btn-group-toggle" data-toggle="buttons"><label class="active btn btn-secondary" id="french"><input type="radio" name="french" autocomplete="off"> Français</label><label class="btn btn-secondary" id="other"><input type="radio" name="other" autocomplete="off"> Langue original</label></div></div>';

  buttonHTMLol = '<div class="text-center"><div class="btn-group btn-group-toggle" data-toggle="buttons"><label class="btn btn-secondary" id="french"><input type="radio" name="french" autocomplete="off"> Français</label><label class="active btn btn-secondary" id="other"><input type="radio" name="other" autocomplete="off"> Langue original</label></div></div>';

  buttonHTMLonlyFr = '<div class="text-center"><div class="btn-group btn-group-toggle" data-toggle="buttons"><label class="active btn btn-secondary" id="french"><input type="radio" name="french" autocomplete="off"> Français</label></div></div>';

  buttonHTMLonlyOl = '<div class="text-center"><div class="btn-group btn-group-toggle" data-toggle="buttons"><label class="btn btn-secondary" id="other"><input type="radio" name="other" autocomplete="off"> Langue original</label></div></div>';

  size = function() {
    return $('#map').css('height', $(window).height() - $('nav')[0].clientHeight - $('footer').height());
  };

  upFirstStr = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  searchTag = function(element) {
    var list;
    list = [];
    element.each(function(index, value) {
      if (value.innerText === '[ol]') {
        list.push([index]);
      }
      if (value.innerText === '[/ol]') {
        list.push([index]);
      }
      if (value.innerText === '[fr]') {
        list.push([index]);
      }
      if (value.innerText === '[/fr]') {
        return list.push([index]);
      }
    });
    return list;
  };

  $(window).ready(function() {
    return size();
  });

  $(window).resize(function() {
    return size();
  });

  $(document).ready(function() {
    return size();
  });

  size();

  map = L.map('map').setView([45.19, 5.77], 4);

  $.getJSON('manager/manager/testimonies/index.json', function(data) {
    return $.each(data, function(i, v) {
      var ref, ref1;
      if (((ref = v['longitude']) !== 0 && ref !== '0') && ((ref1 = v['status']) !== 0 && ref1 !== '0')) {
        arrayMarker.push([
          L.marker([parseFloat(v['longitude']), parseFloat(v['latitude'])], {
            alt: v['id']
          }), v['id']
        ]);
        return arrayMarker[arrayMarker.length - 1][0].addTo(map);
      }
    });
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 2,
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
  }).addTo(map);

  size();

  $('main').on("click", "img", function(e) {
    number = e['currentTarget'].alt;
    $.getJSON('manager/manager/testimonies/testimonies' + number + '.json', function(data) {
      var allElement, elementPfr, elementPol, elements, fr, listP, ol;
      $('.modal-title').empty().append('<p style="font-size: 2em;">Témoignage de <strong>' + upFirstStr(data['witnessesName']) + " " + upFirstStr(data['witnessesLastName']) + '</strong></p><p style="font-style: italic">' + data['country'] + " / " + data['region'] + " / " + data['city'] + '</p>');
      elements = data['elements'];
      $('.modal-body').html(elements);
      elements = $($('.modal-body').text());
      $('.modal-body').html('').append(elements);
      listP = searchTag($('.modal-body p'));
      if (listP.length === 4) {
        elementPol = [];
        elementPfr = [];
        $('.modal-body p').each(function(index, value) {
          if (index > listP[0] && index < listP[1]) {
            elementPol.push(value);
            value.remove();
          }
          if (index > listP[2] && index < listP[3]) {
            elementPfr.push(value);
            return value.remove();
          }
        });
        listP = searchTag($('.modal-body p'));
        $('.modal-body p:eq(' + listP[3] + ')').remove();
        $('.modal-body p:eq(' + listP[2] + ')').remove();
        $('.modal-body p:eq(' + listP[1] + ')').remove();
        listP = searchTag($('.modal-body p'));
      }
      allElement = '';
      elementPfr.forEach(function(element) {
        return allElement += element.outerHTML;
      });
      fr = true;
      ol = true;
      if (allElement === '<p><br></p>') {
        allElement = '';
        elementPol.forEach(function(element) {
          return allElement += element.outerHTML;
        });
        $('.modal-body p:eq(' + listP[0] + ')').replaceWith(buttonHTMLonlyOl + allElement);
        ol = true;
        fr = false;
      }
      allElement = '';
      elementPol.forEach(function(element) {
        return allElement += element.outerHTML;
      });
      if (allElement === '<p><br></p>') {
        allElement = '';
        elementPfr.forEach(function(element) {
          return allElement += element.outerHTML;
        });
        $('.modal-body p:eq(' + listP[0] + ')').replaceWith(buttonHTMLonlyFr + allElement);
        ol = false;
        fr = true;
      }
      if (fr === true && ol === true) {
        allElement = '';
        elementPfr.forEach(function(element) {
          return allElement += element.outerHTML;
        });
        return $('.modal-body p:eq(' + listP[0] + ')').replaceWith(buttonHTMLfr + allElement);
      }
    });
    $('.modal-body p:empty').remove();
    return $('#testimonies').modal('show');
  });

  $('main').on("click", "#other", function() {
    return $.getJSON('manager/manager/testimonies/testimonies' + number + '.json', function(data) {
      var allElement, elementPfr, elementPol, elements, listP;
      $('.modal-title a').text(upFirstStr(data['witnessesName']) + " " + upFirstStr(data['witnessesLastName']));
      elements = data['elements'];
      $('.modal-body').html(elements);
      elements = $($('.modal-body').text());
      $('.modal-body').html('').append(elements);
      listP = searchTag($('.modal-body p'));
      if (listP.length === 4) {
        elementPol = [];
        elementPfr = [];
        $('.modal-body p').each(function(index, value) {
          if (index > listP[0] && index < listP[1]) {
            elementPol.push(value);
            value.remove();
          }
          if (index > listP[2] && index < listP[3]) {
            elementPfr.push(value);
            return value.remove();
          }
        });
        listP = searchTag($('.modal-body p'));
        $('.modal-body p:eq(' + listP[3] + ')').remove();
        $('.modal-body p:eq(' + listP[2] + ')').remove();
        $('.modal-body p:eq(' + listP[1] + ')').remove();
        listP = searchTag($('.modal-body p'));
      }
      allElement = '';
      elementPfr.forEach(function(element) {
        return allElement += element.outerHTML;
      });
      if (allElement === '<p><br></p>') {
        allElement = '';
        elementPol.forEach(function(element) {
          return allElement += element.outerHTML;
        });
        $('.modal-body p:eq(' + listP[0] + ')').replaceWith(buttonHTMLonlyOl + allElement);
      } else {
        allElement = '';
        elementPol.forEach(function(element) {
          return allElement += element.outerHTML;
        });
        $('.modal-body p:eq(' + listP[0] + ')').replaceWith(buttonHTMLol + allElement);
      }
      $('.modal-body p:empty').remove();
      return $('#testimonies').modal('show');
    });
  });

  $('main').on("click", "#french", function() {
    return $.getJSON('manager/manager/testimonies/testimonies' + number + '.json', function(data) {
      var allElement, elementPfr, elementPol, elements, listP;
      $('.modal-title a').text(upFirstStr(data['witnessesName']) + " " + upFirstStr(data['witnessesLastName']));
      elements = data['elements'];
      $('.modal-body').html(elements);
      elements = $($('.modal-body').text());
      $('.modal-body').html('').append(elements);
      listP = searchTag($('.modal-body p'));
      if (listP.length === 4) {
        elementPol = [];
        elementPfr = [];
        $('.modal-body p').each(function(index, value) {
          if (index > listP[0] && index < listP[1]) {
            elementPol.push(value);
            value.remove();
          }
          if (index > listP[2] && index < listP[3]) {
            elementPfr.push(value);
            return value.remove();
          }
        });
        listP = searchTag($('.modal-body p'));
        $('.modal-body p:eq(' + listP[3] + ')').remove();
        $('.modal-body p:eq(' + listP[2] + ')').remove();
        $('.modal-body p:eq(' + listP[1] + ')').remove();
        listP = searchTag($('.modal-body p'));
      }
      allElement = '';
      elementPol.forEach(function(element) {
        return allElement += element.outerHTML;
      });
      if (allElement === '<p><br></p>') {
        allElement = '';
        elementPfr.forEach(function(element) {
          return allElement += element.outerHTML;
        });
        $('.modal-body p:eq(' + listP[0] + ')').replaceWith(buttonHTMLonlyFr + allElement);
      } else {
        allElement = '';
        elementPfr.forEach(function(element) {
          return allElement += element.outerHTML;
        });
        $('.modal-body p:eq(' + listP[0] + ')').replaceWith(buttonHTMLfr + allElement);
      }
      $('.modal-body p:empty').remove();
      return $('#testimonies').modal('show');
    });
  });

}).call(this);

//# sourceMappingURL=map.js.map