// 视频数据
const videoData = [
  {
    id: 1001,
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
    id: 1002,
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
    id: 1003,
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
    id: 1004,
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
    id: 1005,
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
    id: 1006,
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
    id: 1007,
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
    id: 1008,
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
    id: 1009,
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
    id: 1010,
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
    id: 1011,
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
    id: 1012,
    title: "和文军 - 三月百花开",
    artist: "和文军",
    album: "音乐MV",
    src: "https://mvwebfs.kugou.com/202602072211/672b130089cb96794002184d7b53a248/v2/536d70c895bb273ecbfb78f0588be620/G106/M08/04/19/CocBAFoBRwiAGLWFAQIAHi02K-4987.mp4", 
    cover: "https://p3fx.kgimg.com/mvpic/cd/70/cd701b7d9e28d2c9e1826a05ff0ea24a.jpg",
    duration: 213,
    type: "video",
    description: " "
  },





];