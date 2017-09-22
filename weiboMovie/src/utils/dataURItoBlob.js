export default function (dataURI) {
  /* eslint no-undef: 0 */
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteStr;
  const parts = dataURI.split(',');

  if (parts[0].indexOf('base64') >= 0) {
    byteStr = atob(parts[1]);
  } else {
    byteStr = unescape(parts[1]);
  }

  // separate out the mime component
  const mimeString = parts[0].split(':')[1].split(';')[0]; //   image/jpeg

  // write the bytes of the string to a typed array
  const intArray = new Uint8Array(byteStr.length);
  for (let i = 0; i < byteStr.length; i++) {
    intArray[i] = byteStr.charCodeAt(i);
  }

  let ret;
  try {
    ret = new Blob([intArray], { type: mimeString });
  } catch (e) {
    window.BlobBuilder = window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder;
    if (e.name === 'TypeError' && window.BlobBuilder) {
      const bb = new BlobBuilder();
      bb.append(intArray.buffer);

      ret = bb.getBlob(mimeString);
      // alert("case 2");
    } else if (e.name === 'InvalidStateError') {
      // InvalidStateError (tested on FF13 WinXP)
      ret = new Blob([intArray.buffer], { type: mimeString });
    } else {
      // We're screwed, blob constructor unsupported entirely
    }
  }
  return ret;
}
