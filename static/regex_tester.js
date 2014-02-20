//^(?!.*((....) \2)|(..)11 \3[1]0|(.)011 \4[1]0).*$
//still TODO

// css-ify it
// remove leftover onclicks in html code snippet for moar unobtrusive javaskrupt
// initialize closure with giving the relevant ids as strings
// add comments to regex match
// add regex options (case isnenstive, multilene, dot match all etc)




//Could use MOAR work

// somehow show inbisibul characters -- added a pipe symbol for zero matches, still
//should add some colors and stuff and show spaces as something (underscore is a temp fix)
// show multipul matches bettur

// serious problem with export, why doesnt it export plus sign?? 
//fixed for now-- made it encode it properly, more problems may follow with urlencoding though) 
// is it possible to upload without urlencoding?

// prevent adding the empty string -- what's the best way UI-wise ?



//DONE

// when flipping fix bug that keeps match -- I think it's fixed?
// serious problem with zero width matches, fix 
//also code duplication fix in finding matches
// add as you tyep validation
// add clear all button
// MAKE IT BIGGUR for biggur texts as an opshun -DONE
//Make nice tabul - DONE
//Export <-done
//load (maybe decode/encode base64 ?) - done
// + validaet + populate from loaded json -done
// Flip match functionality wif buttn - DONE
// bigger text for inputs -DONE
// fix bug on unmatched - DONE
//little x button to remoev - DONE (version bare bones)
//CLEAR text as soon as you add regex - DONE
//highlight matchuz - DONE 
// escape characters from string & HTML - DONE (magically seems to still match regexes and stuff with <>s

// turn into one big closure -DONE
// get rid of onclicks? - DONE






