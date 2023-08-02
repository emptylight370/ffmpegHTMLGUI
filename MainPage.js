function generatecommand()
{
    // 输出命令的textarea
    var outputplace = document.getElementById("outputcommand");
    // 输入文件的地址
    var inputfile = document.getElementById("filesrc").value;
    // 去掉复制地址时的"号
    // if (inputfile[0] == "\"")
    // {
    //     inputfile = inputfile.split("\"")[1];
    // }


    // 输出文件的名字，可以留空
    var outputfile = document.getElementById("outputfilename").value;
    // 输出文件的地址，可以留空
    var outputdir = document.getElementById("outputdir").value;
    // 输出视频的分辨率，可以留空
    var videowidth = document.getElementById("videowidth").value;
    var videoheight = document.getElementById("videoheight").value;
    // 输出视频的比特率，可以留空
    var videobyterate = document.getElementById("videobyte").value;
    // 输出视频的帧数，可以留空
    var videofps = document.getElementById("videofps").value;
    // 询问是否覆盖输出目录下的同名文件，选中则不询问
    var overwrite = document.getElementById("overwrite").value;


    // 命令的初始部分，后续添加参数
    var command = "ffmpeg ";
    // 这里添加参数
    if (inputfile)
    {
        // 输入文件
        command += "-i " + inputfile + " ";

        // 必须先写设定参数
        // 输出视频分辨率，可以留空
        if (videowidth && videoheight)
        {
            command += "-s " + videowidth + "x" + videoheight + " ";
        }
        // 输出视频比特率，单位kbps，可以留空
        if (videobyterate)
        {
            command += "-b:v " + videobyterate + "k ";
        }
        // 设置输出视频帧数，单位fps，可以留空，默认和原视频一样
        if (videofps)
        {
            command += "-r " + videofps + " ";
        }
        // 输出目录存在与输出文件同名的文件时是否覆盖，默认为否，勾选则添加参数
        if (overwrite)
        {
            command += "-y ";
        }

        // 最后填写输出文件名
        // 如果有填写输出文件名
        if (outputfile)
        {
            // 如果有填写输出文件夹就拼接地址
            if (outputdir)
            {
                if (outputdir[0] == "\"" && outputdir[outputdir.length - 1] == "\"")
                {
                    command += outputdir + outputfile.split("\\")[outputfile.split("\\").length - 1];
                }
                else
                {
                    if (outputdir[0] != "\"")
                    {
                        command += "\"";
                    }
                    command += outputdir + outputfile.split("\\")[outputfile.split("\\").length - 1];
                    if (outputdir[outputdir.length - 1] != "\"")
                    {
                        command += "\"";
                    }
                }
            }
            // 没有就不管
            else 
            {
                if (outputfile[0] != "\"")
                {
                    command += "\"";
                }
                var temp = inputfile.split("\\");
                // 分割文件夹，拼接输出地址
                for (var i = 0; i < temp.length; i++)
                {
                    if (i != temp.length - 1)
                    {
                        command += temp[i] + "\\";
                    }
                }
                command += outputfile;
                if (command[command.length - 1] != "\"")
                {
                    command += "\"";
                }
            }
        }
        // 如果没有填写输出文件名
        else
        {
            // 如果有填写输出文件夹就拼接地址
            if (outputdir)
            {
                command += outputdir;
                var filename = inputfile.split("\\")[inputfile.split("\\").length - 1];
                var temp = filename.split(".");
                // command += temp[temp.length - 2] + "_ffmpeg." + temp[temp.length - 1];
                // 防止文件名中有.的情况
                for (var i = 0; i < temp.length; i++)
                {
                    command += temp[i];
                    // console.log(temp[i]);
                    if (i == temp.length - 2)
                    {
                        command += "_ffmpeg.";
                    }
                    else if (i == temp.length - 1)
                    {
                        command += " ";
                    }
                    else
                    {
                        command += ".";
                    }
                }
            }
            // 没有就不管
            else
            {
                var temp = inputfile.split(".");
                // command += temp[0] + "_ffmpeg." + temp[1];
                // 防止文件名中有.的情况
                for (var i = 0; i < temp.length; i++)
                {
                    command += temp[i];
                    // console.log(temp[i]);
                    if (i == temp.length - 2)
                    {
                        command += "_ffmpeg.";
                    }
                    else if (i == temp.length - 1)
                    {
                        command += " ";
                    }
                    else
                    {
                        command += ".";
                    }
                }
            }
        }
    }
    // 报错，没有输入文件地址
    else
    {
        alert("请输入文件地址，必须是绝对地址");
    }
    // 输出命令
    outputplace.innerHTML = command;
}

