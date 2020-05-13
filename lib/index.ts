/* eslint-disable no-restricted-syntax */

import { extname, basename, dirname, sep } from 'path';

export class FilePath {
  /** The string representing the file name excluding the extension */
  public filename: string | undefined;

  /** An ordered array of folder names. folders[0] represents the root of the path.
   * If absolute, it will be an empty string (required), if relative, it will be the folder reference '.' or '..'
   */
  public folders: string[] = [];

  /** The file extension without the delimiter if it exists */
  public extension: string | undefined;

  /** Set up a path */
  public constructor(path: string) {
    this.path = path;
  }

  /** Set: up a path to be manipulated */
  public set path(path: string) {
    this.extension = extname(path);
    this.filename = basename(path, `.${this.extension}`);
    this.folders = dirname(path).split(sep);
  }

  /** Get: the current path */
  public get path(): string {
    return `${this.folders.join(sep)}${sep}${this.file ? this.file : ''}`;
  }

  /** Set: the full file name including the extension */
  public set file(file: string | undefined) {
    if (file) {
      this.extension = extname(file);
      this.filename = basename(file, `.${this.extension}`);
    } else {
      this.extension = undefined;
      this.filename = undefined;
    }
  }

  /** Get: the full file with the extension included */
  public get file(): string | undefined {
    if (this.filename) {
      return `${this.filename}${this.extension ? `.${this.extension}` : ''}`;
    } else return undefined;
  }

  /** Set: the extension */
  public set extension(extension: string | undefined) {
    if (extension) this._extension = extension.replace(/^\./g, '');
    else this._extension = undefined;
  }

  /** Get: the extension. Does not include the `.` delimiter */
  public get extension(): string | undefined {
    return this._extension;
  }

  /** Get: is the path absolute? */
  public get isAbsolute(): boolean {
    return this.folders[0] === '';
  }
  
  /** Get: is the path relative? */
  public get isRelative(): boolean {
    return this.isAbsolute === false;
  }
}

export default FilePath;
