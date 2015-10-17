module.exports = function(RED) {
  function TimeCheckNode(config) {
    RED.nodes.createNode(this,config);

    var time = config.time.split(':'),
        checktime = new Date();

    if (time.length != 2) {
      this.error("Time format must be HH:mm");
    }

    var hours = parseInt(time[0]),
        minutes = parseInt(time[1]);

    if (0 <= hours && hours < 24 && 0 <= minutes && minutes < 60) {
      checktime.setHours(hours);
      checktime.setMinutes(minutes);
    } else {
      this.error("Given time is not within valid range");
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
