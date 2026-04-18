// 修复版脚本
console.log('🚀 script_fixed.js 开始加载');

// 音乐数据
const musicData = [
  {
    id: 1,
    "title": "和月圆 - 快乐人生",
    "artist": "和月圆",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk4NTQ=",
    "cover": "http://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7N7s5enKLic15fx5DKYlTe6R5hBaC2WqqF3rZ22IrqsMY9qWWGD7KuDzzWNA9Z6RWag31oaw7M5NSDMK5fiaRP1mSMfRuLicUzVFU/0?wx_fmt=jpeg",
    "duration": 223
  },
  {
    id: 2,
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk4MTc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 225
  },
  {
    id: 3,
    "title": "赵郑芝 - 故乡谣",
    "artist": "赵郑芝",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk4MDU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7NrCAYkYXuqd1OjLa4qTZNmGWIuQiapFCLO1tPsE7z23p6wm9sPlvaCCRcS4B2k3bZPdnbVU9UrWh4EXORhQdo31QxAYm2cdc2M/0?wx_fmt=jpeg",
    "duration": 252
  },
  {
    id: 4,
    "artist": "金甲劲松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk4MDM=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OiaKHq5SAeC4icvDibghb4zqYwkLgfIybSes3n452PvQZ8r2SXibZBg3lKUpicTrtFY2sn5syJeP20hIibuDZwTIFXvr9SDklwMRWWo/0?wx_fmt=jpeg",
    "duration": 201
  },
  {
    id: 5,
    "title": "和圣福 和丽龙 和丽霞 和雪芹 - 五台之歌",
    "artist": "和圣福 和丽龙 和丽霞 和雪芹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk3NzQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Nw9LsfY0B3jRfCP9IrSSjgIkR3usu3iceMibqPqGcDl2HGC6quJlPI0VHZxQiaMC8Raj8SHD8BVujDnhPqWMEZFGNnddk1DFrmTA/640?wx_fmt=png&from=appmsg",
    "duration": 220
  },
  {
    id: 6,
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk3NDk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P6Zr7KEQ196ibHnvWSManrwg5plOFrGAoFN6P9An0qsVLxPwbDl1WPsRRUFNeAztdOLfSvHeLaAmp7wCxUiaVyJLBhcUyayibzhs/0?wx_fmt=jpeg",
    "duration": 224
  },
  {
    id: 7,
    "title": "金顺、和秀山 - 塔城纳西民歌",
    "artist": "金顺、和秀山",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzY=",
    "cover": "http://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
    "duration": 222
  },
  {
    id: 8,
    "title": "金顺 - 三月百花开",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzU=",
    "cover": "http://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
    "duration": 216
  },
  {
    id: 9,
    "title": "金顺 - 悄然前行",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzQ=",
    "cover": "http://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
    "duration": 248
  },
  {
    id: 10,
    "title": "金顺 - 回到我身边",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzM=",
    "cover": "http://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
    "duration": 172
  },
  {
    id: 11,
    "title": "金顺 - 红叶傲霜",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzI=",
    "cover": "http://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
    "duration": 329
  },
  {
    id: 12,
    "title": "金顺 - 打跳联唱",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzE=",
    "cover": "http://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
    "duration": 415
  },
  {
    id: 13,
    "title": "金顺 - 次里次姆",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NzA=",
    "cover": "http://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
    "duration": 243
  },
  {
    id: 14,
    "title": "金顺 - 沧桑的诺言",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2Njc=",
    "cover": "http://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
    "duration": 290
  },
  {
    id: 15,
    "title": "金顺 - 游子的心",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NjY=",
    "cover": "http://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
    "duration": 245
  },
  {
    id: 16,
    "title": "金顺 - 兴余花华色",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NjU=",
    "cover": "http://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
    "duration": 278
  },
  {
    id: 17,
    "title": "金顺 - 劝世歌",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NjQ=",
    "cover": "http://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
    "duration": 172
  },
  {
    id: 18,
    "title": "金顺 - 勒巴舞唱腔",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NjM=",
    "cover": "http://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
    "duration": 321
  },
  {
    id: 19,
    "title": "和善武、金顺 - 鱼水相会",
    "artist": "和善武、金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk2NjI=",
    "cover": "http://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7Of3Q2mngePC1E03T0yQrxG4Rs39MRKwSlIxOMYiba5ExmPFz46TwKX2cZp83YTPb0a7w8sHf1obtL2MWAIdqX9XQPm9FI9tCtw/0?wx_fmt=jpeg",
    "duration": 180
  },
  {
    id: 20,
    "title": "和雪兰 - 吉祥的日子",
    "artist": "和雪兰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk1ODI=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVic8Y7J4gj1eLOpBTqic5g3IRBBPP4Uy0bNtJXA8r7GT6qpqJLrCKPFtP5rWfWfYdPLmUlRicoFrXolg/0?wx_fmt=jpeg",
    "duration": 245
  },
  {
    id: 21,
    "title": "和春艳 - 迎客欢歌",
    "artist": "和春艳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0NTU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9JKP2nuDdxTWlNR3cAD7DmAC3sXLb9JCyKzqv5Lp8opC0iaKbB8UV95et393MIHlWm0yjvPvgApOg/0?wx_fmt=jpeg",
    "duration": 240
  },
  {
    id: 22,
    "title": "玉龙山组合、金沙姑娘组合-梦想成真",
    "artist": "玉龙山组合、金沙姑娘组合-梦想成真",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0NDU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib570SjZ1vI5NMcjy8GcglDl146iaG6r690jpA81NKibiaok955CCOVDvScw/0?wx_fmt=jpeg",
    "duration": 231
  },
  {
    id: 23,
    "title": "丽江福铃组合 - 纳西姑娘美",
    "artist": "丽江福铃组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkzNjM=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicHRE7coWtYeiaM1qeiaXkmE5gZnDkXMPyicr0kKqlOLmAer7KNicHic0teWhicAsJsuYEibF0gbZfHt4vDw/0?wx_fmt=jpeg",
    "duration": 229
  },
  {
    id: 24,
    "title": "和雪芹 - 心里的家",
    "artist": "和雪芹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkyODc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibbicbntchMGnLyuf89OtYLdbEeyxzHKFhcheIbvQfy3yTsQR8GID9xJCSU6G2VZKicsnyRTp1T0U4A/0?wx_fmt=jpeg",
    "duration": 283
  },
  {
    id: 25,
    "title": "纳浫阿福 - 满子周固男",
    "artist": "纳浫阿福",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkwMzk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV97ht8vllhIdlyWx26j1VMibyls3YsETR1uMwM0hL9MUZU7ww54HYmanHibL6yOgUBjZY1S4zfh1AsA/0?wx_fmt=jpeg",
    "duration": 241
  },
  {
    id: 26,
    "title": "丽江阿黑哥 - 相逢三杯酒",
    "artist": "丽江阿黑哥",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkwMjc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV97ht8vllhIdlyWx26j1VMibOhbcl452eG4o1oiaJ6U9jCJJPvYmSXyqKvias9oiakqAdBMJGOn1twmFQ/0?wx_fmt=jpeg",
    "duration": 239
  },
  {
    id: 27,
    "artist": "涵蜜金组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5NzE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasyOXmPL0dJQrLYicMeaf2VZh1gEWUD3iaRgBwJMa6vpuE5YxH6uMeyC4w/0?wx_fmt=jpeg",
    "duration": 213
  },
  {
    id: 28,
    "artist": "涵蜜金组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5Mzk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasBOxsZdP0KC0p6o0xY5WDqbWkxtWOTYejlBHiboPRPg6xfhrRPCrUCEg/0?wx_fmt=jpeg",
    "duration": 293
  },
  {
    id: 29,
    "title": "玉龙山组合 - 丽江好在",
    "artist": "玉龙山组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg2Njg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 281
  },
  {
    id: 30,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 283
  },
  {
    id: 31,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 230
  },
  {
    id: 32,
    "title": "雄纳独知 - 心中的神山",
    "artist": "雄纳独知",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg1Njk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 258
  },
  {
    id: 33,
    "title": "和华 - 隔山隔水不隔心",
    "artist": "和华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg1NDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 181
  },
  {
    id: 34,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 206
  },
  {
    id: 35,
    "title": "小靓 - 心中的丽江",
    "artist": "小靓",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg0OTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 250
  },
  {
    id: 36,
    "title": "和笑 - 欢声笑语",
    "artist": "和笑",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg0ODE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 229
  },
  {
    id: 37,
    "title": "涵密金 - 情缘天地",
    "artist": "涵密金",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg0Mzc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 263
  },
  {
    id: 38,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 192
  },
  {
    id: 39,
    "title": "和丽龙 - 血肉相依",
    "artist": "和丽龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTgzMjM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Nw9LsfY0B3jRfCP9IrSSjgIkR3usu3iceMibqPqGcDl2HGC6quJlPI0VHZxQiaMC8Raj8SHD8BVujDnhPqWMEZFGNnddk1DFrmTA/640?wx_fmt=png&from=appmsg",
    "duration": 323
  },
  {
    id: 40,
    "title": "纳西晓霞 - 心上人",
    "artist": "纳西晓霞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTgyODg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 227
  },
  {
    id: 41,
    "title": "和丽刚 - 不变的誓言",
    "artist": "和丽刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTgyNDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 243
  },
  {
    id: 42,
    "title": "和文珠 - 思恋",
    "artist": "和文珠",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTgxNzM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 254
  },
  {
    id: 43,
    "title": "纳西蕾蕾 - 呀阁雄高么",
    "artist": "纳西蕾蕾",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc4NjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 216
  },
  {
    id: 44,
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 252
  },
  {
    id: 45,
    "title": "《农村人居环境》快板(和群星 和善武)",
    "artist": "《农村人居环境》快板(和群星 和善武)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc3NzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 231
  },
  {
    id: 46,
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasOkRpZzDDUJMiagv8UP8ibaxSux7cf6ILCgARISoa4Wu8zNNaOuKBSIicA/640?wx_fmt=jpeg&from=appmsg",
    "duration": 356
  },
  {
    id: 47,
    "title": "纳西依古堆",
    "artist": "纳西依古堆",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc3Njc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 148
  },
  {
    id: 48,
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasOkRpZzDDUJMiagv8UP8ibaxSux7cf6ILCgARISoa4Wu8zNNaOuKBSIicA/640?wx_fmt=jpeg&from=appmsg",
    "duration": 285
  },
  {
    id: 49,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 222
  },
  {
    id: 50,
    "title": "丽江小龙 - 么彪腾辟",
    "artist": "丽江小龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc3MzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 201
  },
  {
    id: 51,
    "title": "纳西少爷 - 天雨流芳",
    "artist": "纳西少爷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc2ODc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 187
  },
  {
    id: 52,
    "title": "和善武 - 高山开杜鹃",
    "artist": "和善武",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc2MDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 264
  },
  {
    id: 53,
    "title": "阿强 - 纳西欢歌",
    "artist": "阿强",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc1MTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 245
  },
  {
    id: 54,
    "title": "和永昌 - 苦尽甘来",
    "artist": "和永昌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc0ODM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 201
  },
  {
    id: 55,
    "title": "李承翰 - 今夜独我",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc0NDQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 244
  },
  {
    id: 56,
    "title": "福音音 - 心里话",
    "artist": "福音音",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc0Mjk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 212
  },
  {
    id: 57,
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Pfob4GOy3ZueVaiaULB7dYycoh7CxJ1DclToF5rnqAnrPvZ0yVaoJvfH6xfibEgj7c0dZVaRRB2VyvicPruVUjM4bj9dQKjW7W4I/640?wx_fmt=png&from=appmsg",
    "duration": 221
  },
  {
    id: 58,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 246
  },
  {
    id: 59,
    "title": "玉龙山组合 - 喜庆歌",
    "artist": "玉龙山组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY2ODE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 195
  },
  {
    id: 60,
    "title": "玉龙山组合 - 革囊渡欢迎您",
    "artist": "玉龙山组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY2Mzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 231
  },
  {
    id: 61,
    "title": "天龙 - 归来",
    "artist": "天龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY1NzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 268
  },
  {
    id: 62,
    "title": "金顺 - 纳西姐弟歌曲联唱",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY1NTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 564
  },
  {
    id: 63,
    "title": "和永昌 - 从头再来",
    "artist": "和永昌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY1NDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 166
  },
  {
    id: 64,
    "title": "和善武 - 刷古刷巴巴",
    "artist": "和善武",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY1MDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 259
  },
  {
    id: 65,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 357
  },
  {
    id: 66,
    "title": "和月圆 和国江 - 姆达蹉",
    "artist": "和月圆 和国江",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY0NDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 278
  },
  {
    id: 67,
    "title": "周萍、甲姆沽·阿平 - 相守到永久",
    "artist": "周萍、甲姆沽·阿平",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTYzMDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 249
  },
  {
    id: 68,
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Pfob4GOy3ZueVaiaULB7dYycoh7CxJ1DclToF5rnqAnrPvZ0yVaoJvfH6xfibEgj7c0dZVaRRB2VyvicPruVUjM4bj9dQKjW7W4I/640?wx_fmt=png&from=appmsg",
    "duration": 280
  },
  {
    id: 69,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 180
  },
  {
    id: 70,
    "title": "雪莲君 - 相念三生",
    "artist": "雪莲君",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTYwMDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 252
  },
  {
    id: 71,
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Pfob4GOy3ZueVaiaULB7dYycoh7CxJ1DclToF5rnqAnrPvZ0yVaoJvfH6xfibEgj7c0dZVaRRB2VyvicPruVUjM4bj9dQKjW7W4I/640?wx_fmt=png&from=appmsg",
    "duration": 221
  },
  {
    id: 72,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 206
  },
  {
    id: 73,
    "title": "纳西口弦 子谷气",
    "artist": "纳西口弦 子谷气",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTU1NjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 297
  },
  {
    id: 74,
    "title": "杨润琴、瑞鸣音乐 - 请喝一碗纳西酒 喂唻喂唻",
    "artist": "杨润琴、瑞鸣音乐",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTU1Mjk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 137
  },
  {
    id: 75,
    "title": "陈四才 - 生肖歌",
    "artist": "陈四才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTU0ODY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 232
  },
  {
    id: 76,
    "title": "李承翰 - 回家的小路",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwMzc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 313
  },
  {
    id: 77,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 221
  },
  {
    id: 78,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 381
  },
  {
    id: 79,
    "title": "李承翰 - 打跳联唱",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5Mjk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 367
  },
  {
    id: 80,
    "title": "子本子缘化",
    "artist": "子本子缘化",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5MDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 195
  },
  {
    id: 81,
    "title": "李承翰 - 劳动歌联唱",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4OTE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 372
  },
  {
    id: 82,
    "title": "李承翰 - 阿卡巴拉麻达咪",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4MzQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 170
  },
  {
    id: 83,
    "title": "李承翰 - 嘛呢颂",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4MjI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 241
  },
  {
    id: 84,
    "title": "和锦 - 喜庆歌",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4MjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 264
  },
  {
    id: 85,
    "title": "李承翰 - 犁牛调",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4MTU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 189
  },
  {
    id: 86,
    "title": "李承翰 - 呀哈哩",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3OTc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 146
  },
  {
    id: 87,
    "title": "李承翰 - 纳西纵歌",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3OTQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 164
  },
  {
    id: 88,
    "title": "李承翰 - 十里送壮丁",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3Njk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 212
  },
  {
    id: 89,
    "artist": "李承翰＆和慧琼《玉龙恋歌》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3NTc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 393
  },
  {
    id: 90,
    "title": "李承翰 - 心上人",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3NTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 159
  },
  {
    id: 91,
    "artist": "李承翰、和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NzY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 336
  },
  {
    id: 92,
    "title": "和锦 - 纳西小情歌",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 237
  },
  {
    id: 93,
    "title": "美丽的古城（人狼格）",
    "artist": "美丽的古城（人狼格）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MjA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 210
  },
  {
    id: 94,
    "title": "李承翰 - 相伴调",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1ODg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 218
  },
  {
    id: 95,
    "title": "李承翰 - 喜庆歌",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1NjQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 242
  },
  {
    id: 96,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 220
  },
  {
    id: 97,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 170
  },
  {
    id: 98,
    "title": "和锦 - 大山女儿",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0MzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 224
  },
  {
    id: 99,
    "title": "和锦 - 纳西酒歌",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0MDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 240
  },
  {
    id: 100,
    "title": "李承翰 - 阿卡巴拉嘛达咪",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzOTY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 170
  },
  {
    id: 101,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 231
  },
  {
    id: 102,
    "title": "和锦 - 血脉",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzNTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 226
  },
  {
    id: 103,
    "title": "李承翰 - 丽水纵歌",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzMzA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 306
  },
  {
    id: 104,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 175
  },
  {
    id: 105,
    "title": "李承翰 - 纳西酒歌",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyNzE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 107
  },
  {
    id: 106,
    "title": "和锦 - 啊啧啧 啊啵啵",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNjc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 228
  },
  {
    id: 107,
    "title": "人狼格 - 纳西情歌",
    "artist": "人狼格",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwMzg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 162
  },
  {
    id: 108,
    "title": "人狼格-流浪一生不回来",
    "artist": "人狼格-流浪一生不回来",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA1OTk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 151
  },
  {
    id: 109,
    "title": "和锦 - 等待",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzNzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 257
  },
  {
    id: 110,
    "title": "和锦 - 阿腊古金歌",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAyODY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 279
  },
  {
    id: 111,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 156
  },
  {
    id: 112,
    "title": "送小妹（人狼格）",
    "artist": "送小妹（人狼格）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgzMDg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 240
  },
  {
    id: 113,
    "title": "劳动之歌 - 人狼格",
    "artist": "劳动之歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxNzQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 374
  },
  {
    id: 114,
    "title": "人狼格 - 妈妈",
    "artist": "人狼格",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcxMjE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 244
  },
  {
    id: 115,
    "title": "李承翰 - 鱼水相会",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYyMDM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 155
  },
  {
    id: 116,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 236
  },
  {
    id: 117,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 234
  },
  {
    id: 118,
    "title": "爱羞的纳咪（人狼格）",
    "artist": "爱羞的纳咪（人狼格）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2NTM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 137
  },
  {
    id: 119,
    "title": "人狼格-玉龙大雪山",
    "artist": "人狼格-玉龙大雪山",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2NDk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 245
  },
  {
    id: 120,
    "title": "相伴调（人狼格）",
    "artist": "相伴调（人狼格）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2MTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 218
  },
  {
    id: 121,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 159
  },
  {
    id: 122,
    "title": "李承翰 - 纳西民歌联唱",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUyODk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 228
  },
  {
    id: 123,
    "title": "李承翰 - 轮回之恋",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUwNTc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 248
  },
  {
    id: 124,
    "title": "李承翰 - 木天王",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2Njg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 372
  },
  {
    id: 125,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 249
  },
  {
    id: 126,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 297
  },
  {
    id: 127,
    "title": "李承翰 - 神奇的玉龙山",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5MTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 150
  },
  {
    id: 128,
    "title": "三多颂-李承翰",
    "artist": "三多颂-李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2MjY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 266
  },
  {
    id: 129,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 252
  },
  {
    id: 130,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 143
  },
  {
    id: 131,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 282
  },
  {
    id: 132,
    "title": "白水台",
    "artist": "白水台",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk1NzE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVic7ROjf0KKfEcQL888Yss6XsGbubU4hSoB4jKEXibPDSqn317NmQL7QSZJaiblPUCEjwx5HwHzQiarDg/0?wx_fmt=jpeg",
    "duration": 246
  },
  {
    id: 133,
    "title": "习东梅 - 白水台",
    "artist": "习东梅",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk1NzA=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVic7ROjf0KKfEcQL888Yss6XsGbubU4hSoB4jKEXibPDSqn317NmQL7QSZJaiblPUCEjwx5HwHzQiarDg/0?wx_fmt=jpeg",
    "duration": 246
  },
  {
    id: 134,
    "title": "和顺东 - 我的父亲母亲",
    "artist": "和顺东",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk1NDg=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib5wQ6puTht2pPhmAJXKeYG6YCq08SwLGkic0icPHiaib5SWd75LWftBzg90q1AzT0D0xM4Y0ibBMVuJWw/0?wx_fmt=jpeg",
    "duration": 216
  },
  {
    id: 135,
    "title": "和丽霞 - 纳西若",
    "artist": "和丽霞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk1MTA=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib9xXQ0tp4hgAnCwFX2Mocl5S7Pdz8KG82uLwpm5iaFxgsABrVtbL5V782yFXHQWpUy8rSKWgTssrw/0?wx_fmt=jpeg",
    "duration": 245
  },
  {
    id: 136,
    "title": "纳西族音乐史",
    "artist": "纳西族音乐史",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0OTM=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8blmXDtvjo9PicNibWxuKUU4UGyxJ5jzrlolibpQ0UCTXfBPZibaXic822BdCAOibmaylZjM5eALsvUuEg/0?wx_fmt=jpeg",
    "duration": 4001
  },
  {
    id: 137,
    "title": "阿花蜜、纳西蕾蕾 - 欢聚",
    "artist": "阿花蜜、纳西蕾蕾",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0NzY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8blmXDtvjo9PicNibWxuKUU4rAPWvIeHKPNOvia58vdUNtCr8TEUqCkAN8r50E6w91jNU863cX7AMVA/0?wx_fmt=jpeg",
    "duration": 215
  },
  {
    id: 138,
    "title": "我爱纳西丽江坝",
    "artist": "我爱纳西丽江坝",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0NjA=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9JKP2nuDdxTWlNR3cAD7DmY9ib2AUeWweH1HeyJO3g8zcnTJXaPUllNyGQpYm8niaFx9Svav7SZbug/0?wx_fmt=jpeg",
    "duration": 267
  },
  {
    id: 139,
    "title": "陈四才 - 欢天喜地",
    "artist": "陈四才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0MzM=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib5lkH01GMQb8PblOXrWJaomBjjYNDeL21uVwa3BegAoTV1NwyxYETbKg/0?wx_fmt=jpeg",
    "duration": 212
  },
  {
    id: 140,
    "title": "彩菊 - 孝敬父母",
    "artist": "彩菊",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0MjQ=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9gcgQc5HISRsYok8A5yOib5oLOibjibib5svLxibNQgGKvs8Mh7go76NTj5LqXOzKhp9jZBDhjWDypUMw/0?wx_fmt=jpeg",
    "duration": 298
  },
  {
    id: 141,
    "title": "天龙 - 纳西欢歌",
    "artist": "天龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0MTE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibx6Z7eJJADYAPsJNe76NaBtU2rIbt8A3bhtLR0MRMjI7OUHF78SQnfRq9fibwJIpS167BVM1nGCYg/0?wx_fmt=jpeg",
    "duration": 246
  },
  {
    id: 142,
    "title": "和集虎 - 耆老新歌",
    "artist": "和集虎",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTk0MDA=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicHjxIhu6g56y5PkMEAvcib0smy0hYDCT4mnLaUFmCPWZOG724nJLl5axlO4icf4fnm8LLyLrudqXww/0?wx_fmt=jpeg",
    "duration": 232
  },
  {
    id: 143,
    "title": "天龙 - 兄弟情",
    "artist": "天龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkzOTM=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicHjxIhu6g56y5PkMEAvcib0HSDg3VthxIpmNAqNYAelkiabuD0gwoEZxFSYmtyIxkZ3xViawNqtq2gQ/0?wx_fmt=jpeg",
    "duration": 223
  },
  {
    id: 144,
    "title": "和艳 - 欢乐的阿哩哩",
    "artist": "和艳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkzNzk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibeFzk8VVBC2DlnYicjt64IL7I538jKiauv5y1Adz8wkjtYfQpufsEmOoM0ic0VCr3qGgh09b8670vicg/0?wx_fmt=jpeg",
    "duration": 253
  },
  {
    id: 145,
    "title": "啊秋 - 祈望",
    "artist": "啊秋",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkzNTA=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicHRE7coWtYeiaM1qeiaXkmE5NrYtvAIXF5kJGE3zbRvmTdCQUbQZxFz7nWCJyfjEZTibuKBBNrbXQPQ/0?wx_fmt=jpeg",
    "duration": 244
  },
  {
    id: 146,
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkzMjk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 321
  },
  {
    id: 147,
    "title": "陈四才 - 努美罗格姿呗",
    "artist": "陈四才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkzMjc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFuEdtEjX2Z8l8c93Ajq6qO8nqHdPUg4k0zfrJoE3BDDhQWjequhgppA/0?wx_fmt=jpeg",
    "duration": 265
  },
  {
    id: 148,
    "title": "天龙 - 人生",
    "artist": "天龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkzMjI=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFrKUWhTfGFMxNNsz3oCQJ5JiaV3Q4yhOwdYKzZerdeIJgrvV2Iz7Bahg/0?wx_fmt=jpeg",
    "duration": 301
  },
  {
    id: 149,
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkzMDE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibV6ibEicbKg5SZ4xlf8nQQdjVJdWiaUiamXSIn7UCEuUII9ALM1T2Lmp96I0CPLNmyWsljUxnjYWqxKg/0?wx_fmt=jpeg",
    "duration": 296
  },
  {
    id: 150,
    "title": "阿夏丽 - 莫忘恩情",
    "artist": "阿夏丽",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkyNzI=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibibYibvlic8PD6IUbib87iaVJt9TAT1591libYBYwGiblJZVFsDTGFtXqX0pdP0fmvx7S5jrd51EHP2GIDQ/0?wx_fmt=jpeg",
    "duration": 232
  },
  {
    id: 151,
    "title": "和生辉 - 歌唱长水",
    "artist": "和生辉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkyNDA=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZBZ2v17qhuaicT5jTtHLglu4ucxhcrndVg2j0Ric7vr1Bptz8zFAicIiclfv9urOBK8ZoibISfx2hgDQ/0?wx_fmt=jpeg",
    "duration": 264
  },
  {
    id: 152,
    "artist": "肖煜光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkyMjY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9AXiaoEDgm0jakstwgVqBg9s2IwsKepeRGV2brFvkkKomB1E60Be3iaVzLXmysBOUqG4PmccjTiawYA/0?wx_fmt=jpeg",
    "duration": 228
  },
  {
    id: 153,
    "title": "庭松 - 盛世欢歌",
    "artist": "庭松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkyMTM=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJzooL7Za1iaicW3GyFkN7b1YUqjpJLt50aV1Q4zpwzpbpGzyicNAwibia1tA/0?wx_fmt=jpeg",
    "duration": 290
  },
  {
    id: 154,
    "title": "和锦 - 百草飘香的地方",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkxOTM=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJFsMemI3L9a7ia703l2xww98I5iaDCYukYiaqJIwFUOicfttgV0M6ia504wg/0?wx_fmt=jpeg",
    "duration": 223
  },
  {
    id: 155,
    "title": "金锁丽泉 - 塔城姑娘美",
    "artist": "金锁丽泉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkxOTE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibZID3sUSehDTDGNV74hZdJib5VIeyWqSia1KULW22Zq6AyDXvQhiambwyyg9ic6ic0AvliakWicIrnD5Dwg/0?wx_fmt=jpeg",
    "duration": 248
  },
  {
    id: 156,
    "title": "和瑞智 - 玉龙神韵",
    "artist": "和瑞智",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkxODI=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibxVULERGyrN6EQ90hiasHQyJuianJ6zhgCwhr8iakCceqHdC3icV29ubH2nks3zPG3HbSNxPERiaDibnSA/0?wx_fmt=jpeg",
    "duration": 428
  },
  {
    id: 157,
    "title": "树润花 - 姿姿好时获",
    "artist": "树润花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkxNzI=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibxVULERGyrN6EQ90hiasHQyPj2vQn42pXSwfC9iaz1mxSNLib8QWKYu1AK7eNLVB12f8VGDNpTfc2Gg/0?wx_fmt=jpeg",
    "duration": 216
  },
  {
    id: 158,
    "title": "纳西蕾蕾 - 我愿",
    "artist": "纳西蕾蕾",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkxNTQ=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVich7dW7dqv73P5wzJRRU3c8Jp1Cofiaxwufp4Ijibsp58XBbTWlsHHjJbq3NMlnqkRxmN8sRD5Rq9icQ/0?wx_fmt=jpeg",
    "duration": 257
  },
  {
    id: 159,
    "artist": "和慧琼、和燕、李九铭、马涛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkxNTE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVich7dW7dqv73P5wzJRRU3c8SNnIwBQaKta1q2nAuD0XAXye1Oib7MjtuzQXqic7Toxp1DQR0Bq1qaow/0?wx_fmt=jpeg",
    "duration": 192
  },
  {
    id: 160,
    "title": "李佳 - 阿莎蜜",
    "artist": "李佳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkxMTU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2Yynm9ZJcNwYVb4dw93xLt8zeXejU7JOiaBkTy7AMprJ5mJMwZ5IT0vBqA/0?wx_fmt=jpeg",
    "duration": 315
  },
  {
    id: 161,
    "title": "李承翰 - 纳西新劝世歌",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkxMDI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 300
  },
  {
    id: 162,
    "title": "阿花蜜 - 相依相守",
    "artist": "阿花蜜",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkwOTY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVibMM14g2P2dmOuUtVCNQ2Yyv1b6ibJ9Vn2FpRu6GxtVzEdCVMCC6kOeKjGsMNRPVmAC0Jen8Vak0WA/0?wx_fmt=jpeg",
    "duration": 239
  },
  {
    id: 163,
    "title": "木贵花 - 愿",
    "artist": "木贵花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkwNzA=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9S1icwGutOXntH2hIme4hicGiaWvUBZeOSnY15XwxZxBFhicFf8oB94P1S3GqUSr07YFnPFhaQgP0Plw/0?wx_fmt=jpeg",
    "duration": 307
  },
  {
    id: 164,
    "title": "和善武 - 爸美汝实贺",
    "artist": "和善武",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTkwMzY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV97ht8vllhIdlyWx26j1VMibhw32CVXUaBhibGnfmbqcF5tW0kTb0NTYaKycFseg4GUz2SD7IJhqqog/0?wx_fmt=jpeg",
    "duration": 251
  },
  {
    id: 165,
    "title": "幸福生活唱不完",
    "artist": "幸福生活唱不完",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5OTg=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9o4HTgRx4AV3LduianWdhYWQoHSsXpAo1a7icz4ExkgyFiboHf1KSyoMyo2aQAicwb0rtyjjdGibkO2SQ/0?wx_fmt=jpeg",
    "duration": 189
  },
  {
    id: 166,
    "title": "阿泉 - 纳西火把节",
    "artist": "阿泉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5ODc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9o4HTgRx4AV3LduianWdhYWSCHWWZaIlw5T5vjANjnicuRUmCS1zaGBvJC0P5z0LyKKHQQqMqJynkA/0?wx_fmt=jpeg",
    "duration": 243
  },
  {
    id: 167,
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5MjE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeP736tOJ9libibeVbmVe43mqTiaDbnCu7kO7PwxDSib1LbGFGrialTk8Jqfg/0?wx_fmt=jpeg",
    "duration": 264
  },
  {
    id: 168,
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5MTk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeP736tOJ9libibeVbmVe43mqTiaDbnCu7kO7PwxDSib1LbGFGrialTk8Jqfg/0?wx_fmt=jpeg",
    "duration": 260
  },
  {
    id: 169,
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5MTc=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeP736tOJ9libibeVbmVe43mqTiaDbnCu7kO7PwxDSib1LbGFGrialTk8Jqfg/0?wx_fmt=jpeg",
    "duration": 197
  },
  {
    id: 170,
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5MTU=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeP736tOJ9libibeVbmVe43mqTiaDbnCu7kO7PwxDSib1LbGFGrialTk8Jqfg/0?wx_fmt=jpeg",
    "duration": 192
  },
  {
    id: 171,
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5MTE=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeP736tOJ9libibeVbmVe43mqTiaDbnCu7kO7PwxDSib1LbGFGrialTk8Jqfg/0?wx_fmt=jpeg",
    "duration": 241
  },
  {
    id: 172,
    "artist": "和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg5MDk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeP736tOJ9libibeVbmVe43mqTiaDbnCu7kO7PwxDSib1LbGFGrialTk8Jqfg/0?wx_fmt=jpeg",
    "duration": 228
  },
  {
    id: 173,
    "title": "郑旭先 - 纳西潘金妹",
    "artist": "郑旭先",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg4OTY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeO60VGZTzZxUFicUa24giangIEfricdYUOibr9RgKTiaPZicgAHSWrUCDvJWw/0?wx_fmt=jpeg",
    "duration": 185
  },
  {
    id: 174,
    "title": "郑旭先 - 冬之歌",
    "artist": "郑旭先",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg4ODA=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeJyNibQGibsibIzgQXfTRjdIcfq5ibwGc5kqdjcSgbOnKib8bgr7SoSQcqWw/0?wx_fmt=jpeg",
    "duration": 228
  },
  {
    id: 175,
    "title": "杨耀兰 - 秋之歌",
    "artist": "杨耀兰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg4Nzg=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xegPLtiaS4icmPj04FTLrLkUgSTqmaKicfty0vlzibXJIibAGGf39XQAD98bQ/0?wx_fmt=jpeg",
    "duration": 263
  },
  {
    id: 176,
    "title": "李丽芳 - 夏之歌",
    "artist": "李丽芳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg4NzY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeIFmWo5Btnib93XKpA0PnyX4eqdiaYap4WlQIWIEX4gm1swDVWbK9R9icA/0?wx_fmt=jpeg",
    "duration": 268
  },
  {
    id: 177,
    "title": "王瑞香 - 春之歌",
    "artist": "王瑞香",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg4NzQ=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xecOULzOI69StzBgQ6mOOLg59I32q7ZeNJyJ1rRdDwrCYNcRiamMAVHRg/0?wx_fmt=jpeg",
    "duration": 287
  },
  {
    id: 178,
    "title": "李丽芳 - 恩难忘",
    "artist": "李丽芳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg4NzI=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV8SBxZ3gIMvFhWUUvlPT0xeicFPYCIsUnpGhVggsu0sRWh2pNoyHGUhGWcvCfpaibbAZK8Wvdo1w0kA/0?wx_fmt=jpeg",
    "duration": 307
  },
  {
    id: 179,
    "title": "故乡太安",
    "artist": "故乡太安",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg4Mjk=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCV9MvSuno0y0pHic0lg7KhJhTjOibuYonDbibN4dhuz0pdS1jmt77jaF9WkXQzhFx4vR1MT9ky6t0jUBQ/0?wx_fmt=jpeg",
    "duration": 222
  },
  {
    id: 180,
    "title": "阿福 - 歌颂党情",
    "artist": "阿福",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg4MTY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicuNH092cxUKSRmibSAEzj2cUhnsRqHO6dXAhCPChjxnM0g5oXECiavGwp8lmocAZqppouGnaytI7uw/0?wx_fmt=jpeg",
    "duration": 200
  },
  {
    id: 181,
    "artist": "和文军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg4MDY=",
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicuNH092cxUKSRmibSAEzj2ck4icK1MjXRD0CcpWzlzybQDY1qAbRPmhDdfA7t7ox0OpM8ZnvCISvrg/0?wx_fmt=jpeg",
    "duration": 320
  },
  {
    id: 182,
    "title": "和金花 - 拉伯谷气",
    "artist": "和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg3OTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 290
  },
  {
    id: 183,
    "title": "涵依玛吉 - 花季情思",
    "artist": "涵依玛吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg2OTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 271
  },
  {
    id: 184,
    "title": "和君梅 - 孝行颂",
    "artist": "和君梅",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg2OTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 182
  },
  {
    id: 185,
    "title": "和丽刚、金顺 - 缘定今生",
    "artist": "和丽刚、金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg2NzM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 281
  },
  {
    id: 186,
    "title": "和丽刚 - 菩捞阿姆",
    "artist": "和丽刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg2MjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 307
  },
  {
    id: 187,
    "title": "丽江小龙 - 舞动丽江",
    "artist": "丽江小龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg2MDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 297
  },
  {
    id: 188,
    "title": "和锦 - 四时吉祥",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTg0NjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 255
  },
  {
    id: 189,
    "title": "金顺 - 草原上的女人",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTgxNTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 269
  },
  {
    id: 190,
    "title": "根呷 - 尼西情",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc5NDc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 336
  },
  {
    id: 191,
    "title": "阿强 - 茸余敢莫标",
    "artist": "阿强",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTc2MzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 251
  },
  {
    id: 192,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 232
  },
  {
    id: 193,
    "title": "和丽刚 - 莫让人生一场空",
    "artist": "和丽刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTcyNTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 248
  },
  {
    id: 194,
    "title": "和丽霞 - 纳西美",
    "artist": "和丽霞 - 纳西美",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTcxODI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 255
  },
  {
    id: 195,
    "title": "山人行组合 纳子若西 - 喝酒人",
    "artist": "山人行组合 纳子若西",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTcwODY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 235
  },
  {
    id: 196,
    "title": "梦想成真",
    "artist": "梦想成真",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTcwNDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 279
  },
  {
    id: 197,
    "title": "金沙姑娘组合 - 梦想成真",
    "artist": "金沙姑娘组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY4ODc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 279
  },
  {
    id: 198,
    "title": "塔嘎阿秋、和丽刚 - 大山情",
    "artist": "塔嘎阿秋、和丽刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY3NTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 274
  },
  {
    id: 199,
    "title": "根呷 - 爱在玉隆拉措",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY3MTc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 239
  },
  {
    id: 200,
    "title": "根呷 - 高高的拉措",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY3MTY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 229
  },
  {
    id: 201,
    "title": "根呷 - 去马尼干戈的路上",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY3MTU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 246
  },
  {
    id: 202,
    "title": "根呷 - 霞光中的翅膀",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY3MTQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 269
  },
  {
    id: 203,
    "title": "根呷 - 雪域名城",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY3MTM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 206
  },
  {
    id: 204,
    "title": "根呷 - 英雄部落",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY3MTE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 335
  },
  {
    id: 205,
    "title": "纳西谷气 - 新年祝福",
    "artist": "纳西谷气",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTY2ODQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 167
  },
  {
    id: 206,
    "title": "水风永相伴",
    "artist": "水风永相伴",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTU1Mzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 276
  },
  {
    id: 207,
    "title": "金顺 - 色卡飘季几",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTU0MzM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 268
  },
  {
    id: 208,
    "title": "和丽刚 - 姿磋",
    "artist": "和丽刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTUzMzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 319
  },
  {
    id: 209,
    "title": "【王朝信】忆苦思甜（喂默达调）",
    "artist": "【王朝信】忆苦思甜（喂默达调）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTUzMDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1518
  },
  {
    id: 210,
    "title": "和杨 - 人生如梦",
    "artist": "和杨",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTUxOTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 252
  },
  {
    id: 211,
    "title": "阿尼布鲁鲁 - 可可托海的牧羊人",
    "artist": "阿尼布鲁鲁",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTUxNzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 340
  },
  {
    id: 212,
    "title": "和馨怡 - 美好的时光",
    "artist": "和馨怡",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTUxNzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 190
  },
  {
    id: 213,
    "title": "建设美丽丽江（纳西快板）",
    "artist": "建设美丽丽江（纳西快板）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTUwNDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1133
  },
  {
    id: 214,
    "title": "阿尼布鲁鲁、纳西英子 - 美丽的神话.",
    "artist": "阿尼布鲁鲁、纳西英子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTUwMTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 294
  },
  {
    id: 215,
    "title": "杨润琴 - 请喝一碗纳西酒 喂唻喂唻",
    "artist": "杨润琴",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTQ5ODA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 137
  },
  {
    id: 216,
    "title": "和世奇（四爷） - 父亲",
    "artist": "和世奇（四爷）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTQ5MjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 243
  },
  {
    id: 217,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 232
  },
  {
    id: 218,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 326
  },
  {
    id: 219,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 255
  },
  {
    id: 220,
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 268
  },
  {
    id: 221,
    "title": "薄荷酒",
    "artist": "薄荷酒",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTQ3NTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 191
  },
  {
    id: 222,
    "title": "玉龙恋歌（纳西族）李艳婷 李映昀",
    "artist": "玉龙恋歌（纳西族）李艳婷 李映昀",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTQ3MDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 371
  },
  {
    id: 223,
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Pfob4GOy3ZueVaiaULB7dYycoh7CxJ1DclToF5rnqAnrPvZ0yVaoJvfH6xfibEgj7c0dZVaRRB2VyvicPruVUjM4bj9dQKjW7W4I/640?wx_fmt=png&from=appmsg",
    "duration": 422
  },
  {
    id: 224,
    "title": "纳西酒歌（李艳婷演唱）",
    "artist": "纳西酒歌（李艳婷演唱）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTQyMTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 249
  },
  {
    id: 225,
    "title": "冬去春来（李艳婷作品）",
    "artist": "冬去春来（李艳婷作品）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTM4ODk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 258
  },
  {
    id: 226,
    "title": "和雪凤 - 二月八的祝福",
    "artist": "和雪凤",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTM3MDg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 231
  },
  {
    id: 227,
    "title": "杨永爱 - 纳西嘎妩蹉",
    "artist": "杨永爱",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTM1OTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 373
  },
  {
    id: 228,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 335
  },
  {
    id: 229,
    "title": "荒田野 - 孝道",
    "artist": "荒田野",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTM1ODI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 334
  },
  {
    id: 230,
    "title": "丽江涅槃序曲童谣",
    "artist": "丽江涅槃序曲童谣",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTM1Mzc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 85
  },
  {
    id: 231,
    "title": "布谷传佳信",
    "artist": "布谷传佳信",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTM0ODg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 232
  },
  {
    id: 232,
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Pfob4GOy3ZueVaiaULB7dYycoh7CxJ1DclToF5rnqAnrPvZ0yVaoJvfH6xfibEgj7c0dZVaRRB2VyvicPruVUjM4bj9dQKjW7W4I/640?wx_fmt=png&from=appmsg",
    "duration": 218
  },
  {
    id: 233,
    "title": "纳西童谣 - 月亮姆",
    "artist": "纳西童谣",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTMzNjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 75
  },
  {
    id: 234,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 250
  },
  {
    id: 235,
    "title": "和丽龙 - 人生莫愁",
    "artist": "和丽龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTMzMTQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Nw9LsfY0B3jRfCP9IrSSjgIkR3usu3iceMibqPqGcDl2HGC6quJlPI0VHZxQiaMC8Raj8SHD8BVujDnhPqWMEZFGNnddk1DFrmTA/640?wx_fmt=png&from=appmsg",
    "duration": 215
  },
  {
    id: 236,
    "title": "日纳黑帅《天籁笛乐》",
    "artist": "日纳黑帅《天籁笛乐》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTMwMDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 898
  },
  {
    id: 237,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 252
  },
  {
    id: 238,
    "title": "次仁桑珠 - 幸福拉萨",
    "artist": "次仁桑珠",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI4MzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 242
  },
  {
    id: 239,
    "title": "纳西童谣——屋后喀嚓嚓",
    "artist": "纳西童谣——屋后喀嚓嚓",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI3Nzc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 123
  },
  {
    id: 240,
    "title": "陈四才 - 幸福醉歌",
    "artist": "陈四才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI3NzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 215
  },
  {
    id: 241,
    "title": "丽江情",
    "artist": "丽江情",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI3Njc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 253
  },
  {
    id: 242,
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Pfob4GOy3ZueVaiaULB7dYycoh7CxJ1DclToF5rnqAnrPvZ0yVaoJvfH6xfibEgj7c0dZVaRRB2VyvicPruVUjM4bj9dQKjW7W4I/640?wx_fmt=png&from=appmsg",
    "duration": 205
  },
  {
    id: 243,
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Pfob4GOy3ZueVaiaULB7dYycoh7CxJ1DclToF5rnqAnrPvZ0yVaoJvfH6xfibEgj7c0dZVaRRB2VyvicPruVUjM4bj9dQKjW7W4I/640?wx_fmt=png&from=appmsg",
    "duration": 245
  },
  {
    id: 244,
    "title": "和君梅 - 心里话",
    "artist": "和君梅",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI2ODM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 240
  },
  {
    id: 245,
    "title": "相守今生",
    "artist": "相守今生",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI2MDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 333
  },
  {
    id: 246,
    "title": "李秀香 - 古老的歌",
    "artist": "李秀香",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI1OTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 581
  },
  {
    id: 247,
    "title": "刘璇 - 故乡丽江",
    "artist": "刘璇",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI1ODM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 260
  },
  {
    id: 248,
    "title": "李铭九 - 受栽蒙套",
    "artist": "李铭九",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI1MjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 226
  },
  {
    id: 249,
    "title": "金沙情歌.mp3",
    "artist": "金沙情歌.mp3",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI1MDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 268
  },
  {
    id: 250,
    "title": "阿佳组合 - 格桑阿佳",
    "artist": "阿佳组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTI0NTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 244
  },
  {
    id: 251,
    "title": "一滴水经过丽江-曹怀瑾、曹文杨",
    "artist": "一滴水经过丽江-曹怀瑾、曹文杨",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIzOTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 107
  },
  {
    id: 252,
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Pfob4GOy3ZueVaiaULB7dYycoh7CxJ1DclToF5rnqAnrPvZ0yVaoJvfH6xfibEgj7c0dZVaRRB2VyvicPruVUjM4bj9dQKjW7W4I/640?wx_fmt=png&from=appmsg",
    "duration": 204
  },
  {
    id: 253,
    "title": "和继元  和志秋 - 建设美丽丽江（纳西快板）",
    "artist": "和继元  和志秋",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIzMzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1133
  },
  {
    id: 254,
    "title": "纳若 - 密码丽江",
    "artist": "纳若",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIyMzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 290
  },
  {
    id: 255,
    "title": "玉龙山组合 - 起新房",
    "artist": "玉龙山组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIyMDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 236
  },
  {
    id: 256,
    "title": "金顺 - 吾日吾几",
    "artist": "金顺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIxMzM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 261
  },
  {
    id: 257,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 206
  },
  {
    id: 258,
    "title": "阿里里花花色",
    "artist": "阿里里花花色",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIxMTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 237
  },
  {
    id: 259,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 227
  },
  {
    id: 260,
    "title": "时代颂 - 和述明",
    "artist": "时代颂",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwOTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 285
  },
  {
    id: 261,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 208
  },
  {
    id: 262,
    "title": "神仙在哪里",
    "artist": "神仙在哪里",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwODU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 240
  },
  {
    id: 263,
    "title": "《真的爱你》纳西语版",
    "artist": "《真的爱你》纳西语版",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwNjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 166
  },
  {
    id: 264,
    "title": "泸沽湖最新甲搓舞",
    "artist": "泸沽湖最新甲搓舞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwNTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1065
  },
  {
    id: 265,
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasOkRpZzDDUJMiagv8UP8ibaxSux7cf6ILCgARISoa4Wu8zNNaOuKBSIicA/640?wx_fmt=jpeg&from=appmsg",
    "duration": 200
  },
  {
    id: 266,
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 300
  },
  {
    id: 267,
    "title": "和丽龙 - 呼唤",
    "artist": "和丽龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwMzk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Nw9LsfY0B3jRfCP9IrSSjgIkR3usu3iceMibqPqGcDl2HGC6quJlPI0VHZxQiaMC8Raj8SHD8BVujDnhPqWMEZFGNnddk1DFrmTA/640?wx_fmt=png&from=appmsg",
    "duration": 302
  },
  {
    id: 268,
    "title": "梦在路上 - 天龙",
    "artist": "梦在路上",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwMjk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 225
  },
  {
    id: 269,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 260
  },
  {
    id: 270,
    "title": "丽江迪高 - 丽江真美好",
    "artist": "丽江迪高",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwMjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 442
  },
  {
    id: 271,
    "title": "敬奉三大神",
    "artist": "敬奉三大神",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwMDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 238
  },
  {
    id: 272,
    "title": "张曦尹 - 玉龙山下纳西娃",
    "artist": "张曦尹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwMDg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 260
  },
  {
    id: 273,
    "title": "和德华 - 纳西吉祥",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwMDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 224
  },
  {
    id: 274,
    "title": "我要抱着你 (纳西语)",
    "artist": "我要抱着你 (纳西语)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTIwMDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 280
  },
  {
    id: 275,
    "title": "牵挂",
    "artist": "牵挂",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5OTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 227
  },
  {
    id: 276,
    "title": "纳若 - 摩梭谣",
    "artist": "纳若",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5OTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 262
  },
  {
    id: 277,
    "title": "阿哩哩格吉拍",
    "artist": "阿哩哩格吉拍",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5ODk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 335
  },
  {
    id: 278,
    "title": "和金花 - 嫁女调",
    "artist": "和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 188
  },
  {
    id: 279,
    "title": "和丽龙 - 冬天的约定",
    "artist": "和丽龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NjA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Nw9LsfY0B3jRfCP9IrSSjgIkR3usu3iceMibqPqGcDl2HGC6quJlPI0VHZxQiaMC8Raj8SHD8BVujDnhPqWMEZFGNnddk1DFrmTA/640?wx_fmt=png&from=appmsg",
    "duration": 304
  },
  {
    id: 280,
    "title": "遇见你 - 王瑞香",
    "artist": "遇见你",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 304
  },
  {
    id: 281,
    "title": "和翠刚 - 睡在我上铺的兄弟",
    "artist": "和翠刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 210
  },
  {
    id: 282,
    "title": "纳西古歌 - 唠喂调",
    "artist": "纳西古歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 180
  },
  {
    id: 283,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 259
  },
  {
    id: 284,
    "title": "丽江风暴（二）",
    "artist": "丽江风暴（二）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 300
  },
  {
    id: 285,
    "title": "纳西田野之声 - 阿卡巴拉",
    "artist": "纳西田野之声",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 185
  },
  {
    id: 286,
    "title": "纳西田野之声 - 纳西仁美蹉",
    "artist": "纳西田野之声",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5NDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 239
  },
  {
    id: 287,
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 246
  },
  {
    id: 288,
    "title": "泸沽湖民间甲搓舞曲",
    "artist": "泸沽湖民间甲搓舞曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5Mjc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1189
  },
  {
    id: 289,
    "title": "贺顺才 - 舞动傈僳寨",
    "artist": "贺顺才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5MTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 189
  },
  {
    id: 290,
    "title": "和燕 - 当爱情来过",
    "artist": "和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5MTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 303
  },
  {
    id: 291,
    "title": "维西阿娜 - 背兰花",
    "artist": "维西阿娜",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5MTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 221
  },
  {
    id: 292,
    "title": "玉龙山组合 - 三多颂",
    "artist": "玉龙山组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5MDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 301
  },
  {
    id: 293,
    "title": "山人行组合 - 思乡曲",
    "artist": "山人行组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE5MDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 275
  },
  {
    id: 294,
    "title": "纳西纵歌",
    "artist": "纳西纵歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4OTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 170
  },
  {
    id: 295,
    "title": "干酒醉dj - 洛玛底组合",
    "artist": "干酒醉dj",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4ODg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 178
  },
  {
    id: 296,
    "title": "傈僳族打跳 - 黑帅",
    "artist": "傈僳族打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4ODY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 204
  },
  {
    id: 297,
    "title": "吉萨莎玛 - 云南",
    "artist": "吉萨莎玛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4ODM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 215
  },
  {
    id: 298,
    "title": "纳藏白西",
    "artist": "纳藏白西",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4NzM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 330
  },
  {
    id: 299,
    "title": "和霞芬 - 问",
    "artist": "和霞芬",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4NzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 264
  },
  {
    id: 300,
    "title": "东巴石子 - 玉龙之子",
    "artist": "东巴石子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4NzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 343
  },
  {
    id: 301,
    "title": "涵格佩吉 - 纳西西余花花色",
    "artist": "涵格佩吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4Njk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 249
  },
  {
    id: 302,
    "title": "和燕 - 玉龙酒歌",
    "artist": "和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4NjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 270
  },
  {
    id: 303,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 216
  },
  {
    id: 304,
    "title": "纳西族母语《童谣》",
    "artist": "纳西族母语《童谣》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4NTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 246
  },
  {
    id: 305,
    "title": "纳西谷气",
    "artist": "纳西谷气",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4NTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 154
  },
  {
    id: 306,
    "title": "纳西打跳（18）",
    "artist": "纳西打跳（18）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4NDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 389
  },
  {
    id: 307,
    "title": "贺顺才 - 牧羊的傈僳姑娘",
    "artist": "贺顺才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4NDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 197
  },
  {
    id: 308,
    "title": "和丽元 - 时授么哒婆",
    "artist": "和丽元",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4Mzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 277
  },
  {
    id: 309,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 292
  },
  {
    id: 310,
    "title": "纳西英子 - 声音的篇章",
    "artist": "纳西英子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE4MzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 211
  },
  {
    id: 311,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 251
  },
  {
    id: 312,
    "title": "热美姿蹉-原生态组合.mp3",
    "artist": "热美姿蹉-原生态组合.mp3",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3OTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 297
  },
  {
    id: 313,
    "title": "纳西民歌《党的的恩情永不忘》",
    "artist": "纳西民歌《党的的恩情永不忘》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3ODQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 484
  },
  {
    id: 314,
    "title": "阿夏组合 - 纳西姑娘",
    "artist": "阿夏组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3NzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 167
  },
  {
    id: 315,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 72
  },
  {
    id: 316,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 273
  },
  {
    id: 317,
    "title": "送丧跺脚跳",
    "artist": "送丧跺脚跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3NTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 234
  },
  {
    id: 318,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 176
  },
  {
    id: 319,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 231
  },
  {
    id: 320,
    "title": "喂默达调 - 阔流巴蕊",
    "artist": "喂默达调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3MzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 296
  },
  {
    id: 321,
    "title": "美丽的古城 - 丽江小龙",
    "artist": "美丽的古城",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3MzU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 236
  },
  {
    id: 322,
    "title": "张继心 - 踏歌丽江.mp3",
    "artist": "张继心",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3MjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 244
  },
  {
    id: 323,
    "title": "咱撮鲁啦",
    "artist": "咱撮鲁啦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3MTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 207
  },
  {
    id: 324,
    "title": "阿石才 - 子啦来",
    "artist": "阿石才",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3MTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 273
  },
  {
    id: 325,
    "title": "纳西民歌《天女织锦缎》",
    "artist": "纳西民歌《天女织锦缎》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3MTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 254
  },
  {
    id: 326,
    "title": "丽江在哪里",
    "artist": "丽江在哪里",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3MTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 304
  },
  {
    id: 327,
    "title": "呀哩拉哩",
    "artist": "呀哩拉哩",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE3MDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 293
  },
  {
    id: 328,
    "title": "纳西谷气调",
    "artist": "纳西谷气调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2OTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 150
  },
  {
    id: 329,
    "title": "纳西古歌",
    "artist": "纳西古歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2OTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 320
  },
  {
    id: 330,
    "title": "纳西打跳 - 快乐纳西人",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 361
  },
  {
    id: 331,
    "title": "纳若 - 恋您我的家",
    "artist": "纳若",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 243
  },
  {
    id: 332,
    "title": "木作为 - 舞动玉龙",
    "artist": "木作为",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2Njc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 337
  },
  {
    id: 333,
    "title": "木作为 - 美丽的丽江",
    "artist": "木作为",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 286
  },
  {
    id: 334,
    "title": "纳若 - 不怕",
    "artist": "纳若",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 281
  },
  {
    id: 335,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 387
  },
  {
    id: 336,
    "title": "纳西喔么达 - 革囊渡",
    "artist": "纳西喔么达",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NDg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 299
  },
  {
    id: 337,
    "title": "纳西花哗磋",
    "artist": "纳西花哗磋",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2NDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 254
  },
  {
    id: 338,
    "title": "和丽生 - 我的阿妈",
    "artist": "和丽生",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MzU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 275
  },
  {
    id: 339,
    "title": "玉龙山组合 - 哦噜唠，敖噜唠",
    "artist": "玉龙山组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 197
  },
  {
    id: 340,
    "title": "纳西英子 - 老人",
    "artist": "纳西英子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MzM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 245
  },
  {
    id: 341,
    "title": "【纳西歌曲】神爱世人",
    "artist": "【纳西歌曲】神爱世人",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 278
  },
  {
    id: 342,
    "title": "阿丽丽金拍",
    "artist": "阿丽丽金拍",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 239
  },
  {
    id: 343,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 246
  },
  {
    id: 344,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 213
  },
  {
    id: 345,
    "title": "纳西谷气《南兴调》",
    "artist": "纳西谷气《南兴调》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 94
  },
  {
    id: 346,
    "title": "纳西族童谣 - 嘿美玻",
    "artist": "纳西族童谣",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE2MTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 216
  },
  {
    id: 347,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 305
  },
  {
    id: 348,
    "title": "和德华 - 数鸡蛋",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1ODY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 203
  },
  {
    id: 349,
    "title": "纳西喂么达《黄鹰与耕牛》",
    "artist": "纳西喂么达《黄鹰与耕牛》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1ODU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 194
  },
  {
    id: 350,
    "title": "和军 - 摩梭夜歌",
    "artist": "和军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1NzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 266
  },
  {
    id: 351,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 196
  },
  {
    id: 352,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 249
  },
  {
    id: 353,
    "title": "马涛 - 三多保佑",
    "artist": "马涛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1NjU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 314
  },
  {
    id: 354,
    "title": "张桂华 - 哦噜唠 敖噜唠",
    "artist": "张桂华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1NTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 370
  },
  {
    id: 355,
    "title": "甲姆沽·阿平、阿花 - 不要忧虑",
    "artist": "甲姆沽·阿平、阿花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1NTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 244
  },
  {
    id: 356,
    "title": "阿勒邱 -黄颖星",
    "artist": "阿勒邱 -黄颖星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1NTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 215
  },
  {
    id: 357,
    "title": "和上钧&amp;阿诛 - 玉龙雪山的故事",
    "artist": "和上钧&amp;阿诛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1MzM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 350
  },
  {
    id: 358,
    "title": "李铭九 - 情调",
    "artist": "李铭九",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1MzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 230
  },
  {
    id: 359,
    "title": "和朝花 和会花 - 牵手",
    "artist": "和朝花 和会花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1MzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 185
  },
  {
    id: 360,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 196
  },
  {
    id: 361,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 272
  },
  {
    id: 362,
    "title": "和漩 - 美丽的古城",
    "artist": "和漩",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE1MTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 238
  },
  {
    id: 363,
    "title": "丽江风暴（三）",
    "artist": "丽江风暴（三）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0OTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 972
  },
  {
    id: 364,
    "title": "和学文 - 玉龙誓约",
    "artist": "和学文",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0OTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 274
  },
  {
    id: 365,
    "title": "和德华 - 序",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0OTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 174
  },
  {
    id: 366,
    "title": "九月（纳西语）",
    "artist": "九月（纳西语）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0OTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 281
  },
  {
    id: 367,
    "title": "万物生（纳西语）",
    "artist": "万物生（纳西语）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0OTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 270
  },
  {
    id: 368,
    "title": "嫁女情",
    "artist": "嫁女情",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0ODQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 233
  },
  {
    id: 369,
    "title": "和月圆、和国江 - 牧羊歌",
    "artist": "和月圆、和国江",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0ODI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 355
  },
  {
    id: 370,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 210
  },
  {
    id: 371,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 242
  },
  {
    id: 372,
    "title": "山人行组合 - 三月花开时",
    "artist": "山人行组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0Njg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 246
  },
  {
    id: 373,
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 200
  },
  {
    id: 374,
    "title": "山娃子新歌 - 山娃子",
    "artist": "山娃子新歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0NTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 243
  },
  {
    id: 375,
    "title": "阿石才 - 瓜迟迟",
    "artist": "阿石才",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0NDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 397
  },
  {
    id: 376,
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 224
  },
  {
    id: 377,
    "title": "玉龙雪山的牧童",
    "artist": "玉龙雪山的牧童",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0MjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 265
  },
  {
    id: 378,
    "title": "段婷婷 - 欢迎到太安来",
    "artist": "段婷婷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0MjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 122
  },
  {
    id: 379,
    "title": "好兄弟 - 丽江小龙",
    "artist": "好兄弟",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTE0MDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 193
  },
  {
    id: 380,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 301
  },
  {
    id: 381,
    "title": "和金花 - 劝牛调",
    "artist": "和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzOTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 205
  },
  {
    id: 382,
    "title": "和群星 - 的库册尼嘿",
    "artist": "和群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzODI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 250
  },
  {
    id: 383,
    "title": "和永昌 - 欢乐纳西年",
    "artist": "和永昌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzNzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 190
  },
  {
    id: 384,
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 221
  },
  {
    id: 385,
    "title": "和杰华 - 欢迎来到傈僳寨",
    "artist": "和杰华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzNzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 127
  },
  {
    id: 386,
    "title": "傈僳朗玛组合 - 酒韵永胜",
    "artist": "傈僳朗玛组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzNzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 459
  },
  {
    id: 387,
    "title": "丽江小龙 - 纳西阿妹",
    "artist": "丽江小龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzNjc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 273
  },
  {
    id: 388,
    "title": "木作为 - 爱的翅膀",
    "artist": "木作为",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzNTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 263
  },
  {
    id: 389,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 241
  },
  {
    id: 390,
    "title": "乡音组合 - 祝婚歌",
    "artist": "乡音组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzNTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 145
  },
  {
    id: 391,
    "title": "和世奇（四爷) - 雪山情歌",
    "artist": "和世奇（四爷)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzMzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 319
  },
  {
    id: 392,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 219
  },
  {
    id: 393,
    "title": "和朝花 和会花 和文明 - 欢爱",
    "artist": "和朝花 和会花 和文明",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzMjc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 204
  },
  {
    id: 394,
    "title": "让我们一起干酒醉",
    "artist": "让我们一起干酒醉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzMTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 203
  },
  {
    id: 395,
    "title": "桑瓦贡不勒",
    "artist": "桑瓦贡不勒",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzMTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 221
  },
  {
    id: 396,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 252
  },
  {
    id: 397,
    "title": "娄丽珍 - 纳西栽秧调",
    "artist": "娄丽珍",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEzMDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 143
  },
  {
    id: 398,
    "title": "和晓霞 - 彩云之南",
    "artist": "和晓霞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyOTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 172
  },
  {
    id: 399,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 194
  },
  {
    id: 400,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 276
  },
  {
    id: 401,
    "title": "和德华 -《西库揍》抓小偷",
    "artist": "和德华 -《西库揍》抓小偷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyODQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 256
  },
  {
    id: 402,
    "title": "纳西阿里里",
    "artist": "纳西阿里里",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyNjg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 738
  },
  {
    id: 403,
    "title": "阿哩哩芦笙调 - 革囊渡",
    "artist": "阿哩哩芦笙调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyNjc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 118
  },
  {
    id: 404,
    "title": "闪脚跳（傈僳族锅庄）",
    "artist": "闪脚跳（傈僳族锅庄）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyNjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 262
  },
  {
    id: 405,
    "title": "纳西打跳 - 呀哈哩",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyNTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 360
  },
  {
    id: 406,
    "title": "张曦尹 - 山那边的放猪娃",
    "artist": "张曦尹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyNTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 229
  },
  {
    id: 407,
    "title": "纳西西于花花神",
    "artist": "纳西西于花花神",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyNDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 223
  },
  {
    id: 408,
    "title": "丽江群星 - 去哪里",
    "artist": "丽江群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyNDg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 302
  },
  {
    id: 409,
    "title": "博开崩莫赌",
    "artist": "博开崩莫赌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyMzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 345
  },
  {
    id: 410,
    "title": "纳西田野之声 - 哦热热",
    "artist": "纳西田野之声",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyMjg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 226
  },
  {
    id: 411,
    "title": "和德华 - 二由三由的一天",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyMjc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 266
  },
  {
    id: 412,
    "title": "三江组合 - 三朵花",
    "artist": "三江组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyMjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 246
  },
  {
    id: 413,
    "title": "木江子组合 酒歌",
    "artist": "木江子组合 酒歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyMTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 119
  },
  {
    id: 414,
    "title": "纳西谷气 - 玉龙雪山放光芒",
    "artist": "纳西谷气",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyMTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 77
  },
  {
    id: 415,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 277
  },
  {
    id: 416,
    "title": "那年花开-玉龙女组合",
    "artist": "那年花开-玉龙女组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEyMDg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 252
  },
  {
    id: 417,
    "title": "村村寨寨来打跳",
    "artist": "村村寨寨来打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExOTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 437
  },
  {
    id: 418,
    "title": "阿智 - 喜欢你（纳西语）",
    "artist": "阿智",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExODc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 250
  },
  {
    id: 419,
    "title": "和德华 - 天雨流芳",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExODU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 207
  },
  {
    id: 420,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 240
  },
  {
    id: 421,
    "title": "纳西花花搓",
    "artist": "纳西花花搓",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExODA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 251
  },
  {
    id: 422,
    "title": "超越葫芦笙 (dj)",
    "artist": "超越葫芦笙 (dj)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 650
  },
  {
    id: 423,
    "title": "纳西仁美磋",
    "artist": "纳西仁美磋",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 300
  },
  {
    id: 424,
    "title": "哦噜唠，敖噜唠",
    "artist": "哦噜唠，敖噜唠",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNjU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 336
  },
  {
    id: 425,
    "title": "道诺谷纳西田野之声 -阿卡巴拉",
    "artist": "道诺谷纳西田野之声 -阿卡巴拉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 185
  },
  {
    id: 426,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 222
  },
  {
    id: 427,
    "title": "阿石才 - 请到傈僳山寨来",
    "artist": "阿石才",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 188
  },
  {
    id: 428,
    "title": "纳西时本授",
    "artist": "纳西时本授",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 108
  },
  {
    id: 429,
    "title": "纳西三脚打跳",
    "artist": "纳西三脚打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExNDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 257
  },
  {
    id: 430,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 275
  },
  {
    id: 431,
    "title": "纳西阿刚 - 纳西情歌",
    "artist": "纳西阿刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExMzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 158
  },
  {
    id: 432,
    "title": "纳西瑞瑞",
    "artist": "纳西瑞瑞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExMzM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 328
  },
  {
    id: 433,
    "title": "傈僳族打跳：小毛调",
    "artist": "傈僳族打跳：小毛调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExMjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 251
  },
  {
    id: 434,
    "title": "三代女人的歌",
    "artist": "三代女人的歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExMTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 175
  },
  {
    id: 435,
    "title": "和丽龙 - 玉龙欢歌",
    "artist": "和丽龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExMTQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Nw9LsfY0B3jRfCP9IrSSjgIkR3usu3iceMibqPqGcDl2HGC6quJlPI0VHZxQiaMC8Raj8SHD8BVujDnhPqWMEZFGNnddk1DFrmTA/640?wx_fmt=png&from=appmsg",
    "duration": 279
  },
  {
    id: 436,
    "title": "纳西语朗诵《纳西家国情》",
    "artist": "纳西语朗诵《纳西家国情》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExMDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 487
  },
  {
    id: 437,
    "title": "高原风暴",
    "artist": "高原风暴",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTExMDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 439
  },
  {
    id: 438,
    "title": "西余索-张桂华",
    "artist": "西余索-张桂华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwOTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 251
  },
  {
    id: 439,
    "title": "快乐的打跳",
    "artist": "快乐的打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwOTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 307
  },
  {
    id: 440,
    "title": "朱丽凡－大美永胜",
    "artist": "朱丽凡－大美永胜",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwOTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 240
  },
  {
    id: 441,
    "title": "朱丽凡 - 芦笙欢跳好日子",
    "artist": "朱丽凡",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwODU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 710
  },
  {
    id: 442,
    "title": "纳西新劝世歌",
    "artist": "纳西新劝世歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwNzM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 300
  },
  {
    id: 443,
    "title": "纳西故事 - 赔麦子",
    "artist": "纳西故事",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwNzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 199
  },
  {
    id: 444,
    "title": "和金花 - 美丽的白云",
    "artist": "和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwNTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 140
  },
  {
    id: 445,
    "title": "和德华 - 健康歌",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwNTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 197
  },
  {
    id: 446,
    "title": "丽江风暴 1",
    "artist": "丽江风暴 1",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwNDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 970
  },
  {
    id: 447,
    "title": "和金花 - 三月百花开",
    "artist": "和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwNDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 85
  },
  {
    id: 448,
    "title": "嘎迟妥洛目",
    "artist": "嘎迟妥洛目",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwMjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 169
  },
  {
    id: 449,
    "title": "和议财(纳西族) - 阿卡巴拉",
    "artist": "和议财(纳西族)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTEwMTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 249
  },
  {
    id: 450,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 138
  },
  {
    id: 451,
    "title": "呀哩拉勒",
    "artist": "呀哩拉勒",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA5OTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 251
  },
  {
    id: 452,
    "title": "嘿美孜卜（月光下）",
    "artist": "嘿美孜卜（月光下）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA5OTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 514
  },
  {
    id: 453,
    "title": "三江组合 -彩云家乡",
    "artist": "三江组合 -彩云家乡",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA5ODI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 226
  },
  {
    id: 454,
    "title": "纳若 - 三朵花",
    "artist": "纳若",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA5Nzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 289
  },
  {
    id: 455,
    "title": "和群星 - 纳西情歌",
    "artist": "和群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA5NzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 235
  },
  {
    id: 456,
    "title": "和德华 - 阿一旦",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA5NDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 192
  },
  {
    id: 457,
    "title": "纳西族打跳",
    "artist": "纳西族打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA5MTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 2720
  },
  {
    id: 458,
    "title": "纳西古乐《清河老人》",
    "artist": "纳西古乐《清河老人》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA4OTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 389
  },
  {
    id: 459,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 246
  },
  {
    id: 460,
    "title": "张贵元、李宝妹 - 白族情歌",
    "artist": "张贵元、李宝妹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA4ODk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 227
  },
  {
    id: 461,
    "title": "阿巴桑 - 酒歌",
    "artist": "阿巴桑",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA4NTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 177
  },
  {
    id: 462,
    "title": "纳西",
    "artist": "纳西",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA3OTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 190
  },
  {
    id: 463,
    "title": "如花的阿妹dj-傈僳乡音",
    "artist": "如花的阿妹dj-傈僳乡音",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA3OTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 290
  },
  {
    id: 464,
    "title": "李福元 - 白族童谣",
    "artist": "李福元",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA3MTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 80
  },
  {
    id: 465,
    "title": "傈僳族打跳舞曲1",
    "artist": "傈僳族打跳舞曲1",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA3MDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 222
  },
  {
    id: 466,
    "title": "窝热热（纳西族）",
    "artist": "窝热热（纳西族）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA2NjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 108
  },
  {
    id: 467,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 186
  },
  {
    id: 468,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 206
  },
  {
    id: 469,
    "title": "向阳花合唱团 - 朋友",
    "artist": "向阳花合唱团",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA1NzU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 189
  },
  {
    id: 470,
    "title": "纳西族童谣 - 神仙",
    "artist": "纳西族童谣",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA1NDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 205
  },
  {
    id: 471,
    "title": "阿瓦人民唱新歌（葫芦笙版）",
    "artist": "阿瓦人民唱新歌（葫芦笙版）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA1MzU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 126
  },
  {
    id: 472,
    "title": "傈僳族葫芦笙打跳（DJ）",
    "artist": "傈僳族葫芦笙打跳（DJ）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA1MzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 156
  },
  {
    id: 473,
    "title": "百慕三石 - 丽江小调",
    "artist": "百慕三石",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA1MjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 260
  },
  {
    id: 474,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 267
  },
  {
    id: 475,
    "title": "傈僳族葫芦笙打跳曲 - 兴跳",
    "artist": "傈僳族葫芦笙打跳曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA0NTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 156
  },
  {
    id: 476,
    "title": "和永昌 - 小时候",
    "artist": "和永昌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTA0Mjg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 216
  },
  {
    id: 477,
    "title": "和群星 - 玉龙雪山我的家乡",
    "artist": "和群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzOTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 259
  },
  {
    id: 478,
    "title": "和群星 - 玉龙欢歌",
    "artist": "和群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzOTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 205
  },
  {
    id: 479,
    "title": "和群星 - 思乡",
    "artist": "和群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzODI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 240
  },
  {
    id: 480,
    "title": "降央卓玛-弦子",
    "artist": "降央卓玛-弦子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzNzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 310
  },
  {
    id: 481,
    "title": "根呷、央金玛-仓央嘉措道歌",
    "artist": "根呷、央金玛-仓央嘉措道歌",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzNzA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 270
  },
  {
    id: 482,
    "title": "阿佳组合-丹巴之花",
    "artist": "阿佳组合-丹巴之花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzNjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 231
  },
  {
    id: 483,
    "title": "和群星 - 玉龙女",
    "artist": "和群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzNDg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 226
  },
  {
    id: 484,
    "title": "和群星 - 高美漫纽金",
    "artist": "和群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzMzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 255
  },
  {
    id: 485,
    "title": "和群星 - 玉龙之约",
    "artist": "和群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAzMzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 226
  },
  {
    id: 486,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 231
  },
  {
    id: 487,
    "title": "那一天 - 达坡阿玻",
    "artist": "那一天",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAyOTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 323
  },
  {
    id: 488,
    "title": "彼岸 - 阿木宇梅",
    "artist": "彼岸",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAyOTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 300
  },
  {
    id: 489,
    "title": "风誓 - 吉萨莎玛",
    "artist": "风誓",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAyODc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 141
  },
  {
    id: 490,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 295
  },
  {
    id: 491,
    "title": "丽江小龙 - 脱贫攻坚之歌.",
    "artist": "丽江小龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAyMjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 212
  },
  {
    id: 492,
    "title": "和春秀 - 彩云家乡",
    "artist": "和春秀",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAxOTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 236
  },
  {
    id: 493,
    "title": "喔热热（纳西族民歌集）",
    "artist": "喔热热（纳西族民歌集）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAxNjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 213
  },
  {
    id: 494,
    "title": "李秀香 - 古老的歌",
    "artist": "李秀香",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAxNTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 581
  },
  {
    id: 495,
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 221
  },
  {
    id: 496,
    "title": "朋友 Zzee Sso Zzee Mil",
    "artist": "朋友 Zzee Sso Zzee Mil",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAxMTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 57
  },
  {
    id: 497,
    "title": "李宝妹-哥妹难分舍",
    "artist": "李宝妹-哥妹难分舍",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAxMTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 305
  },
  {
    id: 498,
    "title": "傈僳语版《小河淌水》",
    "artist": "傈僳语版《小河淌水》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAxMTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 153
  },
  {
    id: 499,
    "title": "纳西民歌",
    "artist": "纳西民歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAwODE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 3446
  },
  {
    id: 500,
    "title": "傈僳族（葫芦笙）dj舞曲",
    "artist": "傈僳族（葫芦笙）dj舞曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAwMzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 258
  },
  {
    id: 501,
    "title": "纳西口弦",
    "artist": "纳西口弦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAwMjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 297
  },
  {
    id: 502,
    "title": "纳西族歌曲 - 热美磋",
    "artist": "纳西族歌曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMTAwMjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 152
  },
  {
    id: 503,
    "title": "贺顺才 - 欢歌傈僳情",
    "artist": "贺顺才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk5NzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 282
  },
  {
    id: 504,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 221
  },
  {
    id: 505,
    "title": "垃圾分类 记得喽",
    "artist": "垃圾分类 记得喽",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk4MDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 144
  },
  {
    id: 506,
    "title": "最美人间",
    "artist": "最美人间",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk4MDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 300
  },
  {
    id: 507,
    "title": "傈僳打跳：傈僳葫芦笙风暴",
    "artist": "傈僳打跳：傈僳葫芦笙风暴",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk3NzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 316
  },
  {
    id: 508,
    "title": "和议财 - 呀哩哩",
    "artist": "和议财",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk3NTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 188
  },
  {
    id: 509,
    "title": "纳西族演唱组合 - 吉日经",
    "artist": "纳西族演唱组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk3Mjk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 245
  },
  {
    id: 510,
    "title": "石钟山的宝石山",
    "artist": "石钟山的宝石山",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk3MTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 980
  },
  {
    id: 511,
    "title": "纳西语快板：环境保护要搞好.",
    "artist": "纳西语快板：环境保护要搞好.",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk3MDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 755
  },
  {
    id: 512,
    "title": "纳西语版《我和我的祖国》",
    "artist": "纳西语版《我和我的祖国》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk2Nzc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 204
  },
  {
    id: 513,
    "title": "陈四才《幸福醉歌》",
    "artist": "陈四才《幸福醉歌》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk2NjU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 215
  },
  {
    id: 514,
    "title": "白玉扎西 - 阿若康巴",
    "artist": "白玉扎西",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk2NTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 235
  },
  {
    id: 515,
    "title": "白族调——李繁昌和张五妹演唱",
    "artist": "白族调——李繁昌和张五妹演唱",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk2NDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 251
  },
  {
    id: 516,
    "title": "和翠刚 - 万爱千恩(纳西语版）",
    "artist": "和翠刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk2MDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 324
  },
  {
    id: 517,
    "title": "白族调——花配柳（无情曲）",
    "artist": "白族调——花配柳（无情曲）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk2MDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 512
  },
  {
    id: 518,
    "title": "贺顺才 - 祝酒歌DJ（傈僳族）",
    "artist": "贺顺才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk2MDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 220
  },
  {
    id: 519,
    "title": "子啦来",
    "artist": "子啦来",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk2MDE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 273
  },
  {
    id: 520,
    "title": "《三弦伴奏》",
    "artist": "《三弦伴奏》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk1OTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1292
  },
  {
    id: 521,
    "title": "欢迎您到傈僳山寨来",
    "artist": "欢迎您到傈僳山寨来",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk1Nzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 257
  },
  {
    id: 522,
    "title": "（广播）纳西民歌 上",
    "artist": "（广播）纳西民歌 上",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk1NDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1337
  },
  {
    id: 523,
    "title": "（广播）纳西民歌 下",
    "artist": "（广播）纳西民歌 下",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk1NDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1572
  },
  {
    id: 524,
    "title": "时光印迹 - 安睡",
    "artist": "时光印迹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk1MTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 293
  },
  {
    id: 525,
    "title": "余明辉 - 母亲",
    "artist": "余明辉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk1MTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 224
  },
  {
    id: 526,
    "title": "笙动三江",
    "artist": "笙动三江",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk1MTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 257
  },
  {
    id: 527,
    "title": "血脉",
    "artist": "血脉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk1MDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 229
  },
  {
    id: 528,
    "title": "纳西山歌",
    "artist": "纳西山歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0ODc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 246
  },
  {
    id: 529,
    "title": "白族调 - 可怜天下父母亲",
    "artist": "白族调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0ODQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 925
  },
  {
    id: 530,
    "title": "朗玛组合 - 党的光辉照傈僳",
    "artist": "朗玛组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0Nzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 218
  },
  {
    id: 531,
    "title": "白族调——李宝妹逛洱源",
    "artist": "白族调——李宝妹逛洱源",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0NzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 367
  },
  {
    id: 532,
    "title": "纳西人 - 山人行组合",
    "artist": "纳西人",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0NjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 252
  },
  {
    id: 533,
    "title": "白族调—过眼云烟",
    "artist": "白族调—过眼云烟",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0NjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 328
  },
  {
    id: 534,
    "title": "阿石才原生态葫芦笙打跳",
    "artist": "阿石才原生态葫芦笙打跳",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0NTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 362
  },
  {
    id: 535,
    "title": "纳西大调.mp3",
    "artist": "纳西大调.mp3",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0NDg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 455
  },
  {
    id: 536,
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 200
  },
  {
    id: 537,
    "title": "白族调 - 放鹞曲",
    "artist": "白族调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDk0MjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 646
  },
  {
    id: 538,
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 237
  },
  {
    id: 539,
    "title": "杨新华_庄晓湳等 - 金太阳",
    "artist": "杨新华_庄晓湳等",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDkzOTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 157
  },
  {
    id: 540,
    "title": "纳西绝恋 - 浩之心|玉白雪",
    "artist": "纳西绝恋",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDkzNzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 336
  },
  {
    id: 541,
    "title": "和则刚 - 艰苦奋斗奔小康",
    "artist": "和则刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDkxMTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 470
  },
  {
    id: 542,
    "title": "和朝花 和会花 和文明 - 回归",
    "artist": "和朝花 和会花 和文明",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg5MjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 255
  },
  {
    id: 543,
    "title": "元林 - 纳西魂",
    "artist": "元林",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg4ODg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 270
  },
  {
    id: 544,
    "title": "和金花 - 青春和爱情的国度",
    "artist": "和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg4NjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 358
  },
  {
    id: 545,
    "title": "贺顺才 - 遇见你就爱上你",
    "artist": "贺顺才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg4NTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 157
  },
  {
    id: 546,
    "title": "合唱 -《高美漫纽金》",
    "artist": "合唱 -《高美漫纽金》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg4NTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 297
  },
  {
    id: 547,
    "title": "《爱的香格里拉》之起因（纳西",
    "artist": "《爱的香格里拉》之起因（纳西",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg4MjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 321
  },
  {
    id: 548,
    "title": "《爱的香格里拉》之婚礼",
    "artist": "《爱的香格里拉》之婚礼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg4MTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 665
  },
  {
    id: 549,
    "title": "和集虎、和金花 - 送客歌",
    "artist": "和集虎、和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg4MTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 290
  },
  {
    id: 550,
    "title": "《爱的香格里拉》之约定殉情",
    "artist": "《爱的香格里拉》之约定殉情",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg3OTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 226
  },
  {
    id: 551,
    "title": "忧伤（纳西族）",
    "artist": "忧伤（纳西族）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg3OTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 437
  },
  {
    id: 552,
    "title": "和集虎 - 祈 福",
    "artist": "和集虎",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg3ODc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 333
  },
  {
    id: 553,
    "title": "元林 - 纳西语版《叹》",
    "artist": "元林",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg3NTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 293
  },
  {
    id: 554,
    "title": "元林 - 纳西语版《流浪歌》",
    "artist": "元林",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg3NTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 293
  },
  {
    id: 555,
    "title": "元林 - 妈妈我想你 纳西语版",
    "artist": "元林",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg3NTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 279
  },
  {
    id: 556,
    "title": "元林 -家乡的父母（纳西语版）",
    "artist": "元林 -家乡的父母（纳西语版）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg3NDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 247
  },
  {
    id: 557,
    "title": "白玉扎西 - Bhumo Dolma",
    "artist": "白玉扎西",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg3MjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 177
  },
  {
    id: 558,
    "title": "纳西 火塘调",
    "artist": "纳西 火塘调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg3MDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 229
  },
  {
    id: 559,
    "title": "普米组合 - 姆妮蓝蓝",
    "artist": "普米组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg2NTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1332
  },
  {
    id: 560,
    "title": "纳西纵歌+的库册呢嘿",
    "artist": "纳西纵歌+的库册呢嘿",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg2NTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 333
  },
  {
    id: 561,
    "title": "阿石才 - 黎明情歌",
    "artist": "阿石才",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg2NDE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 314
  },
  {
    id: 562,
    "title": "傈僳三杯酒 - 傈僳部落",
    "artist": "傈僳三杯酒",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg2NDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 214
  },
  {
    id: 563,
    "title": "泸沽湖摩梭甲搓舞曲",
    "artist": "泸沽湖摩梭甲搓舞曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg2MDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 938
  },
  {
    id: 564,
    "title": "傈僳葫芦打跳云贵川通用打跳",
    "artist": "傈僳葫芦打跳云贵川通用打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg1OTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 380
  },
  {
    id: 565,
    "title": "古城区幼儿民族操音乐",
    "artist": "古城区幼儿民族操音乐",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg1ODc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 309
  },
  {
    id: 566,
    "title": "泸沽湖情歌",
    "artist": "泸沽湖情歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg1NjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 203
  },
  {
    id: 567,
    "title": "和学先 - 纳西谷气",
    "artist": "和学先",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg1MDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 176
  },
  {
    id: 568,
    "title": "贺顺才 - 嘎克拉-来跳舞 (dj)",
    "artist": "贺顺才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg0ODk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 184
  },
  {
    id: 569,
    "title": "笙动三江（日纳黑帅）",
    "artist": "笙动三江（日纳黑帅）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg0Njg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 257
  },
  {
    id: 570,
    "title": "金雪莲风暴（吉）",
    "artist": "金雪莲风暴（吉）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg0Njc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 869
  },
  {
    id: 571,
    "title": "圣诞歌 - 阿花",
    "artist": "圣诞歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg0NjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 249
  },
  {
    id: 572,
    "title": "若嘿嘿 - 女儿国组合",
    "artist": "若嘿嘿",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg0NDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 187
  },
  {
    id: 573,
    "title": "金色芒果歌曲串烧dj - 贺顺才",
    "artist": "金色芒果歌曲串烧dj",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg0MzU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 389
  },
  {
    id: 574,
    "title": "欢迎来到傈僳寨 - 和杰华",
    "artist": "欢迎来到傈僳寨",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg0MzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 127
  },
  {
    id: 575,
    "title": "纳西民歌 - 织布谣",
    "artist": "纳西民歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDg0MDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 101
  },
  {
    id: 576,
    "title": "张继心 - 踏歌丽江",
    "artist": "张继心",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgzNzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 244
  },
  {
    id: 577,
    "title": "欢乐的芦笙调 - 阿石才",
    "artist": "欢乐的芦笙调",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgzNzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 384
  },
  {
    id: 578,
    "title": "达坡阿玻 - 美丽姑娘",
    "artist": "达坡阿玻",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgzNTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 221
  },
  {
    id: 579,
    "title": "玉龙女组合 - 那年花开",
    "artist": "玉龙女组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgyOTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 252
  },
  {
    id: 580,
    "title": "和婷 - 叮咛",
    "artist": "和婷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgyNTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 193
  },
  {
    id: 581,
    "title": "傈僳吉祥谣 - 贺顺才",
    "artist": "傈僳吉祥谣",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgyNDg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 142
  },
  {
    id: 582,
    "title": "劲爆打跳：丽江风暴（二）",
    "artist": "劲爆打跳：丽江风暴（二）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgyMzU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 300
  },
  {
    id: 583,
    "title": "罗岚、和恂墨 -纳西幸福说不完",
    "artist": "罗岚、和恂墨 -纳西幸福说不完",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgyMjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 109
  },
  {
    id: 584,
    "title": "和 燕 - 丽江蓝",
    "artist": "和 燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgyMDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 295
  },
  {
    id: 585,
    "title": "段婷婷 和翠刚 - 阿衣莫翻版",
    "artist": "段婷婷 和翠刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgyMDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 314
  },
  {
    id: 586,
    "title": "纳西欢歌 - 殊基黄",
    "artist": "纳西欢歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgyMDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 279
  },
  {
    id: 587,
    "title": "张慧珺 - 彩云归处",
    "artist": "张慧珺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxOTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 287
  },
  {
    id: 588,
    "title": "最炫民族风串烧dj（lisu贺顺才",
    "artist": "最炫民族风串烧dj（lisu贺顺才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxOTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 308
  },
  {
    id: 589,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 188
  },
  {
    id: 590,
    "title": "马涛 - 三多保佑",
    "artist": "马涛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxNzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 314
  },
  {
    id: 591,
    "title": "宁蒗摩梭族广场民族舞曲",
    "artist": "宁蒗摩梭族广场民族舞曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxNjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 279
  },
  {
    id: 592,
    "title": "净地 - 东巴石子",
    "artist": "净地",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxNTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 229
  },
  {
    id: 593,
    "title": "dj银开 丽江打跳",
    "artist": "dj银开 丽江打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxNDg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 90
  },
  {
    id: 594,
    "title": "华坪傈僳打跳",
    "artist": "华坪傈僳打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxNDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 293
  },
  {
    id: 595,
    "title": "和燕~纳西打跳（3D环绕）",
    "artist": "和燕~纳西打跳（3D环绕）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxMDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 339
  },
  {
    id: 596,
    "title": "二月八 - 东巴石子 古玛林子",
    "artist": "二月八",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgxMDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 263
  },
  {
    id: 597,
    "title": "瓜来厄",
    "artist": "瓜来厄",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwOTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 423
  },
  {
    id: 598,
    "title": "丽江阿智 - 纳西版《传奇》",
    "artist": "丽江阿智",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwNzU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 289
  },
  {
    id: 599,
    "title": "东巴石子 - 纳西摇篮曲",
    "artist": "东巴石子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwNzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 61
  },
  {
    id: 600,
    "title": "哭嫁 纳西族",
    "artist": "哭嫁 纳西族",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwNzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 188
  },
  {
    id: 601,
    "title": "阿石才 - 葫芦笙打跳",
    "artist": "阿石才",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwNzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 398
  },
  {
    id: 602,
    "title": "葫芦笙DJ打跳舞曲",
    "artist": "葫芦笙DJ打跳舞曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwNjU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 664
  },
  {
    id: 603,
    "title": "东巴石子 - 月思乡",
    "artist": "东巴石子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwNTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 267
  },
  {
    id: 604,
    "title": "dj贺军 纳西打跳",
    "artist": "dj贺军 纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwNTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 276
  },
  {
    id: 605,
    "title": "纳西版 老鼠爱大米",
    "artist": "纳西版 老鼠爱大米",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwNTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 315
  },
  {
    id: 606,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 208
  },
  {
    id: 607,
    "title": "《汁哆》dj版 - 贺顺才",
    "artist": "《汁哆》dj版",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwMTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 236
  },
  {
    id: 608,
    "title": "尺拉哇dj（傅国英）",
    "artist": "尺拉哇dj（傅国英）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwMTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 248
  },
  {
    id: 609,
    "title": "欢庆 - 纳西原生态牧歌.",
    "artist": "欢庆",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwMDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 66
  },
  {
    id: 610,
    "title": "山人行组合 - 思乡曲【纳西语",
    "artist": "山人行组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDgwMDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 275
  },
  {
    id: 611,
    "title": "因为有爱",
    "artist": "因为有爱",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5OTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 255
  },
  {
    id: 612,
    "title": "黑帅 和爱兰 - 纳西舞动大团结",
    "artist": "黑帅 和爱兰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5ODM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 321
  },
  {
    id: 613,
    "title": "云南丽江摩梭民间甲搓舞曲",
    "artist": "云南丽江摩梭民间甲搓舞曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5ODE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1057
  },
  {
    id: 614,
    "title": "三月花开时【纳西语】",
    "artist": "三月花开时【纳西语】",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5Nzc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 245
  },
  {
    id: 615,
    "title": "和凤海 - 新阿里里",
    "artist": "和凤海",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5NzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 294
  },
  {
    id: 616,
    "title": "九河白族调",
    "artist": "九河白族调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5NzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 236
  },
  {
    id: 617,
    "title": "黎明情歌 - 阿香 阿石才",
    "artist": "黎明情歌",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5Njc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 309
  },
  {
    id: 618,
    "title": "白玉扎西 - 欢迎您到白玉来",
    "artist": "白玉扎西",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5NjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 234
  },
  {
    id: 619,
    "title": "纳西文字",
    "artist": "纳西文字",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5NjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 493
  },
  {
    id: 620,
    "title": "朱丽凡－芦笙欢跳好日子重低音",
    "artist": "朱丽凡－芦笙欢跳好日子重低音",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5NDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 710
  },
  {
    id: 621,
    "title": "甲姆沽·阿平 - 福乐之城",
    "artist": "甲姆沽·阿平",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5MzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 233
  },
  {
    id: 622,
    "title": "甲姆沽·阿平 - 再相见",
    "artist": "甲姆沽·阿平",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5MzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 217
  },
  {
    id: 623,
    "title": "纳若 - 二月八",
    "artist": "纳若",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc5MjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 289
  },
  {
    id: 624,
    "title": "劳动歌《耕牛调》",
    "artist": "劳动歌《耕牛调》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc4OTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 25
  },
  {
    id: 625,
    "title": "口弦调",
    "artist": "口弦调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc4NzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 87
  },
  {
    id: 626,
    "title": "和月圆和国江 - 牧羊歌",
    "artist": "和月圆和国江",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc4Njg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 355
  },
  {
    id: 627,
    "title": "葫芦笙串烧",
    "artist": "葫芦笙串烧",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc4NTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 544
  },
  {
    id: 628,
    "title": "贺顺才 - 汁哆腊哆《酒歌》",
    "artist": "贺顺才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc4NDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 174
  },
  {
    id: 629,
    "title": "丹巴旺姆 - 若梦",
    "artist": "丹巴旺姆",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc4Mjc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 254
  },
  {
    id: 630,
    "title": "劲爆葫芦笙dj加快-和福英",
    "artist": "劲爆葫芦笙dj加快-和福英",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc4MjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 281
  },
  {
    id: 631,
    "title": "纳西英子 - 纳西语版 十二月",
    "artist": "纳西英子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc4MTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 326
  },
  {
    id: 632,
    "title": "纳西语版《离家五百里》",
    "artist": "纳西语版《离家五百里》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc4MDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 234
  },
  {
    id: 633,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 277
  },
  {
    id: 634,
    "title": "十九大精神学用干在先",
    "artist": "十九大精神学用干在先",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc3ODA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 495
  },
  {
    id: 635,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 187
  },
  {
    id: 636,
    "title": "和永昌 欢乐纳西年",
    "artist": "和永昌 欢乐纳西年",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc3NTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 189
  },
  {
    id: 637,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 170
  },
  {
    id: 638,
    "title": "艾玛龙杰 - 傈僳情",
    "artist": "艾玛龙杰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2ODk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 187
  },
  {
    id: 639,
    "title": "阿石才·子拉勒",
    "artist": "阿石才·子拉勒",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2ODQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 273
  },
  {
    id: 640,
    "title": "张曦尹《玉龙山下纳西娃》",
    "artist": "张曦尹《玉龙山下纳西娃》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2ODA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 260
  },
  {
    id: 641,
    "title": "贺顺才 - 酒歌",
    "artist": "贺顺才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2NTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 174
  },
  {
    id: 642,
    "title": "纳西情歌对唱《南兴调》",
    "artist": "纳西情歌对唱《南兴调》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2NDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 94
  },
  {
    id: 643,
    "title": "纳西情歌对唱《箫筝篾合》",
    "artist": "纳西情歌对唱《箫筝篾合》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2NDE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 32
  },
  {
    id: 644,
    "title": "阿石才 蜂跃宏 - 傈僳欢歌dj",
    "artist": "阿石才 蜂跃宏",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2MzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 187
  },
  {
    id: 645,
    "title": "嘎嘎尺尺刮器来",
    "artist": "嘎嘎尺尺刮器来",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2MzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 180
  },
  {
    id: 646,
    "title": "白沙细乐 - 上午 一封书",
    "artist": "白沙细乐",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2MTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 553
  },
  {
    id: 647,
    "title": "纳西快板 ：美丽古城 幸福家园",
    "artist": "纳西快板 ：美丽古城 幸福家园",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2MTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 389
  },
  {
    id: 648,
    "title": "次仁桑珠 - 有缘千里路",
    "artist": "次仁桑珠",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc2MDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 286
  },
  {
    id: 649,
    "title": "白族调 剑川李宝妹 - 婆媳风波",
    "artist": "白族调 剑川李宝妹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc1ODA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1316
  },
  {
    id: 650,
    "title": "纳西东巴调",
    "artist": "纳西东巴调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc1NDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 121
  },
  {
    id: 651,
    "title": "傈僳舞步曲",
    "artist": "傈僳舞步曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc1MTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 269
  },
  {
    id: 652,
    "title": "朱丽凡－花开花谢痴痴的等",
    "artist": "朱丽凡－花开花谢痴痴的等",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc1MDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 281
  },
  {
    id: 653,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 248
  },
  {
    id: 654,
    "title": "丽江圆舞曲-李艳婷",
    "artist": "丽江圆舞曲-李艳婷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0ODM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 138
  },
  {
    id: 655,
    "title": "白沙细乐《冢拾》",
    "artist": "白沙细乐《冢拾》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0ODA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 337
  },
  {
    id: 656,
    "title": "和燕 - 守住一片天",
    "artist": "和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0NjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 393
  },
  {
    id: 657,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 292
  },
  {
    id: 658,
    "title": "笙动丽江",
    "artist": "笙动丽江",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0MzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 599
  },
  {
    id: 659,
    "title": "心肝票 (Live)_张银耀",
    "artist": "心肝票 (Live)_张银耀",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0MjU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 164
  },
  {
    id: 660,
    "title": "傈僳Dj",
    "artist": "傈僳Dj",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0MjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 227
  },
  {
    id: 661,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 282
  },
  {
    id: 662,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 267
  },
  {
    id: 663,
    "title": "喂么达《塔城调》",
    "artist": "喂么达《塔城调》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0MDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 96
  },
  {
    id: 664,
    "title": "纳西谷气《箫筝篾合》.mp3",
    "artist": "纳西谷气《箫筝篾合》.mp3",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDc0MDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 32
  },
  {
    id: 665,
    "title": "傈僳（如花的阿妹）dj",
    "artist": "傈僳（如花的阿妹）dj",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDczOTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 334
  },
  {
    id: 666,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 221
  },
  {
    id: 667,
    "title": "和红亮、和玉秀 - 热美搓",
    "artist": "和红亮、和玉秀",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDczNTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 274
  },
  {
    id: 668,
    "title": "段婷婷 - 梦中的额吉纳西语",
    "artist": "段婷婷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDczMzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 209
  },
  {
    id: 669,
    "title": "拉伯阿新 - 吉日经",
    "artist": "拉伯阿新",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDczMjc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 254
  },
  {
    id: 670,
    "title": "纳西打跳dj",
    "artist": "纳西打跳dj",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDczMjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 276
  },
  {
    id: 671,
    "title": "拉伯阿新 - 纳西幸福万年长",
    "artist": "拉伯阿新",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDczMTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 117
  },
  {
    id: 672,
    "title": "达坡阿玻 - 净土（纳西语）",
    "artist": "达坡阿玻",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDczMTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 234
  },
  {
    id: 673,
    "title": "傈僳大蛮调",
    "artist": "傈僳大蛮调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDczMTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 317
  },
  {
    id: 674,
    "title": "热美姿蹉-原生态组合",
    "artist": "热美姿蹉-原生态组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcyOTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 238
  },
  {
    id: 675,
    "title": "阿木宇梅 - 美丽的白云",
    "artist": "阿木宇梅",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcyOTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 198
  },
  {
    id: 676,
    "title": "美丽的丽江《纳西族》篝火打跳",
    "artist": "美丽的丽江《纳西族》篝火打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcyNjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1022
  },
  {
    id: 677,
    "title": "东巴唱腔《鲁般鲁绕》",
    "artist": "东巴唱腔《鲁般鲁绕》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcyNTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 135
  },
  {
    id: 678,
    "title": "和文光 - 口弦悠悠",
    "artist": "和文光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcyMjk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 213
  },
  {
    id: 679,
    "title": "纳西儿歌《老爷找叶子》",
    "artist": "纳西儿歌《老爷找叶子》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcyMjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 43
  },
  {
    id: 680,
    "title": "东巴唱腔《斑米知》",
    "artist": "东巴唱腔《斑米知》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcyMDE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 143
  },
  {
    id: 681,
    "title": "谷气",
    "artist": "谷气",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcxNzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 70
  },
  {
    id: 682,
    "title": "白桂花香",
    "artist": "白桂花香",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcxNjU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 251
  },
  {
    id: 683,
    "title": "纳西调 古凄",
    "artist": "纳西调 古凄",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcxNDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 154
  },
  {
    id: 684,
    "title": "晴天 - 血流成河",
    "artist": "晴天",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcxNDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 209
  },
  {
    id: 685,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 165
  },
  {
    id: 686,
    "title": "纳西西于花花神 - 姚熙",
    "artist": "纳西西于花花神",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwOTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 223
  },
  {
    id: 687,
    "title": "达坡阿玻 - 阿勒邱",
    "artist": "达坡阿玻",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwOTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 177
  },
  {
    id: 688,
    "title": "印象丽江 回家",
    "artist": "印象丽江 回家",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwOTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 289
  },
  {
    id: 689,
    "title": "同唱心肝票 - 李宝妹 姜中德",
    "artist": "同唱心肝票",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwODk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 288
  },
  {
    id: 690,
    "title": "《相见难》亚哈巴组合",
    "artist": "《相见难》亚哈巴组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwNzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 326
  },
  {
    id: 691,
    "title": "纳西超级打跳",
    "artist": "纳西超级打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwNjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 389
  },
  {
    id: 692,
    "title": "纳若-欢乐和谐苑",
    "artist": "纳若-欢乐和谐苑",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwNjU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 294
  },
  {
    id: 693,
    "title": "东巴唱腔杨万勋《幕布幕地》",
    "artist": "东巴唱腔杨万勋《幕布幕地》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwNjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 58
  },
  {
    id: 694,
    "title": "李宝妹演唱白族调——牵心绳",
    "artist": "李宝妹演唱白族调——牵心绳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwNTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 240
  },
  {
    id: 695,
    "title": "达坡阿玻 - 欢聚在一起",
    "artist": "达坡阿玻",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwNTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 186
  },
  {
    id: 696,
    "title": "纳西喂么达《塔城调》",
    "artist": "纳西喂么达《塔城调》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDcwMzc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 96
  },
  {
    id: 697,
    "title": "纳西 山神之恋",
    "artist": "纳西 山神之恋",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY5OTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 305
  },
  {
    id: 698,
    "title": "母鸡抱鸭",
    "artist": "母鸡抱鸭",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY5Njk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 320
  },
  {
    id: 699,
    "title": "风吹十里桂花香",
    "artist": "风吹十里桂花香",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY5NjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 341
  },
  {
    id: 700,
    "title": "傈僳族摇篮曲",
    "artist": "傈僳族摇篮曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY5NjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 264
  },
  {
    id: 701,
    "title": "阿八根与金葫芦片尾曲",
    "artist": "阿八根与金葫芦片尾曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY5Mzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 70
  },
  {
    id: 702,
    "title": "芦笙调 - 革囊渡",
    "artist": "芦笙调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY5MTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 140
  },
  {
    id: 703,
    "title": "我要抱着你  纳西语",
    "artist": "我要抱着你  纳西语",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY5MTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 280
  },
  {
    id: 704,
    "title": "纳西打跳 - 手拉手跳起来",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY4ODg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 360
  },
  {
    id: 705,
    "title": "和兴凤 - 纳西酒歌",
    "artist": "和兴凤",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY4Nzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 178
  },
  {
    id: 706,
    "title": "白族歌曲 - 小心肝",
    "artist": "白族歌曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY4NzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 296
  },
  {
    id: 707,
    "title": "和群星 - 纳西情歌(纳西语版)",
    "artist": "和群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY4NDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 235
  },
  {
    id: 708,
    "title": "傈僳三杯酒 - 傈僳崽崽",
    "artist": "傈僳三杯酒",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY4MzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 218
  },
  {
    id: 709,
    "title": "白族调 - 白乡情歌第四部",
    "artist": "白族调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY4Mjk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 405
  },
  {
    id: 710,
    "title": "我在香格里拉等你 - 格桑尼玛",
    "artist": "我在香格里拉等你",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY4MjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 324
  },
  {
    id: 711,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 235
  },
  {
    id: 712,
    "title": "走失在纳西文字中 天一配乐",
    "artist": "走失在纳西文字中 天一配乐",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY3NzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 274
  },
  {
    id: 713,
    "title": "请到傈僳山寨来-阿石才",
    "artist": "请到傈僳山寨来-阿石才",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY3NTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 188
  },
  {
    id: 714,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 233
  },
  {
    id: 715,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 274
  },
  {
    id: 716,
    "title": "傈僳族葫芦笙大演奏",
    "artist": "傈僳族葫芦笙大演奏",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY3MjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 749
  },
  {
    id: 717,
    "title": "傈僳阿依（流行音乐）",
    "artist": "傈僳阿依（流行音乐）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY3MTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 274
  },
  {
    id: 718,
    "title": "祝酒歌 - 傈僳娃娃组合",
    "artist": "祝酒歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY2Nzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 220
  },
  {
    id: 719,
    "title": "陈元绍 - 啊 永胜 永胜",
    "artist": "陈元绍",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY2NzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 132
  },
  {
    id: 720,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 271
  },
  {
    id: 721,
    "title": "纳西快板 中国梦",
    "artist": "纳西快板 中国梦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY2Mjg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 251
  },
  {
    id: 722,
    "title": "心灵的坐标-习振东",
    "artist": "心灵的坐标-习振东",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY2MjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 199
  },
  {
    id: 723,
    "title": "和丽龙 - 依恋",
    "artist": "和丽龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY2MTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_png/jXiaTRzsmA7Nw9LsfY0B3jRfCP9IrSSjgIkR3usu3iceMibqPqGcDl2HGC6quJlPI0VHZxQiaMC8Raj8SHD8BVujDnhPqWMEZFGNnddk1DFrmTA/640?wx_fmt=png&from=appmsg",
    "duration": 288
  },
  {
    id: 724,
    "title": "纳西打跳",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY2MDg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 139
  },
  {
    id: 725,
    "title": "纳西歌《兄弟姐妹》",
    "artist": "纳西歌《兄弟姐妹》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY2MDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 57
  },
  {
    id: 726,
    "title": "和华纳西原生态",
    "artist": "和华纳西原生态",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY2MDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 140
  },
  {
    id: 727,
    "title": "一滴水经过丽江纳西语版",
    "artist": "一滴水经过丽江纳西语版",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY2MDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 300
  },
  {
    id: 728,
    "title": "丽江群星 - 阿六奶",
    "artist": "丽江群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY1OTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 239
  },
  {
    id: 729,
    "title": "《咒章》洞经音乐",
    "artist": "《咒章》洞经音乐",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY1ODg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 449
  },
  {
    id: 730,
    "title": "《丽江风暴》舞曲",
    "artist": "《丽江风暴》舞曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY1NjU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 989
  },
  {
    id: 731,
    "title": "拉伯热美",
    "artist": "拉伯热美",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY1NjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 152
  },
  {
    id: 732,
    "title": "降央卓玛 扎西尼玛 - 天籁之爱",
    "artist": "降央卓玛 扎西尼玛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY1NDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 241
  },
  {
    id: 733,
    "title": "和德华 - 摇篮曲",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY1MzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 200
  },
  {
    id: 734,
    "title": "哦热热（纳西传统歌舞）",
    "artist": "哦热热（纳西传统歌舞）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY1MzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 90
  },
  {
    id: 735,
    "title": "快来罗 纳西热美蹉拔秧调",
    "artist": "快来罗 纳西热美蹉拔秧调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY0OTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 98
  },
  {
    id: 736,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 210
  },
  {
    id: 737,
    "title": "李秀仙 和民达 和金花 - 哦蒙达",
    "artist": "李秀仙 和民达 和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY0ODY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 56
  },
  {
    id: 738,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 223
  },
  {
    id: 739,
    "title": "三江天籁-阿乌嚷阿妮梅",
    "artist": "三江天籁-阿乌嚷阿妮梅",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY0NDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 335
  },
  {
    id: 740,
    "title": "无悔人生—花体若依",
    "artist": "无悔人生—花体若依",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY0MTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 236
  },
  {
    id: 741,
    "title": "和燕 - 打跳",
    "artist": "和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDY0MDE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 204
  },
  {
    id: 742,
    "title": "阿依金卓 - 阿哩哩",
    "artist": "阿依金卓",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzOTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 174
  },
  {
    id: 743,
    "title": "白子白女敬酒歌",
    "artist": "白子白女敬酒歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzNzc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 205
  },
  {
    id: 744,
    "title": "贺顺才 - 傈僳族打跳",
    "artist": "贺顺才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzNzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 223
  },
  {
    id: 745,
    "title": "纳西狼组合 - 纳西姑娘好",
    "artist": "纳西狼组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzNjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 186
  },
  {
    id: 746,
    "title": "伍腾宇 - 丽江姑娘",
    "artist": "伍腾宇",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzNTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 221
  },
  {
    id: 747,
    "title": "纳西纵歌 - 欢乐香巴拉",
    "artist": "纳西纵歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzMzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 472
  },
  {
    id: 748,
    "title": "扎西尼玛 - 走进西藏",
    "artist": "扎西尼玛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzMzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 283
  },
  {
    id: 749,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 219
  },
  {
    id: 750,
    "title": "靳松 - 丽江云飞",
    "artist": "靳松",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzMjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 275
  },
  {
    id: 751,
    "title": "栽秧调",
    "artist": "栽秧调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzMTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 290
  },
  {
    id: 752,
    "title": "《上午 一封书》白沙细乐",
    "artist": "《上午 一封书》白沙细乐",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYzMDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 553
  },
  {
    id: 753,
    "title": "根呷 - 理塘赞",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYyNjU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 231
  },
  {
    id: 754,
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7P5hWcX3ngiaibt4KBSwOdHhrA4nVMG9xPLLkmyXeN7icwlGFyrWIThRQuJeFtYNibRPAzkKYAuQsjg6Vgm3tck82ibZxYzMOaicN2pw/640?wx_fmt=webp&from=appmsg",
    "duration": 229
  },
  {
    id: 755,
    "title": "好玩好耍来打跳",
    "artist": "好玩好耍来打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYyNDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 372
  },
  {
    id: 756,
    "title": "傈僳族鬼步葫芦笙舞曲",
    "artist": "傈僳族鬼步葫芦笙舞曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYyMzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 161
  },
  {
    id: 757,
    "title": "阿石才，阿荣 -从月亮走向太阳",
    "artist": "阿石才，阿荣 -从月亮走向太阳",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYyMzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 277
  },
  {
    id: 758,
    "title": "哎呀 妈妈 - 姚熙",
    "artist": "哎呀 妈妈",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYyMjc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 217
  },
  {
    id: 759,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 204
  },
  {
    id: 760,
    "title": "纳西打跳 - 密瀑纳西美",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYxNzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 335
  },
  {
    id: 761,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 288
  },
  {
    id: 762,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 298
  },
  {
    id: 763,
    "title": "和民达 - 热美姿蹉",
    "artist": "和民达",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYxNDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 295
  },
  {
    id: 764,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 180
  },
  {
    id: 765,
    "title": "纳西原生态谷气",
    "artist": "纳西原生态谷气",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYxNDE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 177
  },
  {
    id: 766,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 160
  },
  {
    id: 767,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 291
  },
  {
    id: 768,
    "title": "和占强,杨友爱 - 纳西喂么达",
    "artist": "和占强,杨友爱",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYxMjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 169
  },
  {
    id: 769,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 193
  },
  {
    id: 770,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 206
  },
  {
    id: 771,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 163
  },
  {
    id: 772,
    "title": "斯密沃然-玛依 - 天蓝蓝dj",
    "artist": "斯密沃然-玛依",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwOTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 245
  },
  {
    id: 773,
    "title": "地球村 - 根呷 扎西尼玛",
    "artist": "地球村",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwODc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 331
  },
  {
    id: 774,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 194
  },
  {
    id: 775,
    "title": "纳木错神话（旺姆）",
    "artist": "纳木错神话（旺姆）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwNjk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 263
  },
  {
    id: 776,
    "title": "纳西打跳组曲",
    "artist": "纳西打跳组曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwNjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 314
  },
  {
    id: 777,
    "title": "纳西民歌 - 十女十歌",
    "artist": "纳西民歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwNjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 151
  },
  {
    id: 778,
    "title": "步步娇(曲牌)",
    "artist": "步步娇(曲牌)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwNjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 390
  },
  {
    id: 779,
    "title": "纳西新歌 - 来世",
    "artist": "纳西新歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwMzc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 238
  },
  {
    id: 780,
    "title": "美丽的白云 - 姚熙",
    "artist": "美丽的白云",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDYwMTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 283
  },
  {
    id: 781,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 259
  },
  {
    id: 782,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 203
  },
  {
    id: 783,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 168
  },
  {
    id: 784,
    "title": "纳西打跳 - 山朵岗打跳",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5Nzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 457
  },
  {
    id: 785,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 229
  },
  {
    id: 786,
    "title": "嘎美厄美倒背喃（行善积德做)",
    "artist": "嘎美厄美倒背喃（行善积德做)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5NzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 186
  },
  {
    id: 787,
    "title": "浪漫民族风",
    "artist": "浪漫民族风",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5Njc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 198
  },
  {
    id: 788,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 277
  },
  {
    id: 789,
    "title": "一起跳起来―吉米阿哈",
    "artist": "一起跳起来―吉米阿哈",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5NTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 231
  },
  {
    id: 790,
    "title": "索玛花开",
    "artist": "索玛花开",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5NDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 270
  },
  {
    id: 791,
    "title": "时代颂—和述明",
    "artist": "时代颂—和述明",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5MzU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 285
  },
  {
    id: 792,
    "title": "远方的客人请你留下来",
    "artist": "远方的客人请你留下来",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5MjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 261
  },
  {
    id: 793,
    "title": "月亮姆组合 - 婚誓",
    "artist": "月亮姆组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5MjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 150
  },
  {
    id: 794,
    "title": "灯思克 - 嫁女调",
    "artist": "灯思克",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5MTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 193
  },
  {
    id: 795,
    "title": "回家 印象丽江主题曲",
    "artist": "回家 印象丽江主题曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU5MDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 292
  },
  {
    id: 796,
    "title": "麦乌来其玛",
    "artist": "麦乌来其玛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU4ODU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 349
  },
  {
    id: 797,
    "title": "丽江风暴",
    "artist": "丽江风暴",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU4NjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 989
  },
  {
    id: 798,
    "title": "纳西打捞利",
    "artist": "纳西打捞利",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU4NjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 263
  },
  {
    id: 799,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 268
  },
  {
    id: 800,
    "title": "李艾雯 - 纳西飞歌",
    "artist": "李艾雯",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU4NDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 210
  },
  {
    id: 801,
    "title": "的库册尼黑（纳西族歌舞）",
    "artist": "的库册尼黑（纳西族歌舞）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU4MzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 277
  },
  {
    id: 802,
    "title": "公特目光阿克吉",
    "artist": "公特目光阿克吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU4Mjk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 339
  },
  {
    id: 803,
    "title": "丽江风暴dj",
    "artist": "丽江风暴dj",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU4MDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 970
  },
  {
    id: 804,
    "title": "三思吉",
    "artist": "三思吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3OTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 192
  },
  {
    id: 805,
    "title": "纳西小调",
    "artist": "纳西小调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3OTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 78
  },
  {
    id: 806,
    "title": "阿多组合 - 迎宾酒歌",
    "artist": "阿多组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3OTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 233
  },
  {
    id: 807,
    "title": "纳西哦姆达",
    "artist": "纳西哦姆达",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3NzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 827
  },
  {
    id: 808,
    "title": "纳西原生态民歌《 哦姆达》",
    "artist": "纳西原生态民歌《 哦姆达》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3NzM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 353
  },
  {
    id: 809,
    "title": "普米芦笙调 - 革囊渡",
    "artist": "普米芦笙调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3NDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 164
  },
  {
    id: 810,
    "title": "喔热热 - 革囊渡",
    "artist": "喔热热",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3NDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 213
  },
  {
    id: 811,
    "title": "傈僳娃娃组合 -月亮还没升起来",
    "artist": "傈僳娃娃组合 -月亮还没升起来",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3MjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 268
  },
  {
    id: 812,
    "title": "周昀刚 - 大石桥",
    "artist": "周昀刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3MTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 183
  },
  {
    id: 813,
    "title": "爱在泸沽湖  胡光叁影",
    "artist": "爱在泸沽湖  胡光叁影",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU3MTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 283
  },
  {
    id: 814,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 267
  },
  {
    id: 815,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 163
  },
  {
    id: 816,
    "title": "和兴凤 - 康定溜溜调",
    "artist": "和兴凤",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2OTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 151
  },
  {
    id: 817,
    "title": "超越葫芦笙dj",
    "artist": "超越葫芦笙dj",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2NjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 650
  },
  {
    id: 818,
    "title": "丽江华坪花傈僳打跳之三门合脚",
    "artist": "丽江华坪花傈僳打跳之三门合脚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2NDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 217
  },
  {
    id: 819,
    "title": "丽江华坪花傈僳打跳之挖生地",
    "artist": "丽江华坪花傈僳打跳之挖生地",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2MzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 378
  },
  {
    id: 820,
    "title": "花傈僳打跳之一道竹子一道尖",
    "artist": "花傈僳打跳之一道竹子一道尖",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2MzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 382
  },
  {
    id: 821,
    "title": "欢迎到太安来",
    "artist": "欢迎到太安来",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2MjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 122
  },
  {
    id: 822,
    "title": "纳西民歌 - 拉伯热美",
    "artist": "纳西民歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU2MDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 152
  },
  {
    id: 823,
    "title": "根呷 - 崇德之恋",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU1ODg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 251
  },
  {
    id: 824,
    "title": "我的阿妈",
    "artist": "我的阿妈",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU1NjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 275
  },
  {
    id: 825,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 301
  },
  {
    id: 826,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 285
  },
  {
    id: 827,
    "title": "玉龙山情歌（时本古庆）和冬月",
    "artist": "玉龙山情歌（时本古庆）和冬月",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU1MTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 129
  },
  {
    id: 828,
    "title": "傈僳族-舞动三江dj",
    "artist": "傈僳族-舞动三江dj",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU0NDE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 530
  },
  {
    id: 829,
    "title": "心有千千结_贺树兵",
    "artist": "心有千千结_贺树兵",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDU0MTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 272
  },
  {
    id: 830,
    "title": "和曙洪、和燕 - 同住一座城",
    "artist": "和曙洪、和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUzOTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 232
  },
  {
    id: 831,
    "title": "纳西族歌曲－咱撮鲁啦",
    "artist": "纳西族歌曲－咱撮鲁啦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUzODc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 207
  },
  {
    id: 832,
    "title": "丽江民歌 美丽的九河",
    "artist": "丽江民歌 美丽的九河",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUzNzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 248
  },
  {
    id: 833,
    "title": "齐旦布 - 云上西藏",
    "artist": "齐旦布",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUzNTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 240
  },
  {
    id: 834,
    "title": "张曦尹 - 蝶儿飞",
    "artist": "张曦尹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUzMTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 202
  },
  {
    id: 835,
    "title": "阿七 - 呀哈哩",
    "artist": "阿七",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUzMDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 229
  },
  {
    id: 836,
    "title": "纳西打劳丽",
    "artist": "纳西打劳丽",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUyODc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 266
  },
  {
    id: 837,
    "title": "相约阔时节dj-阿多组合",
    "artist": "相约阔时节dj-阿多组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUyNzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 190
  },
  {
    id: 838,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 237
  },
  {
    id: 839,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 259
  },
  {
    id: 840,
    "title": "民族打跳曲",
    "artist": "民族打跳曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUyMzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 173
  },
  {
    id: 841,
    "title": "和德华 - 西库揍",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUyMDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 256
  },
  {
    id: 842,
    "title": "和民达 和金花 和集虎-哦蒙达",
    "artist": "和民达 和金花 和集虎-哦蒙达",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxOTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 56
  },
  {
    id: 843,
    "title": "好兄弟 纳西语",
    "artist": "好兄弟 纳西语",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxOTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 188
  },
  {
    id: 844,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 149
  },
  {
    id: 845,
    "title": "摩梭打跳曲",
    "artist": "摩梭打跳曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxODc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 280
  },
  {
    id: 846,
    "title": "根呷 - 走进骷髅墙",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxODI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 296
  },
  {
    id: 847,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 250
  },
  {
    id: 848,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 212
  },
  {
    id: 849,
    "title": "丽江三十二步",
    "artist": "丽江三十二步",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxNTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 989
  },
  {
    id: 850,
    "title": "李茜姝 - 山里娃",
    "artist": "李茜姝",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxNTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 129
  },
  {
    id: 851,
    "title": "摩梭打跳曲III",
    "artist": "摩梭打跳曲III",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxNDg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 272
  },
  {
    id: 852,
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasOkRpZzDDUJMiagv8UP8ibaxSux7cf6ILCgARISoa4Wu8zNNaOuKBSIicA/640?wx_fmt=jpeg&from=appmsg",
    "duration": 297
  },
  {
    id: 853,
    "title": "和军 - 摩梭夜歌",
    "artist": "和军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxMzc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 266
  },
  {
    id: 854,
    "title": "新编犁牛调-和占强",
    "artist": "新编犁牛调-和占强",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxMzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 239
  },
  {
    id: 855,
    "title": "称谢耶稣 - 甲姆沽-阿平",
    "artist": "称谢耶稣",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxMDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 256
  },
  {
    id: 856,
    "title": "打跳组曲 - 甲姆沽-阿平",
    "artist": "打跳组曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUxMDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 314
  },
  {
    id: 857,
    "title": "纳西打跳 - 一起跳",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUwOTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 311
  },
  {
    id: 858,
    "title": "神爱世人",
    "artist": "神爱世人",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUwODc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 278
  },
  {
    id: 859,
    "title": "金丽婷 - 迷局",
    "artist": "金丽婷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUwNzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 151
  },
  {
    id: 860,
    "title": "李铭九 - 受载某套",
    "artist": "李铭九",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUwNjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 226
  },
  {
    id: 861,
    "title": "和德华 - 三朵花",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUwNTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 246
  },
  {
    id: 862,
    "artist": "和慧琼＆李承翰《玉龙恋歌》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDUwNDA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 393
  },
  {
    id: 863,
    "title": "肖汝莲《谷气》",
    "artist": "肖汝莲《谷气》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ5Nzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 90
  },
  {
    id: 864,
    "title": "《云上石头城》片头曲《吉祥》",
    "artist": "《云上石头城》片头曲《吉祥》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ5NTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 138
  },
  {
    id: 865,
    "title": "傈僳打跳舞曲傈僳魅音超嗨舞曲",
    "artist": "傈僳打跳舞曲傈僳魅音超嗨舞曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ5NTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 214
  },
  {
    id: 866,
    "title": "和德华 - 数字歌",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ5MjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 230
  },
  {
    id: 867,
    "title": "傈僳魅音打跳舞曲AAA",
    "artist": "傈僳魅音打跳舞曲AAA",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ5MTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 234
  },
  {
    id: 868,
    "title": "涵格佩吉《守候》",
    "artist": "涵格佩吉《守候》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ4NzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 284
  },
  {
    id: 869,
    "title": "纳西打跳广场舞",
    "artist": "纳西打跳广场舞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ4NTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 197
  },
  {
    id: 870,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 220
  },
  {
    id: 871,
    "title": "刚仔 - 傈僳打跳曲8",
    "artist": "刚仔",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ4NDE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 238
  },
  {
    id: 872,
    "title": "和锦 - 纳西小情歌",
    "artist": "和锦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ4MjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 237
  },
  {
    id: 873,
    "title": "花花神组合 - 丽江花花神",
    "artist": "花花神组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ4MTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 249
  },
  {
    id: 874,
    "title": "张桂华和占强 - 腾飞吧，丽江",
    "artist": "张桂华和占强",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ4MTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 189
  },
  {
    id: 875,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 229
  },
  {
    id: 876,
    "title": "木作为 - 回到我身边",
    "artist": "木作为",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3OTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 208
  },
  {
    id: 877,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 261
  },
  {
    id: 878,
    "title": "葫芦笙串烧丽江DJ纳若咪",
    "artist": "葫芦笙串烧丽江DJ纳若咪",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3OTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 315
  },
  {
    id: 879,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 266
  },
  {
    id: 880,
    "title": "傈僳新酒歌",
    "artist": "傈僳新酒歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3ODg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 229
  },
  {
    id: 881,
    "title": "DJ - 中文唐古拉风暴民族",
    "artist": "DJ",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3ODM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 651
  },
  {
    id: 882,
    "title": "甲姆沽阿平-爱花 - 福音",
    "artist": "甲姆沽阿平-爱花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3Nzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 259
  },
  {
    id: 883,
    "title": "纳西古乐 - 到夏来 (曲牌)",
    "artist": "纳西古乐",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3NzU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 301
  },
  {
    id: 884,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 243
  },
  {
    id: 885,
    "title": "提过啦",
    "artist": "提过啦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3NzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 146
  },
  {
    id: 886,
    "title": "华坪艺人 - 美酒醉三天",
    "artist": "华坪艺人",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3Njk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 210
  },
  {
    id: 887,
    "title": "烧包谷 - 心雨",
    "artist": "烧包谷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3NjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 169
  },
  {
    id: 888,
    "title": "杨坚(土土哥哥) - 弥渡山歌",
    "artist": "杨坚(土土哥哥)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3NTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 233
  },
  {
    id: 889,
    "title": "泸沽湖打跳纳西歌",
    "artist": "泸沽湖打跳纳西歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ3NDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 227
  },
  {
    id: 890,
    "title": "Ddee jjiq lei wel we",
    "artist": "Ddee jjiq lei wel we",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2OTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 433
  },
  {
    id: 891,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 268
  },
  {
    id: 892,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 236
  },
  {
    id: 893,
    "title": "民族打跳",
    "artist": "民族打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2ODA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 313
  },
  {
    id: 894,
    "title": "我比太阳更能温暖你的心",
    "artist": "我比太阳更能温暖你的心",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2NzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 203
  },
  {
    id: 895,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 227
  },
  {
    id: 896,
    "title": "大东纳西古歌(热美磋)",
    "artist": "大东纳西古歌(热美磋)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2NjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 154
  },
  {
    id: 897,
    "title": "和军 - 赶马调_摩梭语版",
    "artist": "和军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2NTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 253
  },
  {
    id: 898,
    "title": "傈僳阿依爬阿依玛嘎起啦",
    "artist": "傈僳阿依爬阿依玛嘎起啦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2NTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 476
  },
  {
    id: 899,
    "title": "呀哈哩",
    "artist": "呀哈哩",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2NDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 229
  },
  {
    id: 900,
    "title": "丽江群星 - 夕阳下的大石桥",
    "artist": "丽江群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2NDE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 288
  },
  {
    id: 901,
    "title": "玉龙山上开红花",
    "artist": "玉龙山上开红花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2MzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 92
  },
  {
    id: 902,
    "title": "童声合唱队合唱-野蜂飞舞",
    "artist": "童声合唱队合唱-野蜂飞舞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2MjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 78
  },
  {
    id: 903,
    "title": "纳金坤 - 纳西族酒歌",
    "artist": "纳金坤",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2MjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 227
  },
  {
    id: 904,
    "title": "纳西快板+纳西迎宾曲",
    "artist": "纳西快板+纳西迎宾曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ2MjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 199
  },
  {
    id: 905,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 251
  },
  {
    id: 906,
    "title": "纳西传统乐舞《窝热热》",
    "artist": "纳西传统乐舞《窝热热》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1OTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 90
  },
  {
    id: 907,
    "title": "纳西歌曲 - 哦噜唠，敖噜唠",
    "artist": "纳西歌曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1OTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 336
  },
  {
    id: 908,
    "title": "阿石才 - 伤心酒歌",
    "artist": "阿石才",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1ODM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 341
  },
  {
    id: 909,
    "title": "丽江打跳 彝族打跳舞",
    "artist": "丽江打跳 彝族打跳舞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1Nzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 232
  },
  {
    id: 910,
    "title": "阿石才欢快舞曲 = 子啦来",
    "artist": "阿石才欢快舞曲 = 子啦来",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1NzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 260
  },
  {
    id: 911,
    "title": "彝族健身操",
    "artist": "彝族健身操",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1NzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 232
  },
  {
    id: 912,
    "title": "李宝妹 张贵元 - 白族酒歌",
    "artist": "李宝妹 张贵元",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1NjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 232
  },
  {
    id: 913,
    "title": "白族歌曲 - 白族酒歌",
    "artist": "白族歌曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1NTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 231
  },
  {
    id: 914,
    "title": "齐旦布 - 北方高原",
    "artist": "齐旦布",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1NTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 243
  },
  {
    id: 915,
    "title": "华坪花傈僳打跳",
    "artist": "华坪花傈僳打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1NDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 258
  },
  {
    id: 916,
    "title": "丽江打跳 - 看两眼来对一脚",
    "artist": "丽江打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1NDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 216
  },
  {
    id: 917,
    "title": "依呀妹",
    "artist": "依呀妹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1MjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 242
  },
  {
    id: 918,
    "title": "阿拉鼓吉",
    "artist": "阿拉鼓吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1MjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 285
  },
  {
    id: 919,
    "title": "纳西族 - 敬老新歌",
    "artist": "纳西族",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ1MTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 235
  },
  {
    id: 920,
    "title": "和青峰 - 旧货",
    "artist": "和青峰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ0OTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 257
  },
  {
    id: 921,
    "title": "相守今生-和丽刚&amp;和趼研",
    "artist": "相守今生-和丽刚&amp;和趼研",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ0OTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 332
  },
  {
    id: 922,
    "title": "云中丽江",
    "artist": "云中丽江",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ0ODg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 228
  },
  {
    id: 923,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 211
  },
  {
    id: 924,
    "title": "涵格佩吉 - 纳西姑娘",
    "artist": "涵格佩吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ0NzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 280
  },
  {
    id: 925,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 280
  },
  {
    id: 926,
    "title": "和燕 - 乡遇",
    "artist": "和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ0NTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 198
  },
  {
    id: 927,
    "title": "和军 - 丽江的夜",
    "artist": "和军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ0NTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 299
  },
  {
    id: 928,
    "title": "和德华 - 爱跳舞的小姑娘",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ0NDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 250
  },
  {
    id: 929,
    "title": "丽江群星 - 笛子独奏 奚绍善",
    "artist": "丽江群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQ0Mzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 250
  },
  {
    id: 930,
    "title": "九河打跳",
    "artist": "九河打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQzOTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 274
  },
  {
    id: 931,
    "title": "枯萎",
    "artist": "枯萎",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQzOTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 263
  },
  {
    id: 932,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 163
  },
  {
    id: 933,
    "title": "不可撤销乐队 - 丽江",
    "artist": "不可撤销乐队",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQzNjU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 370
  },
  {
    id: 934,
    "title": "和德华 - 找朋友",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQzNTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 207
  },
  {
    id: 935,
    "title": "《慢五言》洞经音乐",
    "artist": "《慢五言》洞经音乐",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQzNTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 315
  },
  {
    id: 936,
    "title": "刘青青 - 情醉阿哩哩",
    "artist": "刘青青",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQzMzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 201
  },
  {
    id: 937,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 255
  },
  {
    id: 938,
    "title": "沙马果果 - 纳西阿妈",
    "artist": "沙马果果",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyOTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 280
  },
  {
    id: 939,
    "title": "和上钧阿诛 - 玉龙雪山的故事",
    "artist": "和上钧阿诛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyOTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 350
  },
  {
    id: 940,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVicll1DMWXxyxx8KPVFo8vicFX6AH6DV8CkA6bQwrPloX1rCWq5XmWr070R4lhu2nibuTVchhAH6VWVg/0?wx_fmt=jpeg",
    "duration": 215
  },
  {
    id: 941,
    "title": "傈僳欢乐歌",
    "artist": "傈僳欢乐歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyNDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 190
  },
  {
    id: 942,
    "title": "丽江傈僳 让我们一起干酒醉",
    "artist": "丽江傈僳 让我们一起干酒醉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyMzU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 203
  },
  {
    id: 943,
    "title": "彝族歌手-阿果 - 傈僳敬酒歌",
    "artist": "彝族歌手-阿果",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyMzM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 200
  },
  {
    id: 944,
    "title": "和德华 - 阿一旦",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyMzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 192
  },
  {
    id: 945,
    "title": "李茜姝 - 阿一旦，阿一旦",
    "artist": "李茜姝",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyMjk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 184
  },
  {
    id: 946,
    "title": "云南丽江傈僳歌曲 酒杯.女人",
    "artist": "云南丽江傈僳歌曲 酒杯.女人",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyMjU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 252
  },
  {
    id: 947,
    "title": "纳西打跳“蹉噜了”",
    "artist": "纳西打跳“蹉噜了”",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyMTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 205
  },
  {
    id: 948,
    "title": "丽江纳西特色《三部曲》打拉丽",
    "artist": "丽江纳西特色《三部曲》打拉丽",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyMDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1022
  },
  {
    id: 949,
    "title": "和万莲 - 月亮快出来",
    "artist": "和万莲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQyMDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 211
  },
  {
    id: 950,
    "title": "纳若 - 牵着你的手",
    "artist": "纳若",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQxNzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 277
  },
  {
    id: 951,
    "title": "木作为 - 阿妈的酥油茶",
    "artist": "木作为",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQxNjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 300
  },
  {
    id: 952,
    "title": "摩梭大调 - 我们齐欢笑",
    "artist": "摩梭大调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQxMzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 217
  },
  {
    id: 953,
    "title": "电视剧 - 茶马古道",
    "artist": "电视剧",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQxMzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 186
  },
  {
    id: 954,
    "title": "丽江真美丽《打跳丽江》打拉丽",
    "artist": "丽江真美丽《打跳丽江》打拉丽",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQxMTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 967
  },
  {
    id: 955,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 196
  },
  {
    id: 956,
    "title": "和德华 - 娃娃的天空",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQxMDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 169
  },
  {
    id: 957,
    "title": "土土哥哥 - 十八怪_丽江腔",
    "artist": "土土哥哥",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQwOTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 194
  },
  {
    id: 958,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 280
  },
  {
    id: 959,
    "title": "黄颖星 - 丽江小镇",
    "artist": "黄颖星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQwNjk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 260
  },
  {
    id: 960,
    "title": "李茜姝 - 小巴郎，童年的太阳",
    "artist": "李茜姝",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQwNTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 120
  },
  {
    id: 961,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 243
  },
  {
    id: 962,
    "title": "涵格佩吉 - 回到拉市海",
    "artist": "涵格佩吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQwMzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 266
  },
  {
    id: 963,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 239
  },
  {
    id: 964,
    "title": "和军 - 难道",
    "artist": "和军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQwMTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 268
  },
  {
    id: 965,
    "title": "蜂凌、蜂跃宏 - 雪地阳光",
    "artist": "蜂凌、蜂跃宏",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDQwMDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 222
  },
  {
    id: 966,
    "title": "阿表也劲爆 丽江DJ",
    "artist": "阿表也劲爆 丽江DJ",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5OTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 463
  },
  {
    id: 967,
    "title": "云南丽江密普纳西美 打跳",
    "artist": "云南丽江密普纳西美 打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5OTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 352
  },
  {
    id: 968,
    "title": "丽江真美好 纳西",
    "artist": "丽江真美好 纳西",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5OTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 441
  },
  {
    id: 969,
    "title": "和德华 - 油茶罐装不下的梦想",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5Njc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 236
  },
  {
    id: 970,
    "title": "和军 - 孤独的人",
    "artist": "和军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5NjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 256
  },
  {
    id: 971,
    "title": "和文光 - 纳西祝酒歌",
    "artist": "和文光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5NDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 163
  },
  {
    id: 972,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 190
  },
  {
    id: 973,
    "title": "根呷 阿佳组合 - 腾飞的比如",
    "artist": "根呷 阿佳组合",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5Mzg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 250
  },
  {
    id: 974,
    "title": "《月亮姆》纳西族童谣",
    "artist": "《月亮姆》纳西族童谣",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5Mjk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 104
  },
  {
    id: 975,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 169
  },
  {
    id: 976,
    "title": "丽江群星 - 点唇",
    "artist": "丽江群星",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM5MDE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 259
  },
  {
    id: 977,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 222
  },
  {
    id: 978,
    "title": "我是玉龙山的牧童",
    "artist": "我是玉龙山的牧童",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4NzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 208
  },
  {
    id: 979,
    "title": "纳西飞歌",
    "artist": "纳西飞歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4Njg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 213
  },
  {
    id: 980,
    "title": "时授 葬歌",
    "artist": "时授 葬歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4Njc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 87
  },
  {
    id: 981,
    "title": "我的灰姑娘",
    "artist": "我的灰姑娘",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4NjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 201
  },
  {
    id: 982,
    "title": "根呷&amp;扎西拉宗-思念",
    "artist": "根呷&amp;扎西拉宗-思念",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4NTc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 228
  },
  {
    id: 983,
    "title": "纳西古乐 - 调弦曲",
    "artist": "纳西古乐",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4NDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 76
  },
  {
    id: 984,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 166
  },
  {
    id: 985,
    "title": "笃(丽江白沙细乐之一)",
    "artist": "笃(丽江白沙细乐之一)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4Mzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 213
  },
  {
    id: 986,
    "title": "净土（纳西语版）",
    "artist": "净土（纳西语版）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4MzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 234
  },
  {
    id: 987,
    "title": "纳西恋歌",
    "artist": "纳西恋歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4MTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 232
  },
  {
    id: 988,
    "title": "纳西乐 纳若咪 纳西",
    "artist": "纳西乐 纳若咪 纳西",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4MDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 138
  },
  {
    id: 989,
    "title": "葫芦笙 背靠背",
    "artist": "葫芦笙 背靠背",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4MDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 343
  },
  {
    id: 990,
    "title": "纳西酒歌 劝世歌 情歌",
    "artist": "纳西酒歌 劝世歌 情歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM4MDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 392
  },
  {
    id: 991,
    "title": "三江组合 - 傈僳民歌五连唱",
    "artist": "三江组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3NzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 332
  },
  {
    id: 992,
    "title": "对歌调、玉龙山下的纳西娃",
    "artist": "对歌调、玉龙山下的纳西娃",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3NzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1430
  },
  {
    id: 993,
    "title": "丽江黎明打跳 ★欢乐调 丽江DJ",
    "artist": "丽江黎明打跳 ★欢乐调 丽江DJ",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3Njk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 162
  },
  {
    id: 994,
    "title": "丽江黎明打跳 ★提个老 丽江DJ",
    "artist": "丽江黎明打跳 ★提个老 丽江DJ",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3NTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 267
  },
  {
    id: 995,
    "title": "纳西 吉呐尼助助（鱼水相会）",
    "artist": "纳西 吉呐尼助助（鱼水相会）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3NTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 161
  },
  {
    id: 996,
    "title": "摩梭谣丽江DJ纳若咪",
    "artist": "摩梭谣丽江DJ纳若咪",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3NTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 209
  },
  {
    id: 997,
    "title": "丽江傈僳打跳",
    "artist": "丽江傈僳打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3MjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 357
  },
  {
    id: 998,
    "title": "车文光 - 玉龙第三国",
    "artist": "车文光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3MTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 223
  },
  {
    id: 999,
    "title": "木天王 李承翰",
    "artist": "木天王 李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3MTM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 372
  },
  {
    id: 1000,
    "title": "纳西打跳 - 南高寨打跳",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM3MTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 420
  },
  {
    id: 1001,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 136
  },
  {
    id: 1002,
    "title": "傈僳打跳调（葫芦）",
    "artist": "傈僳打跳调（葫芦）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2ODI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 432
  },
  {
    id: 1003,
    "title": "徐洋 - 拥抱丽江",
    "artist": "徐洋",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2Nzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 247
  },
  {
    id: 1004,
    "title": "纳西快板：中国梦",
    "artist": "纳西快板：中国梦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2NzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 251
  },
  {
    id: 1005,
    "title": "傈僳新版打跳胡芦笙dj",
    "artist": "傈僳新版打跳胡芦笙dj",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2Njk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 242
  },
  {
    id: 1006,
    "title": "丽江神曲",
    "artist": "丽江神曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2NjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 240
  },
  {
    id: 1007,
    "title": "纳西族音乐史 情歌《南兴调》",
    "artist": "纳西族音乐史 情歌《南兴调》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2NjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 94
  },
  {
    id: 1008,
    "title": "傈僳舞蹈-阔时拉",
    "artist": "傈僳舞蹈-阔时拉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2NTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 314
  },
  {
    id: 1009,
    "title": "傈僳舞蹈_四方朋友来打跳",
    "artist": "傈僳舞蹈_四方朋友来打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2MzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 282
  },
  {
    id: 1010,
    "title": "纳西田野之声 哦热热",
    "artist": "纳西田野之声 哦热热",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2MzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 226
  },
  {
    id: 1011,
    "title": "纳西打跳 - 百花开来打跳",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM2MTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 253
  },
  {
    id: 1012,
    "title": "新民乐_纳西古乐(纯音乐)",
    "artist": "新民乐_纳西古乐(纯音乐)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1OTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 231
  },
  {
    id: 1013,
    "title": "格萨拉—纳西平跳",
    "artist": "格萨拉—纳西平跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1OTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 265
  },
  {
    id: 1014,
    "title": "我俩永远在一起 阿石才",
    "artist": "我俩永远在一起 阿石才",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1Nzc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 230
  },
  {
    id: 1015,
    "title": "阿勒邱",
    "artist": "阿勒邱",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1NjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 214
  },
  {
    id: 1016,
    "title": "和兴凤 - 梨花又开放",
    "artist": "和兴凤",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1NTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 194
  },
  {
    id: 1017,
    "title": "纳若 -不怕",
    "artist": "纳若 -不怕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1NDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 281
  },
  {
    id: 1018,
    "title": "丽江滴答",
    "artist": "丽江滴答",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1NDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 238
  },
  {
    id: 1019,
    "title": "忘不了的阿哥",
    "artist": "忘不了的阿哥",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1MjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 232
  },
  {
    id: 1020,
    "title": "山人行组合 - 祖先的声音",
    "artist": "山人行组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1MTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 260
  },
  {
    id: 1021,
    "title": "幸福万年长",
    "artist": "幸福万年长",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM1MTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 200
  },
  {
    id: 1022,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 90
  },
  {
    id: 1023,
    "title": "东巴唱腔《冲把颂》",
    "artist": "东巴唱腔《冲把颂》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM0ODI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 93
  },
  {
    id: 1024,
    "title": "阿里里 细针挑丝线",
    "artist": "阿里里 细针挑丝线",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM0Nzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 147
  },
  {
    id: 1025,
    "title": "山人行组合 - 纳西人",
    "artist": "山人行组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM0NjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 252
  },
  {
    id: 1026,
    "title": "李茜姝 - 天边边",
    "artist": "李茜姝",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM0NjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 171
  },
  {
    id: 1027,
    "title": "傈僳娃娃组合 - 天蓝蓝",
    "artist": "傈僳娃娃组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM0MzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 193
  },
  {
    id: 1028,
    "title": "和美兰 - 云鹤吟",
    "artist": "和美兰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM0MTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 245
  },
  {
    id: 1029,
    "title": "犁牛调",
    "artist": "犁牛调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDM0MTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 184
  },
  {
    id: 1030,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 284
  },
  {
    id: 1031,
    "title": "劝世歌",
    "artist": "劝世歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMzNzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 132
  },
  {
    id: 1032,
    "title": "和德华 - 抓小偷",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMzNzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 256
  },
  {
    id: 1033,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 160
  },
  {
    id: 1034,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 231
  },
  {
    id: 1035,
    "title": "你是我的丽江",
    "artist": "你是我的丽江",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMzNTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 298
  },
  {
    id: 1036,
    "title": "和晓霞 - 三思吉",
    "artist": "和晓霞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMzNDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 184
  },
  {
    id: 1037,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 286
  },
  {
    id: 1038,
    "title": "浪淘沙(曲牌) - 纳西古乐",
    "artist": "浪淘沙(曲牌)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMyOTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 291
  },
  {
    id: 1039,
    "title": "和金花 李瑞山 - 情歌对唱",
    "artist": "和金花 李瑞山",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMyODY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 182
  },
  {
    id: 1040,
    "title": "和丽刚&amp;和趼研 - 相守今生",
    "artist": "和丽刚&amp;和趼研",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMyNjc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 332
  },
  {
    id: 1041,
    "title": "刘青青 - 丽江老家",
    "artist": "刘青青",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMyNjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 168
  },
  {
    id: 1042,
    "title": "丽江纳西歌手",
    "artist": "丽江纳西歌手",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMyNjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 88
  },
  {
    id: 1043,
    "title": "来搓哟，来夸哟",
    "artist": "来搓哟，来夸哟",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMyNjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 138
  },
  {
    id: 1044,
    "title": "和燕 - 傈僳酒歌",
    "artist": "和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMyNDg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 286
  },
  {
    id: 1045,
    "title": "林天然 - 三月百花开",
    "artist": "林天然",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMyNDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 211
  },
  {
    id: 1046,
    "title": "纳西打跳 - 喔噜啦",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMyMzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 379
  },
  {
    id: 1047,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 237
  },
  {
    id: 1048,
    "title": "刘青青 -纳西打跳“蹉噜了”",
    "artist": "刘青青 -纳西打跳“蹉噜了”",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMxOTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 205
  },
  {
    id: 1049,
    "title": "呀撒赛(云南白族舞曲)",
    "artist": "呀撒赛(云南白族舞曲)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMxODM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 311
  },
  {
    id: 1050,
    "title": "黄颖星.和燕 - 净地",
    "artist": "黄颖星.和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMxODA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 206
  },
  {
    id: 1051,
    "title": "心想唱就唱",
    "artist": "心想唱就唱",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMxNTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 275
  },
  {
    id: 1052,
    "title": "欢乐的阿里里",
    "artist": "欢乐的阿里里",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMxNTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 142
  },
  {
    id: 1053,
    "title": "和金花 - 犁牛调",
    "artist": "和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMxNDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 115
  },
  {
    id: 1054,
    "title": "拉伯热美：六项禁令要记牢",
    "artist": "拉伯热美：六项禁令要记牢",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMxNDE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 244
  },
  {
    id: 1055,
    "title": "舞动三江",
    "artist": "舞动三江",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMxMTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 258
  },
  {
    id: 1056,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 201
  },
  {
    id: 1057,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 286
  },
  {
    id: 1058,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 182
  },
  {
    id: 1059,
    "title": "泸沽湖我向往的地方",
    "artist": "泸沽湖我向往的地方",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwOTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 187
  },
  {
    id: 1060,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 333
  },
  {
    id: 1061,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 273
  },
  {
    id: 1062,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 280
  },
  {
    id: 1063,
    "title": "三代女人的歌",
    "artist": "三代女人的歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwNzM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 175
  },
  {
    id: 1064,
    "title": "放牛娃娃调",
    "artist": "放牛娃娃调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwNjk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 231
  },
  {
    id: 1065,
    "title": "澜沧江水深爱的地方",
    "artist": "澜沧江水深爱的地方",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwMzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 236
  },
  {
    id: 1066,
    "title": "纳西魂(波伯、巴乌、小闷笛)",
    "artist": "纳西魂(波伯、巴乌、小闷笛)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwMzc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 292
  },
  {
    id: 1067,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 186
  },
  {
    id: 1068,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 239
  },
  {
    id: 1069,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 202
  },
  {
    id: 1070,
    "title": "两朵云(纳西语+汉语)",
    "artist": "两朵云(纳西语+汉语)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwMTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 252
  },
  {
    id: 1071,
    "title": "赵雷 - 成都(古城丽江版)",
    "artist": "赵雷",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwMDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 258
  },
  {
    id: 1072,
    "title": "向阳花+石头在歌唱",
    "artist": "向阳花+石头在歌唱",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwMDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 237
  },
  {
    id: 1073,
    "title": "朋友来了——喝酒",
    "artist": "朋友来了——喝酒",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwMDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 86
  },
  {
    id: 1074,
    "title": "印象丽江，雪山篇 - 十女十歌",
    "artist": "印象丽江，雪山篇",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDMwMDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 151
  },
  {
    id: 1075,
    "title": "十供养(唱经)",
    "artist": "十供养(唱经)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5Nzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 551
  },
  {
    id: 1076,
    "title": "纳西阿勒瓦器",
    "artist": "纳西阿勒瓦器",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5Njg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 326
  },
  {
    id: 1077,
    "title": "多彩民族之纳西族",
    "artist": "多彩民族之纳西族",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5NjU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1205
  },
  {
    id: 1078,
    "title": "阿鲁阿卓 、山风组合 - 不要怕",
    "artist": "阿鲁阿卓 、山风组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5NjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 294
  },
  {
    id: 1079,
    "title": "纳西娃娃合唱团—嘿美啵",
    "artist": "纳西娃娃合唱团—嘿美啵",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5NDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 191
  },
  {
    id: 1080,
    "title": "传奇",
    "artist": "传奇",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5Mzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 187
  },
  {
    id: 1081,
    "title": "纳西语版《真的爱你》",
    "artist": "纳西语版《真的爱你》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5Mzc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 166
  },
  {
    id: 1082,
    "title": "剑川白族调 心肝票",
    "artist": "剑川白族调 心肝票",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5MTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 308
  },
  {
    id: 1083,
    "title": "向丽 - 好梦在丽江",
    "artist": "向丽",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5MTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 273
  },
  {
    id: 1084,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 156
  },
  {
    id: 1085,
    "title": "我的好姑娘 - 达坡阿玻",
    "artist": "我的好姑娘",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI5MDg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 217
  },
  {
    id: 1086,
    "title": "李茜姝 - 感恩丽江原唱",
    "artist": "李茜姝",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4ODY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 272
  },
  {
    id: 1087,
    "title": "土土哥哥 - 丽江恰恰恰",
    "artist": "土土哥哥",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4ODM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 203
  },
  {
    id: 1088,
    "title": "土土哥哥) - 丽江恰恰恰",
    "artist": "土土哥哥)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4ODI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 203
  },
  {
    id: 1089,
    "title": "嘎洒洒",
    "artist": "嘎洒洒",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4ODA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 273
  },
  {
    id: 1090,
    "title": "喂默达",
    "artist": "喂默达",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4Nzc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 391
  },
  {
    id: 1091,
    "title": "齐旦布达娃卓玛-梅里爱的见证",
    "artist": "齐旦布达娃卓玛-梅里爱的见证",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4NjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 261
  },
  {
    id: 1092,
    "title": "和春秀 - 欢乐纳西人",
    "artist": "和春秀",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4NTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 250
  },
  {
    id: 1093,
    "title": "玉龙雪山的一米阳光(长音频)",
    "artist": "玉龙雪山的一米阳光(长音频)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4MjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1049
  },
  {
    id: 1094,
    "title": "大山汉子傈僳族民歌",
    "artist": "大山汉子傈僳族民歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4MjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 269
  },
  {
    id: 1095,
    "title": "玉龙雪山 欢乐的金沙江纳西族",
    "artist": "玉龙雪山 欢乐的金沙江纳西族",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4MTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 161
  },
  {
    id: 1096,
    "title": "阿哩哩格吉拍美丽的白云",
    "artist": "阿哩哩格吉拍美丽的白云",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4MTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 335
  },
  {
    id: 1097,
    "title": "和议财(纳西族) - 呀哩哩",
    "artist": "和议财(纳西族)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4MTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 188
  },
  {
    id: 1098,
    "title": "玉龙雪山传说(纳西族)",
    "artist": "玉龙雪山传说(纳西族)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4MTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 340
  },
  {
    id: 1099,
    "title": "纳西民歌《沃孟达·新婚调》",
    "artist": "纳西民歌《沃孟达·新婚调》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI4MDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1340
  },
  {
    id: 1100,
    "title": "过年好DJ",
    "artist": "过年好DJ",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI3OTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 236
  },
  {
    id: 1101,
    "title": "张曦尹《星光闪烁》",
    "artist": "张曦尹《星光闪烁》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI3NjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 324
  },
  {
    id: 1102,
    "title": "张曦尹《山那边的放猪娃》",
    "artist": "张曦尹《山那边的放猪娃》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI3NTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 232
  },
  {
    id: 1103,
    "title": "美丽的白云--纳西族歌手姚熙",
    "artist": "美丽的白云--纳西族歌手姚熙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI3MTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 283
  },
  {
    id: 1104,
    "title": "纳西音乐 张曦尹-故乡 丽江",
    "artist": "纳西音乐 张曦尹-故乡 丽江",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI3MDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 233
  },
  {
    id: 1105,
    "title": "大石桥之恋--纳西族歌手姚熙",
    "artist": "大石桥之恋--纳西族歌手姚熙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI3MDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 215
  },
  {
    id: 1106,
    "title": "张曦尹《蝶儿飞》",
    "artist": "张曦尹《蝶儿飞》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI3MDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 202
  },
  {
    id: 1107,
    "title": "纳西民族舞",
    "artist": "纳西民族舞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2ODA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 304
  },
  {
    id: 1108,
    "title": "向阳花合唱团 朋友",
    "artist": "向阳花合唱团 朋友",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2NzU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 188
  },
  {
    id: 1109,
    "title": "和丽元 杨永爱 -纳西喂么哒",
    "artist": "和丽元 杨永爱 -纳西喂么哒",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2NzM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 460
  },
  {
    id: 1110,
    "title": "纳西西于花花神 - 纳西族歌手姚熙",
    "artist": "纳西西于花花神",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2NjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 223
  },
  {
    id: 1111,
    "title": "纳西族歌手姚熙－咱撮鲁啦",
    "artist": "纳西族歌手姚熙－咱撮鲁啦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2NjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 207
  },
  {
    id: 1112,
    "title": "篝火之夜 - 丽江纳西族歌手",
    "artist": "篝火之夜",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2NTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 202
  },
  {
    id: 1113,
    "title": "无标题",
    "artist": "无标题",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2NDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 207
  },
  {
    id: 1114,
    "title": "纳西音乐 张曦尹 - 我的家",
    "artist": "纳西音乐 张曦尹",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2NDg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 243
  },
  {
    id: 1115,
    "title": "亚东 - 卓玛",
    "artist": "亚东",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2MzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 296
  },
  {
    id: 1116,
    "title": "小毛调-葫芦笙",
    "artist": "小毛调-葫芦笙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2MzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 251
  },
  {
    id: 1117,
    "title": "纳西三部曲dj",
    "artist": "纳西三部曲dj",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2Mjk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 359
  },
  {
    id: 1118,
    "title": "阿里里献给毛主席",
    "artist": "阿里里献给毛主席",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2MTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 184
  },
  {
    id: 1119,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 214
  },
  {
    id: 1120,
    "title": "丽江华坪花傈僳打跳之傈僳阔时",
    "artist": "丽江华坪花傈僳打跳之傈僳阔时",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI2MDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 314
  },
  {
    id: 1121,
    "artist": "李承翰&amp;和慧琼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1OTg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 393
  },
  {
    id: 1122,
    "title": "丽江民族打跳 - 捞松毛",
    "artist": "丽江民族打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1OTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 338
  },
  {
    id: 1123,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 217
  },
  {
    id: 1124,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 209
  },
  {
    id: 1125,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 212
  },
  {
    id: 1126,
    "title": "拉伯阿新 - 茶马情",
    "artist": "拉伯阿新",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1NzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 256
  },
  {
    id: 1127,
    "title": "纳西古乐 情漫金沙江",
    "artist": "纳西古乐 情漫金沙江",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1Njg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 240
  },
  {
    id: 1128,
    "title": "拉伯阿新 - 浪漫丽江",
    "artist": "拉伯阿新",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1Njc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 239
  },
  {
    id: 1129,
    "title": "阿尺瓦器",
    "artist": "阿尺瓦器",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1NTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 194
  },
  {
    id: 1130,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 273
  },
  {
    id: 1131,
    "title": "阿木宇梅 - 跳舞姑娘",
    "artist": "阿木宇梅",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1NDE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 219
  },
  {
    id: 1132,
    "title": "阿木宇梅 - 春",
    "artist": "阿木宇梅",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1MjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 254
  },
  {
    id: 1133,
    "title": "点神灯（东巴祭司和玉才唱腔）",
    "artist": "点神灯（东巴祭司和玉才唱腔）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1MDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 138
  },
  {
    id: 1134,
    "title": "鲁般鲁饶（和开祥）",
    "artist": "鲁般鲁饶（和开祥）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1MDg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 134
  },
  {
    id: 1135,
    "title": "拉伯阿新 - 拉伯谷气",
    "artist": "拉伯阿新",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI1MDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 212
  },
  {
    id: 1136,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 117
  },
  {
    id: 1137,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 91
  },
  {
    id: 1138,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 161
  },
  {
    id: 1139,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 245
  },
  {
    id: 1140,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/jXiaTRzsmA7OQHQDGBpA1wap9IF3RibLM0UsJYCMFSJWKMxd5K4dicX46jibdaSP83BKIRbRmLT3jbLibVgjIxkXDWGZI3oXDUoTOmlXSu1w0lZE/640?wx_fmt=webp&from=appmsg",
    "duration": 201
  },
  {
    id: 1141,
    "title": "和漩 - 四方街之夜",
    "artist": "和漩",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0ODc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 50
  },
  {
    id: 1142,
    "title": "依古纳西",
    "artist": "依古纳西",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0ODY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 189
  },
  {
    id: 1143,
    "title": "纳西群舞 - 纳西热美磋",
    "artist": "纳西群舞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0Nzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 282
  },
  {
    id: 1144,
    "title": "拉伯阿新 - 石头城",
    "artist": "拉伯阿新",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0NTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 182
  },
  {
    id: 1145,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 221
  },
  {
    id: 1146,
    "title": "齐旦布 - 归来",
    "artist": "齐旦布",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0MzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 311
  },
  {
    id: 1147,
    "title": "吉萨莎玛 - 不痛",
    "artist": "吉萨莎玛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0Mjg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 240
  },
  {
    id: 1148,
    "title": "吉萨莎玛 - 净地",
    "artist": "吉萨莎玛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0MjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 135
  },
  {
    id: 1149,
    "title": "吉萨莎玛 - 怀念",
    "artist": "吉萨莎玛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0MjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 223
  },
  {
    id: 1150,
    "title": "和德华 - 猜猜谣",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0MTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 182
  },
  {
    id: 1151,
    "title": "阿里里",
    "artist": "阿里里",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDI0MDg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 738
  },
  {
    id: 1152,
    "title": "德金卓玛 - 与白鹤共舞",
    "artist": "德金卓玛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzOTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 237
  },
  {
    id: 1153,
    "title": "和仕军 杨志勇 - 召唤",
    "artist": "和仕军 杨志勇",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzOTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 149
  },
  {
    id: 1154,
    "title": "和晓霞 - 说散就散",
    "artist": "和晓霞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzODA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 161
  },
  {
    id: 1155,
    "title": "和晓霞 - 时间煮雨",
    "artist": "和晓霞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzNzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 248
  },
  {
    id: 1156,
    "title": "张慧珺 - 七彩飞扬",
    "artist": "张慧珺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzNzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 245
  },
  {
    id: 1157,
    "title": "和德华 - 歪脖子树下",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzNjk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 229
  },
  {
    id: 1158,
    "title": "央金次卓 - 美域巴拉格宗",
    "artist": "央金次卓",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzNTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 275
  },
  {
    id: 1159,
    "title": "嘿美孜卜（月光下）纳西原生态",
    "artist": "嘿美孜卜（月光下）纳西原生态",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzNTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 536
  },
  {
    id: 1160,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 285
  },
  {
    id: 1161,
    "title": "玛吉谁不夸 - 许媛",
    "artist": "玛吉谁不夸",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzNDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 218
  },
  {
    id: 1162,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 222
  },
  {
    id: 1163,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 387
  },
  {
    id: 1164,
    "title": "纳西语(梦中的香格里拉)",
    "artist": "纳西语(梦中的香格里拉)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzMzU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 138
  },
  {
    id: 1165,
    "title": "纳西语Naq sso mil",
    "artist": "纳西语Naq sso mil",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzMzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 183
  },
  {
    id: 1166,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 270
  },
  {
    id: 1167,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 246
  },
  {
    id: 1168,
    "title": "我是纳西的后代",
    "artist": "我是纳西的后代",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzMDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 334
  },
  {
    id: 1169,
    "title": "夏夜篝火(纳西族)",
    "artist": "夏夜篝火(纳西族)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIzMDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 253
  },
  {
    id: 1170,
    "title": "不丹 格桑啦",
    "artist": "不丹 格桑啦",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIyODg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 252
  },
  {
    id: 1171,
    "title": "啊嚒嘀喂 - 《阿叔杨七三》",
    "artist": "啊嚒嘀喂",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIyODc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 85
  },
  {
    id: 1172,
    "title": "雨露滋润依古堆（喂么达）",
    "artist": "雨露滋润依古堆（喂么达）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIyNzU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 242
  },
  {
    id: 1173,
    "title": "丽江原生态打歌.大蛮调",
    "artist": "丽江原生态打歌.大蛮调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIyNjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 627
  },
  {
    id: 1174,
    "title": "普米族原生态 - 一起来打跳",
    "artist": "普米族原生态",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIyNjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 440
  },
  {
    id: 1175,
    "title": "说散就散 - 和兴凤",
    "artist": "说散就散",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIyNDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 116
  },
  {
    id: 1176,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 144
  },
  {
    id: 1177,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 187
  },
  {
    id: 1178,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 296
  },
  {
    id: 1179,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 289
  },
  {
    id: 1180,
    "title": "陈四才-《幸福醉歌》",
    "artist": "陈四才-《幸福醉歌》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIyMDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 215
  },
  {
    id: 1181,
    "title": "回归",
    "artist": "回归",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxNzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 255
  },
  {
    id: 1182,
    "title": "爱无悔",
    "artist": "爱无悔",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxNzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 262
  },
  {
    id: 1183,
    "title": "达瓦央珍 陈华龙 - 星空谣",
    "artist": "达瓦央珍 陈华龙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxNzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 158
  },
  {
    id: 1184,
    "title": "和兴凤 - 你不知道的事",
    "artist": "和兴凤",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxNTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 182
  },
  {
    id: 1185,
    "title": "和兴凤、塔斯肯 - 婚誓",
    "artist": "和兴凤、塔斯肯",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxNTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 175
  },
  {
    id: 1186,
    "title": "《不要怕》和兴凤",
    "artist": "《不要怕》和兴凤",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxNTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 81
  },
  {
    id: 1187,
    "title": "根呷 - 香巴拉佛塔",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxNDA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 268
  },
  {
    id: 1188,
    "title": "纳西仁美蹉",
    "artist": "纳西仁美蹉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxMjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 239
  },
  {
    id: 1189,
    "title": "阿卡巴拉",
    "artist": "阿卡巴拉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxMjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 185
  },
  {
    id: 1190,
    "title": "哦蒙达",
    "artist": "哦蒙达",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxMjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 56
  },
  {
    id: 1191,
    "title": "沙玛学锋-花腰姑娘",
    "artist": "沙玛学锋-花腰姑娘",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxMTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 267
  },
  {
    id: 1192,
    "title": "女儿国组合 - 花楼恋歌",
    "artist": "女儿国组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIxMDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 243
  },
  {
    id: 1193,
    "title": "女儿国组合 - 走婚夜歌（阿注喂）",
    "artist": "女儿国组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIwOTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 242
  },
  {
    id: 1194,
    "title": "习振东 - 心灵的坐标",
    "artist": "习振东",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIwNjc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 92
  },
  {
    id: 1195,
    "title": "和春秀 - 玉龙情歌",
    "artist": "和春秀",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIwNTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 252
  },
  {
    id: 1196,
    "title": "怒江情歌 纳若咪",
    "artist": "怒江情歌 纳若咪",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIwNDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 324
  },
  {
    id: 1197,
    "title": "丽江华坪花傈僳打跳之闯箩篼",
    "artist": "丽江华坪花傈僳打跳之闯箩篼",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIwMzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 324
  },
  {
    id: 1198,
    "title": "丽江风暴1dj",
    "artist": "丽江风暴1dj",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIwMzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 970
  },
  {
    id: 1199,
    "title": "祝婚歌",
    "artist": "祝婚歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIwMzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 147
  },
  {
    id: 1200,
    "title": "大山走出的孩子",
    "artist": "大山走出的孩子",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIwMTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 287
  },
  {
    id: 1201,
    "title": "纳西情歌（纳西语版）",
    "artist": "纳西情歌（纳西语版）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDIwMTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 234
  },
  {
    id: 1202,
    "title": "唐古拉风暴金雪莲风暴精选",
    "artist": "唐古拉风暴金雪莲风暴精选",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE5OTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 861
  },
  {
    id: 1203,
    "title": "和德华 - 样怪样嘻",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE5OTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 296
  },
  {
    id: 1204,
    "title": "唐古拉风暴 (DJ版)",
    "artist": "唐古拉风暴 (DJ版)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE5ODQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 482
  },
  {
    id: 1205,
    "title": "张慧珺 - 星愿亮晶晶",
    "artist": "张慧珺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE5Njg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 219
  },
  {
    id: 1206,
    "title": "月亮快出来",
    "artist": "月亮快出来",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE5NjU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 217
  },
  {
    id: 1207,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 265
  },
  {
    id: 1208,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 288
  },
  {
    id: 1209,
    "title": "纳西民歌 - 玉龙梦",
    "artist": "纳西民歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE5NDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 84
  },
  {
    id: 1210,
    "title": "涵格佩吉 - 归来吧",
    "artist": "涵格佩吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE5MzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 256
  },
  {
    id: 1211,
    "title": "纳西啦嘿歌",
    "artist": "纳西啦嘿歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE5MjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 197
  },
  {
    id: 1212,
    "title": "纳西族民歌",
    "artist": "纳西族民歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4OTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 185
  },
  {
    id: 1213,
    "title": "央金兰泽 - 天边的浪漫",
    "artist": "央金兰泽",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4OTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 229
  },
  {
    id: 1214,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 219
  },
  {
    id: 1215,
    "title": "涵格佩吉 - 纳西西余花花色",
    "artist": "涵格佩吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4ODg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 249
  },
  {
    id: 1216,
    "title": "和德华 - 四季歌",
    "artist": "和德华",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4Nzc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 190
  },
  {
    id: 1217,
    "title": "三坝七步 - 亚拉咧",
    "artist": "三坝七步",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4Njg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 129
  },
  {
    id: 1218,
    "title": "想是想玩呢,就是害羞羞",
    "artist": "想是想玩呢,就是害羞羞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4NjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 184
  },
  {
    id: 1219,
    "title": "丽江组合 - 打跳歌",
    "artist": "丽江组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4NTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1472
  },
  {
    id: 1220,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 228
  },
  {
    id: 1221,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 216
  },
  {
    id: 1222,
    "title": "超越dj",
    "artist": "超越dj",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4NDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 390
  },
  {
    id: 1223,
    "title": "赶街跳",
    "artist": "赶街跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4NDE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 283
  },
  {
    id: 1224,
    "title": "达坡阿玻 - 美丽姑娘",
    "artist": "达坡阿玻",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4Mjk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 221
  },
  {
    id: 1225,
    "cover": "https://mmbiz.qpic.cn/sz_mmbiz_jpg/tfpibRIwbCVib505OXlIOk8a7RIUO6XibiasOkRpZzDDUJMiagv8UP8ibaxSux7cf6ILCgARISoa4Wu8zNNaOuKBSIicA/640?wx_fmt=jpeg&from=appmsg",
    "duration": 208
  },
  {
    id: 1226,
    "title": "维西纳西古歌(打谷调)",
    "artist": "维西纳西古歌(打谷调)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4MTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 240
  },
  {
    id: 1227,
    "title": "丽江纳西古乐(阿丽丽金排)",
    "artist": "丽江纳西古乐(阿丽丽金排)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4MDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 211
  },
  {
    id: 1228,
    "title": "丽江纳西古歌(娥姆达)",
    "artist": "丽江纳西古歌(娥姆达)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4MDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 249
  },
  {
    id: 1229,
    "title": "张慧珺 - 故乡丽江",
    "artist": "张慧珺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE4MDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 235
  },
  {
    id: 1230,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 252
  },
  {
    id: 1231,
    "title": "大懂纳西古歌(热美磋)",
    "artist": "大懂纳西古歌(热美磋)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3OTQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 154
  },
  {
    id: 1232,
    "title": "三坝纳西古歌谷气调",
    "artist": "三坝纳西古歌谷气调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3OTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 178
  },
  {
    id: 1233,
    "title": "雪山恋",
    "artist": "雪山恋",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3ODg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 156
  },
  {
    id: 1234,
    "title": "栽秧调(古老民歌)",
    "artist": "栽秧调(古老民歌)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3ODQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 163
  },
  {
    id: 1235,
    "title": "达坡阿玻 - 阿普三朵请您来",
    "artist": "达坡阿玻",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3Nzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 204
  },
  {
    id: 1236,
    "title": "傈僳打桥舞",
    "artist": "傈僳打桥舞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3NjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 348
  },
  {
    id: 1237,
    "title": "傈僳酒歌dj",
    "artist": "傈僳酒歌dj",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3NjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 174
  },
  {
    id: 1238,
    "title": "相守到永久",
    "artist": "相守到永久",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3NTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 249
  },
  {
    id: 1239,
    "title": "纳西摇篮曲",
    "artist": "纳西摇篮曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3NDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 134
  },
  {
    id: 1240,
    "title": "甲姆沽·阿平 - 唯有你",
    "artist": "甲姆沽·阿平",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3Mzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 219
  },
  {
    id: 1241,
    "title": "甲姆沽·阿平 - 齐来欢喜",
    "artist": "甲姆沽·阿平",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3Mzc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 82
  },
  {
    id: 1242,
    "title": "甲姆沽·阿平、阿花-爱的福音",
    "artist": "甲姆沽·阿平、阿花-爱的福音",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3MzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 259
  },
  {
    id: 1243,
    "title": "欢乐纳西打跳",
    "artist": "欢乐纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3MzU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 183
  },
  {
    id: 1244,
    "title": "注目看耶稣 Yisu Juq Lei Liuq",
    "artist": "注目看耶稣 Yisu Juq Lei Liuq",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3MjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 221
  },
  {
    id: 1245,
    "title": "甲姆沽·阿平 - 智慧之源",
    "artist": "甲姆沽·阿平",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3MTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 200
  },
  {
    id: 1246,
    "title": "甲姆沽·阿平 - 善与恶",
    "artist": "甲姆沽·阿平",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE3MTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 226
  },
  {
    id: 1247,
    "title": "李承翰 - 勤劳之歌",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2OTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 377
  },
  {
    id: 1248,
    "title": "我是玉龙山上的牧童",
    "artist": "我是玉龙山上的牧童",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2OTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 208
  },
  {
    id: 1249,
    "title": "蔡隽妮 - 丽江千古情",
    "artist": "蔡隽妮",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2Nzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 199
  },
  {
    id: 1250,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 191
  },
  {
    id: 1251,
    "title": "马涛 - 云中的村庄",
    "artist": "马涛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2Njg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 210
  },
  {
    id: 1252,
    "title": "纳西-随想",
    "artist": "纳西-随想",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2NTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 260
  },
  {
    id: 1253,
    "title": "玉龙山上开红花.",
    "artist": "玉龙山上开红花.",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2NTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 92
  },
  {
    id: 1254,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 211
  },
  {
    id: 1255,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 227
  },
  {
    id: 1256,
    "title": "葫芦笙（王永刚）",
    "artist": "葫芦笙（王永刚）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2MzU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 154
  },
  {
    id: 1257,
    "title": "妈妈 - 彝人制造",
    "artist": "妈妈",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2MzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 314
  },
  {
    id: 1258,
    "title": "三江谣",
    "artist": "三江谣",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2Mjg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 211
  },
  {
    id: 1259,
    "title": "沙玛学锋《云中村庄》现场版",
    "artist": "沙玛学锋《云中村庄》现场版",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE2MjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 227
  },
  {
    id: 1260,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 229
  },
  {
    id: 1261,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 233
  },
  {
    id: 1262,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 259
  },
  {
    id: 1263,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 211
  },
  {
    id: 1264,
    "title": "纳西魂（和文光音乐）",
    "artist": "纳西魂（和文光音乐）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1OTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 215
  },
  {
    id: 1265,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 266
  },
  {
    id: 1266,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 188
  },
  {
    id: 1267,
    "title": "摩梭打跳曲II",
    "artist": "摩梭打跳曲II",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1Nzc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 276
  },
  {
    id: 1268,
    "title": "与白鹤共舞",
    "artist": "与白鹤共舞",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1NzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 237
  },
  {
    id: 1269,
    "title": "纯音乐 - 姑娘小伙来打跳",
    "artist": "纯音乐",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1NjU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 487
  },
  {
    id: 1270,
    "title": "彝族舞曲I",
    "artist": "彝族舞曲I",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1NTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 280
  },
  {
    id: 1271,
    "title": "傈僳芦笙",
    "artist": "傈僳芦笙",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1Mzc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 320
  },
  {
    id: 1272,
    "title": "根呷VS泽旺拉姆 康巴艺术节主题曲《祝福康巴》",
    "artist": "根呷VS泽旺拉姆 康巴艺术节主题曲《祝福康巴》",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1MzQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 300
  },
  {
    id: 1273,
    "title": "回家 印象丽江主题曲 西若如",
    "artist": "回家 印象丽江主题曲 西若如",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1MjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 292
  },
  {
    id: 1274,
    "title": "傈僳打跳-乌鸦喝水",
    "artist": "傈僳打跳-乌鸦喝水",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1MjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 216
  },
  {
    id: 1275,
    "title": "群星演唱《牦牛之歌》",
    "artist": "群星演唱《牦牛之歌》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1MTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 316
  },
  {
    id: 1276,
    "title": "西若如 - 回家",
    "artist": "西若如",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1MDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 288
  },
  {
    id: 1277,
    "title": "纳西资搓鲁",
    "artist": "纳西资搓鲁",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1MDE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 441
  },
  {
    id: 1278,
    "title": "丽江华坪跳之傈僳阔时",
    "artist": "丽江华坪跳之傈僳阔时",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE1MDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 314
  },
  {
    id: 1279,
    "title": "笑一笑对脚歌曲",
    "artist": "笑一笑对脚歌曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0OTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 160
  },
  {
    id: 1280,
    "title": "刘青青 - 蹉噜了",
    "artist": "刘青青",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0ODA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 205
  },
  {
    id: 1281,
    "title": "纳西打跳 - 好玩好耍来打跳",
    "artist": "纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0NzY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 372
  },
  {
    id: 1282,
    "title": "傈僳打跳调（葫芦声）",
    "artist": "傈僳打跳调（葫芦声）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0NzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 432
  },
  {
    id: 1283,
    "title": "僳家山歌 - 丽江黎明",
    "artist": "僳家山歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0NjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 334
  },
  {
    id: 1284,
    "title": "山人乐队 - 三十年",
    "artist": "山人乐队",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0NTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 232
  },
  {
    id: 1285,
    "title": "摇滚藏獒纳西语版 - 随我所爱",
    "artist": "摇滚藏獒纳西语版",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0NDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 212
  },
  {
    id: 1286,
    "title": "习振东 -唱一首属于自己的歌",
    "artist": "习振东 -唱一首属于自己的歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0MzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 223
  },
  {
    id: 1287,
    "title": "丽江纳西打跳",
    "artist": "丽江纳西打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0Mjk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 138
  },
  {
    id: 1288,
    "title": "why---纳金坤",
    "artist": "why---纳金坤",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDE0Mjg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 236
  },
  {
    id: 1289,
    "title": "玉龙山组合表演纳西族民歌",
    "artist": "玉龙山组合表演纳西族民歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzOTU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 56
  },
  {
    id: 1290,
    "title": "阿哩哩",
    "artist": "阿哩哩",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzOTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 294
  },
  {
    id: 1291,
    "title": "云上石头城插曲-《云中村庄》",
    "artist": "云上石头城插曲-《云中村庄》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzODI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 247
  },
  {
    id: 1292,
    "title": "夏天播放 - 《太久》",
    "artist": "夏天播放",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzNzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 228
  },
  {
    id: 1293,
    "title": "阿依呢玛（傈僳dj舞曲）",
    "artist": "阿依呢玛（傈僳dj舞曲）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzNjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 893
  },
  {
    id: 1294,
    "title": "傈僳魅音超嗨傈僳打跳舞曲DJ版",
    "artist": "傈僳魅音超嗨傈僳打跳舞曲DJ版",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzNjU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 316
  },
  {
    id: 1295,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 236
  },
  {
    id: 1296,
    "title": "《云上石头城》当爱情来过",
    "artist": "《云上石头城》当爱情来过",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzNDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 299
  },
  {
    id: 1297,
    "title": "嘎迟迟呐撒哇",
    "artist": "嘎迟迟呐撒哇",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzNDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 189
  },
  {
    id: 1298,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 317
  },
  {
    id: 1299,
    "title": "阿刚 - 久违的哥们",
    "artist": "阿刚",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzMDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 277
  },
  {
    id: 1300,
    "title": "烧天香（纳西东巴）",
    "artist": "烧天香（纳西东巴）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzMDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 109
  },
  {
    id: 1301,
    "title": "度王经（纳西东巴）",
    "artist": "度王经（纳西东巴）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEzMDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 151
  },
  {
    id: 1302,
    "title": "傈僳族 - 啊依然",
    "artist": "傈僳族",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyODY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 191
  },
  {
    id: 1303,
    "title": "傈僳调",
    "artist": "傈僳调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyODQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 263
  },
  {
    id: 1304,
    "title": "我是土土 - 洛克的家",
    "artist": "我是土土",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyODM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 279
  },
  {
    id: 1305,
    "title": "彝族dj",
    "artist": "彝族dj",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyNzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 251
  },
  {
    id: 1306,
    "title": "小凉山彝族舞曲 - 索玛花盛开",
    "artist": "小凉山彝族舞曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyNjg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 347
  },
  {
    id: 1307,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 218
  },
  {
    id: 1308,
    "title": "超越葫芦笙dj-超越葫芦笙dj",
    "artist": "超越葫芦笙dj-超越葫芦笙dj",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyNDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 650
  },
  {
    id: 1309,
    "title": "纳西语版《一生所爱》",
    "artist": "纳西语版《一生所爱》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyMjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 289
  },
  {
    id: 1310,
    "title": "傈僳族七步曲",
    "artist": "傈僳族七步曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyMjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 326
  },
  {
    id: 1311,
    "title": "羊年大吉来打跳",
    "artist": "羊年大吉来打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyMTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 531
  },
  {
    id: 1312,
    "title": "钰涵 - 丽江梦",
    "artist": "钰涵",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEyMDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 257
  },
  {
    id: 1313,
    "title": "纳西狼组合-新年好",
    "artist": "纳西狼组合-新年好",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDExOTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 183
  },
  {
    id: 1314,
    "title": "梦回云南--纳金坤",
    "artist": "梦回云南--纳金坤",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDExOTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 293
  },
  {
    id: 1315,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 198
  },
  {
    id: 1316,
    "title": "兰卡措 - 香格里拉的约定",
    "artist": "兰卡措",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDExNzM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 234
  },
  {
    id: 1317,
    "title": "",
    "artist": "",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 0
  },
  {
    id: 1318,
    "title": "张慧珺 - 山那边的纳西娃.mp3",
    "artist": "张慧珺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwNzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 232
  },
  {
    id: 1319,
    "title": "芦笙邀舞（Li-Su）",
    "artist": "芦笙邀舞（Li-Su）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwNjc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 223
  },
  {
    id: 1320,
    "title": "和文光 - 口弦悠悠（欣赏版）",
    "artist": "和文光",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwNjU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 219
  },
  {
    id: 1321,
    "title": "寒雨 - 福慧路",
    "artist": "寒雨",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwNjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 168
  },
  {
    id: 1322,
    "title": "思乡曲【纳西语】",
    "artist": "思乡曲【纳西语】",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwNTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 273
  },
  {
    id: 1323,
    "title": "傈音创宣室 - 丽江傈僳打跳",
    "artist": "傈音创宣室",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwNDc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 357
  },
  {
    id: 1324,
    "title": "土鸡蛋组合 - 醉了丽江",
    "artist": "土鸡蛋组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwNDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 237
  },
  {
    id: 1325,
    "title": "七个月亮",
    "artist": "七个月亮",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwNDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 164
  },
  {
    id: 1326,
    "title": "和丽元 - 喔吉阿丽哩",
    "artist": "和丽元",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwMzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 261
  },
  {
    id: 1327,
    "title": "纳若 - 恋您我的家.mp3",
    "artist": "纳若",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwMjU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 243
  },
  {
    id: 1328,
    "title": "张慧珺 - 脑筋急转弯",
    "artist": "张慧珺",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwMTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 236
  },
  {
    id: 1329,
    "title": "灯思克 - 相见难（傈僳乡音）",
    "artist": "灯思克",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwMTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 258
  },
  {
    id: 1330,
    "title": "灯思克 - 天下傈僳一家人",
    "artist": "灯思克",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwMTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 142
  },
  {
    id: 1331,
    "title": "阎维文 - 《丽江美》",
    "artist": "阎维文",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDEwMDg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 340
  },
  {
    id: 1332,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 367
  },
  {
    id: 1333,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 264
  },
  {
    id: 1334,
    "title": "达坡阿玻 - 纳西人的歌",
    "artist": "达坡阿玻",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA5OTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 284
  },
  {
    id: 1335,
    "title": "纳西姑娘-乌云嘎",
    "artist": "纳西姑娘-乌云嘎",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA5OTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 283
  },
  {
    id: 1336,
    "title": "女声小组唱 含蜜金组合",
    "artist": "女声小组唱 含蜜金组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA5Njk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 249
  },
  {
    id: 1337,
    "title": "和顺才 - 美丽傈家欢迎你来",
    "artist": "和顺才",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA5Njg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 273
  },
  {
    id: 1338,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 281
  },
  {
    id: 1339,
    "title": "祝福小凉山_单曲",
    "artist": "祝福小凉山_单曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA5MzU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 238
  },
  {
    id: 1340,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 228
  },
  {
    id: 1341,
    "title": "三江组合 - 傈寨神话",
    "artist": "三江组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA5MzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 197
  },
  {
    id: 1342,
    "title": "和燕 - 丽江谣",
    "artist": "和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA5MTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 272
  },
  {
    id: 1343,
    "title": "木作为 - 卓玛格桑花",
    "artist": "木作为",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA4ODU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 256
  },
  {
    id: 1344,
    "title": "阿智《喜欢你》纳西语",
    "artist": "阿智《喜欢你》纳西语",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA4NzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 250
  },
  {
    id: 1345,
    "title": "达坡阿玻 - 草原风",
    "artist": "达坡阿玻",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA4NjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 248
  },
  {
    id: 1346,
    "title": "纳若咪 - 怒江情歌",
    "artist": "纳若咪",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA4NTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 324
  },
  {
    id: 1347,
    "title": "和曙洪.和燕 - 同住一座城",
    "artist": "和曙洪.和燕",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA4Mzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 241
  },
  {
    id: 1348,
    "title": "迪庆，我慈祥的阿妈",
    "artist": "迪庆，我慈祥的阿妈",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA4MTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 304
  },
  {
    id: 1349,
    "title": "打劳丽",
    "artist": "打劳丽",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA4MDE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 266
  },
  {
    id: 1350,
    "title": "和合劳",
    "artist": "和合劳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA4MDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 381
  },
  {
    id: 1351,
    "title": "寒雨 - 牵挂",
    "artist": "寒雨",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3OTk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 227
  },
  {
    id: 1352,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 398
  },
  {
    id: 1353,
    "title": "净土（达坡阿玻演唱）",
    "artist": "净土（达坡阿玻演唱）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3ODQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 234
  },
  {
    id: 1354,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 214
  },
  {
    id: 1355,
    "title": "玉龙山组合 - 纳西欢歌",
    "artist": "玉龙山组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3NzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 197
  },
  {
    id: 1356,
    "title": "纳西酒歌 - 丽江王铁生.",
    "artist": "纳西酒歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3NjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 128
  },
  {
    id: 1357,
    "title": "传奇（纳西语版）阿尼布鲁鲁",
    "artist": "传奇（纳西语版）阿尼布鲁鲁",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3NTY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 187
  },
  {
    id: 1358,
    "title": "《印象丽江》主题曲 - 回家",
    "artist": "《印象丽江》主题曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3NTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 193
  },
  {
    id: 1359,
    "title": "和旋 - 美丽的古城",
    "artist": "和旋",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3NDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 239
  },
  {
    id: 1360,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 210
  },
  {
    id: 1361,
    "title": "和国军 - 摩梭夜歌",
    "artist": "和国军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3MzU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 265
  },
  {
    id: 1362,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 327
  },
  {
    id: 1363,
    "title": "达坡阿玻 - 潘金妹",
    "artist": "达坡阿玻",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3MjE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 303
  },
  {
    id: 1364,
    "title": "纳西农家乐",
    "artist": "纳西农家乐",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3MTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 266
  },
  {
    id: 1365,
    "title": "和文光作品集 - 玉龙欢歌",
    "artist": "和文光作品集",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA3MDA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 205
  },
  {
    id: 1366,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 286
  },
  {
    id: 1367,
    "title": "玉龙山组合 - 欢聚在一起",
    "artist": "玉龙山组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2ODI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 203
  },
  {
    id: 1368,
    "title": "纳西大调",
    "artist": "纳西大调",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2NzI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 455
  },
  {
    id: 1369,
    "title": "纳西谷气.mp3",
    "artist": "纳西谷气.mp3",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2NzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 182
  },
  {
    id: 1370,
    "title": "李承翰 - 阿卡巴拉麻达咪.mp3",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2Njg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 170
  },
  {
    id: 1371,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 266
  },
  {
    id: 1372,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 218
  },
  {
    id: 1373,
    "title": "美丽丽江欢迎你 - 群星",
    "artist": "美丽丽江欢迎你",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2Mzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 152
  },
  {
    id: 1374,
    "title": "根呷新歌 - 雪域护身格萨尔王",
    "artist": "根呷新歌",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2Mzg=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 301
  },
  {
    id: 1375,
    "title": "纯音乐 - 丽江纳西族打跳",
    "artist": "纯音乐",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2Mjg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 202
  },
  {
    id: 1376,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 163
  },
  {
    id: 1377,
    "title": "媛媛 - 纳西，阿哩哩",
    "artist": "媛媛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2MjQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 182
  },
  {
    id: 1378,
    "title": "亚东 - 白马山寨",
    "artist": "亚东",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA2MTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 255
  },
  {
    id: 1379,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 72
  },
  {
    id: 1380,
    "title": "李承翰《丽水纵歌》",
    "artist": "李承翰《丽水纵歌》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1OTk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 306
  },
  {
    id: 1381,
    "title": "纳西特色《三部曲》欢乐和谐苑",
    "artist": "纳西特色《三部曲》欢乐和谐苑",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1OTg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 1022
  },
  {
    id: 1382,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 303
  },
  {
    id: 1383,
    "title": "李承翰《纳西情歌》",
    "artist": "李承翰《纳西情歌》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1ODc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 162
  },
  {
    id: 1384,
    "title": "纳西吉祥",
    "artist": "纳西吉祥",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1Njg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 48
  },
  {
    id: 1385,
    "title": "和上钧＆阿诛 玉龙雪山的故事",
    "artist": "和上钧＆阿诛 玉龙雪山的故事",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1NjY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 350
  },
  {
    id: 1386,
    "title": "木作为《舞动玉龙》",
    "artist": "木作为《舞动玉龙》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1NjI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 337
  },
  {
    id: 1387,
    "title": "纳若《不怕》",
    "artist": "纳若《不怕》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1NjA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 281
  },
  {
    id: 1388,
    "title": "李承翰《雨水相会》",
    "artist": "李承翰《雨水相会》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1NTk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 158
  },
  {
    id: 1389,
    "title": "茨哩茨姆(古老民歌)",
    "artist": "茨哩茨姆(古老民歌)",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1NTI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 151
  },
  {
    id: 1390,
    "title": "李承翰《纳西民歌联唱》",
    "artist": "李承翰《纳西民歌联唱》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1NDk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 228
  },
  {
    id: 1391,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 473
  },
  {
    id: 1392,
    "title": "纳西希余花花色-涵格佩吉",
    "artist": "纳西希余花花色-涵格佩吉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA1NDE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 266
  },
  {
    id: 1393,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 222
  },
  {
    id: 1394,
    "title": "根呷 - 七彩家园",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0OTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 298
  },
  {
    id: 1395,
    "title": "爱情没有保质期",
    "artist": "爱情没有保质期",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0NzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 235
  },
  {
    id: 1396,
    "title": "纳西劳动歌《栽秧歌》",
    "artist": "纳西劳动歌《栽秧歌》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0Njk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 85
  },
  {
    id: 1397,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 238
  },
  {
    id: 1398,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 318
  },
  {
    id: 1399,
    "title": "梦中的香格里拉(达坡阿玻）",
    "artist": "梦中的香格里拉(达坡阿玻）",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0NjM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 274
  },
  {
    id: 1400,
    "title": "和春琴 - 西余索",
    "artist": "和春琴",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0NDQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 249
  },
  {
    id: 1401,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVicH2EherPiajPQLfTOqfs0cKtEXUyVuyzN7mPaHHNAmdD7T4zCVbWB51J8gpQVyp6vEfvhkqAJjZ5A/640?wx_fmt=jpeg",
    "duration": 280
  },
  {
    id: 1402,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 242
  },
  {
    id: 1403,
    "title": "和文光原创歌曲 - 纳西祝酒歌",
    "artist": "和文光原创歌曲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0NDE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 163
  },
  {
    id: 1404,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 245
  },
  {
    id: 1405,
    "title": "李承翰 - 纳西劝世歌",
    "artist": "李承翰",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0Mjc=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCViclg0f480ry0nb6JB5tM3MHqqZ95kX0PQ71oGK8gc5yBRZcUu7eOv23CdzHIVXX6zfBqhP3j0B0qg/640?wx_fmt=jpeg",
    "duration": 132
  },
  {
    id: 1406,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV8XfiaOqm0ZXVeFtk3V1w6TQnlUl6wceRiaG2aicTN5M6YJbLtVVQUV7rA0tmGZl3hriclYTvETUEX79w/640?wx_fmt=jpeg",
    "duration": 242
  },
  {
    id: 1407,
    "title": "扎西尼玛-相约巴拉",
    "artist": "扎西尼玛-相约巴拉",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0MTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 248
  },
  {
    id: 1408,
    "title": "纳西族音乐史 小调三月百花开",
    "artist": "纳西族音乐史 小调三月百花开",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0MDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 37
  },
  {
    id: 1409,
    "title": "根呷 - 要爱就爱你全部",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDA0MDA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 278
  },
  {
    id: 1410,
    "title": "根呷 - 天边的天边",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzOTY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 285
  },
  {
    id: 1411,
    "title": "齐旦布 - 藏地光芒",
    "artist": "齐旦布",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzODY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 228
  },
  {
    id: 1412,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 260
  },
  {
    id: 1413,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 229
  },
  {
    id: 1414,
    "title": "根呷 - 卓玛央金",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzMzA=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 231
  },
  {
    id: 1415,
    "title": "根呷 - 走向远方",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzMTk=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 211
  },
  {
    id: 1416,
    "title": "白沙细乐《三思汲》",
    "artist": "白沙细乐《三思汲》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzMTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 130
  },
  {
    id: 1417,
    "title": "阿里里《细针挑丝线》",
    "artist": "阿里里《细针挑丝线》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzMTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 147
  },
  {
    id: 1418,
    "title": "劳动歌《栽秧歌》",
    "artist": "劳动歌《栽秧歌》",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzMDk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 85
  },
  {
    id: 1419,
    "title": "和金花 - 《嫁女调》纳西",
    "artist": "和金花",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzMDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 109
  },
  {
    id: 1420,
    "title": "根呷 - 阿妈",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAzMDM=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 296
  },
  {
    id: 1421,
    "title": "索朗扎西 - 吉祥欢聚锅庄",
    "artist": "索朗扎西",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyOTM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 443
  },
  {
    id: 1422,
    "title": "山鹰组合 - 七月火把节",
    "artist": "山鹰组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyODY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 272
  },
  {
    id: 1423,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 258
  },
  {
    id: 1424,
    "title": "根呷 - 和我去转山",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyNzU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 286
  },
  {
    id: 1425,
    "title": "茶马古道歌",
    "artist": "茶马古道歌",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyNzM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 186
  },
  {
    id: 1426,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 265
  },
  {
    id: 1427,
    "title": "汤潮 - 战友兄弟",
    "artist": "汤潮",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyNTc=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 247
  },
  {
    id: 1428,
    "title": "根呷 - 爱的部落",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyNTE=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 280
  },
  {
    id: 1429,
    "title": "傈僳族打跳_升华工作室",
    "artist": "傈僳族打跳_升华工作室",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyNDU=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 139
  },
  {
    id: 1430,
    "title": "根呷 - 善心宝",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyNDQ=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 253
  },
  {
    id: 1431,
    "title": "扎西尼玛 - 次真拉姆",
    "artist": "扎西尼玛",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyMzk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 294
  },
  {
    id: 1432,
    "title": "曲尔甲 - 我的思念只给你唱",
    "artist": "曲尔甲",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyMzg=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 214
  },
  {
    id: 1433,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 239
  },
  {
    id: 1434,
    "title": "三江组合 - 傈僳酒歌",
    "artist": "三江组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAyMDY=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 218
  },
  {
    id: 1435,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 227
  },
  {
    id: 1436,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCVibc2PsR4tYGfqbTGzujV3vibianIZTNKGZ1iac0I4XGum5yW5gGmPYgSxXUGt8WUibA76ThIibricIM8icibg/640?wx_fmt=jpeg",
    "duration": 252
  },
  {
    id: 1437,
    "title": "舞动三江——阿石才",
    "artist": "舞动三江——阿石才",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxOTE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 894
  },
  {
    id: 1438,
    "title": "傈僳闪脚跳",
    "artist": "傈僳闪脚跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxOTA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 262
  },
  {
    id: 1439,
    "title": "二月八——革囊度组合",
    "artist": "二月八——革囊度组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxODk=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 267
  },
  {
    id: 1440,
    "title": "三江组合 - 等你归来",
    "artist": "三江组合",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxODE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 207
  },
  {
    id: 1441,
    "title": "爱过你卓玛---嘉央",
    "artist": "爱过你卓玛---嘉央",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxNzE=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 204
  },
  {
    id: 1442,
    "title": "嘉央 - 王者归来",
    "artist": "嘉央",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxNzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 198
  },
  {
    id: 1443,
    "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/jXiaTRzsmA7OdhcqrCxibRjbx6JXfr3dZN9kJeURnrAa2ybIvfTViakkURmc7vGYzqicFNYIHo9OiaPCW9x7YYD38qicTlpXvNdG9WGGC1j5TXUYU/0?wx_fmt=jpeg",
    "duration": 227
  },
  {
    id: 1444,
    "title": "根呷 - 大山走出的孩子",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxNTI=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 283
  },
  {
    id: 1445,
    "title": "谢军 - 芒果香",
    "artist": "谢军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxNDM=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 301
  },
  {
    id: 1446,
    "title": "谢军 - 阿哥阿妹",
    "artist": "谢军",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxNDI=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 295
  },
  {
    id: 1447,
    "title": "丽江小倩 - 一瞬间",
    "artist": "丽江小倩",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxMzQ=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 176
  },
  {
    id: 1448,
    "title": "傈僳族打跳",
    "artist": "傈僳族打跳",
    "album": "纳西音乐精选",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxMzA=",
    "cover": "https://wx.qlogo.cn/mmopen/oQ7QIr12iawpBvkMib6C4FOUw6icnLUS3GDypPasdCNTSNeyk0ZyfRMxshgoehicfUKyNCicQkml8nZrBO7ojYxzpPibfUk9Kia1BjR/0",
    "duration": 139
  },
  {
    id: 1449,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 216
  },
  {
    id: 1450,
    "title": "根呷 - 爱的家园",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxMTY=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 153
  },
  {
    id: 1451,
    "title": "根呷 - 春天里",
    "artist": "根呷",
    "src": "https://res.wx.qq.com/voice/getvoice?mediaid=MzI2NzU3NDk4Ml8xMDAwMDAxMTU=",
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9gqU2hozCF0brv73J0k25m4bD9Avy4dk3ar2AQ9leeTz58d2S5LUC2B7kyCMribqyP8588oB0uW1A/640?wx_fmt=jpeg",
    "duration": 241
  },
  {
    id: 1452,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 229
  },
  {
    id: 1453,
    "cover": "https://mmbiz.qpic.cn/mmbiz_jpg/tfpibRIwbCV9aZ471R0LadR604g7vgfdDJI1Anh7tPjmgamhr530XsQzHia9pwPoqKN2BYaJWuDsNDaF19aMUocQ/640?wx_fmt=jpeg",
    "duration": 260
  }
];

