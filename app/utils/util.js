'use strict';

const { execSync } = require('child_process');
const ipObj = require('ip');

/**
 * 获取docker id
 */
const getDockerId = () => {
  try {
    const dockerId = execSync('head -1 /proc/self/cgroup|cut -d/ -f3|cut -c1-12').toString();

    if (!dockerId || dockerId.trim() === '') {
      return 'Local/';
    }
    return dockerId.replace(/\n/g, '');
  } catch (e) {
    console.log(e);
    return 'Local/';
  }
};

exports.filterParams = params => {
  return Object.fromEntries(Object.entries(params).filter(([ key, value ]) => value !== '' && value !== undefined && value !== null));
};

exports.ip = ipObj;
exports.dockerId = getDockerId();
