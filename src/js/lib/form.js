/**
 * Fetch submit form
 */

class Form {
  constructor(control, form, options = {}) {
    this.control = control;
    this.form = form;
    this.options = options;

    if (typeof form === 'object') {
      this.control = null;
      this.form = control;
      this.options = form;
    }

    this.controlEl = this.control ? document.querySelector(this.control) : null;

    this.isSubmitted = false;
    this.setEvents();
  }

  async submit(e) {
    e.preventDefault();

    if (this.isSubmitted) {
      return;
    }

    this.isSubmitted = true;

    const form = e.target;
    const body = new FormData(form);
    const resetSuccess = form.getAttribute('data-reset') === '1';
    const method = 'post';
    const link = form.getAttribute('action');
    const helperTextEl = form.querySelector('.form-submit-text');
    const submitButton = form.querySelector('button[type=submit]');
    const submitButtonText = submitButton.innerText;

    // Submit status update
    submitButton.innerText = '...'
    helperTextEl.innerText = '';
    helperTextEl.classList.remove('text-indigo-500');
    helperTextEl.classList.remove('text-red-500');

    try {
      const response = await fetch(link, {
        method,
        body
      })
      const data = await response.json()

      if (data.error) {
        helperTextEl.innerText = 'Submit failed, please check data and try again.';
        helperTextEl.classList.add('text-red-500');
      } else {
        helperTextEl.innerText = 'Submit successed.';
        helperTextEl.classList.add('text-indigo-500');

        if (resetSuccess) {
          form.reset();
        }
      }
    } catch (e) {
      helperTextEl.innerText = 'Please try again.';
      helperTextEl.classList.add('text-red-500')
    }

    submitButton.innerText = submitButtonText;
    this.isSubmitted = false;
  }

  setEvents() {
    if (this.controlEl) {
      this.controlEl.addEventListener('submit', (e) => this.submit(e));
      return;
    }

    document.querySelectorAll(this.form).forEach((form) => {
      form.addEventListener('submit', (e) => this.submit(e));
    })
  }
}

export default (control, form, options = {}) => {
  return new Form(control, form, options)
}
