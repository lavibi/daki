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

export default function (control, element, options = {}) {
  return new Modal(control, element, options)
}