var _regexTester = (function(document) {

    var create_row = function(htmlStr, klass) {

      temp = document.createElement('tr');
      temp.innerHTML = htmlStr;
      temp.className = klass;

      return temp;

    };
    var create = function(htmlStr) {
      var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
      temp.innerHTML = htmlStr;
      while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
      }
      return frag;

    }


    var process_text = function(str) {
      return display_spaces(escape_html(str));
    }
    var escape_html = function(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    var display_spaces = function(str) {

      return str.replace(/\s/g, '_');
    }

    var get_all_matches = function() {

    	var p = document.getElementsByClassName("positive_match");
    	var n = document.getElementsByClassName("negative_match");

		return [].slice.call(p).concat([].slice.call(n));

		// concatenating nodelists is serious business
		// http://stackoverflow.com/questions/2430121/javascript-concatenate-multiple-nodelists-together

    }

    var clear_all = function(){
    	var matches = get_all_matches();
    	 for (var i = 0; i < matches.length; i++) {
    	 	matches[i].parentNode.removeChild(matches[i])
    	 }

    }

    var find_match = function(re,val) {

        var ms = 0;
        var prev=0;
        var text = ""
        var first = true;
        do {
          console.log("last indexL?"+re.lastIndex);
          var m = re.exec(val);
          console.log(m);

          if (m) {
           
             if(re.lastIndex == m.index && first!=true) {

             	first=true;
             	// weirdness
             	// http://www.regexguru.com/2008/04/watch-out-for-zero-length-matches/
            	
            	console.log("Zero width match? width of match="+m[0].length)
                console.log("last index:"+re.lastIndex);
                re.lastIndex=re.lastIndex+1
              	continue;
            }
            first=false;
            console.log(m[0]);
            ms++;
            console.log("match for:"+val+"found at index:"+m.index);
            if (m[0].length>0)
            text += process_text(val.substring(prev, m.index)) +
             "<b>" + process_text(val.substring(m.index, m.index + m[0].length)) + "</b>";
             else
             	text+=process_text(val.substring(prev, m.index))+"|";
            console.log(m.index);
           
            prev = re.lastIndex;
          }
        } while (m);
        text += process_text(val.substring(prev, val.length));

        console.log("matches:+"+ms);

    	return {text:text, num_matches:ms}
    }

    var check_regex = function(e) {

      var regex = document.getElementById("regex").value;
      if(regex=="")
      	return;
      var matches = document.getElementsByClassName("positive_match");
      var re = new RegExp(regex, 'g');


      for (var i = 0; i < matches.length; i++) {

       var val = matches[i].getElementsByClassName("match_text")[0].firstChild.nodeValue;
       var result = find_match(re,val);
        if (result.num_matches < 1) {
          matches[i].getElementsByClassName("result")[0].className = "result failed";
      } else {

        matches[i].getElementsByClassName("result")[0].className = "result success";
        //console.log(result.text);
        matches[i].getElementsByClassName("matching_segments")[0].innerHTML = result.text;
      }


    }

    var matches = document.getElementsByClassName("negative_match")


    for (var i = 0; i < matches.length; i++) {
    	var val = matches[i].getElementsByClassName("match_text")[0].firstChild.nodeValue;
       var result = find_match(re,val);

      if (result.num_matches > 0) {
        matches[i].getElementsByClassName("result")[0].className = "result failed";
        matches[i].getElementsByClassName("matching_segments")[0].innerHTML = result.text;
      } else {

        matches[i].getElementsByClassName("result")[0].className = "result success";
        matches[i].getElementsByClassName("matching_segments")[0].innerHTML = "";

      }

    }
  }


  var add_match_internal = function(klass,type,opposite,match_text) {

  	var table = document.getElementById("match_table");

  	var fragment = create_row(' <td class = "ops" >' +
      '<a href="#" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);">X</a>'+
      ' <a href="#" class="flip">Flip</a>' +
      '<td class="type">' + type + '</td > <td class="result"> </td>'+
      '</td> <td class = "match_text" >' + match_text + '</td>' +
      '<td class="matching_segments"></td >', klass + "_match");
    var elem = table.appendChild(fragment);

    elem.getElementsByClassName("flip")[0].addEventListener("click", function(e) {
      console.log("flipped");
      console.log(elem.className);
      if (elem.className == "positive_match") {
        elem.className = "negative_match";
        elem.getElementsByClassName("type")[0].textContent = "Do not Match";
      } else {
        elem.className = "positive_match";
        elem.getElementsByClassName("type")[0].textContent = "Match";
      }
     
       console.log("after:"+elem.className);
       check_regex();
    }, false);

  }

  var add_match = function(klass) {

    var match_text = escape_html(document.getElementById("match").value);
    if (match_text.trim()=="") {
    	console.log("Empty space :(")
    	return;
    }
    var type = "Match";
    var opposite = "negative";
    if (klass == "negative") {
      type = "Do not " + type;
      opposite = "positive";
    }
    document.getElementById("match").value = "";

    add_match_internal(klass,type,opposite,match_text);
    check_regex();
    
  };



 var import_config = function() {

	var fiel = document.getElementById("fiels")
	console.log(fiel.files[0])
	var reader = new FileReader();
	reader.readAsText(fiel.files[0]);
	reader.onload = function(e) {
	var text = JSON.parse(reader.result);
	console.log("contents:"+text)
	//window.alert(text); 

	console.log(text);

	/* delete existing rows */

	var rows = Array.prototype.slice.call(document.getElementsByClassName("positive_match"))
	.concat(Array.prototype.slice.call(document.getElementsByClassName("negative_match")));

	for (var i = 0; i < rows.length; i++) {

		rows[i].parentNode.removeChild(rows[i]);

	}

	/* load new ones from json */
	console.log("pos:"+text["positive"]);
	var m = text["positive"];

	for (var i = 0; i < m.length; i++) {

		add_match_internal("positive","Match","Do not Match",m[i]);

	}

	m = text["negative"];

	for (var i = 0; i < m.length; i++) {

		add_match_internal("negative","Do not Match","Match",m[i]);

	}

	if(text["regex"]) { 
		document.getElementById("regex").value = text["regex"];
		check_regex();
	}
	else 
		document.getElementById("regex").value="";

 }
};


  var export_config = function() {

    var json;
    var data = {};
    data["regex"] = document.getElementById("regex").value.replace(/\+/g, '%2B'); 
    data["positive"] = new Array();
    data["negative"] = new Array();
    var m = document.getElementsByClassName("positive_match");
    for (var i = 0; i < m.length; i++) {

      text = m[i].getElementsByClassName("match_text")[0].firstChild.nodeValue;
      data.positive.push(text.replace(/\+/g, '%2B'));


    }

    m = document.getElementsByClassName("negative_match");
    for (var i = 0; i < m.length; i++) {

      text = m[i].getElementsByClassName("match_text")[0].firstChild.nodeValue;
      data.negative.push(text.replace(/\+/g, '%2B'));


    }

    var json =JSON.stringify(data);
    console.log(json);
    var url = "/export?json="+json
	window.open(url);


  };

  return {
    add_handlers: function() {
      
      
      document.getElementById("regex").addEventListener("keyup", function(e) {
        console.log(e);
        setTimeout(function(){check_regex(e)},500);
      }, false);

      document.getElementById("regex").addEventListener("onblur", function(e) {
        console.log(e);
        setTimeout(function(){check_regex(e)},500);
      }, false);
      document.getElementById("submit_regex").addEventListener("click", function(e) {
        console.log(e);
        check_regex(e);
      }, false);

      document.getElementById("positive").addEventListener("click", function(e) {
        console.log("clicked");
        add_match("positive");
      }, false);

  document.getElementById("negative").addEventListener("click", function(e) {
        console.log("clicked");
        add_match("negative");
      }, false);

    document.getElementById("clear").addEventListener("click", function(e) {
        console.log("clear");
        clear_all();
      }, false);

   document.getElementById("btn").addEventListener("click", function(e) {
          console.log("import");
        import_config();
      }, false);




      document.getElementById("export").addEventListener("click", function(e) {
        console.log("export");
        export_config();
      }, false);

    }
  };
})(window.document);


window.onload = function() {
  _regexTester.add_handlers();

}