// 复制命令
function clicktocopy()
{
    console.log("clicktocopy");
    var text = document.getElementById("outputcommand").value;
    // text.select();
    // text.copy();
    // document.execCommand("copy");
    navigator.clipboard.writeText(text).then(function () { alert("复制成功"); }, function () { alert("复制失败"); });
    // alert("接口或不可用，请检查是否复制成功");
}

// 一键导出
function clicktoexport(width, height, fps, byte)
{
    // 输出命令的textarea
    var outputplace = document.getElementById("outputcommand");
    // 输入文件的地址
    var inputfile = document.getElementById("filesrc").value;


    // 输出文件的名字，可以留空
    var outputfile = document.getElementById("outputfilename").value;
    // 输出文件的地址，可以留空
    var outputdir = document.getElementById("outputdir").value;
    // 输出视频的分辨率
    var videowidth = width;
    var videoheight = height;
    // 输出视频的比特率
    var videobyterate = byte;
    // 输出视频的帧数
    var videofps = fps;


    // 命令的初始部分，后续添加参数
    var command = "ffmpeg ";
    // 这里添加参数
    if (inputfile)
    {
        // 输入文件
        command += "-i " + inputfile + " ";

        // 必须先写设定参数
        // 输出视频分辨率
        command += "-s " + videowidth + "x" + videoheight + " ";
        // 输出视频比特率，单位kbps
        command += "-b:v " + videobyterate + "k ";
        // 设置输出视频帧数，单位fps
        command += "-r " + videofps + " ";

        // 最后填写输出文件名
        // 如果有填写输出文件名
        if (outputfile)
        {
            // 如果有填写输出文件夹就拼接地址
            if (outputdir)
            {
                if (outputdir[0] == "\"" && outputdir[outputdir.length - 1] == "\"")
                {
                    command += outputdir + outputfile.split("\\")[outputfile.split("\\").length - 1];
                }
                else
                {
                    if (outputdir[0] != "\"")
                    {
                        command += "\"";
                    }
                    command += outputdir + outputfile.split("\\")[outputfile.split("\\").length - 1];
                    if (outputdir[outputdir.length - 1] != "\"")
                    {
                        command += "\"";
                    }
                }
            }
            // 没有就不管
            else
            {
                if (inputfile[0] != "\"")
                {
                    command += "\"";
                }
                var temp = inputfile.split("\\");
                // 分割文件夹，拼接输出地址
                for (var i = 0; i < temp.length; i++)
                {
                    if (i != temp.length - 1)
                    {
                        command += temp[i] + "\\";
                    }
                }
                command += outputfile;
                if (command[command.length - 1] != "\"")
                {
                    command += "\"";
                }
            }
        }
        // 如果没有填写输出文件名
        else
        {
            // 如果有填写输出文件夹就拼接地址
            if (outputdir)
            {
                command += outputdir;
                var filename = inputfile.split("\\")[inputfile.split("\\").length - 1];
                var temp = filename.split(".");
                // command += temp[temp.length - 2] + "_ffmpeg." + temp[temp.length - 1];
                // 防止文件名中有.的情况
                for (var i = 0; i < temp.length; i++)
                {
                    command += temp[i];
                    // console.log(temp[i]);
                    if (i == temp.length - 2)
                    {
                        command += "_ffmpeg.";
                    }
                    else if (i == temp.length - 1)
                    {
                        command += " ";
                    }
                    else
                    {
                        command += ".";
                    }
                }
            }
            // 没有就不管
            else
            {
                var temp = inputfile.split(".");
                // command += temp[0] + "_ffmpeg." + temp[1];
                // 防止文件名中有.的情况
                for (var i = 0; i < temp.length; i++)
                {
                    command += temp[i];
                    // console.log(temp[i]);
                    if (i == temp.length - 2)
                    {
                        command += "_ffmpeg.";
                    }
                    else if (i == temp.length - 1)
                    {
                        command += " ";
                    }
                    else
                    {
                        command += ".";
                    }
                }
            }
        }
    }
    // 报错，没有输入文件地址
    else
    {
        alert("请输入文件地址，必须是绝对地址");
    }
    // 输出命令
    outputplace.innerHTML = command;
}

