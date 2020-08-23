import modal from '../lib/modal';
import del from '../lib/delete';

const thingTransEls = document.querySelectorAll('.thing-trans');

export default () => {
  del('.thing-delete', { parent: '.thing' });

  // Translate modal
  modal(thingTransEls, '#thing-trans-modal');
  thingTransEls.forEach(el => {
    el.addEventListener('click', async (e) => {
      e.preventDefault();
      const link = el.getAttribute('href');
      const response = await fetch(link);
      const content = await response.text();
      document.getElementById('thing-trans-modal').querySelector('.modal-container').innerHTML = content;
    })
  })
}
