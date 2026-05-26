<template>
  <!-- translation -->
  <span class="langselect">
    <label id="language_choose">{{ $t('general.language_choose') }}</label>
    <select v-model="$i18n.locale">
      <option value="zh-CN">简体中文</option>
      <option value="zh-TW">繁體中文</option>
      <option value="en-US">English</option>
      <option value="ja-JP">日本語</option>
    </select>
  </span>

  <!-- 选择文件 -->
  <small><label for="chosefile" class="clickable" id="uploadLabel">{{ $t('general.upload_label') }}</label></small>
  <input type="file" name="chosefile" id="chosefile"><br>
  <!-- 文件路径 -->
  <small><label class="clickable heicenter" for="filesrc"
      id="fileSrcLabel">{{ $t('general.file_path_label') }}</label></small>
  <!-- 这个是warning，显示红色，class=warning，title可以鼠标悬浮显示 -->
  <label class="warning clickable" :title="$t('tip.warning001')" id="warning001">*</label>
  <textarea name="filesrc" id="filesrc" contenteditable="true" :placeholder="$t('tip.ph001')" cols="80" rows="2"
    required spellcheck="false" v-model="filesrc"></textarea>
  <hr>
  <!-- websockets -->
  <h3 id="websocketLabel" class="usingtitle">{{ $t('title.websocket_label') }}</h3><br>
  <!-- <input type="button" value="启动websocket" onclick="startwebsocket(0)"> -->
  <button id="startWSBtn" onclick="startwebsocket(0)">{{ $t('button.start_websocket_button') }}</button>
  <!-- <input type="button" value="检查连接状态"> -->
  <label id="wsState">连接状态未知:UnKnown</label>
  <hr>

  <!-- preset预设 -->
  <h3 id="presetTitle" class="usingtitle">{{ $t('title.preset_title') }}</h3><br>
  <small><label id="presetLabel" @click="togglePresetPanel">{{ $t('general.preset_label') }}</label></small>
  <label class="tip clickable noselect" id="dis01" @click="togglePresetPanel"
    v-if="!displayPresets">{{ $t('button.dis_01_button') }}</label>
  <label class="tip clickable noselect" id="dis02" @click="togglePresetPanel"
    v-else>{{ $t('button.dis_02_button') }}</label><br>
  <div class="scrolly" id="dis03" v-if="displayPresets">
    <template v-for="group in presetGroups" :key="group.label">
      <div class="preset-group-label">{{ group.label }}</div>
      <input v-for="item in group.items" :key="item.label" type="button" :value="item.label"
        @click="applyPreset(item)" />
    </template>
  </div>
  <hr>

  <!-- 参数设置部分 -->
  <h3 id="ffmpegSettingsTitle" class="usingtitle">{{ $t('title.ffmpeg_settings_title') }}</h3><br>
  <!-- 一般设置 -->
  <h4 id="generalSettingsTitle" class="usingtitle">{{ $t('title.general_settings_title') }}</h4><br>
  <!-- 输出视频文件夹，可不填 -->
  <label for="outputdir" id="outputDirLabel">{{ $t('general.output_dir_label') }}</label>
  <!-- 这个是tip，显示蓝色，class=tip，title可以鼠标悬浮显示 -->
  <lable class="tip" :title="$t('tip.tip001')" id="tip001">[?]</lable>
  <input type="text" name="outputdir" id="outputdir" class="wid400" :placeholder="$t('tip.ph003')"
    v-model="outputDir"><br>
  <!-- 输出视频名称，可不填 -->
  <label for="outputfilename" id="outputFileNameLabel">{{ $t('general.output_filename_label') }}</label>
  <label class="tip" :title="$t('tip.tip002')" id="tip002">[?]</label>
  <input type="text" name="outputfilename" id="outputfilename" class="wid400" :placeholder="$t('tip.ph004')"
    v-model="outputFilename"><br>

  <!-- 视频设置 -->
  <h4 id="videoSettingsTitle" class="usingtitle">{{ $t('title.video_settings_title') }}</h4><br>
  <!-- 设置视频分辨率 -->
  <label for="videowidth" id="videoResolutionLabel">{{ $t('video.video_resolution_label') }}</label>
  <label class="tip" :title="$t('tip.tip003')" id="tip003">[?]</label>
  <input type="number" name="videowidth" id="videowidth" class="wid50" placeholder="1920" v-model="videoWidth">
  <label for="videowidth">px</label>&nbsp;
  <label for="videoheight">x</label>
  <input type="number" name="videoheight" id="videoheight" class="wid50" placeholder="1080" v-model="videoHeight">
  <label for="videoheight">px</label><br>
  <!-- 设置视频比特率 -->
  <label for="videobyte" id="videoByteLabel">{{ $t('video.video_bitrate_label') }}</label>
  <label class="tip" :title="$t('tip.tip004')" id="tip004">[?]</label>
  <input type="number" name="videobyte" id="videobyte" class="wid100" :placeholder="$t('tip.ph005')"
    v-model="videoBitrate"><br>
  <!-- 设置视频帧数 -->
  <label for="videofps" id="videoFpsLabel">{{ $t('video.video_fps_label') }}</label>
  <label class="tip" :title="$t('tip.tip005')" id="tip005">[?]</label>
  <input type="number" name="videofps" id="videofps" class="wid100" :placeholder="$t('tip.ph006')"
    v-model="videoFPS"><br>
  <!-- 输出的视频质量 -->
  <label for="videopresent" id="videoPresentLabel">{{ $t('video.video_present_label') }}</label>
  <label class="tip" :title="$t('tip.tip006')" id="tip006">[?]</label>
  <select name="videopresent" id="videoPresent">
    <option value="" id="videoPresentUnselect">{{ $t('button.video_present_unselect') }}</option>
    <option value="ultrafast" title="ultrafast">UltraFast</option>
    <option value="superfast" title="superfast">SuperFast</option>
    <option value="veryfast" title="veryfast">VeryFast</option>
    <option value="faster" title="faster">Faster</option>
    <option value="fast" title="fast">Fast</option>
    <option value="medium" title="medium">Medium</option>
    <option value="slow" title="slow">Slow</option>
    <option value="slower" title="slower">Slower</option>
    <option value="veryslow" title="veryslow">VerySlow</option>
  </select><br>
  <!-- 选择视频解码器 -->
  <label for="videoDecoder" id="videoDecoderLabel">{{ $t('video.video_decoder_label') }}</label>
  <label class="tip" :title="$t('tip.tip007')" id="tip007">[?]</label>
  <select name="videoDecoder" id="videoDecoder">
    <option value="" title="FFmpeg Default" id="videoDecoderUnselect">{{ $t('button.video_decoder_unselect') }}</option>
    <option value="cuda">cuda</option>
    <option value="dxva2">dxva2</option>
    <option value="qsv">qsv</option>
    <option value="d3d11va">d3d11va</option>
    <option value="opencl">opencl</option>
    <option value="vulkan">vulkan</option>
  </select><br>
  <!-- 选择视频解码器 -->
  <label for="videoEncoder" id="videoEncoderLabel">{{ $t('audio.audio_encoder_label') }}</label>
  <label class="tip" :title="$t('tip.tip008')" id="tip008">[?]</label>
  <select name="videoEncoder" id="videoEncoder" class="wordfitcontent">
    <option value="" title="FFmpeg Default" id="videoEncoderUnselect">{{ $t('button.video_encoder_unselect') }}</option>
    <option value="libx264" title="libx264">libx264(H.264)</option>
    <option value="libx264rgb" title="libx264rgb">libx264_rgb(H.264_rgb)</option>
    <option value="h264_nvenc" title="h264_nvenc">NVIDIA GPU H.264</option>
    <option value="h264_amf" title="h264_amf">AMD GPU H.264</option>
    <option value="libx265" title="libx265">libx265(H.265)</option>
    <option value="h265_nvenc" title="h265_nvenc">NVIDIA GPU H.265</option>
    <option value="h265_amf" title="h265_amf">AMD GPU H.265</option>
    <option value="libvpx" title="libvpx">VP8</option>
    <option value="libvpx-vp9" title="libvpx-vp9">VP9</option>
    <option value="vq9_qsv" title="vp9_qsv">INTEL GPU VP9</option>
    <option value="libaom-av1" title="libaom-av1">libaom AV1</option>
    <option value="av1_nvenc" title="av1_nvenc">NVIDIA GPU AV1</option>
    <option value="av1_amf" title="av1_amf">AMD GPU AV1</option>
    <option value="av1_qsv" title="av1_qsv">INTEL GPU AV1</option>
    <option value="flv" title="flv">flv</option>
    <option value="gif" title="gif">gif</option>
    <option value="hdr" title="hdr">hdr</option>
  </select><br>

  <!-- 音频设置 -->
  <h4 id="audioSettingsTitle" class="usingtitle">{{ $t('title.audio_settings_title') }}</h4><br>
  <!-- 选择音频编码器 -->
  <label for="audioEncoder" id="audioEncoderLabel">{{ $t('audio.audio_encoder_label') }}</label>
  <label class="tip" :title="$t('tip.tip009')" id="tip009">[?]</label>
  <select name="audioEncoder" id="audioEncoder">
    <option value="" title="FFmpeg Default" id="audioEncoderUnselect">{{ $t('button.audio_encoder_unselect') }}</option>
    <option value="aac" title="aac">AAC</option>
    <option value="aac_mf" title="aac_mf">AAC via MediaFoundation</option>
    <option value="ac3" title="ac3">ac3</option>
    <option value="ac3_mf" title="ac3_mf">ac3 via MediaFoundation</option>
    <option value="flac" title="flac">Free Lossless Audio Codec</option>
    <option value="mp2" title="mp2">MP2</option>
    <option value="libmp3lame" title="libmp3lame">libmp3lame MP3</option>
    <option value="libshine" title="libshine">libshine MP3</option>
    <option value="mp3_mf" title="mp3_mf">MP3 via MediaFoundation</option>
    <option value="sonic" title="sonic">Sonic</option>
    <option value="sonicls" title="sonicls">Sonic lossless</option>
  </select>

  <!-- 特殊选项 -->
  <hr>
  <h4 id="specialSettingsLabel" class="usingtitle">{{ $t('title.audio_settings_title') }}</h4><br>
  <!-- 简略信息 -->
  <label for="hideMessage" id="hideMessageLabel">{{ $t('special.hide_message_label') }}</label>
  <input type="checkbox" name="hideMessage" id="hideMessage">
  <label for="hideMessage" id="choseToHideMessageLabel">{{ $t('button.chose_to_hide_message_label') }}</label><br>
  <!-- 不询问即强制覆盖输出文件 -->
  <label for="overwrite" id="forceOverwriteLabel">{{ $t('special.force_overwrite_label') }}</label>
  <label class="tip" :title="$t('tip.tip010')" id="tip010">[?]</label>
  <input type="checkbox" name="overwrite" id="overwrite"><label for="overwrite"
    id="choseToOverwriteLabel">{{ $t('button.chose_to_overwrite_label') }}</label><br>
  <!-- 显示编码进度 -->
  <label for="showEncodingStatus" id="showEncodingStatusLabel">{{ $t('special.show_encoding_status_label') }}</label>
  <label class="tip" :title="$t('tip.tip011')" id="tip011">[?]</label>
  <input type="checkbox" name="showEncodingStatus" id="showEncodingStatus"><label for="showEncodingStatus"
    id="choseToShowEncodingStatusLabel">{{ $t('button.chose_to_show_encoding_status_label') }}</label><br>
  <!-- 不输出视频 -->
  <label for="noVideoOut" id="noVideoOutLabel">{{ $t('special.no_video_out_label') }}</label>
  <label class="tip" :title="$t('tip.tip012')" id="tip012">[?]</label>
  <input type="checkbox" name="noVideoOut" id="noVideoOut"><label for="noVideoOut"
    id="choseToNoVideoOut">{{ $t('button.chose_to_no_video_out') }}</label><br>
  <!-- 不输出音频 -->
  <label for="noAudioOut" id="noAudioOutLabel">{{ $t('special.no_audio_out_label') }}</label>
  <label class="tip" :title="$t('tip.tip013')" id="tip013">[?]</label>
  <input type="checkbox" name="noAudioOut" id="noAudioOut"><label for="noAudioOut"
    id="choseToNoAudioOut">{{ $t('special.no_audio_out_label') }}</label><br>
  <!-- 查看支持的视频编码器 -->
  <button onclick="_encoders()" id="showSupportedCodecBtn">{{ $t('button.show_support_codec_button') }}</button><br>

  <!-- 以下是生成命令的输出区域 -->
  <hr>
  <h3 class="usingtitle" id="outputCommandTitle">{{ $t('title.output_command_title') }}</h3><br>
  <label id="outputCommandLabel">{{ $t('output.output_command_label') }}</label>
  <button onclick="generatecommand()" id="generateBtn">{{ $t('button.generate_button') }}</button>
  <button onclick="clicktocopy()" id="copyBtn">{{ $t('button.copy_button') }}</button>
  <button onclick="startwebsocket(1)" :title="$t('tip.tip014')" id="runBtn">{{ $t('button.run_button') }}</button><br>
  <textarea name="outputcommand" id="outputcommand" :placeholder="$t('tip.tip015')"></textarea>
