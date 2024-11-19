# ffmpegGUI

---

> **NOTICE**: this project is **only Chinese, English and Japanese** now, support for other languages is in progress, if you want to help us translate the document to your language, please [view here](localization.md).
>
> **NOTICE**: This project is rewritting in `electron`, and it is unusable now. If you want a usable version, please visit [link](https://github.com/emptylight370/ffmpegHTMLGUI/releases/tag/no_electron).
>
> ~~**NOTICE**: If you don't have the `websockets` library for `python`, we provide a ***packaged portable version*** of the program (in *exe* format) in the release, which can be downloaded and run directly without downloading the `websockets` library.~~

---

## language choose

[简体中文](README_zh.md) [English](README.md)

---

# screenshoot

![简体中文](image_zh.png)
![English](image_en.png)

# infos

In this project, I will use electron to write a GUI for [ffmpeg](https:\\ffmpeg.org). It can finish the command by what you choose.

## functionality now implemented and update targets

- [X] Build a page to show the operator interface. This is the main component of our project.
- [X] Use js to generate terminal commands according to user options.
- [X] Use websocket to pass commands to a local server terminal for execution. Provide a python file to start the backend server.
- [X] Web pages are localised/internationalised and constantly improved.
- [X] Modify the output folder and output file name of the output video. (Includes modifying the file format)
- [X] Adjusts the bit rate and frame rate of the output video.
- [X] Provides one-click generation of commands in preset formats.
- [X] Select not to output video/audio.
- [X] Add specify output video quality, it will influence video encode speed.
- [X] Add video/audio codec settings(sometimes it is useless).
- [ ] **Rewrite with electron.**
- [ ] Add some new options...
- [ ] More features are still in progress ...

## update time

[view all](update_log.md)

| important update log  | update time |
| :-------------------- | :---------: |
| Rewrite with electron | 2024.01.10 |
| Create repository     | 2023.07.22 |
