class UploadImage {
  constructor(input, fakeInput, preview, control, button, list, options = {}) {
    this.input = input;
    this.fakeInput = fakeInput;
    this.preview = preview;
    this.control = control;
    this.button = button;
    this.list = list;
    this.options = {
      addDelete: true,
      addClass: '',
      ...options
    };

    this.element = null;
    this.fakeInputEl = null;
    this.inputEl = null;

    this.isUploading = false;

    this.setEvent();
  }

  browse(e) {
    if (!e.target.closest(this.fakeInput)) {
      return;
    }

    e.preventDefault()

    if (this.isUploading) {
      return;
    }

    document.querySelector(this.input).click();
  }

  choose(e) {
    const el = e.target.closest(this.input);

    if (!el) {
      return;
    }

    if (this.isUploading) {
      return;
    }

    if (el.files && el.files[0]) {
      const file = el.files[0];

      if (
        file.type !== 'image/png' &&
        file.type !== 'image/jpg' && file.type !== 'image/jpeg' &&
        file.type !== 'image/gif'
      ) {
        el.value = '';
        document.querySelector(this.preview).setAttribute('src', '');
        document.querySelector(this.control).classList.remove('flex');
        document.querySelector(this.control).classList.add('hidden');

        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        document.querySelector(this.preview).setAttribute('src', e.target.result);
        document.querySelector(this.control).classList.remove('hidden');
        document.querySelector(this.control).classList.add('flex');
      }

      reader.readAsDataURL(file);
    }
  }

  async upload(e) {
    const el = e.target.closest(this.button);

    if (!el) {
      return;
    }

    e.preventDefault()

    if (this.isUploading) {
      return;
    }

    this.isUploading = true;

    const link = el.getAttribute('data-link');
    const name = el.getAttribute('data-name');

    el.innerHTML = '...';

    const formData = new FormData();
    const input = document.querySelector(this.input);
    formData.append(name, input.files[0]);

    const response = await fetch(link, {
      method: 'POST',
      body: formData
    });

    if (response.status !== 200) {
      alert('Upload error: (' + response.status + ')' + response.statusText);
      this.isUploading = false;
      el.innerHTML = '+';
      return;
    }

    const data = await response.json();

    document.querySelector(this.preview).setAttribute('src', '');
    document.querySelector(this.control).classList.remove('flex');
    document.querySelector(this.control).classList.add('hidden');
    input.value = '';
    el.innerHTML = '+';
    this.isUploading = false;

    this.addNewImageElement(data.id, data.file);
  }

  addNewImageElement(id, link) {
    const photoEl = document.createElement('div')
    photoEl.id = 'file-' + id;
    photoEl.className = 'media-file flex justify-center items-center w-150px h-150px shadow mr-4 mb-4 p-2 relative ' + this.options.addClass;
    photoEl.innerHTML = `
      <img class="max-h-full" src="${link}">
      ${!this.options.addDelete ? '' : `
        <div class="absolute right-3 bottom-3">
          <a class="media-file-del font-bold cursor-pointer py-1 px-2 text-sm rounded border border-red-700 bg-red-600 focus:outline-none text-white" href="/file/${id}/delete">x</a>
        </div>
        `
      }
    `;

    const list = document.querySelector(this.list);
    const firstFileInList = list.children[0].nextSibling;
    list.insertBefore(photoEl, firstFileInList);
  }

  setEvent() {
    if (this.options.element) {
      this.element = document.querySelector(this.options.element);
      if (!this.element) {
        // nothing happening
        return;
      }

      this.element.addEventListener('click', (e) => this.upload(e));
      this.element.addEventListener('change', (e) => this.choose(e));
      this.element.addEventListener('click', (e) => this.browse(e));
      return;
    }

    this.fakeInputEl = document.querySelector(this.fakeInput);
    this.fakeInputEl.addEventListener('click', (e) => this.browse(e));

    this.inputEl = document.querySelector(this.input);
    this.inputEl.addEventListener('change', (e) => this.choose(e));

    this.buttonEl = document.querySelector(this.button);
    this.buttonEl.addEventListener('click', (e) => this.upload(e));
  }
}

export default (input, fakeInput, preview, control, button, list, options = {}) => {
  return new UploadImage(input, fakeInput, preview, control, button, list, options)
}
