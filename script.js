// 修复版脚本
console.log('🚀 script_fixed.js 开始加载');

// 音乐数据
const musicData = [

  {
    id: 1,
    "title": "天上人间 白水台",
    "artist": "墨尚七",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk4OTk=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 252
  },
  {
    id: 2,
    "title": "快乐人生",
    "artist": "和月圆",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk4NTQ=",
    "cover": "http://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7N7s5enKLic15fx5DKYlTe6R5hBaC2WqqF3rZ22IrqsMY9qWWGD7KuDzzWNA9Z6RWag31oaw7M5NSDMK5fiaRP1mSMfRuLicUzVFU/0?wx_fmt=jpeg",
    "duration": 223
  },
  {
    id: 3,
    "title": "拉市斗牛之歌",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk4MTc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 225
  },
  {
    id: 4,
    "title": "西余花花色.",
    "artist": "涵蜜金组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk5MDE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasyOXmPL0dJQrLYicMeaf2VZh1gEWUD3iaRgBwJMa6vpuE5YxH6uMeyC4w/0?wx_fmt=jpeg",
    "duration": 213
  },
  {
    id: 5,
    "title": "故乡谣",
    "artist": "赵郑芝",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk4MDU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NrCAYkYXuqd1OjLa4qTZNmGWIuQiapFCLO1tPsE7z23p6wm9sPlvaCCRcS4B2k3bZPdnbVU9UrWh4EXORhQdo31QxAYm2cdc2M/0?wx_fmt=jpeg",
    "duration": 252
  },
  {
    id: 6,
    "title": "无名的歌",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk4MDM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 201
  },
  {
    id: 7,
    "title": "五台之歌",
    "artist": "和圣福 和丽龙 和丽霞 和雪芹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk3NzQ=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NsBgRKarJntvQM8IrSr32QZQTu1ef9xyxNUDLAiaTAreTv6Ozw4u4icEib7Z7aRHEPiciaJEeKZnSAscGrVKwYNIby39piaoEkLANHU/0?wx_fmt=jpeg",
    "duration": 220
  },
  {
    id: 8,
    "title": "达瓦纳西努2026",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk3NDk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 224
  },
  {
    id: 9,
    "title": "塔城纳西民歌",
    "artist": "金顺、和秀山",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzY=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 222
  },
  {
    id: 10,
    "title": "三月百花开",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzU=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 216
  },
  {
    id: 11,
    "title": "悄然前行",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzQ=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 248
  },
  {
    id: 12,
    "title": "回到我身边",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzM=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 172
  },
  {
    id: 13,
    "title": "红叶傲霜",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzI=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 329
  },
  {
    id: 14,
    "title": "打跳联唱",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzE=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 415
  },
  {
    id: 15,
    "title": "次里次姆",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzA=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 243
  },
  {
    id: 16,
    "title": "沧桑的诺言",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2Njc=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 290
  },
  {
    id: 17,
    "title": "游子的心",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NjY=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 245
  },
  {
    id: 18,
    "title": "兴余花华色",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NjU=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 278
  },
  {
    id: 19,
    "title": "劝世歌",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NjQ=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 172
  },
  {
    id: 20,
    "title": "勒巴舞唱腔",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NjM=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 321
  },
  {
    id: 21,
    "title": "鱼水相会",
    "artist": "和善武、金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NjI=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 180
  },
  {
    id: 22,
    "title": "吉祥的日子",
    "artist": "和雪兰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk1ODI=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVic8Y7J4gj1eLOpBTqic5g3IRBBPP4Uy0bNtJXA8r7GT6qpqJLrCKPFtP5rWfWfYdPLmUlRicoFrXolg/0?wx_fmt=jpeg",
    "duration": 245
  },
  {
    id: 23,
    "title": "白水台",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk1NzE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVic7ROjf0KKfEcQL888Yss6XsGbubU4hSoB4jKEXibPDSqn317NmQL7QSZJaiblPUCEjwx5HwHzQiarDg/0?wx_fmt=jpeg",
    "duration": 246
  },
  {
    id: 24,
    "title": "白水台",
    "artist": "习东梅",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk1NzA=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVic7ROjf0KKfEcQL888Yss6XsGbubU4hSoB4jKEXibPDSqn317NmQL7QSZJaiblPUCEjwx5HwHzQiarDg/0?wx_fmt=jpeg",
    "duration": 246
  },
  {
    id: 25,
    "title": "我的父亲母亲",
    "artist": "和顺东",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk1NDg=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib5wQ6puTht2pPhmAJXKeYG6YCq08SwLGkic0icPHiaib5SWd75LWftBzg90q1AzT0D0xM4Y0ibBMVuJWw/0?wx_fmt=jpeg",
    "duration": 216
  },
  {
    id: 26,
    "title": "纳西若",
    "artist": "和丽霞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk1MTA=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib9xXQ0tp4hgAnCwFX2Mocl5S7Pdz8KG82uLwpm5iaFxgsABrVtbL5V782yFXHQWpUy8rSKWgTssrw/0?wx_fmt=jpeg",
    "duration": 245
  },
  {
    id: 27,
    "title": "纳西族音乐史",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0OTM=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8blmXDtvjo9PicNibWxuKUU4UGyxJ5jzrlolibpQ0UCTXfBPZibaXic822BdCAOibmaylZjM5eALsvUuEg/0?wx_fmt=jpeg",
    "duration": 4001
  },
  {
    id: 28,
    "title": "欢聚",
    "artist": "阿花蜜、纳西蕾蕾",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0NzY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8blmXDtvjo9PicNibWxuKUU4rAPWvIeHKPNOvia58vdUNtCr8TEUqCkAN8r50E6w91jNU863cX7AMVA/0?wx_fmt=jpeg",
    "duration": 215
  },
  {
    id: 29,
    "title": "我爱纳西丽江坝",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0NjA=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9JKP2nuDdxTWlNR3cAD7DmY9ib2AUeWweH1HeyJO3g8zcnTJXaPUllNyGQpYm8niaFx9Svav7SZbug/0?wx_fmt=jpeg",
    "duration": 267
  },
  {
    id: 30,
    "title": "迎客欢歌",
    "artist": "和春艳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0NTU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9JKP2nuDdxTWlNR3cAD7DmAC3sXLb9JCyKzqv5Lp8opC0iaKbB8UV95et393MIHlWm0yjvPvgApOg/0?wx_fmt=jpeg",
    "duration": 240
  },
  {
    id: 31,
    "title": "玉龙山组合、金沙姑娘组合-梦想成真",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0NDU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 231
  },
  {
    id: 32,
    "title": "欢天喜地",
    "artist": "陈四才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0MzM=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib5lkH01GMQb8PblOXrWJaomBjjYNDeL21uVwa3BegAoTV1NwyxYETbKg/0?wx_fmt=jpeg",
    "duration": 212
  },
  {
    id: 33,
    "title": "孝敬父母",
    "artist": "彩菊",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0MjQ=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib5oLOibjibib5svLxibNQgGKvs8Mh7go76NTj5LqXOzKhp9jZBDhjWDypUMw/0?wx_fmt=jpeg",
    "duration": 298
  },
  {
    id: 34,
    "title": "纳西欢歌",
    "artist": "天龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0MTE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibx6Z7eJJADYAPsJNe76NaBtU2rIbt8A3bhtLR0MRMjI7OUHF78SQnfRq9fibwJIpS167BVM1nGCYg/0?wx_fmt=jpeg",
    "duration": 246
  },
  {
    id: 35,
    "title": "耆老新歌",
    "artist": "和集虎",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0MDA=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicHjxIhu6g56y5PkMEAvcib0smy0hYDCT4mnLaUFmCPWZOG724nJLl5axlO4icf4fnm8LLyLrudqXww/0?wx_fmt=jpeg",
    "duration": 232
  },
  {
    id: 36,
    "title": "兄弟情",
    "artist": "天龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkzOTM=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicHjxIhu6g56y5PkMEAvcib0HSDg3VthxIpmNAqNYAelkiabuD0gwoEZxFSYmtyIxkZ3xViawNqtq2gQ/0?wx_fmt=jpeg",
    "duration": 223
  },
  {
    id: 37,
    "title": "欢乐的阿哩哩",
    "artist": "和艳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkzNzk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibeFzk8VVBC2DlnYicjt64IL7I538jKiauv5y1Adz8wkjtYfQpufsEmOoM0ic0VCr3qGgh09b8670vicg/0?wx_fmt=jpeg",
    "duration": 253
  },
  {
    id: 38,
    "title": "纳西姑娘美",
    "artist": "丽江福铃组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkzNjM=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicHRE7coWtYeiaM1qeiaXkmE5gZnDkXMPyicr0kKqlOLmAer7KNicHic0teWhicAsJsuYEibF0gbZfHt4vDw/0?wx_fmt=jpeg",
    "duration": 229
  },
  {
    id: 39,
    "title": "祈望",
    "artist": "啊秋",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkzNTA=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicHRE7coWtYeiaM1qeiaXkmE5NrYtvAIXF5kJGE3zbRvmTdCQUbQZxFz7nWCJyfjEZTibuKBBNrbXQPQ/0?wx_fmt=jpeg",
    "duration": 244
  },
  {
    id: 40,
    "title": "党情冷么密",
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkzMjk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 321
  },
  {
    id: 41,
    "title": "努美罗格姿呗",
    "artist": "陈四才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkzMjc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFuEdtEjX2Z8l8c93Ajq6qO8nqHdPUg4k0zfrJoE3BDDhQWjequhgppA/0?wx_fmt=jpeg",
    "duration": 265
  },
  {
    id: 42,
    "title": "人生",
    "artist": "天龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkzMjI=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFrKUWhTfGFMxNNsz3oCQJ5JiaV3Q4yhOwdYKzZerdeIJgrvV2Iz7Bahg/0?wx_fmt=jpeg",
    "duration": 301
  },
  {
    id: 43,
    "title": "相伴调",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkzMDE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 296
  },
  {
    id: 44,
    "title": "心里的家",
    "artist": "和雪芹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkyODc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibbicbntchMGnLyuf89OtYLdbEeyxzHKFhcheIbvQfy3yTsQR8GID9xJCSU6G2VZKicsnyRTp1T0U4A/0?wx_fmt=jpeg",
    "duration": 283
  },
  {
    id: 45,
    "title": "莫忘恩情",
    "artist": "阿夏丽",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkyNzI=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibibYibvlic8PD6IUbib87iaVJt9TAT1591libYBYwGiblJZVFsDTGFtXqX0pdP0fmvx7S5jrd51EHP2GIDQ/0?wx_fmt=jpeg",
    "duration": 232
  },
  {
    id: 46,
    "title": "歌唱长水",
    "artist": "和生辉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkyNDA=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZBZ2v17qhuaicT5jTtHLglu4ucxhcrndVg2j0Ric7vr1Bptz8zFAicIiclfv9urOBK8ZoibISfx2hgDQ/0?wx_fmt=jpeg",
    "duration": 264
  },
  {
    id: 47,
    "title": "达瓦纳西努2025",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkyMjY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 228
  },
  {
    id: 48,
    "title": "盛世欢歌",
    "artist": "庭松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkyMTM=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJzooL7Za1iaicW3GyFkN7b1YUqjpJLt50aV1Q4zpwzpbpGzyicNAwibia1tA/0?wx_fmt=jpeg",
    "duration": 290
  },
  {
    id: 49,
    "title": "百草飘香的地方",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkxOTM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9yeOUTjeDgTW6J70hO76GsM2KpbJOdFaHXySLttOcFEb17mHGZhE0jv0ljtXVnHJKG1jhZp887oQ/640?wx_fmt=jpeg",
    "duration": 223
  },
  {
    id: 50,
    "title": "塔城姑娘美",
    "artist": "金锁丽泉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkxOTE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJib5VIeyWqSia1KULW22Zq6AyDXvQhiambwyyg9ic6ic0AvliakWicIrnD5Dwg/0?wx_fmt=jpeg",
    "duration": 248
  },
  {
    id: 51,
    "title": "玉龙神韵",
    "artist": "和瑞智",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkxODI=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibxVULERGyrN6EQ90hiasHQyJuianJ6zhgCwhr8iakCceqHdC3icV29ubH2nks3zPG3HbSNxPERiaDibnSA/0?wx_fmt=jpeg",
    "duration": 428
  },
  {
    id: 52,
    "title": "姿姿好时获",
    "artist": "树润花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkxNzI=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibxVULERGyrN6EQ90hiasHQyPj2vQn42pXSwfC9iaz1mxSNLib8QWKYu1AK7eNLVB12f8VGDNpTfc2Gg/0?wx_fmt=jpeg",
    "duration": 216
  },
  {
    id: 53,
    "title": "我愿",
    "artist": "纳西蕾蕾",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkxNTQ=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVich7dW7dqv73P5wzJRRU3c8Jp1Cofiaxwufp4Ijibsp58XBbTWlsHHjJbq3NMlnqkRxmN8sRD5Rq9icQ/0?wx_fmt=jpeg",
    "duration": 257
  },
  {
    id: 54,
    "title": "桃园送别调",
    "artist": "和慧琼、和燕、李九铭、马涛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkxNTE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVich7dW7dqv73P5wzJRRU3c8SNnIwBQaKta1q2nAuD0XAXye1Oib7MjtuzQXqic7Toxp1DQR0Bq1qaow/0?wx_fmt=jpeg",
    "duration": 192
  },
  {
    id: 55,
    "title": "阿莎蜜",
    "artist": "李佳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkxMTU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2Yynm9ZJcNwYVb4dw93xLt8zeXejU7JOiaBkTy7AMprJ5mJMwZ5IT0vBqA/0?wx_fmt=jpeg",
    "duration": 315
  },
  {
    id: 56,
    "title": "纳西新劝世歌",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkxMDI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 300
  },
  {
    id: 57,
    "title": "相依相守",
    "artist": "阿花蜜",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkwOTY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2Yyv1b6ibJ9Vn2FpRu6GxtVzEdCVMCC6kOeKjGsMNRPVmAC0Jen8Vak0WA/0?wx_fmt=jpeg",
    "duration": 239
  },
  {
    id: 58,
    "title": "愿",
    "artist": "木贵花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkwNzA=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9S1icwGutOXntH2hIme4hicGiaWvUBZeOSnY15XwxZxBFhicFf8oB94P1S3GqUSr07YFnPFhaQgP0Plw/0?wx_fmt=jpeg",
    "duration": 307
  },
  {
    id: 59,
    "title": "满子周固男",
    "artist": "纳浫阿福",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkwMzk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV97ht8vllhIdlyWx26j1VMibyls3YsETR1uMwM0hL9MUZU7ww54HYmanHibL6yOgUBjZY1S4zfh1AsA/0?wx_fmt=jpeg",
    "duration": 241
  },
  {
    id: 60,
    "title": "爸美汝实贺",
    "artist": "和善武",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkwMzY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV97ht8vllhIdlyWx26j1VMibhw32CVXUaBhibGnfmbqcF5tW0kTb0NTYaKycFseg4GUz2SD7IJhqqog/0?wx_fmt=jpeg",
    "duration": 251
  },
  {
    id: 61,
    "title": "相逢三杯酒",
    "artist": "丽江阿黑哥",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkwMjc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV97ht8vllhIdlyWx26j1VMibOhbcl452eG4o1oiaJ6U9jCJJPvYmSXyqKvias9oiakqAdBMJGOn1twmFQ/0?wx_fmt=jpeg",
    "duration": 239
  },
  {
    id: 62,
    "title": "幸福生活唱不完",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5OTg=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9o4HTgRx4AV3LduianWdhYWQoHSsXpAo1a7icz4ExkgyFiboHf1KSyoMyo2aQAicwb0rtyjjdGibkO2SQ/0?wx_fmt=jpeg",
    "duration": 189
  },
  {
    id: 63,
    "title": "纳西火把节",
    "artist": "阿泉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5ODc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9o4HTgRx4AV3LduianWdhYWSCHWWZaIlw5T5vjANjnicuRUmCS1zaGBvJC0P5z0LyKKHQQqMqJynkA/0?wx_fmt=jpeg",
    "duration": 243
  },
  {
    id: 64,
    "title": "绿色出行歌.",
    "artist": "涵蜜金组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5NzE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasyOXmPL0dJQrLYicMeaf2VZh1gEWUD3iaRgBwJMa6vpuE5YxH6uMeyC4w/0?wx_fmt=jpeg",
    "duration": 213
  },
  {
    id: 65,
    "title": "摩梭山歌",
    "artist": "涵蜜金组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5Mzk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasBOxsZdP0KC0p6o0xY5WDqbWkxtWOTYejlBHiboPRPg6xfhrRPCrUCEg/0?wx_fmt=jpeg",
    "duration": 293
  },
  {
    id: 66,
    "title": "阿哩哩花花色",
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5MjE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 264
  },
  {
    id: 67,
    "title": "呀哈哩",
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5MTk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 260
  },
  {
    id: 68,
    "title": "喜庆歌",
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5MTc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 197
  },
  {
    id: 69,
    "title": "白云曲",
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5MTU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 192
  },
  {
    id: 70,
    "title": "归期",
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5MTE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 241
  },
  {
    id: 71,
    "title": "花落流年",
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5MDk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 228
  },
  {
    id: 72,
    "title": "纳西潘金妹",
    "artist": "郑旭先",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg4OTY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeO60VGZTzZxUFicUa24giangIEfricdYUOibr9RgKTiaPZicgAHSWrUCDvJWw/0?wx_fmt=jpeg",
    "duration": 185
  },
  {
    id: 73,
    "title": "冬之歌",
    "artist": "郑旭先",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg4ODA=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeJyNibQGibsibIzgQXfTRjdIcfq5ibwGc5kqdjcSgbOnKib8bgr7SoSQcqWw/0?wx_fmt=jpeg",
    "duration": 228
  },
  {
    id: 74,
    "title": "秋之歌",
    "artist": "杨耀兰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg4Nzg=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xegPLtiaS4icmPj04FTLrLkUgSTqmaKicfty0vlzibXJIibAGGf39XQAD98bQ/0?wx_fmt=jpeg",
    "duration": 263
  },
  {
    id: 75,
    "title": "夏之歌",
    "artist": "李丽芳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg4NzY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeIFmWo5Btnib93XKpA0PnyX4eqdiaYap4WlQIWIEX4gm1swDVWbK9R9icA/0?wx_fmt=jpeg",
    "duration": 268
  },
  {
    id: 76,
    "title": "春之歌",
    "artist": "王瑞香",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg4NzQ=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xecOULzOI69StzBgQ6mOOLg59I32q7ZeNJyJ1rRdDwrCYNcRiamMAVHRg/0?wx_fmt=jpeg",
    "duration": 287
  },
  {
    id: 77,
    "title": "恩难忘",
    "artist": "李丽芳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg4NzI=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeicFPYCIsUnpGhVggsu0sRWh2pNoyHGUhGWcvCfpaibbAZK8Wvdo1w0kA/0?wx_fmt=jpeg",
    "duration": 307
  },
  {
    id: 78,
    "title": "故乡太安",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg4Mjk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9MvSuno0y0pHic0lg7KhJhTjOibuYonDbibN4dhuz0pdS1jmt77jaF9WkXQzhFx4vR1MT9ky6t0jUBQ/0?wx_fmt=jpeg",
    "duration": 222
  },
  {
    id: 79,
    "title": "歌颂党情",
    "artist": "阿福",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg4MTY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicuNH092cxUKSRmibSAEzj2cUhnsRqHO6dXAhCPChjxnM0g5oXECiavGwp8lmocAZqppouGnaytI7uw/0?wx_fmt=jpeg",
    "duration": 200
  },
  {
    id: 80,
    "title": "依恋的家园",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg4MDY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 320
  },
  {
    id: 81,
    "title": "拉伯谷气",
    "artist": "和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg3OTA=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NAOOTqJ4CT2vWUKiaErYyQlhZ89GYTflmEbE9UeEmsicliaq5omgYe6ibShPRxaibunyF5XapduNXnH1bsMynxuPV7U21bksRtZEOE/640?wx_fmt=jpeg",
    "duration": 290
  },
  {
    id: 82,
    "title": "花季情思",
    "artist": "涵依玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg2OTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 271
  },
  {
    id: 83,
    "title": "孝行颂",
    "artist": "和君梅",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg2OTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 182
  },
  {
    id: 84,
    "title": "缘定今生",
    "artist": "和丽刚、金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg2NzM=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 281
  },
  {
    id: 85,
    "title": "丽江好在",
    "artist": "玉龙山组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg2Njg=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 281
  },
  {
    id: 86,
    "title": "塔拉久初",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg2NTM=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 283
  },
  {
    id: 87,
    "title": "菩捞阿姆",
    "artist": "和丽刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg2MjI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 307
  },
  {
    id: 88,
    "title": "欢聚白水台",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg2MDE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 230
  },
  {
    id: 89,
    "title": "舞动丽江",
    "artist": "丽江小龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg2MDA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 297
  },
  {
    id: 90,
    "title": "心中的神山",
    "artist": "雄纳独知",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg1Njk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 258
  },
  {
    id: 91,
    "title": "隔山隔水不隔心",
    "artist": "和华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg1NDY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 181
  },
  {
    id: 92,
    "title": "达瓦纳西努2024",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg1Mzg=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 206
  },
  {
    id: 93,
    "title": "心中的丽江",
    "artist": "小靓",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg0OTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 250
  },
  {
    id: 94,
    "title": "欢声笑语",
    "artist": "和笑",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg0ODE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 229
  },
  {
    id: 95,
    "title": "四时吉祥",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg0NjA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9yeOUTjeDgTW6J70hO76GsM2KpbJOdFaHXySLttOcFEb17mHGZhE0jv0ljtXVnHJKG1jhZp887oQ/640?wx_fmt=jpeg",
    "duration": 255
  },
  {
    id: 96,
    "title": "情缘天地",
    "artist": "涵密金",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg0Mzc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 263
  },
  {
    id: 97,
    "title": "拉市足球之歌",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTgzNDY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 192
  },
  {
    id: 98,
    "title": "血肉相依",
    "artist": "和丽龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTgzMjM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Nw9LsfY0B3jRfCP9IrSSjgIkR3usu3iceMibqPqGcDl2HGC6quJlPI0VHZxQiaMC8Raj8SHD8BVujDnhPqWMEZFGNnddk1DFrmTA/640?wx_fmt=png&from=appmsg",
    "duration": 323
  },
  {
    id: 99,
    "title": "心上人",
    "artist": "纳西晓霞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTgyODg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 227
  },
  {
    id: 100,
    "title": "不变的誓言",
    "artist": "和丽刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTgyNDA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 243
  },
  {
    id: 101,
    "title": "思恋",
    "artist": "和文珠",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTgxNzM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 254
  },
  {
    id: 102,
    "title": "草原上的女人",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTgxNTM=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 269
  },
  {
    id: 103,
    "title": "尼西情",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc5NDc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 336
  },
  {
    id: 104,
    "title": "呀阁雄高么",
    "artist": "纳西蕾蕾",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc4NjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 216
  },
  {
    id: 105,
    "title": "不放手",
    "artist": "墨尚七",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc4NTM=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 252
  },
  {
    id: 106,
    "title": "《农村人居环境》快板(和群星 和善武)",
    "artist": "和群星 和善武",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc3NzA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/tfpibRIwbCVibHO5a7fCobFRBx1dafcvMoxBIs7iawfgrQicfI3AhAnsuhKLqGasMj6xR6pC5Az8ibIfbPK4lVcqR6g/640?wx_fmt=png",
    "duration": 231
  },
  {
    id: 107,
    "title": "阿卡巴拉",
    "artist": "涵蜜金组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc3Njk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 356
  },
  {
    id: 108,
    "title": "纳西依古堆",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc3Njc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 148
  },
  {
    id: 109,
    "title": "绿色家园",
    "artist": "涵蜜金组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc3NjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 285
  },
  {
    id: 110,
    "title": "寓言",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc3NjU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 222
  },
  {
    id: 111,
    "title": "么彪腾辟",
    "artist": "丽江小龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc3MzA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 201
  },
  {
    id: 112,
    "title": "天雨流芳",
    "artist": "纳西少爷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc2ODc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 187
  },
  {
    id: 113,
    "title": "茸余敢莫标",
    "artist": "阿强",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc2MzY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 251
  },
  {
    id: 114,
    "title": "高山开杜鹃",
    "artist": "和善武",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc2MDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 264
  },
  {
    id: 115,
    "title": "纳西欢歌",
    "artist": "阿强",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc1MTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 245
  },
  {
    id: 116,
    "title": "苦尽甘来",
    "artist": "和永昌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc0ODM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 201
  },
  {
    id: 117,
    "title": "今夜独我",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc0NDQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 244
  },
  {
    id: 118,
    "title": "心里话",
    "artist": "福音音",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc0Mjk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 212
  },
  {
    id: 119,
    "title": "雷鬼酒歌",
    "artist": "纳西阿贵",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTczOTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Pfob4GOy3ZueVaiaULB7dYycoh7CxJ1DclToF5rnqAnrPvZ0yVaoJvfH6xfibEgj7c0dZVaRRB2VyvicPruVUjM4bj9dQKjW7W4I/640?wx_fmt=png&from=appmsg",
    "duration": 221
  },
  {
    id: 120,
    "title": "云天情歌",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTczMTQ=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 232
  },
  {
    id: 121,
    "title": "莫让人生一场空",
    "artist": "和丽刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTcyNTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 248
  },
  {
    id: 122,
    "title": "梦中的额吉",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTcyMTM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 246
  },
  {
    id: 123,
    "title": "和丽霞 - 纳西美",
    "artist": "和丽霞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTcxODI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 255
  },
  {
    id: 124,
    "title": "喝酒人",
    "artist": "山人行组合 纳子若西",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTcwODY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 235
  },
  {
    id: 125,
    "title": "梦想成真",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTcwNDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 279
  },
  {
    id: 126,
    "title": "梦想成真",
    "artist": "金沙姑娘组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY4ODc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 279
  },
  {
    id: 127,
    "title": "大山情",
    "artist": "塔嘎阿秋、和丽刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY3NTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 274
  },
  {
    id: 128,
    "title": "爱在玉隆拉措",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY3MTc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 239
  },
  {
    id: 129,
    "title": "高高的拉措",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY3MTY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 229
  },
  {
    id: 130,
    "title": "去马尼干戈的路上",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY3MTU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 246
  },
  {
    id: 131,
    "title": "霞光中的翅膀",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY3MTQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 269
  },
  {
    id: 132,
    "title": "雪域名城",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY3MTM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 206
  },
  {
    id: 133,
    "title": "英雄部落",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY3MTE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 335
  },
  {
    id: 134,
    "title": "新年祝福",
    "artist": "纳西谷气",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY2ODQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 167
  },
  {
    id: 135,
    "title": "喜庆歌",
    "artist": "玉龙山组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY2ODE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 195
  },
  {
    id: 136,
    "title": "革囊渡欢迎您",
    "artist": "玉龙山组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY2Mzk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 231
  },
  {
    id: 137,
    "title": "归来",
    "artist": "天龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY1NzY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 268
  },
  {
    id: 138,
    "title": "纳西姐弟歌曲联唱",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY1NTU=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 564
  },
  {
    id: 139,
    "title": "从头再来",
    "artist": "和永昌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY1NDc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 166
  },
  {
    id: 140,
    "title": "刷古刷巴巴",
    "artist": "和善武",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY1MDA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 259
  },
  {
    id: 141,
    "title": "幕布热美",
    "artist": "和丽元 和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY0NDk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 357
  },
  {
    id: 142,
    "title": "姆达蹉",
    "artist": "和月圆 和国江",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY0NDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 278
  },
  {
    id: 143,
    "title": "相守到永久",
    "artist": "周萍、甲姆沽·阿平",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTYzMDI=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7PosUiayMfK1cVm25VHR49xkOomdTUyon1f0icqGo8m5ib8GBFn6hp6zJdcCHTnLeGe3mx7E6M5hnqqr5s0s8YnQbuWFxM3luTWek/640?wx_fmt=jpeg",
    "duration": 249
  },
  {
    id: 144,
    "title": "阿贵 - 纳西舞韵",
    "artist": "阿贵",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTYyNTc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Pfob4GOy3ZueVaiaULB7dYycoh7CxJ1DclToF5rnqAnrPvZ0yVaoJvfH6xfibEgj7c0dZVaRRB2VyvicPruVUjM4bj9dQKjW7W4I/640?wx_fmt=png&from=appmsg",
    "duration": 280
  },
  {
    id: 145,
    "title": "唠喂调.mp3",
    "artist": "和善武、和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTYyMDg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 180
  },
  {
    id: 146,
    "title": "相念三生",
    "artist": "雪莲君",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTYwMDA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 252
  },
  {
    id: 147,
    "title": "阿贵  纳西英子 - 中秋的约定",
    "artist": "阿贵  纳西英子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTU2OTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Pfob4GOy3ZueVaiaULB7dYycoh7CxJ1DclToF5rnqAnrPvZ0yVaoJvfH6xfibEgj7c0dZVaRRB2VyvicPruVUjM4bj9dQKjW7W4I/640?wx_fmt=png&from=appmsg",
    "duration": 221
  },
  {
    id: 148,
    "title": "劝善咒.",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTU2Njg=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 206
  },
  {
    id: 149,
    "title": "纳西口弦 子谷气",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTU1NjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 297
  },
  {
    id: 150,
    "title": "水风永相伴",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTU1Mzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 276
  },
  {
    id: 151,
    "title": "请喝一碗纳西酒 喂唻喂唻",
    "artist": "杨润琴、瑞鸣音乐",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTU1Mjk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 137
  },
  {
    id: 152,
    "title": "生肖歌",
    "artist": "陈四才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTU0ODY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 232
  },
  {
    id: 153,
    "title": "色卡飘季几",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTU0MzM=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 268
  },
  {
    id: 154,
    "title": "姿磋",
    "artist": "和丽刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTUzMzY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 319
  },
  {
    id: 155,
    "title": "【王朝信】忆苦思甜（喂默达调）",
    "artist": "王朝信",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTUzMDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1518
  },
  {
    id: 156,
    "title": "人生如梦",
    "artist": "和杨",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTUxOTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 252
  },
  {
    id: 157,
    "title": "可可托海的牧羊人",
    "artist": "阿尼布鲁鲁",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTUxNzk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 340
  },
  {
    id: 158,
    "title": "美好的时光",
    "artist": "和馨怡",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTUxNzQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 190
  },
  {
    id: 159,
    "title": "建设美丽丽江（纳西快板）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTUwNDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1133
  },
  {
    id: 160,
    "title": "美丽的神话.",
    "artist": "阿尼布鲁鲁、纳西英子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTUwMTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 294
  },
  {
    id: 161,
    "title": "请喝一碗纳西酒 喂唻喂唻",
    "artist": "杨润琴",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTQ5ODA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 137
  },
  {
    id: 162,
    "title": "父亲",
    "artist": "和世奇（四爷）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTQ5MjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 243
  },
  {
    id: 163,
    "title": "布谷传佳信",
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTQ4NzY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 232
  },
  {
    id: 164,
    "title": "生死约定",
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTQ4Njk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 326
  },
  {
    id: 165,
    "title": "恩情",
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTQ4MjY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 255
  },
  {
    id: 166,
    "title": "黑乳名",
    "artist": "墨尚七",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTQ4MjU=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 268
  },
  {
    id: 167,
    "title": "薄荷酒",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTQ3NTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 191
  },
  {
    id: 168,
    "title": "玉龙恋歌（纳西族）李艳婷 李映昀",
    "artist": "李艳婷 李映昀",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTQ3MDA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9kUjdo42iaswjmsGCJr2Zfugra30pkad7vXuMzibBr4Lr3bodJclabqXjBb6FVcjtQK0AyRvx3DsBQ/640?wx_fmt=jpeg",
    "duration": 371
  },
  {
    id: 169,
    "title": "都是一家人",
    "artist": "阿贵",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTQ2OTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Pfob4GOy3ZueVaiaULB7dYycoh7CxJ1DclToF5rnqAnrPvZ0yVaoJvfH6xfibEgj7c0dZVaRRB2VyvicPruVUjM4bj9dQKjW7W4I/640?wx_fmt=png&from=appmsg",
    "duration": 422
  },
  {
    id: 170,
    "title": "纳西酒歌（李艳婷演唱）",
    "artist": "李艳婷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTQyMTg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9kUjdo42iaswjmsGCJr2Zfugra30pkad7vXuMzibBr4Lr3bodJclabqXjBb6FVcjtQK0AyRvx3DsBQ/640?wx_fmt=jpeg",
    "duration": 249
  },
  {
    id: 171,
    "title": "冬去春来（李艳婷作品）",
    "artist": "李艳婷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTM4ODk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9kUjdo42iaswjmsGCJr2Zfugra30pkad7vXuMzibBr4Lr3bodJclabqXjBb6FVcjtQK0AyRvx3DsBQ/640?wx_fmt=jpeg",
    "duration": 258
  },
  {
    id: 172,
    "title": "二月八的祝福",
    "artist": "和雪凤",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTM3MDg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 231
  },
  {
    id: 173,
    "title": "纳西嘎妩蹉",
    "artist": "杨永爱",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTM1OTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 373
  },
  {
    id: 174,
    "title": "绸土词",
    "artist": "和占强  张桂华  和漩  和文军 和丽琼  姚熙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTM1ODk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 335
  },
  {
    id: 175,
    "title": "孝道",
    "artist": "荒田野",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTM1ODI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 334
  },
  {
    id: 176,
    "title": "丽江涅槃序曲童谣",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTM1Mzc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 85
  },
  {
    id: 177,
    "title": "布谷传佳信",
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTM0ODg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 232
  },
  {
    id: 178,
    "title": "勇往直前",
    "artist": "阿贵",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTM0Njg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Pfob4GOy3ZueVaiaULB7dYycoh7CxJ1DclToF5rnqAnrPvZ0yVaoJvfH6xfibEgj7c0dZVaRRB2VyvicPruVUjM4bj9dQKjW7W4I/640?wx_fmt=png&from=appmsg",
    "duration": 218
  },
  {
    id: 179,
    "title": "月亮姆",
    "artist": "纳西童谣",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTMzNjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 75
  },
  {
    id: 180,
    "title": "人生莫愁",
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTMzMTU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 250
  },
  {
    id: 181,
    "title": "人生莫愁",
    "artist": "和丽龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTMzMTQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Nw9LsfY0B3jRfCP9IrSSjgIkR3usu3iceMibqPqGcDl2HGC6quJlPI0VHZxQiaMC8Raj8SHD8BVujDnhPqWMEZFGNnddk1DFrmTA/640?wx_fmt=png&from=appmsg",
    "duration": 215
  },
  {
    id: 182,
    "title": "日纳黑帅《天籁笛乐》",
    "artist": "日纳黑帅",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTMwMDY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 898
  },
  {
    id: 183,
    "title": "茶花开",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTMwMDQ=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 252
  },
  {
    id: 184,
    "title": "幸福拉萨",
    "artist": "次仁桑珠",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI4MzQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 242
  },
  {
    id: 185,
    "title": "纳西童谣——屋后喀嚓嚓",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI3Nzc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 123
  },
  {
    id: 186,
    "title": "幸福醉歌",
    "artist": "陈四才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI3NzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 215
  },
  {
    id: 187,
    "title": "丽江情",
    "artist": "和丽龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI3Njc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 253
  },
  {
    id: 188,
    "title": "万物情",
    "artist": "和毅贵",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI3NTc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Pfob4GOy3ZueVaiaULB7dYycoh7CxJ1DclToF5rnqAnrPvZ0yVaoJvfH6xfibEgj7c0dZVaRRB2VyvicPruVUjM4bj9dQKjW7W4I/640?wx_fmt=png&from=appmsg",
    "duration": 205
  },
  {
    id: 189,
    "title": "相会歌",
    "artist": "阿贵",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI3Mzg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Pfob4GOy3ZueVaiaULB7dYycoh7CxJ1DclToF5rnqAnrPvZ0yVaoJvfH6xfibEgj7c0dZVaRRB2VyvicPruVUjM4bj9dQKjW7W4I/640?wx_fmt=png&from=appmsg",
    "duration": 245
  },
  {
    id: 190,
    "title": "心里话",
    "artist": "和君梅",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI2ODM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 240
  },
  {
    id: 191,
    "title": "相守今生",
    "artist": "和丽刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI2MDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 333
  },
  {
    id: 192,
    "title": "古老的歌",
    "artist": "李秀香",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI1OTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 581
  },
  {
    id: 193,
    "title": "故乡丽江",
    "artist": "刘璇",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI1ODM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 260
  },
  {
    id: 194,
    "title": "受栽蒙套",
    "artist": "李铭九",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI1MjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 226
  },
  {
    id: 195,
    "title": "金沙情歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI1MDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 268
  },
  {
    id: 196,
    "title": "格桑阿佳",
    "artist": "阿佳组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI0NTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 244
  },
  {
    id: 197,
    "title": "曹怀瑾、曹文杨-一滴水经过丽江",
    "artist": "曹怀瑾、曹文杨",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIzOTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 107
  },
  {
    id: 198,
    "title": "万物情",
    "artist": "阿贵",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIzNzg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Pfob4GOy3ZueVaiaULB7dYycoh7CxJ1DclToF5rnqAnrPvZ0yVaoJvfH6xfibEgj7c0dZVaRRB2VyvicPruVUjM4bj9dQKjW7W4I/640?wx_fmt=png&from=appmsg",
    "duration": 204
  },
  {
    id: 199,
    "title": "建设美丽丽江（纳西快板）",
    "artist": "和继元  和志秋",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIzMzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1133
  },
  {
    id: 200,
    "title": "密码丽江",
    "artist": "纳若",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIyMzQ=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 290
  },
  {
    id: 201,
    "title": "起新房",
    "artist": "玉龙山组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIyMDM=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 236
  },
  {
    id: 202,
    "title": "吾日吾几",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIxMzM=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 261
  },
  {
    id: 203,
    "title": "故乡",
    "artist": "和漾水",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIxMTc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 206
  },
  {
    id: 204,
    "title": "阿里里花花色",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIxMTQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 237
  },
  {
    id: 205,
    "title": "和述明",
    "artist": "时代颂",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwOTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 285
  },
  {
    id: 206,
    "title": "爱不需要什么",
    "artist": "和漾水",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwOTU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 208
  },
  {
    id: 207,
    "title": "神仙在哪里",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwODU=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Nc1xcvEOgqBIK5aRFc8SyhVGNDbhv51DA3mA8GqyicQqOH0tianmGImQl5KAgjtPxrnDqY2wgrNNfiaf4aaRdPQ4ssJdgAQnKLIg/640?wx_fmt=png&from=appmsg",
    "duration": 240
  },
  {
    id: 208,
    "title": "《真的爱你》纳西语版",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwNjE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 166
  },
  {
    id: 209,
    "title": "泸沽湖最新甲搓舞",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwNTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1065
  },
  {
    id: 210,
    "title": "幸福万年长",
    "artist": "涵蜜金组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwNTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 200
  },
  {
    id: 211,
    "title": "最美人间",
    "artist": "墨尚七",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwNDA=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 300
  },
  {
    id: 212,
    "title": "呼唤",
    "artist": "和丽龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwMzk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Nw9LsfY0B3jRfCP9IrSSjgIkR3usu3iceMibqPqGcDl2HGC6quJlPI0VHZxQiaMC8Raj8SHD8BVujDnhPqWMEZFGNnddk1DFrmTA/640?wx_fmt=png&from=appmsg",
    "duration": 302
  },
  {
    id: 213,
    "title": "回家的小路",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwMzc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 313
  },
  {
    id: 214,
    "title": "天龙",
    "artist": "梦在路上",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwMjk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 225
  },
  {
    id: 215,
    "title": "石鼓响天下",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwMjM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 260
  },
  {
    id: 216,
    "title": "丽江真美好",
    "artist": "丽江迪高",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwMjI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 442
  },
  {
    id: 217,
    "title": "敬奉三大神",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwMDk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 238
  },
  {
    id: 218,
    "title": "玉龙山下纳西娃",
    "artist": "张曦尹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwMDg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 260
  },
  {
    id: 219,
    "title": "纳西吉祥",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwMDY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 224
  },
  {
    id: 220,
    "title": "我要抱着你 (纳西语)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwMDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 280
  },
  {
    id: 221,
    "title": "牵挂",
    "artist": "纳若",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5OTU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 227
  },
  {
    id: 222,
    "title": "摩梭谣",
    "artist": "纳若",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5OTI=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 262
  },
  {
    id: 223,
    "title": "净土",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5OTA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 221
  },
  {
    id: 224,
    "title": "阿哩哩格吉拍",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5ODk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 335
  },
  {
    id: 225,
    "title": "和合劳",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NzM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 381
  },
  {
    id: 226,
    "title": "嫁女调",
    "artist": "和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NzA=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NAOOTqJ4CT2vWUKiaErYyQlhZ89GYTflmEbE9UeEmsicliaq5omgYe6ibShPRxaibunyF5XapduNXnH1bsMynxuPV7U21bksRtZEOE/640?wx_fmt=jpeg",
    "duration": 188
  },
  {
    id: 227,
    "title": "冬天的约定",
    "artist": "和丽龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NjA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Nw9LsfY0B3jRfCP9IrSSjgIkR3usu3iceMibqPqGcDl2HGC6quJlPI0VHZxQiaMC8Raj8SHD8BVujDnhPqWMEZFGNnddk1DFrmTA/640?wx_fmt=png&from=appmsg",
    "duration": 304
  },
  {
    id: 228,
    "title": "王瑞香",
    "artist": "遇见你",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 304
  },
  {
    id: 229,
    "title": "睡在我上铺的兄弟",
    "artist": "和翠刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 210
  },
  {
    id: 230,
    "title": "唠喂调",
    "artist": "纳西古歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 180
  },
  {
    id: 231,
    "title": "吟酒歌",
    "artist": "和金花、达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NDk=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NAOOTqJ4CT2vWUKiaErYyQlhZ89GYTflmEbE9UeEmsicliaq5omgYe6ibShPRxaibunyF5XapduNXnH1bsMynxuPV7U21bksRtZEOE/640?wx_fmt=jpeg",
    "duration": 259
  },
  {
    id: 232,
    "title": "丽江风暴（二）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NDc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 300
  },
  {
    id: 233,
    "title": "阿卡巴拉",
    "artist": "纳西田野之声",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 185
  },
  {
    id: 234,
    "title": "纳西仁美蹉",
    "artist": "纳西田野之声",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 239
  },
  {
    id: 235,
    "title": "纳西山歌",
    "artist": "墨尚七",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5MzA=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 246
  },
  {
    id: 236,
    "title": "打跳联唱",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5Mjk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 367
  },
  {
    id: 237,
    "title": "泸沽湖民间甲搓舞曲",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5Mjc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1189
  },
  {
    id: 238,
    "title": "舞动傈僳寨",
    "artist": "贺顺才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5MTQ=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MCfnZicureibRuV3pHZuMSoyDVwaWN5UN3lJIADxv6U7JzfGgMY2BGEpwZKfVLsGGcpNnYZzNOh4QCDEE2IprzibnEdwEbXXmen8/640?wx_fmt=jpeg",
    "duration": 189
  },
  {
    id: 239,
    "title": "当爱情来过",
    "artist": "和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5MTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 303
  },
  {
    id: 240,
    "title": "背兰花",
    "artist": "维西阿娜",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5MTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 221
  },
  {
    id: 241,
    "title": "三多颂",
    "artist": "玉龙山组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5MDc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 301
  },
  {
    id: 242,
    "title": "思乡曲",
    "artist": "山人行组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5MDY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 275
  },
  {
    id: 243,
    "title": "子本子缘化",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5MDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 195
  },
  {
    id: 244,
    "title": "劳动歌联唱",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4OTE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 372
  },
  {
    id: 245,
    "title": "纳西纵歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4OTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 170
  },
  {
    id: 246,
    "title": "洛玛底组合",
    "artist": "干酒醉dj",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4ODg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 178
  },
  {
    id: 247,
    "title": "黑帅",
    "artist": "傈僳族打跳",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4ODY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 204
  },
  {
    id: 248,
    "title": "云南",
    "artist": "吉萨莎玛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4ODM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 215
  },
  {
    id: 249,
    "title": "纳藏白西",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4NzM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 330
  },
  {
    id: 250,
    "title": "问",
    "artist": "和霞芬",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4NzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 264
  },
  {
    id: 251,
    "title": "玉龙之子",
    "artist": "东巴石子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4NzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 343
  },
  {
    id: 252,
    "title": "纳西西余花花色",
    "artist": "涵格佩吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4Njk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 249
  },
  {
    id: 253,
    "title": "玉龙酒歌",
    "artist": "和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4NjE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 270
  },
  {
    id: 254,
    "title": "丽江足球之歌",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4NTI=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 216
  },
  {
    id: 255,
    "title": "纳西族母语《童谣》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4NTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 246
  },
  {
    id: 256,
    "title": "纳西谷气",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4NTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 154
  },
  {
    id: 257,
    "title": "纳西打跳（18）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4NDk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 389
  },
  {
    id: 258,
    "title": "牧羊的傈僳姑娘",
    "artist": "贺顺才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4NDc=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MCfnZicureibRuV3pHZuMSoyDVwaWN5UN3lJIADxv6U7JzfGgMY2BGEpwZKfVLsGGcpNnYZzNOh4QCDEE2IprzibnEdwEbXXmen8/640?wx_fmt=jpeg",
    "duration": 197
  },
  {
    id: 259,
    "title": "时授么哒婆",
    "artist": "和丽元",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4Mzk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 277
  },
  {
    id: 260,
    "title": "阿卡巴拉麻达咪",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4MzQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 170
  },
  {
    id: 261,
    "title": "风和花",
    "artist": "和漾水",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4MzM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 292
  },
  {
    id: 262,
    "title": "声音的篇章",
    "artist": "纳西英子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4MzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 211
  },
  {
    id: 263,
    "title": "嘛呢颂",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4MjI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 241
  },
  {
    id: 264,
    "title": "喜庆歌",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4MjE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9yeOUTjeDgTW6J70hO76GsM2KpbJOdFaHXySLttOcFEb17mHGZhE0jv0ljtXVnHJKG1jhZp887oQ/640?wx_fmt=jpeg",
    "duration": 264
  },
  {
    id: 265,
    "title": "犁牛调",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4MTU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 189
  },
  {
    id: 266,
    "title": "月亮姑娘",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4MTQ=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 251
  },
  {
    id: 267,
    "title": "热美姿蹉-原生态组合.mp3",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3OTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 297
  },
  {
    id: 268,
    "title": "呀哈哩",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3OTc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 146
  },
  {
    id: 269,
    "title": "纳西纵歌",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3OTQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 164
  },
  {
    id: 270,
    "title": "纳西民歌《党的的恩情永不忘》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3ODQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 484
  },
  {
    id: 271,
    "title": "纳西姑娘",
    "artist": "阿夏组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3NzQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 167
  },
  {
    id: 272,
    "title": "唱戏人生",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3NzI=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 72
  },
  {
    id: 273,
    "title": "纳西天籁",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3NzA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 273
  },
  {
    id: 274,
    "title": "十里送壮丁",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3Njk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 212
  },
  {
    id: 275,
    "title": "送丧跺脚跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3NTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 234
  },
  {
    id: 276,
    "title": "栽秧歌",
    "artist": "和金花、达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3NTQ=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NAOOTqJ4CT2vWUKiaErYyQlhZ89GYTflmEbE9UeEmsicliaq5omgYe6ibShPRxaibunyF5XapduNXnH1bsMynxuPV7U21bksRtZEOE/640?wx_fmt=jpeg",
    "duration": 176
  },
  {
    id: 277,
    "title": "心上人",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3NTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 159
  },
  {
    id: 278,
    "title": "放牛娃娃调",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3Mzg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 231
  },
  {
    id: 279,
    "title": "阔流巴蕊",
    "artist": "喂默达调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3MzY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 296
  },
  {
    id: 280,
    "title": "丽江小龙",
    "artist": "美丽的古城",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3MzU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 236
  },
  {
    id: 281,
    "title": "踏歌丽江.mp3",
    "artist": "张继心",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3MjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 244
  },
  {
    id: 282,
    "title": "咱撮鲁啦",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3MTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 207
  },
  {
    id: 283,
    "title": "子啦来",
    "artist": "阿石才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3MTM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV860SjRBZewkt9Ytwq2W5rLjoZliaRwEQIgyre4ibNiaf4wXnCd4iaWUPb9qzylqPqoY8uBWwL9Ux6W0A/640?wx_fmt=jpeg",
    "duration": 273
  },
  {
    id: 284,
    "title": "纳西民歌《天女织锦缎》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3MTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 254
  },
  {
    id: 285,
    "title": "丽江在哪里",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3MTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 304
  },
  {
    id: 286,
    "title": "呀哩拉哩",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3MDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 293
  },
  {
    id: 287,
    "title": "纳西谷气调",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2OTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 150
  },
  {
    id: 288,
    "title": "纳西古歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2OTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 320
  },
  {
    id: 289,
    "title": "喜鹤",
    "artist": "李承翰、和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NzY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 336
  },
  {
    id: 290,
    "title": "快乐纳西人",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NzQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNPMK5n2icXswJgq2U4FljgC3h6Wn3xlJEnHicxE9TWMQMEm4yz5em0T6UA/640?wx_fmt=jpeg",
    "duration": 361
  },
  {
    id: 291,
    "title": "恋您我的家",
    "artist": "纳若",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NzE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 243
  },
  {
    id: 292,
    "title": "舞动玉龙",
    "artist": "木作为",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2Njc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 337
  },
  {
    id: 293,
    "title": "美丽的丽江",
    "artist": "木作为",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 286
  },
  {
    id: 294,
    "title": "不怕",
    "artist": "纳若",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NTY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 281
  },
  {
    id: 295,
    "title": "飞花",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NTA=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 387
  },
  {
    id: 296,
    "title": "纳西小情歌",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NDk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9yeOUTjeDgTW6J70hO76GsM2KpbJOdFaHXySLttOcFEb17mHGZhE0jv0ljtXVnHJKG1jhZp887oQ/640?wx_fmt=jpeg",
    "duration": 237
  },
  {
    id: 297,
    "title": "革囊渡",
    "artist": "纳西喔么达",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NDg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 299
  },
  {
    id: 298,
    "title": "纳西花哗磋",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NDY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 254
  },
  {
    id: 299,
    "title": "我的阿妈",
    "artist": "和丽生",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MzU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 275
  },
  {
    id: 300,
    "title": "哦噜唠，敖噜唠",
    "artist": "玉龙山组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MzQ=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 197
  },
  {
    id: 301,
    "title": "老人",
    "artist": "纳西英子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MzM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 245
  },
  {
    id: 302,
    "title": "【纳西歌曲】神爱世人",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 278
  },
  {
    id: 303,
    "title": "阿丽丽金拍",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 239
  },
  {
    id: 304,
    "title": "阿哩哩",
    "artist": "和金花、达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MjM=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NAOOTqJ4CT2vWUKiaErYyQlhZ89GYTflmEbE9UeEmsicliaq5omgYe6ibShPRxaibunyF5XapduNXnH1bsMynxuPV7U21bksRtZEOE/640?wx_fmt=jpeg",
    "duration": 246
  },
  {
    id: 305,
    "title": "三月百花开",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MjI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 213
  },
  {
    id: 306,
    "title": "纳西谷气《南兴调》",
    "artist": "纳西谷气",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 94
  },
  {
    id: 307,
    "title": "嘿美玻",
    "artist": "纳西族童谣",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 216
  },
  {
    id: 308,
    "title": "大理三月好风光",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MDc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 305
  },
  {
    id: 309,
    "title": "相伴调",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1ODg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 218
  },
  {
    id: 310,
    "title": "数鸡蛋",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1ODY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 203
  },
  {
    id: 311,
    "title": "纳西喂么达《黄鹰与耕牛》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1ODU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 194
  },
  {
    id: 312,
    "title": "摩梭夜歌",
    "artist": "和军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1NzY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 266
  },
  {
    id: 313,
    "title": "打谷调",
    "artist": "和金花、达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1NzU=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NAOOTqJ4CT2vWUKiaErYyQlhZ89GYTflmEbE9UeEmsicliaq5omgYe6ibShPRxaibunyF5XapduNXnH1bsMynxuPV7U21bksRtZEOE/640?wx_fmt=jpeg",
    "duration": 196
  },
  {
    id: 314,
    "title": "心上人住江对岸",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1Njc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 249
  },
  {
    id: 315,
    "title": "三多保佑",
    "artist": "马涛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1NjU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 314
  },
  {
    id: 316,
    "title": "喜庆歌",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1NjQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 242
  },
  {
    id: 317,
    "title": "玉龙王国",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1NTc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 220
  },
  {
    id: 318,
    "title": "哦噜唠 敖噜唠",
    "artist": "张桂华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1NTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 370
  },
  {
    id: 319,
    "title": "不要忧虑",
    "artist": "甲姆沽·阿平、阿花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1NTU=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7PosUiayMfK1cVm25VHR49xkOomdTUyon1f0icqGo8m5ib8GBFn6hp6zJdcCHTnLeGe3mx7E6M5hnqqr5s0s8YnQbuWFxM3luTWek/640?wx_fmt=jpeg",
    "duration": 244
  },
  {
    id: 320,
    "title": "阿勒邱 -黄颖星",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1NTQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 215
  },
  {
    id: 321,
    "title": "玉龙雪山的故事",
    "artist": "和上钧&amp;阿诛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1MzM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 350
  },
  {
    id: 322,
    "title": "情调",
    "artist": "李铭九",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1MzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 230
  },
  {
    id: 323,
    "title": "牵手",
    "artist": "和朝花 和会花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1MzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 185
  },
  {
    id: 324,
    "title": "娥姆达",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1Mjk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 196
  },
  {
    id: 325,
    "title": "雨中偶遇",
    "artist": "和漾水",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1MTg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 272
  },
  {
    id: 326,
    "title": "美丽的古城",
    "artist": "和漩",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1MTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 238
  },
  {
    id: 327,
    "title": "丽江风暴（三）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0OTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 972
  },
  {
    id: 328,
    "title": "玉龙誓约",
    "artist": "和学文",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0OTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 274
  },
  {
    id: 329,
    "title": "序",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0OTU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 174
  },
  {
    id: 330,
    "title": "九月（纳西语）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0OTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 281
  },
  {
    id: 331,
    "title": "万物生（纳西语）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0OTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 270
  },
  {
    id: 332,
    "title": "嫁女情",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0ODQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 233
  },
  {
    id: 333,
    "title": "牧羊歌",
    "artist": "和月圆、和国江",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0ODI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 355
  },
  {
    id: 334,
    "title": "远古的叮嘱",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0Nzc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 210
  },
  {
    id: 335,
    "title": "纳西恋歌",
    "artist": "吉日古丽 达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0Njk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 242
  },
  {
    id: 336,
    "title": "三月花开时",
    "artist": "山人行组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0Njg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 246
  },
  {
    id: 337,
    "title": "纳西讲聚营",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0NTk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 170
  },
  {
    id: 338,
    "title": "纳西恋人",
    "artist": "墨尚七",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0NTI=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 200
  },
  {
    id: 339,
    "title": "山娃子",
    "artist": "山娃子新歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0NTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 243
  },
  {
    id: 340,
    "title": "瓜迟迟",
    "artist": "阿石才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0NDQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV860SjRBZewkt9Ytwq2W5rLjoZliaRwEQIgyre4ibNiaf4wXnCd4iaWUPb9qzylqPqoY8uBWwL9Ux6W0A/640?wx_fmt=jpeg",
    "duration": 397
  },
  {
    id: 341,
    "title": "大山女儿",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0MzQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9yeOUTjeDgTW6J70hO76GsM2KpbJOdFaHXySLttOcFEb17mHGZhE0jv0ljtXVnHJKG1jhZp887oQ/640?wx_fmt=jpeg",
    "duration": 224
  },
  {
    id: 342,
    "title": "仙女织布",
    "artist": "墨尚七",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0MjU=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 224
  },
  {
    id: 343,
    "title": "玉龙雪山的牧童",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0MjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 265
  },
  {
    id: 344,
    "title": "欢迎到太安来",
    "artist": "段婷婷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0MjI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 122
  },
  {
    id: 345,
    "title": "纳西酒歌",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0MDc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9yeOUTjeDgTW6J70hO76GsM2KpbJOdFaHXySLttOcFEb17mHGZhE0jv0ljtXVnHJKG1jhZp887oQ/640?wx_fmt=jpeg",
    "duration": 240
  },
  {
    id: 346,
    "title": "丽江小龙",
    "artist": "好兄弟",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0MDY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 193
  },
  {
    id: 347,
    "title": "阿卡巴拉嘛达咪",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzOTY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 170
  },
  {
    id: 348,
    "title": "阿哥",
    "artist": "和锦、和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzOTQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 231
  },
  {
    id: 349,
    "title": "劝牛调",
    "artist": "和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzOTM=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NAOOTqJ4CT2vWUKiaErYyQlhZ89GYTflmEbE9UeEmsicliaq5omgYe6ibShPRxaibunyF5XapduNXnH1bsMynxuPV7U21bksRtZEOE/640?wx_fmt=jpeg",
    "duration": 205
  },
  {
    id: 350,
    "title": "的库册尼嘿",
    "artist": "和群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzODI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/tfpibRIwbCVibHO5a7fCobFRBx1dafcvMoxBIs7iawfgrQicfI3AhAnsuhKLqGasMj6xR6pC5Az8ibIfbPK4lVcqR6g/640?wx_fmt=png",
    "duration": 250
  },
  {
    id: 351,
    "title": "欢乐纳西年",
    "artist": "和永昌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzNzk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 190
  },
  {
    id: 352,
    "title": "新年颂",
    "artist": "墨尚七",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzNzY=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 221
  },
  {
    id: 353,
    "title": "欢迎来到傈僳寨",
    "artist": "和杰华",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzNzQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 127
  },
  {
    id: 354,
    "title": "酒韵永胜",
    "artist": "傈僳朗玛组合",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzNzI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 459
  },
  {
    id: 355,
    "title": "纳西阿妹",
    "artist": "丽江小龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzNjc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 273
  },
  {
    id: 356,
    "title": "爱的翅膀",
    "artist": "木作为",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzNTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 263
  },
  {
    id: 357,
    "title": "溜达（高拉）",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzNTU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 241
  },
  {
    id: 358,
    "title": "血脉",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzNTQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9yeOUTjeDgTW6J70hO76GsM2KpbJOdFaHXySLttOcFEb17mHGZhE0jv0ljtXVnHJKG1jhZp887oQ/640?wx_fmt=jpeg",
    "duration": 226
  },
  {
    id: 359,
    "title": "祝婚歌",
    "artist": "乡音组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzNTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 145
  },
  {
    id: 360,
    "title": "雪山情歌",
    "artist": "和世奇（四爷)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzMzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 319
  },
  {
    id: 361,
    "title": "丽水纵歌",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzMzA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 306
  },
  {
    id: 362,
    "title": "牧牛姑娘",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzMjg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 219
  },
  {
    id: 363,
    "title": "欢爱",
    "artist": "和朝花 和会花 和文明",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzMjc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 204
  },
  {
    id: 364,
    "title": "让我们一起干酒醉",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzMTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 203
  },
  {
    id: 365,
    "title": "桑瓦贡不勒",
    "artist": "墨尚七",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzMTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 221
  },
  {
    id: 366,
    "title": "相伴调",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzMDQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 175
  },
  {
    id: 367,
    "title": "玉龙恋歌",
    "artist": "和春秀、和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzMDE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 252
  },
  {
    id: 368,
    "title": "纳西栽秧调",
    "artist": "娄丽珍",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzMDA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 143
  },
  {
    id: 369,
    "title": "彩云之南",
    "artist": "和晓霞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyOTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 172
  },
  {
    id: 370,
    "title": "纳西姑娘",
    "artist": "和漾水",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyODk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 194
  },
  {
    id: 371,
    "title": "唯一",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyODY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 276
  },
  {
    id: 372,
    "title": "和德华 -《西库揍》抓小偷",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyODQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 256
  },
  {
    id: 373,
    "title": "纳西酒歌",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyNzE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 107
  },
  {
    id: 374,
    "title": "纳西阿里里",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyNjg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 738
  },
  {
    id: 375,
    "title": "革囊渡",
    "artist": "阿哩哩芦笙调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyNjc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 118
  },
  {
    id: 376,
    "title": "闪脚跳（傈僳族锅庄）",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyNjY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 262
  },
  {
    id: 377,
    "title": "呀哈哩",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyNTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNPMK5n2icXswJgq2U4FljgC3h6Wn3xlJEnHicxE9TWMQMEm4yz5em0T6UA/640?wx_fmt=jpeg",
    "duration": 360
  },
  {
    id: 378,
    "title": "山那边的放猪娃",
    "artist": "张曦尹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyNTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 229
  },
  {
    id: 379,
    "title": "纳西西于花花神",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyNDk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 223
  },
  {
    id: 380,
    "title": "去哪里",
    "artist": "丽江群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyNDg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 302
  },
  {
    id: 381,
    "title": "博开崩莫赌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyMzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 345
  },
  {
    id: 382,
    "title": "哦热热",
    "artist": "纳西田野之声",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyMjg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 226
  },
  {
    id: 383,
    "title": "二由三由的一天",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyMjc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 266
  },
  {
    id: 384,
    "title": "三朵花",
    "artist": "三江组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyMjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 246
  },
  {
    id: 385,
    "title": "木江子组合 酒歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyMTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 119
  },
  {
    id: 386,
    "title": "玉龙雪山放光芒",
    "artist": "纳西谷气",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyMTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 77
  },
  {
    id: 387,
    "title": "阔吐蒙套",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyMTE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 277
  },
  {
    id: 388,
    "title": "那年花开-玉龙女组合",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyMDg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 252
  },
  {
    id: 389,
    "title": "村村寨寨来打跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExOTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 437
  },
  {
    id: 390,
    "title": "喜欢你（纳西语）",
    "artist": "阿智",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExODc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 250
  },
  {
    id: 391,
    "title": "天雨流芳",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExODU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 207
  },
  {
    id: 392,
    "title": "丽江神曲",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExODQ=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 240
  },
  {
    id: 393,
    "title": "纳西花花搓",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExODA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 251
  },
  {
    id: 394,
    "title": "超越葫芦笙 (dj)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNzk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 650
  },
  {
    id: 395,
    "title": "啊啧啧 啊啵啵",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNjc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9yeOUTjeDgTW6J70hO76GsM2KpbJOdFaHXySLttOcFEb17mHGZhE0jv0ljtXVnHJKG1jhZp887oQ/640?wx_fmt=jpeg",
    "duration": 228
  },
  {
    id: 396,
    "title": "纳西仁美磋",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 300
  },
  {
    id: 397,
    "title": "哦噜唠，敖噜唠",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNjU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 336
  },
  {
    id: 398,
    "title": "道诺谷纳西田野之声 -阿卡巴拉",
    "artist": "纳西田野之声",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 185
  },
  {
    id: 399,
    "title": "玉龙欢歌",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNTk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 222
  },
  {
    id: 400,
    "title": "请到傈僳山寨来",
    "artist": "阿石才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNTg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV860SjRBZewkt9Ytwq2W5rLjoZliaRwEQIgyre4ibNiaf4wXnCd4iaWUPb9qzylqPqoY8uBWwL9Ux6W0A/640?wx_fmt=jpeg",
    "duration": 188
  },
  {
    id: 401,
    "title": "纳西时本授",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 108
  },
  {
    id: 402,
    "title": "纳西三脚打跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNDc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 257
  },
  {
    id: 403,
    "title": "谷气调",
    "artist": "和金花 达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExMzY=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NAOOTqJ4CT2vWUKiaErYyQlhZ89GYTflmEbE9UeEmsicliaq5omgYe6ibShPRxaibunyF5XapduNXnH1bsMynxuPV7U21bksRtZEOE/640?wx_fmt=jpeg",
    "duration": 275
  },
  {
    id: 404,
    "title": "纳西情歌",
    "artist": "纳西阿刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExMzQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 158
  },
  {
    id: 405,
    "title": "纳西瑞瑞",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExMzM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 328
  },
  {
    id: 406,
    "title": "傈僳族打跳：小毛调",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExMjM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 251
  },
  {
    id: 407,
    "title": "三代女人的歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExMTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 175
  },
  {
    id: 408,
    "title": "玉龙欢歌",
    "artist": "和丽龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExMTQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Nw9LsfY0B3jRfCP9IrSSjgIkR3usu3iceMibqPqGcDl2HGC6quJlPI0VHZxQiaMC8Raj8SHD8BVujDnhPqWMEZFGNnddk1DFrmTA/640?wx_fmt=png&from=appmsg",
    "duration": 279
  },
  {
    id: 409,
    "title": "纳西语朗诵《纳西家国情》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExMDc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 487
  },
  {
    id: 410,
    "title": "高原风暴",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExMDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 439
  },
  {
    id: 411,
    "title": "西余索-张桂华",
    "artist": "张桂华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwOTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 251
  },
  {
    id: 412,
    "title": "快乐的打跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwOTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 307
  },
  {
    id: 413,
    "title": "朱丽凡－大美永胜",
    "artist": "朱丽凡",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwOTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 240
  },
  {
    id: 414,
    "title": "芦笙欢跳好日子",
    "artist": "朱丽凡",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwODU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 710
  },
  {
    id: 415,
    "title": "纳西新劝世歌",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwNzM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 300
  },
  {
    id: 416,
    "title": "赔麦子",
    "artist": "纳西故事",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwNzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 199
  },
  {
    id: 417,
    "title": "美丽的白云",
    "artist": "和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwNTc=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NAOOTqJ4CT2vWUKiaErYyQlhZ89GYTflmEbE9UeEmsicliaq5omgYe6ibShPRxaibunyF5XapduNXnH1bsMynxuPV7U21bksRtZEOE/640?wx_fmt=jpeg",
    "duration": 140
  },
  {
    id: 418,
    "title": "健康歌",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwNTA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 197
  },
  {
    id: 419,
    "title": "丽江风暴 1",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwNDk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 970
  },
  {
    id: 420,
    "title": "三月百花开",
    "artist": "和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwNDA=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NAOOTqJ4CT2vWUKiaErYyQlhZ89GYTflmEbE9UeEmsicliaq5omgYe6ibShPRxaibunyF5XapduNXnH1bsMynxuPV7U21bksRtZEOE/640?wx_fmt=jpeg",
    "duration": 85
  },
  {
    id: 421,
    "title": "纳西情歌",
    "artist": "人狼格",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwMzg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 162
  },
  {
    id: 422,
    "title": "嘎迟妥洛目",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwMjA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 169
  },
  {
    id: 423,
    "title": "阿卡巴拉",
    "artist": "和议财(纳西族)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwMTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 249
  },
  {
    id: 424,
    "title": "吉祥",
    "artist": "肖煜光、和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA5OTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 138
  },
  {
    id: 425,
    "title": "呀哩拉勒",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA5OTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 251
  },
  {
    id: 426,
    "title": "嘿美孜卜（月光下）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA5OTQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 514
  },
  {
    id: 427,
    "title": "三江组合 -彩云家乡",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA5ODI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 226
  },
  {
    id: 428,
    "title": "三朵花",
    "artist": "纳若",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA5Nzg=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 289
  },
  {
    id: 429,
    "title": "纳西情歌",
    "artist": "和群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA5NzE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/tfpibRIwbCVibHO5a7fCobFRBx1dafcvMoxBIs7iawfgrQicfI3AhAnsuhKLqGasMj6xR6pC5Az8ibIfbPK4lVcqR6g/640?wx_fmt=png",
    "duration": 235
  },
  {
    id: 430,
    "title": "阿一旦",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA5NDk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 192
  },
  {
    id: 431,
    "title": "纳西族打跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA5MTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 2720
  },
  {
    id: 432,
    "title": "纳西古乐《清河老人》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA4OTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 389
  },
  {
    id: 433,
    "title": "",
    "artist": "云之恋",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA4OTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 246
  },
  {
    id: 434,
    "title": "白族情歌",
    "artist": "张贵元、李宝妹",
    "album": "白族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA4ODk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 227
  },
  {
    id: 435,
    "title": "酒歌",
    "artist": "阿巴桑",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA4NTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 177
  },
  {
    id: 436,
    "title": "纳西",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA3OTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 190
  },
  {
    id: 437,
    "title": "如花的阿妹dj-傈僳乡音",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA3OTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 290
  },
  {
    id: 438,
    "title": "白族童谣",
    "artist": "李福元",
    "album": "白族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA3MTQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 80
  },
  {
    id: 439,
    "title": "傈僳族打跳舞曲1",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA3MDQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 222
  },
  {
    id: 440,
    "title": "窝热热（纳西族）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA2NjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 108
  },
  {
    id: 441,
    "title": "嘎美厄美倒背喃",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA1ODM=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 186
  },
  {
    id: 442,
    "title": "朋友",
    "artist": "向阳花合唱团",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA1NzU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 189
  },
  {
    id: 443,
    "title": "神仙",
    "artist": "纳西族童谣",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA1NDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 205
  },
  {
    id: 444,
    "title": "阿瓦人民唱新歌（葫芦笙版）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA1MzU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 126
  },
  {
    id: 445,
    "title": "傈僳族葫芦笙打跳（DJ）",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA1MzI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 156
  },
  {
    id: 446,
    "title": "丽江小调",
    "artist": "百慕三石",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA1MjI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 260
  },
  {
    id: 447,
    "title": "兴跳",
    "artist": "傈僳族葫芦笙打跳曲",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA0NTE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 156
  },
  {
    id: 448,
    "title": "小时候",
    "artist": "和永昌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA0Mjg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 216
  },
  {
    id: 449,
    "title": "玉龙雪山我的家乡",
    "artist": "和群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzOTk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/tfpibRIwbCVibHO5a7fCobFRBx1dafcvMoxBIs7iawfgrQicfI3AhAnsuhKLqGasMj6xR6pC5Az8ibIfbPK4lVcqR6g/640?wx_fmt=png",
    "duration": 259
  },
  {
    id: 450,
    "title": "玉龙欢歌",
    "artist": "和群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzOTY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/tfpibRIwbCVibHO5a7fCobFRBx1dafcvMoxBIs7iawfgrQicfI3AhAnsuhKLqGasMj6xR6pC5Az8ibIfbPK4lVcqR6g/640?wx_fmt=png",
    "duration": 205
  },
  {
    id: 451,
    "title": "思乡",
    "artist": "和群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzODI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/tfpibRIwbCVibHO5a7fCobFRBx1dafcvMoxBIs7iawfgrQicfI3AhAnsuhKLqGasMj6xR6pC5Az8ibIfbPK4lVcqR6g/640?wx_fmt=png",
    "duration": 240
  },
  {
    id: 452,
    "title": "等待",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzNzg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9yeOUTjeDgTW6J70hO76GsM2KpbJOdFaHXySLttOcFEb17mHGZhE0jv0ljtXVnHJKG1jhZp887oQ/640?wx_fmt=jpeg",
    "duration": 257
  },
  {
    id: 453,
    "title": "降央卓玛-弦子",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzNzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 310
  },
  {
    id: 454,
    "title": "阿佳组合-丹巴之花",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzNjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 231
  },
  {
    id: 455,
    "title": "玉龙女",
    "artist": "和群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzNDg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/tfpibRIwbCVibHO5a7fCobFRBx1dafcvMoxBIs7iawfgrQicfI3AhAnsuhKLqGasMj6xR6pC5Az8ibIfbPK4lVcqR6g/640?wx_fmt=png",
    "duration": 226
  },
  {
    id: 456,
    "title": "高美漫纽金",
    "artist": "和群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzMzI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/tfpibRIwbCVibHO5a7fCobFRBx1dafcvMoxBIs7iawfgrQicfI3AhAnsuhKLqGasMj6xR6pC5Az8ibIfbPK4lVcqR6g/640?wx_fmt=png",
    "duration": 255
  },
  {
    id: 457,
    "title": "玉龙之约",
    "artist": "和群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzMzE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/tfpibRIwbCVibHO5a7fCobFRBx1dafcvMoxBIs7iawfgrQicfI3AhAnsuhKLqGasMj6xR6pC5Az8ibIfbPK4lVcqR6g/640?wx_fmt=png",
    "duration": 226
  },
  {
    id: 458,
    "title": "阿哥",
    "artist": "和锦、和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzMjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 231
  },
  {
    id: 459,
    "title": "达坡阿玻",
    "artist": "那一天",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAyOTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 323
  },
  {
    id: 460,
    "title": "阿木宇梅",
    "artist": "彼岸",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAyOTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 300
  },
  {
    id: 461,
    "title": "吉萨莎玛",
    "artist": "风誓",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAyODc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 141
  },
  {
    id: 462,
    "title": "阿腊古金歌",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAyODY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9yeOUTjeDgTW6J70hO76GsM2KpbJOdFaHXySLttOcFEb17mHGZhE0jv0ljtXVnHJKG1jhZp887oQ/640?wx_fmt=jpeg",
    "duration": 279
  },
  {
    id: 463,
    "title": "祝福你，祖国",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAyMjY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 295
  },
  {
    id: 464,
    "title": "脱贫攻坚之歌.",
    "artist": "丽江小龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAyMjE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 212
  },
  {
    id: 465,
    "title": "彩云家乡",
    "artist": "和春秀",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAxOTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 236
  },
  {
    id: 466,
    "title": "喔热热（纳西族民歌集）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAxNjE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 213
  },
  {
    id: 467,
    "title": "古老的歌",
    "artist": "李秀香",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAxNTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 581
  },
  {
    id: 468,
    "title": "新年颂",
    "artist": "墨尚七",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAxMzg=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 221
  },
  {
    id: 469,
    "title": "朋友 Zzee Sso Zzee Mil",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAxMTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 57
  },
  {
    id: 470,
    "title": "李宝妹-哥妹难分舍",
    "artist": "李宝妹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAxMTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 305
  },
  {
    id: 471,
    "title": "傈僳语版《小河淌水》",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAxMTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 153
  },
  {
    id: 472,
    "title": "纳西民歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAwODE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 3446
  },
  {
    id: 473,
    "title": "傈僳族（葫芦笙）dj舞曲",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAwMzI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 258
  },
  {
    id: 474,
    "title": "纳西口弦",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAwMjI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 297
  },
  {
    id: 475,
    "title": "热美磋",
    "artist": "纳西族歌曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAwMjE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 152
  },
  {
    id: 476,
    "title": "欢歌傈僳情",
    "artist": "贺顺才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk5NzA=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MCfnZicureibRuV3pHZuMSoyDVwaWN5UN3lJIADxv6U7JzfGgMY2BGEpwZKfVLsGGcpNnYZzNOh4QCDEE2IprzibnEdwEbXXmen8/640?wx_fmt=jpeg",
    "duration": 282
  },
  {
    id: 477,
    "title": "愿",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk4OTA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 221
  },
  {
    id: 478,
    "title": "垃圾分类 记得喽",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk4MDk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 144
  },
  {
    id: 479,
    "title": "最美人间",
    "artist": "墨尚七",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk4MDI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 300
  },
  {
    id: 480,
    "title": "傈僳打跳：傈僳葫芦笙风暴",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk3NzA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 316
  },
  {
    id: 481,
    "title": "呀哩哩",
    "artist": "和议财",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk3NTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 188
  },
  {
    id: 482,
    "title": "吉日经",
    "artist": "纳西族演唱组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk3Mjk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 245
  },
  {
    id: 483,
    "title": "石钟山的宝石山",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk3MTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 980
  },
  {
    id: 484,
    "title": "纳西语快板：环境保护要搞好.",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk3MDk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 755
  },
  {
    id: 485,
    "title": "纳西语版《我和我的祖国》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk2Nzc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 204
  },
  {
    id: 486,
    "title": "陈四才《幸福醉歌》",
    "artist": "陈四才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk2NjU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 215
  },
  {
    id: 487,
    "title": "阿若康巴",
    "artist": "白玉扎西",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk2NTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 235
  },
  {
    id: 488,
    "title": "白族调——李繁昌、张五妹",
    "artist": "李繁昌、张五妹",
    "album": "白族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk2NDY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 251
  },
  {
    id: 489,
    "title": "万爱千恩(纳西语版）",
    "artist": "和翠刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk2MDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 324
  },
  {
    id: 490,
    "title": "白族调——花配柳（无情曲）",
    "artist": "",
    "album": "白族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk2MDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 512
  },
  {
    id: 491,
    "title": "祝酒歌DJ（傈僳族）",
    "artist": "贺顺才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk2MDI=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MCfnZicureibRuV3pHZuMSoyDVwaWN5UN3lJIADxv6U7JzfGgMY2BGEpwZKfVLsGGcpNnYZzNOh4QCDEE2IprzibnEdwEbXXmen8/640?wx_fmt=jpeg",
    "duration": 220
  },
  {
    id: 492,
    "title": "子啦来",
    "artist": "贺顺才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk2MDE=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MCfnZicureibRuV3pHZuMSoyDVwaWN5UN3lJIADxv6U7JzfGgMY2BGEpwZKfVLsGGcpNnYZzNOh4QCDEE2IprzibnEdwEbXXmen8/640?wx_fmt=jpeg",
    "duration": 273
  },
  {
    id: 493,
    "title": "《三弦伴奏》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk1OTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1292
  },
  {
    id: 494,
    "title": "欢迎您到傈僳山寨来",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk1Nzg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 257
  },
  {
    id: 495,
    "title": "（广播）纳西民歌 上",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk1NDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1337
  },
  {
    id: 496,
    "title": "（广播）纳西民歌 下",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk1NDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1572
  },
  {
    id: 497,
    "title": "安睡",
    "artist": "时光印迹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk1MTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 293
  },
  {
    id: 498,
    "title": "母亲",
    "artist": "余明辉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk1MTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 224
  },
  {
    id: 499,
    "title": "笙动三江",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk1MTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 257
  },
  {
    id: 500,
    "title": "血脉",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk1MDA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 229
  },
  {
    id: 501,
    "title": "纳西山歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0ODc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 246
  },
  {
    id: 502,
    "title": "可怜天下父母亲",
    "artist": "白族调",
    "album": "白族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0ODQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 925
  },
  {
    id: 503,
    "title": "党的光辉照傈僳",
    "artist": "朗玛组合",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0Nzk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 218
  },
  {
    id: 504,
    "title": "白族调——李宝妹逛洱源",
    "artist": "",
    "album": "白族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0NzA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 367
  },
  {
    id: 505,
    "title": "山人行组合",
    "artist": "纳西人",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0NjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 252
  },
  {
    id: 506,
    "title": "白族调—过眼云烟",
    "artist": "",
    "album": "白族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0NjA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 328
  },
  {
    id: 507,
    "title": "阿石才原生态葫芦笙打跳",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0NTk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 362
  },
  {
    id: 508,
    "title": "纳西大调",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0NDg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 455
  },
  {
    id: 509,
    "title": "纳西恋人",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0MjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 200
  },
  {
    id: 510,
    "title": "放鹞曲",
    "artist": "白族调",
    "album": "白族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0MjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 646
  },
  {
    id: 511,
    "title": "",
    "artist": "阿里里花花色",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0MDA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 237
  },
  {
    id: 512,
    "title": "金太阳",
    "artist": "杨新华_庄晓湳等",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDkzOTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 157
  },
  {
    id: 513,
    "title": "浩之心|玉白雪 - 纳西绝恋",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDkzNzQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 336
  },
  {
    id: 514,
    "title": "艰苦奋斗奔小康",
    "artist": "和则刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDkxMTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 470
  },
  {
    id: 515,
    "title": "雪山恋",
    "artist": "金甲劲松、和晓霞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg5Mzk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 156
  },
  {
    id: 516,
    "title": "回归",
    "artist": "和朝花 和会花 和文明",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg5MjA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 255
  },
  {
    id: 517,
    "title": "纳西魂",
    "artist": "元林",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg4ODg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 270
  },
  {
    id: 518,
    "title": "青春和爱情的国度",
    "artist": "和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg4NjY=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NAOOTqJ4CT2vWUKiaErYyQlhZ89GYTflmEbE9UeEmsicliaq5omgYe6ibShPRxaibunyF5XapduNXnH1bsMynxuPV7U21bksRtZEOE/640?wx_fmt=jpeg",
    "duration": 358
  },
  {
    id: 519,
    "title": "遇见你就爱上你",
    "artist": "贺顺才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg4NTk=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MCfnZicureibRuV3pHZuMSoyDVwaWN5UN3lJIADxv6U7JzfGgMY2BGEpwZKfVLsGGcpNnYZzNOh4QCDEE2IprzibnEdwEbXXmen8/640?wx_fmt=jpeg",
    "duration": 157
  },
  {
    id: 520,
    "title": "合唱 -《高美漫纽金》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg4NTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 297
  },
  {
    id: 521,
    "title": "《爱的香格里拉》之起因（纳西",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg4MjA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 321
  },
  {
    id: 522,
    "title": "《爱的香格里拉》之婚礼",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg4MTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 665
  },
  {
    id: 523,
    "title": "送客歌",
    "artist": "和集虎、和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg4MTQ=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NAOOTqJ4CT2vWUKiaErYyQlhZ89GYTflmEbE9UeEmsicliaq5omgYe6ibShPRxaibunyF5XapduNXnH1bsMynxuPV7U21bksRtZEOE/640?wx_fmt=jpeg",
    "duration": 290
  },
  {
    id: 524,
    "title": "《爱的香格里拉》之约定殉情",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg3OTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 226
  },
  {
    id: 525,
    "title": "忧伤（纳西族）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg3OTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 437
  },
  {
    id: 526,
    "title": "祈 福",
    "artist": "和集虎",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg3ODc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 333
  },
  {
    id: 527,
    "title": "纳西语版《叹》",
    "artist": "元林",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg3NTQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 293
  },
  {
    id: 528,
    "title": "纳西语版《流浪歌》",
    "artist": "元林",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg3NTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 293
  },
  {
    id: 529,
    "title": "妈妈我想你 纳西语版",
    "artist": "元林",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg3NTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 279
  },
  {
    id: 530,
    "title": "元林 -家乡的父母（纳西语版）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg3NDk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 247
  },
  {
    id: 531,
    "title": "Bhumo Dolma",
    "artist": "白玉扎西",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg3MjI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 177
  },
  {
    id: 532,
    "title": "纳西 火塘调",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg3MDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 229
  },
  {
    id: 533,
    "title": "姆妮蓝蓝",
    "artist": "普米组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg2NTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1332
  },
  {
    id: 534,
    "title": "纳西纵歌+的库册呢嘿",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg2NTQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 333
  },
  {
    id: 535,
    "title": "黎明情歌",
    "artist": "阿石才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg2NDE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV860SjRBZewkt9Ytwq2W5rLjoZliaRwEQIgyre4ibNiaf4wXnCd4iaWUPb9qzylqPqoY8uBWwL9Ux6W0A/640?wx_fmt=jpeg",
    "duration": 314
  },
  {
    id: 536,
    "title": "傈僳部落",
    "artist": "傈僳三杯酒",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg2NDA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 214
  },
  {
    id: 537,
    "title": "泸沽湖摩梭甲搓舞曲",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg2MDI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 938
  },
  {
    id: 538,
    "title": "傈僳葫芦打跳云贵川通用打跳",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg1OTU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 380
  },
  {
    id: 539,
    "title": "古城区幼儿民族操音乐",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg1ODc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 309
  },
  {
    id: 540,
    "title": "泸沽湖情歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg1NjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 203
  },
  {
    id: 541,
    "title": "纳西谷气",
    "artist": "和学先",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg1MDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 176
  },
  {
    id: 542,
    "title": "嘎克拉-来跳舞 (dj)",
    "artist": "贺顺才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg0ODk=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MCfnZicureibRuV3pHZuMSoyDVwaWN5UN3lJIADxv6U7JzfGgMY2BGEpwZKfVLsGGcpNnYZzNOh4QCDEE2IprzibnEdwEbXXmen8/640?wx_fmt=jpeg",
    "duration": 184
  },
  {
    id: 543,
    "title": "笙动三江（日纳黑帅）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg0Njg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 257
  },
  {
    id: 544,
    "title": "金雪莲风暴（吉）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg0Njc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 869
  },
  {
    id: 545,
    "title": "阿花",
    "artist": "圣诞歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg0NjE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 249
  },
  {
    id: 546,
    "title": "女儿国组合",
    "artist": "若嘿嘿",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg0NDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 187
  },
  {
    id: 547,
    "title": "贺顺才",
    "artist": "金色芒果歌曲串烧dj",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg0MzU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 389
  },
  {
    id: 548,
    "title": "和杰华",
    "artist": "欢迎来到傈僳寨",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg0MzQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 127
  },
  {
    id: 549,
    "title": "织布谣",
    "artist": "纳西民歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg0MDI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 101
  },
  {
    id: 550,
    "title": "踏歌丽江",
    "artist": "张继心",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgzNzk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 244
  },
  {
    id: 551,
    "title": "阿石才",
    "artist": "欢乐的芦笙调",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgzNzE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 384
  },
  {
    id: 552,
    "title": "美丽姑娘",
    "artist": "达坡阿玻",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgzNTY=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MwejD9yic8kz4a72gprFrspuRFaVgR367KE1jZ5sAH1IQe4z4fenVTibGme8UMHeoCujic4VqVl0hbySnD2ia8WTVjPic7MReemic0M/640?wx_fmt=jpeg",
    "duration": 221
  },
  {
    id: 553,
    "title": "那年花开",
    "artist": "玉龙女组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgyOTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 252
  },
  {
    id: 554,
    "title": "叮咛",
    "artist": "和婷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgyNTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 193
  },
  {
    id: 555,
    "title": "傈僳吉祥谣",
    "artist": "贺顺才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgyNDg=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MCfnZicureibRuV3pHZuMSoyDVwaWN5UN3lJIADxv6U7JzfGgMY2BGEpwZKfVLsGGcpNnYZzNOh4QCDEE2IprzibnEdwEbXXmen8/640?wx_fmt=jpeg",
    "duration": 142
  },
  {
    id: 556,
    "title": "劲爆打跳：丽江风暴（二）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgyMzU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 300
  },
  {
    id: 557,
    "title": "罗岚、和恂墨 -纳西幸福说不完",
    "artist": "罗岚、和恂墨",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgyMjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 109
  },
  {
    id: 558,
    "title": "丽江蓝",
    "artist": "和 燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgyMDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 295
  },
  {
    id: 559,
    "title": "阿衣莫翻版",
    "artist": "段婷婷 和翠刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgyMDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 314
  },
  {
    id: 560,
    "title": "殊基黄",
    "artist": "纳西欢歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgyMDI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 279
  },
  {
    id: 561,
    "title": "彩云归处",
    "artist": "张慧珺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxOTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 287
  },
  {
    id: 562,
    "title": "最炫民族风串烧dj（lisu贺顺才",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxOTM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 308
  },
  {
    id: 563,
    "title": "",
    "artist": "劳动之歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxNzQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 374
  },
  {
    id: 564,
    "title": "好兄弟 纳西语",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxNzM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 188
  },
  {
    id: 565,
    "title": "三多保佑",
    "artist": "马涛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxNzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 314
  },
  {
    id: 566,
    "title": "宁蒗摩梭族广场民族舞曲",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxNjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 279
  },
  {
    id: 567,
    "title": "净地",
    "artist": "东巴石子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxNTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 229
  },
  {
    id: 568,
    "title": "dj银开 丽江打跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxNDg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 90
  },
  {
    id: 569,
    "title": "华坪傈僳打跳",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxNDA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 293
  },
  {
    id: 570,
    "title": "和燕~纳西打跳（3D环绕）",
    "artist": "和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxMDY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 339
  },
  {
    id: 571,
    "title": "二月八",
    "artist": "东巴石子 古玛林子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxMDI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 263
  },
  {
    id: 572,
    "title": "瓜来厄",
    "artist": "贺顺才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwOTM=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MCfnZicureibRuV3pHZuMSoyDVwaWN5UN3lJIADxv6U7JzfGgMY2BGEpwZKfVLsGGcpNnYZzNOh4QCDEE2IprzibnEdwEbXXmen8/640?wx_fmt=jpeg",
    "duration": 423
  },
  {
    id: 573,
    "title": "纳西版《传奇》",
    "artist": "丽江阿智",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwNzU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 289
  },
  {
    id: 574,
    "title": "纳西摇篮曲",
    "artist": "东巴石子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwNzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 61
  },
  {
    id: 575,
    "title": "哭嫁 纳西族",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwNzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 188
  },
  {
    id: 576,
    "title": "葫芦笙打跳",
    "artist": "阿石才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwNzA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV860SjRBZewkt9Ytwq2W5rLjoZliaRwEQIgyre4ibNiaf4wXnCd4iaWUPb9qzylqPqoY8uBWwL9Ux6W0A/640?wx_fmt=jpeg",
    "duration": 398
  },
  {
    id: 577,
    "title": "葫芦笙DJ打跳舞曲",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwNjU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 664
  },
  {
    id: 578,
    "title": "月思乡",
    "artist": "东巴石子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwNTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 267
  },
  {
    id: 579,
    "title": "dj贺军 纳西打跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwNTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 276
  },
  {
    id: 580,
    "title": "纳西版 老鼠爱大米",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwNTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 315
  },
  {
    id: 581,
    "title": "心中的昌都",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwMjE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 208
  },
  {
    id: 582,
    "title": "贺顺才",
    "artist": "《汁哆》dj版",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwMTY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 236
  },
  {
    id: 583,
    "title": "尺拉哇dj（傅国英）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwMTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 248
  },
  {
    id: 584,
    "title": "纳西原生态牧歌.",
    "artist": "欢庆",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwMDI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 66
  },
  {
    id: 585,
    "title": "思乡曲【纳西语",
    "artist": "山人行组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwMDA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 275
  },
  {
    id: 586,
    "title": "因为有爱",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5OTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 255
  },
  {
    id: 587,
    "title": "纳西舞动大团结",
    "artist": "黑帅 和爱兰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5ODM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 321
  },
  {
    id: 588,
    "title": "云南丽江摩梭民间甲搓舞曲",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5ODE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1057
  },
  {
    id: 589,
    "title": "新阿里里",
    "artist": "和凤海",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5NzY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 294
  },
  {
    id: 590,
    "title": "九河白族调",
    "artist": "",
    "album": "白族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5NzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 236
  },
  {
    id: 591,
    "title": "黎明情歌",
    "artist": "阿香 阿石才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5Njc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV860SjRBZewkt9Ytwq2W5rLjoZliaRwEQIgyre4ibNiaf4wXnCd4iaWUPb9qzylqPqoY8uBWwL9Ux6W0A/640?wx_fmt=jpeg",
    "duration": 309
  },
  {
    id: 592,
    "title": "欢迎您到白玉来",
    "artist": "白玉扎西",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5NjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 234
  },
  {
    id: 593,
    "title": "纳西文字",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5NjA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 493
  },
  {
    id: 594,
    "title": "朱丽凡－芦笙欢跳好日子重低音",
    "artist": "朱丽凡",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5NDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 710
  },
  {
    id: 595,
    "title": "福乐之城",
    "artist": "甲姆沽·阿平",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5MzY=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7PosUiayMfK1cVm25VHR49xkOomdTUyon1f0icqGo8m5ib8GBFn6hp6zJdcCHTnLeGe3mx7E6M5hnqqr5s0s8YnQbuWFxM3luTWek/640?wx_fmt=jpeg",
    "duration": 233
  },
  {
    id: 596,
    "title": "再相见",
    "artist": "甲姆沽·阿平",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5MzQ=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7PosUiayMfK1cVm25VHR49xkOomdTUyon1f0icqGo8m5ib8GBFn6hp6zJdcCHTnLeGe3mx7E6M5hnqqr5s0s8YnQbuWFxM3luTWek/640?wx_fmt=jpeg",
    "duration": 217
  },
  {
    id: 597,
    "title": "二月八",
    "artist": "纳若",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5MjA=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 289
  },
  {
    id: 598,
    "title": "劳动歌《耕牛调》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc4OTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 25
  },
  {
    id: 599,
    "title": "口弦调",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc4NzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 87
  },
  {
    id: 600,
    "title": "牧羊歌",
    "artist": "和月圆和国江",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc4Njg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 355
  },
  {
    id: 601,
    "title": "葫芦笙串烧",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc4NTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 544
  },
  {
    id: 602,
    "title": "汁哆腊哆《酒歌》",
    "artist": "贺顺才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc4NDY=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MCfnZicureibRuV3pHZuMSoyDVwaWN5UN3lJIADxv6U7JzfGgMY2BGEpwZKfVLsGGcpNnYZzNOh4QCDEE2IprzibnEdwEbXXmen8/640?wx_fmt=jpeg",
    "duration": 174
  },
  {
    id: 603,
    "title": "若梦",
    "artist": "丹巴旺姆",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc4Mjc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 254
  },
  {
    id: 604,
    "title": "劲爆葫芦笙dj加快-和福英",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc4MjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 281
  },
  {
    id: 605,
    "title": "纳西语版 十二月",
    "artist": "纳西英子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc4MTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 326
  },
  {
    id: 606,
    "title": "纳西语版《离家五百里》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc4MDk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 234
  },
  {
    id: 607,
    "title": "哈达献给新时",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc3ODg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 277
  },
  {
    id: 608,
    "title": "十九大精神学用干在先",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc3ODA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 495
  },
  {
    id: 609,
    "title": "新年好",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc3NjU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 187
  },
  {
    id: 610,
    "title": "和永昌 欢乐纳西年",
    "artist": "和永昌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc3NTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 189
  },
  {
    id: 611,
    "title": "达瓦纳西努2019",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc3NTE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 170
  },
  {
    id: 612,
    "title": "傈僳情",
    "artist": "艾玛龙杰",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2ODk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 187
  },
  {
    id: 613,
    "title": "阿石才·子拉勒",
    "artist": "阿石才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2ODQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV860SjRBZewkt9Ytwq2W5rLjoZliaRwEQIgyre4ibNiaf4wXnCd4iaWUPb9qzylqPqoY8uBWwL9Ux6W0A/640?wx_fmt=jpeg",
    "duration": 273
  },
  {
    id: 614,
    "title": "张曦尹《玉龙山下纳西娃》",
    "artist": "张曦尹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2ODA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 260
  },
  {
    id: 615,
    "title": "酒歌",
    "artist": "贺顺才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2NTk=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MCfnZicureibRuV3pHZuMSoyDVwaWN5UN3lJIADxv6U7JzfGgMY2BGEpwZKfVLsGGcpNnYZzNOh4QCDEE2IprzibnEdwEbXXmen8/640?wx_fmt=jpeg",
    "duration": 174
  },
  {
    id: 616,
    "title": "纳西情歌对唱《南兴调》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2NDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 94
  },
  {
    id: 617,
    "title": "纳西情歌对唱《箫筝篾合》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2NDE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 32
  },
  {
    id: 618,
    "title": "傈僳欢歌dj",
    "artist": "阿石才 蜂跃宏",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2MzQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV860SjRBZewkt9Ytwq2W5rLjoZliaRwEQIgyre4ibNiaf4wXnCd4iaWUPb9qzylqPqoY8uBWwL9Ux6W0A/640?wx_fmt=jpeg",
    "duration": 187
  },
  {
    id: 619,
    "title": "嘎嘎尺尺刮器来",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2MzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 180
  },
  {
    id: 620,
    "title": "上午 一封书",
    "artist": "白沙细乐",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2MTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 553
  },
  {
    id: 621,
    "title": "纳西快板 ：美丽古城 幸福家园",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2MTQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 389
  },
  {
    id: 622,
    "title": "有缘千里路",
    "artist": "次仁桑珠",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2MDA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 286
  },
  {
    id: 623,
    "title": "婆媳风波",
    "artist": "白族调 剑川李宝妹",
    "album": "白族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc1ODA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1316
  },
  {
    id: 624,
    "title": "纳西东巴调",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc1NDc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 121
  },
  {
    id: 625,
    "title": "傈僳舞步曲",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc1MTQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 269
  },
  {
    id: 626,
    "title": "朱丽凡－花开花谢痴痴的等",
    "artist": "朱丽凡",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc1MDc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 281
  },
  {
    id: 627,
    "title": "丽江美妞",
    "artist": "和漾水",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0OTQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 248
  },
  {
    id: 628,
    "title": "丽江圆舞曲-李艳婷",
    "artist": "李艳婷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0ODM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9kUjdo42iaswjmsGCJr2Zfugra30pkad7vXuMzibBr4Lr3bodJclabqXjBb6FVcjtQK0AyRvx3DsBQ/640?wx_fmt=jpeg",
    "duration": 138
  },
  {
    id: 629,
    "title": "白沙细乐《冢拾》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0ODA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 337
  },
  {
    id: 630,
    "title": "守住一片天",
    "artist": "和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0NjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 393
  },
  {
    id: 631,
    "title": "",
    "artist": "秧歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0NTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 292
  },
  {
    id: 632,
    "title": "笙动丽江",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0MzY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 599
  },
  {
    id: 633,
    "title": "心肝票 (Live)_张银耀",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0MjU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 164
  },
  {
    id: 634,
    "title": "傈僳Dj",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0MjE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 227
  },
  {
    id: 635,
    "title": "美在怒江",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0MTc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 282
  },
  {
    id: 636,
    "title": "喂么达《塔城调》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0MDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 96
  },
  {
    id: 637,
    "title": "纳西谷气《箫筝篾合》.mp3",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0MDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 32
  },
  {
    id: 638,
    "title": "傈僳（如花的阿妹）dj",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDczOTc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 334
  },
  {
    id: 639,
    "title": "山神之恋",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDczNzk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 221
  },
  {
    id: 640,
    "title": "热美搓",
    "artist": "和红亮、和玉秀",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDczNTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 274
  },
  {
    id: 641,
    "title": "梦中的额吉纳西语",
    "artist": "段婷婷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDczMzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 209
  },
  {
    id: 642,
    "title": "吉日经",
    "artist": "拉伯阿新",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDczMjc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7MmW6tPL8k6ibiaFEyCPy3NNruXHAQuPleFfZHWncuDKuHkYmvhGibcH5J4muDchkl6PJypRcVwEawzQy18sqNKFJF5aibncogKljY/640?wx_fmt=jpeg",
    "duration": 254
  },
  {
    id: 643,
    "title": "纳西打跳dj",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDczMjI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 276
  },
  {
    id: 644,
    "title": "纳西幸福万年长",
    "artist": "拉伯阿新",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDczMTk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7MmW6tPL8k6ibiaFEyCPy3NNruXHAQuPleFfZHWncuDKuHkYmvhGibcH5J4muDchkl6PJypRcVwEawzQy18sqNKFJF5aibncogKljY/640?wx_fmt=jpeg",
    "duration": 117
  },
  {
    id: 645,
    "title": "净土（纳西语）",
    "artist": "达坡阿玻",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDczMTY=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MwejD9yic8kz4a72gprFrspuRFaVgR367KE1jZ5sAH1IQe4z4fenVTibGme8UMHeoCujic4VqVl0hbySnD2ia8WTVjPic7MReemic0M/640?wx_fmt=jpeg",
    "duration": 234
  },
  {
    id: 646,
    "title": "傈僳大蛮调",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDczMTA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 317
  },
  {
    id: 647,
    "title": "热美姿蹉-原生态组合",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcyOTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 238
  },
  {
    id: 648,
    "title": "美丽的白云",
    "artist": "阿木宇梅",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcyOTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 198
  },
  {
    id: 649,
    "title": "美丽的丽江《纳西族》篝火打跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcyNjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1022
  },
  {
    id: 650,
    "title": "东巴唱腔《鲁般鲁绕》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcyNTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 135
  },
  {
    id: 651,
    "title": "口弦悠悠",
    "artist": "和文光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcyMjk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 213
  },
  {
    id: 652,
    "title": "纳西儿歌《老爷找叶子》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcyMjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 43
  },
  {
    id: 653,
    "title": "东巴唱腔《斑米知》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcyMDE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 143
  },
  {
    id: 654,
    "title": "谷气",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcxNzk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 70
  },
  {
    id: 655,
    "title": "白桂花香",
    "artist": "李宝妹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcxNjU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 251
  },
  {
    id: 656,
    "title": "纳西调 古凄",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcxNDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 154
  },
  {
    id: 657,
    "title": "血流成河",
    "artist": "晴天",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcxNDI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 209
  },
  {
    id: 658,
    "title": "妈妈",
    "artist": "人狼格",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcxMjE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 244
  },
  {
    id: 659,
    "title": "阿什阿克吉",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcxMTE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 165
  },
  {
    id: 660,
    "title": "姚熙",
    "artist": "纳西西于花花神",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwOTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 223
  },
  {
    id: 661,
    "title": "阿勒邱",
    "artist": "达坡阿玻",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwOTM=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MwejD9yic8kz4a72gprFrspuRFaVgR367KE1jZ5sAH1IQe4z4fenVTibGme8UMHeoCujic4VqVl0hbySnD2ia8WTVjPic7MReemic0M/640?wx_fmt=jpeg",
    "duration": 177
  },
  {
    id: 662,
    "title": "印象丽江 回家",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwOTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 289
  },
  {
    id: 663,
    "title": "同唱心肝票",
    "artist": "李宝妹 姜中德",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwODk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 288
  },
  {
    id: 664,
    "title": "《相见难》亚哈巴组合",
    "artist": "亚哈巴组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwNzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 326
  },
  {
    id: 665,
    "title": "纳西超级打跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwNjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 389
  },
  {
    id: 666,
    "title": "欢乐和谐苑",
    "artist": "纳若",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwNjU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 294
  },
  {
    id: 667,
    "title": "东巴唱腔杨万勋《幕布幕地》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwNjA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 58
  },
  {
    id: 668,
    "title": "李宝妹 - 牵心绳",
    "artist": "李宝妹",
    "album": "白族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwNTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 240
  },
  {
    id: 669,
    "title": "欢聚在一起",
    "artist": "达坡阿玻",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwNTA=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MwejD9yic8kz4a72gprFrspuRFaVgR367KE1jZ5sAH1IQe4z4fenVTibGme8UMHeoCujic4VqVl0hbySnD2ia8WTVjPic7MReemic0M/640?wx_fmt=jpeg",
    "duration": 186
  },
  {
    id: 670,
    "title": "纳西喂么达《塔城调》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwMzc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 96
  },
  {
    id: 671,
    "title": "纳西 山神之恋",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY5OTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 305
  },
  {
    id: 672,
    "title": "母鸡抱鸭",
    "artist": "李宝妹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY5Njk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 320
  },
  {
    id: 673,
    "title": "风吹十里桂花香",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY5NjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 341
  },
  {
    id: 674,
    "title": "傈僳族摇篮曲",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY5NjM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 264
  },
  {
    id: 675,
    "title": "阿八根与金葫芦片尾曲",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY5Mzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 70
  },
  {
    id: 676,
    "title": "革囊渡",
    "artist": "芦笙调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY5MTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 140
  },
  {
    id: 677,
    "title": "我要抱着你  纳西语",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY5MTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 280
  },
  {
    id: 678,
    "title": "手拉手跳起来",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY4ODg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNPMK5n2icXswJgq2U4FljgC3h6Wn3xlJEnHicxE9TWMQMEm4yz5em0T6UA/640?wx_fmt=jpeg",
    "duration": 360
  },
  {
    id: 679,
    "title": "纳西酒歌",
    "artist": "和兴凤",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY4Nzk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 178
  },
  {
    id: 680,
    "title": "小心肝",
    "artist": "白族歌曲",
    "album": "白族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY4NzY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 296
  },
  {
    id: 681,
    "title": "纳西情歌(纳西语版)",
    "artist": "和群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY4NDA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/tfpibRIwbCVibHO5a7fCobFRBx1dafcvMoxBIs7iawfgrQicfI3AhAnsuhKLqGasMj6xR6pC5Az8ibIfbPK4lVcqR6g/640?wx_fmt=png",
    "duration": 235
  },
  {
    id: 682,
    "title": "傈僳崽崽",
    "artist": "傈僳三杯酒",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY4MzQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 218
  },
  {
    id: 683,
    "title": "白乡情歌第四部",
    "artist": "白族调",
    "album": "白族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY4Mjk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 405
  },
  {
    id: 684,
    "title": "格桑尼玛",
    "artist": "我在香格里拉等你",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY4MjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 324
  },
  {
    id: 685,
    "title": "纳西恋歌",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY3OTY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 235
  },
  {
    id: 686,
    "title": "走失在纳西文字中 天一配乐",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY3NzQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 274
  },
  {
    id: 687,
    "title": "请到傈僳山寨来-阿石才",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY3NTU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 188
  },
  {
    id: 688,
    "title": "瓦器器的故乡",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY3NDY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 233
  },
  {
    id: 689,
    "title": "恰吾色丁",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY3NDE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 274
  },
  {
    id: 690,
    "title": "傈僳族葫芦笙大演奏",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY3MjQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 749
  },
  {
    id: 691,
    "title": "傈僳阿依（流行音乐）",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY3MTg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 274
  },
  {
    id: 692,
    "title": "傈僳娃娃组合",
    "artist": "祝酒歌",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY2Nzg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 220
  },
  {
    id: 693,
    "title": "啊 永胜 永胜",
    "artist": "陈元绍",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY2NzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 132
  },
  {
    id: 694,
    "title": "相遇",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY2NTA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 271
  },
  {
    id: 695,
    "title": "纳西快板 中国梦",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY2Mjg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 251
  },
  {
    id: 696,
    "title": "心灵的坐标-习振东",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY2MjA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 199
  },
  {
    id: 697,
    "title": "依恋",
    "artist": "和丽龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY2MTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Nw9LsfY0B3jRfCP9IrSSjgIkR3usu3iceMibqPqGcDl2HGC6quJlPI0VHZxQiaMC8Raj8SHD8BVujDnhPqWMEZFGNnddk1DFrmTA/640?wx_fmt=png&from=appmsg",
    "duration": 288
  },
  {
    id: 698,
    "title": "纳西打跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY2MDg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 139
  },
  {
    id: 699,
    "title": "纳西歌《兄弟姐妹》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY2MDc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 57
  },
  {
    id: 700,
    "title": "一滴水经过丽江纳西语版",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY2MDA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 300
  },
  {
    id: 701,
    "title": "阿六奶",
    "artist": "丽江群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY1OTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 239
  },
  {
    id: 702,
    "title": "《咒章》洞经音乐",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY1ODg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 449
  },
  {
    id: 703,
    "title": "《丽江风暴》舞曲",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY1NjU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 989
  },
  {
    id: 704,
    "title": "拉伯热美",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY1NjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 152
  },
  {
    id: 705,
    "title": "天籁之爱",
    "artist": "降央卓玛 扎西尼玛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY1NDY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 241
  },
  {
    id: 706,
    "title": "摇篮曲",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY1MzQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 200
  },
  {
    id: 707,
    "title": "哦热热（纳西传统歌舞）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY1MzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 90
  },
  {
    id: 708,
    "title": "快来罗 纳西热美蹉拔秧调",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY0OTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 98
  },
  {
    id: 709,
    "title": "我们在一起",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY0ODk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 210
  },
  {
    id: 710,
    "title": "哦蒙达",
    "artist": "李秀仙 和民达 和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY0ODY=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NAOOTqJ4CT2vWUKiaErYyQlhZ89GYTflmEbE9UeEmsicliaq5omgYe6ibShPRxaibunyF5XapduNXnH1bsMynxuPV7U21bksRtZEOE/640?wx_fmt=jpeg",
    "duration": 56
  },
  {
    id: 711,
    "title": "古道情歌",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY0NDk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 223
  },
  {
    id: 712,
    "title": "三江天籁-阿乌嚷阿妮梅",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY0NDI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 335
  },
  {
    id: 713,
    "title": "无悔人生—花体若依",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY0MTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 236
  },
  {
    id: 714,
    "title": "打跳",
    "artist": "和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY0MDE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 204
  },
  {
    id: 715,
    "title": "阿哩哩",
    "artist": "阿依金卓",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzOTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 174
  },
  {
    id: 716,
    "title": "白子白女敬酒歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzNzc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 205
  },
  {
    id: 717,
    "title": "傈僳族打跳",
    "artist": "贺顺才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzNzA=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MCfnZicureibRuV3pHZuMSoyDVwaWN5UN3lJIADxv6U7JzfGgMY2BGEpwZKfVLsGGcpNnYZzNOh4QCDEE2IprzibnEdwEbXXmen8/640?wx_fmt=jpeg",
    "duration": 223
  },
  {
    id: 718,
    "title": "纳西姑娘好",
    "artist": "纳西狼组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzNjA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 186
  },
  {
    id: 719,
    "title": "丽江姑娘",
    "artist": "伍腾宇",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzNTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 221
  },
  {
    id: 720,
    "title": "欢乐香巴拉 纳西纵歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzMzk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 472
  },
  {
    id: 721,
    "title": "走进西藏",
    "artist": "扎西尼玛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzMzA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 283
  },
  {
    id: 722,
    "title": "月亮姆",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzMjc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 219
  },
  {
    id: 723,
    "title": "丽江云飞",
    "artist": "靳松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzMjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 275
  },
  {
    id: 724,
    "title": "栽秧调",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzMTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 290
  },
  {
    id: 725,
    "title": "《上午 一封书》白沙细乐",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzMDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 553
  },
  {
    id: 726,
    "title": "理塘赞",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYyNjU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 231
  },
  {
    id: 727,
    "title": "呀哈哩",
    "artist": "墨尚七",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYyNTU=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 229
  },
  {
    id: 728,
    "title": "好玩好耍来打跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYyNDI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 372
  },
  {
    id: 729,
    "title": "傈僳族鬼步葫芦笙舞曲",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYyMzk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 161
  },
  {
    id: 730,
    "title": "阿石才，阿荣 -从月亮走向太阳",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYyMzY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 277
  },
  {
    id: 731,
    "title": "姚熙",
    "artist": "哎呀 妈妈",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYyMjc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 217
  },
  {
    id: 732,
    "title": "鱼水相会",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYyMDM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 155
  },
  {
    id: 733,
    "title": "恋",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYxNzU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 204
  },
  {
    id: 734,
    "title": "密瀑纳西美",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYxNzE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNPMK5n2icXswJgq2U4FljgC3h6Wn3xlJEnHicxE9TWMQMEm4yz5em0T6UA/640?wx_fmt=jpeg",
    "duration": 335
  },
  {
    id: 735,
    "title": "朋友",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYxNjg=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 288
  },
  {
    id: 736,
    "title": "五千年",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYxNTM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 298
  },
  {
    id: 737,
    "title": "热美姿蹉",
    "artist": "和民达",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYxNDc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 295
  },
  {
    id: 738,
    "title": "唱起来 跳起来",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYxNDQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 180
  },
  {
    id: 739,
    "title": "纳西原生态谷气",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYxNDE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 177
  },
  {
    id: 740,
    "title": "纳西酒歌",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYxMzk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 160
  },
  {
    id: 741,
    "title": "下雪那天",
    "artist": "和漾水",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYxMjQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 291
  },
  {
    id: 742,
    "title": "纳西喂么达",
    "artist": "和占强,杨友爱",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYxMjA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 169
  },
  {
    id: 743,
    "title": "纳西喂么达",
    "artist": "金甲劲松,杨友爱",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYxMTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 236
  },
  {
    id: 744,
    "title": "做好人.",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYxMDI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 193
  },
  {
    id: 745,
    "title": "西余索（学)",
    "artist": "和文军,和漾水",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwOTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 163
  },
  {
    id: 746,
    "title": "天蓝蓝dj",
    "artist": "斯密沃然-玛依",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwOTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 245
  },
  {
    id: 747,
    "title": "",
    "artist": "地球村",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwODc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 331
  },
  {
    id: 748,
    "title": "",
    "artist": "纳西姑娘",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwNzQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 194
  },
  {
    id: 749,
    "title": "纳木错神话（旺姆）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwNjk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 263
  },
  {
    id: 750,
    "title": "纳西打跳组曲",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwNjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 314
  },
  {
    id: 751,
    "title": "十女十歌",
    "artist": "纳西民歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwNjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 151
  },
  {
    id: 752,
    "title": "步步娇(曲牌)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwNjA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 390
  },
  {
    id: 753,
    "title": "来世",
    "artist": "纳西",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwMzc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 238
  },
  {
    id: 754,
    "title": "姚熙",
    "artist": "美丽的白云",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwMTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 283
  },
  {
    id: 755,
    "title": "纳西情歌",
    "artist": "和文军 达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwMDA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 168
  },
  {
    id: 756,
    "title": "山朵岗打跳",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5Nzk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNPMK5n2icXswJgq2U4FljgC3h6Wn3xlJEnHicxE9TWMQMEm4yz5em0T6UA/640?wx_fmt=jpeg",
    "duration": 457
  },
  {
    id: 757,
    "title": "嘎美厄美倒背喃（行善积德做)",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5NzA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 186
  },
  {
    id: 758,
    "title": "浪漫民族风",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5Njc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 198
  },
  {
    id: 759,
    "title": "沉默是金",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5NjQ=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 277
  },
  {
    id: 760,
    "title": "一起跳起来―吉米阿哈",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5NTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 231
  },
  {
    id: 761,
    "title": "索玛花开",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5NDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 270
  },
  {
    id: 762,
    "title": "时代颂—和述明",
    "artist": "和述明",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5MzU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 285
  },
  {
    id: 763,
    "title": "远方的客人请你留下来",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5MjI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 261
  },
  {
    id: 764,
    "title": "婚誓",
    "artist": "月亮姆组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5MjA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 150
  },
  {
    id: 765,
    "title": "嫁女调",
    "artist": "灯思克",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5MTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 193
  },
  {
    id: 766,
    "title": "回家 印象丽江主题曲",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5MDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 292
  },
  {
    id: 767,
    "title": "麦乌来其玛",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU4ODU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 349
  },
  {
    id: 768,
    "title": "丽江风暴",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU4NjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 989
  },
  {
    id: 769,
    "title": "纳西打捞利",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU4NjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 263
  },
  {
    id: 770,
    "title": "节日狂想曲",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU4NTE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 268
  },
  {
    id: 771,
    "title": "纳西飞歌",
    "artist": "李艾雯",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU4NDk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 210
  },
  {
    id: 772,
    "title": "的库册尼黑（纳西族歌舞）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU4MzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 277
  },
  {
    id: 773,
    "title": "公特目光阿克吉",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU4Mjk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 339
  },
  {
    id: 774,
    "title": "丽江风暴dj",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU4MDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 970
  },
  {
    id: 775,
    "title": "三思吉",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3OTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 192
  },
  {
    id: 776,
    "title": "纳西小调",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3OTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 78
  },
  {
    id: 777,
    "title": "迎宾酒歌",
    "artist": "阿多组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3OTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 233
  },
  {
    id: 778,
    "title": "纳西哦姆达",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3NzY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 827
  },
  {
    id: 779,
    "title": "纳西原生态民歌《 哦姆达》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3NzM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 353
  },
  {
    id: 780,
    "title": "普米芦笙调",
    "artist": "革囊渡",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3NDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 164
  },
  {
    id: 781,
    "title": "喔热热",
    "artist": "革囊渡",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3NDA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 213
  },
  {
    id: 782,
    "title": "傈僳娃娃组合 -月亮还没升起来",
    "artist": "傈僳娃娃组合",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3MjQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 268
  },
  {
    id: 783,
    "title": "大石桥",
    "artist": "周昀刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3MTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 183
  },
  {
    id: 784,
    "title": "爱在泸沽湖  胡光叁影",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3MTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 283
  },
  {
    id: 785,
    "title": "栽秧调",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3MDE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 267
  },
  {
    id: 786,
    "title": "康定溜溜调",
    "artist": "和兴凤",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2OTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 151
  },
  {
    id: 787,
    "title": "超越葫芦笙dj",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2NjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 650
  },
  {
    id: 788,
    "title": "丽江华坪花傈僳打跳之三门合脚",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2NDU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 217
  },
  {
    id: 789,
    "title": "丽江华坪花傈僳打跳之挖生地",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2MzI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 378
  },
  {
    id: 790,
    "title": "花傈僳打跳之一道竹子一道尖",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2MzE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 382
  },
  {
    id: 791,
    "title": "欢迎到太安来",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2MjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 122
  },
  {
    id: 792,
    "title": "拉伯热美",
    "artist": "纳西民歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2MDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 152
  },
  {
    id: 793,
    "title": "崇德之恋",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU1ODg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 251
  },
  {
    id: 794,
    "title": "我的阿妈",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU1NjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 275
  },
  {
    id: 795,
    "title": "梅里的呼唤",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU1NjA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 301
  },
  {
    id: 796,
    "title": "万物源",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU1NTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 285
  },
  {
    id: 797,
    "title": "玉龙山情歌（时本古庆）",
    "artist": "和冬月",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU1MTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 129
  },
  {
    id: 798,
    "title": "阳光天堂",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU0NDk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 159
  },
  {
    id: 799,
    "title": "傈僳族-舞动三江dj",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU0NDE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 530
  },
  {
    id: 800,
    "title": "心有千千结_贺树兵",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU0MTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 272
  },
  {
    id: 801,
    "title": "同住一座城",
    "artist": "和曙洪、和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUzOTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 232
  },
  {
    id: 802,
    "title": "纳西族歌曲－咱撮鲁啦",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUzODc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 207
  },
  {
    id: 803,
    "title": "美丽的九河",
    "artist": "纳西歌曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUzNzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 248
  },
  {
    id: 804,
    "title": "云上西藏",
    "artist": "齐旦布",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUzNTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 240
  },
  {
    id: 805,
    "title": "蝶儿飞",
    "artist": "张曦尹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUzMTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 202
  },
  {
    id: 806,
    "title": "呀哈哩",
    "artist": "阿七",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUzMDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 229
  },
  {
    id: 807,
    "title": "纳西民歌联唱",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUyODk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 228
  },
  {
    id: 808,
    "title": "纳西打劳丽",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUyODc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 266
  },
  {
    id: 809,
    "title": "相约阔时节dj-阿多组合",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUyNzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 190
  },
  {
    id: 810,
    "title": "幸福啦（斥神）",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUyNDU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 259
  },
  {
    id: 811,
    "title": "民族打跳曲",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUyMzA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 173
  },
  {
    id: 812,
    "title": "西库揍",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUyMDA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 256
  },
  {
    id: 813,
    "title": "哦蒙达",
    "artist": "和民达 和金花 和集虎",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxOTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 56
  },
  {
    id: 814,
    "title": "好兄弟 纳西语",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxOTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 188
  },
  {
    id: 815,
    "title": "纳西火乐锅",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxOTE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 149
  },
  {
    id: 816,
    "title": "摩梭打跳曲",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxODc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 280
  },
  {
    id: 817,
    "title": "走进骷髅墙",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxODI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 296
  },
  {
    id: 818,
    "title": "金沙谣",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxNzY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 212
  },
  {
    id: 819,
    "title": "丽江三十二步",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxNTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 989
  },
  {
    id: 820,
    "title": "山里娃",
    "artist": "李茜姝",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxNTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 129
  },
  {
    id: 821,
    "title": "摩梭打跳曲III",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxNDg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 272
  },
  {
    id: 822,
    "title": "摩梭夜歌",
    "artist": "和军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxMzc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 266
  },
  {
    id: 823,
    "title": "新编犁牛调",
    "artist": "和占强",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxMzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 239
  },
  {
    id: 824,
    "title": "称谢耶稣",
    "artist": "甲姆沽-阿平",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxMDc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 256
  },
  {
    id: 825,
    "title": "甲姆沽-阿平",
    "artist": "打跳组曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxMDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 314
  },
  {
    id: 826,
    "title": "一起跳",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUwOTE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNPMK5n2icXswJgq2U4FljgC3h6Wn3xlJEnHicxE9TWMQMEm4yz5em0T6UA/640?wx_fmt=jpeg",
    "duration": 311
  },
  {
    id: 827,
    "title": "神爱世人",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUwODc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 278
  },
  {
    id: 828,
    "title": "迷局",
    "artist": "金丽婷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUwNzY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 151
  },
  {
    id: 829,
    "title": "受载某套",
    "artist": "李铭九",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUwNjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 226
  },
  {
    id: 830,
    "title": "三朵花",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUwNTg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 246
  },
  {
    id: 831,
    "title": "轮回之恋",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUwNTc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 248
  },
  {
    id: 832,
    "title": "肖汝莲《谷气》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ5Nzk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 90
  },
  {
    id: 833,
    "title": "《云上石头城》片头曲《吉祥》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ5NTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 138
  },
  {
    id: 834,
    "title": "傈僳打跳舞曲傈僳魅音超嗨舞曲",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ5NTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 214
  },
  {
    id: 835,
    "title": "数字歌",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ5MjE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 230
  },
  {
    id: 836,
    "title": "傈僳魅音打跳舞曲AAA",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ5MTQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 234
  },
  {
    id: 837,
    "title": "守候",
    "artist": "涵格佩吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ4NzQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 284
  },
  {
    id: 838,
    "title": "纳西打跳广场舞",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ4NTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 197
  },
  {
    id: 839,
    "title": "青华海等着你",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ4NDc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 220
  },
  {
    id: 840,
    "title": "傈僳打跳曲8",
    "artist": "刚仔",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ4NDE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 238
  },
  {
    id: 841,
    "title": "纳西小情歌",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ4MjI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9yeOUTjeDgTW6J70hO76GsM2KpbJOdFaHXySLttOcFEb17mHGZhE0jv0ljtXVnHJKG1jhZp887oQ/640?wx_fmt=jpeg",
    "duration": 237
  },
  {
    id: 842,
    "title": "丽江花花神",
    "artist": "花花神组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ4MTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 249
  },
  {
    id: 843,
    "title": "腾飞吧，丽江",
    "artist": "张桂华和占强",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ4MTQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 189
  },
  {
    id: 844,
    "title": "回到我身边",
    "artist": "木作为",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3OTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 208
  },
  {
    id: 845,
    "title": "酒曲(纳西语)",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3OTQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 261
  },
  {
    id: 846,
    "title": "葫芦笙串烧丽江DJ纳若咪",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3OTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 315
  },
  {
    id: 847,
    "title": "心上人",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3OTA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 266
  },
  {
    id: 848,
    "title": "傈僳新酒歌",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3ODg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 229
  },
  {
    id: 849,
    "title": "中文唐古拉风暴民族",
    "artist": "DJ",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3ODM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 651
  },
  {
    id: 850,
    "title": "福音",
    "artist": "甲姆沽阿平-爱花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3Nzg=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7PosUiayMfK1cVm25VHR49xkOomdTUyon1f0icqGo8m5ib8GBFn6hp6zJdcCHTnLeGe3mx7E6M5hnqqr5s0s8YnQbuWFxM3luTWek/640?wx_fmt=jpeg",
    "duration": 259
  },
  {
    id: 851,
    "title": "到夏来 (曲牌)",
    "artist": "纳西古乐",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3NzU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 301
  },
  {
    id: 852,
    "title": "天赐我爱",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3NzM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 243
  },
  {
    id: 853,
    "title": "提过啦",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3NzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 146
  },
  {
    id: 854,
    "title": "美酒醉三天",
    "artist": "华坪艺人",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3Njk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 210
  },
  {
    id: 855,
    "title": "心雨",
    "artist": "烧包谷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3NjI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 169
  },
  {
    id: 856,
    "title": "弥渡山歌",
    "artist": "杨坚(土土哥哥)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3NTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 233
  },
  {
    id: 857,
    "title": "泸沽湖打跳纳西歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3NDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 227
  },
  {
    id: 858,
    "title": "Ddee jjiq lei wel we",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2OTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 433
  },
  {
    id: 859,
    "title": "藏语歌",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2OTM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 268
  },
  {
    id: 860,
    "title": "玉龙情歌",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2ODc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 236
  },
  {
    id: 861,
    "title": "民族打跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2ODA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 313
  },
  {
    id: 862,
    "title": "我比太阳更能温暖你的心",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2NzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 203
  },
  {
    id: 863,
    "title": "木天王",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2Njg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 372
  },
  {
    id: 864,
    "title": "大家一起来(舞曲)",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2NjY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 227
  },
  {
    id: 865,
    "title": "大东纳西古歌(热美磋)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2NjE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 154
  },
  {
    id: 866,
    "title": "赶马调_摩梭语版",
    "artist": "和军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2NTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 253
  },
  {
    id: 867,
    "title": "傈僳阿依爬阿依玛嘎起啦",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2NTM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 476
  },
  {
    id: 868,
    "title": "呀哈哩",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2NDY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 229
  },
  {
    id: 869,
    "title": "夕阳下的大石桥",
    "artist": "丽江群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2NDE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 288
  },
  {
    id: 870,
    "title": "玉龙山上开红花",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2MzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 92
  },
  {
    id: 871,
    "title": "童声合唱队合唱-野蜂飞舞",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2MjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 78
  },
  {
    id: 872,
    "title": "纳西族酒歌",
    "artist": "纳金坤",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2MjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 227
  },
  {
    id: 873,
    "title": "纳西快板+纳西迎宾曲",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2MjI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 199
  },
  {
    id: 874,
    "title": "你在哪里",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2MTM=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 251
  },
  {
    id: 875,
    "title": "纳西传统乐舞《窝热热》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1OTQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 90
  },
  {
    id: 876,
    "title": "哦噜唠，敖噜唠",
    "artist": "纳西歌曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1OTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 336
  },
  {
    id: 877,
    "title": "伤心酒歌",
    "artist": "阿石才",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1ODM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV860SjRBZewkt9Ytwq2W5rLjoZliaRwEQIgyre4ibNiaf4wXnCd4iaWUPb9qzylqPqoY8uBWwL9Ux6W0A/640?wx_fmt=jpeg",
    "duration": 341
  },
  {
    id: 878,
    "title": "丽江打跳 彝族打跳舞",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1Nzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 232
  },
  {
    id: 879,
    "title": "阿石才欢快舞曲 = 子啦来",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1NzQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 260
  },
  {
    id: 880,
    "title": "彝族健身操",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1NzA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 232
  },
  {
    id: 881,
    "title": "白族酒歌",
    "artist": "李宝妹 张贵元",
    "album": "白族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1NjI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 232
  },
  {
    id: 882,
    "title": "白族酒歌",
    "artist": "白族歌曲",
    "album": "白族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1NTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 231
  },
  {
    id: 883,
    "title": "北方高原",
    "artist": "齐旦布",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1NTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 243
  },
  {
    id: 884,
    "title": "华坪花傈僳打跳",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1NDc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 258
  },
  {
    id: 885,
    "title": "看两眼来对一脚",
    "artist": "丽江打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1NDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 216
  },
  {
    id: 886,
    "title": "依呀妹",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1MjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 242
  },
  {
    id: 887,
    "title": "阿拉鼓吉",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1MjE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 285
  },
  {
    id: 888,
    "title": "敬老新歌",
    "artist": "纳西族",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1MTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 235
  },
  {
    id: 889,
    "title": "旧货",
    "artist": "和青峰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ0OTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 257
  },
  {
    id: 890,
    "title": "相守今生-和丽刚&amp;和趼研",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ0OTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 332
  },
  {
    id: 891,
    "title": "云中丽江",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ0ODg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 228
  },
  {
    id: 892,
    "title": "丽江的四天",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ0Nzg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 211
  },
  {
    id: 893,
    "title": "纳西姑娘",
    "artist": "涵格佩吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ0NzY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 280
  },
  {
    id: 894,
    "title": "云南三部曲",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ0NTk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 280
  },
  {
    id: 895,
    "title": "乡遇",
    "artist": "和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ0NTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 198
  },
  {
    id: 896,
    "title": "丽江的夜",
    "artist": "和军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ0NTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 299
  },
  {
    id: 897,
    "title": "爱跳舞的小姑娘",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ0NDk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 250
  },
  {
    id: 898,
    "title": "笛子独奏 奚绍善",
    "artist": "丽江群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ0Mzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 250
  },
  {
    id: 899,
    "title": "九河打跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQzOTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 274
  },
  {
    id: 900,
    "title": "枯萎",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQzOTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 263
  },
  {
    id: 901,
    "title": "生肖谣",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQzODk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 163
  },
  {
    id: 902,
    "title": "丽江",
    "artist": "不可撤销乐队",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQzNjU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 370
  },
  {
    id: 903,
    "title": "找朋友",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQzNTM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 207
  },
  {
    id: 904,
    "title": "靠近梦想",
    "artist": "金甲劲松 柯燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQzNTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 249
  },
  {
    id: 905,
    "title": "《慢五言》洞经音乐",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQzNTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 315
  },
  {
    id: 906,
    "title": "情醉阿哩哩",
    "artist": "刘青青",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQzMzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 201
  },
  {
    id: 907,
    "title": "慈祥的母亲",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQzMTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 255
  },
  {
    id: 908,
    "title": "纳西阿妈",
    "artist": "沙马果果",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyOTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 280
  },
  {
    id: 909,
    "title": "玉龙雪山的故事",
    "artist": "和上钧阿诛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyOTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 350
  },
  {
    id: 910,
    "title": "远山",
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyODk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 215
  },
  {
    id: 911,
    "title": "傈僳欢乐歌",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyNDc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 190
  },
  {
    id: 912,
    "title": "丽江傈僳 让我们一起干酒醉",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyMzU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 203
  },
  {
    id: 913,
    "title": "傈僳敬酒歌",
    "artist": "彝族歌手-阿果",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyMzM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 200
  },
  {
    id: 914,
    "title": "阿一旦",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyMzE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 192
  },
  {
    id: 915,
    "title": "阿一旦，阿一旦",
    "artist": "李茜姝",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyMjk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 184
  },
  {
    id: 916,
    "title": "云南丽江傈僳歌曲 酒杯.女人",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyMjU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 252
  },
  {
    id: 917,
    "title": "纳西打跳“蹉噜了”",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyMTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 205
  },
  {
    id: 918,
    "title": "丽江纳西特色《三部曲》打拉丽",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyMDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1022
  },
  {
    id: 919,
    "title": "月亮快出来",
    "artist": "和万莲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyMDI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 211
  },
  {
    id: 920,
    "title": "牵着你的手",
    "artist": "纳若",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQxNzQ=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 277
  },
  {
    id: 921,
    "title": "阿妈的酥油茶",
    "artist": "木作为",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQxNjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 300
  },
  {
    id: 922,
    "title": "我们齐欢笑",
    "artist": "摩梭大调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQxMzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 217
  },
  {
    id: 923,
    "title": "茶马古道",
    "artist": "电视剧",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQxMzA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 186
  },
  {
    id: 924,
    "title": "丽江真美丽《打跳丽江》打拉丽",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQxMTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 967
  },
  {
    id: 925,
    "title": "打谷调",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQxMDg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 196
  },
  {
    id: 926,
    "title": "娃娃的天空",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQxMDI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 169
  },
  {
    id: 927,
    "title": "十八怪_丽江腔",
    "artist": "土土哥哥",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQwOTQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 194
  },
  {
    id: 928,
    "title": "乐土·家园",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQwODE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 297
  },
  {
    id: 929,
    "title": "摩梭小夜曲",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQwNzM=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 280
  },
  {
    id: 930,
    "title": "丽江小镇",
    "artist": "黄颖星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQwNjk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 260
  },
  {
    id: 931,
    "title": "小巴郎，童年的太阳",
    "artist": "李茜姝",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQwNTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 120
  },
  {
    id: 932,
    "title": "你丽江了吗",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQwNTE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 243
  },
  {
    id: 933,
    "title": "回到拉市海",
    "artist": "涵格佩吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQwMzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 266
  },
  {
    id: 934,
    "title": "我的丽江",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQwMjg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 239
  },
  {
    id: 935,
    "title": "难道",
    "artist": "和军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQwMTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 268
  },
  {
    id: 936,
    "title": "雪地阳光",
    "artist": "蜂凌、蜂跃宏",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQwMDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 222
  },
  {
    id: 937,
    "title": "阿表也劲爆 丽江DJ",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5OTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 463
  },
  {
    id: 938,
    "title": "云南丽江密普纳西美 打跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5OTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 352
  },
  {
    id: 939,
    "title": "丽江真美好 纳西",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5OTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 441
  },
  {
    id: 940,
    "title": "油茶罐装不下的梦想",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5Njc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 236
  },
  {
    id: 941,
    "title": "孤独的人",
    "artist": "和军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5NjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 256
  },
  {
    id: 942,
    "title": "纳西祝酒歌",
    "artist": "和文光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5NDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 163
  },
  {
    id: 943,
    "title": "数数调",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5NDM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 190
  },
  {
    id: 944,
    "title": "腾飞的比如",
    "artist": "根呷 阿佳组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5Mzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 250
  },
  {
    id: 945,
    "title": "《月亮姆》纳西族童谣",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5Mjk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 104
  },
  {
    id: 946,
    "title": "打的调",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5MjY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 169
  },
  {
    id: 947,
    "title": "神奇的玉龙山",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5MTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 150
  },
  {
    id: 948,
    "title": "点唇",
    "artist": "丽江群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5MDE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 259
  },
  {
    id: 949,
    "title": "纳西酒歌",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4ODE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 222
  },
  {
    id: 950,
    "title": "我是玉龙山的牧童",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4NzA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 208
  },
  {
    id: 951,
    "title": "纳西飞歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4Njg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 213
  },
  {
    id: 952,
    "title": "时授 葬歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4Njc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 87
  },
  {
    id: 953,
    "title": "我的灰姑娘",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4NjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 201
  },
  {
    id: 954,
    "title": "调弦曲",
    "artist": "纳西古乐",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4NDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 76
  },
  {
    id: 955,
    "title": "我的束河我的爱",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4NDA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 166
  },
  {
    id: 956,
    "title": "笃(丽江白沙细乐之一)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4Mzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 213
  },
  {
    id: 957,
    "title": "净土（纳西语版）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4MzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 234
  },
  {
    id: 958,
    "title": "纳西恋歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4MTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 232
  },
  {
    id: 959,
    "title": "纳西乐 纳若咪 纳西",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4MDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 138
  },
  {
    id: 960,
    "title": "葫芦笙 背靠背",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4MDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 343
  },
  {
    id: 961,
    "title": "纳西酒歌 劝世歌 情歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4MDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 392
  },
  {
    id: 962,
    "title": "傈僳民歌五连唱",
    "artist": "三江组合",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3NzE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 332
  },
  {
    id: 963,
    "title": "对歌调、玉龙山下的纳西娃",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3NzA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1430
  },
  {
    id: 964,
    "title": "丽江黎明打跳 ★欢乐调 丽江DJ",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3Njk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 162
  },
  {
    id: 965,
    "title": "丽江黎明打跳 ★提个老 丽江DJ",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3NTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 267
  },
  {
    id: 966,
    "title": "纳西 吉呐尼助助（鱼水相会）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3NTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 161
  },
  {
    id: 967,
    "title": "摩梭谣丽江DJ纳若咪",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3NTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 209
  },
  {
    id: 968,
    "title": "丽江傈僳打跳",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3MjE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 357
  },
  {
    id: 969,
    "title": "玉龙第三国",
    "artist": "车文光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3MTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 223
  },
  {
    id: 970,
    "title": "南高寨打跳",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3MTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNPMK5n2icXswJgq2U4FljgC3h6Wn3xlJEnHicxE9TWMQMEm4yz5em0T6UA/640?wx_fmt=jpeg",
    "duration": 420
  },
  {
    id: 971,
    "title": "幸福生活好",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2ODg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 136
  },
  {
    id: 972,
    "title": "傈僳打跳调（葫芦）",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2ODI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 432
  },
  {
    id: 973,
    "title": "拥抱丽江",
    "artist": "徐洋",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2Nzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 247
  },
  {
    id: 974,
    "title": "纳西快板：中国梦",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2NzY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 251
  },
  {
    id: 975,
    "title": "傈僳新版打跳胡芦笙dj",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2Njk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 242
  },
  {
    id: 976,
    "title": "丽江神曲",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2NjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 240
  },
  {
    id: 977,
    "title": "纳西族音乐史 情歌《南兴调》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2NjE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 94
  },
  {
    id: 978,
    "title": "傈僳舞蹈-阔时拉",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2NTg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 314
  },
  {
    id: 979,
    "title": "傈僳舞蹈_四方朋友来打跳",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2MzQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 282
  },
  {
    id: 980,
    "title": "纳西田野之声 哦热热",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2MzA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 226
  },
  {
    id: 981,
    "title": "百花开来打跳",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2MTM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNPMK5n2icXswJgq2U4FljgC3h6Wn3xlJEnHicxE9TWMQMEm4yz5em0T6UA/640?wx_fmt=jpeg",
    "duration": 253
  },
  {
    id: 982,
    "title": "魅力丽江",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1OTQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 252
  },
  {
    id: 983,
    "title": "新民乐_纳西古乐(纯音乐)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1OTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 231
  },
  {
    id: 984,
    "title": "格萨拉—纳西平跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1OTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 265
  },
  {
    id: 985,
    "title": "我俩永远在一起 阿石才",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1Nzc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 230
  },
  {
    id: 986,
    "title": "阿勒邱",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1NjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 214
  },
  {
    id: 987,
    "title": "梨花又开放",
    "artist": "和兴凤",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1NTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 194
  },
  {
    id: 988,
    "title": "纳若 -不怕",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1NDc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 281
  },
  {
    id: 989,
    "title": "丽江滴答",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1NDI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 238
  },
  {
    id: 990,
    "title": "忘不了的阿哥",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1MjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 232
  },
  {
    id: 991,
    "title": "祖先的声音",
    "artist": "山人行组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1MTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 260
  },
  {
    id: 992,
    "title": "幸福万年长",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1MTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 200
  },
  {
    id: 993,
    "title": "",
    "artist": "吉祥的日子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM0ODM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 90
  },
  {
    id: 994,
    "title": "东巴唱腔《冲把颂》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM0ODI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 93
  },
  {
    id: 995,
    "title": "阿里里 细针挑丝线",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM0Nzk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 147
  },
  {
    id: 996,
    "title": "纳西人",
    "artist": "山人行组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM0NjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 252
  },
  {
    id: 997,
    "title": "天边边",
    "artist": "李茜姝",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM0NjI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 171
  },
  {
    id: 998,
    "title": "天蓝蓝",
    "artist": "傈僳娃娃组合",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM0MzE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 193
  },
  {
    id: 999,
    "title": "云鹤吟",
    "artist": "和美兰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM0MTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 245
  },
  {
    id: 1000,
    "title": "犁牛调",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM0MTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 184
  },
  {
    id: 1001,
    "title": "",
    "artist": "回到彝乡",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMzOTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 284
  },
  {
    id: 1002,
    "title": "劝世歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMzNzk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 132
  },
  {
    id: 1003,
    "title": "抓小偷",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMzNzY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 256
  },
  {
    id: 1004,
    "title": "你是我的丽江",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMzNTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 298
  },
  {
    id: 1005,
    "title": "三思吉",
    "artist": "和晓霞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMzNDY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 184
  },
  {
    id: 1006,
    "title": "想起家乡",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMzMjU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 286
  },
  {
    id: 1007,
    "title": "纳西古乐",
    "artist": "浪淘沙(曲牌)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMyOTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 291
  },
  {
    id: 1008,
    "title": "情歌对唱",
    "artist": "和金花 李瑞山",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMyODY=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NAOOTqJ4CT2vWUKiaErYyQlhZ89GYTflmEbE9UeEmsicliaq5omgYe6ibShPRxaibunyF5XapduNXnH1bsMynxuPV7U21bksRtZEOE/640?wx_fmt=jpeg",
    "duration": 182
  },
  {
    id: 1009,
    "title": "相守今生",
    "artist": "和丽刚&amp;和趼研",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMyNjc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 332
  },
  {
    id: 1010,
    "title": "丽江老家",
    "artist": "刘青青",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMyNjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 168
  },
  {
    id: 1011,
    "title": "丽江纳西歌手",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMyNjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 88
  },
  {
    id: 1012,
    "title": "来搓哟，来夸哟",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMyNjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 138
  },
  {
    id: 1013,
    "title": "傈僳酒歌",
    "artist": "和燕",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMyNDg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 286
  },
  {
    id: 1014,
    "title": "三月百花开",
    "artist": "林天然",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMyNDA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 211
  },
  {
    id: 1015,
    "title": "喔噜啦",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMyMzY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNPMK5n2icXswJgq2U4FljgC3h6Wn3xlJEnHicxE9TWMQMEm4yz5em0T6UA/640?wx_fmt=jpeg",
    "duration": 379
  },
  {
    id: 1016,
    "title": "刘青青 -纳西打跳“蹉噜了”",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMxOTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 205
  },
  {
    id: 1017,
    "title": "呀撒赛(云南白族舞曲)",
    "artist": "",
    "album": "白族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMxODM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 311
  },
  {
    id: 1018,
    "title": "净地",
    "artist": "黄颖星.和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMxODA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 206
  },
  {
    id: 1019,
    "title": "心想唱就唱",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMxNTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 275
  },
  {
    id: 1020,
    "title": "欢乐的阿里里",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMxNTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 142
  },
  {
    id: 1021,
    "title": "犁牛调",
    "artist": "和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMxNDc=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NAOOTqJ4CT2vWUKiaErYyQlhZ89GYTflmEbE9UeEmsicliaq5omgYe6ibShPRxaibunyF5XapduNXnH1bsMynxuPV7U21bksRtZEOE/640?wx_fmt=jpeg",
    "duration": 115
  },
  {
    id: 1022,
    "title": "拉伯热美：六项禁令要记牢",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMxNDE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 244
  },
  {
    id: 1023,
    "title": "舞动三江",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMxMTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 258
  },
  {
    id: 1024,
    "title": "欢乐酒歌",
    "artist": "和漾水",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMxMDg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 201
  },
  {
    id: 1025,
    "title": "爱上女儿国",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMxMDI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 286
  },
  {
    id: 1026,
    "title": "请喝一杯祝福的酒",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwOTk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 182
  },
  {
    id: 1027,
    "title": "泸沽湖我向往的地方",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwOTQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 187
  },
  {
    id: 1028,
    "title": "康定情人",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwOTM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 333
  },
  {
    id: 1029,
    "title": "独龙好",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwNzg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 273
  },
  {
    id: 1030,
    "title": "吟酒歌",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwNzU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 280
  },
  {
    id: 1031,
    "title": "放牛娃娃调",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwNjk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 231
  },
  {
    id: 1032,
    "title": "澜沧江水深爱的地方",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwMzk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 236
  },
  {
    id: 1033,
    "title": "纳西魂(波伯、巴乌、小闷笛)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwMzc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 292
  },
  {
    id: 1034,
    "title": "醉了丽江",
    "artist": "达坡玛吉、土土",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwMzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 186
  },
  {
    id: 1035,
    "title": "阿丽丽金拍",
    "artist": "和金花达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwMjk=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NAOOTqJ4CT2vWUKiaErYyQlhZ89GYTflmEbE9UeEmsicliaq5omgYe6ibShPRxaibunyF5XapduNXnH1bsMynxuPV7U21bksRtZEOE/640?wx_fmt=jpeg",
    "duration": 239
  },
  {
    id: 1036,
    "title": "小河淌水",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwMjE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 202
  },
  {
    id: 1037,
    "title": "两朵云(纳西语+汉语)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwMTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 252
  },
  {
    id: 1038,
    "title": "成都(古城丽江版)",
    "artist": "赵雷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwMDk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 258
  },
  {
    id: 1039,
    "title": "向阳花+石头在歌唱",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwMDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 237
  },
  {
    id: 1040,
    "title": "朋友来了——喝酒",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwMDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 86
  },
  {
    id: 1041,
    "title": "十女十歌",
    "artist": "印象丽江，雪山篇",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwMDA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 151
  },
  {
    id: 1042,
    "title": "十供养(唱经)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5Nzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 551
  },
  {
    id: 1043,
    "title": "纳西阿勒瓦器",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5Njg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 326
  },
  {
    id: 1044,
    "title": "多彩民族之纳西族",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5NjU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1205
  },
  {
    id: 1045,
    "title": "不要怕",
    "artist": "阿鲁阿卓 、山风组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5NjI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 294
  },
  {
    id: 1046,
    "title": "纳西娃娃合唱团—嘿美啵",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5NDY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 191
  },
  {
    id: 1047,
    "title": "传奇",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5Mzk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 187
  },
  {
    id: 1048,
    "title": "纳西语版《真的爱你》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5Mzc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 166
  },
  {
    id: 1049,
    "title": "剑川白族调 心肝票",
    "artist": "",
    "album": "白族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5MTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 308
  },
  {
    id: 1050,
    "title": "好梦在丽江",
    "artist": "向丽",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5MTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 273
  },
  {
    id: 1051,
    "title": "请到纳西村寨来",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5MTE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 156
  },
  {
    id: 1052,
    "title": "达坡阿玻",
    "artist": "我的好姑娘",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5MDg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 217
  },
  {
    id: 1053,
    "title": "感恩丽江原唱",
    "artist": "李茜姝",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4ODY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 272
  },
  {
    id: 1054,
    "title": "丽江恰恰恰",
    "artist": "土土哥哥",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4ODM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 203
  },
  {
    id: 1055,
    "title": "丽江恰恰恰",
    "artist": "土土哥哥)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4ODI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 203
  },
  {
    id: 1056,
    "title": "嘎洒洒",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4ODA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 273
  },
  {
    id: 1057,
    "title": "喂默达",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4Nzc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 391
  },
  {
    id: 1058,
    "title": "齐旦布达娃卓玛-梅里爱的见证",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4NjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 261
  },
  {
    id: 1059,
    "title": "欢乐纳西人",
    "artist": "和春秀",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4NTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 250
  },
  {
    id: 1060,
    "title": "玉龙雪山的一米阳光(长音频)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4MjE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1049
  },
  {
    id: 1061,
    "title": "大山汉子傈僳族民歌",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4MjA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 269
  },
  {
    id: 1062,
    "title": "玉龙雪山 欢乐的金沙江纳西族",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4MTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 161
  },
  {
    id: 1063,
    "title": "阿哩哩格吉拍美丽的白云",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4MTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 335
  },
  {
    id: 1064,
    "title": "呀哩哩",
    "artist": "和议财(纳西族)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4MTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 188
  },
  {
    id: 1065,
    "title": "玉龙雪山传说(纳西族)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4MTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 340
  },
  {
    id: 1066,
    "title": "纳西民歌《沃孟达·新婚调》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4MDA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1340
  },
  {
    id: 1067,
    "title": "过年好DJ",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI3OTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 236
  },
  {
    id: 1068,
    "title": "张曦尹《星光闪烁》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI3NjE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 324
  },
  {
    id: 1069,
    "title": "张曦尹《山那边的放猪娃》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI3NTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 232
  },
  {
    id: 1070,
    "title": "美丽的白云--纳西族歌手姚熙",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI3MTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 283
  },
  {
    id: 1071,
    "title": "纳西音乐 张曦尹-故乡 丽江",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI3MDk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 233
  },
  {
    id: 1072,
    "title": "大石桥之恋--纳西族歌手姚熙",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI3MDc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 215
  },
  {
    id: 1073,
    "title": "张曦尹《蝶儿飞》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI3MDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 202
  },
  {
    id: 1074,
    "title": "纳西民族舞",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2ODA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 304
  },
  {
    id: 1075,
    "title": "向阳花合唱团 朋友",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2NzU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 188
  },
  {
    id: 1076,
    "title": "和丽元 杨永爱 -纳西喂么哒",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2NzM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 460
  },
  {
    id: 1077,
    "title": "纳西族歌手姚熙",
    "artist": "纳西西于花花神",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2NjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 223
  },
  {
    id: 1078,
    "title": "纳西族歌手姚熙－咱撮鲁啦",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2NjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 207
  },
  {
    id: 1079,
    "title": "丽江纳西族歌手",
    "artist": "篝火之夜",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2NTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 202
  },
  {
    id: 1080,
    "title": "无标题",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2NDk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 207
  },
  {
    id: 1081,
    "title": "我的家",
    "artist": "纳西音乐 张曦尹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2NDg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 243
  },
  {
    id: 1082,
    "title": "卓玛",
    "artist": "亚东",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2MzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 296
  },
  {
    id: 1083,
    "title": "小毛调-葫芦笙",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2MzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 251
  },
  {
    id: 1084,
    "title": "纳西三部曲dj",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2Mjk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 359
  },
  {
    id: 1085,
    "title": "阿里里献给毛主席",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2MTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 184
  },
  {
    id: 1086,
    "title": "心的港湾",
    "artist": "和漾水",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2MTY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 214
  },
  {
    id: 1087,
    "title": "丽江华坪花傈僳打跳之傈僳阔时",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2MDM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 314
  },
  {
    id: 1088,
    "title": "玉龙恋歌",
    "artist": "李承翰&amp;和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1OTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 393
  },
  {
    id: 1089,
    "title": "捞松毛",
    "artist": "丽江民族打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1OTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 338
  },
  {
    id: 1090,
    "title": "古城的夜",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1OTY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 217
  },
  {
    id: 1091,
    "title": "古西塘 俏水乡",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1ODQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 209
  },
  {
    id: 1092,
    "title": "秋天的祝福",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1ODA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 212
  },
  {
    id: 1093,
    "title": "茶马情",
    "artist": "拉伯阿新",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1NzY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7MmW6tPL8k6ibiaFEyCPy3NNruXHAQuPleFfZHWncuDKuHkYmvhGibcH5J4muDchkl6PJypRcVwEawzQy18sqNKFJF5aibncogKljY/640?wx_fmt=jpeg",
    "duration": 256
  },
  {
    id: 1094,
    "title": "纳西古乐 情漫金沙江",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1Njg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 240
  },
  {
    id: 1095,
    "title": "浪漫丽江",
    "artist": "拉伯阿新",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1Njc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7MmW6tPL8k6ibiaFEyCPy3NNruXHAQuPleFfZHWncuDKuHkYmvhGibcH5J4muDchkl6PJypRcVwEawzQy18sqNKFJF5aibncogKljY/640?wx_fmt=jpeg",
    "duration": 239
  },
  {
    id: 1096,
    "title": "阿尺瓦器",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1NTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 194
  },
  {
    id: 1097,
    "title": "",
    "artist": "相遇",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1NTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 273
  },
  {
    id: 1098,
    "title": "跳舞姑娘",
    "artist": "阿木宇梅",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1NDE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 219
  },
  {
    id: 1099,
    "title": "春",
    "artist": "阿木宇梅",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1MjI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 254
  },
  {
    id: 1100,
    "title": "点神灯（东巴祭司和玉才唱腔）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1MDk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 138
  },
  {
    id: 1101,
    "title": "鲁般鲁饶（和开祥）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1MDg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 134
  },
  {
    id: 1102,
    "title": "拉伯谷气",
    "artist": "拉伯阿新",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1MDU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7MmW6tPL8k6ibiaFEyCPy3NNruXHAQuPleFfZHWncuDKuHkYmvhGibcH5J4muDchkl6PJypRcVwEawzQy18sqNKFJF5aibncogKljY/640?wx_fmt=jpeg",
    "duration": 212
  },
  {
    id: 1103,
    "title": "拉古拉古",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1MDQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 117
  },
  {
    id: 1104,
    "title": "阿佤新歌",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1MDM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 91
  },
  {
    id: 1105,
    "title": "石鼓谣",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1MDE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 245
  },
  {
    id: 1106,
    "title": "欢乐酒歌",
    "artist": "和漾水",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0OTQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 201
  },
  {
    id: 1107,
    "title": "四方街之夜",
    "artist": "和漩",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0ODc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 50
  },
  {
    id: 1108,
    "title": "依古纳西",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0ODY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 189
  },
  {
    id: 1109,
    "title": "纳西热美磋",
    "artist": "纳西群舞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0Nzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 282
  },
  {
    id: 1110,
    "title": "石头城",
    "artist": "拉伯阿新",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0NTY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7MmW6tPL8k6ibiaFEyCPy3NNruXHAQuPleFfZHWncuDKuHkYmvhGibcH5J4muDchkl6PJypRcVwEawzQy18sqNKFJF5aibncogKljY/640?wx_fmt=jpeg",
    "duration": 182
  },
  {
    id: 1111,
    "title": "蝴蝶小鱼",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0NTQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 143
  },
  {
    id: 1112,
    "title": "山神恋",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0NTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 221
  },
  {
    id: 1113,
    "title": "归来",
    "artist": "齐旦布",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0MzA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 311
  },
  {
    id: 1114,
    "title": "不痛",
    "artist": "吉萨莎玛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0Mjg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 240
  },
  {
    id: 1115,
    "title": "净地",
    "artist": "吉萨莎玛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0MjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 135
  },
  {
    id: 1116,
    "title": "怀念",
    "artist": "吉萨莎玛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0MjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 223
  },
  {
    id: 1117,
    "title": "猜猜谣",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0MTQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 182
  },
  {
    id: 1118,
    "title": "阿里里",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0MDg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 738
  },
  {
    id: 1119,
    "title": "与白鹤共舞",
    "artist": "德金卓玛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzOTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 237
  },
  {
    id: 1120,
    "title": "召唤",
    "artist": "和仕军 杨志勇",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzOTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 149
  },
  {
    id: 1121,
    "title": "说散就散",
    "artist": "和晓霞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzODA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 161
  },
  {
    id: 1122,
    "title": "时间煮雨",
    "artist": "和晓霞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzNzY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 248
  },
  {
    id: 1123,
    "title": "七彩飞扬",
    "artist": "张慧珺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzNzA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 245
  },
  {
    id: 1124,
    "title": "歪脖子树下",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzNjk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 229
  },
  {
    id: 1125,
    "title": "美域巴拉格宗",
    "artist": "央金次卓",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzNTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 275
  },
  {
    id: 1126,
    "title": "嘿美孜卜（月光下）纳西原生态",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzNTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 536
  },
  {
    id: 1127,
    "title": "心中的雪山",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzNTU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 285
  },
  {
    id: 1128,
    "title": "许媛",
    "artist": "玛吉谁不夸",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzNDI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 218
  },
  {
    id: 1129,
    "title": "甜蜜蜜",
    "artist": "达坡玛吉、和文光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzMzc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 222
  },
  {
    id: 1130,
    "title": "拉乌绿韵",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzMzY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 387
  },
  {
    id: 1131,
    "title": "纳西语(梦中的香格里拉)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzMzU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 138
  },
  {
    id: 1132,
    "title": "纳西语Naq sso mil",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzMzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 183
  },
  {
    id: 1133,
    "title": "",
    "artist": "唱给太阳的歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzMjA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 270
  },
  {
    id: 1134,
    "title": "我是纳西的后代",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzMDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 334
  },
  {
    id: 1135,
    "title": "夏夜篝火(纳西族)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzMDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 253
  },
  {
    id: 1136,
    "title": "不丹 格桑啦",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIyODg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 252
  },
  {
    id: 1137,
    "title": "《阿叔杨七三》",
    "artist": "啊嚒嘀喂",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIyODc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 85
  },
  {
    id: 1138,
    "title": "雨露滋润依古堆（喂么达）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIyNzU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 242
  },
  {
    id: 1139,
    "title": "丽江原生态打歌.大蛮调",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIyNjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 627
  },
  {
    id: 1140,
    "title": "一起来打跳",
    "artist": "普米族原生态",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIyNjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 440
  },
  {
    id: 1141,
    "title": "和兴凤",
    "artist": "说散就散",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIyNDY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 116
  },
  {
    id: 1142,
    "title": "",
    "artist": "达哇纳西努",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIyMzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 144
  },
  {
    id: 1143,
    "title": "解脱",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIyMjQ=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 187
  },
  {
    id: 1144,
    "title": "新的天地",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIyMTc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 296
  },
  {
    id: 1145,
    "title": "荷花香",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIyMDM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 289
  },
  {
    id: 1146,
    "title": "陈四才-《幸福醉歌》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIyMDI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 215
  },
  {
    id: 1147,
    "title": "回归",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxNzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 255
  },
  {
    id: 1148,
    "title": "爱无悔",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxNzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 262
  },
  {
    id: 1149,
    "title": "星空谣",
    "artist": "达瓦央珍 陈华龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxNzA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 158
  },
  {
    id: 1150,
    "title": "你不知道的事",
    "artist": "和兴凤",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxNTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 182
  },
  {
    id: 1151,
    "title": "婚誓",
    "artist": "和兴凤、塔斯肯",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxNTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 175
  },
  {
    id: 1152,
    "title": "《不要怕》和兴凤",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxNTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 81
  },
  {
    id: 1153,
    "title": "香巴拉佛塔",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxNDA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 268
  },
  {
    id: 1154,
    "title": "纳西仁美蹉",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxMjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 239
  },
  {
    id: 1155,
    "title": "阿卡巴拉",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxMjI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 185
  },
  {
    id: 1156,
    "title": "哦蒙达",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxMjA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 56
  },
  {
    id: 1157,
    "title": "沙玛学锋-花腰姑娘",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxMTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 267
  },
  {
    id: 1158,
    "title": "花楼恋歌",
    "artist": "女儿国组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxMDA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 243
  },
  {
    id: 1159,
    "title": "走婚夜歌（阿注喂）",
    "artist": "女儿国组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIwOTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 242
  },
  {
    id: 1160,
    "title": "心灵的坐标",
    "artist": "习振东",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIwNjc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 92
  },
  {
    id: 1161,
    "title": "玉龙情歌",
    "artist": "和春秀",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIwNTQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 252
  },
  {
    id: 1162,
    "title": "怒江情歌 纳若咪",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIwNDk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 324
  },
  {
    id: 1163,
    "title": "丽江华坪花傈僳打跳之闯箩篼",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIwMzk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 324
  },
  {
    id: 1164,
    "title": "丽江风暴1dj",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIwMzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 970
  },
  {
    id: 1165,
    "title": "祝婚歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIwMzA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 147
  },
  {
    id: 1166,
    "title": "大山走出的孩子",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIwMTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 287
  },
  {
    id: 1167,
    "title": "纳西情歌（纳西语版）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIwMTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 234
  },
  {
    id: 1168,
    "title": "唐古拉风暴金雪莲风暴精选",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE5OTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 861
  },
  {
    id: 1169,
    "title": "样怪样嘻",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE5OTU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 296
  },
  {
    id: 1170,
    "title": "唐古拉风暴 (DJ版)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE5ODQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 482
  },
  {
    id: 1171,
    "title": "星愿亮晶晶",
    "artist": "张慧珺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE5Njg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 219
  },
  {
    id: 1172,
    "title": "月亮快出来",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE5NjU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 217
  },
  {
    id: 1173,
    "title": "玉龙雪山",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE5NjE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 265
  },
  {
    id: 1174,
    "title": "拉市海我的爱人",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE5NTE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 288
  },
  {
    id: 1175,
    "title": "玉龙梦",
    "artist": "纳西民歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE5NDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 84
  },
  {
    id: 1176,
    "title": "归来吧",
    "artist": "涵格佩吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE5MzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 256
  },
  {
    id: 1177,
    "title": "纳西啦嘿歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE5MjA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 197
  },
  {
    id: 1178,
    "title": "纳西族民歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4OTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 185
  },
  {
    id: 1179,
    "title": "天边的浪漫",
    "artist": "央金兰泽",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4OTQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 229
  },
  {
    id: 1180,
    "title": "纳西西余花花色",
    "artist": "涵格佩吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4ODg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 249
  },
  {
    id: 1181,
    "title": "四季歌",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4Nzc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNP9eicZWHqJZA1pqvFqzgCctIpTOEZn6k8Ykiaiaev8aDHwMAzWRhJ1pkBQ/640?wx_fmt=jpeg",
    "duration": 190
  },
  {
    id: 1182,
    "title": "亚拉咧",
    "artist": "三坝七步",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4Njg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 129
  },
  {
    id: 1183,
    "title": "想是想玩呢,就是害羞羞",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4NjE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 184
  },
  {
    id: 1184,
    "title": "打跳歌",
    "artist": "丽江组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4NTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1472
  },
  {
    id: 1185,
    "title": "大家一起来",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4NDg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 228
  },
  {
    id: 1186,
    "title": "雪域桃抱松",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4NDU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 216
  },
  {
    id: 1187,
    "title": "超越dj",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4NDI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 390
  },
  {
    id: 1188,
    "title": "赶街跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4NDE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 283
  },
  {
    id: 1189,
    "title": "美丽姑娘",
    "artist": "达坡阿玻",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4Mjk=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MwejD9yic8kz4a72gprFrspuRFaVgR367KE1jZ5sAH1IQe4z4fenVTibGme8UMHeoCujic4VqVl0hbySnD2ia8WTVjPic7MReemic0M/640?wx_fmt=jpeg",
    "duration": 221
  },
  {
    id: 1190,
    "title": "绿色出行歌",
    "artist": "涵蜜金组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4MjU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 208
  },
  {
    id: 1191,
    "title": "维西纳西古歌(打谷调)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4MTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 240
  },
  {
    id: 1192,
    "title": "丽江纳西古乐(阿丽丽金排)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4MDc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 211
  },
  {
    id: 1193,
    "title": "丽江纳西古歌(娥姆达)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4MDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 249
  },
  {
    id: 1194,
    "title": "故乡丽江",
    "artist": "张慧珺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4MDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 235
  },
  {
    id: 1195,
    "title": "魅力丽江 男声独唱",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4MDM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 252
  },
  {
    id: 1196,
    "title": "大懂纳西古歌(热美磋)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3OTQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 154
  },
  {
    id: 1197,
    "title": "三坝纳西古歌谷气调",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3OTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 178
  },
  {
    id: 1198,
    "title": "雪山恋",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3ODg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 156
  },
  {
    id: 1199,
    "title": "栽秧调(古老民歌)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3ODQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 163
  },
  {
    id: 1200,
    "title": "阿普三朵请您来",
    "artist": "达坡阿玻",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3Nzg=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MwejD9yic8kz4a72gprFrspuRFaVgR367KE1jZ5sAH1IQe4z4fenVTibGme8UMHeoCujic4VqVl0hbySnD2ia8WTVjPic7MReemic0M/640?wx_fmt=jpeg",
    "duration": 204
  },
  {
    id: 1201,
    "title": "傈僳打桥舞",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3NjE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 348
  },
  {
    id: 1202,
    "title": "傈僳酒歌dj",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3NjA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 174
  },
  {
    id: 1203,
    "title": "相守到永久",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3NTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 249
  },
  {
    id: 1204,
    "title": "纳西摇篮曲",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3NDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 134
  },
  {
    id: 1205,
    "title": "唯有你",
    "artist": "甲姆沽·阿平",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3Mzg=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7PosUiayMfK1cVm25VHR49xkOomdTUyon1f0icqGo8m5ib8GBFn6hp6zJdcCHTnLeGe3mx7E6M5hnqqr5s0s8YnQbuWFxM3luTWek/640?wx_fmt=jpeg",
    "duration": 219
  },
  {
    id: 1206,
    "title": "齐来欢喜",
    "artist": "甲姆沽·阿平",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3Mzc=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7PosUiayMfK1cVm25VHR49xkOomdTUyon1f0icqGo8m5ib8GBFn6hp6zJdcCHTnLeGe3mx7E6M5hnqqr5s0s8YnQbuWFxM3luTWek/640?wx_fmt=jpeg",
    "duration": 82
  },
  {
    id: 1207,
    "title": "甲姆沽·阿平、阿花-爱的福音",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3MzY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 259
  },
  {
    id: 1208,
    "title": "欢乐纳西打跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3MzU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 183
  },
  {
    id: 1209,
    "title": "注目看耶稣 Yisu Juq Lei Liuq",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3MjA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 221
  },
  {
    id: 1210,
    "title": "智慧之源",
    "artist": "甲姆沽·阿平",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3MTM=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7PosUiayMfK1cVm25VHR49xkOomdTUyon1f0icqGo8m5ib8GBFn6hp6zJdcCHTnLeGe3mx7E6M5hnqqr5s0s8YnQbuWFxM3luTWek/640?wx_fmt=jpeg",
    "duration": 200
  },
  {
    id: 1211,
    "title": "善与恶",
    "artist": "甲姆沽·阿平",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3MTI=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7PosUiayMfK1cVm25VHR49xkOomdTUyon1f0icqGo8m5ib8GBFn6hp6zJdcCHTnLeGe3mx7E6M5hnqqr5s0s8YnQbuWFxM3luTWek/640?wx_fmt=jpeg",
    "duration": 226
  },
  {
    id: 1212,
    "title": "勤劳之歌",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2OTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 377
  },
  {
    id: 1213,
    "title": "我是玉龙山上的牧童",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2OTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 208
  },
  {
    id: 1214,
    "title": "丽江千古情",
    "artist": "蔡隽妮",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2Nzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 199
  },
  {
    id: 1215,
    "title": "云中的村庄",
    "artist": "马涛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2Njg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 210
  },
  {
    id: 1216,
    "title": "纳西-随想",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2NTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 260
  },
  {
    id: 1217,
    "title": "玉龙山上开红花.",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2NTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 92
  },
  {
    id: 1218,
    "title": "纳西乐",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2NTM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 211
  },
  {
    id: 1219,
    "title": "吖咪倘",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2NTA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 227
  },
  {
    id: 1220,
    "title": "葫芦笙（王永刚）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2MzU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 154
  },
  {
    id: 1221,
    "title": "彝人制造",
    "artist": "妈妈",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2MzA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 314
  },
  {
    id: 1222,
    "title": "三江谣",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2Mjg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 211
  },
  {
    id: 1223,
    "title": "沙玛学锋《云中村庄》现场版",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2MjI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 227
  },
  {
    id: 1224,
    "title": "纳西魂（和文光音乐）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1OTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 215
  },
  {
    id: 1225,
    "title": "耳环姑娘",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1ODc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 188
  },
  {
    id: 1226,
    "title": "摩梭打跳曲II",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1Nzc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 276
  },
  {
    id: 1227,
    "title": "与白鹤共舞",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1NzY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 237
  },
  {
    id: 1228,
    "title": "姑娘小伙来打跳",
    "artist": "纯音乐",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1NjU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 487
  },
  {
    id: 1229,
    "title": "彝族舞曲I",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1NTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 280
  },
  {
    id: 1230,
    "title": "傈僳芦笙",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1Mzc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 320
  },
  {
    id: 1231,
    "title": "回家 印象丽江主题曲 西若如",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1MjE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 292
  },
  {
    id: 1232,
    "title": "傈僳打跳-乌鸦喝水",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1MjA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 216
  },
  {
    id: 1233,
    "title": "群星演唱《牦牛之歌》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1MTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 316
  },
  {
    id: 1234,
    "title": "回家",
    "artist": "西若如",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1MDI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 288
  },
  {
    id: 1235,
    "title": "纳西资搓鲁",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1MDE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 441
  },
  {
    id: 1236,
    "title": "丽江华坪跳之傈僳阔时",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1MDA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 314
  },
  {
    id: 1237,
    "title": "笑一笑对脚歌曲",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0OTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 160
  },
  {
    id: 1238,
    "title": "蹉噜了",
    "artist": "刘青青",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0ODA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 205
  },
  {
    id: 1239,
    "title": "好玩好耍来打跳",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0NzY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9GQ6iaKg837RNPYkefc9MNPMK5n2icXswJgq2U4FljgC3h6Wn3xlJEnHicxE9TWMQMEm4yz5em0T6UA/640?wx_fmt=jpeg",
    "duration": 372
  },
  {
    id: 1240,
    "title": "傈僳打跳调（葫芦声）",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0NzQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 432
  },
  {
    id: 1241,
    "title": "丽江黎明",
    "artist": "僳家山歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0NjI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 334
  },
  {
    id: 1242,
    "title": "三十年",
    "artist": "山人乐队",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0NTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 232
  },
  {
    id: 1243,
    "title": "大山走出的孩子",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0NDg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 282
  },
  {
    id: 1244,
    "title": "随我所爱",
    "artist": "摇滚藏獒纳西语版",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0NDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 212
  },
  {
    id: 1245,
    "title": "习振东 -唱一首属于自己的歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0MzQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 223
  },
  {
    id: 1246,
    "title": "丽江纳西打跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0Mjk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 138
  },
  {
    id: 1247,
    "title": "why---纳金坤",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0Mjg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 236
  },
  {
    id: 1248,
    "title": "玉龙山组合表演纳西族民歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzOTU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 56
  },
  {
    id: 1249,
    "title": "阿哩哩",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzOTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 294
  },
  {
    id: 1250,
    "title": "云上石头城插曲-《云中村庄》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzODI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 247
  },
  {
    id: 1251,
    "title": "《太久》",
    "artist": "夏天播放",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzNzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 228
  },
  {
    id: 1252,
    "title": "阿依呢玛（傈僳dj舞曲）",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzNjY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 893
  },
  {
    id: 1253,
    "title": "傈僳魅音超嗨傈僳打跳舞曲DJ版",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzNjU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 316
  },
  {
    id: 1254,
    "title": "走吧回家",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzNjE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 236
  },
  {
    id: 1255,
    "title": "《云上石头城》当爱情来过",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzNDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 299
  },
  {
    id: 1256,
    "title": "嘎迟迟呐撒哇",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzNDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 189
  },
  {
    id: 1257,
    "title": "久违的哥们",
    "artist": "阿刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzMDY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 277
  },
  {
    id: 1258,
    "title": "烧天香（纳西东巴）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzMDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 109
  },
  {
    id: 1259,
    "title": "度王经（纳西东巴）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzMDI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 151
  },
  {
    id: 1260,
    "title": "啊依然",
    "artist": "傈僳族",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyODY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 191
  },
  {
    id: 1261,
    "title": "傈僳调",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyODQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 263
  },
  {
    id: 1262,
    "title": "洛克的家",
    "artist": "我是土土",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyODM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 279
  },
  {
    id: 1263,
    "title": "彝族dj",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyNzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 251
  },
  {
    id: 1264,
    "title": "索玛花盛开",
    "artist": "小凉山彝族舞曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyNjg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 347
  },
  {
    id: 1265,
    "title": "欢乐香巴拉.mp3",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyNTk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 218
  },
  {
    id: 1266,
    "title": "超越葫芦笙dj-超越葫芦笙dj",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyNDI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 650
  },
  {
    id: 1267,
    "title": "纳西语版《一生所爱》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyMjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 289
  },
  {
    id: 1268,
    "title": "傈僳族七步曲",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyMjA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 326
  },
  {
    id: 1269,
    "title": "羊年大吉来打跳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyMTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 531
  },
  {
    id: 1270,
    "title": "丽江梦",
    "artist": "钰涵",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyMDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 257
  },
  {
    id: 1271,
    "title": "纳西狼组合-新年好",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDExOTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 183
  },
  {
    id: 1272,
    "title": "梦回云南--纳金坤",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDExOTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 293
  },
  {
    id: 1273,
    "title": "香格里拉的约定",
    "artist": "兰卡措",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDExNzM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 234
  },
  {
    id: 1274,
    "title": "山那边的纳西娃.mp3",
    "artist": "张慧珺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwNzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 232
  },
  {
    id: 1275,
    "title": "芦笙邀舞（Li-Su）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwNjc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 223
  },
  {
    id: 1276,
    "title": "口弦悠悠（欣赏版）",
    "artist": "和文光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwNjU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 219
  },
  {
    id: 1277,
    "title": "福慧路",
    "artist": "寒雨",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwNjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 168
  },
  {
    id: 1278,
    "title": "思乡曲【纳西语】",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwNTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 273
  },
  {
    id: 1279,
    "title": "丽江傈僳打跳",
    "artist": "傈音创宣室",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwNDc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 357
  },
  {
    id: 1280,
    "title": "醉了丽江",
    "artist": "土鸡蛋组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwNDY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 237
  },
  {
    id: 1281,
    "title": "七个月亮",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwNDU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 164
  },
  {
    id: 1282,
    "title": "喔吉阿丽哩",
    "artist": "和丽元",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwMzA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 261
  },
  {
    id: 1283,
    "title": "恋您我的家.mp3",
    "artist": "纳若",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwMjU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 243
  },
  {
    id: 1284,
    "title": "脑筋急转弯",
    "artist": "张慧珺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwMTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 236
  },
  {
    id: 1285,
    "title": "相见难（傈僳乡音）",
    "artist": "灯思克",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwMTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 258
  },
  {
    id: 1286,
    "title": "天下傈僳一家人",
    "artist": "灯思克",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwMTE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 142
  },
  {
    id: 1287,
    "title": "《丽江美》",
    "artist": "阎维文",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwMDg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 340
  },
  {
    id: 1288,
    "title": "丽江三部曲",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA5OTQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 367
  },
  {
    id: 1289,
    "title": "文笔神山",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA5OTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 264
  },
  {
    id: 1290,
    "title": "纳西人的歌",
    "artist": "达坡阿玻",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA5OTE=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MwejD9yic8kz4a72gprFrspuRFaVgR367KE1jZ5sAH1IQe4z4fenVTibGme8UMHeoCujic4VqVl0hbySnD2ia8WTVjPic7MReemic0M/640?wx_fmt=jpeg",
    "duration": 284
  },
  {
    id: 1291,
    "title": "纳西姑娘-乌云嘎",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA5OTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 283
  },
  {
    id: 1292,
    "title": "女声小组唱 含蜜金组合",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA5Njk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 249
  },
  {
    id: 1293,
    "title": "美丽傈家欢迎你来",
    "artist": "和顺才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA5Njg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 273
  },
  {
    id: 1294,
    "title": "回家",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA5NjA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 281
  },
  {
    id: 1295,
    "title": "祝福小凉山_单曲",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA5MzU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 238
  },
  {
    id: 1296,
    "title": "认识你真好",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA5MzQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 228
  },
  {
    id: 1297,
    "title": "傈寨神话",
    "artist": "三江组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA5MzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 197
  },
  {
    id: 1298,
    "title": "丽江谣",
    "artist": "和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA5MTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 272
  },
  {
    id: 1299,
    "title": "卓玛格桑花",
    "artist": "木作为",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA4ODU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 256
  },
  {
    id: 1300,
    "title": "阿智《喜欢你》纳西语",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA4NzI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 250
  },
  {
    id: 1301,
    "title": "草原风",
    "artist": "达坡阿玻",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA4NjI=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MwejD9yic8kz4a72gprFrspuRFaVgR367KE1jZ5sAH1IQe4z4fenVTibGme8UMHeoCujic4VqVl0hbySnD2ia8WTVjPic7MReemic0M/640?wx_fmt=jpeg",
    "duration": 248
  },
  {
    id: 1302,
    "title": "怒江情歌",
    "artist": "纳若咪",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA4NTk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 324
  },
  {
    id: 1303,
    "title": "同住一座城",
    "artist": "和曙洪.和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA4Mzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 241
  },
  {
    id: 1304,
    "title": "迪庆，我慈祥的阿妈",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA4MTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 304
  },
  {
    id: 1305,
    "title": "打劳丽",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA4MDE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 266
  },
  {
    id: 1306,
    "title": "和合劳",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA4MDA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 381
  },
  {
    id: 1307,
    "title": "牵挂",
    "artist": "寒雨",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3OTk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 227
  },
  {
    id: 1308,
    "title": "净土（达坡阿玻演唱）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3ODQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 234
  },
  {
    id: 1309,
    "title": "纳西欢歌",
    "artist": "玉龙山组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3NzI=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 197
  },
  {
    id: 1310,
    "title": "丽江王铁生.",
    "artist": "纳西酒歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3NjA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 128
  },
  {
    id: 1311,
    "title": "传奇（纳西语版）阿尼布鲁鲁",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3NTY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 187
  },
  {
    id: 1312,
    "title": "回家",
    "artist": "《印象丽江》主题曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3NTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 193
  },
  {
    id: 1313,
    "title": "美丽的古城",
    "artist": "和旋",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3NDk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 239
  },
  {
    id: 1314,
    "title": "月亮落进山谷里",
    "artist": "达坡玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3NDA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 210
  },
  {
    id: 1315,
    "title": "摩梭夜歌",
    "artist": "和国军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3MzU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 265
  },
  {
    id: 1316,
    "title": "回归",
    "artist": "香格里拉组合 傈僳娃娃",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3MzI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 327
  },
  {
    id: 1317,
    "title": "潘金妹",
    "artist": "达坡阿玻",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3MjE=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7MwejD9yic8kz4a72gprFrspuRFaVgR367KE1jZ5sAH1IQe4z4fenVTibGme8UMHeoCujic4VqVl0hbySnD2ia8WTVjPic7MReemic0M/640?wx_fmt=jpeg",
    "duration": 303
  },
  {
    id: 1318,
    "title": "纳西农家乐",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3MTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 266
  },
  {
    id: 1319,
    "title": "玉龙欢歌",
    "artist": "和文光作品集",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3MDA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 205
  },
  {
    id: 1320,
    "title": "想起家乡",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2OTc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 286
  },
  {
    id: 1321,
    "title": "欢聚在一起",
    "artist": "玉龙山组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2ODI=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 203
  },
  {
    id: 1322,
    "title": "纳西谷气.mp3",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2NzA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 182
  },
  {
    id: 1323,
    "title": "阿卡巴拉麻达咪.mp3",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2Njg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 170
  },
  {
    id: 1324,
    "title": "我们好好爱",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2NTU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 266
  },
  {
    id: 1325,
    "title": "纳西足球啦啦歌",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2NTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 218
  },
  {
    id: 1326,
    "title": "群星",
    "artist": "美丽丽江欢迎你",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2Mzk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 152
  },
  {
    id: 1327,
    "title": "雪域护身格萨尔王",
    "artist": "根呷新歌",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2Mzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 301
  },
  {
    id: 1328,
    "title": "丽江纳西族打跳",
    "artist": "纯音乐",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2Mjg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 202
  },
  {
    id: 1329,
    "title": "纳西，阿哩哩",
    "artist": "媛媛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2MjQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 182
  },
  {
    id: 1330,
    "title": "白马山寨",
    "artist": "亚东",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2MTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 255
  },
  {
    id: 1331,
    "title": "纳西特色《三部曲》欢乐和谐苑",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1OTg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 1022
  },
  {
    id: 1332,
    "title": "纳西净地dj",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1ODg=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 303
  },
  {
    id: 1333,
    "title": "纳西吉祥",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1Njg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 48
  },
  {
    id: 1334,
    "title": "和上钧＆阿诛 玉龙雪山的故事",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1NjY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 350
  },
  {
    id: 1335,
    "title": "木作为《舞动玉龙》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1NjI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 337
  },
  {
    id: 1336,
    "title": "纳若《不怕》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1NjA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 281
  },
  {
    id: 1337,
    "title": "茨哩茨姆(古老民歌)",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1NTI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 151
  },
  {
    id: 1338,
    "title": "串烧",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1NDY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 473
  },
  {
    id: 1339,
    "title": "纳西希余花花色-涵格佩吉",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1NDE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 266
  },
  {
    id: 1340,
    "title": "七彩家园",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0OTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 298
  },
  {
    id: 1341,
    "title": "爱情没有保质期",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0NzQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 235
  },
  {
    id: 1342,
    "title": "纳西劳动歌《栽秧歌》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0Njk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 85
  },
  {
    id: 1343,
    "title": "纳西姑娘美",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0Njc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 238
  },
  {
    id: 1344,
    "title": "梦中的香格里拉(达坡阿玻）",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0NjM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 274
  },
  {
    id: 1345,
    "title": "西余索",
    "artist": "和春琴",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0NDQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 249
  },
  {
    id: 1346,
    "title": "呀哈哩，跳起来",
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0NDM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 280
  },
  {
    id: 1347,
    "title": "纳西祝酒歌",
    "artist": "和文光原创歌曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0NDE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 163
  },
  {
    id: 1348,
    "title": "",
    "artist": "和美兰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0Mjk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 245
  },
  {
    id: 1349,
    "title": "纳西劝世歌",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0Mjc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 132
  },
  {
    id: 1350,
    "title": "纳西恋歌",
    "artist": "达坡玛吉、和文光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0MjU=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 242
  },
  {
    id: 1351,
    "title": "扎西尼玛-相约巴拉",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0MTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 248
  },
  {
    id: 1352,
    "title": "纳西族音乐史 小调三月百花开",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0MDY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 37
  },
  {
    id: 1353,
    "title": "要爱就爱你全部",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0MDA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 278
  },
  {
    id: 1354,
    "title": "天边的天边",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzOTY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 285
  },
  {
    id: 1355,
    "title": "藏地光芒",
    "artist": "齐旦布",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzODY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 228
  },
  {
    id: 1356,
    "title": "毛主席派人来",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzNTg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 260
  },
  {
    id: 1357,
    "title": "吉祥传奇",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzNDk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 229
  },
  {
    id: 1358,
    "title": "卓玛央金",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzMzA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 231
  },
  {
    id: 1359,
    "title": "走向远方",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzMTk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 211
  },
  {
    id: 1360,
    "title": "白沙细乐《三思汲》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzMTE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 130
  },
  {
    id: 1361,
    "title": "阿里里《细针挑丝线》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzMTA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 147
  },
  {
    id: 1362,
    "title": "劳动歌《栽秧歌》",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzMDk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 85
  },
  {
    id: 1363,
    "title": "《嫁女调》纳西",
    "artist": "和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzMDU=",
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NAOOTqJ4CT2vWUKiaErYyQlhZ89GYTflmEbE9UeEmsicliaq5omgYe6ibShPRxaibunyF5XapduNXnH1bsMynxuPV7U21bksRtZEOE/640?wx_fmt=jpeg",
    "duration": 109
  },
  {
    id: 1364,
    "title": "阿妈",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzMDM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 296
  },
  {
    id: 1365,
    "title": "吉祥欢聚锅庄",
    "artist": "索朗扎西",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyOTM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 443
  },
  {
    id: 1366,
    "title": "七月火把节",
    "artist": "山鹰组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyODY=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 272
  },
  {
    id: 1367,
    "title": "走进尼汝",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyODE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 258
  },
  {
    id: 1368,
    "title": "和我去转山",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyNzU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 286
  },
  {
    id: 1369,
    "title": "茶马古道歌",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyNzM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 186
  },
  {
    id: 1370,
    "title": "披星戴月纳西女",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyNjg=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 265
  },
  {
    id: 1371,
    "title": "战友兄弟",
    "artist": "汤潮",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyNTc=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 247
  },
  {
    id: 1372,
    "title": "爱的部落",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyNTE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 280
  },
  {
    id: 1373,
    "title": "傈僳族打跳_升华工作室",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyNDU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 139
  },
  {
    id: 1374,
    "title": "善心宝",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyNDQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 253
  },
  {
    id: 1375,
    "title": "次真拉姆",
    "artist": "扎西尼玛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyMzk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 294
  },
  {
    id: 1376,
    "title": "我的思念只给你唱",
    "artist": "曲尔甲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyMzg=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 214
  },
  {
    id: 1377,
    "title": "净地",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyMDc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 239
  },
  {
    id: 1378,
    "title": "傈僳酒歌",
    "artist": "三江组合",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyMDY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 218
  },
  {
    id: 1379,
    "title": "纳西净地2",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyMDU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 227
  },
  {
    id: 1380,
    "title": "月亮花",
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxOTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 252
  },
  {
    id: 1381,
    "title": "舞动三江——阿石才",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxOTE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 894
  },
  {
    id: 1382,
    "title": "傈僳闪脚跳",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxOTA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 262
  },
  {
    id: 1383,
    "title": "二月八——革囊度组合",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxODk=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 267
  },
  {
    id: 1384,
    "title": "等你归来",
    "artist": "三江组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxODE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 207
  },
  {
    id: 1385,
    "title": "爱过你卓玛---嘉央",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxNzE=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 204
  },
  {
    id: 1386,
    "title": "王者归来",
    "artist": "嘉央",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxNzA=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 198
  },
  {
    id: 1387,
    "title": "净地Ⅱ",
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxNTc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 227
  },
  {
    id: 1388,
    "title": "大山走出的孩子",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxNTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 283
  },
  {
    id: 1389,
    "title": "芒果香",
    "artist": "谢军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxNDM=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 301
  },
  {
    id: 1390,
    "title": "阿哥阿妹",
    "artist": "谢军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxNDI=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 295
  },
  {
    id: 1391,
    "title": "一瞬间",
    "artist": "丽江小倩",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxMzQ=",
    "cover": "https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop",
    "duration": 176
  },
  {
    id: 1392,
    "title": "傈僳族打跳",
    "artist": "",
    "album": "傈僳音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxMzA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8gfeibj9LUzLp9f7iaMsZwm950s3RZTIFg5bZWwc91vInFpAicbg7Oko8V1fZsnQ5Vu8WiaLO8eY4ZFw/640?wx_fmt=jpeg",
    "duration": 139
  },
  {
    id: 1393,
    "title": "山水画",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxMjQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 216
  },
  {
    id: 1394,
    "title": "爱的家园",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxMTY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 153
  },
  {
    id: 1395,
    "title": "春天里",
    "artist": "根呷",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxMTU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 241
  },
  {
    id: 1396,
    "title": "飞旋的香巴拉",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAwOTc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 229
  },
  {
    id: 1397,
    "title": "与你同在",
    "artist": "香格里拉组合",
    "album": "藏族音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAwODk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 260
  }
];

