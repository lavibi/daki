(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["daki"] = factory();
	else
		root["daki"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _page_file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page/file */ "./src/js/page/file.js");
/* harmony import */ var _page_thing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page/thing */ "./src/js/page/thing.js");



Object(_page_file__WEBPACK_IMPORTED_MODULE_0__["default"])();
Object(_page_thing__WEBPACK_IMPORTED_MODULE_1__["default"])();


/***/ }),

/***/ "./src/js/lib/delete.js":
/*!******************************!*\
  !*** ./src/js/lib/delete.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Delete {
  constructor (control, deleteControl, options = {}) {
    this.control = control;
    this.deleteControl = deleteControl,
    this.options = options;

    if (typeof deleteControl === 'object') {
      this.options = deleteControl;
      this.deleteControl = control;
      this.control = null;
    }

    this.controlEl = this.control ? document.querySelector(this.control) : null;

    this.setEventListener();
  }

  async delete(e) {
    const removeTarget = e.target.closest(this.deleteControl);
    if (!removeTarget) {
      return;
    }

    e.preventDefault();

    const answer = confirm('Do you want to delete?')
    if (!answer) {
      return;
    }

    const url = removeTarget.getAttribute('href');

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return;
    }

    if (this.options && this.options.parent) {
      e.target.closest(this.options.parent).remove();
    }
  }

  setEventListener() {
    if (this.controlEl) {
      this.controlEl.addEventListener('click', (e) => this.delete(e))
      return;
    }

    const deleteControlEls = document.querySelectorAll(this.deleteControl);
    deleteControlEls.forEach(element => {
      element.addEventListener('click', (e) => this.delete(e))
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (function (control, deleteControl, options = {}) {
  return new Delete(control, deleteControl, options)
});


/***/ }),

/***/ "./src/js/lib/modal.js":
/*!*****************************!*\
  !*** ./src/js/lib/modal.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// import selector from '../../util/selector'

const DEFAULT_OPTIONS = {
  element: null
}

const MODAL_GLOBAL = {
  init: false,
  modalStack: [],
  openOverlay: () => {
    document.getElementById('modal').classList.remove('hidden')
    document.body.classList.add('overflow-hidden')
  },
  closeOverlay: () => {
    document.getElementById('modal').classList.add('hidden')
    document.body.classList.remove('overflow-hidden')
  }
}

class Modal {
  constructor (control, element, options = {}) {
    options = {...DEFAULT_OPTIONS, ...options}

    this.control = typeof control === 'object' ? control : document.querySelectorAll(control);

    if (this.control.length === 0) {
      return;
    }

    this.element = document.querySelector(element)
    this.options = options

    this.closeControl = this.element.querySelectorAll('.modal-close')

    this._setEventListener()

    if (!MODAL_GLOBAL.init) {
      this._initGlobal()
    }
  }

  showEvent (e) {
    e.preventDefault()

    if (MODAL_GLOBAL.modalStack.length > 0) {
      MODAL_GLOBAL.modalStack[MODAL_GLOBAL.modalStack.length - 1].hide()
    } else {
      MODAL_GLOBAL.openOverlay()
    }

    this.show()
    this._show();
    MODAL_GLOBAL.modalStack.push(this)
  }

  hideEvent (e) {
    if (e.target.closest('.modal-close')) {
      e.preventDefault()
      this.hide()
      this._hide()
    }
  }

  _show() {
    document.getElementById('modal').scrollTop = 0;
  }

  _hide() {
    MODAL_GLOBAL.modalStack.pop()

    if (MODAL_GLOBAL.modalStack.length === 0) {
      return MODAL_GLOBAL.closeOverlay()
    }

    MODAL_GLOBAL.modalStack[MODAL_GLOBAL.modalStack.length - 1].show()
  }

  hide() {
    this.element.classList.add('hidden')
  }

  show() {
    this.element.classList.remove('hidden')
  }

  _setEventListener () {
    for (const closeControl of this.closeControl) {
      closeControl.addEventListener('click', e => this.hideEvent(e))
    }

    // Not support live
    // if (this.options.element !== null) {
    //   this.control.on(this.options.element, 'click', e => this.showEvent(e))
    //   return
    // }

    for (const control of this.control) {
      control.addEventListener('click', e => this.showEvent(e))
    }
  }

  _initGlobal () {
    document.getElementById('modal').addEventListener('click', e => Modal.hideGlobal(e))
    document.addEventListener('keydown', e => Modal.hideGlobal(e))

    MODAL_GLOBAL.init = true
  }

  static hideGlobal(e) {
    if (MODAL_GLOBAL.modalStack.length === 0) {
      return
    }

    if (e.target.tagName  === 'INPUT' || e.target.tagName  === 'TEXTAREA') {
      return
    }

    if (e.target.id === 'modal' || e.keyCode === 27) {
      let currentOpenedModal = MODAL_GLOBAL.modalStack.pop()
      currentOpenedModal.hide()

      if (MODAL_GLOBAL.modalStack.length === 0) {
        return MODAL_GLOBAL.closeOverlay()
      }

      MODAL_GLOBAL.modalStack[MODAL_GLOBAL.modalStack.length - 1].show()
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (function (control, element, options = {}) {
  return new Modal(control, element, options)
});


/***/ }),