</template>

<script setup lang="ts">
import { ref } from "vue";

const filesrc = ref(""); // 输入的文件路径
const outputDir = ref(""); // 输出的文件夹路径
const outputFilename = ref(""); // 输出的文件名

const videoWidth = ref<number>(); // 视频宽度
const videoHeight = ref<number>(); // 视频高度
const videoBitrate = ref<number>(); // 视频比特率
const videoFPS = ref<number>(); // 视频帧率

const displayPresets = ref(false); // 是否显示预设面板

function togglePresetPanel() {
  displayPresets.value = !displayPresets.value;
}

// ---- 预设一键填充 ----
interface PresetItem {
  label: string;
  width: number;
  height: number;
  fps: number;
  bitrate: number;
}

interface PresetGroup {
  label: string;
  items: PresetItem[];
}

const presetGroups: PresetGroup[] = [
  {
    label: "16:9",
    items: [
      { label: "4K 240FPS 20Kkbps", width: 3840, height: 2160, fps: 240, bitrate: 20000 },
      { label: "4K 240FPS 10Kkbps", width: 3840, height: 2160, fps: 240, bitrate: 10000 },
      { label: "4K 240FPS 5Kkbps", width: 3840, height: 2160, fps: 240, bitrate: 5000 },
      { label: "4K 120FPS 20Kkbps", width: 3840, height: 2160, fps: 120, bitrate: 20000 },
      { label: "4K 120FPS 10Kkbps", width: 3840, height: 2160, fps: 120, bitrate: 10000 },
      { label: "4K 120FPS 5Kkbps", width: 3840, height: 2160, fps: 120, bitrate: 5000 },
      { label: "4K 60FPS 20Kkbps", width: 3840, height: 2160, fps: 60, bitrate: 20000 },
      { label: "4K 60FPS 10Kkbps", width: 3840, height: 2160, fps: 60, bitrate: 10000 },
      { label: "4K 60FPS 5Kkbps", width: 3840, height: 2160, fps: 60, bitrate: 5000 },
      { label: "2K 120FPS 20Kkbps", width: 2560, height: 1440, fps: 120, bitrate: 20000 },
      { label: "2K 120FPS 10Kkbps", width: 2560, height: 1440, fps: 120, bitrate: 10000 },
      { label: "2K 120FPS 5Kkbps", width: 2560, height: 1440, fps: 120, bitrate: 5000 },
      { label: "2K 60FPS 20Kkbps", width: 2560, height: 1440, fps: 60, bitrate: 20000 },
      { label: "2K 60FPS 10Kkbps", width: 2560, height: 1440, fps: 60, bitrate: 10000 },
      { label: "2K 60FPS 5Kkbps", width: 2560, height: 1440, fps: 60, bitrate: 5000 },
      { label: "1080P 60FPS 10Kkbps", width: 1920, height: 1080, fps: 60, bitrate: 10000 },
      { label: "1080P 60FPS 5Kkbps", width: 1920, height: 1080, fps: 60, bitrate: 5000 },
      { label: "1080P 60FPS 2Kkbps", width: 1920, height: 1080, fps: 60, bitrate: 2000 },
      { label: "1080P 30FPS 10Kkbps", width: 1920, height: 1080, fps: 30, bitrate: 10000 },
      { label: "1080P 30FPS 5Kkbps", width: 1920, height: 1080, fps: 30, bitrate: 5000 },
      { label: "1080P 30FPS 2Kkbps", width: 1920, height: 1080, fps: 30, bitrate: 2000 },
      { label: "720P 60FPS 10Kkbps", width: 1280, height: 720, fps: 60, bitrate: 10000 },
      { label: "720P 60FPS 5Kkbps", width: 1280, height: 720, fps: 60, bitrate: 5000 },
      { label: "720P 60FPS 2Kkbps", width: 1280, height: 720, fps: 60, bitrate: 2000 },
      { label: "720P 30FPS 10Kkbps", width: 1280, height: 720, fps: 30, bitrate: 10000 },
      { label: "720P 30FPS 5Kkbps", width: 1280, height: 720, fps: 30, bitrate: 5000 },
      { label: "720P 30FPS 2Kkbps", width: 1280, height: 720, fps: 30, bitrate: 2000 },
    ],
  },
  {
    label: "4:3",
    items: [
      { label: "720P 60FPS 10Kkbps", width: 960, height: 720, fps: 60, bitrate: 10000 },
      { label: "720P 60FPS 5Kkbps", width: 960, height: 720, fps: 60, bitrate: 5000 },
      { label: "720P 60FPS 2Kkbps", width: 960, height: 720, fps: 60, bitrate: 2000 },
      { label: "720P 30FPS 10Kkbps", width: 960, height: 720, fps: 30, bitrate: 10000 },
      { label: "720P 30FPS 5Kkbps", width: 960, height: 720, fps: 30, bitrate: 5000 },
      { label: "720P 30FPS 2Kkbps", width: 960, height: 720, fps: 30, bitrate: 2000 },
      { label: "480P 60FPS 10Kkbps", width: 640, height: 480, fps: 60, bitrate: 10000 },
      { label: "480P 60FPS 5Kkbps", width: 640, height: 480, fps: 60, bitrate: 5000 },
      { label: "480P 60FPS 2Kkbps", width: 640, height: 480, fps: 60, bitrate: 2000 },
      { label: "480P 30FPS 10Kkbps", width: 640, height: 480, fps: 30, bitrate: 10000 },
      { label: "480P 30FPS 5Kkbps", width: 640, height: 480, fps: 30, bitrate: 5000 },
      { label: "480P 30FPS 2Kkbps", width: 640, height: 480, fps: 30, bitrate: 2000 },
    ],
  },
];

