module.exports = function(RED) {
  function TimeCheckNode(config) {
    RED.nodes.createNode(this,config);

    var time = config.time.split(':');

    if (time.length != 2) {
      this.error("Time format must be HH:mm");
    }

    var hours = parseInt(time[0]),
        minutes = parseInt(time[1]);

    if (hours > 23 || minutes > 59) {
      this.error("Given time is not within valid range");
    }

    var node = this;

    this.on('input', function(msg) {
      var now = new Date(),
          checktime = new Date();

          checktime.setHours(hours);
          checktime.setMinutes(minutes);

      if (now < checktime) {
        node.send([null, msg]);
      } else {
        node.send([msg, null]);
      }
    });
  }
  RED.nodes.registerType('timecheck', TimeCheckNode);
};
