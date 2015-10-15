module.exports = function(RED) {
  function TimeCheckNode(config) {
    RED.nodes.createNode(this,config);

    var time = config.time.split(':'),
        checktime = new Date();

    if (hours = parseInt(time[0]) && 0 < hours && hours < 24 && minutes = parseInt(time[1]) && 0 < minutes && minutes < 60) {
      checktime.setHours(hours);
      checktime.setMinutes(minutes);
    }

    
    this.checktime = checktime;

    var node = this;

    this.on('input', function(msg) {
      var now = new Date(),
          checktime = node.checktime;

      if (now < checktime) {
        node.send([null, msg]);
      } else {
        node.send([msg, null]);
      }
    });
  }
  RED.nodes.registerType('timecheck', TimeCheckNode);
};
