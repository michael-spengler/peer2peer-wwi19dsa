function logged_in(){
    if(sessionStorage.getItem('is_logged_in')){
      return true;
    }
    else{
      return false;
    }
  }

$(function(){

      if (logged_in()){
        $("#Sign_In").css("display", "none");
        $("#Profile").css("display", "inline");
      }
    }
  );