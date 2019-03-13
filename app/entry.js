'use strict';

$(document).on('click', '.good-create-button', () => {
  const userId = $('.good-create-button').data('user-id');
  const novelId = $('.good-create-button').data('novel-id');
  var goodCount = $(".good-create-button").data('good-count');
  var className = $(".good-create-button").data('class-name');
  $.ajaxSetup({ cache: false });
  $.ajax({
    type: "POST",
    url: `/novels/${novelId}/users/${userId}/goods/create`,
    success: function(data) {
      if (className === "good-create-button") {
        $('span').text(goodCount + 1);
      } else if (className === "good-delete-button") {
        $('span').text(goodCount);
      };
      $('.good-create-button').removeClass('good-create-button').addClass('good-delete-button');
    }
  });
});

$(document).on('click', '.good-delete-button', () => {
  const userId = $('.good-delete-button').data('user-id');
  const novelId = $('.good-delete-button').data('novel-id');
  var goodCount = $('.good-delete-button').data('good-count');
  var className = $('.good-delete-button').data('class-name');
  $.ajaxSetup({ cache: false });
  $.ajax({
    type: "POST",
    url: `/novels/${novelId}/users/${userId}/goods/delete`,
    success: function(data) {
      if (className === "good-create-button") {
        $('span').text(goodCount);
      } else if (className === "good-delete-button") {
        $('span').text(goodCount - 1);
      };
      $('.good-delete-button').removeClass('good-delete-button').addClass('good-create-button');
    }
  });
});

$(document).on('click', '#friend-create-button', () => {
  const followId = $('#friend-create-button').data('follow-id');
  const followedId = $('#friend-create-button').data('followed-id');
  const followers = $('#friend-create-button').data('followers');
  const idName = $('#friend-create-button').data('idName');
  $.post(`/friends/follow/${followId}/followed/${followedId}/create`,
    (data) => {
      if (idName === "friend-create-button") {
        $('#followers').text(followers + 1);
      } else if (idName === "friend-delete-button") {
        $('#followers').text(followers);
      }
      $('#friend-create-button').text('フォロー解除する');
      $('#friend-create-button').attr('id', 'friend-delete-button');
    }
  )
});

$(document).on('click', '#friend-delete-button', () => {
  const followId = $('#friend-delete-button').data('follow-id');
  const followedId = $('#friend-delete-button').data('followed-id');
  const followers = $('#friend-delete-button').data('followers');
  const idName = $('#friend-delete-button').data('idName');
  $.post(`/friends/follow/${followId}/followed/${followedId}/delete`,
    (data) => {
      if (idName === "friend-create-button") {
        $('#followers').text(followers);
      } else if (idName === "friend-delete-button") {
        $('#followers').text(followers - 1);
      }
      $('#friend-delete-button').text('フォローする');
      $('#friend-delete-button').attr('id', 'friend-create-button');
    }
  )
});