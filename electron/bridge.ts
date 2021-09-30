import { contextBridge, ipcRenderer } from 'electron'
import { IBridgeMsg } from './interface/BridgeMsg'
import { env } from './utils/env';
import log from 'electron-log';

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   */

  env: env,

  send: (message: IBridgeMsg) => {
    log.info("[MESSAGE] SEND : ", message);
    ipcRenderer.send(message.channel, message.message);
  },

  sendSync: (message: IBridgeMsg) => {
    log.info("[MESSAGE] SEND_SYNC : ", message);
    return ipcRenderer.sendSync(message.channel, message.message);
  },

  invoke: (message: IBridgeMsg) => {
    log.info("[MESSAGE] INVOKE : ", message);
    return ipcRenderer.invoke(message.channel, message.message);
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => {
      log.info("[MESSAGE] RECEIVE : ", data);
      callback(data);
    });
  }
}

contextBridge.exposeInMainWorld('Main', api)
