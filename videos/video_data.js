// 视频数据
const videoData = [
  {
    id: 1001,
    title: "和善武、金顺 - 鱼水相会",
    artist: "和善武、金顺",
    album: "音乐MV",
    src: "https://xcx.lijiangmusic.com/upload/1/20260124/c3cf02ee6a8990b9ad1fed05e6774b6b.mp4",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7NCtwazibtlUHAX0kOR3k6SeALRRWKiccfHQCEtLYtb4SqVetw5eVIlKWgjbdGvvgpibtpagiawd4ib71uoBuiaibialMbjJaumd9PTPgo/640?wx_fmt=png&amp;from=appmsg",
    duration: 180,
    type: "video",
    description: "和善武、金顺 - 鱼水相会"
  },
  {
    id: 1002,
    title: "金顺 - 回到我身边",
    artist: "金顺",
    album: "音乐MV",
    src: "https://xcx.lijiangmusic.com/upload/1/20260125/cbaf4f66e08724960608bf0e73363915.mp4",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Pz6Ou9p86dBJtyAJ4zbccIaNC7UM79zbhy3LyOwFDdzapeaRq8RMQHDvGLQdmicnGC1QZicxDRQeiaLW4gWfVxvssLodHn6xcYLI/640?wx_fmt=png&amp;from=appmsg",
    duration: 232,
    type: "video",
    description: "金顺 - 回到我身边"
  },
  {
    id: 1003,
    title: "和丽刚、金顺 - 缘定今生",
    artist: "金顺",
    album: "音乐MV",
    src: "https://xcx.lijiangmusic.com/upload/1/20260124/e4b860b537832ead1f8b61bf4f080c82.mp4",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Pz6Ou9p86dBJtyAJ4zbccIaNC7UM79zbhy3LyOwFDdzapeaRq8RMQHDvGLQdmicnGC1QZicxDRQeiaLW4gWfVxvssLodHn6xcYLI/640?wx_fmt=png&amp;from=appmsg",
    duration: 281,
    type: "video",
    description: "和丽刚、金顺 - 缘定今生"
  },
  {
    id: 1005,
    title: "金顺 - 三月百花开",
    artist: "金顺",
    album: "音乐MV",
    src: "https://xcx.lijiangmusic.com/upload/1/20260124/87a2fce89a250fb5c41e359194d5ab44.mp4",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7PiceWwkuhCFXUBpfGa7F1dXHibdMgYZu3aC4ly0eykTO7cjUtd5RiaLsBGNHva9xB9R9nTFQTGYWsIyX4uzFCwEQFXRUc7gVHTpQ/640?wx_fmt=png&amp;from=appmsg",
    duration: 216,
    type: "video",
    description: "金顺 - 三月百花开"
  },
  {
    id: 1006,
    title: "金顺 - 兴余花华色",
    artist: "金顺",
    album: "音乐MV",
    src: "https://xcx.lijiangmusic.com/upload/1/20260124/db33ef693b305abbb959e78811161bdb.mp4",
    cover: "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7NOrjPV7ohQicsvzEib6N8kQuW4gkcujiaGpNQVKavoA98hIEO75JFDyEylIba2w1ZCJyJvG5ZN3dr1k1aibx5cQEC3mtsDpymGD8U/640?wx_fmt=png&amp;from=appmsg",
    duration: 278,
    type: "video",
    description: "金顺 - 兴余花华色"
  },
  {
    id: 1007,
    title: "金顺 - 游子的心",
    artist: "金顺",
    album: "音乐MV",
    src: "https://xcx.lijiangmusic.com/upload/1/20260124/207470dfeca059e981dbc64b9e55803a.mp4",
    cover: "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7N3eL11iaMOicXhVjic0nu0f5OfkNmEEulYn174MKjcAo8yCZHWW76qzicvIIpdbWRQYZpl65PgPJWnibjctTBj6MvnWUkKyg4jibF4k/640?wx_fmt=png&amp;from=appmsg",
    duration: 245,
    type: "video",
    description: "金顺 - 游子的心"
  },
  {
    id: 1008,
    title: "金顺 - 塔城纳西民歌",
    artist: "金顺",
    album: "音乐MV",
    src: "https://xcx.lijiangmusic.com/upload/1/20260124/aab16c03c3595dcf2cf4ecf2e2be8f23.mp4",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7M3iagR6huc8ylv5DZGNd5YRH7WArOLYepkCDbcACiaLnde408WX2XkzXfH9dUibdicRrkP246qj6Kwx44cWKvFbcrYNTceayVSa3Y/640?wx_fmt=png&amp;from=appmsg",
    duration: 222,
    type: "video",
    description: "金顺 - 塔城纳西民歌"
  },
  {
    id: 1009,
    title: "金顺 - 劝世歌",
    artist: "金顺",
    album: "音乐MV",
    src: "https://xcx.lijiangmusic.com/upload/1/20260125/c2b8d2f9f52eb7666bd913a9d9636ee3.mp4",
    cover: "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7PRRBwZs06PJKGhG2Q0AGs0Mn3sn4ibegribxGxSRGiccXriam2kqcyPnGn9lVpor6vv1d3HypwtLEEzX5k1EIr4s6lhAibxCOC8IUw/640?wx_fmt=png&from=appmsg",
    duration: 172,
    type: "video",
    description: "金顺 - 劝世歌"
  },
  {
    id: 1010,
    title: "金顺 - 勒巴舞唱腔",
    artist: "金顺",
    album: "音乐MV",
    src: "https://xcx.lijiangmusic.com/upload/1/20260125/34a9c8591d7bb92abe9280cdb6317313.mp4",
    cover: "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7MibsurxzclLribWBtkzbib75tyZLcqLzxkpARtdIwmjb3juQ1egPLCozwzvibULxibMCGIpmZViapTkT4M9Fn4nHtctB1vafIEkBFWE/640?wx_fmt=png&amp;from=appmsg",
    duration: 321,
    type: "video",
    description: "金顺 - 勒巴舞唱腔"
  },
  {
    id: 1011,
    title: "金顺 - 打跳联唱",
    artist: "金顺",
    album: "音乐MV",
    src: "https://xcx.lijiangmusic.com/upload/1/20260125/02a3525a56bdaa06e13a878978ea4d50.mp4",
    cover: "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7PA0IqqF4wpO7vhYaxpZcAjcRKlTG8GZCAtppKR8icY9iczdsltAEgrSp7ZgFibJFX5Pb8aGFuZaqvWTagpA6N5kb0zmia3vs7J9hg/640?wx_fmt=png&amp;from=appmsg",
    duration: 415,
    type: "video",
    description: "金顺 - 打跳联唱"
  },
  {
    id: 1012,
    title: "金顺- 沧桑的诺言",
    artist: "金顺",
    album: "音乐MV",
    src: "https://xcx.lijiangmusic.com/upload/1/20260125/151697a28fd658d9b4d7a3615338ce29.mp4",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7Pcsa02YNbmpe5cQB5KSW6avLGqpRARrzC1GxcnDRdot3CsbynD1w46AJE0gbc28pIWLY3LicB2KiaSpYU6FKrtlz7lsxPSqWnsE/640?wx_fmt=png&amp;from=appmsg",
    duration: 290,
    type: "video",
    description: "金顺- 沧桑的诺言"
  },
  {
    id: 1013,
    title: "金顺- 沧桑的诺言",
    artist: "金顺",
    album: "音乐MV",
    src: "https://xcx.lijiangmusic.com/upload/1/20260125/0f74059731efff92b89ae105ed0ff571.mp4",
    cover: "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7ORCcX9fZkK2B8wBAWbxrS3ic3UA1wGsjzOh7f5QqnACpAibpAro5ep7ZveyKL2qJG3Dc5ShhK9m8gLd3HmPHnQIAMx6iafQlEicRo/640?wx_fmt=png&amp;from=appmsg",
    duration: 243,
    type: "video",
    description: "金顺- 次里次姆"
  },
  {
    id: 1014,
    title: "金顺- 红叶傲霜",
    artist: "金顺",
    album: "音乐MV",
    src: "https://xcx.lijiangmusic.com/upload/1/20260125/3a9c002b1229357622d01619a44523fc.mp4",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_png/jXiaTRzsmA7NPBwPzB4kBIMLJYUjDLjW6dCFISonHpgBWP8ib7QCUjFZia08YUr2rZIENDVKw3yHkssliaxpIGze6vInfco80afJs6icx7T0iaqzw/640?wx_fmt=png&amp;from=appmsg",
    duration: 329,
    type: "video",
    description: "金顺- 红叶傲霜"
  },
  {
    id: 1015,
    title: "金顺- 色卡飘季几",
    artist: "金顺",
    album: "音乐MV",
    src: "https://xcx.lijiangmusic.com/upload/1/20260125/fcac7970a9adeb3dd10dba851edadf9d.mp4",
    cover: "https://mmbiz.qlogo.cn/mmbiz_jpg/tfpibRIwbCV84jevYPGozARicbKWdicYtxDZB5iaibSoiaxovq3QZFibric1bdfr0wwCZQF4PRzHiaSibd7G93Q09KAjoglg/0?wx_fmt=jpeg",
    duration: 268,
    type: "video",
    description: "金顺- 色卡飘季几"
  },
  {
    id: 1016,
    title: "金顺- 悄然前行",
    artist: "金顺",
    album: "音乐MV",
    src: "https://xcx.lijiangmusic.com/upload/1/20260125/e1f3ff43fb74fe1666b1261dcb5ac06b.mp4",
    cover: "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7OqpsKKNciaIKKTPOwqPicA3icPCgKWkpLv2NiaX6VHVJObYlHdeSDOxoBIpIFNg1NeWLW50EMdYLERvbNAcVNY1fZRFDibJULYjXibs/640?wx_fmt=png&amp;from=appmsg",
    duration: 248,
    type: "video",
    description: "金顺- 悄然前行"
  },
  {
    id: 1017,
    title: "纳西蕾蕾- 我愿",
    artist: "纳西蕾蕾",
    album: "音乐MV",
    src: "https://xcx.lijiangmusic.com/upload/1/20230619/812c4aa225d8f134481e567a56d57ed2.mp4",
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8PmCq5l4vdgTMb31rlzEQoEzgBj3zEmCebLgAxwG1dCY7MzEMnErnvnstrYA4tjYRuhvvXuJl05g/0?wx_fmt=jpeg",
    duration: 257,
    type: "video",
    description: "纳西蕾蕾- 我愿"
  },





  {
    id: 1018,
    title: "和雪兰 - 吉祥的日子",
    artist: "和雪兰",
    album: "音乐MV",
    src: "https://mvwebfs.kugou.com/202602071509/6a6c8e95aa8839da65aa0e114114a3d8/KGTX/CLTX002/763963280b0aef148a0ecd9444b130da.mp4",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVic8Y7J4gj1eLOpBTqic5g3IR62s444BlEibp8xGFR1np4jC42ZefZZHq5ic0HUYkb2pbKibWAPPjfNQBg/0?wx_fmt=jpeg",
    duration: 245,
    type: "video",
    description: "和雪兰演唱的《吉祥的日子》音乐MV，展现了纳西族音乐的魅力。"
  },
  {
    id: 1019,
    title: "和锦 - 四时吉祥",
    artist: "和锦",
    album: "音乐MV",
    src: "https://mvwebfs.kugou.com/202602071605/a03ee44ffac35b33b60dcad1a6e30d21/KGTX/CLTX002/e7171902db487d8f3aef8de56d449451.mp4", 
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8uU6y3XH97VVGyv87ia8w0T35WvWY1Gs5M4sLAiaCwUm0BRibV7F7iccQRGkwDLSDxQBrFYkajzDbHAA/0?wx_fmt=jpeg",
    duration: 255,
    type: "video",
    description: "和锦演唱的《四时吉祥》音乐MV，展现了纳西族传统音乐的现代演绎。"
  },
  {
    id: 1020,
    title: "墨尚七 - 纳西山歌",
    artist: "墨尚七",
    album: "音乐MV",
    src: "https://mvwebfs.kugou.com/202602071828/7f040502323a9130dbeb6db098f6329e/v2/4a733b55a5af7d3152b8cbc78dcaba20/G180/M01/17/14/lJQEAF3WW5uAeem1B7C-AO9GVA8116.mp4", 
    cover: "https://img1.baidu.com/it/u=2301672168,2008749513&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    duration: 247,
    type: "video",
    description: " "
  },
  {
    id: 1021,
    title: "金甲劲松 - 祖先",
    artist: "金甲劲松",
    album: "音乐MV",
    src: "https://ugchsy.gtimg.com/B_rPBsIvbCvQp1vcLVnUVMt9WJToNtIk5QQ5DcEJIBkdyK5ksvh2edkloKZ7hfxpXH0g44RLAi5YYu3_gxm0QZz4B07WgfYjFBQYNYghxtHpRSX1hBz2QDEJaf70jSeY2sCTmphMlapgdEbkWsIjBEiA/svp_50200/njc_1000195_0bc3lactcaaftmaj77mxhbrr2wgegfmakmka.f2.mp4?sdtfrom=v1010&guid=f54132df521e0770&vkey=79CCF4FEF888C5573DA41AE70B5E7D2D4F5434A42383879E87AC82F362608895CD63E534DD4A5A0A942AE064D23C16E79AD62F6ADFF32BECCCABA150212BB9D871F0978DE493C3908FA818442DBE340392C5658C6E8D4E0B5864DD47B0FD52B833098BA5C9A4D57119718AB652675A701FCF2B5A5A741970CE2B01E05E79FC1EE476282BC1DD65AFE28E3DB46B4162B340A4D5A4DD89FB8CE86D726EF34E9CF1135A84E3979164BB", 
    cover: "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV86SbIE21sVic6BrKXNN7GquK9A4XRHUuJubjCuice2sML1RxTE827cZYpN6iatkbTtKT0ricFFTts2Xg/0?wx_fmt=jpeg",
    duration: 301,
    type: "video",
    description: " "
  },
  {
    id: 1022,
    title: "和丽刚 - 不变的誓言",
    artist: "和丽刚",
    album: "音乐MV",
    src: "https://mvwebfs.kugou.com/202602072151/525a32854cd99f353ebc2eb3bbbe3cc3/KGTX/CLTX002/305e95d65a62665d91aa5ea5bafe1f42.mp4", 
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9UkoHo5LvMVX1HyC0Mlg4NeqRbAQUVQo0G5SEDxZ8QRvejiblN22GMUxGquSNES1DjDiampqStjHSA/0?wx_fmt=jpeg",
    duration: 243,
    type: "video",
    description: " "
  },
  {
    id: 1023,
    title: "和丽刚 - 缘定今生",
    artist: "和丽刚",
    album: "音乐MV",
    src: "https://mvwebfs.kugou.com/202602072154/26acfe69e0c4699bd870c98ea9c87e67/KGTX/CLTX002/842031fbd2de06cffe3d9ef72a70e161.mp4", 
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9icnoQRx2z8RMuV9pKIJ4ulTg13YXSibpDbhGncCFGtia43kVBMvNWoibIIUn2vdkiaDaTIF7Jmyp8Kibw/0?wx_fmt=jpeg",
    duration: 283,
    type: "video",
    description: " "
  },
  {
    id: 1024,
    title: "彩菊 - 孝敬父母",
    artist: "彩菊",
    album: "音乐MV",
    src: "https://mvwebfs.kugou.com/202602072157/99bb16066544ce3f9a6fa7e1b6982391/KGTX/CLTX002/b04cc5bd7af6fe2379ce44b5f253c4d3.mp4", 
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib5rbEQTYdVcSiaWU5V3puvZAicjicB8hsNBE9XBRHtyp1VpAshvibxQoBfWQ/0?wx_fmt=jpeg",
    duration: 298,
    type: "video",
    description: " "
  },
  {
    id: 1025,
    title: "和瑞智 - 玉龙神韵",
    artist: "和瑞智",
    album: "音乐MV",
    src: "https://mvwebfs.kugou.com/202602072159/d5ae05caf364c427dd0d5960c5e77d71/KGTX/CLTX002/b45e1c7180ef6b1b6d6d9a8d12782a1a.mp4", 
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibxVULERGyrN6EQ90hiasHQyPyncDEEYtoiaWPBUEgRDCADRGTV1GKJl0jBL4bR8V6BXt0sa200KxCA/0?wx_fmt=jpeg",
    duration: 428,
    type: "video",
    description: " "
  },
  {
    id: 1026,
    title: "和笑 - 欢声笑语",
    artist: "和笑",
    album: "音乐MV",
    src: "https://mvwebfs.kugou.com/202602072201/64019705c226b6b2af9e19fd52be8ffa/KGTX/CLTX002/22d9d1c3212b0ea7b3596c36a78f2077.mp4", 
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9KwWgBqQMBwE1fTrYkiabGKuDCUyMHMLa4QvukTV2AmnghCxlqSTNqo59LUvo4jn19EF4ic9p2T8yg/0?wx_fmt=jpeg",
    duration: 229,
    type: "video",
    description: " "
  },
  {
    id: 1027,
    title: "和丽刚 - 相守今生",
    artist: "和丽刚",
    album: "音乐MV",
    src: "https://mvwebfs.tx.kugou.com/202602072204/d5a97b574ae943b88134cf32a97d9fae/v2/d884e9c8dd541573c40ed171796e90c5/G223/M0B/1A/18/f4cBAF8fge6AbAZnCTQGjRNX1yw556.mp4", 
    cover: "https://mmbiz.qlogo.cn/mmbiz_jpg/tfpibRIwbCVibpUuWemqz8F66pF1kcibMI55NfGdYo9GSMwuMBWglpPIwr3FEhlk6SSbhDdy0M5b5AnW5icI3L8tSw/0?wx_fmt=jpeg",
    duration: 321,
    type: "video",
    description: " "
  },
  {
    id: 1028,
    title: "山娃子新歌 - 山娃子",
    artist: "山娃子",
    album: "音乐MV",
    src: "https://mvwebfs.tx.kugou.com/202602072204/d5a97b574ae943b88134cf32a97d9fae/v2/d884e9c8dd541573c40ed171796e90c5/G223/M0B/1A/18/f4cBAF8fge6AbAZnCTQGjRNX1yw556.mp4", 
    cover: "https://mmbiz.qlogo.cn/mmbiz_jpg/tfpibRIwbCV8TY0z82Ux49U5Ffics0WiapLnyeJXYZBEmdO2VRsBPAJic2CeibHQUlK12F9E5NQoK4Bel0DzSicxmC1w/0?wx_fmt=jpeg",
    duration: 243,
    type: "video",
    description: " "
  },
  {
    id: 1029,
    title: "和文军 - 三月百花开",
    artist: "和文军",
    album: "音乐MV",
    src: "https://mvwebfs.kugou.com/202602072211/672b130089cb96794002184d7b53a248/v2/536d70c895bb273ecbfb78f0588be620/G106/M08/04/19/CocBAFoBRwiAGLWFAQIAHi02K-4987.mp4", 
    cover: "https://p3fx.kgimg.com/mvpic/cd/70/cd701b7d9e28d2c9e1826a05ff0ea24a.jpg",
    duration: 213,
    type: "video",
    description: " "
  },
  {
    id: 1030,
    title: "和善武 - 爸美汝实贺",
    artist: "和善武",
    album: "音乐MV",
    src: "https://ugchsy.gtimg.com/B_rPBsIvbCvQp1vcLVnUVMtxVukOJ5AXZ0_IUA7NtVzNp0JaMCJhe-4XffPwk7EYN-2sI_xYBoUPuNMxd7PWfXHq2IBMKw43FJKEr34A42JHzHPHZLt8afQAVJrtkoj1mzW6IjqCPML00312hHYocbEQ/svp_50200/gzc_1000039_0b53lqaseaabn4aana7ybrpy2xgdejoacisa.f2.mp4?sdtfrom=v1010&guid=f54132df521e0770&vkey=5C024CE80967CEBE428C4213EDC598ADC9582B7AFB7B22C0C90523AF78EE0F04B4A2AAB7B3CE7F1EEAF75EB940AB6913EAE9F0AECD752938073966CA4A905CE58680276F54972F246205FB2BA03768CA09F91A96AD1639E7DC74356C468CBDABCAB9AD86D6060CFE07F7E1343D29C5B2FED760DE53F1AC8C094B3D668E098FE72CD5AF0CEAAA595472A271F9C51DDD29C7F441D0AA632AB6450B027589BA99F840DD3924106B34A6", 
    cover: "https://puui.qpic.cn/vpic_cover/b3219pgm2ah/b3219pgm2ah_hz.jpg/496",
    duration: 213,
    type: "video",
    description: " "
  },
  {
    id: 1031,
    title: "和丽龙 - 依恋",
    artist: "和丽龙",
    album: "音乐MV",
    src: "https://ugchsy.gtimg.com/B_PcBEFZl47yT11XPyFgSQBl3ytTEOBjCYd-h5VN8k72njDI7kVo4JMeplpN02UOx-iL0NLr9vY0k7uUlQVivNXbdyLz-yIPjrfDS-g9Z_2Mck-VYVF7psFxuw40yyuTxN/svp_50200/njc_1000195_0bc35qcjeaaenqaetjuvkzrrz3geslwajesa.f2.mp4?sdtfrom=v1010&guid=f54132df521e0770&vkey=892CCFAF0FCB2310A75EB5C9383148DAF3DAD6A51704ECB1FBF13A9F9C67560BDF9F5553C62885FC2E441156D4A6A4974A343BE8018B9E9D78E0756BCDDBBCCF0494147B7FD00BE6A81D32416F894136A222B979D7FA73B5CFCB9A513B03A100AA020ECDFA5E088FA3781FD40A661D41769019094F1422A51176DF86674AD08B844EEF2703505C0D9BEA507B4F55292E4FF970D4952F2658A31AC537250270F38111FFD5F02CE0F4", 
    cover: "https://pic.bbs.ljdb.net/forum/201811/11/150249z4vbq6buqtj68j8u.jpg",
    duration: 292,
    type: "video",
    description: " "
  },
  {
    id: 1032,
    title: "和丽龙 - 赤子",
    artist: "和丽龙",
    album: "音乐MV",
    src: "https://open.douyin.com/player/video?vid=7425501418892676404", 
    cover: "https://m.ykimg.com/054104085BFD155300000104A80CDFE0",
    duration: 331,
    type: "video",
    description: " "
  },
  {
    id: 1033,
    title: "木贵花 - 愿",
    artist: "木贵花",
    album: "音乐MV",
    src: "https://mvwebfs.tx.kugou.com/202602081051/c5565c8a2868db9b8417623dd3808de0/v2/503df5810aaf472aced01536aa8b773b/KGTX/CLTX002/503df5810aaf472aced01536aa8b773b.mp4", 
    cover: "https://p3fx.kgimg.com/mvpic/ea/f5/eaf5b0e3f333330e54621bf9f048990c.jpg",
    duration: 331,
    type: "video",
    description: " "
  },
  {
    id: 1034,
    title: "墨尚七 - 桑瓦贡不勒",
    artist: "墨尚七",
    album: "音乐MV",
    src: "https://mvwebfs.kugou.com/202602081056/913921f6c89ff0eefe524fc3aaf5a36d/v2/13e71e03a2948ceab996bd182698fff3/G184/M04/13/03/mJQEAF3WYqmAKum-BrHU6mlILFQ404.mp4", 
    cover: "https://imgessl.kugou.com/mvhdpic/240/20240113/20240113101555391040.jpg",
    duration: 217,
    type: "video",
    description: " "
  },
  {
    id: 1035,
    title: "墨尚七 - 纳西山歌",
    artist: "墨尚七",
    album: "音乐MV",
    src: "https://mvwebfs.kugou.com/202602081059/51044498307c27b975124dcfa101ee58/v2/4a733b55a5af7d3152b8cbc78dcaba20/G180/M01/17/14/lJQEAF3WW5uAeem1B7C-AO9GVA8116.mp4", 
    cover: "https://imgessl.kugou.com/mvhdpic/240/20240113/20240113101529632395.jpg",
    duration: 247,
    type: "video",
    description: " "
  },
  {
    id: 1036,
    title: "墨尚七 - 最美人间",
    artist: "墨尚七",
    album: "音乐MV",
    src: "https://mvwebfs.kugou.com/202602081100/abc057f0df60dff44b54c2b2e086cf55/v2/275d52dda553ee4684595986ff611bca/G178/M02/0D/11/UocBAF2xUwyAJEphCTX7RRaVuWM809.mp4", 
    cover: "https://imgessl.kugou.com/mvhdpic/240/20240113/20240113071113213431.jpg",
    duration: 247,
    type: "video",
    description: " "
  },
  {
    id: 1037,
    title: "金顺 - 吾几吾日",
    artist: "金顺",
    album: "音乐MV",
    src: "https://mvwebfs.kugou.com/202602081442/dae2e801bc7e4839ff87e091b648fa1f/v2/34c909082e271750cae6d3f96bc729f0/G212/M0B/02/07/dIcBAF7IPeGAaCBnCC1OXPpJatA459.mp4", 
    cover: "https://imgessl.kugou.com/mvhdpic/240/20240115/20240115160405499207.jpg",
    duration: 261,
    type: "video",
    description: " "
  },
  {
    id: 1038,
    title: "金顺 - 神仙在哪里",
    artist: "金顺",
    album: "音乐MV",
    src: "https://mvwebfs.kugou.com/202602081444/1cfee507b4aec11204c113900db7d1ae/v2/7eb1343dac5886910c568cface88cbd7/G213/M07/02/15/dYcBAF7IP_mAWLNqB2e9XskHyXE721.mp4", 
    cover: "https://imgessl.kugou.com/mvhdpic/240/20240115/20240115160501793570.jpg",
    duration: 239,
    type: "video",
    description: " "
  },
  {
    id: 1039,
    title: "阿花蜜 - 相依相守",
    artist: "阿花蜜",
    album: "音乐MV",
    src: "https://xcx.lijiangmusic.com/upload/1/20241016/2bda2ce8dc36cf1814faaef9ef49a21d.mp4", 
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2Yyfsaa9s7wricmZwjUiazyzySibC1aUfJl93KI2dslSLmGPqdl06XJyZLrg/0?wx_fmt=jpeg",
    duration: 239,
    type: "video",
    description: ""
  },



];