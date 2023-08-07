# ffmpegGUI

---

> **NOTICE**: this project is **only Chinese, English and Japanese** now, support for other languages is in progress, if you want to help us translate the document to your language, please [view here](localization.md).
> 
> **NOTICE**: If you don't have the `websockets` library for `python`, we provide a ***packaged portable version*** of the program (in *exe* format) in the release, which can be downloaded and run directly without downloading the `websockets` library.

---

## language choose
[简体中文](README_zh.md) [English](README.md)  

---

## what can do
In this project, I will use HTML to write a GUI for [ffmpeg](https:\\ffmpeg.org). It can finish the command by what you choose.  

## functions useable now
- gengrate command for ffmpeg cli
- decide the output directory and output file name(you can change the Changing the file type here)
- choose the video byterate and fps
- Select preset format for direct output of commands
- Commands are sent directly to the backend via `websocket` server to be run
- Users select display language, now we are also internationalising the page
- Select no video/audio output

## update time
- Add Traditional Chinese and Japanese translations.---2023.08.07
- Add the ability to display encoding progress and select whether or not to output audio/video.---2023.08.07
- Finish the language select function.---2023.08.05
- Successfully use `websocket` to send commands to the backend `python` server to run, `python` server needs to use `websockets` library, please note that the runtime library **needs to be installed**.---2023.08.03
- Add preset selection, one-click command generation. Add video resolution setting.---2023.08.02
- try to add language select, but hasn't successed yet---2023.08.01
- Improve usability by making it possible for file addresses to contain spaces, and fix bugs by making the copy button usable---2023.08.01
- git init and have basic functions(output dir and filename, video byterate and fps)---2023.07.22

## what to do
- [ ] build a HTMLpage to display the choices. Actually it is always in progress.
- [ ] use javascript to generating command. We are doing this job.
- [x] Use websocket to pass commands for one-click execution.
- [X] Localization/internationalization.
- [ ] More localization/internationslization progress.
- [ ] more and more coming...