console.log('✅ musicData 加载完成，数量:', musicData.length);

// 视频数据从外部文件加载
console.log('📥 等待 videoData 从外部文件加载...');

function cleanArtistText(value) {
  return String(value || '')
    .replace(/[·•]/g, '、')
    .replace(/\s*(feat\.?|ft\.?|with)\s*/gi, '、')
    .replace(/\s*\/\s*/g, '、')
    .replace(/\s*&\s*/g, '、')
    .replace(/\s*\+\s*/g, '、')
    .replace(/\s+/g, ' ')
    .trim();
}

function looksLikeArtistCandidate(value) {
  var text = String(value || '').trim();
  if (!text || text.length > 24) return false;
  if (/[《》]/.test(text)) return false;
  if (/专辑|精选|合集|伴奏|纯音乐|音乐MV|演唱会|现场|DJ|版/.test(text)) return false;

  var compact = text.replace(/\s+/g, '');
  if (!compact) return false;

  return /^[\u4e00-\u9fa5A-Za-z0-9、&/+\-\s]+$/.test(text);
}

function splitArtistNames(value) {
  var artistText = cleanArtistText(value);
  if (!artistText) return [];

  var names = artistText
    .split(/[、，,]/)
    .map(function(name) { return name.trim(); })
    .filter(Boolean);

  // 兼容“和圣福 和丽龙 和丽霞 和雪芹”这类只用空格分隔的多人歌手字段
  if (names.length === 1 && /\s/.test(names[0])) {
    var spaceNames = names[0]
      .split(/\s+/)
      .map(function(name) { return name.trim(); })
      .filter(function(name) {
        return name && name.length <= 12 && looksLikeArtistCandidate(name);
      });

    if (spaceNames.length > 1) {
      names = spaceNames;
    }
  }

  return names.filter(function(name, index) {
    return names.indexOf(name) === index;
  });
}

