//^(?!.*((....) \2)|(..)11 \3[1]0|(.)011 \4[1]0).*$

// MAKE IT BIGGUR for biggur texts as an opshun -DONE

//Make nice tabul - DONE

//Export <-done
//load (maybe decode/encode base64 ?) - done
// + validaet + populate from loaded json 
// Flip match functionality wif buttn - DONE
// somehow show inbisibul characters
// show multipul matches bettur
// bigger text for inputs
// css-ify it
// fix bug on unmatched - DONE
// remove onclick in html code snippet for moar unobtrusive javaskrupt


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

      return str;
    }

    var check_regex = function(e) {

      var regex = document.getElementById("regex").value;
      if(regex=="")
      	return;
      var matches = document.getElementsByClassName("positive_match");
      console.log(matches);
      var re = new RegExp(regex, 'g');


      for (var i = 0; i < matches.length; i++) {

        var prev = 0;
        //alert(matches[i].value);
       // matches[i].className = "positive_match";
        var val = matches[i].getElementsByClassName("match_text")[0].firstChild.nodeValue;
        var ms = 0;
        var text = ""
        indices = new Array();
        do {
          var m = re.exec(val);

          if (m) {
            indices.push(m.index);
            console.log(m[0]);
            ms++;
            //	console.log(m);
            text += process_text(val.substring(prev, m.index)) + "<b>" + process_text(val.substring(m.index, m.index + m[0].length)) + "</b>";
            console.log(m.index);
            if(indices.length>=2 && m.index == indices[indices.length-2]) {
            
              // better get out
              // why does it loop? (better check: if m.index is equal to previous one, we achieved nothing)
              break;
            }
            prev = m.index + m[0].length;
          }
        } while (m);
        text += process_text(val.substring(prev, val.length));
        if (ms < 1) {
          matches[i].getElementsByClassName("result")[0].className = "result failed";
      } else {

        matches[i].getElementsByClassName("result")[0].className = "result success";
        console.log(indices);
        console.log(text);
        console.log(matches[i].parentNode.lastChild.tagName);
        matches[i].getElementsByClassName("matching_segments")[0].innerHTML = text;
      }


    }

    var matches = document.getElementsByClassName("negative_match")
    var re = new RegExp(regex, 'g');


    for (var i = 0; i < matches.length; i++) {
      ms = 0;
      prev = 0;
      text = "";
      //matches[i].className = "negative_match";
      var val = matches[i].getElementsByClassName("match_text")[0].firstChild.nodeValue;
      do {
        var m = re.exec(val);
        if (m) {
          console.log(m[0]);
          ms++;
          text += process_text(val.substring(prev, m.index)) + "<b>" + process_text(val.substring(m.index, m.index + m[0].length)) + "</b>";
          console.log(text);
          prev = m.index + m[0].length;
        }
      } while (m);
      text += process_text(val.substring(prev, val.length));
      if (ms > 0) {
        matches[i].getElementsByClassName("result")[0].className = "result failed";
        matches[i].getElementsByClassName("matching_segments")[0].innerHTML = text;
      } else {

        matches[i].getElementsByClassName("result")[0].className = "result success";
        matches[i].getElementsByClassName("matching_segments")[0].innerHTML = "";

      }

    }
  }
  var flip = function(row) {
    console.log(row);
  }

  var add_match_internal = function(klass,type,opposite,match_text) {

  	var table = document.getElementById("match_table");

  	var fragment = create_row(' <td class = "ops" >' +
      '<a href="#" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);">X</a> <a href="#" class="flip">Flip</a>' +
      '<td class="type">' + type + '</td > <td class="result"> </td></td> <td class = "match_text" >' + match_text + '</td>' +
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

    //TODO: change color with respect to match type

    var match_text = escape_html(document.getElementById("match").value);
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

var click_link = function(link)
{
   var allowDefaultAction = true;
      
   if (link.click)
   {
      link.click();
      return;
   }
   else if (document.createEvent)
   {
      var e = document.createEvent('MouseEvents');
      e.initEvent(
         'click'     // event type
         ,true      // can bubble?
         ,true      // cancelable?
      );
      allowDefaultAction = link.dispatchEvent(e);           
   }
         
   if (allowDefaultAction)       
   {
      var f = document.createElement('form');
      f.action = link.href;
      document.body.appendChild(f);
      f.submit();
   }
}

var http_get = function(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

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
    data["regex"] = document.getElementById("regex").value; 
    data["positive"] = new Array();
    data["negative"] = new Array();
    var m = document.getElementsByClassName("positive_match");
    for (var i = 0; i < m.length; i++) {

      text = m[i].getElementsByClassName("match_text")[0].firstChild.nodeValue;
      data.positive.push(text);


    }

    m = document.getElementsByClassName("negative_match");
    for (var i = 0; i < m.length; i++) {

      text = m[i].getElementsByClassName("match_text")[0].firstChild.nodeValue;
      data.negative.push(text);


    }

    var json = JSON.stringify(data);

    console.log(json);

     var url = "/export?json="+json

   // var link = document.createElement('a');
	//link.href = url;
	//document.body.appendChild(link);
	//click_link(link); 
	window.open(url);
	//newwin.close();

  };

var upload = function() {

 var client = new XMLHttpRequest();

      var file = document.getElementById("upload_file");
       console.log("fiel:"+file);
     
      /* Create a FormData instance */
      var formData = new FormData();
      /* Add the file */ 
      formData.append("file", file.files[0]);

      client.open("post", "/import", true);
      client.setRequestHeader("Content-Type", "multipart/form-data");
	
      client.send(formData);  /* Send to server */ 
 
     
   /* Check the response status */  
   client.onreadystatechange = function() 
   {
      if (client.readyState == 4 && client.status == 200) 
      {
         alert(client.statusText);
      }
   }

}


  //document.getElementsByClassName("positive_match")[0].getElementsByClassName("match_text")

  return {
    add_handlers: function() {
      
      //var elem = document.getElementById("match");
      //console.log("element:"+elem);
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
