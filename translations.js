// define translations, based on the sequences in the document, `json` format
var translations = {
    "en": {
        "language_choose": "Language:",
        "upload_label": "You can click to upload and select a file, and copy the file address. This does not actually work here:",
        "file_path_label": "Here is the path of the file you selected. Right-click the file when uploading and select Copy file address, and paste the address into the right text box:",
        "websocket_label": "websocket settings",
        "start_websocket_button": "Start websocket",
        "preset_label": "Preset options, no need to fill in the settings, one-click export",
        "ffmpeg_settings_label": "Here are the FFmpeg settings:",
        "output_dir_label": "Output video folder:",
        "output_filename_label": "Output video name:",
        "video_resolution_label": "Video resolution:",
        "video_bitrate_label": "Video bitrate:",
        "video_fps_label": "Video FPS:",
        "force_overwrite_label": "Force overwrite output file",
        "chose_to_overwrite_label": "Click to enable",
        "output_command_label": "The generated parameter command is as follows:",
        "generate_button": "Click to generate",
        "copy_button": "Click to copy",
        "run_button": "Click to run"
    },
    "zh-CN": {
        "language_choose": "语言选择：",
        "upload_label": "你可以点击上传选择文件，并复制文件地址，这里实际上不起作用：",
        "file_path_label": "这里是你选择的文件的路径，请在上传文件时右键文件选择复制文件地址，并将地址粘贴到右边文本框中：",
        "websocket_label": "websocket设置",
        "start_websocket_button": "启动websocket",
        "preset_label": "预设选项，无需填写设置，一键导出",
        "ffmpeg_settings_label": "以下是FFmpeg的参数设置：",
        "output_dir_label": "输出视频文件夹：",
        "output_filename_label": "输出视频名称：",
        "video_resolution_label": "视频分辨率：",
        "video_bitrate_label": "视频比特率：",
        "video_fps_label": "视频帧数：",
        "force_overwrite_label": "强制覆盖输出文件",
        "chose_to_overwrite_label": "点击启用",
        "output_command_label": "生成的参数命令如下：",
        "generate_button": "点击生成",
        "copy_button": "点击复制",
        "run_button": "点击运行"
    }
}

// 语言选择
function langsel()
{
    // get language chosen
    var lang = document.getElementById("lang").value;
    // set document language
    document.documentElement.lang = lang;
    console.log(translations[lang]['language_choose'] + lang);

    // set translations
    if (translations)
    {
        document.getElementById("languageChoose").innerHTML = translations[lang]['language_choose'];
        document.getElementById('uploadLabel').innerHTML = translations[lang]['upload_label'];
        document.getElementById('fileSrcLabel').innerHTML = translations[lang]['file_path_label'];
        document.getElementById("websocketLabel").innerHTML = translations[lang]['websocket_label'];
        document.getElementById('startWSBtn').innerHTML = translations[lang]['start_websocket_button'];
        document.getElementById('presetLabel').innerHTML = translations[lang]['preset_label'];
        document.getElementById('ffmpegSettings').innerHTML = translations[lang]['ffmpeg_settings_label'];
        document.getElementById('outputDirLabel').innerHTML = translations[lang]['output_dir_label'];
        document.getElementById('outputFileNameLabel').innerHTML = translations[lang]['output_filename_label'];
        document.getElementById('videoResolutionLabel').innerHTML = translations[lang]['video_resolution_label'];
        document.getElementById('videoByteLabel').innerHTML = translations[lang]['video_bitrate_label'];
        document.getElementById('videoFpsLabel').innerHTML = translations[lang]['video_fps_label'];
        document.getElementById("forceOverwriteLabel").innerHTML = translations[lang]['force_overwrite_label'];
        document.getElementById("choseToOverwriteLabel").innerHTML = translations[lang]['chose_to_overwrite_label'];
        document.getElementById('outputCommandLabel').innerHTML = translations[lang]['output_command_label'];
        document.getElementById("generateBtn").innerHTML = translations[lang]['generate_button'];
        document.getElementById("copyBtn").innerHTML = translations[lang]['copy_button'];
        document.getElementById("runBtn").innerHTML = translations[lang]['run_button'];
    }
}