// 预设选项卡展开和收起
function dis(i)
{
    var dis01 = document.getElementById("dis01");
    var dis02 = document.getElementById("dis02");
    var dis03 = document.getElementById("dis03");
    // display
    if (i == 1)
    {
        dis01.hidden = 1;
        dis02.hidden = 0;
        dis03.hidden = 0;
    }
    // hidden
    else if (i == 2)
    {
        dis01.hidden = 0;
        dis02.hidden = 1;
        dis03.hidden = 1;
    }
}

// 语言选择
function langsel()
{
    var lang = document.getElementById("lang").value;
    document.documentElement.lang = lang;
    var translations = document.getElementById("translationsss").textContent;
    console.log("translation:" + translations);
    var data = JSON.parse(document.getElementById("translationsss").textContent);

    console.log("translation:" + data);
    // const lang = 'zh-CN'; // or get the user's preferred language
    if (translations)
    {
        document.getElementById('uploadLabel').innerHTML = translations[lang]['upload_label'];
        document.getElementById('fileSrcLabel').innerHTML = translations[lang]['file_path_label'];
        document.getElementById('presetLabel').innerHTML = translations[lang]['preset_label'];
        document.getElementById('ffmpegSettings').innerHTML = translations[lang]['ffmpeg_settings_;abel'];
        document.getElementById('outputDirLabel').innerHTML = translations[lang]['output_dir_label'];
        document.getElementById('outputFilenameLabel').innerHTML = translations[lang]['output_filename_label'];
        document.getElementById('videoByteLabel').innerHTML = translations[lang]['video_bitrate_label'];
        document.getElementById('videoFpsLabel').innerHTML = translations[lang]['video_fps_label'];
        document.getElementById("forceOverwriteLabel").innerHTML = translations[lang]['force_overwrite_label'];
        document.getElementById("choseToOverwriteLabel").innerHTML = translations[lang]['chose_to_overwrite_label'];
        document.getElementById('outputCommandLabel').innerHTML = translations[lang]['output_command_label'];
        document.getElementById("generateBtn").innerHTML = translations[lang]['generate_btn'];
        document.getElementById("copyBtn").innerHTML = translations[lang]['copy_btn'];
    }
}
let ws;
function startwebsocket(e)
{
    try
    {
        if (!ws)
        {
            ws = new WebSocket("ws://localhost:1652");
        }
    }
    catch
    {
        alert("浏览器不支持websocket");
    }
    if (e == 0)
    {
        ws.onopen = function (event)
        {
            console.log("ws启动");
            var message = btoa("start");
            ws.send(message);
        }
        ws.onmessage = function (event)
        {
            console.log("ws收到消息" + event.data);
            if (event.data == "run command")
            {
                var output = document.getElementById("wsState");
                output.innerHTML = "运行命令完成";
            }
        }
        ws.onerror = function (event)
        {
            console.log("ws报错" + event.data);
        }
        ws.onclose = function (event)
        {
            console.log("ws关闭");
        }
        ckws();
    }
    else if (e == 1)
    {
        senttowebsocket();
    }
    function ckws()
    {
        var state = ws.readyState;
        var output = document.getElementById("wsState");
        if (state == 0)
        {
            output.innerHTML = "正在连接";
        }
        else if (state == 1)
        {
            output.innerHTML = "已连接";
        }
        else if (state == 2)
        {
            output.innerHTML = "正在关闭";
        }
        else if (state == 3)
        {
            output.innerHTML = "已关闭";
        }
        if (timeout)
        {
            clearTimeout(timeout);
        }
        var timeout = setTimeout(ckws, 1000);
    }
    // 发送命令到后台webserver服务器
    function senttowebsocket()
    {
        var command = document.getElementById("outputcommand").value;
        console.log(command);
        ws.send(command);
    }
}