function cleanArtistText(value) {
  return String(value || '')
    .replace(/[·•]/g, '、')
    .replace(/\s*(feat\.?|ft\.?|with)\s*/gi, '、')
    .replace(/\s*\/\s*/g, '、')
    .replace(/\s*&\s*/g, '、')
    .replace(/\s*\+\s*/g, '、')
    .replace(/[＆]/g, '、')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitArtistNames(value) {
  var artistText = cleanArtistText(value);
  if (!artistText) return [];

  var names = artistText
    .split(/[、，,]/)
    .map(function(name) { return name.trim(); })
    .filter(Boolean);

  if (names.length === 1 && /\s/.test(names[0])) {
    var spaceNames = names[0]
      .split(/\s+/)
      .map(function(name) { return name.trim(); })
      .filter(Boolean);

    if (spaceNames.length > 1) {
      names = spaceNames;
    }
  }

  return names.filter(function(name, index) {
    return names.indexOf(name) === index;
  });
}

function renderArtistLinks(container, artistValue, stopPropagation) {
  if (!container) return;

  var names = splitArtistNames(artistValue);
  var displayArtist = names.length ? names.join('、') : (String(artistValue || '').trim() || '未知艺术家');

  if (!names.length) {
    container.textContent = displayArtist;
    return;
  }

  names.forEach(function(name, index) {
    if (index > 0) {
      container.appendChild(document.createTextNode('、'));
    }

    var link = document.createElement('a');
    link.href = 'artist.html?name=' + encodeURIComponent(name);
    link.className = 'artist-link';
    link.textContent = name;
    if (stopPropagation) {
      link.addEventListener('click', function(event) {
        event.stopPropagation();
      });
    }
    container.appendChild(link);
  });
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderArtistLinksHtml(artistValue) {
  var names = splitArtistNames(artistValue);
  if (!names.length) {
    return escapeHtml(String(artistValue || '').trim() || '未知艺术家');
  }

  return names.map(function(name) {
    return '<a href="artist.html?name=' + encodeURIComponent(name) + '" class="artist-link" onclick="event.stopPropagation()">' + escapeHtml(name) + '</a>';
  }).join('、');
}

function setArtistElementContent(element, artistValue, stopPropagation) {
  if (!element) return;
  element.innerHTML = '';
  renderArtistLinks(element, artistValue, stopPropagation);
}

window.splitArtistNames = splitArtistNames;
window.renderArtistLinks = renderArtistLinks;
window.renderArtistLinksHtml = renderArtistLinksHtml;
window.setArtistElementContent = setArtistElementContent;

// 获取DOM元素
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const volumeSlider = document.getElementById('volume-slider');
const currentTitle = document.getElementById('current-title');
const currentArtist = document.getElementById('current-artist');
const currentCover = document.getElementById('current-cover');
const musicListContainer = document.getElementById('music-list');
const videoListContainer = document.getElementById('video-list');
const musicPaginationContainer = document.getElementById('music-pagination');
const videoPaginationContainer = document.getElementById('video-pagination');

console.log('✅ DOM元素获取完成');

let currentTrackIndex = 0;
let isPlaying = false;
let currentMediaType = 'music';
const DEFAULT_PLACEHOLDER_COVER = 'https://images.unsplash.com/photo-1677922068836-149f83761ddb?fm=jpg&q=60&w=640&auto=format&fit=crop';
const coverResolutionCache = {};
const musicIndexById = new Map(musicData.map(function(track, index) {
  return [track.id, index];
}));

function readScriptStorageValue(key, fallback) {
  try {
    var value = localStorage.getItem(key);
    return value == null ? fallback : value;
  } catch (error) {
    return fallback;
  }
}

function writeScriptStorageValue(key, value) {
  try {
    localStorage.setItem(key, String(value));
  } catch (error) {
  }
}

function persistCurrentPlayerState(track, currentTime, playing, volume) {
  if (!track) return;

  try {
    if (typeof savePlayerState === 'function') {
      savePlayerState(track.id, currentTime, playing, track, volume);
      return;
    }
  } catch (error) {
  }

  try {
    writeScriptStorageValue('currentTrackId', track.id);
    writeScriptStorageValue('lastPlayedTrack', JSON.stringify(track));
  } catch (error) {
  }
}

// 分页相关变量
let musicCurrentPage = 1;
const musicItemsPerPage = 20; 

let videoCurrentPage = 1;
const videoItemsPerPage = 15; // 每页显示15个

// 格式化时间
function formatTime(seconds) {
  if(isNaN(seconds) || seconds <= 0) return '0:00';
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return min + ':' + (sec < 10 ? '0' : '') + sec;
}

function sanitizeCoverLookupText(value) {
  return String(value || '')
    .replace(/\.(mp3|flac|wav|m4a)$/i, '')
    .replace(/&amp;/gi, '&')
    .replace(/_/g, ' ')
    .replace(/[《》"'`]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildExternalCoverLookup(track) {
  var title = sanitizeCoverLookupText(track && track.title);
  var artist = sanitizeCoverLookupText(track && track.artist);
  var separators = [' - ', ' — ', ' – ', ' | ', '｜', '_'];

  if (artist && title) {
    var lowerTitle = title.toLowerCase();
    var lowerArtist = artist.toLowerCase();
    if (lowerTitle.indexOf(lowerArtist) === 0) {
      title = title.slice(artist.length).replace(/^(\s*[-—–|｜_:：]+\s*)+/, '').trim() || title;
    }
  }

  if (!artist && title) {
    for (var i = 0; i < separators.length; i++) {
      var separator = separators[i];
      var separatorIndex = title.indexOf(separator);
      if (separatorIndex > 0 && separatorIndex < title.length - separator.length) {
        var left = title.slice(0, separatorIndex).trim();
        var right = title.slice(separatorIndex + separator.length).trim();
        if (left && right) {
          artist = left;
          title = right;
          break;
        }
      }
    }
  }

  return {
    title: title,
    artist: artist
  };
}

function isPlaceholderCover(coverUrl) {
  return String(coverUrl || '').trim() === DEFAULT_PLACEHOLDER_COVER;
}

function normalizeMediaUrl(url) {
  var value = String(url || '').trim();
  if (!value) return '';
  if (window.location && window.location.protocol === 'https:' && value.indexOf('http://') === 0) {
    return 'https://' + value.slice('http://'.length);
  }
  return value;
}

function buildCoverCacheKey(track) {
  if (!track) return '';
  return [
    String(track.id || '').trim(),
    sanitizeCoverLookupText(track.title),
    sanitizeCoverLookupText(track.artist)
  ].join('::');
}

function applyResolvedCoverToDom(track, resolvedUrl, targetImage) {
  if (!track || !resolvedUrl) return;

  var safeUrl = normalizeMediaUrl(resolvedUrl);
  track.cover = safeUrl;

  if (targetImage) {
    targetImage.src = safeUrl;
    targetImage.alt = track.title + ' 封面';
  }

  if (currentCover && musicData[currentTrackIndex] && musicData[currentTrackIndex].id === track.id) {
    currentCover.src = safeUrl;
    currentCover.alt = track.title + ' 封面';
  }

  var queueCardCover = document.querySelector('.music-card[data-id="' + track.id + '"] img.album-cover');
  if (queueCardCover) {
    queueCardCover.src = safeUrl;
    queueCardCover.alt = track.title + ' 封面';
  }

  var heroCoverEl = document.getElementById('hero-cover');
  if (heroCoverEl && musicData[currentTrackIndex] && musicData[currentTrackIndex].id === track.id) {
    heroCoverEl.src = safeUrl;
    heroCoverEl.alt = track.title + ' 封面';
  }
}

function ensureTrackCover(track, targetImage) {
  if (!track) {
    return Promise.resolve('');
  }

  track.cover = normalizeMediaUrl(track.cover);

  if (!isPlaceholderCover(track.cover)) {
    return Promise.resolve(track ? track.cover : '');
  }

  var lookup = buildExternalCoverLookup(track);
  var title = lookup.title;
  var artist = lookup.artist;
  if (!title || !artist) return Promise.resolve(track.cover);

  var cacheKey = buildCoverCacheKey(track);
  if (coverResolutionCache[cacheKey]) {
    applyResolvedCoverToDom(track, coverResolutionCache[cacheKey], targetImage);
    return Promise.resolve(coverResolutionCache[cacheKey]);
  }

  var customCoverEndpoint = String(window.COVER_API_ENDPOINT || '').trim();
  if (customCoverEndpoint) {
    var requestUrl = customCoverEndpoint + '?title=' + encodeURIComponent(title) + '&artist=' + encodeURIComponent(artist);
    return fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(function(response) {
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      return response.json();
    }).then(function(payload) {
      var imageUrl = normalizeMediaUrl(payload && payload.imageUrl ? payload.imageUrl : '');
      if (!imageUrl) {
        throw new Error('No cover image');
      }
      coverResolutionCache[cacheKey] = imageUrl;
      applyResolvedCoverToDom(track, imageUrl, targetImage);
      return imageUrl;
    }).catch(function() {
      return track.cover;
    });
  }

  var endpoint = 'https://api.lrc.cx/cover?title=' + encodeURIComponent(title) + '&artist=' + encodeURIComponent(artist);
  return new Promise(function(resolve) {
    var preloadImage = new Image();

    preloadImage.onload = function() {
      coverResolutionCache[cacheKey] = endpoint;
      applyResolvedCoverToDom(track, endpoint, targetImage);
      resolve(endpoint);
    };

    preloadImage.onerror = function() {
      resolve(track.cover);
    };

    preloadImage.referrerPolicy = 'no-referrer';
    preloadImage.src = endpoint;
  });
}

window.ensureTrackCover = ensureTrackCover;

// 加载音乐
function loadTrack(index) {
  console.log('🎵 加载音乐:', index, musicData[index].title);

  currentTrackIndex = index;
  
  const track = musicData[index];
  audioPlayer.src = track.src;
  audioPlayer.load();
  
  // 更新播放器显示
  currentTitle.textContent = track.title;
  setArtistElementContent(currentArtist, track.artist, false);
  currentCover.src = normalizeMediaUrl(track.cover);
  currentCover.alt = track.title + ' 封面';
  ensureTrackCover(track, currentCover);
  
  // 更新总时长
  totalTimeEl.textContent = formatTime(track.duration);
  
  // 更新列表高亮
  updateMusicListHighlight();
  
  // 保存播放器状态
  persistCurrentPlayerState(track, 0, isPlaying, audioPlayer.volume);
  
  console.log('✅ 音乐加载完成');
}

// 播放音乐
function playMusic() {
  console.log('▶️ 播放音乐');
  
  // 确保音频已加载
  if (audioPlayer.readyState < 2) {
    console.log('⏳ 音频未加载完成，等待加载...');
    audioPlayer.addEventListener('canplay', function onCanPlay() {
      audioPlayer.removeEventListener('canplay', onCanPlay);
      audioPlayer.play().then(function() {
        isPlaying = true;
        updatePlayButton();
        
        // 保存播放器状态
        persistCurrentPlayerState(musicData[currentTrackIndex], audioPlayer.currentTime, true, audioPlayer.volume);
      }).catch(function(error) {
        console.error('❌ 播放失败:', error);
      });
    });
  } else {
    audioPlayer.play().then(function() {
      isPlaying = true;
      updatePlayButton();
      
      // 保存播放器状态
      persistCurrentPlayerState(musicData[currentTrackIndex], audioPlayer.currentTime, true, audioPlayer.volume);
    }).catch(function(error) {
      console.error('❌ 播放失败:', error);
    });
  }
}

// 暂停音乐
function pauseMusic() {
  console.log('⏸️ 暂停音乐');
  audioPlayer.pause();
  isPlaying = false;
  updatePlayButton();
  
  // 保存播放器状态
  persistCurrentPlayerState(musicData[currentTrackIndex], audioPlayer.currentTime, false, audioPlayer.volume);
}

// 切换播放/暂停
function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

// 更新播放按钮图标
function updatePlayButton() {
  if (isPlaying) {
    playBtn.innerHTML = (window.LJYYTIcons && window.LJYYTIcons.pause) || 'Pause';
    playBtn.classList.add('btn-playing');
    playBtn.setAttribute('aria-label', '暂停播放');
  } else {
    playBtn.innerHTML = (window.LJYYTIcons && window.LJYYTIcons.play) || 'Play';
    playBtn.classList.remove('btn-playing');
    playBtn.setAttribute('aria-label', '开始播放');
  }
  // 控制当前音乐卡片的播放旋转动画
  var activeCard = document.querySelector('.music-card.active');
  if (activeCard) {
    if (isPlaying) {
      activeCard.classList.add('playing');
    } else {
      activeCard.classList.remove('playing');
    }
  }
  // 控制底部播放器封面旋转
  var coverImg = document.getElementById('current-cover');
  if (coverImg) {
    if (isPlaying) {
      coverImg.classList.add('playing');
    } else {
      coverImg.classList.remove('playing');
    }
  }
}

function createMusicCardColumn(track, actualIndex, animationDelay) {
  var col = document.createElement('div');
  col.className = 'col-md-6 col-lg-3 mb-3 card-enter';
  col.style.animationDelay = animationDelay + 's';
  var isPlayerPage = !!(document.body && document.body.classList.contains('music-player-page'));

  var card = document.createElement('div');
  card.className = 'card music-card';
  if (actualIndex === currentTrackIndex) card.classList.add('active');
  card.dataset.id = track.id;
  card.dataset.index = actualIndex;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', '播放歌曲 ' + track.title + ' - ' + track.artist);

  var cardBody = document.createElement('div');
  cardBody.className = 'card-body d-flex align-items-center p-2';

  var cover = document.createElement('img');
  cover.src = normalizeMediaUrl(track.cover);
  cover.alt = track.title;
  cover.className = 'album-cover me-2';
  cover.loading = 'lazy';
  cover.decoding = 'async';

  var content = document.createElement('div');
  content.className = 'flex-grow-1 overflow-hidden';

  var title = document.createElement('h6');
  title.className = 'card-title mb-1 text-truncate';
  title.title = track.title;
  title.textContent = track.title;

  var meta = document.createElement('div');
  meta.className = 'd-flex align-items-center';

  var artistWrap = document.createElement('p');
  artistWrap.className = 'card-text text-muted mb-0 small text-truncate me-2';

  renderArtistLinks(artistWrap, track.artist, true);

  var duration = document.createElement('small');
  duration.className = 'text-muted track-duration';
  duration.textContent = formatTime(track.duration);

  var icon = document.createElement('span');
  icon.className = 'text-primary ms-2 card-music-icon';
  icon.innerHTML = (window.LJYYTIcons && window.LJYYTIcons.music) || '';
  icon.setAttribute('aria-hidden', 'true');

  function getTrackLikedState() {
    if (typeof window.isFav === 'function') {
      return window.isFav(track.id);
    }

    try {
      var favorites = JSON.parse(readScriptStorageValue('ljyyt_favorites', '[]')) || [];
      return favorites.indexOf(track.id) !== -1;
    } catch (error) {
      return false;
    }
  }

  function updateInlineFavButton(button) {
    if (!button) return;
    var liked = getTrackLikedState();
    button.classList.toggle('liked', liked);
    button.setAttribute('aria-pressed', liked ? 'true' : 'false');
    button.title = liked ? '取消收藏' : '收藏歌曲';
    button.innerHTML = liked
      ? ((window.LJYYTIcons && window.LJYYTIcons.heartFilled) || '♥')
      : ((window.LJYYTIcons && window.LJYYTIcons.heart) || '♡');
  }

  meta.appendChild(artistWrap);
  meta.appendChild(duration);
  content.appendChild(title);
  content.appendChild(meta);
  cardBody.appendChild(cover);
  cardBody.appendChild(content);

  if (isPlayerPage && typeof window.toggleFav === 'function') {
    var favButton = document.createElement('button');
    favButton.type = 'button';
    favButton.className = 'queue-fav-btn';
    favButton.setAttribute('aria-label', '收藏歌曲');
    updateInlineFavButton(favButton);
    favButton.addEventListener('click', function(event) {
      event.stopPropagation();
      event.preventDefault();
      window.toggleFav(track.id);
      updateInlineFavButton(favButton);
    });
    cardBody.appendChild(favButton);

    document.addEventListener('ljyyt:favorites-changed', function(event) {
      if (event && event.detail && event.detail.id === track.id) {
        updateInlineFavButton(favButton);
      }
    });
  }

  cardBody.appendChild(icon);
  card.appendChild(cardBody);

  function handleSelectTrack() {
    currentTrackIndex = actualIndex;
    loadTrack(currentTrackIndex);
    playMusic();
    updateMusicListHighlight();
  }

  card.addEventListener('click', handleSelectTrack);
  card.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelectTrack();
    }
  });

  col.appendChild(card);
  return col;
}

// 上一首
function prevTrack() {
  console.log('⏮️ 上一首');
  currentTrackIndex = (currentTrackIndex - 1 + musicData.length) % musicData.length;
  loadTrack(currentTrackIndex);
  if (isPlaying) {
    playMusic();
  }
}

// 下一首
function nextTrack() {
  console.log('⏭️ 下一首');
  currentTrackIndex = (currentTrackIndex + 1) % musicData.length;
  loadTrack(currentTrackIndex);
  if (isPlaying) {
    playMusic();
  }
}

// 更新进度条
function updateProgress() {
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  
  if (isNaN(duration)) return;
  
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = progressPercent + '%';
  currentTimeEl.textContent = formatTime(currentTime);
  if (progressContainer) {
    progressContainer.setAttribute('aria-valuenow', String(Math.round(progressPercent)));
  }
}

// 点击进度条跳转
function setProgress(e) {
  if (!progressContainer) return;
  var rect = progressContainer.getBoundingClientRect();
  var width = rect.width || progressContainer.clientWidth;
  var clientX = e.clientX;
  if (e.touches && e.touches.length) clientX = e.touches[0].clientX;
  if (clientX === undefined && e.changedTouches && e.changedTouches.length) clientX = e.changedTouches[0].clientX;
  var clickX = Math.max(0, Math.min(clientX - rect.left, width));
  var duration = audioPlayer.duration;
  if (isNaN(duration)) return;
  audioPlayer.currentTime = (clickX / width) * duration;
}

// 进度条拖拽
(function() {
  var isDragging = false;
  var progContainer = document.getElementById('progress-container');
  if (!progContainer) return;
  var activePointerId = null;

  function getProgressX(e) {
    var rect = progContainer.getBoundingClientRect();
    var clientX = e.clientX;
    if (e.touches && e.touches.length) clientX = e.touches[0].clientX;
    var x = clientX - rect.left;
    return Math.max(0, Math.min(x, rect.width));
  }

  function seekFromEvent(e) {
    var duration = audioPlayer.duration;
    if (isNaN(duration)) return;
    var x = getProgressX(e);
    var pct = x / progContainer.getBoundingClientRect().width;
    var bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = (pct * 100) + '%';
    progContainer.setAttribute('aria-valuenow', String(Math.round(pct * 100)));
    audioPlayer.currentTime = pct * duration;
  }

  function onPointerDown(e) {
    isDragging = true;
    activePointerId = e.pointerId;
    if (progContainer.setPointerCapture) {
      try { progContainer.setPointerCapture(activePointerId); } catch (captureError) {}
    }
    seekFromEvent(e);
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    if (activePointerId !== null && e.pointerId !== activePointerId) return;
    e.preventDefault();
    seekFromEvent(e);
  }

  function onPointerUp(e) {
    if (activePointerId !== null && e.pointerId !== activePointerId) return;
    isDragging = false;
    if (progContainer.releasePointerCapture && activePointerId !== null) {
      try { progContainer.releasePointerCapture(activePointerId); } catch (releaseError) {}
    }
    activePointerId = null;
  }

  progContainer.addEventListener('pointerdown', onPointerDown);
  progContainer.addEventListener('pointermove', onPointerMove);
  progContainer.addEventListener('pointerup', onPointerUp);
  progContainer.addEventListener('pointercancel', onPointerUp);
})();

// 设置音量
function setVolume(e) {
  const volume = e.target.value;
  audioPlayer.volume = volume;
  
  // 保存音量状态
  persistCurrentPlayerState(musicData[currentTrackIndex], audioPlayer.currentTime, isPlaying, volume);
}

// 更新音乐列表的高亮状态
function updateMusicListHighlight() {
  const cards = document.querySelectorAll('.music-card');
  var activeCard = null;
  var queueList = document.querySelector('.queue-list');
  cards.forEach(function(card) {
    var cardIndex = parseInt(card.dataset.index);
    if (cardIndex === currentTrackIndex) {
      card.classList.add('active');
      if (isPlaying) card.classList.add('playing');
      activeCard = card;
    } else {
      card.classList.remove('active');
      card.classList.remove('playing');
    }
  });
  // 自动滚动到当前歌曲
  if (activeCard && activeCard.scrollIntoView) {
    if (queueList) {
      var queueRect = queueList.getBoundingClientRect();
      var cardRect = activeCard.getBoundingClientRect();
      var cardTop = cardRect.top - queueRect.top + queueList.scrollTop;
      var cardBottom = cardTop + cardRect.height;
      var viewTop = queueList.scrollTop;
      var viewBottom = viewTop + queueList.clientHeight;

      if (cardTop < viewTop || cardBottom > viewBottom) {
        queueList.scrollTo({
          top: Math.max(cardTop - (queueList.clientHeight - cardRect.height) / 2, 0),
          behavior: 'smooth'
        });
      }
    } else {
      var rect = activeCard.getBoundingClientRect();
      var inView = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!inView) {
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }
}

// 渲染音乐列表
function renderMusicList() {
  console.log('🎵 开始渲染音乐列表...');
  
  if (!musicListContainer) {
    console.warn('musicListContainer 未找到，跳过音乐列表渲染');
    return;
  }

  var isPlayerPage = !!(document.body && document.body.classList.contains('music-player-page'));
  var totalPages = Math.ceil(musicData.length / musicItemsPerPage);
  var pageData = musicData;

  if (!isPlayerPage) {
    if (musicCurrentPage > totalPages) musicCurrentPage = totalPages;
    if (musicCurrentPage < 1) musicCurrentPage = 1;

    var startIndex = (musicCurrentPage - 1) * musicItemsPerPage;
    var endIndex = Math.min(startIndex + musicItemsPerPage, musicData.length);
    pageData = musicData.slice(startIndex, endIndex);
  }
  
  musicListContainer.innerHTML = '';
  
  pageData.forEach(function(track, i) {
    var actualIndex = musicIndexById.get(track.id);
    musicListContainer.appendChild(createMusicCardColumn(track, actualIndex, Math.min(i, 20) * 0.03));
  });
  
  if (isPlayerPage) {
    if (musicPaginationContainer) musicPaginationContainer.innerHTML = '';
    console.log('✅ 播放页音乐队列渲染完成，共 ' + musicData.length + ' 首');
  } else {
    // 渲染分页
    renderMusicPagination();
    console.log('✅ 音乐列表渲染完成，第 ' + musicCurrentPage + '/' + totalPages + ' 页，共 ' + musicData.length + ' 首');
  }
}

// 渲染过滤后的音乐列表（收藏/历史）
function renderFilteredList(tracks) {
  if (!musicListContainer) return;
  if (!tracks || tracks.length === 0) {
    musicListContainer.innerHTML = '<div class="col-12 text-center py-5 text-muted"><span class="empty-icon mb-3">' + ((window.LJYYTIcons && window.LJYYTIcons.inbox) || '') + '</span><p>暂无内容</p></div>';
    if (musicPaginationContainer) musicPaginationContainer.innerHTML = '';
    return;
  }

  musicListContainer.innerHTML = '';

  tracks.forEach(function(track, i) {
    var actualIndex = musicIndexById.get(track.id);
    musicListContainer.appendChild(createMusicCardColumn(track, actualIndex, i * 0.06));
  });

  // 隐藏分页
  if (musicPaginationContainer) musicPaginationContainer.innerHTML = '';
}

// 渲染音乐分页控制器
function renderMusicPagination() {
  if (!musicPaginationContainer) return;
  
  const totalPages = Math.ceil(musicData.length / musicItemsPerPage);
  if (totalPages <= 1) {
    musicPaginationContainer.innerHTML = '';
    return;
  }
  
  let paginationHTML = '';
  
  // 上一页
  paginationHTML += '<button class="btn btn-sm btn-outline-primary page-btn" ' + (musicCurrentPage === 1 ? 'disabled' : '') + ' onclick="changeMusicPage(' + (musicCurrentPage - 1) + ')">' + ((window.LJYYTIcons && window.LJYYTIcons.chevronLeft) || '‹') + '</button>';
  
  // 页码逻辑
  const maxVisiblePages = 5;
  let startPage = Math.max(1, musicCurrentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  // 第一页
  if (startPage > 1) {
    paginationHTML += '<button class="btn btn-sm btn-outline-primary page-btn" onclick="changeMusicPage(1)">1</button>';
    if (startPage > 2) paginationHTML += '<span class="px-1 text-muted">...</span>';
  }
  
  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += '<button class="btn btn-sm ' + (i === musicCurrentPage ? 'btn-primary' : 'btn-outline-primary') + ' page-btn" onclick="changeMusicPage(' + i + ')">' + i + '</button>';
  }
  
  // 最后一页
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) paginationHTML += '<span class="px-1 text-muted">...</span>';
    paginationHTML += '<button class="btn btn-sm btn-outline-primary page-btn" onclick="changeMusicPage(' + totalPages + ')">' + totalPages + '</button>';
  }
  
  // 下一页
  paginationHTML += '<button class="btn btn-sm btn-outline-primary page-btn" ' + (musicCurrentPage === totalPages ? 'disabled' : '') + ' onclick="changeMusicPage(' + (musicCurrentPage + 1) + ')">' + ((window.LJYYTIcons && window.LJYYTIcons.chevronRight) || '›') + '</button>';
  
  // 跳转输入
  paginationHTML += '<div class="ms-3 d-flex align-items-center gap-2">' +
                      '<input type="number" id="jump-page-input" class="form-control form-control-sm" style="width: 60px;" min="1" max="' + totalPages + '" value="' + musicCurrentPage + '">' +
                      '<button class="btn btn-sm btn-primary" onclick="jumpToMusicPage()">跳转</button>' +
                    '</div>';
  
  musicPaginationContainer.innerHTML = paginationHTML;
}

