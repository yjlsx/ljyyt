// 修复版脚本
console.log('🚀 script_fixed.js 开始加载');

// 音乐数据
const musicData = [
  {
      id: 1,
      "title": "赵郑芝 - 故乡谣",
      "artist": "赵郑芝",
      "album": "纳西音乐精选",
      "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk4MDU=",
      "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NrCAYkYXuqd1OjLa4qTZNmGWIuQiapFCLO1tPsE7z23p6wm9sPlvaCCRcS4B2k3bZPdnbVU9UrWh4EXORhQdo31QxAYm2cdc2M/0?wx_fmt=jpeg",
      "duration": 252
    },
  {
      id: 2,
      "title": "金甲劲松 - 无名的歌",
      "artist": "金甲劲松",
      "album": "纳西音乐精选",
      "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk4MDM=",
      "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OiaKHq5SAeC4icvDibghb4zqYwkLgfIybSes3n452PvQZ8r2SXibZBg3lKUpicTrtFY2sn5syJeP20hIibuDZwTIFXvr9SDklwMRWWo/0?wx_fmt=jpeg",
      "duration": 201
    },
  {
      id: 3,
      "title": "和圣福 和丽龙 和丽霞 和雪芹 - 五台之歌",
      "artist": "和圣福 和丽龙 和丽霞 和雪芹",
      "album": "纳西音乐精选",
      "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk3NzQ=",
      "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NsBgRKarJntvQM8IrSr32QZQTu1ef9xyxNUDLAiaTAreTv6Ozw4u4icEib7Z7aRHEPiciaJEeKZnSAscGrVKwYNIby39piaoEkLANHU/0?wx_fmt=jpeg",
      "duration": 220
    },
  {
      id: 4,
      "title": "肖煜光 - 达瓦纳西努2026",
      "artist": "肖煜光",
      "album": "纳西音乐精选",
      "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk3NDk=",
      "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9AXiaoEDgm0jakstwgVqBg9s2IwsKepeRGV2brFvkkKomB1E60Be3iaVzLXmysBOUqG4PmccjTiawYA/0?wx_fmt=jpeg",
      "duration": 224
    },
  {
      id: 5,
      "title": "和雪兰 - 吉祥的日子",
      "artist": "和雪兰",
      "album": "纳西音乐精选",
      "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk1ODI=",
      "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVic8Y7J4gj1eLOpBTqic5g3IR62s444BlEibp8xGFR1np4jC42ZefZZHq5ic0HUYkb2pbKibWAPPjfNQBg/0?wx_fmt=jpeg",
      "duration": 245
    },
  {
      id: 6,
      "title": "和锦 - 阿腊古金歌",
      "artist": "和锦",
      "album": "纳西音乐精选",
      "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAyODY=",
      "cover": "https://mmbiz.qlogo.cn/mmbiz_jpg/tfpibRIwbCVic7GpubRvt0gvUxs0rRxbEePTFjQE9zjNNjueQYuKk6s9ibOODUMfY4XlxKjxiaU4So1NnlU3Sg9GFg/0?wx_fmt=jpeg",
      "duration": 240
    },
  {
      id: 7,
      "title": "习东梅 - 白水台",
      "artist": "习东梅",
      "album": "纳西音乐精选",
      "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMjIx",
      "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7PGN6N6AqSf2gJ8lvnwnyiaIib4ibDmdHxpNoWkiaXtBlR4SqBLJibmMZRWOwCFofkfb0SfrrEs7jWPK51MJq5U6nhibiawbWviaCNXJA4/640?wx_fmt=png&amp;from=appmsg",
      "duration": 200
    },
  {
      id: 8,
      "title": "和顺东 - 我的父亲母亲",
      "artist": "和顺东",
      "album": "纳西音乐精选",
      "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMjAz",
      "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib5wQ6puTht2pPhmAJXKeYGYUzx2EnicQyyMmGMJTDzo14bQM8ofv9Iw4Qfzh0fzknjw6JiakXwI9Bg/0?wx_fmt=jpeg",
      "duration": 220
    },
  {
      id: 9,
      title: "和丽霞 - 纳西若",
      artist: "和丽霞",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMTgy",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib9xXQ0tp4hgAnCwFX2MoclXK9RdTNtb3skg3kEwtCA29escvTr8C4DwsvQqqDLSnh6k8FJkTibZ3Q/0?wx_fmt=jpeg",
      duration: 246
    },
  {
      id: 10,
      title: "阿花蜜、纳西蕾蕾 - 欢聚",
      artist: "阿花蜜、纳西蕾蕾",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMTQ4",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8blmXDtvjo9PicNibWxuKUU4JXTbw5Pr2q5sTalOr5mrgyZoShocde9IeGrL0JScM9jIzIAhd2iaxWg/0?wx_fmt=jpeg",
      duration: 216
    },
  {
      id: 11,
      title: "和春艳 - 迎客欢歌",
      artist: "和春艳",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMTE2",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9JKP2nuDdxTWlNR3cAD7DmPHrpBfqX7iawCibCibdsPWc8c3MoO9tJibdU9sAmjUZ8jHkyhlE0IXAjrQ/0?wx_fmt=jpeg",
      duration: 241
    },
  {
      id: 12,
      title: "彩菊 - 孝敬父母",
      artist: "彩菊",
      album: "纳西音乐精选",
      src: "https://music.ghg.ink/api/music?url=https://example.com/music/lijiang-bazi.mp3",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib5rbEQTYdVcSiaWU5V3puvZAicjicB8hsNBE9XBRHtyp1VpAshvibxQoBfWQ/0?wx_fmt=jpeg",
      duration: 200
    },
  {
      id: 13,
      title: "和锦 - 四时吉祥",
      artist: "和锦",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMDg0",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8uU6y3XH97VVGyv87ia8w0T35WvWY1Gs5M4sLAiaCwUm0BRibV7F7iccQRGkwDLSDxQBrFYkajzDbHAA/0?wx_fmt=jpeg",
      duration: 256
    },
  {
      id: 14,
      title: "天龙 - 纳西欢歌",
      artist: "天龙",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMDY0",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibx6Z7eJJADYAPsJNe76NaBGrVJtGKx8ESzGTwKTSqrkal93XnrDggprhhfHaPtN3ubIH86ZMTA1w/0?wx_fmt=jpeg",
      duration: 247
    },
  {
      id: 15,
      title: "天龙 - 兄弟情",
      artist: "天龙",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMDUx",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicHjxIhu6g56y5PkMEAvcib0uKNjujPQicdg7eK3FS6M2HjrWhlbGRR3SSbia2d7F16htwYtJ8ricTcWQ/0?wx_fmt=jpeg",
      duration: 224
    },
  {
      id: 16,
      title: "幸福生活唱不完",
      artist: "涵蜜金组合",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMDUz",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9n5FgoMoAbliaCreicUXzDvE2gNLnYF9HONCyaQxiaDu8OgAlouTT0PEo6iabm657bfrA9QIrUibQ7Txw/0?wx_fmt=jpeg",
      duration: 190
    },
  {
      id: 17,
      title: "寒雨 - 牵挂",
      artist: "寒雨",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMDUy",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVich7dW7dqv73P5wzJRRU3c8EzBJaAiaghYgjWsxSCXhe24cJbSUzojN6ekcAOwZDfzyKEt2IxbJsXw/0?wx_fmt=jpeg",
      duration: 228
    },
  {
      id: 18,
      title: "和艳 - 欢乐的阿哩哩",
      artist: "和艳",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMDM3",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibeFzk8VVBC2DlnYicjt64ILw05niczrOwlYzDr1Qoh3ErSTeUb37BjHicysV5snMdiblia5JYa97ibyj0w/0?wx_fmt=jpeg",
      duration: 254
    },
  {
      id: 19,
      title: "啊秋 - 祈望",
      artist: "啊秋",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMDEy",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicHRE7coWtYeiaM1qeiaXkmE5NrYtvAIXF5kJGE3zbRvmTdCQUbQZxFz7nWCJyfjEZTibuKBBNrbXQPQ/0?wx_fmt=jpeg",
      duration: 245
    },
  {
      id: 20,
      title: "和慧琼 - 党情冷么密",
      artist: "和慧琼",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMDEz",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
      duration: 322
    },
  {
      id: 21,
      title: "天龙 - 人生",
      artist: "天龙",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyOTgy",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFDM5Plb6FJQrC8d22fhcpW0PFiciaJTO6eiaX5Ul0ibBCibI7icGKUBNfgNHw/0?wx_fmt=jpeg",
      duration: 302
    },
  {
      id: 22,
      title: "和文军 - 相伴调",
      artist: "和文军",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyOTYw",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibV6ibEicbKg5SZ4xlf8nQQdjVJdWiaUiamXSIn7UCEuUII9ALM1T2Lmp96I0CPLNmyWsljUxnjYWqxKg/0?wx_fmt=jpeg",
      duration: 297
    },
  {
      id: 23,
      title: "和锦 - 四时吉祥",
      artist: "和锦",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMDg0",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8uU6y3XH97VVGyv87ia8w0T35WvWY1Gs5M4sLAiaCwUm0BRibV7F7iccQRGkwDLSDxQBrFYkajzDbHAA/0?wx_fmt=jpeg",
      duration: 256
    },
  {
      id: 24,
      title: "玉龙雪山的牧童",
      artist: "和楚雄",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyOTg0",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8ZnD9MUwnUxsSEFZJwMIzPACZXS0fv1Pnhjez7qdwWUGf4Jaw7IgrC8VMqvG4qicz7RJLUFwfYdUw/0?wx_fmt=jpeg",
      duration: 266
    },
  {
      id: 25,
      title: "丽江小龙 - 舞动丽江",
      artist: "丽江小龙",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyOTYx",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibpWhgWegkEx3ssnfMQibnp2VtMEAElpO8TfhjqM9DaohId2mHiawD69WZT83abibwibxjxlHFkEhx28g/0?wx_fmt=jpeg",
      duration: 298
    },
  {
      id: 26,
      title: "和雪芹 - 心里的家",
      artist: "和雪芹",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyOTQy",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibbicbntchMGnLyuf89OtYLd8d84uUCE4UwH3iclMkZmOLJFKka8I2VyTaaddNwbWhF7XgMo68SAw0Q/0?wx_fmt=jpeg",
      duration: 284
    },
  {
      id: 27,
      title: "阿夏丽 - 莫忘恩情",
      artist: "阿夏丽",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyOTI1",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibibYibvlic8PD6IUbib87iaVJt9mU4BGFO1iblcAHSoPsVzjy6rkwhIoasE5cNAbINQPibicrzEa3icX98cJA/0?wx_fmt=jpeg",
      duration: 233
    },
  {
      id: 28,
      title: "李承翰 - 纳西情歌",
      artist: "李承翰",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyOTI2",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8EWzb0KFzwicXFx448RArgicfZ6FBib8xbYzEXrb2ncfJdxGOLibk8cNZ7ic4qe7JspECs4UytIdBQX8A/0?wx_fmt=jpeg",
      duration: 163
    },
  {
      id: 29,
      title: "和生辉 - 歌唱长水",
      artist: "和生辉",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODkz",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZBZ2v17qhuaicT5jTtHLglu4ucxhcrndVg2j0Ric7vr1Bptz8zFAicIiclfv9urOBK8ZoibISfx2hgDQ/0?wx_fmt=jpeg",
      duration: 265
    },
  {
      id: 30,
      title: "肖煜光 - 达瓦纳西努2025",
      artist: "肖煜光",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODc5",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9AXiaoEDgm0jakstwgVqBg9s2IwsKepeRGV2brFvkkKomB1E60Be3iaVzLXmysBOUqG4PmccjTiawYA/0?wx_fmt=jpeg",
      duration: 229
    },
  {
      id: 31,
      title: "金锁丽泉 - 塔城姑娘美",
      artist: "金锁丽泉",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODY0",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJib5VIeyWqSia1KULW22Zq6AyDXvQhiambwyyg9ic6ic0AvliakWicIrnD5Dwg/0?wx_fmt=jpeg",
      duration: 249
    },
  {
      id: 32,
      title: "和锦 - 百草飘香的地方",
      artist: "和锦",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODY1",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJFsMemI3L9a7ia703l2xww98I5iaDCYukYiaqJIwFUOicfttgV0M6ia504wg/0?wx_fmt=jpeg",
      duration: 224
    },
  {
      id: 33,
      title: "庭松 - 盛世欢歌",
      artist: "庭松",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODY2",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJzooL7Za1iaicW3GyFkN7b1YUqjpJLt50aV1Q4zpwzpbpGzyicNAwibia1tA/0?wx_fmt=jpeg",
      duration: 291
    },
  {
      id: 34,
      title: "和瑞智 - 玉龙神韵",
      artist: "和瑞智",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODMz",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibxVULERGyrN6EQ90hiasHQyJuianJ6zhgCwhr8iakCceqHdC3icV29ubH2nks3zPG3HbSNxPERiaDibnSA/0?wx_fmt=jpeg",
      duration: 429
    },
  {
      id: 35,
      title: "树润花 - 姿姿好时获",
      artist: "树润花",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODM0",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibxVULERGyrN6EQ90hiasHQyPj2vQn42pXSwfC9iaz1mxSNLib8QWKYu1AK7eNLVB12f8VGDNpTfc2Gg/0?wx_fmt=jpeg",
      duration: 217
    },
  {
      id: 36,
      title: "和慧琼、和燕、李九铭、马涛 - 桃园送别调",
      artist: "和慧琼、和燕、李九铭、马涛",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODA4",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVich7dW7dqv73P5wzJRRU3c8SNnIwBQaKta1q2nAuD0XAXye1Oib7MjtuzQXqic7Toxp1DQR0Bq1qaow/0?wx_fmt=jpeg",
      duration: 193
    },
  {
      id: 37,
      title: "纳西蕾蕾 - 我愿",
      artist: "纳西蕾蕾",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODA5",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVich7dW7dqv73P5wzJRRU3c8Jp1Cofiaxwufp4Ijibsp58XBbTWlsHHjJbq3NMlnqkRxmN8sRD5Rq9icQ/0?wx_fmt=jpeg",
      duration: 258
    },
  {
      id: 38,
      title: "纳西蕾蕾 - 我愿",
      artist: "纳西蕾蕾",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODA5",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVich7dW7dqv73P5wzJRRU3c8Jp1Cofiaxwufp4Ijibsp58XBbTWlsHHjJbq3NMlnqkRxmN8sRD5Rq9icQ/0?wx_fmt=jpeg",
      duration: 258
    },
  {
      id: 39,
      title: "金甲劲松 - 石鼓响天下",
      artist: "金甲劲松",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODEx",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicybGeZMBCpLThFRC1qJ6n3dicJibmOCJdUQJyic6kBggy2P9dvv9EsPpRibO7m4hcaC6Hic6Yk5ziafE4Q/0?wx_fmt=jpeg",
      duration: 261
    },
  {
      id: 40,
      title: "阿花蜜 - 相依相守",
      artist: "阿花蜜",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNzc5",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2Yyfsaa9s7wricmZwjUiazyzySibC1aUfJl93KI2dslSLmGPqdl06XJyZLrg/0?wx_fmt=jpeg",
      duration: 240
    },
  {
      id: 41,
      title: "和善武 - 爸美汝实贺",
      artist: "和善武",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNzgw",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV97ht8vllhIdlyWx26j1VMibhw32CVXUaBhibGnfmbqcF5tW0kTb0NTYaKycFseg4GUz2SD7IJhqqog/0?wx_fmt=jpeg",
      duration: 252
    },
  {
      id: 42,
      title: "李承翰 - 纳西新劝世歌",
      artist: "李承翰",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNzgx",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
      duration: 301
    },
  {
      id: 43,
      title: "木贵花 - 愿",
      artist: "木贵花",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNzM0",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9S1icwGutOXntH2hIme4hicGiaWvUBZeOSnY15XwxZxBFhicFf8oB94P1S3GqUSr07YFnPFhaQgP0Plw/0?wx_fmt=jpeg",
      duration: 308
    },
  {
      id: 44,
      title: "和上钧&阿诛 - 玉龙雪山的故事",
      artist: "和上钧&阿诛",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNzM1",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9S1icwGutOXntH2hIme4hicGuYQBIyxB3IAbSZt9DpQ1huGntkSwYoiaylld4HubCib6aR9zN6uZqibng/0?wx_fmt=jpeg",
      duration: 351
    },
  {
      id: 45,
      title: "达坡玛吉 - 纳西酒歌",
      artist: "达坡玛吉",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNzM2",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9S1icwGutOXntH2hIme4hicGwdIwLV3uYgmicUCTXfnwQIOhVHoicl0iaZ1icE4LLUTMu2zRhJKrt7XOsA/0?wx_fmt=jpeg",
      duration: 161
    },
  {
      id: 46,
      title: "祖先 - 金甲劲松",
      artist: "金甲劲松",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNzA1",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV86SbIE21sVic6BrKXNN7GquK9A4XRHUuJubjCuice2sML1RxTE827cZYpN6iatkbTtKT0ricFFTts2Xg/0?wx_fmt=jpeg",
      duration: 302
    },
  {
      id: 47,
      title: "和文军 - 依恋的家园",
      artist: "和文军",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNzA2",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicuNH092cxUKSRmibSAEzj2ck4icK1MjXRD0CcpWzlzybQDY1qAbRPmhDdfA7t7ox0OpM8ZnvCISvrg/0?wx_fmt=jpeg",
      duration: 321
    },
  {
      id: 48,
      title: "和慧琼 - 白云曲",
      artist: "和慧琼",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNzA3",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeP736tOJ9libibeVbmVe43mqTiaDbnCu7kO7PwxDSib1LbGFGrialTk8Jqfg/0?wx_fmt=jpeg",
      duration: 193
    },
  {
      id: 49,
      title: "丽江阿黑哥 - 相逢三杯酒",
      artist: "丽江阿黑哥",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjkz",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV97ht8vllhIdlyWx26j1VMibOhbcl452eG4o1oiaJ6U9jCJJPvYmSXyqKvias9oiakqAdBMJGOn1twmFQ/0?wx_fmt=jpeg",
      duration: 240
    },
  {
      id: 50,
      title: "纳浫阿福 - 满子周固男",
      artist: "纳浫阿福",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjk1",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV97ht8vllhIdlyWx26j1VMibyls3YsETR1uMwM0hL9MUZU7ww54HYmanHibL6yOgUBjZY1S4zfh1AsA/0?wx_fmt=jpeg",
      duration: 242
    },
  {
      id: 51,
      title: "墨尚七 - 不放手",
      artist: "墨尚七",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjU3",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVib1v0HXRGlDicQuO0pv0n0kUxOia7UIe1duJlYiaEOwJ8iaJ8tNjZcMPR8HL5gdfwYpibduZfLyVpziaibRw/0?wx_fmt=jpeg",
      duration: 253
    },
  {
      id: 52,
      title: "山人行组合 - 三月花开时",
      artist: "山人行组合",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjU4",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicGIiaRABDKvq3h2vrqYnzCQFJibmIoUo41Vpiaia50BboI9ST29yCP0qt6cSpg9lrtLfngdQ1BRQLedA/0?wx_fmt=jpeg",
      duration: 247
    },
  {
      id: 53,
      title: "和丽刚 - 菩捞阿姆",
      artist: "和丽刚",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjU5",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibB5Ul7wGRIO7t65TgLIxmBG0ibPbcbFMY7hwKQ1jG2plRKc1teOPB40apiagNnBibAzALlbs830s3mQ/0?wx_fmt=jpeg",
      duration: 308
    },
  {
      id: 54,
      title: "和慧琼 - 花落流年",
      artist: "和慧琼",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjYw",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeP736tOJ9libibeVbmVe43mqTiaDbnCu7kO7PwxDSib1LbGFGrialTk8Jqfg/0?wx_fmt=jpeg",
      duration: 229
    },
  {
      id: 55,
      title: "阿泉 - 纳西火把节",
      artist: "阿泉",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjUx",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9o4HTgRx4AV3LduianWdhYWSCHWWZaIlw5T5vjANjnicuRUmCS1zaGBvJC0P5z0LyKKHQQqMqJynkA/0?wx_fmt=jpeg",
      duration: 244
    },
  {
      id: 56,
      title: "和慧琼 - 归期",
      artist: "和慧琼",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjUy",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeP736tOJ9libibeVbmVe43mqTiaDbnCu7kO7PwxDSib1LbGFGrialTk8Jqfg/0?wx_fmt=jpeg",
      duration: 242
    },
  {
      id: 57,
      title: "涵蜜金组合 - 摩梭山歌",
      artist: "涵蜜金组合",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjI0",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasyOXmPL0dJQrLYicMeaf2VZh1gEWUD3iaRgBwJMa6vpuE5YxH6uMeyC4w/0?wx_fmt=jpeg",
      duration: 294
    },
  {
      id: 58,
      title: "和慧琼 - 阿哩哩花花色",
      artist: "和慧琼",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjI1",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeP736tOJ9libibeVbmVe43mqTiaDbnCu7kO7PwxDSib1LbGFGrialTk8Jqfg/0?wx_fmt=jpeg",
      duration: 265
    },
  {
      id: 59,
      title: "涵蜜金组合 - 绿色出行歌",
      artist: "涵蜜金组合",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjI3",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasyOXmPL0dJQrLYicMeaf2VZh1gEWUD3iaRgBwJMa6vpuE5YxH6uMeyC4w/0?wx_fmt=jpeg",
      duration: 214
    },
  {
      id: 60,
      title: "李丽芳 - 恩难忘",
      artist: "李丽芳",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNTcy",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeicFPYCIsUnpGhVggsu0sRWh2pNoyHGUhGWcvCfpaibbAZK8Wvdo1w0kA/0?wx_fmt=jpeg",
      duration: 308
    },
  {
      id: 61,
      title: "郑旭先 - 纳西潘金妹",
      artist: "郑旭先",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNTcz",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeO60VGZTzZxUFicUa24giangIEfricdYUOibr9RgKTiaPZicgAHSWrUCDvJWw/0?wx_fmt=jpeg",
      duration: 186
    },
  {
      id: 62,
      title: "王瑞香 - 春之歌",
      artist: "王瑞香",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNTc0",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xecOULzOI69StzBgQ6mOOLg59I32q7ZeNJyJ1rRdDwrCYNcRiamMAVHRg/0?wx_fmt=jpeg",
      duration: 288
    },
  {
      id: 63,
      title: "李丽芳 - 夏之歌",
      artist: "李丽芳",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNTc1",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeIFmWo5Btnib93XKpA0PnyX4eqdiaYap4WlQIWIEX4gm1swDVWbK9R9icA/0?wx_fmt=jpeg",
      duration: 269
    },
  {
      id: 64,
      title: "杨耀兰 - 秋之歌",
      artist: "杨耀兰",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNTc2",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xegPLtiaS4icmPj04FTLrLkUgSTqmaKicfty0vlzibXJIibAGGf39XQAD98bQ/0?wx_fmt=jpeg",
      duration: 264
    },
  {
      id: 65,
      title: "郑旭先 - 冬之歌",
      artist: "郑旭先",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNTc3",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeJyNibQGibsibIzgQXfTRjdIcfq5ibwGc5kqdjcSgbOnKib8bgr7SoSQcqWw/0?wx_fmt=jpeg",
      duration: 229
    },
  {
      id: 66,
      title: "阿福 - 歌颂党情",
      artist: "阿福",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNDcz",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicuNH092cxUKSRmibSAEzj2cUhnsRqHO6dXAhCPChjxnM0g5oXECiavGwp8lmocAZqppouGnaytI7uw/0?wx_fmt=jpeg",
      duration: 201
    },
  {
      id: 67,
      title: "玉龙山组合 - 欢聚在一起",
      artist: "玉龙山组合",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNDM5",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibIMDjOsicflltuJKnaJDBhWqRia5KkRlsTOomu2qFxnwbpE0xQYJXuH7IHjG2gLpTvA1lOvrAb1cIw/0?wx_fmt=jpeg",
      duration: 204
    },
  {
      id: 68,
      title: "和善武、金顺- 鱼水相会",
      artist: "金顺",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NjI=",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
      duration: 181
    },
  {
      id: 69,
      title: "金顺 - 勒巴舞唱腔",
      artist: "金顺",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NjM=",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
      duration: 322
    },
  {
      id: 70,
      title: "金顺 - 劝世歌",
      artist: "金顺",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NjQ=",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
      duration: 173
    },
  {
      id: 71,
      title: "金顺 - 兴余花华色",
      artist: "金顺",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NjU=",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
      duration: 279
    },
  {
      id: 72,
      title: "金顺 - 游子的心",
      artist: "金顺",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NjY=",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
      duration: 246
    },
  {
      id: 73,
      title: "金顺- 沧桑的诺言",
      artist: "金顺",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2Njc=",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
      duration: 291
    },
  {
      id: 74,
      title: "金顺- 沧桑的诺言",
      artist: "金顺",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2Njc=",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
      duration: 291
    },
  {
      id: 75,
      title: "金顺- 次里次姆",
      artist: "金顺",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzA=",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
      duration: 244
    },
  {
      id: 76,
      title: "金顺- 打跳联唱",
      artist: "金顺",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzE=",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
      duration: 416
    },
  {
      id: 77,
      title: "金顺- 红叶傲霜",
      artist: "金顺",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzI=",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
      duration: 330
    },
  {
      id: 78,
      title: "金顺- 回到我身边",
      artist: "金顺",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzM=",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
      duration: 173
    },
  {
      id: 79,
      title: "金顺- 悄然前行",
      artist: "金顺",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzQ=",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
      duration: 249
    },
  {
      id: 80,
      title: "金顺- 三月百花开",
      artist: "金顺",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzU=",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
      duration: 217
    },
  {
      id: 81,
      title: "金顺、和秀山 - 塔城纳西民歌",
      artist: "金顺",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzY=",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
      duration: 223
    },
  {
      id: 82,
      title: "和丽刚 - 姿磋",
      artist: "和丽刚",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAwNjMw",
      cover: "https://xcx.lijiangmusic.com/upload/1/20230704/e72e7ecf0ee0ebaa5d6b20033297ff29.jpg",
      duration: 320
    },
  {
    id: 83,
    title: "陈四才 - 我是玉龙山上的牧童",
    artist: "陈四才",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAxOTc3",
    cover: "https://xcx.lijiangmusic.com/upload/1/20230702/eabaac2f65bd2809f0520d7782fd481a.jpg",
    duration: 266,
  },
  {
    id: 84,
    title: "玉龙山组合、金沙姑娘组合-梦想成真",
    artist: "玉龙山组合、金沙姑娘组合",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0NDU=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    duration: 232,
  },
  {
    id: 85,
    title: "和春艳 - 迎客欢歌",
    artist: "和春艳",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0NTU=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9JKP2nuDdxTWlNR3cAD7DmAC3sXLb9JCyKzqv5Lp8opC0iaKbB8UV95et393MIHlWm0yjvPvgApOg/0?wx_fmt=jpeg",
    duration: 241,
  },
  {
    id: 86,
    title: "和雪芹 - 心里的家",
    artist: "和雪芹",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkyODc=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibbicbntchMGnLyuf89OtYLdbEeyxzHKFhcheIbvQfy3yTsQR8GID9xJCSU6G2VZKicsnyRTp1T0U4A/0?wx_fmt=jpeg",
    duration: 284,
  },
  {
    id: 87,
    title: "丽江福铃组合 - 纳西姑娘美",
    artist: "丽江福铃组合",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkzNjM=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicHRE7coWtYeiaM1qeiaXkmE5gZnDkXMPyicr0kKqlOLmAer7KNicHic0teWhicAsJsuYEibF0gbZfHt4vDw/0?wx_fmt=jpeg",
    duration: 230,
  },
  {
    id: 88,
    title: "纳浫阿福 - 满子周固男",
    artist: "纳浫阿福",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkwMzk=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV97ht8vllhIdlyWx26j1VMibyls3YsETR1uMwM0hL9MUZU7ww54HYmanHibL6yOgUBjZY1S4zfh1AsA/0?wx_fmt=jpeg",
    duration: 242,
  },
  {
    id: 89,
    title: "丽江阿黑哥 - 相逢三杯酒",
    artist: "丽江阿黑哥",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkwMjc=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV97ht8vllhIdlyWx26j1VMibOhbcl452eG4o1oiaJ6U9jCJJPvYmSXyqKvias9oiakqAdBMJGOn1twmFQ/0?wx_fmt=jpeg",
    duration: 240,
  },
  {
    id: 90,
    title: "涵蜜金组合 - 绿色出行歌",
    artist: "涵蜜金组合",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5NzE=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasyOXmPL0dJQrLYicMeaf2VZh1gEWUD3iaRgBwJMa6vpuE5YxH6uMeyC4w/0?wx_fmt=jpeg",
    duration: 214,
  },
  {
    id: 91,
    title: "涵蜜金组合 - 摩梭山歌",
    artist: "涵蜜金组合",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5Mzk=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasBOxsZdP0KC0p6o0xY5WDqbWkxtWOTYejlBHiboPRPg6xfhrRPCrUCEg/0?wx_fmt=jpeg",
    duration: 294,
  },
  {
    id: 92,
    title: "涵蜜金组合 - 摩梭山歌",
    artist: "涵蜜金组合",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5Mzk=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasBOxsZdP0KC0p6o0xY5WDqbWkxtWOTYejlBHiboPRPg6xfhrRPCrUCEg/0?wx_fmt=jpeg",
    duration: 294,
  },
  {
      id: 93,
      title: "和善武 - 子本子缘化",
      artist: "和善武",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5MDQ=",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV97ht8vllhIdlyWx26j1VMibhw32CVXUaBhibGnfmbqcF5tW0kTb0NTYaKycFseg4GUz2SD7IJhqqog/0?wx_fmt=jpeg",
      duration: 195
    },
  {
      id: 94,
      title: "和善武 - 高山开杜鹃",
      artist: "和善武",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc2MDQ=",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV97ht8vllhIdlyWx26j1VMibhw32CVXUaBhibGnfmbqcF5tW0kTb0NTYaKycFseg4GUz2SD7IJhqqog/0?wx_fmt=jpeg",
      duration: 264
    },
  {
      id: 95,
      title: "和锦 - 喜庆歌",
      artist: "和锦",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4MjE=",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJFsMemI3L9a7ia703l2xww98I5iaDCYukYiaqJIwFUOicfttgV0M6ia504wg/0?wx_fmt=jpeg",
      duration: 222
    },
  {
      id: 96,
      title: "和锦 - 纳西小情歌",
      artist: "和锦",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NDk=",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJFsMemI3L9a7ia703l2xww98I5iaDCYukYiaqJIwFUOicfttgV0M6ia504wg/0?wx_fmt=jpeg",
      duration: 237
    },
  {
      id: 97,
      title: "和锦 - 大山女儿",
      artist: "和锦",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0MzQ=",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJFsMemI3L9a7ia703l2xww98I5iaDCYukYiaqJIwFUOicfttgV0M6ia504wg/0?wx_fmt=jpeg",
      duration: 224
    },
  {
      id: 98,
      title: "和锦 - 纳西酒歌",
      artist: "和锦",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0MDc=",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJFsMemI3L9a7ia703l2xww98I5iaDCYukYiaqJIwFUOicfttgV0M6ia504wg/0?wx_fmt=jpeg",
      duration: 240
    },
  {
      id: 99,
      title: "和锦、和文军 - 阿哥",
      artist: "和锦",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzOTQ=",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJFsMemI3L9a7ia703l2xww98I5iaDCYukYiaqJIwFUOicfttgV0M6ia504wg/0?wx_fmt=jpeg",
      duration: 231
    },
  {
      id: 100,
      title: "和锦 - 血脉",
      artist: "和锦",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzNTQ=",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJFsMemI3L9a7ia703l2xww98I5iaDCYukYiaqJIwFUOicfttgV0M6ia504wg/0?wx_fmt=jpeg",
      duration: 226
    },
  {
      id: 101,
      title: "和锦 - 啊啧啧 啊啵啵",
      artist: "和锦",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNjc=",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJFsMemI3L9a7ia703l2xww98I5iaDCYukYiaqJIwFUOicfttgV0M6ia504wg/0?wx_fmt=jpeg",
      duration: 228
    },
  {
      id: 102,
      title: "和锦 - 等待",
      artist: "和锦",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzNzg=",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJFsMemI3L9a7ia703l2xww98I5iaDCYukYiaqJIwFUOicfttgV0M6ia504wg/0?wx_fmt=jpeg",
      duration: 257
    },
  {
    id: 103,
    title: "玉龙山组合 - 丽江好在",
    artist: "玉龙山组合",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg2Njg=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibIMDjOsicflltuJKnaJDBhWqRia5KkRlsTOomu2qFxnwbpE0xQYJXuH7IHjG2gLpTvA1lOvrAb1cIw/0?wx_fmt=jpeg",
    duration: 281
  },
  {
    id: 104,
    title: "肖煜光 - 塔拉久初",
    artist: "肖煜光",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg2NTM=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9AXiaoEDgm0jakstwgVqBg9s2IwsKepeRGV2brFvkkKomB1E60Be3iaVzLXmysBOUqG4PmccjTiawYA/0?wx_fmt=jpeg",
    duration: 283
  },
  {
    id: 105,
    title: "金甲劲松 - 欢聚白水台",
    artist: "金甲劲松",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg2MDE=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicybGeZMBCpLThFRC1qJ6n3dicJibmOCJdUQJyic6kBggy2P9dvv9EsPpRibO7m4hcaC6Hic6Yk5ziafE4Q/0?wx_fmt=jpeg",
    duration: 230
  },
  {
    id: 106,
    title: "雄纳独知 - 心中的神山",
    artist: "雄纳独知",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg1Njk=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 258
  },
  {
    id: 107,
    title: "和华 - 隔山隔水不隔心",
    artist: "和华",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg1NDY=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 181
  },
  {
    id: 108,
    title: "肖煜光 - 达瓦纳西努2024",
    artist: "肖煜光",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg1Mzg=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 206
  },
  {
    id: 109,
    title: "纳浫阿福 - 满子周固男",
    artist: "纳浫阿福",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg1MDQ=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 241
  },
  {
    id: 110,
    title: "小靓 - 心中的丽江",
    artist: "小靓",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg0OTI=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 250
  },
  {
    id: 111,
    title: "和笑 - 欢声笑语",
    artist: "和笑",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg0ODE=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 229
  },
  {
    id: 112,
    title: "涵密金 - 情缘天地",
    artist: "涵密金",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg0Mzc=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 263
  },
  {
    id: 113,
    title: "肖煜光 - 拉市足球之歌",
    artist: "肖煜光",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTgzNDY=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibPQdLdFES3ZlaVSY8VdUrXThKaqWVVxUCIicyEgVibQmtLgAN6dEObS7QWcVFlKjy66Af5iczIUuXibw/640?wx_fmt=jpeg",
    duration: 192
  },
  {
    id: 114,
    title: "和丽龙 - 血肉相依",
    artist: "和丽龙",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTgzMjM=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 323
  },
  {
    id: 115,
    title: "纳西晓霞 - 心上人",
    artist: "纳西晓霞",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTgyODg=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 227
  },
  {
    id: 116,
    title: "和丽刚 - 不变的誓言",
    artist: "和丽刚",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTgyNDA=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 243
  },
  {
    id: 117,
    title: "和文珠 - 思恋",
    artist: "和文珠",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTgxNzM=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 254
  },
  {
    id: 118,
    title: "金甲劲松 - 梦中的额吉",
    artist: "金甲劲松",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTcyMTM=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    duration: 246
  },
  {
    id: 119,
    title: "金甲劲松 - 净土",
    artist: "金甲劲松",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5OTA=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    duration: 221
  },
  {
    id: 120,
    title: "金甲劲松 - 和合劳",
    artist: "金甲劲松",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NzM=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    duration: 381
  },
  {
    id: 121,
    title: "金甲劲松 - 玉龙王国",
    artist: "金甲劲松",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1NTc=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    duration: 220
  },
  {
    id: 122,
    title: "金甲劲松 - 纳西讲聚营",
    artist: "金甲劲松",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0NTk=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    duration: 170
  },
  {
    id: 123,
    title: "金甲劲松 - 相伴调",
    artist: "金甲劲松",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzMDQ=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    duration: 175
  },
  {
    id: 124,
    title: "金甲劲松、和晓霞 - 雪山恋",
    artist: "金甲劲松、和晓霞",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg5Mzk=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    duration: 156
  },
  {
    id: 125,
    title: "金甲劲松 - 山神之恋",
    artist: "金甲劲松",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDczNzY=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    duration: 305
  },
  {
    id: 126,
    title: "金甲劲松 - 玉龙王国",
    artist: "金甲劲松",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY4OTY=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    duration: 220
  },
  {
    id: 127,
    title: "金甲劲松 - 和合劳",
    artist: "金甲劲松",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY3NjQ=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    duration: 381
  },
  {
    id: 128,
    title: "金甲劲松,杨友爱 - 纳西喂么达",
    artist: "金甲劲松,杨友爱",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYxMTg=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    duration: 236
  },
  {
    id: 129,
    title: "雪山情歌(达坡玛吉、金甲劲松)",
    artist: "雪山情歌(达坡玛吉",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwOTU=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    duration: 234
  },
  {
    id: 130,
    title: "金甲劲松 - 阳光天堂",
    artist: "金甲劲松",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU0NDk=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    duration: 159
  },
  {
    id: 131,
    title: "金甲劲松 柯燕 - 靠近梦想",
    artist: "金甲劲松 柯燕",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQzNTE=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    duration: 249
  },
  {
    id: 132,
    title: "金甲劲松 - 乐土·家园",
    artist: "金甲劲松",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQwODE=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    duration: 297
  },
  {
    id: 133,
    title: "金甲劲松 - 魅力丽江",
    artist: "金甲劲松",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1OTQ=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    duration: 252
  },
  {
    id: 134,
    title: "金甲劲松 - 蝴蝶小鱼",
    artist: "金甲劲松",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0NTQ=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    duration: 143
  },
  {
    id: 135,
    title: "金甲劲松 - 大山走出的孩子",
    artist: "金甲劲松",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0NDg=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    duration: 282
  },
  {
    id: 136,
    title: "纳西蕾蕾 - 呀阁雄高么",
    artist: "纳西蕾蕾",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc4NjY=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVich7dW7dqv73P5wzJRRU3c8Jp1Cofiaxwufp4Ijibsp58XBbTWlsHHjJbq3NMlnqkRxmN8sRD5Rq9icQ/0?wx_fmt=jpeg",
    duration: 216
  },
  {
    id: 137,
    title: "墨尚七 - 不放手",
    artist: "墨尚七",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc4NTM=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 252
  },
  {
    id: 138,
    title: "《农村人居环境》快板(和群星 和善武)",
    artist: "和群星、和善武",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc3NzA=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 231
  },
  {
    id: 139,
    title: "涵蜜金组合 - 阿卡巴拉",
    artist: "涵蜜金组合",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc3Njk=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasOkRpZzDDUJMiagv8UP8ibaxSux7cf6ILCgARISoa4Wu8zNNaOuKBSIicA/640?wx_fmt=jpeg&from=appmsg",
    duration: 356
  },
  {
    id: 140,
    title: "纳西依古堆",
    artist: "",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc3Njc=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 148
  },
  {
    id: 141,
    title: "涵蜜金组合 - 绿色家园",
    artist: "涵蜜金组合",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc3NjY=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasOkRpZzDDUJMiagv8UP8ibaxSux7cf6ILCgARISoa4Wu8zNNaOuKBSIicA/640?wx_fmt=jpeg&from=appmsg",
    duration: 285
  },
  {
    id: 142,
    title: "肖煜光 - 寓言",
    artist: "肖煜光",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc3NjU=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV860SjRBZewkt9Ytwq2W5rLfIG7iaY6lZWibrQoCpPR2CpHNYjdp87qBOhxeTnp3uPHaH3vRx3dCPibA/640?wx_fmt=jpeg",
    duration: 222
  },
  {
    id: 143,
    title: "丽江小龙 - 么彪腾辟",
    artist: "丽江小龙",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc3MzA=",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV86SbIE21sVic6BrKXNN7GquI1ae5raotzopf6ZJ2ePVFLibdVbIiaicG9rXKIiaArru9z4CzNcht1Dr0g/640?wx_fmt=jpeg",
    duration: 201
  },
  {
    id: 144,
    title: "纳西少爷 - 天雨流芳",
    artist: "纳西少爷",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc2ODc=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 187
  },
  {
    id: 145,
    title: "阿强 - 茸余敢莫标",
    artist: "阿强",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc2MzU=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 251
  },
  {
    id: 146,
    title: "阿强 - 纳西欢歌",
    artist: "阿强",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc1MTY=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 245
  },
  {
    id: 147,
    title: "和永昌 - 苦尽甘来",
    artist: "和永昌",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc0ODM=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 201
  },
  {
    id: 148,
    title: "李承翰 - 今夜独我",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc0NDQ=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 244
  },
  {
    id: 149,
    title: "福音音 - 心里话",
    artist: "福音音",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc0Mjk=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 212
  },
  {
    id: 150,
    title: "纳西阿贵 - 雷鬼酒歌",
    artist: "纳西阿贵",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTczOTI=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 221
  },
  {
    id: 151,
    title: "玉龙山组合 - 喜庆歌",
    artist: "玉龙山组合",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY2ODE=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibIMDjOsicflltuJKnaJDBhWqRia5KkRlsTOomu2qFxnwbpE0xQYJXuH7IHjG2gLpTvA1lOvrAb1cIw/0?wx_fmt=jpeg",
    duration: 195
  },
  {
    id: 152,
    title: "玉龙山组合 - 革囊渡欢迎您",
    artist: "玉龙山组合",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY2Mzk=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibIMDjOsicflltuJKnaJDBhWqRia5KkRlsTOomu2qFxnwbpE0xQYJXuH7IHjG2gLpTvA1lOvrAb1cIw/0?wx_fmt=jpeg",
    duration: 231
  },
  {
    id: 153,
    title: "天龙 - 归来",
    artist: "天龙",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY1NzY=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 268
  },
  {
    id: 154,
    title: "金顺 - 纳西姐弟歌曲联唱",
    artist: "金顺",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY1NTU=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 564
  },
  {
    id: 155,
    title: "和永昌 - 从头再来",
    artist: "和永昌",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY1NDc=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 166
  },
  {
    id: 156,
    title: "和善武 - 刷古刷巴巴",
    artist: "和善武",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY1MDA=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 259
  },
  {
    id: 157,
    title: "和丽元 和慧琼 - 幕布热美",
    artist: "和丽元 和慧琼",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY0NDk=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 357
  },
  {
    id: 158,
    title: "和月圆 和国江 - 姆达蹉",
    artist: "和月圆 和国江",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY0NDU=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 278
  },
  {
    id: 159,
    title: "周萍、甲姆沽·阿平 - 相守到永久",
    artist: "周萍、甲姆沽·阿平",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTYzMDI=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 249
  },
  {
    id: 160,
    title: "纳西舞韵-阿贵",
    artist: "阿贵",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTYyNTc=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 280
  },
  {
    id: 161,
    title: "和善武、和慧琼 - 唠喂调",
    artist: "和善武、和慧琼",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTYyMDg=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV97ht8vllhIdlyWx26j1VMibnDUbqTVAsMQYVf3e41g7CicY0NlY3OGicz5aw89uJoHhrsiawq6ljcEmg/640?wx_fmt=jpeg&from=appmsg",
    duration: 180
  },
  {
    id: 162,
    title: "雪莲君 - 相念三生",
    artist: "雪莲君",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTYwMDA=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 252
  },
  {
    id: 163,
    title: "《中秋的约定》阿贵  纳西英子",
    artist: "阿贵、纳西英子",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTU2OTI=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 221
  },
  {
    id: 164,
    title: "肖煜光 - 劝善咒.",
    artist: "肖煜光",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTU2Njg=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 206
  },
  {
    id: 165,
    title: "纳西口弦 子谷气",
    artist: "",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTU1NjQ=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 297
  },
  {
    id: 166,
    title: "杨润琴、瑞鸣音乐 - 请喝一碗纳西酒 喂唻喂唻",
    artist: "杨润琴、瑞鸣音乐",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTU1Mjk=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 137
  },
  {
    id: 167,
    title: "水风永相伴",
    artist: "",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTU1MjM=",
    cover: "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    duration: 276
  },
  {
    id: 168,
    title: "陈四才 - 生肖歌",
    artist: "陈四才",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTU0ODY=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib56icib7d7hevKY5J395nTz9iakWLznWPflQkGfs4KZc1Gh9ILIsh7DwFxQ/640?wx_fmt=jpeg",
    duration: 232
  },
  {
    id: 169,
    title: "李承翰 - 回家的小路",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwMzc=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 313
  },
  {
    id: 170,
    title: "李承翰 - 打跳联唱",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5Mjk=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 367
  },
  {
    id: 171,
    title: "李承翰 - 劳动歌联唱",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4OTE=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 372
  },
  {
    id: 172,
    title: "李承翰 - 阿卡巴拉麻达咪",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4MzQ=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 170
  },
  {
    id: 173,
    title: "李承翰 - 嘛呢颂",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4MjI=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 241
  },
  {
    id: 174,
    title: "李承翰 - 犁牛调",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4MTU=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 189
  },
  {
    id: 175,
    title: "李承翰 - 呀哈哩",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3OTc=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 146
  },
  {
    id: 176,
    title: "李承翰 - 纳西纵歌",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3OTQ=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 164
  },
  {
    id: 177,
    title: "李承翰 - 十里送壮丁",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3Njk=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 212
  },
  {
    id: 178,
    title: "李承翰＆和慧琼《玉龙恋歌》",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3NTc=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 393
  },
  {
    id: 179,
    title: "李承翰 - 心上人",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3NTI=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 159
  },
  {
    id: 180,
    title: "李承翰、和慧琼 - 喜鹤",
    artist: "李承翰、和慧琼",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NzY=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 336
  },
  {
    id: 181,
    title: "李承翰 - 相伴调",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1ODg=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 218
  },
  {
    id: 182,
    title: "李承翰 - 喜庆歌",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1NjQ=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 242
  },
  {
    id: 183,
    title: "李承翰 - 阿卡巴拉嘛达咪",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzOTY=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 170
  },
  {
    id: 184,
    title: "李承翰 - 丽水纵歌",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzMzA=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 306
  },
  {
    id: 185,
    title: "李承翰 - 纳西酒歌",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyNzE=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 107
  },
  {
    id: 186,
    title: "李承翰＆和慧琼《玉龙恋歌》",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNDk=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 393
  },
  {
    id: 187,
    title: "李承翰 - 劳动歌联唱",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY0MTM=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 372
  },
  {
    id: 188,
    title: "李承翰 - 鱼水相会",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYyMDM=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 155
  },
  {
    id: 189,
    title: "李承翰 - 丽水纵歌",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU0MjY=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 306
  },
  {
    id: 190,
    title: "李承翰 - 纳西民歌联唱",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUyODk=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 228
  },
  {
    id: 191,
    title: "李承翰 - 轮回之恋",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUwNTc=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 248
  },
  {
    id: 192,
    title: "李承翰 - 木天王",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2Njg=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 372
  },
  {
    id: 193,
    title: "李承翰 - 神奇的玉龙山",
    artist: "李承翰",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5MTI=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 150
  },
  {
    id: 194,
    title: "三多颂-李承翰",
    artist: "",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2MjY=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 266
  },
  {
    id: 195,
    title: "美丽的古城（人狼格）",
    artist: "",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MjA=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 210
  },
  {
    id: 196,
    title: "人狼格 - 纳西情歌",
    artist: "人狼格",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwMzg=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 162
  },
  {
    id: 197,
    title: "人狼格-流浪一生不回来",
    artist: "",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA1OTk=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 151
  },
  {
    id: 198,
    title: "送小妹（人狼格）",
    artist: "",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgzMDg=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 240
  },
  {
    id: 199,
    title: "劳动之歌 - 人狼格",
    artist: "劳动之歌",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxNzQ=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 374
  },
  {
    id: 200,
    title: "人狼格 - 妈妈",
    artist: "人狼格",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcxMjE=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 244
  },
  {
    id: 201,
    title: "爱羞的纳咪（人狼格）",
    artist: "",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2NTM=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 137
  },
  {
    id: 202,
    title: "美丽的古城（人狼格）",
    artist: "",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2NTA=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 210
  },
  {
    id: 203,
    title: "人狼格-玉龙大雪山",
    artist: "",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2NDk=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 245
  },
  {
    id: 204,
    title: "相伴调（人狼格）",
    artist: "",
    album: "纳西音乐精选",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2MTI=",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
    duration: 218
  }
];

