class Timer {
  constructor(timeSeconds) {
    this.countTime = timeSeconds;
    this.clockInstance = null;

    let t = new Date();
    t.setSeconds(t.getSeconds() + this.countTime);
    this.timeBegan = t;
  }

  // 開始倒數
  // @param   callback: [function]
  start(callback) {
    this.clockInstance = setInterval(() => {
      var timeCurrent = new Date(),
        timeRemain = new Date(this.timeBegan - timeCurrent),
        remainMin = timeRemain.getUTCMinutes(),
        remainSec = timeRemain.getUTCSeconds(),
        remainMills = timeRemain.getUTCMilliseconds().toString().slice(0, -1);
      
      if (timeRemain < 0) {
        $('#timer').text(`${this.countTime}'00"`);
        clearInterval(this.clockInstance);
        callback();
      } else {
        $('#timer').text(`${remainMin * 60 + remainSec}'${remainMills}"`);
      }
    }, 10);
  }

  // 更動倒數秒數
  // @param:   delta: Int | 更動秒數
  updateTime(delta) {
    if (this.timeBegan == null || this.clockInstance == null) return;
    this.timeBegan.setSeconds(this.timeBegan.getSeconds() + delta);
  }
}