import del from '../lib/delete';
import upload from '../component/upload_image';

export default () => {
  upload('#file-browser', '#file-trigger-browser', '#file-preview', '#form-upload-control', '#form-upload-button', '#media-list');
  del('#media-list', '.media-file-del', { parent: '.media-file' });
}