// 切换页码
window.changeMusicPage = function(page) {
  const totalPages = Math.ceil(musicData.length / musicItemsPerPage);
  if (page < 1 || page > totalPages) return;
  musicCurrentPage = page;
  renderMusicList();
  
  // 滚动回音乐列表顶部
  const musicSection = document.getElementById('music');
  const musicContent = document.getElementById('music-content');
  if (musicSection || musicContent) {
    (musicSection || musicContent).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// 跳转到指定页
window.jumpToMusicPage = function() {
  const input = document.getElementById('jump-page-input');
  if (!input) return;
  const page = parseInt(input.value);
  changeMusicPage(page);
};

// 渲染视频列表 - 封面在上，标题在下
// 渲染视频列表
function renderVideoList() {
  console.log('🎬 开始渲染视频列表... 第', videoCurrentPage, '页');
  
  if (!videoListContainer) {
    return;
  }
  
  if (typeof videoData === 'undefined') {
    console.error('❌ videoData 未定义');
    videoListContainer.innerHTML = '<div class="col-12 text-center text-danger">视频数据未加载</div>';
    return;
  }
  
  const startIndex = (videoCurrentPage - 1) * videoItemsPerPage;
  const endIndex = startIndex + videoItemsPerPage;
  const currentVideoPageData = videoData.slice(startIndex, endIndex);
  
  if (videoData.length === 0) {
    console.warn('⚠️ videoData 为空');
    videoListContainer.innerHTML = '<div class="col-12 text-center text-warning">暂无视频数据</div>';
    return;
  }
  
  videoListContainer.innerHTML = '';
  
  currentVideoPageData.forEach(function(track, index) {
    var col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4 card-enter';
    col.style.animationDelay = (index * 0.06) + 's';
    
    var card = document.createElement('div');
    card.className = 'card video-card';
    card.dataset.id = track.id;
    card.dataset.index = index + startIndex;
    
    card.innerHTML = 
      '<div class="card-body p-0">' +
        '<div class="position-relative">' +
          '<img src="' + normalizeMediaUrl(track.cover) + '" alt="' + track.title + '" class="card-img-top" style="height: 200px; object-fit: cover;" loading="lazy" decoding="async">' +
          '<div class="position-absolute top-50 start-50 translate-middle">' +
            '<span class="video-play-icon text-white" style="opacity: 0.8;">' + ((window.LJYYTIcons && window.LJYYTIcons.play) || 'Play') + '</span>' +
          '</div>' +
          '<div class="position-absolute bottom-0 start-0 end-0 p-2" style="background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);">' +
            '<span class="text-white small">' + formatTime(track.duration) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="p-3">' +
          '<h6 class="card-title mb-1">' + track.title + '</h6>' +
          '<p class="card-text text-muted mb-0 small">' + renderArtistLinksHtml(track.artist) + '</p>' +
        '</div>' +
      '</div>';
    
    card.addEventListener('click', function() {
      window.location.href = 'video-player.html?id=' + track.id;
    });
    
    col.appendChild(card);
    videoListContainer.appendChild(col);
  });
  
  renderVideoPagination();
  console.log('✅ 视频列表渲染完成');
}

// 渲染视频分页控制器
function renderVideoPagination() {
  if (!videoPaginationContainer) return;
  
  const totalPages = Math.ceil(videoData.length / videoItemsPerPage);
  if (totalPages <= 1) {
    videoPaginationContainer.innerHTML = '';
    return;
  }
  
  let paginationHTML = '';
  
  // 上一页
  paginationHTML += '<button class="btn btn-sm btn-outline-primary page-btn" ' + (videoCurrentPage === 1 ? 'disabled' : '') + ' onclick="changeVideoPage(' + (videoCurrentPage - 1) + ')">' + ((window.LJYYTIcons && window.LJYYTIcons.chevronLeft) || '‹') + '</button>';
  
  // 页码逻辑 (5个可见)
  const maxVisiblePages = 5;
  let startPage = Math.max(1, videoCurrentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  if (endPage - startPage < maxVisiblePages - 1) startPage = Math.max(1, endPage - maxVisiblePages + 1);
  
  if (startPage > 1) {
    paginationHTML += '<button class="btn btn-sm btn-outline-primary page-btn" onclick="changeVideoPage(1)">1</button>';
    if (startPage > 2) paginationHTML += '<span class="px-1 text-muted">...</span>';
  }
  
  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += '<button class="btn btn-sm ' + (i === videoCurrentPage ? 'btn-primary' : 'btn-outline-primary') + ' page-btn" onclick="changeVideoPage(' + i + ')">' + i + '</button>';
  }
  
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) paginationHTML += '<span class="px-1 text-muted">...</span>';
    paginationHTML += '<button class="btn btn-sm btn-outline-primary page-btn" onclick="changeVideoPage(' + totalPages + ')">' + totalPages + '</button>';
  }
  
  // 下一页
  paginationHTML += '<button class="btn btn-sm btn-outline-primary page-btn" ' + (videoCurrentPage === totalPages ? 'disabled' : '') + ' onclick="changeVideoPage(' + (videoCurrentPage + 1) + ')">' + ((window.LJYYTIcons && window.LJYYTIcons.chevronRight) || '›') + '</button>';
  
  // 跳转输入
  paginationHTML += '<div class="ms-3 d-flex align-items-center gap-2">' +
                      '<input type="number" id="jump-video-page-input" class="form-control form-control-sm" style="width: 60px;" min="1" max="' + totalPages + '" value="' + videoCurrentPage + '">' +
                      '<button class="btn btn-sm btn-primary" onclick="jumpToVideoPage()">跳转</button>' +
                    '</div>';
  
  videoPaginationContainer.innerHTML = paginationHTML;
}

