// This is a closure function https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36
   
(function()
 {
	var name = document.querySelector('name');
    var phno = document.querySelector('phonenum');
    var email = document.querySelector('emailid');
    var button = document.querySelector('.button');
    var department1 = document.querySelector('dept1');
    var department2 = document.querySelector('dept2');
  var initialize = function()
  {
     button.addEventListener("click", onSubmit);
     department1.addEventListener("change", disableDuplicateSecondaryDepartment);
  
  };

  var disableDuplicateSecondaryDepartment = function(event) 
  {
	  console.log("ok");
    
	 for (let i = 0; i < 4; i++) {
      if (department2.children[i].innerText == department1.value) {
        department2.children[i].disabled = true;
        if (i < 3) {
          department2.children[i + 1].selected = true;
        } else {
          department2.children[2].selected = true;
        }
      } else {
        department2.children[i].disabled = false;
      }
    }
	
  }

  var constructData = function()
  {
    var data = {};
    data.name = name.value;
    data.phno = phno.value;
    data.emailaddress = email.value;
    data.department1 = department1.value;
    data.department2 = department2.value;
    return data;
  };

  var validateResults = function(data) 
  {
    var isValid = true;

	const emailExpression = /^([a-zA-Z0-9\.])+@college+(\.edu)*$/;
    if (
      data.phno.length == 0 ||
      data.phno.length > 10 ||
      (data.name.trim() === "" || data.name.length > 101) ||
      !emailExpression.test(data.emailaddress)||
	  (department1.value==department2.value)
    ) {
      isValid = false;
    } else {
      isValid = true;
    }
    return isValid;
  };

  var onSubmit = function(event)
  {
    event.preventDefault();
    console.log("ok");
    var data = constructData();
    console.log(data);
    if (validateResults(data)) {
      printResults(data);
    } else {
      var resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = '';
      resultsDiv.classList.add("hide");
    }
  };
 

  var printResults = function(data) 
  {
    var constructElement = function([key, value]) {
      return `<p class='result-item'>${key}: ${value}</p>`;
    };

    var resultHtml = (Object.entries(data) || []).reduce(function(innerHtml, keyValuePair) {
      debugger
      return innerHtml + constructElement(keyValuePair);
    },
	'');
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = resultHtml;
    resultsDiv.classList.remove("hide");
  };

  document.addEventListener('DOMContentLoaded', initialize);
})
();

