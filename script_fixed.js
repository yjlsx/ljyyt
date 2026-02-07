// 修复版脚本
console.log('🚀 script_fixed.js 开始加载');

// 音乐数据
const musicData = [
    {
      "id": 1,
      "title": "和雪兰 - 吉祥的日子",
      "artist": "和雪兰",
      "album": "纳西音乐精选",
      "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk1ODI=",
      "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVic8Y7J4gj1eLOpBTqic5g3IR62s444BlEibp8xGFR1np4jC42ZefZZHq5ic0HUYkb2pbKibWAPPjfNQBg/0?wx_fmt=jpeg",
      "duration": 180
    },
    {
      "id": 2,
      "title": "和锦 - 阿腊古金歌",
      "artist": "和锦",
      "album": "纳西音乐精选",
      "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAyODY=",
      "cover": "https://mmbiz.qlogo.cn/mmbiz_jpg/tfpibRIwbCVic7GpubRvt0gvUxs0rRxbEePTFjQE9zjNNjueQYuKk6s9ibOODUMfY4XlxKjxiaU4So1NnlU3Sg9GFg/0?wx_fmt=jpeg",
      "duration": 240
    },
    {
      "id": 3,
      "title": "习东梅 - 白水台",
      "artist": "习东梅",
      "album": "纳西音乐精选",
      "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMjIx",
      "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVic7ROjf0KKfEcQL888Yss6Xeediac6hiaWsWOB7ocCXX2o1D09DUiabnungEVlQej1RmfADIFBJNPt1Q/0?wx_fmt=jpeg",
      "duration": 200
    },
    {
      "id": 4,
      "title": "和顺东 - 我的父亲母亲",
      "artist": "和顺东",
      "album": "纳西音乐精选",
      "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMjAz",
      "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib5wQ6puTht2pPhmAJXKeYGYUzx2EnicQyyMmGMJTDzo14bQM8ofv9Iw4Qfzh0fzknjw6JiakXwI9Bg/0?wx_fmt=jpeg",
      "duration": 220
    },
    {
      id: 5,
      title: "和丽霞 - 纳西若",
      artist: "和丽霞",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMTgy",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib9xXQ0tp4hgAnCwFX2MoclXK9RdTNtb3skg3kEwtCA29escvTr8C4DwsvQqqDLSnh6k8FJkTibZ3Q/0?wx_fmt=jpeg",
      duration: 195
    },
    {
      id: 6,
      title: "阿花蜜、纳西蕾蕾 - 欢聚",
      artist: "阿花蜜、纳西蕾蕾",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMTQ4",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8blmXDtvjo9PicNibWxuKUU4JXTbw5Pr2q5sTalOr5mrgyZoShocde9IeGrL0JScM9jIzIAhd2iaxWg/0?wx_fmt=jpeg",
      duration: 210
    },
    {
      id: 7,
      title: "和春艳 - 迎客欢歌",
      artist: "和春艳",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMTE2",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9JKP2nuDdxTWlNR3cAD7DmPHrpBfqX7iawCibCibdsPWc8c3MoO9tJibdU9sAmjUZ8jHkyhlE0IXAjrQ/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 8,
      title: "彩菊 - 孝敬父母",
      artist: "彩菊",
      album: "纳西音乐精选",
      src: "https://music.ghg.ink/api/music?url=https://example.com/music/lijiang-bazi.mp3",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib5rbEQTYdVcSiaWU5V3puvZAicjicB8hsNBE9XBRHtyp1VpAshvibxQoBfWQ/0?wx_fmt=jpeg",
      duration: 200
    },
    {
      id: 9,
      title: "和锦 - 四时吉祥",
      artist: "和锦",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMDg0",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8uU6y3XH97VVGyv87ia8w0T35WvWY1Gs5M4sLAiaCwUm0BRibV7F7iccQRGkwDLSDxQBrFYkajzDbHAA/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 10,
      title: "天龙 - 纳西欢歌",
      artist: "天龙",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMDY0",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibx6Z7eJJADYAPsJNe76NaBGrVJtGKx8ESzGTwKTSqrkal93XnrDggprhhfHaPtN3ubIH86ZMTA1w/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 11,
      title: "天龙 - 兄弟情",
      artist: "天龙",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMDUx",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicHjxIhu6g56y5PkMEAvcib0uKNjujPQicdg7eK3FS6M2HjrWhlbGRR3SSbia2d7F16htwYtJ8ricTcWQ/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 12,
      title: "幸福生活唱不完",
      artist: "涵蜜金组合",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMDUz",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9n5FgoMoAbliaCreicUXzDvE2gNLnYF9HONCyaQxiaDu8OgAlouTT0PEo6iabm657bfrA9QIrUibQ7Txw/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 13,
      title: "寒雨 - 牵挂",
      artist: "寒雨",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMDUy",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVich7dW7dqv73P5wzJRRU3c8EzBJaAiaghYgjWsxSCXhe24cJbSUzojN6ekcAOwZDfzyKEt2IxbJsXw/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 15,
      title: "和艳 - 欢乐的阿哩哩",
      artist: "和艳",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMDM3",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibeFzk8VVBC2DlnYicjt64ILw05niczrOwlYzDr1Qoh3ErSTeUb37BjHicysV5snMdiblia5JYa97ibyj0w/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 16,
      title: "啊秋 - 祈望",
      artist: "啊秋",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMDEy",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicHRE7coWtYeiaM1qeiaXkmE5NrYtvAIXF5kJGE3zbRvmTdCQUbQZxFz7nWCJyfjEZTibuKBBNrbXQPQ/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 17,
      title: "和慧琼 - 党情冷么密",
      artist: "和慧琼",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMDEz",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 18,
      title: "天龙 - 人生",
      artist: "天龙",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyOTgy",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFDM5Plb6FJQrC8d22fhcpW0PFiciaJTO6eiaX5Ul0ibBCibI7icGKUBNfgNHw/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 19,
      title: "和文军 - 相伴调",
      artist: "和文军",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyOTYw",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibV6ibEicbKg5SZ4xlf8nQQdjVJdWiaUiamXSIn7UCEuUII9ALM1T2Lmp96I0CPLNmyWsljUxnjYWqxKg/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 20,
      title: "和锦 - 四时吉祥",
      artist: "和锦",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAzMDg0",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8uU6y3XH97VVGyv87ia8w0T35WvWY1Gs5M4sLAiaCwUm0BRibV7F7iccQRGkwDLSDxQBrFYkajzDbHAA/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 21,
      title: "玉龙雪山的牧童",
      artist: "和楚雄",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyOTg0",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8ZnD9MUwnUxsSEFZJwMIzPACZXS0fv1Pnhjez7qdwWUGf4Jaw7IgrC8VMqvG4qicz7RJLUFwfYdUw/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 22,
      title: "丽江小龙 - 舞动丽江",
      artist: "丽江小龙",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyOTYx",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibpWhgWegkEx3ssnfMQibnp2VtMEAElpO8TfhjqM9DaohId2mHiawD69WZT83abibwibxjxlHFkEhx28g/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 23,
      title: "和雪芹 - 心里的家",
      artist: "和雪芹",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyOTQy",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibbicbntchMGnLyuf89OtYLd8d84uUCE4UwH3iclMkZmOLJFKka8I2VyTaaddNwbWhF7XgMo68SAw0Q/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 24,
      title: "阿夏丽 - 莫忘恩情",
      artist: "阿夏丽",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyOTI1",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibibYibvlic8PD6IUbib87iaVJt9mU4BGFO1iblcAHSoPsVzjy6rkwhIoasE5cNAbINQPibicrzEa3icX98cJA/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 25,
      title: "李承翰 - 纳西情歌",
      artist: "李承翰",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyOTI2",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8EWzb0KFzwicXFx448RArgicfZ6FBib8xbYzEXrb2ncfJdxGOLibk8cNZ7ic4qe7JspECs4UytIdBQX8A/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 25,
      title: "和生辉 - 歌唱长水",
      artist: "和生辉",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODkz",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZBZ2v17qhuaicT5jTtHLglu4ucxhcrndVg2j0Ric7vr1Bptz8zFAicIiclfv9urOBK8ZoibISfx2hgDQ/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 26,
      title: "肖煜光 - 达瓦纳西努2025",
      artist: "肖煜光",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODc5",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9AXiaoEDgm0jakstwgVqBg9s2IwsKepeRGV2brFvkkKomB1E60Be3iaVzLXmysBOUqG4PmccjTiawYA/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 27,
      title: "金锁丽泉 - 塔城姑娘美",
      artist: "金锁丽泉",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODY0",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJib5VIeyWqSia1KULW22Zq6AyDXvQhiambwyyg9ic6ic0AvliakWicIrnD5Dwg/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 28,
      title: "和锦 - 百草飘香的地方",
      artist: "和锦",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODY1",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJFsMemI3L9a7ia703l2xww98I5iaDCYukYiaqJIwFUOicfttgV0M6ia504wg/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 29,
      title: "庭松 - 盛世欢歌",
      artist: "庭松",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODY2",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJzooL7Za1iaicW3GyFkN7b1YUqjpJLt50aV1Q4zpwzpbpGzyicNAwibia1tA/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 30,
      title: "和瑞智 - 玉龙神韵",
      artist: "和瑞智",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODMz",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibxVULERGyrN6EQ90hiasHQyJuianJ6zhgCwhr8iakCceqHdC3icV29ubH2nks3zPG3HbSNxPERiaDibnSA/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 31,
      title: "树润花 - 姿姿好时获",
      artist: "树润花",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODM0",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibxVULERGyrN6EQ90hiasHQyPj2vQn42pXSwfC9iaz1mxSNLib8QWKYu1AK7eNLVB12f8VGDNpTfc2Gg/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 32,
      title: "和慧琼、和燕、李九铭、马涛 - 桃园送别调",
      artist: "和慧琼、和燕、李九铭、马涛",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODA4",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVich7dW7dqv73P5wzJRRU3c8SNnIwBQaKta1q2nAuD0XAXye1Oib7MjtuzQXqic7Toxp1DQR0Bq1qaow/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 33,
      title: "纳西蕾蕾 - 我愿",
      artist: "纳西蕾蕾",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODA5",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVich7dW7dqv73P5wzJRRU3c8Jp1Cofiaxwufp4Ijibsp58XBbTWlsHHjJbq3NMlnqkRxmN8sRD5Rq9icQ/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 34,
      title: "纳西蕾蕾 - 我愿",
      artist: "纳西蕾蕾",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODA5",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVich7dW7dqv73P5wzJRRU3c8Jp1Cofiaxwufp4Ijibsp58XBbTWlsHHjJbq3NMlnqkRxmN8sRD5Rq9icQ/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 35,
      title: "金甲劲松 - 石鼓响天下",
      artist: "金甲劲松",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyODEx",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicybGeZMBCpLThFRC1qJ6n3dicJibmOCJdUQJyic6kBggy2P9dvv9EsPpRibO7m4hcaC6Hic6Yk5ziafE4Q/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 36,
      title: "阿花蜜 - 相依相守",
      artist: "阿花蜜",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNzc5",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2Yyfsaa9s7wricmZwjUiazyzySibC1aUfJl93KI2dslSLmGPqdl06XJyZLrg/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 37,
      title: "和善武 - 爸美汝实贺",
      artist: "和善武",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNzgw",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV97ht8vllhIdlyWx26j1VMibhw32CVXUaBhibGnfmbqcF5tW0kTb0NTYaKycFseg4GUz2SD7IJhqqog/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 38,
      title: "李承翰 - 纳西新劝世歌",
      artist: "李承翰",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNzgx",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2YymnF5GrBwZ7NRGiar9g4b7Co46Tr6fauSg9sMPLB7vFDqENuiaFDagT0g/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 39,
      title: "木贵花 - 愿",
      artist: "木贵花",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNzM0",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9S1icwGutOXntH2hIme4hicGiaWvUBZeOSnY15XwxZxBFhicFf8oB94P1S3GqUSr07YFnPFhaQgP0Plw/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 40,
      title: "和上钧&阿诛 - 玉龙雪山的故事",
      artist: "和上钧&阿诛",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNzM1",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9S1icwGutOXntH2hIme4hicGuYQBIyxB3IAbSZt9DpQ1huGntkSwYoiaylld4HubCib6aR9zN6uZqibng/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 41,
      title: "达坡玛吉 - 纳西酒歌",
      artist: "达坡玛吉",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNzM2",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9S1icwGutOXntH2hIme4hicGwdIwLV3uYgmicUCTXfnwQIOhVHoicl0iaZ1icE4LLUTMu2zRhJKrt7XOsA/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 42,
      title: "祖先 - 金甲劲松",
      artist: "金甲劲松",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNzA1",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV86SbIE21sVic6BrKXNN7GquK9A4XRHUuJubjCuice2sML1RxTE827cZYpN6iatkbTtKT0ricFFTts2Xg/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 43,
      title: "和文军 - 依恋的家园",
      artist: "和文军",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNzA2",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicuNH092cxUKSRmibSAEzj2ck4icK1MjXRD0CcpWzlzybQDY1qAbRPmhDdfA7t7ox0OpM8ZnvCISvrg/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 44,
      title: "和慧琼 - 白云曲",
      artist: "和慧琼",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNzA3",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeP736tOJ9libibeVbmVe43mqTiaDbnCu7kO7PwxDSib1LbGFGrialTk8Jqfg/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 45,
      title: "丽江阿黑哥 - 相逢三杯酒",
      artist: "丽江阿黑哥",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjkz",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV97ht8vllhIdlyWx26j1VMibOhbcl452eG4o1oiaJ6U9jCJJPvYmSXyqKvias9oiakqAdBMJGOn1twmFQ/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 46,
      title: "纳浫阿福 - 满子周固男",
      artist: "纳浫阿福",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjk1",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV97ht8vllhIdlyWx26j1VMibyls3YsETR1uMwM0hL9MUZU7ww54HYmanHibL6yOgUBjZY1S4zfh1AsA/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 47,
      title: "墨尚七 - 不放手",
      artist: "墨尚七",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjU3",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVib1v0HXRGlDicQuO0pv0n0kUxOia7UIe1duJlYiaEOwJ8iaJ8tNjZcMPR8HL5gdfwYpibduZfLyVpziaibRw/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 48,
      title: "山人行组合 - 三月花开时",
      artist: "山人行组合",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjU4",
      cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicGIiaRABDKvq3h2vrqYnzCQFJibmIoUo41Vpiaia50BboI9ST29yCP0qt6cSpg9lrtLfngdQ1BRQLedA/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 49,
      title: "和丽刚 - 菩捞阿姆",
      artist: "和丽刚",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjU5",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibB5Ul7wGRIO7t65TgLIxmBG0ibPbcbFMY7hwKQ1jG2plRKc1teOPB40apiagNnBibAzALlbs830s3mQ/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 50,
      title: "和慧琼 - 花落流年",
      artist: "和慧琼",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjYw",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeP736tOJ9libibeVbmVe43mqTiaDbnCu7kO7PwxDSib1LbGFGrialTk8Jqfg/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 51,
      title: "阿泉 - 纳西火把节",
      artist: "阿泉",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjUx",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9o4HTgRx4AV3LduianWdhYWSCHWWZaIlw5T5vjANjnicuRUmCS1zaGBvJC0P5z0LyKKHQQqMqJynkA/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 52,
      title: "和慧琼 - 归期",
      artist: "和慧琼",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjUy",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeP736tOJ9libibeVbmVe43mqTiaDbnCu7kO7PwxDSib1LbGFGrialTk8Jqfg/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 53,
      title: "涵蜜金组合 - 摩梭山歌",
      artist: "涵蜜金组合",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjI0",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasyOXmPL0dJQrLYicMeaf2VZh1gEWUD3iaRgBwJMa6vpuE5YxH6uMeyC4w/0?wx_fmt=jpeg",
      duration: 175
    },
    {
      id: 54,
      title: "和慧琼 - 阿哩哩花花色",
      artist: "和慧琼",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjI1",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeP736tOJ9libibeVbmVe43mqTiaDbnCu7kO7PwxDSib1LbGFGrialTk8Jqfg/0?wx_fmt=jpeg",
      duration: 264
    },
    {
      id: 55,
      title: "涵蜜金组合 - 绿色出行歌",
      artist: "涵蜜金组合",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNjI3",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasyOXmPL0dJQrLYicMeaf2VZh1gEWUD3iaRgBwJMa6vpuE5YxH6uMeyC4w/0?wx_fmt=jpeg",
      duration: 213
    },
    {
      id: 56,
      title: "李丽芳 - 恩难忘",
      artist: "李丽芳",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNTcy",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeicFPYCIsUnpGhVggsu0sRWh2pNoyHGUhGWcvCfpaibbAZK8Wvdo1w0kA/0?wx_fmt=jpeg",
      duration: 307
    },
    {
      id: 57,
      title: "郑旭先 - 纳西潘金妹",
      artist: "郑旭先",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNTcz",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeO60VGZTzZxUFicUa24giangIEfricdYUOibr9RgKTiaPZicgAHSWrUCDvJWw/0?wx_fmt=jpeg",
      duration: 185
    },
    {
      id: 58,
      title: "王瑞香 - 春之歌",
      artist: "王瑞香",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNTc0",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xecOULzOI69StzBgQ6mOOLg59I32q7ZeNJyJ1rRdDwrCYNcRiamMAVHRg/0?wx_fmt=jpeg",
      duration: 287
    },
    {
      id: 59,
      title: "李丽芳 - 夏之歌",
      artist: "李丽芳",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNTc1",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeIFmWo5Btnib93XKpA0PnyX4eqdiaYap4WlQIWIEX4gm1swDVWbK9R9icA/0?wx_fmt=jpeg",
      duration: 268
    },
    {
      id: 60,
      title: "杨耀兰 - 秋之歌",
      artist: "杨耀兰",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNTc2",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xegPLtiaS4icmPj04FTLrLkUgSTqmaKicfty0vlzibXJIibAGGf39XQAD98bQ/0?wx_fmt=jpeg",
      duration: 263
    },
    {
      id: 61,
      title: "郑旭先 - 冬之歌",
      artist: "郑旭先",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNTc3",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeJyNibQGibsibIzgQXfTRjdIcfq5ibwGc5kqdjcSgbOnKib8bgr7SoSQcqWw/0?wx_fmt=jpeg",
      duration: 228
    },
    {
      id: 62,
      title: "阿福 - 歌颂党情",
      artist: "阿福",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNDcz",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicuNH092cxUKSRmibSAEzj2cUhnsRqHO6dXAhCPChjxnM0g5oXECiavGwp8lmocAZqppouGnaytI7uw/0?wx_fmt=jpeg",
      duration: 200
    },
    {
      id: 63,
      title: "玉龙山组合 - 欢聚在一起",
      artist: "玉龙山组合",
      album: "纳西音乐精选",
      src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyNDM5",
      cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibIMDjOsicflltuJKnaJDBhWqRia5KkRlsTOomu2qFxnwbpE0xQYJXuH7IHjG2gLpTvA1lOvrAb1cIw/0?wx_fmt=jpeg",
      duration: 203
    },
  {
    id: 64,
    title: "和笑 - 欢声笑语",
    artist: "和笑",
    album: "音乐MV",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAyMTM1", 
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9KwWgBqQMBwE1fTrYkiabGKuDCUyMHMLa4QvukTV2AmnghCxlqSTNqo59LUvo4jn19EF4ic9p2T8yg/0?wx_fmt=jpeg",
    duration: 229
  },
  {
    id: 65,
    title: "和丽刚 - 相守今生",
    artist: "和丽刚",
    album: "音乐MV",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAwODYz", 
    cover: "https://mmbiz.qlogo.cn/mmbiz_jpg/tfpibRIwbCVibpUuWemqz8F66pF1kcibMI55NfGdYo9GSMwuMBWglpPIwr3FEhlk6SSbhDdy0M5b5AnW5icI3L8tSw/0?wx_fmt=jpeg",
    duration: 321,
  },
  {
    id: 66,
    title: "山娃子新歌 - 山娃子",
    artist: "山娃子",
    album: "音乐MV",
    src: "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8yMjQ3NTAwNTgz", 
    cover: "https://mmbiz.qlogo.cn/mmbiz_jpg/tfpibRIwbCV8TY0z82Ux49U5Ffics0WiapLnyeJXYZBEmdO2VRsBPAJic2CeibHQUlK12F9E5NQoK4Bel0DzSicxmC1w/0?wx_fmt=jpeg",
    duration: 243,
    type: "video",
    description: " "
  },





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

console.log('✅ DOM元素获取完成');

let currentTrackIndex = 0;
let isPlaying = false;
let currentMediaType = 'music';

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
  currentTitle.textContent = track.title;
  currentArtist.textContent = track.artist;
  currentCover.src = track.cover;
  
  // 更新总时长
  totalTimeEl.textContent = formatTime(track.duration);
  
  // 更新音乐列表的高亮状态
  updateMusicListHighlight();
  
  console.log('✅ 音乐加载完成');
}

