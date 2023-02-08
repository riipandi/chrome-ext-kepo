//  Copyright (c) 2022 Aris Ripandi.
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.

import { isValidDomain } from './utils'

/**
 * Perform get host information when tab activated or updated.
 */
chrome.tabs.onUpdated.addListener(async (tabId, _changeInfo, tab) => {
  if (!tab.url || !isValidDomain(tab.url)) {
    chrome.action.setIcon({ tabId, path: 'img/offline-48.png' })
    chrome.action.setPopup({ popup: '' })
  } else {
    chrome.action.setIcon({ tabId, path: 'img/logo-48.png' })
    chrome.action.setPopup({ popup: 'popup.html' })
  }
})

// chrome.runtime.onInstalled.addListener(() => {
//   console.log('onInstalled...')
// })

/**
 * Perform get user information when connected.
 */
// chrome.runtime.onConnect.addListener(async () => {
//   const userInfo = await getClientInfo()
//   console.log('DEBUG ~ onConnect', userInfo)
// })

/**
 * Get performance measure.
 */
// chrome.runtime.onMessage.addListener(async (request, sender, callback) => {
//   // This cache stores page load time for each tab, so they don't interfere
//   chrome.storage.local.get('cache').then((data) => {
//     if (!data.cache) data.cache = {}
//     const currentTabId = sender?.tab?.id || 0
//     data.cache['tab' + currentTabId] = request.timing
//     chrome.storage.local.set(data).then(() => {
//       chrome.action.setBadgeText({ text: request.time, tabId: currentTabId })
//       chrome.action.setPopup({ tabId: currentTabId, popup: 'popup.html' })
//     })
//   })
// })

// cache eviction
// chrome.tabs.onRemoved.addListener((tabId) => {
//   chrome.storage.local.get('cache').then((data) => {
//     if (data.cache) delete data.cache['tab' + tabId]
//     chrome.storage.local.set(data)
//   })
// })