/***/ "./src/js/page/file.js":
/*!*****************************!*\
  !*** ./src/js/page/file.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_delete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/delete */ "./src/js/lib/delete.js");


const urlUploadFile = '/file';
const mediaList = document.getElementById('media-list');
const fileBrowser = document.getElementById('file-browser');
const fileFakeBrowser = document.getElementById('file-trigger-browser');
const filePreview = document.getElementById('file-preview');
const formUploadButton = document.getElementById('form-upload-button');
const formUpload = document.getElementById('form-upload');
const formUploadControl = document.getElementById('form-upload-control');
let formIsUpload = false;

const buildPhotoElement = (id, file) => {
  const photoEl = document.createElement('div')
  photoEl.className = 'media-file flex justify-center items-center w-150px h-150px shadow mr-4 mb-4 p-2 relative';
  photoEl.innerHTML = `
    <img class="max-h-full" src="${file}">
    <div class="absolute right-3 bottom-3">
      <a class="media-file-del font-bold cursor-pointer py-1 px-2 text-sm rounded border border-red-700 bg-red-600 focus:outline-none text-white" href="/file/${id}/delete">x</a>
    </div>
  `;

  mediaList.insertBefore(photoEl, formUpload.nextSibling);
}

/* harmony default export */ __webpack_exports__["default"] = (() => {
  if (!fileBrowser || !formUploadButton || !formUploadButton || !mediaList) {
    return;
  }

  fileFakeBrowser.addEventListener('click', (e) => {
    if (formIsUpload) {
      return;
    }

    fileBrowser.click();
  })

  fileBrowser.addEventListener('change', (e) => {
    if (fileBrowser.files && fileBrowser.files[0]) {
      const file = fileBrowser.files[0];

      if (
        file.type !== 'image/png' &&
        file.type !== 'image/jpg' && file.type !== 'image/jpeg' &&
        file.type !== 'image/gif'
      ) {
        filePreview.setAttribute('src', '');
        fileBrowser.value = '';
        formUploadControl.classList.remove('flex');
        formUploadControl.classList.add('hidden');

        return;
      }

      const reader = new FileReader();

      reader.onload = function (e) {
        filePreview.setAttribute('src', e.target.result);
        formUploadControl.classList.remove('hidden');
        formUploadControl.classList.add('flex');
      }

      reader.readAsDataURL(file);
    }
  });

  formUploadButton.addEventListener('click', async (e) => {
    e.preventDefault();

    if (formIsUpload) {
      return;
    }

    if (!fileBrowser.files || !fileBrowser.files[0]) {
      return;
    }

    formIsUpload = true;
    formUploadButton.innerHTML = '...';

    const formData = new FormData();
    formData.append('file', fileBrowser.files[0]);

    const response = await fetch(urlUploadFile, {
      method: 'POST',
      credentials: 'same-origin',
      body: formData
    });

    formIsUpload = false;

    filePreview.setAttribute('src', '');
    fileBrowser.value = '';
    formUploadControl.classList.remove('flex');
    formUploadControl.classList.add('hidden');
    formUploadButton.innerHTML = '+';

    const data = await response.json();

    buildPhotoElement(data.id, data.file)
  })

  // mediaList.addEventListener('click', async (e) => {
  //   if (!e.target.classList.contains('media-file-del')) {
  //     return;
  //   }

  //   e.preventDefault();

  //   const url = e.target.getAttribute('href');

  //   const response = await fetch(url);
  //   const data = await response.json();

  //   if (data.error) {
  //     return;
  //   }

  //   e.target.closest('.media-file').remove();
  // })

  Object(_lib_delete__WEBPACK_IMPORTED_MODULE_0__["default"])('#media-list', '.media-file-del', { parent: '.media-file' });
});


/***/ }),

/***/ "./src/js/page/thing.js":
/*!******************************!*\
  !*** ./src/js/page/thing.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/modal */ "./src/js/lib/modal.js");
/* harmony import */ var _lib_delete__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/delete */ "./src/js/lib/delete.js");



const thingTransEls = document.querySelectorAll('.thing-trans');

/* harmony default export */ __webpack_exports__["default"] = (() => {
  Object(_lib_delete__WEBPACK_IMPORTED_MODULE_1__["default"])('.thing-delete', { parent: '.thing' });

  // Translate modal
  Object(_lib_modal__WEBPACK_IMPORTED_MODULE_0__["default"])(thingTransEls, '#thing-trans-modal');
  thingTransEls.forEach(el => {
    el.addEventListener('click', async (e) => {
      e.preventDefault();
      const link = el.getAttribute('href');
      const response = await fetch(link);
      const content = await response.text();
      document.getElementById('thing-trans-modal').querySelector('.modal-container').innerHTML = content;
    })
  })
});


/***/ })

/******/ });
});
//# sourceMappingURL=app.js.map