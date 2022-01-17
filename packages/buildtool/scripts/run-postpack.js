const path = require('path')
const fs = require('fs')
const consola = require('consola').withTag(path.basename(__filename, '.js'))

const working_dir = process.cwd()
const package_json_old_path = path.resolve(working_dir, 'package.json.old')
const package_json_path = path.resolve(working_dir, 'package.json')

if (fs.existsSync(package_json_old_path)) {
  consola.info('recover package.json')
  fs.copyFileSync(package_json_old_path, package_json_path)
}
