$(function(){
  $("#login-form").validate({
    rules: {
      userId:{
        required : true
      },
      password:{
        required: true
      }
    },
    messages : {
      userId:{
        required : "필수 정보입니다."
      },
      password:{
        required: "필수 정보입니다."
      }
    },

    errorPlacement: function(error, element) {
      element.attr("placeholder", error.text());
    },

    submitHandler: function(){
      var inputId = $("#userId").val();
      var inputPwd = $("#password").val();
      var canLoginId = selectId(inputId, inputPwd);
      console.log(canLoginId);
      if(canLoginId !== null && canLoginId !== undefined){
        alert("로그인 성공");
        document.cookie = "isLogined="+JSON.stringify(canLoginId);
        location.href="../html/outer.html";
      } else{
        alert("ID 또는 비밀번호가 틀립니다!");
      }
    }
  });
});

function selectId(inputId, inputPwd){
  var userCookieList = (document.cookie).split(';');
  var userList = [];
  for (var i = 0; i < userCookieList.length; i++) {
    console.log(userCookieList[i]);
    if(userCookieList[i].indexOf('{') !== -1){
      userList.push(JSON.parse(userCookieList[i].substring(userCookieList[i].indexOf('{'),userCookieList[i].length)));
      if(userList[i].userId == inputId && userList[i].userPwd == inputPwd){
        return userList[i];
      }
    } else{
      return null;
    }
  }
}