// 播放音乐
function playMusic() {
  console.log('▶️ 播放音乐');
  audioPlayer.play().then(function() {
    isPlaying = true;
    updatePlayButton();
  }).catch(function(error) {
    console.error('❌ 播放失败:', error);
  });
}

// 暂停音乐
function pauseMusic() {
  console.log('⏸️ 暂停音乐');
  audioPlayer.pause();
  isPlaying = false;
  updatePlayButton();
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
  audioPlayer.volume = e.target.value;
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
  console.log('🎵 开始渲染音乐列表...');
  
  if (!musicListContainer) {
    console.error('❌ musicListContainer 未找到');
    return;
  }
  
  musicListContainer.innerHTML = '';
  
  musicData.forEach(function(track, index) {
    var col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-3';
    
    var card = document.createElement('div');
    card.className = 'card music-card';
    card.dataset.id = track.id;
    card.dataset.index = index;
    
    card.innerHTML = 
      '<div class="card-body d-flex align-items-center">' +
        '<img src="' + track.cover + '" alt="' + track.title + '" class="album-cover me-3">' +
        '<div class="flex-grow-1">' +
          '<h6 class="card-title mb-1">' + track.title + '</h6>' +
          '<p class="card-text text-muted mb-1">' + track.artist + '</p>' +
          '<small class="text-muted">时长: ' + formatTime(track.duration) + '</small>' +
        '</div>' +
        '<i class="fas fa-music text-primary ms-2" style="font-size: 1.2rem;"></i>' +
      '</div>';
    
    card.addEventListener('click', function() {
      console.log('点击了音乐:', track.title);
      currentTrackIndex = index;
      loadTrack(currentTrackIndex);
      playMusic();
    });
    
    col.appendChild(card);
    musicListContainer.appendChild(col);
  });
  
  console.log('✅ 音乐列表渲染完成');
}

