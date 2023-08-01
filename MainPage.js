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
        // 输出视频比特率，单位kbps，可以留空，默认大约000kb/s
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
                command += outputdir + outputfile.split("\\")[outputfile.split("\\").length - 1];
            }
            // 没有就不管
            else 
            {
                command += outputfile;
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