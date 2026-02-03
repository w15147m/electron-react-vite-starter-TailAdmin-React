const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  minimize: () => ipcRenderer.send('window-minimize'),
  close: () => ipcRenderer.send('window-close'),
  toggleMiniMode: (isMini) => ipcRenderer.send('window-toggle-mini', isMini),
});