// 切换视频页码
window.changeVideoPage = function(page) {
  const totalPages = Math.ceil(videoData.length / videoItemsPerPage);
  if (page < 1 || page > totalPages) return;
  videoCurrentPage = page;
  renderVideoList();
  
  const videoSection = document.getElementById('video');
  const videoContent = document.getElementById('video-content');
  if (videoSection || videoContent) {
    (videoSection || videoContent).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// 跳转到指定视频页
window.jumpToVideoPage = function() {
  const input = document.getElementById('jump-video-page-input');
  if (!input) return;
  const page = parseInt(input.value);
  changeVideoPage(page);
};

// 初始化播放器事件监听
function initPlayerEvents() {
  console.log('🎧 初始化播放器事件监听...');
  
  // 播放按钮
  if (playBtn) {
    playBtn.addEventListener('click', togglePlay);
  }
  
  // 上一首按钮
  if (prevBtn) {
    prevBtn.addEventListener('click', prevTrack);
  }
  
  // 下一首按钮
  if (nextBtn) {
    nextBtn.addEventListener('click', nextTrack);
  }
  
  // 进度条点击
  if (progressContainer) {
    progressContainer.addEventListener('click', setProgress);
  }
  
  // 音量滑块
  if (volumeSlider) {
    volumeSlider.addEventListener('input', setVolume);
  }
  
  // 音频播放器事件
  if (audioPlayer) {
    audioPlayer.addEventListener('timeupdate', updateProgress);
    // ended 事件由 player_enhanced.js 处理（支持播放模式）
    audioPlayer.addEventListener('loadedmetadata', function() {
      totalTimeEl.textContent = formatTime(audioPlayer.duration);
    });
    // 缓冲状态
    audioPlayer.addEventListener('waiting', function() {
      if (isPlaying) {
        playBtn.innerHTML = (window.LJYYTIcons && window.LJYYTIcons.spinner) || '...';
      }
    });
    audioPlayer.addEventListener('canplay', function() {
      playBtn.innerHTML = isPlaying
        ? ((window.LJYYTIcons && window.LJYYTIcons.pause) || 'Pause')
        : ((window.LJYYTIcons && window.LJYYTIcons.play) || 'Play');
    });
  }
  
  console.log('✅ 播放器事件监听初始化完成');
}

// 页面隐藏时保存状态（切换标签页等情况）
document.addEventListener('visibilitychange', function() {
  if (document.hidden && typeof isPlaying !== 'undefined' && typeof audioPlayer !== 'undefined' && audioPlayer && typeof musicData !== 'undefined' && musicData[currentTrackIndex]) {
    persistCurrentPlayerState(musicData[currentTrackIndex], audioPlayer.currentTime, isPlaying, audioPlayer.volume);
  }
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 DOM加载完成，开始初始化...');
  const isPlayerPage = !!(document.body && document.body.classList.contains('music-player-page'));
  
  // 检测并设置滚动条宽度
  detectScrollbarWidth();
  
  if (!isPlayerPage) {
    // 首页才需要在初始化阶段渲染完整的音乐/视频入口区块
    renderMusicList();
    renderVideoList();
  } else {
    console.log('⏭️ 播放器页跳过首页重型列表初始化，交给 music_player_page.js 接管');
  }
  
  // 初始化播放器事件监听
  initPlayerEvents();
  
  // 初始化搜索功能
  if (!isPlayerPage) {
    initSearch();
  }
  
  // 检查是否有保存的播放状态
  console.log('🔍 检查是否有保存的播放状态...');
  if (typeof hasSavedPlayerState === 'function' && hasSavedPlayerState()) {
    console.log('✅ 检测到保存的播放状态');
    const savedState = restorePlayerState();
    if (savedState && savedState.trackData) {
      console.log('📥 恢复播放状态:', savedState.trackData.title);
      console.log('📊 状态详情 - 歌曲ID:', savedState.trackId);
      console.log('📊 状态详情 - 播放时间:', savedState.currentTime);
      console.log('📊 状态详情 - 音量:', savedState.volume);
      console.log('📊 状态详情 - 播放状态:', savedState.isPlaying);
      
      // 找到对应的歌曲索引
      const trackIndex = musicData.findIndex(function(track) {
        return track.id === savedState.trackId;
      });
      
      if (trackIndex !== -1) {
        currentTrackIndex = trackIndex;
        loadTrack(currentTrackIndex);
        
        // 恢复播放位置 - 等音频元数据加载完成
        if (savedState.currentTime > 0) {
          audioPlayer.addEventListener('loadedmetadata', function onMeta() {
            audioPlayer.removeEventListener('loadedmetadata', onMeta);
            audioPlayer.currentTime = savedState.currentTime;
            console.log('⏱️ 恢复播放进度:', savedState.currentTime);
          });
        }
        
        // 恢复音量
        if (savedState.volume !== undefined) {
          audioPlayer.volume = savedState.volume;
          if (volumeSlider) {
            volumeSlider.value = savedState.volume;
          }
          console.log('🔊 恢复音量:', savedState.volume);
        }
        
        // 如果之前在播放，则继续播放
        if (savedState.isPlaying) {
          // 尝试自动播放
          var playPromise = audioPlayer.play();
          
          if (playPromise !== undefined) {
            playPromise.then(function() {
              isPlaying = true;
              updatePlayButton();
              console.log('▶️ 自动恢复播放成功');
            }).catch(function(error) {
              console.log('⚠️ 自动播放被阻止，等待用户交互:', error);
              // 即使自动播放失败，也保持暂停状态，但更新UI显示为暂停
              isPlaying = false;
              updatePlayButton();
            });
          }
        }
        
        console.log('✅ 播放状态已恢复');
        window._playerStateRestored = true;
      } else {
        console.log('⚠️ 未找到对应的歌曲，加载第一首');
        window._playerStateRestored = true;
        if (musicData.length > 0) {
          loadTrack(0);
        }
      }
    }
  } else {
    // 默认加载第一首歌
    if (musicData.length > 0) {
      loadTrack(0);
      console.log('✅ 已加载第一首歌:', musicData[0].title);
    }
  }
  
  console.log('✅ 页面初始化完成');
  console.log('🎵 音乐数量:', musicData.length);
  console.log('🎬 视频数量:', typeof videoData !== 'undefined' ? videoData.length : '未定义');
  
  // 添加页面卸载事件监听器，确保状态被保存
  window.addEventListener('beforeunload', function() {
    if (musicData[currentTrackIndex]) {
      persistCurrentPlayerState(musicData[currentTrackIndex], audioPlayer.currentTime, isPlaying, audioPlayer.volume);
      console.log('🔄 页面卸载前保存播放器状态');
    }
  });
  
  // 定期保存播放状态（每30秒）
  setInterval(function() {
    if (musicData[currentTrackIndex]) {
      persistCurrentPlayerState(musicData[currentTrackIndex], audioPlayer.currentTime, isPlaying, audioPlayer.volume);
      console.log('⏰ 定期保存播放器状态');
    }
  }, 30000); // 30秒保存一次
});

// 搜索功能
function initSearch() {
  console.log('🔍 初始化搜索功能...');
  
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  
  if (!searchForm || !searchInput) {
    console.warn('搜索表单不存在，跳过公共搜索初始化');
    return;
  }
  
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    
    if (!query) {
      return;
    }
    
    console.log('🔍 切换到发现页:', query);
    
    // 跳转前强制保存播放状态
    if (typeof isPlaying !== 'undefined' && typeof audioPlayer !== 'undefined' && audioPlayer && typeof musicData !== 'undefined' && musicData[currentTrackIndex]) {
      persistCurrentPlayerState(musicData[currentTrackIndex], audioPlayer.currentTime, isPlaying, audioPlayer.volume);
    }
    
    // 统一进入 index 内的“发现”Tab，避免独立 search.html 与移动端 app 状态不一致
    window.location.href = 'index.html?view=search&q=' + encodeURIComponent(query);
  });
  
  console.log('✅ 搜索功能初始化完成');
}