function applyPreset(item: PresetItem) {
  videoWidth.value = item.width;
  videoHeight.value = item.height;
  videoFPS.value = item.fps;
  videoBitrate.value = item.bitrate;
}
</script>

<style lang="scss" scoped>
#chosefile {
  width: 200px;
  border-radius: 5px;
  border: 1px solid #000;
  text-align: center;
  text-anchor: middle;
  cursor: pointer;
}

#filesrc {
  width: 400px;
  border-radius: 5px;
  border: 1px solid #000;
  overscroll-behavior-y: auto;
  resize: none;
}

#outputcommand {
  width: 95%;
  height: 5rem;
}

.usingtitle {
  text-shadow: 1px 1px 1px rgba(79, 195, 100, 0.718);
  display: inline-block;
  line-height: 1rem;
  margin: 0;
}

.wid400 {
  width: 400px;
}

.wid100 {
  width: 100px;
}

.wid50 {
  width: 50px;
}

.noselect {
  user-select: none;
}

.clickable {
  cursor: pointer;
}

.heicenter {
  vertical-align: super;
}

.widcenter {
  text-align: center;
}

.tip {
  color: skyblue;
  cursor: pointer;
  font-size: x-small;
}

.warning {
  color: red;
  font-size: smaller;
  vertical-align: super;
}

.langselect {
  float: right;
  width: fit-content;
}

.scrolly {
  overflow-y: scroll;
  height: 140px;
  width: 200px;
  border: 1px solid black;
}

.preset-group-label {
  font-weight: bold;
  margin: 2px 0;
  text-align: center;
}

.wordfitcontent {
  width: fit-content;
}

* {
  font-family: 'Microsoft YaHei Ui', 'Microsoft YaHei', '微软雅黑', 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
</style>