function normalizeArtistDisplay(value) {
  var names = splitArtistNames(value);
  return names.length ? names.join('、') : '';
}

var knownArtistNames = new Set();

function seedKnownArtistNames(items) {
  if (!Array.isArray(items)) return;

  items.forEach(function(item) {
    if (!item || !item.artist) return;

    splitArtistNames(item.artist).forEach(function(name) {
      if (name) knownArtistNames.add(name);
    });
  });
}

function inferArtistAndTitle(rawTitle, rawArtist) {
  var title = String(rawTitle || '').trim();
  var artist = cleanArtistText(rawArtist);

  if (!title && !artist) {
    return {
      title: '',
      artist: '未知艺术家',
      artistNames: ['未知艺术家']
    };
  }

  var dashMatch = title.match(/^(.+?)\s*[-—–:：]\s*(.+)$/);
  if (dashMatch) {
    var left = dashMatch[1].trim();
    var right = dashMatch[2].trim();
    var leftLooksLikeArtist = looksLikeArtistCandidate(left);
    var rightLooksLikeArtist = looksLikeArtistCandidate(right);
    var leftNormalized = normalizeArtistDisplay(left);
    var rightNormalized = normalizeArtistDisplay(right);
    var leftKnownArtist = !!leftNormalized && knownArtistNames.has(leftNormalized);
    var rightKnownArtist = !!rightNormalized && knownArtistNames.has(rightNormalized);

    if (!artist) {
      if (leftKnownArtist && !rightKnownArtist) {
        artist = left;
        title = right;
      } else if (rightKnownArtist && !leftKnownArtist) {
        artist = right;
        title = left;
      } else if (leftLooksLikeArtist && !rightLooksLikeArtist) {
        artist = left;
        title = right;
      } else if (rightLooksLikeArtist && !leftLooksLikeArtist) {
        artist = right;
        title = left;
      } else if (leftLooksLikeArtist && rightLooksLikeArtist) {
        if (left.length <= 8 && right.length >= left.length + 2) {
          artist = left;
          title = right;
        } else if (right.length <= 8 && left.length >= right.length + 2) {
          artist = right;
          title = left;
        }
      }
    } else {
      var normalizedArtist = normalizeArtistDisplay(artist);
      if (normalizedArtist && normalizeArtistDisplay(left) === normalizedArtist) {
        title = right;
        artist = left;
      } else if (normalizedArtist && normalizeArtistDisplay(right) === normalizedArtist) {
        title = left;
        artist = right;
      } else if (!looksLikeArtistCandidate(artist)) {
        if (leftLooksLikeArtist && !rightLooksLikeArtist) {
          artist = left;
          title = right;
        } else if (rightLooksLikeArtist && !leftLooksLikeArtist) {
          artist = right;
          title = left;
        }
      }
    }
  }

  if (!artist) {
    var bracketMatch = title.match(/^(.*?)\s*[（(]([^（）()]{1,16})[）)]\s*$/);
    if (bracketMatch && looksLikeArtistCandidate(bracketMatch[2])) {
      title = bracketMatch[1].trim();
      artist = bracketMatch[2].trim();
    }
  }

  artist = normalizeArtistDisplay(artist) || '未知艺术家';

  return {
    title: title || String(rawTitle || '').trim() || '未命名歌曲',
    artist: artist,
    artistNames: splitArtistNames(artist)
  };
}

