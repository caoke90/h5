const inquirer = require('inquirer');
const FtpDeploy = require('ftp-deploy');
const ora = require('ora');

const PROJECT_NAME = require('../package.json').name;
const REMOTE_PATH = `/data/weibo/h5.sinaimg.cn/m/${PROJECT_NAME}/`;

inquirer.prompt([{
  type: 'confirm',
  message: '需要上传到 FTP 服务器么? ',
  default: 'n',
  name: 'ok'
}]).then(function (answers) {
  if (answers.ok) {
    inquirer.prompt([{
      type: 'rawlist',
      message: '选择要上传到的 FTP 服务器: ',
      name: 'host',
      choices: [47, 48, 75, 76, 77, 234, 60, 74].map(function (v) {
        return '10.13.130.' + v;
      })
    }, {
      type: 'password',
      message: '请输入 FTP 服务器密码: ',
      name: 'password'
    }]).then(function (answer) {
      console.log(`即将上传到 ${answer.host} 的 ${REMOTE_PATH} 目录,请确认目录存在且属于 www 用户。`);
      const spinner = ora('正在上传...');
      spinner.start();
      const ftpDeploy = new FtpDeploy();
      const config = {
        username: 'www',
        host: answer.host,
        password: answer.password,
        port: 21,
        localRoot: process.cwd() + '/dist/',
        remoteRoot: REMOTE_PATH,
        exclude: ['.git', '.idea', 'tmp/*']
      };
      ftpDeploy.deploy(config, function (err) {
        spinner.stop();
        console.log(err || '上传完成~ \nヾ(^_^) byebye!!');
      });
    });
  } else {
    console.log('ヾ(^_^) byebye!!');
  }
});