// 检测滚动条宽度并应用到CSS变量
function detectScrollbarWidth() {
  // 创建一个临时元素来测量滚动条宽度
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.msOverflowStyle = 'scrollbar';
  document.body.appendChild(outer);
  
  const inner = document.createElement('div');
  outer.appendChild(inner);
  
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  
  // 设置CSS变量
  document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
  
  console.log('📏 检测到滚动条宽度:', scrollbarWidth);
  
  // 应用滚动条宽度到导航栏和播放器
  const navbar = document.querySelector('.navbar');
  const bottomPlayer = document.querySelector('.bottom-player');
  
  if (navbar) {
    navbar.style.right = scrollbarWidth + 'px';
    navbar.style.left = '0';
  }
  
  if (bottomPlayer) {
    bottomPlayer.style.right = scrollbarWidth + 'px';
    bottomPlayer.style.left = '0';
  }
}

// 渲染过滤后的音乐列表
function renderFilteredMusicList(filteredData) {
  console.log('🎵 渲染过滤后的音乐列表... 共', filteredData.length, '条');
  
  if (!musicListContainer) {
    console.warn('musicListContainer 未找到，跳过过滤列表渲染');
    return;
  }
  
  musicListContainer.innerHTML = '';
  
  if (filteredData.length === 0) {
    musicListContainer.innerHTML = '<div class="col-12 text-center text-muted py-5">未找到匹配的音乐</div>';
    if (musicPaginationContainer) musicPaginationContainer.innerHTML = '';
    return;
  }
  
  filteredData.forEach(function(track) {
    const originalIndex = musicIndexById.get(track.id);
    musicListContainer.appendChild(createMusicCardColumn(track, originalIndex, 0));
  });
  
  if (musicPaginationContainer) musicPaginationContainer.innerHTML = '';
}

