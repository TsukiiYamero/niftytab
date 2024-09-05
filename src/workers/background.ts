import { getUserDataFromSync } from '@/utils/chrome/getUserData';

chrome.runtime.onInstalled.addListener(() => {
    console.log('Starting Suspension Tabs... FUNCIONA MRD');
    getUserDataFromSync();
});
