export default {
  process(src: string, filename: string, config: any, options: any) {
    return 'module.exports = ' + JSON.stringify(filename) + ';';
  }
};