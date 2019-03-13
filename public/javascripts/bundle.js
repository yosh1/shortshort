/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(document).on('click', '.good-create-button', function () {
  var userId = $('.good-create-button').data('user-id');
  var novelId = $('.good-create-button').data('novel-id');
  var goodCount = $(".good-create-button").data('good-count');
  var className = $(".good-create-button").data('class-name');
  $.ajaxSetup({
    cache: false
  });
  $.ajax({
    type: "POST",
    url: "/novels/".concat(novelId, "/users/").concat(userId, "/goods/create"),
    success: function success(data) {
      if (className === "good-create-button") {
        $('span').text(goodCount + 1);
      } else if (className === "good-delete-button") {
        $('span').text(goodCount);
      }

      ;
      $('.good-create-button').removeClass('good-create-button').addClass('good-delete-button');
    }
  });
});
$(document).on('click', '.good-delete-button', function () {
  var userId = $('.good-delete-button').data('user-id');
  var novelId = $('.good-delete-button').data('novel-id');
  var goodCount = $('.good-delete-button').data('good-count');
  var className = $('.good-delete-button').data('class-name');
  $.ajaxSetup({
    cache: false
  });
  $.ajax({
    type: "POST",
    url: "/novels/".concat(novelId, "/users/").concat(userId, "/goods/delete"),
    success: function success(data) {
      if (className === "good-create-button") {
        $('span').text(goodCount);
      } else if (className === "good-delete-button") {
        $('span').text(goodCount - 1);
      }

      ;
      $('.good-delete-button').removeClass('good-delete-button').addClass('good-create-button');
    }
  });
});
$(document).on('click', '#friend-create-button', function () {
  var followId = $('#friend-create-button').data('follow-id');
  var followedId = $('#friend-create-button').data('followed-id');
  var followers = $('#friend-create-button').data('followers');
  var idName = $('#friend-create-button').data('idName');
  $.post("/friends/follow/".concat(followId, "/followed/").concat(followedId, "/create"), function (data) {
    if (idName === "friend-create-button") {
      $('#followers').text(followers + 1);
    } else if (idName === "friend-delete-button") {
      $('#followers').text(followers);
    }

    $('#friend-create-button').text('フォロー解除する');
    $('#friend-create-button').attr('id', 'friend-delete-button');
  });
});
$(document).on('click', '#friend-delete-button', function () {
  var followId = $('#friend-delete-button').data('follow-id');
  var followedId = $('#friend-delete-button').data('followed-id');
  var followers = $('#friend-delete-button').data('followers');
  var idName = $('#friend-delete-button').data('idName');
  $.post("/friends/follow/".concat(followId, "/followed/").concat(followedId, "/delete"), function (data) {
    if (idName === "friend-create-button") {
      $('#followers').text(followers);
    } else if (idName === "friend-delete-button") {
      $('#followers').text(followers - 1);
    }

    $('#friend-delete-button').text('フォローする');
    $('#friend-delete-button').attr('id', 'friend-create-button');
  });
});

/***/ })
/******/ ]);