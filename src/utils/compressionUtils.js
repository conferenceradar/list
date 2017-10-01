import lzString from 'lz-string';

export const getCompressedObject = (obj) => {
  return lzString.compressToEncodedURIComponent(JSON.stringify(obj));
}

export const getDecompressedObject = (obj) => {
  return JSON.parse(lzString.decompressFromEncodedURIComponent(obj))
}

