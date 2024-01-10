// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge } = require('electron');
const { electronAPI } = require('@electron-toolkit/preload');
const { translations_load } = require("./translations");

// Custom APIs for renderer
const api = {
    translations_load: () => { translations_load(); },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated)
{
    try
    {
        contextBridge.exposeInMainWorld('electron', electronAPI);
        contextBridge.exposeInMainWorld('api', api);
    } catch (error)
    {
        console.error(error);
    }
} else
{
    window.electron = electronAPI;
    window.api = api;
}
