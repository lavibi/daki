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
  photoEl.className = 'flex justify-center items-center w-150px h-150px shadow mr-4 mb-4 p-2 relative';
  photoEl.innerHTML = `
    <img class="max-h-full" src="${file}">
    <div class="absolute right-3 bottom-3">
      <a class="font-bold cursor-pointer py-1 px-2 text-sm rounded border border-red-700 bg-red-600 focus:outline-none text-white" href="/file/${id}/delete">x</a>
    </div>
  `;

  mediaList.insertBefore(photoEl, formUpload.nextSibling);
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

mediaList.addEventListener('click', async (e) => {
  // e.preventDefault();
  // console.log(e.target)
  if (!e.target.classList.contains('media-file-del')) {
    return;
  }

  e.preventDefault();

  const url = e.target.getAttribute('href');

  const response = await fetch(url);
  const data = await response.json();

  if (data.error) {
    return;
  }

  e.target.closest('.media-file').remove();
})
