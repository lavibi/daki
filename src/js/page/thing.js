import modal from '../lib/modal';
import del from '../lib/delete';
import form from '../lib/form';
import upload from '../component/upload_image';

const thingTransEls = document.querySelectorAll('.thing-trans');
const fileSelectionEl = document.getElementById('file-selection');
const fileSelectionRemoveEl = document.getElementById('file-selection-remove');

export default () => {
  del('.thing-delete', { parent: '.thing' });
  form('body', '.form-data', {});
  upload('#file-browser', '#file-trigger-browser', '#file-preview', '#form-upload-control', '#form-upload-button', '#media-list', {
    element: '#file-selection-modal',
    addDelete: false,
    addClass: 'cursor-pointer'
  });

  // Translate modal
  modal(thingTransEls, '#thing-trans-modal');
  thingTransEls.forEach(el => {
    el.addEventListener('click', async (e) => {
      e.preventDefault();
      document.getElementById('thing-trans-modal').querySelector('.modal-container').innerHTML = '... loading';
      const link = el.getAttribute('href');
      const response = await fetch(link);
      const content = await response.text();
      document.getElementById('thing-trans-modal').querySelector('.modal-container').innerHTML = content;
    })
  })

  // File modal
  if (fileSelectionEl) {
    modal('#file-selection', '#file-selection-modal');
    fileSelectionEl.addEventListener('click', async (e) => {
      e.preventDefault();
      document.getElementById('file-selection-modal').querySelector('.modal-container').innerHTML = '... loading';
      const link = fileSelectionEl.getAttribute('href');
      const response = await fetch(link);
      const content = await response.text();
      document.getElementById('file-selection-modal').querySelector('.modal-container').innerHTML = content;
      const currentId = document.getElementById('file-selection-input').value;
      const selectFileEl = document.getElementById('file-' + currentId);
      if (selectFileEl) {
        selectFileEl.classList.add('border-4');
        selectFileEl.classList.add('border-indigo-500');
      }
    })

    document.getElementById('file-selection-modal').addEventListener('click', (e) => {
      const el = e.target.closest('.media-file')
      if (!el) {
        return;
      }

      e.preventDefault();
      const fileId = el.id.replace('file-', '');
      const imgLink = el.querySelector('img').getAttribute('src');

      document.getElementById('file-selection-input').value = fileId;
      document.getElementById('file-selection-preview').setAttribute('src', imgLink);

      document.querySelectorAll('.media-file').forEach((el) => {
        el.classList.remove('border-4')
        el.classList.remove('border-indigo-500')
      })
      el.classList.add('border-4')
      el.classList.add('border-indigo-500')

      if (fileSelectionRemoveEl) {
        fileSelectionRemoveEl.classList.remove('hidden');
      }
    })

    if (fileSelectionRemoveEl) {
      fileSelectionRemoveEl.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('file-selection-input').value = '';
        document.getElementById('file-selection-preview').setAttribute('src', '');
        fileSelectionRemoveEl.classList.add('hidden');
      })
    }

    const form = document.querySelector('form')
    if (form && fileSelectionRemoveEl) {
      form.addEventListener('reset', (e) => {
        document.getElementById('file-selection-input').value = '';
        document.getElementById('file-selection-preview').setAttribute('src', '');
        fileSelectionRemoveEl.classList.add('hidden');
      })
    }
  }
}