// 渲染视频列表 - 封面在上，标题在下
function renderVideoList() {
  console.log('🎬 开始渲染视频列表...');
  
  if (!videoListContainer) {
    console.error('❌ videoListContainer 未找到');
    return;
  }
  
  if (typeof videoData === 'undefined') {
    console.error('❌ videoData 未定义');
    videoListContainer.innerHTML = '<div class="col-12 text-center text-danger">视频数据未加载</div>';
    return;
  }
  
  if (videoData.length === 0) {
    console.warn('⚠️ videoData 为空');
    videoListContainer.innerHTML = '<div class="col-12 text-center text-warning">暂无视频数据</div>';
    return;
  }
  
  videoListContainer.innerHTML = '';
  
  videoData.forEach(function(track, index) {
    var col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';
    
    var card = document.createElement('div');
    card.className = 'card video-card';
    card.dataset.id = track.id;
    card.dataset.index = index;
    
    // 封面在上，标题在下的布局
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
      console.log('点击了视频:', track.title);
      window.location.href = 'video-player.html?id=' + track.id;
    });
    
    col.appendChild(card);
    videoListContainer.appendChild(col);
  });
  
  console.log('✅ 视频列表渲染完成');
}

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
  
  // 渲染音乐列表
  renderMusicList();
  
  // 渲染视频列表
  renderVideoList();
  
  // 初始化播放器事件监听
  initPlayerEvents();
  
  // 默认加载第一首歌
  if (musicData.length > 0) {
    loadTrack(0);
    console.log('✅ 已加载第一首歌:', musicData[0].title);
  }
  
  console.log('✅ 页面初始化完成');
  console.log('🎵 音乐数量:', musicData.length);
  console.log('🎬 视频数量:', typeof videoData !== 'undefined' ? videoData.length : '未定义');
});
