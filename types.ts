
export enum TechLayer {
  OVERVIEW = 'Overview',
  CAPTURE = 'Capture (SharpDX)',
  ENCODING = 'Encoding (FFmpeg)',
  NETWORK = 'Network (TCP/UDP)',
  RECEIVER = 'Receiver & Render'
}

export interface CodeSnippet {
  title: string;
  filename: string;
  language: string;
  code: string;
  description: string;
}

export interface LANDevice {
  name: string;
  ip: string;
  status: 'Idle' | 'Broadcasting' | 'Disconnected';
}
