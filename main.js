const electron = require("electron");
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const server = require("./server.js");
server.listen(8080);

const path = require("path");
const url = require("url");
const storage = require("./storage");
const querystring = require("querystring");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    vibrancy: "ultra-dark",
    icon: path.join(__dirname, "icon.png")
  });
  const now = new Date().getTime() / 1000;
  const { refresh_token } = storage;
  const storageString = querystring.stringify(storage);
  const location = storage.access_token
    ? storage.expires_at > now
      ? `http://localhost:8080/app/#${storageString}`
      : `http://localhost:8080/refresh/${refresh_token}`
    : 'file://' + path.join(__dirname, "login.html");
  // and load the index.html of the app.
  mainWindow.loadURL(location);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
