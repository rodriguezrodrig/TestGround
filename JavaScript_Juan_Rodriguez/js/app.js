var Calculadora = {

  init: function() {
  "use strict";

  var el = function(element) {
    if (element.charAt(0) === "#") {
      return document.querySelector(element);
    }

    return document.querySelectorAll(element);
  };

  var viewer = el("#display"),
    inicio = el("#on"),
    point = el("#punto"),
    signo = el("#sign"),
    equals = el("#igual"),
    nums = el(".tecla"),
    ops = [el("#dividido"),el("#por"),el("#menos"),el("#mas"),el("#igual")],
    theNum = "",
    oldNum = "",
    loopNum = "",
    resultNum,    
    operator,
    operator2;

  var setNum = function() {

      this.style = "height : 60px";

      setTimeout(function(){nums[i].style = "height : 62.91px";}, 200);

      loopNum = 0;
      if (resultNum) {
        theNum = this.getAttribute("alt");
        resultNum = "";
      } else {
        if (theNum.length < 8) {
          if ( (eval(theNum) == 0)
              && (theNum.indexOf(".") == -1)
            )
           { theNum = this.getAttribute("alt");
           } else
           { theNum += this.getAttribute("alt");
           };
        }
      }
    viewer.innerHTML = theNum;
  };

  var dot = function(){
    if ( theNum.length == 0)
      { theNum = "0.";
      } else{
        if ( theNum.indexOf(".") == -1){
          theNum = theNum + ".";
        };
      };
    viewer.innerHTML = theNum;
  }

  var plusMinus = function(){
    if ( theNum.indexOf("-") == 0 ){
      theNum = theNum.substring(1);
      } else{
        theNum = "-" + theNum;
      };
    viewer.innerHTML = theNum;
 }

  var moveNum = function() {


    if (oldNum == "" || oldNum == 0) {
      oldNum = theNum;
      theNum = "";
      operator = this.getAttribute("alt");
      viewer.innerHTML = "";
      equals.setAttribute("data-result", "");
    }else {
      operator2 = this.getAttribute("alt");

      oldNum = parseFloat(oldNum);
      theNum = parseFloat(theNum);

      switch (operator) {
        case "mas":
          resultNum = oldNum + theNum;
          break;

        case "menos":
          resultNum = oldNum - theNum;
          break;

        case "por":
          resultNum = oldNum * theNum;
          break;

        case "dividido":
          resultNum = oldNum / theNum;
          break;

        default:
          resultNum = theNum;
      }

      if (!isFinite(resultNum)) {
        if (isNaN(resultNum)) {
          resultNum = "ERROR";
        } else {
          resultNum = "Infinite";
        }
      }

      viewer.innerHTML = resultNum;
      equals.setAttribute("data-result", resultNum);
      theNum = resultNum;
      oldNum = theNum;
      theNum = 0;
      operator = operator2;
    }


  };

  var displayNum = function() {

    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    if (loopNum == 0) {
      switch (operator) {
        case "mas":
          resultNum = oldNum + theNum;
          loopNum = theNum;
          break;

        case "menos":
          resultNum = oldNum - theNum;
          loopNum = theNum;
          break;

        case "por":
          resultNum = oldNum * theNum;
          loopNum = theNum;
          break;

        case "dividido":
          resultNum = oldNum / theNum;
          loopNum = theNum;
          break;

        default:
          resultNum = theNum;
      }
    } else {
      switch (operator) {
        case "mas":
          resultNum = resultNum + loopNum;
          break;

        case "menos":
          resultNum = resultNum - loopNum;
          break;

        case "por":
          resultNum = resultNum * loopNum;
          break;

        case "dividido":
          resultNum = resultNum / loopNum;
          break;

        default:
          resultNum = theNum;
      }
    }



    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) {
        resultNum = "ERROR";
      } else {
        resultNum = "Infinite";
      }
    }

    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    oldNum = 0;
    theNum = resultNum;

  };

  var clearAll = function() {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
  };

  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  equals.onclick = displayNum;

  point.onclick = dot;

  signo.onclick = plusMinus;

  inicio.onclick = clearAll;

  }
}
Calculadora.init();
