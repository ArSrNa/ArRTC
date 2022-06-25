/* global $ setBtnClickFuc genTestUserSig */
// preset before starting RTC
class Presetting {
  init() {
    // populate userId/roomId
    $('#userId').val('ArRTCUser_' + parseInt(Math.random() * Math.pow(10,5)));
    $('#roomId').val(1);
    const roomId = this.query('roomId');
    const userId = this.query('userId');
    if (roomId) {
      $('#roomId').val(roomId);
    }
    if (userId) {
      $('#userId').val(userId);
    }

    $('#main-video-btns').hide();
    $('.mask').hide();
    setBtnClickFuc();
  }

  query(name) {
    const match = window.location.search.match(new RegExp('(\\?|&)' + name + '=([^&]*)(&|$)'));
    return !match ? '' : decodeURIComponent(match[2]);
  }

  login(share, callback) {
    let userId = $('#userId').val();
    if (share) {
      userId = 'share_' + userId;
    }
    const config = genTestUserSig(userId);
    console.log(config);
    const sdkAppId = config.sdkAppId;
    const userSig = config.userSig;
    const roomId = $('#roomId').val();

    callback({
      sdkAppId,
      userId,
      userSig,
      roomId
    });
  }
}


function genTestUserSig(userID) {
  var usersig;
  $.ajax({
    url:'https://api.arsrna.cn/release/trtcusersig/ArRTC',
    type:'GET',
    data:{user:userID},
    dataType:'json',
    async: false,
    success(msg){
      console.log(msg)
      usersig = {
        sdkAppId: 1400342272,
        userSig: msg.usersig
      };
    }
  })
  return usersig
}