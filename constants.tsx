
import { CodeSnippet, TechLayer } from './types';

export const CS_SNIPPETS: Record<TechLayer, CodeSnippet[]> = {
  [TechLayer.OVERVIEW]: [],
  [TechLayer.CAPTURE]: [
    {
      title: "Desktop Duplication Capture",
      filename: "ScreenCapturer.cs",
      language: "csharp",
      description: "DirectX 11 Desktop Duplication API capture logic for low-latency frame access.",
      code: `using SharpDX;
using SharpDX.Direct3D11;
using SharpDX.DXGI;
using Device = SharpDX.Direct3D11.Device;

public class ScreenCapturer : IDisposable
{
    private readonly Device _device;
    private readonly OutputDuplication _outputDuplication;
    private Texture2D _copyTexture;

    public ScreenCapturer(int adapterIndex = 0, int outputIndex = 0)
    {
        using var factory = new Factory1();
        using var adapter = factory.GetAdapter1(adapterIndex);
        _device = new Device(adapter);
        
        using var output = adapter.GetOutput(outputIndex);
        using var output1 = output.QueryInterface<Output1>();
        _outputDuplication = output1.DuplicateOutput(_device);
    }

    public void CaptureFrame(Action<Texture2D> onFrame)
    {
        try 
        {
            var result = _outputDuplication.AcquireNextFrame(100, out var frameInfo, out var desktopResource);
            if (result.IsSuccess)
            {
                using var texture = desktopResource.QueryInterface<Texture2D>();
                
                if (_copyTexture == null)
                {
                    _copyTexture = new Texture2D(_device, new Texture2DDescription
                    {
                        Width = texture.Description.Width,
                        Height = texture.Description.Height,
                        MipLevels = 1,
                        ArraySize = 1,
                        Format = texture.Description.Format,
                        SampleDescription = new SampleDescription(1, 0),
                        Usage = ResourceUsage.Staging,
                        BindFlags = BindFlags.None,
                        CpuAccessFlags = CpuAccessFlags.Read,
                    });
                }

                _device.ImmediateContext.CopyResource(texture, _copyTexture);
                onFrame?.Invoke(_copyTexture);
                
                desktopResource.Dispose();
                _outputDuplication.ReleaseFrame();
            }
        }
        catch (SharpDXException ex) when (ex.ResultCode == ResultCode.WaitTimeout) { /* Skip */ }
    }

    public void Dispose()
    {
        _copyTexture?.Dispose();
        _outputDuplication?.Dispose();
        _device?.Dispose();
    }
}`
    }
  ],
  [TechLayer.ENCODING]: [
    {
      title: "FFmpeg.AutoGen H.264 Encoder",
      filename: "H264Encoder.cs",
      language: "csharp",
      description: "Uses FFmpeg ultrafast preset and zerolatency for minimum delay encoding.",
      code: `using FFmpeg.AutoGen;

public unsafe class H264Encoder : IDisposable
{
    private AVCodecContext* _codecContext;
    private AVFrame* _frame;
    private AVPacket* _packet;
    private SwsContext* _swsContext;

    public H264Encoder(int width, int height, int fps = 30)
    {
        var codec = ffmpeg.avcodec_find_encoder(AVCodecID.AV_CODEC_ID_H264);
        _codecContext = ffmpeg.avcodec_alloc_context3(codec);
        
        _codecContext->width = width;
        _codecContext->height = height;
        _codecContext->time_base = new AVRational { num = 1, den = fps };
        _codecContext->pix_fmt = AVPixelFormat.AV_PIX_FMT_YUV420P;
        
        // Zero Latency Setup
        var opts = new AVDictionary*();
        ffmpeg.av_dict_set(&opts, "preset", "ultrafast", 0);
        ffmpeg.av_dict_set(&opts, "tune", "zerolatency", 0);
        
        ffmpeg.avcodec_open2(_codecContext, codec, &opts);
        
        _frame = ffmpeg.av_frame_alloc();
        _frame->format = (int)_codecContext->pix_fmt;
        _frame->width = width;
        _frame->height = height;
        ffmpeg.av_frame_get_buffer(_frame, 32);
        
        _packet = ffmpeg.av_packet_alloc();
    }

    public void Encode(byte* rgbData, int stride, Action<ReadOnlySpan<byte>> onEncodedData)
    {
        // Convert RGB to YUV420P using SwsContext
        // ... Conversion logic omitted for brevity ...

        ffmpeg.avcodec_send_frame(_codecContext, _frame);
        while (ffmpeg.avcodec_receive_packet(_codecContext, _packet) >= 0)
        {
            onEncodedData?.Invoke(new ReadOnlySpan<byte>(_packet->data, _packet->size));
            ffmpeg.av_packet_unref(_packet);
        }
    }

    public void ForceIFrame()
    {
        _frame->pict_type = AVPictureType.AV_PICTURE_TYPE_I;
    }

    public void Dispose() { /* Free all resources */ }
}`
    }
  ],
  [TechLayer.NETWORK]: [
    {
      title: "UDP Discovery Service",
      filename: "DiscoveryService.cs",
      language: "csharp",
      description: "Auto-discovery logic using UDP broadcast for zero-config networking.",
      code: `using System.Net;
using System.Net.Sockets;
using System.Text;

public class DiscoveryService
{
    private const int Port = 54321;
    private UdpClient _udpClient;

    public void StartBroadcasting(string serverName)
    {
        _udpClient = new UdpClient { EnableBroadcast = true };
        Task.Run(async () => {
            while (true) {
                var data = Encoding.UTF8.GetBytes($"OMNICAST:{serverName}:{Environment.MachineName}");
                await _udpClient.SendAsync(data, data.Length, new IPEndPoint(IPAddress.Broadcast, Port));
                await Task.Delay(2000);
            }
        });
    }

    public void StartListening(Action<string, string> onFound)
    {
        var listener = new UdpClient(Port);
        Task.Run(async () => {
            while (true) {
                var result = await listener.ReceiveAsync();
                var msg = Encoding.UTF8.GetString(result.Buffer);
                if (msg.StartsWith("OMNICAST:")) {
                    onFound?.Invoke(result.RemoteEndPoint.Address.ToString(), msg);
                }
            }
        });
    }
}`
    }
  ],
  [TechLayer.RECEIVER]: [
    {
      title: "WPF High Performance Renderer",
      filename: "StreamRenderer.xaml.cs",
      language: "csharp",
      description: "Uses WriteableBitmap for direct memory access and low-latency UI rendering.",
      code: `using System.Windows.Media.Imaging;

public partial class StreamRenderer : UserControl
{
    private WriteableBitmap _bitmap;
    private Int32Rect _rect;

    public void Initialize(int width, int height)
    {
        _bitmap = new WriteableBitmap(width, height, 96, 96, PixelFormats.Bgr32, null);
        _rect = new Int32Rect(0, 0, width, height);
        MainImage.Source = _bitmap;
    }

    public void UpdateFrame(IntPtr buffer, int size)
    {
        Dispatcher.Invoke(() => {
            _bitmap.Lock();
            _bitmap.WritePixels(_rect, buffer, size, _bitmap.BackBufferStride);
            _bitmap.AddDirtyRect(_rect);
            _bitmap.Unlock();
        });
    }
}`
    }
  ]
};
