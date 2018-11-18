module.exports = {
  parseMsg(action, payload = {}, metadata = {}) {
    const meta = Object.assign({}, {
      timestamp: Date.now(),
    }, metadata);

    return {
      meta,
      data: {
        action,
        payload,
      },
    };
  },
  parseIPAddress(ip) {
    if (ip.indexOf('::ffff:') !== -1) {
      ip = ip.substring(7);
    }
    return ip;
  },
  socketidRemoveNamespace(id, namespace='allChat'){
    namespace = `/${namespace}#`
    if (id.indexOf(namespace) !== -1) {
      id = id.substring(namespace.length);
    }
    return id;
  }
};