function normalizeMediaCollection(items) {
  if (!Array.isArray(items)) return;

  items.forEach(function(item) {
    if (!item || item.__artistMetaNormalized) return;

    var parsed = inferArtistAndTitle(item.title, item.artist);
    item.rawTitle = item.title;
    item.rawArtist = item.artist;
    item.title = parsed.title;
    item.artist = parsed.artist;
    item.artistNames = parsed.artistNames;
    item.__artistMetaNormalized = true;
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
window.normalizeMediaCollection = normalizeMediaCollection;

seedKnownArtistNames(musicData);
normalizeMediaCollection(musicData);
if (typeof videoData !== 'undefined') {
  seedKnownArtistNames(videoData);
  normalizeMediaCollection(videoData);
}

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
const musicIndexById = new Map(musicData.map(function(track, index) {
  return [track.id, index];
}));

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
  currentTitle.textContent = track.title;
  setArtistElementContent(currentArtist, track.artist, false);
  currentCover.src = track.cover;
  currentCover.alt = track.title + ' 封面';
  
  // 更新总时长
  totalTimeEl.textContent = formatTime(track.duration);
  
  // 更新列表高亮
  updateMusicListHighlight();
  
  // 保存播放器状态
  if (typeof savePlayerState === 'function') {
    savePlayerState(track.id, 0, isPlaying, track, audioPlayer.volume);
  } else {
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
    playBtn.setAttribute('aria-label', '暂停播放');
  } else {
    icon.className = 'fas fa-play text-primary';
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
  cover.src = track.cover;
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

  var icon = document.createElement('i');
  icon.className = 'fas fa-music text-primary ms-2 card-music-icon';
  icon.setAttribute('aria-hidden', 'true');

  function getTrackLikedState() {
    if (typeof window.isFav === 'function') {
      return window.isFav(track.id);
    }

    try {
      var favorites = JSON.parse(localStorage.getItem('ljyyt_favorites')) || [];
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
      ? '<i class="fas fa-heart" aria-hidden="true"></i>'
      : '<i class="far fa-heart" aria-hidden="true"></i>';
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
}

// 点击进度条跳转
function setProgress(e) {
  var width = progressContainer.clientWidth;
  var clickX = e.offsetX || (e.touches && e.touches[0].clientX - progressContainer.getBoundingClientRect().left);
  var duration = audioPlayer.duration;
  if (isNaN(duration)) return;
  audioPlayer.currentTime = (clickX / width) * duration;
}

// 进度条拖拽
(function() {
  var isDragging = false;
  var progContainer = document.getElementById('progress-container');
  if (!progContainer) return;

  function getProgressX(e) {
    var rect = progContainer.getBoundingClientRect();
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    var x = clientX - rect.left;
    return Math.max(0, Math.min(x, rect.width));
  }

  function onStart(e) {
    isDragging = true;
    var duration = audioPlayer.duration;
    if (!isNaN(duration)) {
      var x = getProgressX(e);
      audioPlayer.currentTime = (x / progContainer.clientWidth) * duration;
    }
  }

  function onMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    var duration = audioPlayer.duration;
    if (!isNaN(duration)) {
      var x = getProgressX(e);
      var pct = (x / progContainer.clientWidth) * 100;
      var bar = document.getElementById('progress-bar');
      if (bar) bar.style.width = pct + '%';
      audioPlayer.currentTime = (x / progContainer.clientWidth) * duration;
    }
  }

  function onEnd() {
    isDragging = false;
  }

  progContainer.addEventListener('mousedown', onStart);
  progContainer.addEventListener('touchstart', onStart, { passive: true });
  document.addEventListener('mousemove', onMove);
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('mouseup', onEnd);
  document.addEventListener('touchend', onEnd);
})();

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
    console.error('❌ musicListContainer 未找到');
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
    musicListContainer.innerHTML = '<div class="col-12 text-center py-5 text-muted"><i class="fas fa-inbox fa-3x mb-3"></i><p>暂无内容</p></div>';
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
          '<img src="' + track.cover + '" alt="' + track.title + '" class="card-img-top" style="height: 200px; object-fit: cover;" loading="lazy" decoding="async">' +
          '<div class="position-absolute top-50 start-50 translate-middle">' +
            '<i class="fas fa-play-circle text-white" style="font-size: 3rem; opacity: 0.8;"></i>' +
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
      var icon = playBtn.querySelector('i');
      if (icon && isPlaying) {
        icon.className = 'fas fa-spinner fa-spin text-primary';
      }
    });
    audioPlayer.addEventListener('canplay', function() {
      var icon = playBtn.querySelector('i');
      if (icon) {
        icon.className = isPlaying ? 'fas fa-pause text-primary' : 'fas fa-play text-primary';
      }
    });
  }
  
  console.log('✅ 播放器事件监听初始化完成');
}

