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

export default function (control, deleteControl, options = {}) {
  return new Delete(control, deleteControl, options)
}
