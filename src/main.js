import { app, BrowserWindow, Menu, ipcMain, screen } from 'electron';
import path from 'node:path';
import fs from 'node:fs';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

// Remove the default menu
Menu.setApplicationMenu(null);

const WINDOW_STATE_PATH = path.join(app.getPath('userData'), 'window-state.json');

const loadWindowState = () => {
  try {
    if (fs.existsSync(WINDOW_STATE_PATH)) {
      const data = JSON.parse(fs.readFileSync(WINDOW_STATE_PATH, 'utf8'));
      return data;
    }
  } catch (err) {
    console.error('Failed to load window state:', err);
  }
  return { width: 430, height: 500 }; // Default size
};

const saveWindowState = (window) => {
  if (!window || window.isDestroyed()) return;
  try {
    const bounds = window.getBounds();
    // Don't save if in mini mode (approx 64x64)
    if (bounds.width <= 100 || bounds.height <= 100) return;
    fs.writeFileSync(WINDOW_STATE_PATH, JSON.stringify(bounds));
  } catch (err) {
    console.error('Failed to save window state:', err);
  }
};

let mainWindow;

const createWindow = () => {
  const windowState = loadWindowState();

  // Create the browser window.
  mainWindow = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: 430,
    height: 500,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000', // Ensure transparency works well
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Save window state on move with a small debounce/delay
  let saveTimeout;
  const save = () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => saveWindowState(mainWindow), 500);
  };
  
  mainWindow.on('move', save);
  mainWindow.on('resize', save);

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  saveWindowState(mainWindow);
});

// IPC Handlers
ipcMain.on('window-minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window-close', () => {
  if (mainWindow) mainWindow.close();
});

ipcMain.on('window-toggle-mini', (event, isMini) => {
  if (!mainWindow) return;
  if (isMini) {
    const currentDisplay = screen.getDisplayMatching(mainWindow.getBounds());
    const { x: displayX, y: displayY, width: displayWidth, height: displayHeight } = currentDisplay.workArea;
    
    const miniWidth = 32;
    const miniHeight = 64;
    
    // Position at the right edge of the CURRENT display, vertically centered
    const x = displayX + displayWidth - miniWidth;
    const y = displayY + Math.floor((displayHeight - miniHeight) / 2);

    mainWindow.setResizable(true);
    mainWindow.setBounds({ 
      x, 
      y, 
      width: miniWidth, 
      height: miniHeight 
    }, true);
    mainWindow.setAlwaysOnTop(true, 'screen-saver');
    mainWindow.setResizable(false);
  } else {
    mainWindow.setResizable(true);
    mainWindow.setSize(430, 500, true);
    
    // Restore from saved state or center
    const windowState = loadWindowState();
    if (windowState.x !== undefined && windowState.y !== undefined) {
      mainWindow.setPosition(windowState.x, windowState.y, true);
    } else {
      mainWindow.center();
    }
    
    mainWindow.setAlwaysOnTop(false);
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
