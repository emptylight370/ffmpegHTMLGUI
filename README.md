# ffmpegGUI

---

> **NOTICE**: this project is **only Chinese** now, support for other languages is in progress, but has encountered technical obstacles, please wait or help us.
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

## update time
- Successfully use `websocket` to send commands to the backend `python` server to run, `python` server needs to use `websockets` library, please note that the runtime library **needs to be installed**.---2023.08.03
- Add preset selection, one-click command generation. Add video resolution setting.---2023.08.02
- try to add language select, but hasn't successed yet---2023.08.01
- Improve usability by making it possible for file addresses to contain spaces, and fix bugs by making the copy button usable---2023.08.01
- git init and have basic functions(output dir and filename, video byterate and fps)---2023.07.22

## what to do
- [ ] build a HTMLpage to display the choices.  
- [ ] use javascript to generating command.  
- [x] Use websocket to pass commands for one-click execution.  
- [ ] more and more coming...  