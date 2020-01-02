import FilePath from '../lib';

describe('FilePath', () => {
  it('parses a simple path', () => {
    const path = new FilePath('/this/is/a/full/path.jpeg');

    expect(path.folders).toEqual(['', 'this', 'is', 'a', 'full']);
    expect(path.filename).toEqual('path');
    expect(path.extension).toEqual('jpeg');
    expect(path.file).toEqual('path.jpeg');
    expect(path.path).toEqual('/this/is/a/full/path.jpeg');
  });

  it('parses a relative path', () => {
    const path = new FilePath('this/is/a/full/path.jpeg');

    expect(path.folders).toEqual(['this', 'is', 'a', 'full']);
    expect(path.filename).toEqual('path');
    expect(path.extension).toEqual('jpeg');
    expect(path.file).toEqual('path.jpeg');
    expect(path.path).toEqual('this/is/a/full/path.jpeg');

    path.folders.unshift('.');
    path.folders[path.folders.length - 1] = 'relative';
    expect(path.folders).toEqual(['.', 'this', 'is', 'a', 'relative']);

    path.folders[0] = '..';
    expect(path.folders).toEqual(['..', 'this', 'is', 'a', 'relative']);
    expect(path.path).toEqual('../this/is/a/relative/path.jpeg');
  });

  it('handles an extensionless path', () => {
    const path = new FilePath('/this/is/a/web_upload');

    expect(path.extension).toEqual(undefined);
    expect(path.path).toEqual('/this/is/a/web_upload');
  });

  it('handles additional delimiters in file name', () => {
    const path = new FilePath('/this/is/a/web_upload-1.3.pdf');

    expect(path.extension).toEqual('pdf');
    path.filename = `${path.filename}_low`;
    path.extension = 'png';
    expect(path.path).toEqual('/this/is/a/web_upload-1.3_low.png');
  });

  it('sets a file independent of the folderpath', () => {
    const path = new FilePath('/this/is/the/original_file.pdf');
    path.file = 'thumbnail_low.jpeg';

    expect(path.extension).toEqual('jpeg');
    expect(path.filename).toEqual('thumbnail_low');
    expect(path.file).toEqual('thumbnail_low.jpeg');
    expect(path.path).toEqual('/this/is/the/thumbnail_low.jpeg');
  });

  it('can clear out a file completely', () => {
    const path = new FilePath('/this/is/the/original_file.pdf');
    path.file = undefined;

    expect(path.extension).toEqual(undefined);
    expect(path.filename).toEqual(undefined);
    expect(path.file).toEqual(undefined);
    expect(path.path).toEqual('/this/is/the/');
  });

  it('handles extensionless files', () => {
    const path = new FilePath('/this/is/the/original_file.pdf');
    path.file = 'original_file';

    expect(path.extension).toEqual(undefined);
    expect(path.filename).toEqual('original_file');
    expect(path.file).toEqual('original_file');
    expect(path.path).toEqual('/this/is/the/original_file');
  });

  it('can clear out an extension completely', () => {
    const path = new FilePath('/this/is/the/original_file.pdf');
    path.extension = undefined;

    expect(path.extension).toEqual(undefined);
    expect(path.filename).toEqual('original_file');
    expect(path.file).toEqual('original_file');
    expect(path.path).toEqual('/this/is/the/original_file');
  });

  it('does not return just the extension (incomplete file)', () => {
    const path = new FilePath('/this/is/the/original_file.pdf');
    path.filename = undefined;

    expect(path.extension).toEqual('pdf');
    expect(path.filename).toEqual(undefined);
    expect(path.file).toEqual(undefined);
    expect(path.path).toEqual('/this/is/the/');
  });

  it('isAbsolute and isRelative', () => {
    const path = new FilePath('/this/is/a/file.jpeg');
    expect(path.isAbsolute).toEqual(true);
    expect(path.isRelative).toEqual(false);

    path.path = 'this/is/a/file.jpeg';
    expect(path.isAbsolute).toEqual(false);
    expect(path.isRelative).toEqual(true);

    path.path = './this/is/a/file.jpeg';
    expect(path.isAbsolute).toEqual(false);
    expect(path.isRelative).toEqual(true);

    path.path = '../this/is/a/file.jpeg';
    expect(path.isAbsolute).toEqual(false);
    expect(path.isRelative).toEqual(true);
  });
});
