// index.js
Page({
  data: {
    breakTime: 1,
    potatoTime: 1,
    second: 0,
    minute: 0,
    timerPercent: 0,
    timer: null,
    timing: false,
    buttons: [{
      text: '工作'
    }, {
      text: '休息'
    }],
    dialogShow: false,
    working: true,
  },

  onLoad() {
    this.init()
  },
  init() {
    this.setData({
      minute: this.data.potatoTime,
      second: 0,
      working: true,
      timerPercent: 0,

    })
  },
  pause() {
    clearInterval(this.data.timer)
    this.data.timer = null;
  },
  start(minute, second, totalMinute) {
    let timerPercent = 100 - (minute * 60 + second) * 100 / totalMinute / 60
    this.setData({
      second,
      minute,
      timerPercent
    })
    this.data.timer = setInterval(() => {
      if (second === 0) {
        if (minute !== 0) {
          minute -= 1
          second = 59
        } else {
          this.pause()
          this.data.timing = false
          if (this.data.working) {
            this.setData({
              dialogShow: true
            })
          } else {
            this.init()
            return;
          }

        }
      } else {
        second -= 1
      }
      timerPercent = 100 - (minute * 60 + second) * 100 / totalMinute / 60
      this.setData({
        second,
        minute,
        timerPercent
      })
    }, 1000)
  },
  tapDialogButton(e) {
    let working = true;
    switch (e.detail.index) {
      case 0: // work
        working = true
        break;
      case 1: // break
        working = false;
        break;
    }
    this.setData({
      dialogShow: false,
      working
    })
    this.startPauseClick()
  },
  startPauseClick() {
    if (this.data.timer) {
      this.pause()
      return;
    }
    const {
      timing,
      potatoTime,
      breakTime,
      working
    } = this.data
    let totalMinute = working ? potatoTime : breakTime
    let second = timing ? this.data.second : 0
    let minute = timing ? this.data.minute : totalMinute
    if(!timing){
      this.data.timing = true
    }
    this.start(minute, second, totalMinute)
  },
  minusB(e){
    let breakTime = this.minus(this.data.breakTime);
    this.setData({
      breakTime
    })
  },
  plusB(e){
    let breakTime = this.plus(this.data.breakTime);
    this.setData({
      breakTime
    })
  },
  minusP(e){
    let potatoTime = this.minus(this.data.potatoTime);
    this.setData({
      potatoTime,
      minute:potatoTime
    })
  },
  plusP(e){
    let potatoTime = this.plus(this.data.potatoTime);
    this.setData({
      potatoTime,
      minute:potatoTime
    })
  },
  minus(number){
    if(number>1){
      number--;
    }
    return number
  },
  plus(number){
    if(number<60){
      number++
    }
    return number
  },
})