console.log('✅ musicData 加载完成，数量:', musicData.length);

// 视频数据从外部文件加载
console.log('📥 等待 videoData 从外部文件加载...');

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

// 加载音乐
function loadTrack(index) {
  console.log('🎵 加载音乐:', index, musicData[index].title);
  
  const track = musicData[index];
  audioPlayer.src = track.src;
  audioPlayer.load();
  
  // 更新播放器显示
  currentTitle.innerHTML = '<span>' + track.title + '</span>';
  currentArtist.textContent = track.artist;
  currentCover.src = track.cover;
  
  // 更新总时长
  totalTimeEl.textContent = formatTime(track.duration);
  
  
  
  // 保存播放器状态
  if (typeof savePlayerState === 'function') {
    savePlayerState(track.id, 0, false, track, audioPlayer.volume);
  } else {
    // 如果没有增强版，尝试调用基础版或直接操作 localStorage
    localStorage.setItem('currentTrackId', track.id);
    localStorage.setItem('lastPlayedTrack', JSON.stringify(track));
  }
  
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
        if (typeof savePlayerState === 'function' && musicData[currentTrackIndex]) {
          savePlayerState(musicData[currentTrackIndex].id, audioPlayer.currentTime, true, musicData[currentTrackIndex], audioPlayer.volume);
        }
      }).catch(function(error) {
        console.error('❌ 播放失败:', error);
      });
    });
  } else {
    audioPlayer.play().then(function() {
      isPlaying = true;
      updatePlayButton();
      
      // 保存播放器状态
      if (typeof savePlayerState === 'function' && musicData[currentTrackIndex]) {
        savePlayerState(musicData[currentTrackIndex].id, audioPlayer.currentTime, true, musicData[currentTrackIndex], audioPlayer.volume);
      }
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
  if (typeof savePlayerState === 'function' && musicData[currentTrackIndex]) {
    savePlayerState(musicData[currentTrackIndex].id, audioPlayer.currentTime, false, musicData[currentTrackIndex], audioPlayer.volume);
  }
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
  const icon = playBtn.querySelector('i');
  if (isPlaying) {
    icon.className = 'fas fa-pause text-primary';
    playBtn.classList.add('btn-playing');
  } else {
    icon.className = 'fas fa-play text-primary';
    playBtn.classList.remove('btn-playing');
  }
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
}

// 点击进度条跳转
function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;
  
  audioPlayer.currentTime = (clickX / width) * duration;
}

// 设置音量
function setVolume(e) {
  const volume = e.target.value;
  audioPlayer.volume = volume;
  
  // 保存音量状态
  if (typeof savePlayerState === 'function' && musicData[currentTrackIndex]) {
    savePlayerState(musicData[currentTrackIndex].id, audioPlayer.currentTime, isPlaying, musicData[currentTrackIndex], volume);
  }
}

// 更新音乐列表的高亮状态
function updateMusicListHighlight() {
  const cards = document.querySelectorAll('.music-card');
  cards.forEach(function(card, index) {
    if (index === currentTrackIndex) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

// 渲染音乐列表
function renderMusicList() {
  console.log('🎵 开始渲染音乐列表... 第', musicCurrentPage, '页');
  
  if (!musicListContainer) {
    console.error('❌ musicListContainer 未找到');
    return;
  }
  
  // 计算分页
  const startIndex = (musicCurrentPage - 1) * musicItemsPerPage;
  const endIndex = startIndex + musicItemsPerPage;
  const currentMusicPageData = musicData.slice(startIndex, endIndex);
  
  musicListContainer.innerHTML = '';
  
  currentMusicPageData.forEach(function(track) {
    // 找到该音轨在原始 musicData 中的实际索引
    const actualIndex = musicData.findIndex(t => t.id === track.id);
    
    var col = document.createElement('div');
    col.className = 'col-md-6 col-lg-3 mb-3';
    
    var card = document.createElement('div');
    card.className = 'card music-card';
    if (actualIndex === currentTrackIndex) card.classList.add('active');
    card.dataset.id = track.id;
    card.dataset.index = actualIndex;
    
    card.innerHTML = 
      '<div class="card-body d-flex align-items-center p-2">' +
        '<img src="' + track.cover + '" alt="' + track.title + '" class="album-cover me-2" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">' +
        '<div class="flex-grow-1 overflow-hidden">' +
            '<h6 class="card-title mb-1 text-truncate" style="font-size: 0.9rem;" title="' + track.title + '">' + track.title + '</h6>' +
            '<div class="d-flex align-items-center">' +
              '<p class="card-text text-muted mb-0 small text-truncate me-2" style="max-width: 80px;" title="' + track.artist + '">' + track.artist + '</p>' +
              '<small class="text-muted" style="font-size: 0.75rem;">' + formatTime(track.duration) + '</small>' +
            '</div>' +
          '</div>' +
        '<i class="fas fa-music text-primary ms-2" style="font-size: 1rem;"></i>' +
      '</div>';
    
    card.addEventListener('click', function() {
      console.log('点击了音乐:', track.title);
      currentTrackIndex = actualIndex;
      loadTrack(currentTrackIndex);
      playMusic();
      updateMusicListHighlight();
    });
    
    col.appendChild(card);
    musicListContainer.appendChild(col);
  });
  
  // 渲染分页控制器
  renderMusicPagination();
  
  console.log('✅ 音乐列表渲染完成');
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
  paginationHTML += '<button class="btn btn-sm btn-outline-primary page-btn" ' + (musicCurrentPage === 1 ? 'disabled' : '') + ' onclick="changeMusicPage(' + (musicCurrentPage - 1) + ')"><i class="fas fa-chevron-left"></i></button>';
  
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
  paginationHTML += '<button class="btn btn-sm btn-outline-primary page-btn" ' + (musicCurrentPage === totalPages ? 'disabled' : '') + ' onclick="changeMusicPage(' + (musicCurrentPage + 1) + ')"><i class="fas fa-chevron-right"></i></button>';
  
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
  if (musicSection) {
    musicSection.scrollIntoView({ behavior: 'smooth' });
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
    console.error('❌ videoListContainer 未找到');
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
    col.className = 'col-md-6 col-lg-4 mb-4';
    
    var card = document.createElement('div');
    card.className = 'card video-card';
    card.dataset.id = track.id;
    card.dataset.index = index + startIndex;
    
    card.innerHTML = 
      '<div class="card-body p-0">' +
        '<div class="position-relative">' +
          '<img src="' + track.cover + '" alt="' + track.title + '" class="card-img-top" style="height: 200px; object-fit: cover;">' +
          '<div class="position-absolute top-50 start-50 translate-middle">' +
            '<i class="fas fa-play-circle text-white" style="font-size: 3rem; opacity: 0.8;"></i>' +
          '</div>' +
          '<div class="position-absolute bottom-0 start-0 end-0 p-2" style="background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);">' +
            '<span class="text-white small">' + formatTime(track.duration) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="p-3">' +
          '<h6 class="card-title mb-1">' + track.title + '</h6>' +
          '<p class="card-text text-muted mb-0 small">' + track.artist + '</p>' +
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
  paginationHTML += '<button class="btn btn-sm btn-outline-primary page-btn" ' + (videoCurrentPage === 1 ? 'disabled' : '') + ' onclick="changeVideoPage(' + (videoCurrentPage - 1) + ')"><i class="fas fa-chevron-left"></i></button>';
  
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
  paginationHTML += '<button class="btn btn-sm btn-outline-primary page-btn" ' + (videoCurrentPage === totalPages ? 'disabled' : '') + ' onclick="changeVideoPage(' + (videoCurrentPage + 1) + ')"><i class="fas fa-chevron-right"></i></button>';
  
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
  if (videoSection) videoSection.scrollIntoView({ behavior: 'smooth' });
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
    audioPlayer.addEventListener('ended', nextTrack);
    audioPlayer.addEventListener('loadedmetadata', function() {
      totalTimeEl.textContent = formatTime(audioPlayer.duration);
    });
  }
  
  console.log('✅ 播放器事件监听初始化完成');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 DOM加载完成，开始初始化...');
  
  // 检测并设置滚动条宽度
  detectScrollbarWidth();
  
  // 渲染音乐列表
  renderMusicList();
  
  // 渲染视频列表
  renderVideoList();
  
  // 初始化播放器事件监听
  initPlayerEvents();
  
  // 初始化搜索功能
  initSearch();
  
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
        
        // 恢复播放位置
        if (savedState.currentTime > 0) {
          audioPlayer.currentTime = savedState.currentTime;
          console.log('⏱️ 恢复播放进度:', savedState.currentTime);
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
      } else {
        console.log('⚠️ 未找到对应的歌曲，加载第一首');
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
    if (typeof savePlayerState === 'function' && musicData[currentTrackIndex]) {
      savePlayerState(
        musicData[currentTrackIndex].id,
        audioPlayer.currentTime,
        isPlaying,
        musicData[currentTrackIndex],
        audioPlayer.volume
      );
      console.log('🔄 页面卸载前保存播放器状态');
    }
  });
  
  // 定期保存播放状态（每30秒）
  setInterval(function() {
    if (typeof savePlayerState === 'function' && musicData[currentTrackIndex]) {
      savePlayerState(
        musicData[currentTrackIndex].id,
        audioPlayer.currentTime,
        isPlaying,
        musicData[currentTrackIndex],
        audioPlayer.volume
      );
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
    console.error('❌ 搜索元素未找到');
    return;
  }
  
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    
    if (!query) {
      return;
    }
    
    console.log('🔍 跳转到搜索页面:', query);
    
    // 跳转到搜索页面
    window.location.href = 'search.html?q=' + encodeURIComponent(query);
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
    console.error('❌ musicListContainer 未找到');
    return;
  }
  
  musicListContainer.innerHTML = '';
  
  if (filteredData.length === 0) {
    musicListContainer.innerHTML = '<div class="col-12 text-center text-muted py-5">未找到匹配的音乐</div>';
    if (musicPaginationContainer) musicPaginationContainer.innerHTML = '';
    return;
  }
  
  filteredData.forEach(function(track) {
    const originalIndex = musicData.findIndex(function(m) {
      return m.id === track.id;
    });
    
    var col = document.createElement('div');
    col.className = 'col-md-6 col-lg-3 mb-3';
    
    var card = document.createElement('div');
    card.className = 'card music-card';
    if (originalIndex === currentTrackIndex) card.classList.add('active');
    card.dataset.id = track.id;
    card.dataset.index = originalIndex;
    
    card.innerHTML = 
      '<div class="card-body d-flex align-items-center p-2">' +
        '<img src="' + track.cover + '" alt="' + track.title + '" class="album-cover me-2" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">' +
        '<div class="flex-grow-1 overflow-hidden">' +
            '<h6 class="card-title mb-1 text-truncate" style="font-size: 0.9rem;" title="' + track.title + '">' + track.title + '</h6>' +
            '<div class="d-flex align-items-center">' +
              '<p class="card-text text-muted mb-0 small text-truncate me-2" style="max-width: 80px;" title="' + track.artist + '">' + track.artist + '</p>' +
              '<small class="text-muted" style="font-size: 0.75rem;">' + formatTime(track.duration) + '</small>' +
            '</div>' +
          '</div>' +
        '<i class="fas fa-music text-primary ms-2" style="font-size: 1rem;"></i>' +
      '</div>';
    
    card.addEventListener('click', function() {
      currentTrackIndex = originalIndex;
      loadTrack(currentTrackIndex);
      playMusic();
      updateMusicListHighlight();
    });
    
    col.appendChild(card);
    musicListContainer.appendChild(col);
  });
  
  if (musicPaginationContainer) musicPaginationContainer.innerHTML = '';
}