// 页面卸载前保存状态
window.addEventListener('beforeunload', function() {
  if (typeof isPlaying !== 'undefined' && typeof audioPlayer !== 'undefined' && audioPlayer && typeof musicData !== 'undefined' && musicData[currentTrackIndex]) {
    savePlayerState(musicData[currentTrackIndex].id, audioPlayer.currentTime, isPlaying, musicData[currentTrackIndex], audioPlayer.volume);
  }
});

// 页面隐藏时保存状态（切换标签页等情况）
document.addEventListener('visibilitychange', function() {
  if (document.hidden && typeof isPlaying !== 'undefined' && typeof audioPlayer !== 'undefined' && audioPlayer && typeof musicData !== 'undefined' && musicData[currentTrackIndex]) {
    savePlayerState(musicData[currentTrackIndex].id, audioPlayer.currentTime, isPlaying, musicData[currentTrackIndex], audioPlayer.volume);
  }
});

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
    
    // 跳转前强制保存播放状态
    if (typeof isPlaying !== 'undefined' && typeof audioPlayer !== 'undefined' && audioPlayer && typeof musicData !== 'undefined' && musicData[currentTrackIndex]) {
      savePlayerState(musicData[currentTrackIndex].id, audioPlayer.currentTime, isPlaying, musicData[currentTrackIndex], audioPlayer.volume);
    }
    
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
    const originalIndex = musicIndexById.get(track.id);
    musicListContainer.appendChild(createMusicCardColumn(track, originalIndex, 0));
  });
  
  if (musicPaginationContainer) musicPaginationContainer.innerHTML = '';
}
