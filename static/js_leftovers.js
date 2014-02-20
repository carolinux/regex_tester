// misc functions that did not make it to main and are unused

var click_link = function(link)
{
   // example
   // var link = document.createElement('a');
   //link.href = url;
   //document.body.appendChild(link);
   //click_link(link); 
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

var http_get = function(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
