export const TOAST_MESSAGE_TIMEOUT = 5000;

export interface MessageModel {
	level: string; //info, success, warning, error
	title?: string;
  content: string;
  contentParams?: MessageParams
}

interface MessageParams {
  key1: string;
  key2?: string;
  key3?: string;
}