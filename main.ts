serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    s串口读取字符 = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    if (s串口读取字符.substr(0, 1) == "C" || s串口读取字符.substr(0, 1) == "c") {
        b接收串口打开水泵指令 = false
    } else {
        b接收串口打开水泵指令 = true
    }
})
let b水泵是否打开 = false
let 读取到的干湿电平值 = 0
let b接收串口打开水泵指令 = false
let s串口读取字符 = ""
let 干湿电平阈值 = 500
music.play(music.createSoundExpression(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
pins.digitalWritePin(DigitalPin.P2, 1)
loops.everyInterval(1000, function () {
    TM1650.showSring(" AS.")
    basic.pause(500)
    读取到的干湿电平值 = pins.analogReadPin(AnalogReadWritePin.P1)
    TM1650.showNumber(读取到的干湿电平值)
    basic.pause(1000)
    b水泵是否打开 = b接收串口打开水泵指令 && 读取到的干湿电平值 > 干湿电平阈值
    if (b水泵是否打开) {
        // 如果读取到的土壤湿度大于阈值，就是说土壤偏干，就响
        music.play(music.createSoundExpression(WaveShape.Noise, 54, 54, 255, 255, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        pins.digitalWritePin(DigitalPin.P2, 0)
    } else {
        pins.digitalWritePin(DigitalPin.P2, 1)
    }
})
