import fileInit from './page/file';
import thingInit from './page/thing';

const load = () => {
  if (document.body.classList.contains('page-file')) {
    fileInit();
  }

  if (document.body.classList.contains('page-thing')) {
    thingInit();
  }
}

document.addEventListener('DOMContentLoaded', load)
