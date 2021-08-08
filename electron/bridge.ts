import { contextBridge, ipcRenderer } from 'electron'
import { IBridgeMsg } from './interface/BridgeMsg'

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   */

  send: (message: IBridgeMsg) => {
    console.log("[MESSAGE] SEND : ", message);
    ipcRenderer.send(message.channel, message.message);
  },

  sendSync: (message: IBridgeMsg) => {
    console.log("[MESSAGE] SEND_SYNC : ", message);
    return ipcRenderer.sendSync(message.channel, message.message);
  },

  invoke: (message: IBridgeMsg) => {
    console.log("[MESSAGE] INVOKE : ", message);
    return ipcRenderer.invoke(message.channel, message.message);
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => {
      console.log("[MESSAGE] RECEIVE : ", data);
      callback(data);
    });
  }
}

contextBridge.exposeInMainWorld('Main', api)
